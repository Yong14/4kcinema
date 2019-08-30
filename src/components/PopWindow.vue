<template>
  <div class="pop-up">
    <h3>是否切换到登录页面</h3>
    <div class="btn">
      <button @click="chose(1)">确认</button>
      <button @click="chose(2)">取消</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["text"],
  methods:{
      chose(i){
          if(i==1){
              this.$router.push('/login');
          }else{
              this.$emit('closePop');
          }
      }
  }
};
</script>

<style lang="scss" scoped>
.pop-up {
  position: relative;
  h3{
      height: 70px;
      line-height: 70px;
      font-size: $lg-font;
      text-align: center;
  }
  div.btn {
    position: absolute;
    left: 0;
    bottom: 0;
  }
  button {
    width: 100px;
    height: 30px;
    margin-top: 20px;
    background: #fff;
    border: 0;
    outline: 0;
  }
}
</style>