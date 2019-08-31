<template>
  <div class="comtent">
    <div class="box">
      <div class="left">
        <p class="time">
          {{time}}
          <span>&#58;</span>
          <span>&#48;</span>
          <span>&#48;</span>
        </p>
        <span class="price"><span class="count">￥</span>{{price}}</span>
      </div>
      <div @click="click(price,time)" class="right">购票</div>
    </div>
  </div>
</template>

<script>
export default {
    props:['time','price'],
    methods:{
        click(price,time){
            this.$emit('buy',{price,time});
        }
    }
};
</script>

<style lang="scss" scoped>
.comtent {
  padding: 10px;
  width: 100%;
  height: 60px;
  .box {
    display: flex;
    width: 100%;
    height: 100%;
    border-bottom: 1px solid rgba(204, 204, 204, 0.466);
    .left {
      flex: 1;
      display: flex;
      height: 100%;
      p {
        height: 100%;
        line-height: 30px;
        width: 100px;
      }
      span.price {
        display: block;
        height: 100%;
        line-height: 30px;
        color: #f03d37;
        .count{
            font-size: $xs-font;
        }
      }
    }
    .right {
      width: 50px;
      height: 25px;
      text-align: center;
      font-size: $sm-font;
      color: #fff;
      line-height: 25px;
      background-color: #f03d37;
      border-radius: 3px;
    }
  }
}
</style>