<script>
export default {
    beforeCreated(){
    },
    created(){
        const {query} = this.$route
        const {path} = query
        this.$router.replace({path: '/'+path, query})
        console.log('/'+path)
    },
    watch: {
        $routes: (val)=>{
            console.log(val)
        }       
    },
    render(h){
        return h()
    }
}
</script>
