<template>
  <div class="container">
    <header class="cinema-nm">
      <div class="cinema-text">
        <h3>{{nm}}</h3>
        <p>{{addr}}</p>
      </div>
      <div class="icon-map"></div>
    </header>

    <div :style="{backgroundImage:`url(${bgImg})`}" class="cinema-movie">
      <div class="cover">
        <div class="movie-box" ref="movieBox">
          <ul ref="ul">
            <li ref="li" v-for="(item,index) in movieList" :key="item.id" class="movie-item">
              <div :class="['item',{active:index==cureent}]">
                <img :src="item.img | setWH('200.380')" alt />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="movieDetail">
      <div class="movieTitle">
        <h3 v-if="movieList[cureent]">{{movieList[cureent].nm}}</h3>
        <p>
          <span class="sc" v-if="movieList[cureent]">{{movieList[cureent].sc}}</span>分
        </p>
      </div>
      <span class="star" v-if="movieList[cureent]">{{movieList[cureent].star}}</span>
    </div>

    <div class="time">
      <a>今天</a>
      /
      <a to="/buytickit/seat">明天</a>
    </div>

    <div class="time-box">
      <ChoseTime @buy="buy" :time="10" :price="33" />
      <ChoseTime @buy="buy" :time="11" :price="25" />
      <ChoseTime @buy="buy" :time="12" :price="25" />
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import ChoseTime from "../components/ChoseTime";
export default {
  data() {
    return {
      movieList: [],
      cureent: 0,
      MovieWidth: [],
      nm: "",
      addr: ""
    };
  },
  components: {
    ChoseTime
  },
  computed: {
    //背景图片
    bgImg() {
      if (this.movieList[this.cureent]) {
        return this.movieList[this.cureent].img.replace(/w\.h/, "200.380");
      } else {
        return "";
      }
    }
  },
  methods: {
    //获取电影图片数据
    async getNewPlay() {
      let res = await this.$http(
        "/api/movieOnInfoList?cityId=" + this.$store.state.id
      );
      // console.log(res.data.data.);
      this.movieList = res.data.data.movieList;
      this.$nextTick(() => {
        if (this.$refs.ul) {
          this.$refs.ul.style.width = this.movieList.length * 95 + 250 + "px";
        }
        this.initBScrollMovieBox();
      });
    },
    //初始化BScroll
    initBScrollMovieBox() {
      if (this.movieBox) {
        this.movieBox.refresh();
      } else {
        this.movieBox = new BScroll(this.$refs.movieBox, {
          scrollX: true,
          probeType: 3
        });
        this.initMovieWidth();
        this.movieBox.on("scroll", this.onScroll);
        this.setScorll();
      }
    },
    //图片滚动监听事件
    onScroll({ x }) {
      for (var i = 0; i < this.MovieWidth.length; i++) {
        if (x < -1080) {
          this.cureent = this.MovieWidth.length - 2;
          return;
        }
        if (-x > this.MovieWidth[i] && -x < this.MovieWidth[i + 1]) {
          this.cureent = i;
          return;
        }
      }
    },
    //初始化电影图片的宽度数组
    initMovieWidth() {
      let p = 0;
      for (var i = 0; i < this.$refs.li.length + 1; i++) {
        this.MovieWidth.push(p);
        p += 100;
      }
    },
    //点击购票事件
    buy({ price, time }) {
      let nm = this.nm;
      let movie = this.movieList[this.cureent].nm;
      let movieId = this.movieList[this.cureent].id;
      let cinemaId = this.$route.params.id;
      this.$router.push({ name: "buy", params: { cinemaId, time, price, nm, movie, movieId} });
    },
    //持久化影院及地址
    persistence() {
      if (this.$route.params.nm) {
        this.nm = this.$route.params.nm;
        this.addr = this.$route.params.addr;
        window.localStorage.setItem("cinema", this.$route.params.nm);
        window.localStorage.setItem("addr", this.$route.params.addr);
      } else {
          this.nm = window.localStorage.getItem('cinema');
          this.addr = window.localStorage.getItem('addr');
      }
    },
    //选择当前电影的滚动位置
    setScorll(){
      for(var i=0;i<this.movieList.length;i++){
        if(this.movieList[i].id == this.$store.state.movieId){
          this.cureent = i;
          this.movieBox.scrollTo(-this.MovieWidth[this.cureent],0);
        }
      }
    }
  },
  mounted() {
    this.getNewPlay();
    this.persistence();
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  .cinema-nm {
    display: flex;
    width: 100%;
    height: 70px;
    background-color: #fff;
    padding: 15px;
    .cinema-text {
      flex: 1;
      height: 100%;
      border-right: 1px solid rgba(126, 119, 126, 0.219);
    }
    h3 {
      font-size: $lg-font;
      font-weight: 700;
      margin-bottom: 8px;
    }
    p {
      display: block;
      font-size: $sm-font;
      width: 200px;
      color: rgb(160, 140, 160);
    }
    .icon-map {
      width: 30px;
      height: 30px;
      margin-right: 10px;
      margin-top: 5px;
      margin-left: 20px;
      background-image: url(../../public/img/Snipaste_2019-08-31_09-33-29.png);
      background-size: contain;
    }
  }

  .cinema-movie {
    width: 100%;
    height: 140px;
    background-size: 100%;
    .cover {
      width: 100%;
      height: 100%;
      padding: 10px;
      background-color: rgba(204, 204, 204, 0.637);
      backdrop-filter: blur(5px);
    }
    .movie-box {
      width: 100%;
      height: 100%;
      overflow: hidden;
      ul {
        white-space: nowrap;
        height: 100%;
      }
      .movie-item {
        display: inline-block;
        width: 90px;
        height: 110px;
        margin-left: 10px;
        vertical-align: middle;
        transform: translateX(-50%) translateY(5%);
        &:first-child {
          margin-left: 50vw;
          transform: translateX(-50%) translateY(5%);
        }
        .item {
          width: 80px;
          height: 100px;
          overflow: hidden;
          padding: 5px;
          transition: all 0.3s linear;
          &.active {
            width: 90px;
            height: 110px;
            padding: 0;
          }
        }
        img {
          width: 100%;
          // height: 100%;
        }
      }
    }
  }

  .movieDetail {
    width: 100%;
    height: 60px;
    padding: 10px 30px;
    border-bottom: 1px solid rgba(204, 204, 204, 0.623);
    .movieTitle {
      display: flex;
      margin-left: 50%;
      transform: translateX(-50%);
      margin-bottom: 8px;
      h3 {
        font-size: $lg-font;
        font-weight: 700;
        margin-right: 5px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      p {
        font-size: $sm-font;
        color: #ffb863;
        .sc {
          font-size: $lg-font;
        }
      }
    }
    .star {
      display: block;
      margin-left: 50%;
      transform: translateX(-50%);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: $md-font;
      color: #999999;
    }
  }

  .time {
    width: 100%;
    height: 50px;
    line-height: 30px;
    padding: 10px;
    border-bottom: 1px solid rgba(204, 204, 204, 0.623);
  }
}
</style>