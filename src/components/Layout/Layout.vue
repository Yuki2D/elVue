<template>
    <div id="layout">
        <div class="sidebar">
            <side-bar></side-bar>
        </div>
        <div class="main">
            {{this.$route.path}}
            <keep-alive>
                <component :is="currentComponent"></component>
            </keep-alive>
            <!-- <router-view></router-view> -->
        </div>
    </div>
</template>

<script>
import mainContainer from "./mainContainer/mainContainer"
import sideBar from "./sideBar/sideBar"
import role from "./system/role/index"
export default {
    name: "layout",
    components: {mainContainer, sideBar},
    computed: {
        currentComponent: ()=> import ('./system/role/index')
    }
}
</script>

<style lang="scss" scoped>
    #layout{
        display: flex;
    }
    .sidebar{
        width: 180px;
    }
    .main{

    }
</style>
