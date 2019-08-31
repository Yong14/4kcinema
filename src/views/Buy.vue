<template>
  <div class="contanier">
    <header>{{$route.params.nm}}</header>
    <div class="desc">
      <div class="movie-item">
        <h3>{{$route.params.movie}}</h3>
        <span>{{$route.params.time}}</span>
        <span>&#58;</span>
        <span>&#48;</span>
        <span>&#48;</span>
      </div>
      <span class="hint">
        <span class="icon-check_circle"></span>3D眼镜需自备或到影院购买
      </span>
    </div>

    <div class="cinema">
      <div class="item" ref="cinema">
        <div class="cinema-item" v-for="(item,index) in cinema" :key="index">
          <span :class="{on:i==1,off:i==2}" v-for="(i,j) in item" :key="j"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cinema: []
    };
  },
  methods: {
    //根据票价选择影院
    setCinema() {
      if (this.$route.params.price <= 25) {
        this.cinema = this.$store.state.commonScreen;
        this.$refs.cinema.style.width = '230px'
      } else {
        this.cinema = this.$store.state.imaxScreen;
        this.$refs.cinema.style.width = '280px'
      }
    }
  },
  mounted() {
    this.setCinema();
  }
};
</script>

<style lang="scss" scoped>
.contanier {
  width: 100%;
  height: 100%;
  header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-weight: 700;
    background-color: #1f1f25;
    color: #fff;
    text-align: center;
  }
  .desc {
    width: 100%;
    height: 70px;
    padding: 10px;
    // border-bottom: 1px solid rgba(145, 141, 141, 0.459);
    .movie-item {
      width: 100%;
      height: 40px;
      border-bottom: 1px solid rgba(145, 141, 141, 0.459);
      h3 {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        font-weight: 600;
        font-family: "宋体";
        letter-spacing: 2px;
        margin-right: 5px;
      }
      span {
        font-size: $md-font;
        color: #949494;
      }
    }
    .hint {
      display: block;
      margin-top: 5px;
      font-size: $md-font;
      color: #949494;
      span {
        &:first-child {
          color: rgb(66, 218, 129);
        }
      }
    }
  }
  .cinema {
    width: 100%;
    height: 350px;
    margin-top: 5px;
    padding: 20px;
    background-color: rgb(233, 233, 233);
    .item{
      margin-left: 50%;
      transform: translateX(-50%);
      .cinema-item{
        display: flex;

      }
      span{
        flex: 1;
        display: inline-block;
        width: 10px;
        height: 13px;
        margin-right: 5px;
        margin-bottom: 5px;
        &.on{
          background-color: rgb(162, 192, 162);
        }
        &.off{
          background-color: rgb(245, 107, 107);
        }
      }
    }
  }
}
</style>