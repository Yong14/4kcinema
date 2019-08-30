<template>
  <div class="headers">
    <img :src="data.img | setWH('100.180')" alt />
    <div class="header-desc">
      <h3>{{data.nm}}</h3>
      <p class="dir">导演：{{data.dir}}</p>
      <span>{{data.src}} / {{data.oriLang}} / {{data.cat}} / 片长{{data.dur}}分钟</span>
      <div @click="wish" class="wish">
        <div>
          <span @click="wish" :class="[{active:isWish},'icon-favorite']"></span>想看
        </div>
        <div>
          <span class="icon-keyboard_arrow_right"></span>看过
        </div>
      </div>
    </div>
    <popWindow @closePop="closePop1" v-show="isPop" class="pop"/>
  </div>
</template>

<script>
import popWindow from "../components/PopWindow";
export default {
  props: ["data"],
  data(){
      return{
          isPop:false,
          isWish:false
      }
  },
  methods: {
    wish() {
      if (this.$store.state.isLoging) {
          this.isWish = !this.isWish
      } else {
          this.isPop = true;
      }
    },
    closePop1(){
        this.isPop = false;
    }
  },
  components: {
    popWindow
  }
};
</script>

<style lang="scss" scoped>
.headers {
  width: 100%;
  display: flex;
  padding: 15px 0;
  font-family: "微软雅黑";
  position: relative;
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
          color: #ccc;
          &.active{
              color: red;
          }
        }
      }
    }
  }

  .pop {
    position: absolute;
    width: 200px;
    height: 100px;
    background-color: rgb(235, 230, 191);
    transform: translateX(-50%);
    border-radius: 5px;
    box-shadow: 0 0 4px 2px rgb(235, 204, 157);
    bottom: -70%;
    left: 50%;
  }
}
</style>