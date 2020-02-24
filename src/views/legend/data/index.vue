<template>
  <div>

    <van-row class="van-cell" style="height: 20%; width: 100%; display: flex">
      <van-col span="6">
        <van-circle
          v-model="circleOption.currentRate[0]"
          :rate="circleOption.rate"
          :color="circleOption.gradientColor[0]"
          :size="circleOption.size"
          :speed="circleOption.speed"
          :text="circleOption.text[0]"
        />
      </van-col>
      <van-col span="6">
        <van-circle
          v-model="circleOption.currentRate[1]"
          :rate="circleOption.rate"
          :color="circleOption.gradientColor[1]"
          :size="circleOption.size"
          :speed="circleOption.speed"
          :text="circleOption.text[1]"
        />
      </van-col>
      <van-col span="6">
        <van-circle
          v-model="circleOption.currentRate[2]"
          :rate="circleOption.rate"
          :color="circleOption.gradientColor[2]"
          :size="circleOption.size"
          :speed="circleOption.speed"
          :text="circleOption.text[2]"
        />
      </van-col>
      <van-col span="6">
        <van-circle
          v-model="circleOption.currentRate[3]"
          :rate="circleOption.rate"
          :color="circleOption.gradientColor[3]"
          :size="circleOption.size"
          :speed="circleOption.speed"
          :text="circleOption.text[3]"
        />
      </van-col>
    </van-row>

  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      // 环形进度条设置
      circleOption: {
        rate: 100,
        currentRate: [10, 20, 30, 40],
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
      }
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
  },
  methods: {
    fetchData() {

    }
  }
}
</script>

<style scoped>

</style>
