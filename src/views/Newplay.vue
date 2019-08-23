<template>
  <div class="movie" ref="view">
    <movieShow :data="newPalyData.data.movieList" />
  </div>
</template>  

<script>
import BScroll from "better-scroll";
import movieShow from "../components/MovieShow";

export default {
  props: ["newPalyData"],
  computeds: {},
  mounted() {
    this.$nextTick(function() {
      if (this.scroll) {
        this.scroll.refresh();
      } else {
        this.scroll = new BScroll(this.$refs.view);
      }
    });
  },
  components: {
    movieShow
  }
};
</script>

<style lang="scss" scoped>
</style>