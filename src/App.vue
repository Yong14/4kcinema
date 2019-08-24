<template>
  <div id="app" class="app">
    <header class="header">{{title}}</header>
    <!-- <keep-alive> -->
    <router-view :hotCity="hotCity" :cityList="cityList" />
    <!-- </keep-alive> -->
    <footer class="footer">
      <ul>
        <router-link to="/newplay" tag="li">
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
import { msgBox } from "@/components/jsView";
export default {
  data() {
    return {
      title: "热映电影",
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
        // 请求城市数据
        let res2 = await this.$http("/api/cityList");
        res2 = res2.data.data.cities;
        this.resetCitys(res2);
        //数据加载完毕跳转到指定页面
        this.$router.push("/newplay");
      } catch (e) {
        console.error(e);
      }
    }
  },
  mounted() {
    this.getNewPlay();
    let location = this.$http("/api/getLocation").then(location => {
      location = location.data.data;
      if (location.id != this.$store.state.id) {
        msgBox({
          title: "是否切换为当前城市",
          address: "广州",
          change: "切换",
          cancel: "取消",
          handleCancel: null,
          handleChange: () => {
            this.$store.state.nm = location.nm;
            this.$store.state.id = location.id;
            window.localStorage.setItem("nowNm", location.nm);
            window.localStorage.setItem("nowId", location.id);
          }
        });
      }
    });
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
