<template>
  <div class="movie" ref="view">
    <movieShow :data="comingsoon" />
  </div>
</template>

<script>
import BScroll from "better-scroll";
import movieShow from "../components/MovieShow";
export default {
  props: ["comingsoon"],
  components: {
    movieShow
  },
  mounted() {
    const scroll = new BScroll(this.$refs.view);
  },
};
</script>