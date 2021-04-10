<template>
  <div class="user-container">
    <div class="user">
      <div class="email">
        <form class="form">
          <h1>Keisti El. Paštą</h1>
          <ul>
            <li>
              <label for="email">Naujas El. paštas</label>
              <input
                type="email"
                name="email"
                maxlength="20"
                v-model="email"
                required
              />
            </li>

            <li>
              <label for="confirmed-email">Patvirtinkite el. paštą</label>
              <input
                type="email"
                name="confirmed-email"
                maxlength="20"
                required
                v-model="confirmed_email"
              />
            </li>

            <li class="buttons">
              <button @click.prevent="submitEmailChange">
                Keisti
              </button>
              <button
                @click.prevent="
                  email = '';
                  confirmed_email = '';
                "
              >
                Atšaukti
              </button>
            </li>
          </ul>
        </form>
      </div>
      <div class="password">
        <form class="form">
          <h1>Keisti slaptažodį</h1>
          <ul>
            <li>
              <label for="password">Naujas slaptažodis</label>
              <input
                type="password"
                name="password"
                maxlength="30"
                v-model="password"
                required
              />
            </li>

            <li>
              <label for="confirmed-password"
                >Patvirtinkite naują slaptažodį</label
              >
              <input
                type="password"
                name="confirmed-password"
                maxlength="30"
                required
                v-model="password_confirmation"
              />
            </li>

            <li class="buttons">
              <button @click.prevent="submitPasswordChange">
                Keisti
              </button>
              <button
                @click.prevent="
                  password = '';
                  password_confirmation = '';
                "
              >
                Atšaukti
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserInfo",

  data() {
    return {
      email: "",
      confirmed_email: "",
      password: "",
      password_confirmation: ""
    };
  },

  methods: {
    submitEmailChange() {
      if (this.email === this.confirmed_email) {
        axios
        .post("http://" + this.globalURL + "/api/users/changemail", {
          name: localStorage.getItem("user_name"),
          email: this.email,
          confirmed_email: this.confirmed_email
        })
        .then(response => {
          this.$alert(response.data.message);
          this.email = ''
          this.confirmed_email = ''
        })
        .catch(error => {
          this.$alert(error);
        });
      } else {
        this.$alert("El.pašto adresai nesutampa! Bandykite dar kartą");
      }
    },

    submitPasswordChange() {
      if (this.password === this.password_confirmation) {
        axios
          .post("http://" + this.globalURL + "/api/users/changepass", {
            name: localStorage.getItem("user_name"),
            password: this.password,
            password_confirmation: this.password_confirmation
          })
          .then(response => {
            this.$alert(response.data.message);
            this.password = ''
            this.password_confirmation = ''
          })
          .catch(error => {
            this.$alert(error);
          });
      } else {
        this.$alert("Slaptažodžiai nesutampa! Bandykite dar kartą");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.user-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 80px;

  .user {
    width: 60%;

    .email {
      margin-bottom: 100px;
    }
  }
}

.form {
  h1 {
    text-transform: uppercase;
    padding-bottom: 7px;
    margin-bottom: 40px;
    font-size: 21px;
    color: #00264c;
    border-bottom: 1px solid rgba(196, 196, 196, 0.3);
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

  li:last-of-type {
    border: none;
    padding: 0px;
  }

  li > label {
    display: block;
    float: left;
    margin-top: -20px;
    background: #f4f4f4;
    height: 15px;
    padding: 2px 5px 2px 5px;
    color: #818198;
    font-size: 10px;
    overflow: hidden;
    font-family: "Open-Sans", sans-serif;
    background-color: #f4f4f4;
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
    background-color: #f4f4f4;
  }

  input[type="submit"],
  input[type="button"],
  button {
    background: #f4f4f4;
    border: 1px solid #0054a6;
    padding: 7px 15px;
    margin: 0 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 0.016em;
    font-family: "Open-Sans", sans-serif;
    color: #00264c;
    cursor: pointer;
  }

  button:last-of-type {
    margin: 0;
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  input[type="submit"]:hover,
  input[type="button"]:hover,
  button:hover {
    background-color: #0054a6;
    color: #f4f4f4;
  }
}
</style>
