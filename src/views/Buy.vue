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
    <!-- 座位 -->
    <div class="cinema">
      <div class="item" ref="cinema">
        <div class="cinema-item" v-for="(item,index) in cinema" :key="index">
          <span
            @click="chose(index,j,i)"
            :class="{on:i==1,off:i==2,chose:i==3}"
            v-for="(i,j) in item"
            :key="j"
          ></span>
        </div>

        <div class="sign">
          <div v-for="(item,index) in cinema" :key="index" class="sign-item">{{index+1}}</div>
        </div>
      </div>
    </div>
    <!-- 订单显示 -->
    <div class="indent">
      <span v-for="(item,index) in choseArr" :key="index">
        <span v-if="item.x">{{item.x}},{{item.y}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cinema: [],
      choseArr: []
    };
  },
  methods: {
    //根据票价选择影院
    setCinema() {
      if (this.$route.params.price <= 25) {
        this.cinema = this.$store.state.commonScreen;
        this.$refs.cinema.style.width = "230px";
      } else {
        this.cinema = this.$store.state.imaxScreen;
        this.$refs.cinema.style.width = "280px";
      }
    },
    //点击座位事件
    chose(x, y, i) {
      this.cinema[x][y] = 3;
      if (i == 2) {
        return;
      }
      if (this.choseArr.length == 0) {
        this.choseArr.push({ x: x + 1, y: y + 1 });
        return;
      }
      for (var i = 0; i < this.choseArr.length; i++) {
        if (this.choseArr[i].x == x + 1 && this.choseArr[i].y == y + 1) {
          this.cinema[x][y] = 1;
          this.choseArr = this.choseArr.filter(function(item) {
            return !(item.x == x + 1 && item.y == y + 1);
          });
          return;
        }
      }
      this.choseArr.push({ x: x + 1, y: y + 1 });
    }
  },
  mounted() {
    this.setCinema();
  }
};
</script>

<style lang="scss" scoped>
.contanier {
  position: relative;
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
    .item {
      margin-left: 50%;
      transform: translateX(-50%);
      position: relative;
      .sign {
        position: absolute;
        width: 10px;
        height: 100%;
        left: -20px;
        top: -4px;
        .sign-item {
          width: 100%;
          height: 13px;
          margin-top: 5px;
          font-size: $xs-font;
          line-height: 10px;
          text-align: center;
        }
      }
      .cinema-item {
        display: flex;
      }
      span {
        flex: 1;
        display: inline-block;
        width: 10px;
        height: 13px;
        margin-right: 5px;
        margin-bottom: 5px;
        &.on {
          background-color: rgb(162, 192, 162);
        }
        &.off {
          background-color: rgb(245, 107, 107);
        }
        &.chose{
          background-color: rgb(128, 155, 214);
        }
      }
    }
  }
  .indent {
    position: fixed;
    width: 100%;
    height: 50px;
    bottom: 50px;
  }
}
</style>