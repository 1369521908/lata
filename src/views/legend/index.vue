<template>
  <div>
    <van-row>
      <van-image
        width="100"
        height="100"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
    </van-row>
  </div>
</template>

<script>
export default {
  props: {
    legend: {
      type: Object,
      default: () => {
        return {}
      },
      required: false
    }
  },
  data() {
    return {

    }
  },
  created() {
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
