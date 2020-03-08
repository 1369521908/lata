<template>
  <div>
    <div class="search-box">
      <van-row>
        <form action="/">
          <van-search
            v-model="searchOption.search"
            shape="round"
            placeholder="亚索/托儿所/剑豪 -> 回车走起"
            show-action
            @search="fetchData"
          >
            <div slot="action" @click="fetchData">搜索</div>
          </van-search>
        </form>
      </van-row>
    </div>

    <div class="hero-box">
      <!--<van-pull-refresh v-model="listOption.refreshing" @refresh="fetchData">

      </van-pull-refresh>-->
      <van-cell
        v-for="(legend, index) in listOption.legends"
        :key="index"
        :label="legend.name + ' ' + legend.title"
        :value="calRole(legend)"
        is-link
        @click="legendDetail(legend)"
      >
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <van-image
            class="img"
            :src="legend.avatar"
          />
        </template>
      </van-cell>
    </div>
  </div>

</template>

<script>
import { role_zh } from '@/utils/enums'
import { getList } from '@/api/hero'

export default {
  data() {
    return {
      tabOption: {
        active: 0
      },
      searchOption: {
        search: null
      },
      listOption: {
        currentPage: 0,
        pageSize: 999,
        legends: [],
        refreshing: false
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    calRole(hero) {
      if (hero.role) {
        return role_zh(hero.role).toString().replace(',', ' ')
      } else {
        return ''
      }
    },
    async fetchData() {
      const page = {
        currentPage: this.listOption.currentPage,
        pageSize: this.listOption.pageSize
      }
      const params = {
        name: !this.searchOption.search ? null : this.searchOption.search
      }
      getList(Object.assign(page, params)).then(response => {
        this.listOption.legends = response.data.records
        this.listOption.refreshing = false
      })
    },
    legendDetail(legend) {
      this.$router.push({ name: 'Legend', params: { heroId: legend.heroId }, query: { heroId: legend.heroId }})
    }
  }
}
</script>

<style scoped>

  .search-box {
    width: 100%;
    position: relative;
    /*z-index: 999;*/
    /*margin-top: 50px;*/
  }

  .hero-box {
    width: 100%;
    position: relative;
    overflow: auto;
    /*margin-bottom: 50px;*/
    /*margin-bottom: 10%;*/
  }

  .img {
    width: 50px;
    height: 50px;
  }
</style>
