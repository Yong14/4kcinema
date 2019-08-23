<template>
  <div class="cinemas">
      <ul>
          <li class="li-item" v-for="cinema in cinemas" :key="cinema.id">
              <h3>{{cinema.nm}}</h3>
              <span>{{cinema.addr}}</span>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getData();
  },
  data(){
      return{
          cinemas:[]
      }
  },
  methods: {
    async getData() {
      let res = await this.$http("/api/cinemaList?cityId=10");
      res = res.data.data.cinemas;
      this.cinemas = res;
    }
  }
};
</script>

<style lang="scss" scoped>
.li-item{
    margin-bottom: 10px;
}
</style>