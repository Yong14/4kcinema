<template>
  <div class="divmovie">
    <header class="header">
      <ul>
        <router-link tag="li" to="location">{{location}}</router-link>
        <router-link tag="li" class="newPlay" to="newplay">正在热映</router-link>
        <router-link tag="li" class="comingSoon" to="comingsoon">即将上映</router-link>
        <router-link tag="li" to="search">
          <span class="glyphicon glyphicon-search"></span>
        </router-link>
      </ul>
    </header>
    <router-view @locationClick="locationClick" :hotCity='hotCity' :cityList="cityList" :newPalyData="newPalyData" :comingsoon="comingsoon" class="router-view"></router-view>
  </div>
</template>

<script>
export default {
  data:()=>({
    location:'定位',
  }), 
  props:['newPalyData','comingsoon','cityList','hotCity'],
  methods:{
    locationClick(nm){
      this.location = nm;
    }
  }
};
</script>

<style lang="scss">
.divmovie {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .router-view{
    flex: 1;
    margin-bottom:50px;
    overflow: hidden;
  }
}
.header {
  width: 100%;
  height: 46px;
  border-bottom: 1px solid #e6e6e6;
  ul {
    width: 100%;
    height: 100%;
    display: flex;
    .router-link-exact-active {
      border-bottom: 2px solid $mianColor;
    }
    li {
      flex: 1;
      height: 100%;
      line-height: 46px;
      text-align: center;
    }
    li.newPlay,
    li.comingSoon {
      font-size: 15px;
      color: #666;
    }
    .glyphicon {
      color: $mianColor;
    }
  }
}
</style>