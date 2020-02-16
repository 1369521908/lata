<template>
  <div>
    <div class="search-box">
      <van-row>
        <form action="/">
          <van-search v-model="searchOption.search" shape="round" placeholder="亚索/托儿所/剑豪 -> 回车走起" show-action @search="fetchData">
            <div slot="action" @click="fetchData">搜索</div>
          </van-search>
        </form>
      </van-row>
      <van-row />
    </div>

    <div class="hero-box">
      <van-cell-group>
        <van-cell v-for="(d, index) in listOption.legends" :key="index" :value="calName(d)" :label="calRole(d)" is-link>
          <!-- 使用 title 插槽来自定义标题 -->
          <template slot="title">
            <!--          <span class="custom-title">单元格</span>-->
            <!--          <van-tag type="danger">标签</van-tag>-->
            <van-image
              class="img"
              width="50px"
              height="50px"
              :src="d.avatar"
            />
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!--    <van-list-->
    <!--      v-model="listOption.loading"-->
    <!--      class="hero-box"-->
    <!--      :finished="listOption.finished"-->
    <!--      finished-text="没有更多了"-->
    <!--      @load="init"-->
    <!--    >-->
    <!--      &lt;!&ndash;      <van-cell v-for="item in list" :key="item" :title="item" />&ndash;&gt;-->
    <!--    </van-list>-->
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
        legends: [],
        loading: false,
        finished: false
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const page = {
        currentPage: 0,
        pageSize: 20
      }
      const params = {
        name: !this.searchOption.search ? null : this.searchOption.search
      }
      getList(Object.assign(page, params)).then(response => {
        this.listOption.legends = response.data.records
      })
    },
    calName(hero) {
      return hero.name + ' / ' + hero.title
    },
    calRole(hero) {
      return role_zh(hero.role).toString().replace(',', '/')
    }
  }
}
</script>

<style scoped>

  .search-box {
    width:100%;
    /*position: fixed;*/
    top: 0;
    z-index: 999;
  }

  .hero-box {
    width: 100%;
    overflow: auto;
  }

  .img {
  }
</style>
