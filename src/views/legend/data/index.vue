<template>
  <div>

    <!--定位属性值-->
    <van-row class="van-cell" style="height: 20%; width: 100%;">
      <van-col span="6">
        <van-circle
          v-model="circleOption.currentRate.attack"
          :rate="circleOption.rate"
          :color="circleOption.gradientColor[0]"
          :size="circleOption.size"
          :text="circleOption.text[0]"
        />
      </van-col>
      <van-col span="6">
        <van-circle
          v-model="circleOption.currentRate.magic"
          :rate="circleOption.rate"
          :color="circleOption.gradientColor[1]"
          :size="circleOption.size"
          :text="circleOption.text[1]"
        />
      </van-col>
      <van-col span="6">
        <van-circle
          v-model="circleOption.currentRate.defense"
          :rate="circleOption.rate"
          :color="circleOption.gradientColor[2]"
          :size="circleOption.size"
          :text="circleOption.text[2]"
        />
      </van-col>
      <van-col span="6">
        <van-circle
          v-model="circleOption.currentRate.difficulty"
          :rate="circleOption.rate"
          :color="circleOption.gradientColor[3]"
          :size="circleOption.size"
          :text="circleOption.text[3]"
        />
      </van-col>
    </van-row>

    <!--原画-->
    <van-row>
      <van-image
        width="10rem"
        height="10rem"
        fit="contain"
        src="https://game.gtimg.cn/images/lol/act/img/skinloading/84000.jpg"
      />
    </van-row>

  </div>
</template>

<script>
import { getDetail } from '@/api/hero'
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
        size: '60px',
        gradientColor: [{
          '0%': '#3fecff',
          '100%': '#6149f6'
        }, {
          '0%': '#ff9a60',
          '100%': '#7bf645'
        }, {
          '0%': '#9028ff',
          '100%': '#f64c44'
        }, {
          '0%': '#1afff2',
          '100%': '#f6d411'
        }
        ],
        text: ['物理', '魔法', '防御', '操作']
      },
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
      }
    }
  },
  created() {
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getDetail(this.$route.query.heroId).then(response => {
        this.legend = response.data
        this.calAtt(this.circleOption, this.legend)
      })
    },
    calAtt(circleOption, legend) {
      circleOption.currentRate.attack = legend.attack * 10
      circleOption.text[0] = '物理' + legend.attack * 10 + '%'

      circleOption.currentRate.magic = legend.magic * 10
      circleOption.text[1] = '魔法' + legend.magic * 10 + '%'

      circleOption.currentRate.defense = legend.defense * 10
      circleOption.text[2] = '防御' + legend.defense * 10 + '%'

      circleOption.currentRate.difficulty = legend.difficulty * 10
      circleOption.text[3] = '操作' + legend.difficulty * 10 + '%'
      this.circleOption = circleOption
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
