<template>
  <div>
    <van-row>
      <!--图标-->
      <van-cell :title="legend.name+ ' ' + legend.title" :label="'金币: ' + legend.name + ' 点券: ' + legend.title + '\n' + calRole(legend)">
        <van-image
          :width="imgOption.width"
          :height="imgOption.height"
          :src="legend.avatar"
        />
      </van-cell>

      <!--数据-->
      <van-tabs v-model="tabOption.active">
        <van-tab title="数据">数据</van-tab>
        <van-tab title="版本">版本</van-tab>
        <van-tab title="羁绊">羁绊</van-tab>
        <van-tab title="音效">音效</van-tab>
        <van-tab title="原画">原画</van-tab>
      </van-tabs>

    </van-row>

  </div>
</template>

<script>
import { get, getDetail } from '@/api/hero'
import { role_zh } from '@/utils/enums'
export default {
  props: {
  },
  data() {
    return {
      // 头像配置
      imgOption: {
        width: 75,
        height: 75
      },
      // tab配置
      tabOption: {
        active: 0
      },
      // 英雄数据对象
      legend: {
        heroId: 1,
        avatar: '',
        role: '[mage]'
      }
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
  },
  methods: {
    calRole(hero) {
      if (hero !== null && hero !== 'undefined') {
        return role_zh(hero.role).toString().replace(',', '/')
      } else {
        return ''
      }
    },
    fetchData() {
      this.legend.heroId = this.$route.params.heroId
      getDetail(this.legend.heroId).then(response => {
        console.log(response)
        this.legend = response.data
      })

      get(this.legend.heroId).then(response => {
      })
    }
  }
}
</script>

<style scoped>

</style>
