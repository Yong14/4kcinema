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
      <div ref="content" class="content">
        <div ref="indent">
          <div class="indent-item" v-for="(item,index) in choseArr" :key="index">
            <span v-if="item.x">{{item.x}}排{{item.y}}座</span>
            <p>￥{{$route.params.price}}</p>
          </div>
        </div>
      </div>

      <div @click="pay" class="price">{{prices}}</div>
    </div>
    <!-- 弹窗 -->
    <div v-show="showPay" class="cover">
      <h3>确认支付{{prices}}</h3>
      <div @click="affirm" class="btn">确认</div>
      <div @click="showPay=false" class="btn">取消</div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      cinema: [],
      choseArr: [],
      showPay: false
    };
  },
  computed: {
    //总价
    prices() {
      if (this.choseArr.length == 0) {
        return "请选择座位";
      } else {
        return `￥${this.$route.params.price * this.choseArr.length}`;
      }
    }
  },
  methods: {
    //确认支付
    affirm() {
      this.showPay = false;
      // 更改该场次已购信息
      for (var i = 0; i < this.cinema.length; i++) {
        for (var j = 0; j < this.choseArr.length; j++) {
          if (i == this.choseArr[j].x - 1) {
            for (var k = 0; k < this.cinema[i].length; k++) {
              if (k == this.choseArr[j].y - 1) {
                this.cinema[i][k] = 2;
              }
            }
          }
        }
      }
      this.choseArr = [];
      //写入本地存储
      let movieId = this.$route.params.movieId;
      let cinemaId = this.$store.state.cinemaId;
      let time = this.$route.params.time;
      let cinema = this.cinema;
      let bool = true;
      // 读取本地tickitDb
      let tickitDb = window.localStorage.getItem("tickitDb");
      if (tickitDb) {
        tickitDb = JSON.parse(tickitDb);
        for (var i = 0; i < tickitDb.length; i++) {
          if (
            tickitDb[i].movieId == movieId &&
            tickitDb[i].cinemaId == cinemaId &&
            tickitDb[i].time == time
          ) {
            tickitDb[i].cinema = cinema;
            bool = false;
            break;
          }
        }
        if (bool) {
          tickitDb.push({ movieId, cinemaId, time, cinema });
        }
        console.log(2, tickitDb);
        window.localStorage.setItem("tickitDb", JSON.stringify(tickitDb));
      } else {
        let tickitDb = [{ movieId, cinemaId, time, cinema }];
        console.log(1, tickitDb);
        window.localStorage.setItem("tickitDb", JSON.stringify(tickitDb));
      }
    },
    //确认订单
    pay() {
      if (this.choseArr.length == 0) {
        return;
      }
      this.showPay = true;
    },
    //初始化BScroll
    initBScroll() {
      if (this.content) {
        this.content.refresh();
        this.setIndentW();
      } else {
        this.content = new BScroll(this.$refs.content, {
          scrollX: true
        });
      }
    },
    //动态修改ref = indent的宽度
    setIndentW() {
      this.$refs.indent.style.width = `${this.choseArr.length * 75}px`;
    },
    //首次进入该影院的该场次
    choseCinema() {
      let movieId = this.$route.params.movieId;
      let cinemaId = this.$store.state.cinemaId;
      let time = this.$route.params.time;
      let tickitDb = window.localStorage.getItem("tickitDb");
      if (tickitDb) {
        tickitDb = JSON.parse(tickitDb);
        for (var i = 0; i < tickitDb.length; i++) {
          if (
            tickitDb[i].movieId == movieId &&
            tickitDb[i].cinemaId == cinemaId &&
            tickitDb[i].time == time
          ) {
            this.cinema = tickitDb[i].cinema;
            if(this.cinema[0].length>9){
              this.$refs.cinema.style.width = "280px";
            }else{
              this.$refs.cinema.style.width = "230px";
            }
            
            return;
          }
        }
        if (this.$route.params.price <= 25) {
          let localCinema = window.localStorage.getItem("commonScreen");
          if (localCinema) {
            this.cinema = JSON.parse(localCinema);
          } else {
            window.localStorage.setItem(
              "commonScreen",
              JSON.stringify(this.$store.state.commonScreen)
            );
            this.cinema = JSON.parse(
              window.localStorage.getItem("commonScreen")
            );
          }
          this.$refs.cinema.style.width = "230px";
        } else {
          let localCinema = window.localStorage.getItem("imaxScreen");
          if (localCinema) {
            this.cinema = JSON.parse(localCinema);
          } else {
            window.localStorage.setItem(
              "imaxScreen",
              JSON.stringify(this.$store.state.imaxScreen)
            );
            this.cinema = JSON.parse(window.localStorage.getItem("imaxScreen"));
          }
          this.$refs.cinema.style.width = "280px";
        }
      } else {
        if (this.$route.params.price <= 25) {
          let localCinema = window.localStorage.getItem("commonScreen");
          if (localCinema) {
            this.cinema = JSON.parse(localCinema);
          } else {
            window.localStorage.setItem(
              "commonScreen",
              JSON.stringify(this.$store.state.commonScreen)
            );
            this.cinema = JSON.parse(
              window.localStorage.getItem("commonScreen")
            );
          }
          this.$refs.cinema.style.width = "230px";
        } else {
          let localCinema = window.localStorage.getItem("imaxScreen");
          if (localCinema) {
            this.cinema = JSON.parse(localCinema);
          } else {
            window.localStorage.setItem(
              "imaxScreen",
              JSON.stringify(this.$store.state.imaxScreen)
            );
            this.cinema = JSON.parse(window.localStorage.getItem("imaxScreen"));
          }
          this.$refs.cinema.style.width = "280px";
        }
      }
    },

    //根据票价选择影院
    setCinema() {
      // let tickitDb = window.localStorage.getItem("tickitDb");
      // if (tickitDb) {
      //   for(){

      //   }
      // }else{
      this.choseCinema();
      // }
    },
    //点击座位事件
    chose(x, y, i) {
      this.cinema[x][y] = 3;
      if (i == 2) {
        this.initBScroll();
        return;
      }
      if (this.choseArr.length == 0) {
        this.choseArr.push({ x: x + 1, y: y + 1 });
        this.initBScroll();
        return;
      }
      for (var i = 0; i < this.choseArr.length; i++) {
        if (this.choseArr[i].x == x + 1 && this.choseArr[i].y == y + 1) {
          this.cinema[x][y] = 1;
          this.choseArr = this.choseArr.filter(function(item) {
            return !(item.x == x + 1 && item.y == y + 1);
          });
          this.initBScroll();
          return;
        }
      }
      this.choseArr.push({ x: x + 1, y: y + 1 });
      this.initBScroll();
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
        box-sizing: border-box;
        &.on {
          // border: 1px solid rgba(204, 204, 204, 0.5);
          border: 1px solid #ccc;
        }
        &.off {
          background-color: rgb(245, 107, 107);
          border: 1px solid rgb(245, 107, 107);
        }
        &.chose {
          background-color: #01c13b;
          border: 1px solid #01c13b;
        }
      }
    }
  }
  .indent {
    position: fixed;
    width: 100%;
    height: 70px;
    bottom: 70px;
    .content {
      width: 100%;
      height: 45px;
      white-space: nowrap;
      overflow: hidden;
    }
    .indent-item {
      display: inline-block;
      width: 70px;
      height: 45px;
      line-height: 20px;
      text-align: center;
      border: 1px solid #dedede;
      box-sizing: border-box;
      font-size: $md-font;
      background-color: #fff;
      border-radius: 5px;
      margin-left: 5px;
      p {
        color: #e86445;
      }
    }
    .price {
      width: 100%;
      height: 40px;
      background-color: #f19e38;
      border-radius: 5px;
      font-size: $lg-font;
      font-weight: 600;
      text-align: center;
      line-height: 40px;
      color: #f2f2f2;
    }
  }
  .cover {
    position: fixed;
    width: 200px;
    height: 70px;
    left: 50%;
    bottom: 250px;
    transform: translateX(-50%);
    text-align: center;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-shadow: 0 0 2px 2px #ccc;
    h3 {
      display: block;
      width: 100%;
      height: 30px;
      line-height: 30px;
      background-color: #ccc;
    }
    .btn {
      display: inline-block;
      width: 50%;
      height: 40px;
      line-height: 40px;
      color: rgba(182, 165, 145, 0.993);
    }
  }
}
</style>