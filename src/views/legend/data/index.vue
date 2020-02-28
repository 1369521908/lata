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

      </van-col>

      <!--右边-->
      <van-col span="12">
        <van-image
          width="13rem"
          height="13rem"
          fit="contain"
          :src="skins[0].loadingImg"
        />
      </van-col>
    </van-row>

    <!--技能-->
    <van-row class="van-cell">
      <van-col span="24">

        <van-cell v-for="(spell, index) in spells" :key="index">

          <van-row>
            <!--技能图标-->
            <van-image
              width="3rem"
              height="3rem"
              fit="contain"
              :src="spell.abilityIconPath"
            />
            <span v-show="spell.spellKey === 'passive'" style="color: purple">被动 {{ spell.name }}</span>
          </van-row>

          <!--技能条件-->
          <van-row style="color: #20a0ff">
            <span v-show="spell.cost === 'false'"> 技能消耗 无 </span>
            <span v-show="spell.cost !== 'false'"> {{ spellToObj(spell).cost }} </span>
          </van-row>

          <van-row>
            <span> {{ spell.description }} </span>
          </van-row>

        </van-cell>
        <br>
      </van-col>
    </van-row>

  </div>
</template>

<script>
import { getDetail, getSpell, getSkin } from '@/api/hero'
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
      spells: []
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
        this.spells = response.data
        this.spells.sort((a, b) => {
          return a.spellKey.length - b.spellKey.length
        }).reverse()
        console.log(this.spells)
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
    // 技能转对象
    spellToObj(spell) {
      // 根据技能等级重新构造
      const costArr = JSON.parse(spell.cost.trim())
      console.log(costArr)

      const costObjs = []
      for (const i in costArr) {
        costObjs.push(costArr[i])
      }

      return {
        cost: '技能消耗 ' + spell.cost,
        cooldown: '冷却时间 ' + spell.cooldown
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
