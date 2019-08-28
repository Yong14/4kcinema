<template>
  <div class="mine">
    <!-- {{$store.state.loginUser}} -->
    <header class="header">
      <div class="img"></div>
      <p>{{$store.state.loginUser}}</p>
    </header>
    <main>
      <ul>
        <li>订单</li>
        <li>想看</li>
        <li>订单</li>
      </ul>
    </main>
  </div>
</template>

<script>
export default {
  mounted() {
    if (!this.$store.state.isLoging) {
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss" scoped>
.mine {
  width: 100%;
  height: 100%;
  .header {
    display: flex;
    width: 100%;
    height: 100px;
    background-color: $mianColor;
    padding: 20px 20px;
    .img {
      width: 60px;
      height: 60px;
      background-image: url("../../public/img/movie.jpg");
      background-size: contain;
      border-radius: 50%;
      margin-right: 8px;
    }
    p {
      height: 60px;
      line-height: 60px;
      font-size: $lg-font;
      font-weight: 700;
    }
  }
}
</style>