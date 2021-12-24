<template>
  <div :title="title" style="display: inline-block; margin-left: 5px">
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </div>
</template>

<script>
export default {
  name: 'MiniButton',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>
