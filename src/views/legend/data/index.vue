<template>
  <div>

    <!--基本属性值-->
    <van-row class="van-cell" style="height: 20%;">

      <!--左边-->
      <van-col span="12">

        <!--属性-->
        <van-row>

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

        <!--广告位?-->
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

      <!--右边-->
      <van-col span="12">
        <!--width="3rem"-->
        <!--height="3rem"-->
        <van-image
          fit="contain"
          :src="skins[0].loadingImg"
          @click="preView"
        />

        <!--图片预览-->
        <van-image-preview ref="preview" v-model="preViewOption.show" :images="preViewOption.images" @change="preViewChange">
          <template v-slot:index>
            <span>{{ preViewOption.name }}</span>
            <span>{{ (preViewOption.index+ 1) + '/' + preViewOption.images.length }}</span>
          </template>
        </van-image-preview>
      </van-col>
    </van-row>

    <van-cell>
      <span>基本信息</span>
    </van-cell>

    <!--基本信息-->
    <van-row class="van-cell">

      <van-row>
        <div>

          <span>移动速度:</span>
          <span class="hero-attribute">{{ legend.movespeed }}</span><br>
          <!--<span class="hero-attribute-change"> + {{ legend.movespeed }}/每级</span><br>-->

          <span>攻击距离:</span>
          <span class="hero-attribute">{{ legend.attackrange }}</span><br>
          <!--<span class="hero-attribute"> + {{ legend.attackrange }}/每级</span><br>-->

          <span>暴击:</span>
          <span class="hero-attribute">{{ legend.crit }}</span><br>
          <!--<span class="hero-attribute"> + {{ legend.attackrange }}/每级</span><br>-->

          <span>攻击力:</span>
          <span class="hero-attribute">{{ legend.attackdamage }}</span>
          <span class="hero-attribute-change"> + {{ legend.attackdamageperlevel }}/每级</span><br>

          <span>攻击速度:</span>
          <span class="hero-attribute">{{ legend.attackspeed }}</span>
          <span class="hero-attribute-change"> + {{ legend.attackspeedperlevel / 100 }}/每级</span><br>

          <span>施法前摇:</span>
          <span class="hero-attribute">{{ legend.spellblock }}</span>
          <span class="hero-attribute-change"> - {{ legend.spellblockperlevel }}/每级</span><br>

          <span>护甲:</span>
          <span class="hero-attribute">{{ legend.armor }}</span>
          <span class="hero-attribute-change"> + {{ legend.armorperlevel }}/每级</span><br>

          <span>法术抗性:</span>
          <span class="hero-attribute">{{ legend.movespeed }}</span>
          <span class="hero-attribute-change"> + {{ legend.movespeed }}/每级</span><br>

          <span>生命值:</span>
          <span class="hero-attribute">{{ legend.hp }}</span>
          <span class="hero-attribute-change"> + {{ legend.movespeed }}/每级</span><br>

          <span>法力值:</span>
          <span class="hero-attribute">{{ legend.mp }}</span>
          <span class="hero-attribute-change"> + {{ legend.movespeed }}/每级</span><br>

          <span>生命回复:/5秒</span>
          <span class="hero-attribute">{{ legend.hpregen }}/5秒</span>
          <span class="hero-attribute-change"> + {{ legend.movespeed }}/每级</span><br>

          <span>法力回复:</span>
          <span class="hero-attribute">{{ legend.mpregen }}/5秒</span>
          <span class="hero-attribute-change"> + {{ legend.movespeed }}/每级</span><br>

          <span>法力回复:</span>
          <span class="hero-attribute">{{ legend.mpregen }}/5秒</span>
          <span class="hero-attribute-change"> + {{ legend.movespeed }}/每级</span><br>

        </div>
      </van-row>

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
      // 图片预览组件设置
      preViewOption: {
        show: false,
        index: 0,
        name: '',
        title: '',
        images: []
      },
      // 英雄明细对象
      legend: {
        alias: 'Annie',
        allytips: '',
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
  destroyed() {
    this.preViewOption.show = false
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
    },
    // 图片预览
    preView() {
      this.preViewOption.images = this._.map(this.skins.filter((s, index) => {
        return s.loadingImg
      }), 'loadingImg')
      this.preViewOption.show = true

      if (this.skins[0].name) {
        this.preViewOption.name = this.skins[0].name
      }
    },
    // 图片预览改变
    preViewChange(index) {
      this.preViewOption.index = index
      this.preViewOption.name = this.skins.filter((i, index) => { return i.loadingImg })[index].name
    },
    // 图片预览关闭
    preViewClose() {
      this.preViewOption.show = false
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

  .hero-attribute {
    color: orangered;
  }

  .hero-attribute-change {
    color: blueviolet;
  }

</style>
