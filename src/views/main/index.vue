<template>
  <div>

    <van-row style="margin-bottom: 10%">
      <transition name="fade">
        <div v-if="active === 'legend'">
          <Legends />
        </div>
        <div v-if="active === 'runes'">
          <Legends />
        </div>
        <div v-if="active === 'summonerSkill'">
          <Legends />
        </div>
        <div v-if="active === 'item'">
          <Legends />
        </div>
        <div v-if="active === 'me'">
          <Legends />
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
    Legends: () => import ('@/views/legends/index')
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

</style>
