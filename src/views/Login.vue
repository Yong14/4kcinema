<template>
  <div class="mime">
    <div class="mine-item">
      <transition name="msgShow">
        <div v-show="msgShow" class="alert">{{msg}}</div>
      </transition>
      <div class="login">
        <h3>Welcome</h3>
        <p>Please enter the account password</p>
        <input v-model="acount" type="text" name="acount" placeholder="account" />
        <input v-model="password" type="password" name="acount" placeholder="password" />
        <button @click="login">Login</button>
        <div>
          <span>Password</span> |
          <span @click="Register">Register</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      acount: "",
      password: "",
      msg: "",
      msgShow: false,
    };
  },
  methods: {
    Register() {
      this.$router.push("/register");
    },
    login() {
      let user = window.localStorage.getItem("user");
      if (user) {
        let data = JSON.parse(user);
        this.judge(data);
      } else {
        this.getUserdata();
      }
    },
    async getUserdata() {
      let res = await this.$http("/api/UserDb");
      window.localStorage.setItem("user", JSON.stringify(res.data.data));
      this.judge(res.data.data);
    },
    judge(data) {
      // console.log(this.acount,this.password);
      for (var i = 0; i < data.length; i++) {
        if (data[i].userName == this.acount) {
          if (data[i].password == this.password) {
            this.$store.commit('login',this.acount);
            this.$router.go(-1);
            return;
          } else {
            this.msg = "密码有误";
            this.msgShow = true;
            setTimeout(() => {
              this.msgShow = false;
            }, 1500);
            return;
          }
        }
      }
      this.msg = "账号有误";
      this.msgShow = true;
      setTimeout(() => {
        this.msgShow = false;
      }, 1500);
    }
  }
};
</script>

<style lang="scss" scoped>
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
.mime {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("../../public/img/mine.jpg");

  .mine-item {
    width: 100%;
    height: 100%;
    background: rgba(247, 205, 255, 0.555);
    backdrop-filter: blur(5px);
    position: relative;
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
}
.login {
  position: absolute;
  left: 50%;
  width: 300px;
  text-align: center;
  transform: translateX(-50%) translateY(50%);
  h3 {
    font-size: 35px;
    margin-bottom: 13px;
    font-weight: 600;
    color: #fff;
  }
  p {
    margin-bottom: 13px;
    color: #fff;
  }
  div {
    font-size: $sm-font;
    color: #fff;
  }
}
input {
  border: 1px solid rgba(85, 84, 84, 0.651);
  border-radius: 20px;
  text-align: center;
  letter-spacing: 1px;
  width: 200px;
  margin-bottom: 13px;
  height: 30px;
  line-height: 30px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: rgb(223, 224, 224);
  }
}
button {
  display: block;
  border: 1px solid rgba(85, 84, 84, 0.651);
  border-radius: 20px;
  text-align: center;
  letter-spacing: 1px;
  width: 200px;
  margin-bottom: 17px;
  height: 30px;
  line-height: 30px;
  margin-left: 50%;
  background-color: rgb(95, 77, 77);
  color: #fff;
  transform: translateX(-50%);
  &:focus {
    outline: none;
  }
}
</style>