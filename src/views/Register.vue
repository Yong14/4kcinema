<template>
  <div class="register">
    <div class="cover">
      <transition name="msgShow">
        <div v-show="msgShow" class="alert">{{msg}}</div>
      </transition>
      <div class="context">
        <div class="img"></div>
        <div>
          <input v-model="user" placeholder="用户名" type="text" />
        </div>
        <div>
          <input v-model="password" placeholder="密码" type="password" />
        </div>
        <div @click="submit" class="submit">注册</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: "",
      password: "",
      msg: "",
      msgShow: false
    };
  },
  methods: {
    submit() {
      if (this.user.length == 0 || this.password.length == 0) {
        this.msg = "信息未填写完整";
        this.msgShow = true;
        setTimeout(() => {
           this.msgShow = false;
        }, 1000);
        return;
      }
      let data = window.localStorage.getItem("user");
      data = JSON.parse(data);
      data.push({ userName: this.user, password: this.password });
      window.localStorage.setItem("user", JSON.stringify(data));
      setTimeout(() => {
        this.$router.replace("/mine");
      }, 1000);
    }
  }
};
</script>

<style lang="scss"  scoped>
.msgShow-enter {
  transform: translateY(-100%);
}
.msgShow-enter-active,
.msgShow-leave-active {
  transition: all 0.5s linear;
}
.msgShow-leave-to {
  transform: translateY(-100%);
}
.register {
  width: 100%;
  height: 100%;
  background-image: url("../../public/img/mine.jpg");
  .cover {
    width: 100%;
    height: 100%;
    background-color: rgba(247, 205, 255, 0.555);
    backdrop-filter: blur(8px);
    .alert {
      position: fixed;
      top: 0;
      width: 100%;
      height: 20px;
      line-height: 20px;
      text-align: center;
      font-size: $sm-font;
      background: rgb(245, 124, 124);
    }
  }
  .context {
    width: 200px;
    margin-left: 50%;
    transform: translateX(-50%) translateY(40%);
    .img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: rgb(136, 112, 112);
      margin-left: 50px;
      margin-bottom: 15px;
      background-image: url("../../public/img/movie.jpg");
      background-size: 100%;
    }
    input {
      width: 200px;
      border: 0;
      text-align: center;
      border-bottom: 1px solid rgb(78, 77, 77);
      outline: 0;
      background-color: rgba(153, 99, 99, 0);
      margin-bottom: 15px;
      &::placeholder {
        text-align: start;
        color: rgb(128, 126, 126);
      }
    }
    .submit {
      width: 50%;
      height: 30px;
      font-size: $lg-font;
      text-align: center;
      line-height: 30px;
      border-radius: 4px;
      background-color: #0ecea1;
      color: #fff;
      margin-left: 50px;
      box-shadow: 1px 1px 5px 1px rgb(170, 187, 159);
    }
  }
}
</style>