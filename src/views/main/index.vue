<template>
  <div>
    <van-nav-bar title="lata" left-text="" :fixed="true" :border="false">
      <van-icon name="" />
      <van-icon slot="right" name="ellipsis" />
    </van-nav-bar>

    <van-row class="container">
      <transition name="van-fade">
        <div v-show="active === 'legend'">
          <legends />
        </div>
      </transition>
      <transition name="van-fade">
        <div v-show="active === 'runes'">
          <legend-data />
        </div>
      </transition>
      <transition name="van-fade">
        <div v-show="active === 'summonerSkill'">
          <summoner-skill />
        </div>
      </transition>
      <transition name="van-fade">
        <div v-show="active === 'item'">
          <items />
        </div>
      </transition>
      <transition name="van-fade">
        <div v-show="active === 'me'">
          <me />
        </div>
      </transition>
    </van-row>

    <!--导航栏-->
    <van-row>
      <van-tabbar v-model="active">
        <van-tabbar-item name="legend" icon="home-o">英雄</van-tabbar-item>
        <van-tabbar-item name="runes" icon="search">符文</van-tabbar-item>
        <van-tabbar-item name="summonerSkill" icon="search">技能</van-tabbar-item>
        <van-tabbar-item name="item" icon="friends-o">物品</van-tabbar-item>
        <van-tabbar-item name="me" icon="setting-o">我的</van-tabbar-item>
      </van-tabbar>
    </van-row>

  </div>
</template>

<script>
export default {
  components: {
    legends: () => import ('@/views/legends/index'),
    legendData: () => import ('@/views/runes/index'),
    summonerSkill: () => import ('@/views/summonerSkill/index'),
    items: () => import ('@/views/items/index'),
    me: () => import ('@/views/me/index')
  },
  data() {
    return {
      active: 'legend'
    }
  },
  methods: {
    onChange() {
    }
  }
}
</script>

<style scoped>

  .container {
    /*margin-bottom: 50px;*/
    /*margin-top: 45px;*/
    margin-bottom: calc(45px);
    margin-top: 45px;

  }

  .van-nav-bar {
    /*background-color: #1989fa;*/
  }

  .van-nav-bar__title {
    /*color: white;*/
  }

</style>
