<template>
    <div id="mainContainer">
        <router-view :key="key"/>
        {{this.$route.path}}
    </div>
</template>

<script>
export default {
    name: "mainContainer",
    watch: {
        $routes: (val)=>{
            console.log(val)
        }   
    },
    computed: {
        key(){
            return this.$route.path
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
