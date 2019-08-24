<template>
  <div class="movie" ref="view">
    <movieShow :data="comingsoon" />
  </div>
</template>

<script>
import BScroll from "better-scroll";
import movieShow from "../components/MovieShow";
export default {
  props: [],
  data: () => ({
    comingsoon: [],
    initId : -1
  }),
  components: {
    movieShow
  },
  methods: {
    async getNewPlay() {
      if (this.$store.state.id === this.initId) {
        return;
      }
      // 请求即将上映的数据
      let res1 = await this.$http(
        "/api/movieComingList?cityId=" + this.$store.state.id
      );
      res1 = res1.data.data.comingList;
      this.comingsoon = res1;
      this.initId = this.$store.state.id;
      this.$nextTick(()=>{
        this.initBScroll();
      })
    },
    initBScroll(){
      if(this.scroll){
        this.scroll.refresh();
      }else{
        this.scroll = new BScroll(this.$refs.view,{
          click: true
        });
      }
    }
  },
  mounted() {
    this.getNewPlay();
  }
};
</script>