<template>
    <div>角色管理</div>
</template>

<script>
export default {
  beforeCreate() {
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
  },
  created(){
      console.log(this.$router)
  },
  render: function(h) {
    return h(
    ) // avoid warning message
  }
}
</script>
