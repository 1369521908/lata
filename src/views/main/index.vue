<template>
  <div>

    <van-row class="dashboard">
      <transition name="fade">
        <div v-if="active === 'legend'">
          <legends />
        </div>
        <div v-if="active === 'runes'">
          <legend-data />
        </div>
        <div v-if="active === 'summonerSkill'">
          <summoner-skill />
        </div>
        <div v-if="active === 'item'">
          <items />
        </div>
        <div v-if="active === 'me'">
          <me />
        </div>
      </transition>
    </van-row>
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

  .dashboard {
    margin-bottom: 10%;
  }

</style>
