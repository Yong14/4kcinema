<template>
  <div>
    <div class="serch">
      <input v-model="msg" type="text" class="form-control" placeholder="请输入影片名" />
      <button @click="click" type="submit" class="btn btn-primary">搜索</button>
    </div>
    <div class="movieShow" ref="movieShow">
      <MovieShow :data="movieList" />
    </div>
  </div>
</template>

<script>
import MovieShow from "../components/MovieShow";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      msg: "",
      movieList: []
    };
  },
  components: {
    MovieShow
  },
  methods: {
    click() {
      var full = pinyin.getFullChars(this.msg);
      this.axios
        .get("/api/searchList?cityId=" + this.$store.state.id + "&kw=" + full)
        .then(res => {
          if (res.data.data.movies) {
            this.movieList = res.data.data.movies.list;
          }
        });
      this.initBScroll();
    },
    //初始化滚动BScroll
    initBScroll() {
      if (this.movieShow) {
        this.movieShow.refresh();
      } else {
        this.movieShow = new BScroll(this.$refs.movieShow, {
          click: true
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.serch {
  display: flex;
}
.movieShow {
  height: 90%;
  overflow: hidden;
}
</style>