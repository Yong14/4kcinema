<template>
  <div class="movie" ref="view">
    <movieShow :data="newPalyData" />
  </div>
</template>  

<script>
import BScroll from "better-scroll";
import movieShow from "../components/MovieShow";

export default {
  props: [],
  data() {
    return {
      newPalyData: [],
      initId: -1,
      msgBoxIsShow: true
    };
  },
  computed: {},
  methods: {
    async getNewPlay() {
      

      if (this.$store.state.id === this.initId) {
        return;
      }
      //请求正在热映的数据
      let res = await this.$http(
        "/api/movieOnInfoList?cityId=" + this.$store.state.id
      );
      res = res.data.data.movieList;
      this.newPalyData = res;
      this.initId = this.$store.state.id;
      this.$nextTick(function() {
        if (this.scroll) {
          this.scroll.refresh();
        } else {
          this.scroll = new BScroll(this.$refs.view,{
            click: true
          });
        }
      });
    }
  },
  mounted() {
    this.getNewPlay();
  },
  components: {
    movieShow
  }
};
</script>

<style lang="scss" scoped>
</style>