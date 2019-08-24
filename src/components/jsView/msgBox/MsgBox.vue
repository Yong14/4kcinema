<template>
  <div class="cover">
    <div class="msg">
      <h3>{{title}}</h3>
      <p>{{address}}</p>
      <div class="btn">
        <div @touchend="handleChange" class="change">{{change}}</div>
        <div @touchend="handleCancel" class="cancel">{{cancel}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.cover {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(204, 204, 204, 0.664);
  backdrop-filter: blur(5px);
}
.msg {
  width: 200px;
  height: 100px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
  background: #fff;
  border: 1px solid rgb(146, 134, 134);
  border-radius: 5px;
  box-shadow: 5px 5px 10px 5px #615e5e;
  text-align: center;
  font-size: $lg-font;
  h3 {
    height: 25px;
    line-height: 25px;
    width: 100%;
    background-color: rgba(204, 204, 204, 0.836);
  }
  p {
    display: block;
    width: 100%;
    height: 40px;
    line-height: 40px;
    color: rgb(139, 122, 23);
  }
  .btn {
    display: flex;
    div {
      flex: 1;
      height: 35px;
      line-height: 35px;
      color: #7c7575;
    }
  }
}
</style>