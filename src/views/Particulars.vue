<template>
  <div class="Partcular" ref="Partcular">
    <div class="box">
      <particurlarHeader :data="data"/>

      <div class="grade">
        <h3>{{data.scoreLabel}}</h3>
        <div class="grade-item">
          <p class="sc">{{data.sc}}</p>
          <div class="watched">
            <div v-for="(item,index) in fiveStar" class="star" :class="item" :key="index"></div>
            <p>累计票房{{data.watched}}</p>
          </div>
        </div>
      </div>

      <div class="still">
        <h3>剧照</h3>
        <div class="imgBox" ref="imgBox">
          <div class="imgBox-item">
            <div
              v-for="(img,index) in bgImg"
              :key="index"
              class="img"
              :style="{backgroundImage: 'url(' + img + ')'}"
            ></div>
          </div>
        </div>
      </div>

      <div class="plot">
        <h3>剧情简介</h3>
        <p ref="p" @click="showText">{{data.dra}}</p>
      </div>

      <div class="prevue">
        <h3>预告片</h3>
        <video controls :src="data.vd"></video>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import particurlarHeader from "../components/ParticularHeader"
export default {
  data() {
    return {
      data: {}
    };
  },
  components:{
    particurlarHeader
  },
  computed: {
    fiveStar() {
      let arr = [];
      let num = this.data.sc / 2;
      for (var i = 0; i < Math.floor(num); i++) {
        arr.push("on");
      }
      if (num > Math.floor(num)) {
        arr.push("half");
        for (var i = 0; i < 5 - Math.ceil(num); i++) {
          arr.push("off");
        }
      } else {
        for (var i = 0; i < 5 - num; i++) {
          arr.push("off");
        }
      }
      return arr;
    },
    bgImg() {
      let photos = [];
      if (this.data.photos) {
        for (var i = 0; i < this.data.photos.length; i++) {
          let url = this.data.photos[i].replace(/w\.h/, "200.100");
          photos.push(url);
        }
      }
      return photos;
    }
  },
  mounted() {
    this.getMovieParticulars();
  },
  methods: {
    async getMovieParticulars() {
      let particular = await this.$http(
        "/api/detailmovie?movieId=" + this.$store.state.movieId
      );
      this.data = particular.data.data.detailMovie;
      this.$nextTick(() => {
        this.initBScroll(this.particulars,this.$refs.Partcular);
        this.initBScroll(this.imgBox,this.$refs.imgBox,(dom)=>{
          dom.firstChild.style.width = `${this.data.photos.length * 105}px`;
        });
      });
    },
    showText() {
      this.$refs.p.style.display = "block";
      this.$refs.p.style.overflow = "visible";
    },
    initBScroll(scroll,dom,callBack) {
      if (scroll) {
        scroll.refresh();
      } else {
        scroll = new BScroll(dom,{
          click:true,
          scrollX: true
        });
      }
      callBack && callBack(dom);
    }
  }
};
</script>

<style lang="scss" scoped>
.Partcular {
  overflow: hidden;
  .box {
    padding: 0 10px 50px;
  }
}
.headers {
  width: 100%;
  display: flex;
  padding: 15px 0;
  font-family: "微软雅黑";
  img {
    flex: 0 0 100px 150px;
    width: 100px;
    margin-right: 10px;
  }
  div.header-desc {
    h3 {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .dir {
      font-size: $lg-font;
      margin-bottom: 5px;
    }
    span {
      font-size: $sm-font;
    }
    .wish {
      display: flex;
      margin-top: 10px;
      text-align: center;
      div {
        flex: 1;
        height: 30px;
        line-height: 30px;
        border: 1px solid rgb(248, 201, 129);
        box-shadow: 1px 1px 1px 0px rgb(197, 170, 130);
        border-radius: 5px;
        font-size: $sm-font;
        &:first-child {
          margin-right: 8px;
        }
        span {
          display: inline-block;
          margin-right: 3px;
          color: #ffac2c;
        }
      }
    }
  }
}

.grade {
  padding: 10px 10px;
  background: rgb(241, 240, 240);
  border-radius: 4px;
  font-size: $sm-font;
  div.grade-item {
    display: flex;
    margin-top: 10px;
    .sc {
      font-size: 25px;
      margin-right: 10px;
    }
    .watched {
      .star {
        display: inline-block;
        width: 10px;
        height: 10px;
        background-size: 100%;
        &.on {
          background-image: url("../../public/img/star24_on@2x.png");
        }
        &.half {
          background-image: url("../../public/img/star24_half@2x.png");
        }
        &.off {
          background-image: url("../../public/img/star24_off@2x.png");
        }
      }
    }
  }
}

.still {
  padding: 0 10px;
  overflow: hidden;
  h3 {
    font-size: $lg-font;
    padding: 15px 0;
    color: $titleColor;
  }
  .imgBox {
    width: 100%;
    .imgBox-item {
      white-space: nowrap;
      .img {
        display: inline-block;
        width: 100px;
        height: 80px;
        margin-right: 5px;
      }
    }
  }
}

.plot {
  font-size: $lg-font;
  padding: 0 10px;
  margin-bottom: 10px;
  overflow: hidden;
  h3 {
    padding: 15px 0;
    color: $titleColor;
  }
  p {
    line-height: 18px;
    letter-spacing: 1px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
}
.prevue {
  width: 100%;
  padding: 0 10px;
  h3 {
    font-size: $lg-font;
    padding: 15px 0;
    color: $titleColor;
  }
  video {
    width: 100%;
  }
}
</style>