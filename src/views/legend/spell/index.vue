<template>
  <div>

    <!--基本属性值-->
    <!--<van-row class="van-cell" style="height: 20%;">

      &lt;!&ndash;左边&ndash;&gt;
      <van-col span="12">

        &lt;!&ndash;属性&ndash;&gt;
        <van-row style="font-size: 0.8rem;">

          <van-col span="12">
            <div>
              <van-circle
                v-model="circleOption.currentRate.attack"
                :rate="circleOption.rate"
                :color="circleOption.gradientColor[0]"
                :size="circleOption.size"
                :text="circleOption.text[0]"
              />
              <van-circle
                v-model="circleOption.currentRate.magic"
                :rate="circleOption.rate"
                :color="circleOption.gradientColor[1]"
                :size="circleOption.size"
                :text="circleOption.text[1]"
              />
            </div>
          </van-col>

          <van-col span="12">
            <van-circle
              v-model="circleOption.currentRate.defense"
              :rate="circleOption.rate"
              :color="circleOption.gradientColor[2]"
              :size="circleOption.size"
              :text="circleOption.text[2]"
            />
            <van-circle
              v-model="circleOption.currentRate.difficulty"
              :rate="circleOption.rate"
              :color="circleOption.gradientColor[3]"
              :size="circleOption.size"
              :text="circleOption.text[3]"
            />
          </van-col>

        </van-row>

        &lt;!&ndash;广告位?&ndash;&gt;
        <van-row v-show="false">
          <van-col span="12">
            <span>
              广告位?
            </span>
          </van-col>
          <van-col span="12">
            <span>
              广告位?
            </span>
          </van-col>
        </van-row>

        <van-row v-show="true">
          <van-button plain type="info" size="mini" @click="convertMode = !convertMode">转换</van-button>
        </van-row>

      </van-col>

      &lt;!&ndash;右边&ndash;&gt;
      <van-col span="12">
        &lt;!&ndash;width="3rem"&ndash;&gt;
        &lt;!&ndash;height="3rem"&ndash;&gt;
        <van-image
          fit="contain"
          :src="skins[0].loadingImg"
        />
      </van-col>
    </van-row>-->

    <!--技能-->
    <van-row class="van-cell">
      <van-cell-group>
        <van-cell v-for="(spell, index) in spells" :key="index">

          <van-row>
            <!--技能图标-->
            <van-image
              width="4rem"
              height="4rem"
              fit="contain"
              :src="spell.abilityIconPath"
            />
            <span v-show="spell.spellKey === 'passive'" style="color: purple">{{ spell.name }}&nbsp;(被动)</span>
            <span v-show="spell.spellKey !== 'passive'" style="color: purple">{{ spell.spellKey.toLocaleString().toUpperCase() + ' ' + spell.name }}</span>
          </van-row>

          <!--冷却时间-->
          <van-row style="color: #20a0ff; font-size: 0.8rem">
            <span v-show="spell.cost === 'false'">冷却时间 无</span>
            <span v-show="spell.cost !== 'false'">冷却时间 {{ spellToObj(spell).cooldown }} </span>
          </van-row>

          <!--技能消耗-->
          <van-row style="color: #ff6c00; font-size: 0.8rem">
            <span v-show="spell.cost === 'false'">技能消耗 无 </span>
            <span v-show="spell.cost !== 'false'">技能消耗 {{ spellToObj(spell).cost }} </span>
          </van-row>

          <!--技能范围-->
          <van-row style="color: #001cff; font-size: 0.8rem">
            <span v-show="spell.cost === 'false'">技能范围 无 </span>
            <span v-show="spell.cost !== 'false'">技能范围 {{ spellToObj(spell).range }} </span>
          </van-row>

          <!--技能描述-->
          <van-row>
            <span v-html="spell.spellKey === 'passive' ? spell.description : spell.dynamicDescription" />
          </van-row>

        </van-cell>
      </van-cell-group>
    </van-row>

    <!--对线技巧-->
    <!--我方-->
    <van-row class="van-cell">
      <van-cell>
        <van-icon name="smile-o" color="blue" size="2rem" />
        <span style="color: blue;font-size: 1.0rem">使用</span>
        <div v-for="(tip, index) in JSON.parse(legend.allytips || '[]')" :key="index">
          <span v-html="tip" />
        </div>
      </van-cell>
    </van-row>

    <!--对方-->
    <van-row class="van-cell">
      <van-cell>
        <van-icon name="thumb-circle-o" color="red" size="2rem" />
        <span style="color: red;font-size: 1.0rem">应对</span>
        <div v-for="(tip, index) in JSON.parse(legend.enemytips || '[]')" :key="index">
          <span v-html="tip" />
        </div>
      </van-cell>
    </van-row>

  </div>
</template>

<script>
import { getDetail, getSpell, getSkin } from '@/api/hero'
import { spellSort } from '@/utils/enums'
export default {
  name: 'Index',
  data() {
    return {
      // 环形进度条设置
      circleOption: {
        rate: 100,
        currentRate: {
          attack: 0,
          magic: 0,
          defense: 0,
          difficulty: 0
        },
        size: '50px',
        gradientColor: [{
          '0%': '#f67d00',
          '100%': '#f67d00'
        }, {
          '0%': '#0005ff',
          '100%': '#0005ff'
        }, {
          '0%': '#ff0000',
          '100%': '#ff0000'
        }, {
          '0%': '#00f619',
          '100%': '#00f619'
        }
        ],
        text: ['物理', '魔法', '防御', '操作']
      },
      // 英雄明细对象
      legend: {
        alias: 'Annie',
        allytips: '[]',
        armor: 19,
        armorperlevel: 4,
        attack: 2,
        attackdamage: 50,
        attackdamageperlevel: 3,
        attackrange: 625,
        attackspeed: 1,
        attackspeedperlevel: 1,
        avatar: 'https://game.gtimg.cn/images/lol/act/img/champion/Annie.png',
        banAudio: 'https://game.gtimg.cn/images/lol/act/img/vo/ban/1.ogg',
        camp: '',
        crit: 0,
        critperlevel: 0,
        crowdControl: 3,
        damage: 3,
        damageType: 'kMagic',
        defense: 3,
        difficulty: 6,
        difficultyL: 1,
        durability: 1,
        enemytips: '',
        heroId: 1,
        heroVideoPath: '',
        hp: 524,
        hpperlevel: 88,
        hpregen: 5,
        hpregenperlevel: 1,
        id: 1,
        isWeekFree: false,
        magic: 10,
        mobility: 1,
        movespeed: 335,
        mp: 418,
        mpperlevel: 25,
        mpregen: 8,
        mpregenperlevel: 1,
        name: '黑暗之女',
        role: '[mage]',
        roles: null,
        selectAudio: 'https://game.gtimg.cn/images/lol/act/img/vo/choose/1.ogg',
        shortBio: '',
        spellblock: 30,
        spellblockperlevel: 0,
        style: 10,
        title: '安妮',
        utility: 2
      },
      // 英雄皮肤列表
      skins: [{
        chromaImg: '',
        chromas: 0,
        chromasBelongId: 0,
        description: '',
        emblemsName: 'base',
        heroId: 429,
        heroName: '复仇之矛',
        heroTitle: '卡莉丝塔',
        iconImg: 'https://game.gtimg.cn/images/lol/act/img/skin/small429000.jpg',
        id: 1199331369465121800,
        isBase: true,
        loadingImg: '',
        mainImg: 'https://game.gtimg.cn/images/lol/act/img/skin/big429000.jpg',
        name: '复仇之矛',
        publishTime: null,
        skinId: 429000,
        sourceImg: 'https://game.gtimg.cn/images/lol/act/img/guidetop/guide429000.jpg',
        suitType: '',
        vedioPath: '',
        videoImg: 'https://game.gtimg.cn/images/lol/act/img/skinvideo/sp429000.jpg'

      }],
      // 英雄技能列表
      spells: [],
      // 啰嗦模式转换
      convertMode: false
    }
  },
  computed: {
  },
  created() {
    this.fetchData()
  },
  mounted() {
  },
  methods: {
    // 初始化
    fetchData() {
      this.legend.heroId = this.$route.query.heroId

      // 详细信息
      getDetail(this.legend.heroId).then(response => {
        this.legend = response.data
        this.calAtt(this.circleOption, this.legend)
      })

      // 皮肤列表
      getSkin(this.legend.heroId).then(response => {
        this.skins = response.data
      })

      // 技能列表
      getSpell(this.legend.heroId).then(response => {
        // 规则排序
        for (const i in spellSort) {
          const spell = response.data.filter((s, index) => {
            return s.spellKey === spellSort[i]
          })[0]
          this.spells.push(spell)
        }
      })
    },
    // 计算属性
    calAtt(circleOption, legend) {
      circleOption.currentRate.attack = legend.attack * 10
      circleOption.text[0] = '物理' + legend.attack

      circleOption.currentRate.magic = legend.magic * 10
      circleOption.text[1] = '魔法' + legend.magic

      circleOption.currentRate.defense = legend.defense * 10
      circleOption.text[2] = '防御' + legend.defense

      circleOption.currentRate.difficulty = legend.difficulty * 10
      circleOption.text[3] = '操作' + legend.difficulty
      this.circleOption = circleOption
    },
    // 技能数组字符串转对象
    spellToObj(spell) {
      // 根据技能等级重新构造
      const costArr = JSON.parse(spell.cost.trim())
      const coolArr = JSON.parse(spell.cooldown.trim())
      const coolRange = JSON.parse(spell.range.trim())

      const spellObjs = []

      for (const i in costArr) {
        const obj = {
          level: parseInt(i) + 1,
          cost: costArr[i],
          cooldown: coolArr[i],
          range: coolRange[i]
        }
        spellObjs.push(obj)
      }

      let cost = ''
      let cool = ''
      let range = ''

      if (this.convertMode) {
        for (let i = 0; i < spellObjs.length; i++) {
          cost += 'lv' + spellObjs[i].level + ':' + spellObjs[i].cost
          if (i !== spellObjs.length - 1) {
            cost += ' '
          }

          cool += 'lv' + spellObjs[i].level + ':' + spellObjs[i].cooldown
          if (i !== spellObjs.length - 1) {
            cool += ' '
          }

          range += 'lv' + spellObjs[i].level + ':' + spellObjs[i].range
          if (i !== spellObjs.length - 1) {
            range += ' '
          }
        }
      } else {
        for (let i = 0; i < spellObjs.length; i++) {
          cost += spellObjs[i].cost
          cool += spellObjs[i].cooldown
          range += spellObjs[i].range
          if (i !== spellObjs.length - 1) {
            cost += '/'
            cool += '/'
            range += '/'
          }
        }
      }

      return {
        cost: cost,
        cooldown: cool,
        range: range
      }
    }
  }
}
</script>

<style scoped>

  .van-circle__text {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    color: #323233;
    font-weight: 500;
    font-size: 10px;
    line-height: 18px;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }
</style>
