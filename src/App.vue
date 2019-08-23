<template>
  <div id="app" class="app">
    <header class="header">{{title}}</header>
    <keep-alive>
      <router-view
        :newPalyData="newPalyData"
        :comingsoon="comingsoon"
        :hotCity="hotCity"
        :cityList="cityList"
      />
    </keep-alive>
    <footer class="footer">
      <ul>
        <router-link to="/" tag="li">
          <span @click="titleClick('热映电影')">电影</span>
        </router-link>
        <router-link to="/cinema" tag="li">
          <span @click="titleClick('4K影院')">影院</span>
        </router-link>
        <router-link to="/mine" tag="li">
          <span @click="titleClick('个人')">个人</span>
        </router-link>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "热映电影",
      newPalyData: {},
      comingsoon: [],
      cityList: [], //[{index:'A',list:[nm:'安山',id:'0']}]
      hotCity: []
    };
  },
  methods: {
    titleClick(res) {
      this.title = res;
    },
    //重置城市数据
    resetCitys(res) {
      let resetcity = [];
      let hotCity = [];
      for (var i = 0; i < res.length; i++) {
        if (res[i].isHot == 1) {
          hotCity.push(res[i]);
        }
      }
      for (var i = 0; i < res.length; i++) {
        let firstPy = res[i].py.slice(0, 1).toUpperCase();

        if (isExist(firstPy)) {
          resetcity.push({
            index: firstPy,
            list: [{ nm: res[i].nm, id: res[i].id }]
          });
        } else {
          for (var j = 0; j < resetcity.length; j++) {
            if (resetcity[j].index == firstPy) {
              resetcity[j].list.push({ nm: res[i].nm, id: res[i].id });
            }
          }
        }
      }
      function isExist(firstPy) {
        for (var i = 0; i < resetcity.length; i++) {
          if (resetcity[i].index == firstPy) {
            return false;
          }
        }
        return true;
      }
      resetcity = resetcity.sort((a, b) => {
        if (a.index < b.index) {
          return -1;
        } else {
          return 1;
        }
      });
      this.cityList = resetcity;
      this.hotCity = hotCity;
    },
    async getNewPlay() {
      try {
        //请求正在热映的数据
        let res = await this.$http('/api/movieOnInfoList?cityId=10');
        res = res.data;
        this.newPalyData = res;
        // 请求即将上映的数据
        let res1 = await this.$http("/api/movieComingList?cityId=10");
        res1 = res1.data.data.comingList;
        this.comingsoon = res1;
        // 请求城市数据
        let res2 = await this.$http("/api/cityList");
        res2 = res2.data.data.cities;
        this.resetCitys(res2);
      } catch (e) {
        console.error(e);
      }
    }
  },
  mounted() {
    this.getNewPlay();
  }
};
</script>

<style lang="scss" scoped>
.app {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}
.header {
  width: 100%;
  height: 50px;
  background: $mianColor;
  line-height: 50px;
  text-align: center;
  color: $mianFontColor;
}
.footer {
  position: fixed;
  width: 100%;
  height: 50px;
  left: 0;
  bottom: 0;
  background: $mianColor;
  ul {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    li {
      height: 50px;
      line-height: 50px;
      color: $mianFontColor;
    }
    .router-link-exact-active {
      color: rgb(51, 107, 226);
    }
  }
}
</style>
