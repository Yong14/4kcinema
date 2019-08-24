<template>
    <div>
        <div class="headers">
            <img :src="data.img | setWH('180.90')" alt="">
            <div class="header-desc">
                <h3>{{data.nm}}</h3>
                <p>主演：{{data.star}}</p>
                <p>导演：{{data.dir}}</p>
                <span>{{data.fra}}/{{data.oriLang}}/{{data.cat}}/片长{{data.dur}}分钟</span>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            data:{}
        }
    },
    mounted(){
        this.getMovieParticulars();
    },
    methods:{
        async getMovieParticulars(){
            let particular = await this.$http('/api/detailmovie?movieId='+this.$store.state.movieId);
            this.data = particular.data.data.detailMovie;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>