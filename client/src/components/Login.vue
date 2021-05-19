<template>
  <div class="table-container">
    <div class="admin-table">
      <form class="form" @submit.prevent="login">
        <div class="header-login">
            <!-- <img alt="logo" src="../assets/logo.png"/> -->
            <p>Prisijunkite</p>
        </div>
        <div class="form-container">
          <ul>
            <li>
              <label for="username">Vartotojo vardas</label>
              <input id="usernameInput" type="text" v-model="username" />
            </li>

            <li>
              <label for="password">Slaptažodis</label>
              <input id="passwordInput" type="password" v-model="password" />
            </li>
            <div class="buttons">
              <button id="logButton" type="submit" class="login-button">Prisijungti</button>
            </div>
          </ul>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Axios from "axios";

export default {
  name: "Login",

  data() {
    return {
      username: "",
      password: ""
    };
  },

  created() {
    if (localStorage.getItem("access_token")) {
      this.$router.push({ name: "Employee" });
    }
  },

  methods: {
    login() {
      Axios.post("http://" + this.globalURL + "/api/login", {
        name: this.username,
        password: this.password
      }).then(response => {
        localStorage.setItem("access_token", response.data);
        localStorage.setItem("user_name", this.username);
        this.$router.push({ name: "Employee" });
        window.location.reload()
      }).catch(error => {
        if (error.response.data.error) {
          this.$alert(error.response.data.error);
        } else {
          this.$alert(error.response.data);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
body {
  background: #e5e5e5;
}

.table-container {
  display: flex;
  justify-content: center;
  align-items: center;
  .admin-table {
    width: 400px;
    height: 400px;
    background: #ffffff;

    margin-top: 80px;
    padding: 50px;

    .form {
      .header-login {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 54px;
        width: 100%;

        margin-bottom: 50px;
        font-size: 21px;
        background: rgb(186,44,39);
        background: linear-gradient(90deg, rgba(186,44,39,1) 0%, rgba(97,14,128,1) 100%);
        border-radius: 20px;
        color: white;
        font-weight: 700;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      li {
        display: block;
        padding: 10px;
        border: 0.75px solid #969696;
        margin-bottom: 30px;
        border-radius: 7px;
      }

      li > label {
        display: block;
        float: left;
        margin-top: -20px;
        background: #ffffff;
        height: 15px;
        padding: 2px 5px 2px 5px;
        color: #818198;
        font-size: 10px;
        overflow: hidden;
        font-family: "Open-Sans", sans-serif;
        background-color: #ffffff;
      }
      input[type="text"],
      input[type="date"],
      input[type="datetime"],
      input[type="email"],
      input[type="number"],
      input[type="search"],
      input[type="time"],
      input[type="url"],
      input[type="password"],
      textarea,
      select {
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        width: 100%;
        display: block;
        outline: none;
        border: none;
        height: 25px;
        line-height: 25px;
        font-size: 14px;
        padding: 0;
        font-family: "Open-Sans", sans-serif;
        background-color: #ffffff;
      }

      input[type="submit"],
      input[type="button"],
      button {
        background: #f4f4f4;
        border: 1px solid #969696;
        padding: 7px 15px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        font-size: 18px;
        text-transform: uppercase;
        letter-spacing: 0.016em;
        font-family: "Open-Sans", sans-serif;
        color: black;
        cursor: pointer;
      }

      .buttons {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }

      input[type="submit"]:hover,
      input[type="button"]:hover,
      button:hover {
        background: rgb(186,44,39);
        background: linear-gradient(90deg, rgba(186,44,39,1) 0%, rgba(97,14,128,1) 100%);
        color: #f4f4f4;
      }
    }
  }
}
</style>
