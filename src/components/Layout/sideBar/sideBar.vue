<template>
    <div id="sidebar" class="sidebar-container">
        <el-menu default-active="2">
            <el-menu-item class="myindex">
                <router-link to="/dashboard">
                    <i class="iconfont icon-index" ></i>    
                    <span>首页</span>
                </router-link>
            </el-menu-item>
            <el-submenu v-for="(item,index) in routes" :key="index" :index="index+'1'" >
                <template slot="title">
                    <i :class="`iconfont icon-${item.icon}`" ></i>   
                    <span>{{item.name}}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item style="padding-left: 0;" v-for="(each,ind) in item.children" :key="ind" :index="index+'-'+ind" >
                        <router-link :to="{path: `/${item.path}/${each.path}`}" :key="each.name">
                            <i :class="`iconfont icon-${each.icon}`" ></i>    
                            <span>{{each.name}}</span>
                        </router-link>
                        <!-- <div @click="showView(item,each)">
                            <i :class="`iconfont icon-${each.icon}`" ></i>    
                            <span>{{each.name}}</span>
                        </div> -->
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "sidebar",
    data(){
        return {
            routes: []
        }
    },
    created(){
        this.initView()
    },
    methods: {
        async initView(){
            let res = await this.$http({
                url: "/api/menus",
                method: "get",
                data: ""
            })
            this.routes = res.resp.records
        },
        // showView: function(item,each){
        //     this.$router.push({path: `/${item.path}/${each.path}`})
        // }
    }
}
</script>

<style lang="scss" scoped>
</style>
