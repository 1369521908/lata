<template>
  <div>
    <van-row>
      <!--图标-->
      <van-cell :title="legend.name+ ' ' + legend.title" :label="'金币: ' + 0 + ' 点券: ' + 0 + '\n' +setRole(legend)">
        <van-image
          :width="imgOption.width"
          :height="imgOption.height"
          :src="legend.avatar"
        />
      </van-cell>

      <van-tabs v-model="tabOption.active">
        <van-tab title="数据">
          <legend-data :hero-id="legend.heroId" />
        </van-tab>
        <van-tab title="版本">
          <legend-version :hero-id="legend.heroId" />
        </van-tab>
        <van-tab title="羁绊">
          <legend-relate :legend="legend.heroId" />
        </van-tab>
        <van-tab title="音效">
          <legend-sound :legend="legend.heroId" />
        </van-tab>
        <van-tab title="原画">
          <legend-artist :legend="legend.heroId" />
        </van-tab>
        <van-tab title="模型">
          <legend-model :legend="legend.heroId" />
        </van-tab>
      </van-tabs>

    </van-row>

  </div>
</template>

<script>
import { getDetail } from '@/api/hero'
import { role_zh } from '@/utils/enums'
export default {
  components: {
    legendData: () => import('@/views/legend/data/index'),
    legendVersion: () => import('@/views/legend/version/index'),
    legendRelate: () => import('@/views/legend/relate/index'),
    legendSound: () => import('@/views/legend/sound/index'),
    legendArtist: () => import('@/views/legend/artist/index'),
    legendModel: () => import('@/views/legend/model/index')
  },
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
        title: '',
        name: '',
        role: '[]'
      },
      price: {}
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
  },
  methods: {
    setRole(hero) {
      if (hero !== null && hero !== 'undefined') {
        return role_zh(hero.role).toString().replace(',', '/')
      } else {
        return ''
      }
    },
    fetchData() {
      this.legend.heroId = this.$route.params.heroId
      getDetail(this.legend.heroId).then(response => {
        this.legend = response.data
      })

      // 价格信息
      /* price(this.legend.heroId).then(response => {
        console.log(response)
        this.price = response.data.data
      })*/
    }
  }
}
</script>

<style scoped>

</style>
