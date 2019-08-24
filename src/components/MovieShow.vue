<template>
  <ul>
    <li @click="showMovie(item.id)" v-for="item in data" :key="item.id">
      <img :src="item.img | setWH('128.180')" alt />
      <div class="content">
        <h3 class="movieName">{{item.nm}}</h3>
        <p class="grade" v-if="item.sc!='0'">
          <span>观众评</span>
          <span class="sc">{{item.sc}}</span>
        </p>
        <p class="wish" v-if="item.comingTitle">
          <span>{{item.wish}}人想看</span>
        </p>
        <p class="protagonist">
          <span>主演：</span>
          <span>{{item.star}}</span>
        </p>
        <span class="newData">{{item.showInfo}}</span>
      </div>
      <div class="right">
        <div class="imax" v-if="item.version!=''">
          <div class="icon-3d">3D</div>
          <div class="icon-imax">IMAX</div>
        </div>
        <div :class="['buy',{presll:item.sc=='0'}]">{{item.sc=='0'?'预售':'购买'}}</div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {};
  },
  methods:{
    showMovie(id){
      this.$store.state.movieId = id
      this.$router.push('/particulars');
    }
  }
};
</script>

<style lang="scss" scoped>
li {
  display: flex;
  height: 120px;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  padding: 10px;
  img {
    width: 60px;
  }
  .content {
    flex: 1;
    font-size: 13px;
    margin-left: 10px;
    height: 100%;
    margin-top: 10px;
    color: #666;
    .movieName {
      font-size: 17px;
      font-weight: 700;
      line-height: 24px;
      color: black;
    }
    .movieName,
    p {
      margin-bottom: 7px;
      width: 150px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      .sc {
        margin-left: 5px;
        color: #faaf00;
        font-size: 17px;
        font-weight: 700;
      }
    }
  }
  .right {
    width: 50px;
    height: 45px;
    .imax {
      width: 50px;
      height: 13px;
      display: flex;
      border: 1px solid #70b1d3;
      border-radius: 2px;
      font-size: 5px;
      .icon-3d {
        width: 18px;
        text-align: center;
        background: #70b1d3;
        color: #eff6fa;
      }
      .icon-imax {
        width: 32px;
        color: #70b1d3;
        text-align: center;
      }
    }
    .buy {
      font-size: 12px;
      width: 40px;
      height: 22px;
      line-height: 22px;
      margin-top: 10px;
      text-align: center;
      background: #f03d37;
      color: #e6e6e6;
      border-radius: 3px;
      &.presll{
        background: $mianColor;
      }
    }
  }
}
</style>