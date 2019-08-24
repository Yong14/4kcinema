<template>
  <div ref="location">
    <div class="location">
      <div class="hotCity" ref="hotCity">
        <!-- 高度175 -->
        <h3 class="h3">热门城市</h3>
        <ul>
          <li @click="locationClick(item.nm,item.id)" v-for="item in hotCity" :key="item.id">{{item.nm}}</li>
        </ul>
      </div>
      <div ref="cityList" class="cityList" v-for="(item,index) in cityList" :key="index">
        <h3 class="h3" ref="h3">{{item.index}}</h3>
        <p @click="locationClick(data.nm,data.id)" v-for="data in item.list" :key="data.id">{{data.nm}}</p>
      </div>
    </div>
    <div class="chose">
      <ul>
        <li :class="{active:currentIndex===index}" @click="click(index)" v-for="(item,index) in cityList" :key="index">{{item.index}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data: () => ({
    scrollHeight: [175],
    currentIndex:0
  }),
  props: ["cityList", "hotCity"],
  watch: {
    hotCity: function() {
      // this.initBScroll();
    }
  },
  mounted() {
    this.initBScroll();
  },
  methods: {
    click(index) {
      this.location.scrollTo(0,-this.scrollHeight[index],100)
    },
    locationClick(nm,id) {
      window.localStorage.setItem('nowNm',nm);
      window.localStorage.setItem('nowId',id);
      this.$emit("locationClick",nm,id);
    },
    //初始化ScrollHeight
    setScrollHeight() {
      let h=175;
      for(var i=0;i<this.$refs.cityList.length;i++){
        h += parseInt(this.$refs.cityList[i].offsetHeight);
        this.scrollHeight.push(h);
      }
    },
    //初始化滚动BScroll
    initBScroll() {
      if (this.location) {
        this.location.refresh();
      } else {
        this.location = new BScroll(this.$refs.location, {
          click: true,
          probeType: 3
        });
        this.location.on('scroll',this.locationScroll)
        this.$nextTick(function() {
          this.setScrollHeight();
        });
      }
    },
    //滚动监听事件
    locationScroll({y}){
      y = Math.abs(parseInt(y)) + 175;
      for(var i=0;i<this.scrollHeight.length-1;i++){
        if(this.scrollHeight[i]<=y&&y<this.scrollHeight[i+1]){
          this.currentIndex = i;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.location {
  width: 100%;
  padding-top: 5px;
  background: #fff5f0;
  .hotCity {
    width: 100%;
    h3 {
      @include h3;
    }
    ul {
      width: 100%;
      padding: 15px;
      text-align: center;
      overflow: hidden;
      li {
        float: left;
        width: 30%;
        height: 30px;
        line-height: 30px;
        margin-right: 5px;
        margin-bottom: 10px;
        border: 1px solid #e6e6e6;
        border-radius: 5px;
        &:hover {
          background-color: rgba(255, 225, 144, 0.747);
        }
      }
    }
  }
  .cityList {
    h3 {
      @include h3;
    }
    p {
      display: block;
      width: 100px;
      padding-left: 15px;
      margin-top: 5px;
      font-size: $lg-font;
      &:hover {
        color: rgba(255, 225, 144, 0.747);
      }
    }
  }
}
.chose {
  position: fixed;
  right: 5px;
  top: 130px;
  font-size: $sm-font;
  li {
    width: 10px;
    text-align: center;
    margin-bottom: 5px;
    color: #9e9e9e;
    &.active{
      font-size: $md-font;
      color:$mianColor;
    }
  }
}
</style>