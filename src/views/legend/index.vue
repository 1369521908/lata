<template>
  <div>
    <!--基本信息-->
    <van-cell>
      <van-image
        :width="imgOption.width"
        :height="imgOption.height"
        :src="legend.avatar"
      />
      <template slot="title">
        <span>{{ legend.name+ ` ` + legend.title }}</span>
      </template>
      <template slot="label">
        <span style="color: #ff5005">{{ legend.alias }}</span>
        <br>
        <span>金币: 0</span>
        <span>点券: 0</span>
        <br>
        <span>{{ setRole(legend) }}</span>
      </template>
    </van-cell>

    <!--tabs-->
    <van-tabs v-model="tabOption.active" animated swipeable sticky @click="onChange">
      <van-tab title="数据">
        <legend-data :hero-id="legend.heroId" />
      </van-tab>
      <van-tab title="技能">
        <legend-spell :hero-id="legend.heroId" />
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

  </div>
</template>

<script>
import { getDetail } from '@/api/hero'
import { role_zh } from '@/utils/enums'
export default {
  components: {
    legendData: () => import('@/views/legend/data/index'),
    legendSpell: () => import('@/views/legend/spell/index'),
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
      // 英雄对象
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
    // 计算英雄定位
    setRole(hero) {
      if (hero) {
        return role_zh(hero.role).toString().replace(',', ' ')
      } else {
        return ''
      }
    },
    fetchData() {
      if (this.$route.query.heroId) {
        getDetail(this.$route.query.heroId).then(response => {
          this.legend = response.data
        })
      }
      // 价格信息
      /* price(this.legend.heroId).then(response => {
        console.log(response)
        this.price = response.data.data
      })*/
    },
    onChange(name, title) {
      console.log(name)
      this.$emit('preViewClose')
    }
  }
}
</script>

<style scoped>

</style>
