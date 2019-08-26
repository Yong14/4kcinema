<template>
  <div class="cinemas" ref="cinema">
    <ul>
      <li class="li-item" v-for="cinema in cinemas" :key="cinema.id">
        <div class="movie">
          <div class="name">
            <span class="title">{{cinema.nm}}</span>
            <span class="sellPrice">
              <span class="price">{{cinema.sellPrice}}</span>元起
            </span>
          </div>
          <div class="adress">
            <span>{{cinema.addr}}</span>
            <span>{{cinema.distance}}</span>
          </div>

          <div class="tag">
            <span
              class="tag-item"
              :class="key | setTagCss"
              v-for="(value,key) in cinema.tag"
              :key="key"
              v-if="value===1"
            >{{key | setTag}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  mounted() {
    this.getData();
  },
  data() {
    return {
      cinemas: []
    };
  },
  methods: {
    async getData() {
      let res = await this.$http("/api/cinemaList?cityId="+this.$store.state.id);
      res = res.data.data.cinemas;
      this.cinemas = res;
      this.$nextTick(() => {
        this.initBScroll();
      });
    },
    initBScroll() {
      // console.log(this.$refs.cinema);
      if (this.cinema) {
        this.cinema.refresh();
      } else {
        this.cinema = new BScroll(this.$refs.cinema);
      }
    }
  },
  filters: {
    setTag(tag) {
      if (tag == "allowRefund") {
        return "改签";
      } else if (tag == "endorse") {
        return "退";
      } else if (tag == "sell") {
        return "折扣卡";
      } else if (tag == "snack") {
        return "小吃";
      } else {
        return "";
      }
    },
    setTagCss(tag) {
      if (tag == "allowRefund" || tag == "endorse") {
        return "or";
      } else if (tag == "sell" || tag == "snack") {
        return "br";
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.cinemas {
  width: 100%;
  height: 100%;
  overflow: hidden;
  ul{
    padding-bottom: 50px;
  }
}
.li-item {
  margin-bottom: 10px;
  padding: 0 15px;
  &:first-child {
    margin-top: 10px;
    border-top: 1px solid rgba(134, 130, 130, 0.226);
  }
  .movie {
    padding: 8px 0;
    border-bottom: 1px solid rgba(134, 130, 130, 0.226);
    div {
      margin-bottom: 5px;
    }
  }
  .name {
    font-size: 18px;
    font-weight: 500;

    .title {
      //   margin-right: 10px;
      display: inline-block;
      width: 210px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      margin-right: 10px;
    }
    .sellPrice {
      color: rgba(235, 78, 78, 0.863);
      font-size: $md-font;
      .price {
        font-size: 18px;
      }
    }
  }
  .adress {
    span {
      font-size: $sm-font;
      color: #898989;
      &:first-child {
        display: inline-block;
        width: 220px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin-right: 10px;
      }
    }
  }
  .tag {
    .tag-item {
      min-width: 15px;
      display: inline-block;
      font-size: 10px;
      height: 15px;
      line-height: 14px;
      text-align: center;
      border: 1px solid #000;
      margin-right: 5px;
      &.or {
        border-color: $mianColor;
        color: $mianColor;
      }
      &.br {
        border-color: rgb(250, 121, 0);
        color: rgb(250, 121, 0);
      }
    }
  }
}
</style>