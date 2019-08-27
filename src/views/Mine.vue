<template>
  <div class="mime">
    <div class="mine-item">
      <div class="alert">{{msg}}</div>
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
      msg:'账号有误'
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
    },
    judge(data) {
      // console.log(this.acount,this.password);
      for (var i = 0; i < data.length; i++) {
        if (data[i].userName == this.acount && data[i].password) {
          console.log("登录成功");
          return;
        }
      }
      console.log("登录失败");
    }
  }
};
</script>

<style lang="scss" scoped>
.mime {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("../../public/img/mine.jpg");

  .mine-item {
    width: 100%;
    height: 100%;
    background: rgba(204, 204, 204, 0.76);
    backdrop-filter: blur(5px);
    position: relative;
    .alert {
      position: fixed;
      top: 0;
      width: 100%;
      height: 20px;
      background: rgb(236, 171, 171);
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
  margin-bottom: 13px;
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