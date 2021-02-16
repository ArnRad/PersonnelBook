<template>
  <div id="myModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>

      <div class="form-container">
        <form class="form">
          <div class="header-user">{{ header }}</div>
          <div class="form-container">
            <ul>
              <li>
                <label for="name">Vardas</label>
                <input
                  type="text"
                  name="name"
                  maxlength="20"
                  v-model="user.name"
                  required
                />
              </li>

              <li>
                <label for="surname">Pavardė</label>
                <input
                  type="text"
                  name="surname"
                  maxlength="20"
                  v-model="user.surname"
                  required
                />
              </li>

              <li>
                <label for="email">El. paštas</label>
                <input
                  type="email"
                  name="email"
                  maxlength="20"
                  v-model="user.email"
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
                  v-model="user.confirmed_email"
                />
              </li>

              <li class="checkField">
                <label>Struktūros</label>
                <div>
                  <input
                    type="checkbox"
                    name="structure-create"
                    v-model="selectedPermissions"
                    :value="'create-edit structures'"
                    @change="editCheck(selectedPermissions, 'structures')"
                  />
                  <label for="structure-create">Kurti, redaguoti</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="structure-delete"
                    v-model="selectedPermissions"
                    :value="'delete structures'"
                  />
                  <label for="structure-delete">Trinti</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="structure-read"
                    v-model="selectedPermissions"
                    :value="'read structures'"
                  />
                  <label for="structure-read">Skaityti</label>
                </div>
              </li>

              <li class="checkField">
                <label>Darbovietės</label>
                <div>
                  <input
                    type="checkbox"
                    name="workplace-create"
                    v-model="selectedPermissions"
                    :value="'create-edit workplaces'"
                    @change="editCheck(selectedPermissions, 'workplaces')"
                  />
                  <label for="workplace-create">Kurti, redaguoti</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="workplace-delete"
                    v-model="selectedPermissions"
                    :value="'delete workplaces'"
                  />
                  <label for="workplace-delete">Trinti</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="workplace-read"
                    v-model="selectedPermissions"
                    :value="'read workplaces'"
                  />
                  <label for="workplace-read">Skaityti</label>
                </div>
              </li>

              <li class="checkField">
                <label>Darbuotojai</label>
                <div>
                  <input
                    type="checkbox"
                    name="employee-create"
                    v-model="selectedPermissions"
                    :value="'create-edit employees'"
                    @change="editCheck(selectedPermissions, 'employees')"
                  />
                  <label for="employee-create">Kurti, redaguoti</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="employee-delete"
                    v-model="selectedPermissions"
                    :value="'delete employees'"
                  />
                  <label for="employee-delete">Trinti</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="employee-read"
                    v-model="selectedPermissions"
                    :value="'read employees'"
                  />
                  <label for="employee-read">Skaityti</label>
                </div>
              </li>

              <li class="buttons">
                <button
                  v-show="!this.id"
                  type="submit"
                  @click.prevent="submitAdd"
                >
                  Patvirtinti
                </button>
                <button
                  v-show="this.id"
                  type="submit"
                  @click.prevent="submitEdit()"
                >
                  Redaguoti
                </button>
                <button @click="$emit('close')">Atšaukti</button>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddEditUser",

  data() {
    return {
      header: "Pridėti naują vartotoją",
      user: {},
      selectedPermissions: []
      // selectedStructures: [],
      // selectedWorkplaces: [],
      // selectedUsers: []
    };
  },

  props: {
    id: String
  },

  created() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("access_token");

    if (this.id) {
      this.header = "Redaguoti vartotoją";

      axios
        .get("http://" + this.globalURL + "/api/users/" + this.id + "/edit")
        .then(response => {
          this.user = response.data;
          for (let i = 0; i < response.data.permissions.length; i++) {
            this.selectedPermissions.push(response.data.permissions[i]);
          }
        });
    }
  },

  methods: {
    submitAdd() {
      axios
        .post("http://" + this.globalURL + "/api/users", {
          name: this.user.name,
          surname: this.user.surname,
          email: this.user.email,
          confirmed_email: this.user.confirmed_email,
          permissions: this.selectedPermissions
        })
        .then(response => {
          this.$alert('Vartotojas pridėtas!');
          this.$emit("update");
        })
        .catch(error => {
          this.$alert(error);
        });
    },

    submitEdit() {
      axios
        .patch("http://" + this.globalURL + "/api/users/" + this.id, {
          name: this.user.name,
          surname: this.user.surname,
          email: this.user.email,
          confirmed_email: this.user.confirmed_email,
          permissions: this.selectedPermissions
        })
        .then(response => {
          this.$alert('Vartotojas atnaujintas');
          this.$emit("update");
        })
        .catch(error => {
          this.$alert(error);
        });
    },

    editCheck(array, text) {
      if (array.includes("read " + text)) {
        let index = array.indexOf("read " + text);
        array.splice(index, 1);
      }
      array.push("read " + text);
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);

  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;

    .close {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }

    .close:hover,
    .close:focus {
      color: black;
      text-decoration: none;
      cursor: pointer;
    }

    .form-container {
      display: flex;
      justify-content: center;
      align-items: center;

      .form {
        width: 80%;

        .header-user {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 84px;
          width: 100%;

          margin-bottom: 20px;
          font-size: 21px;
          color: #00264c;
          border-bottom: 1px solid rgba(196, 196, 196, 0.3);
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          width: 30%;
        }

        li {
          display: block;
          padding: 10px;
          border: 0.75px solid #969696;
          margin-bottom: 30px;
          border-radius: 7px;
        }

        li:last-child {
          border: none;
          margin-bottom: 50px;
          text-align: right;
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

        .buttons {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="submit"]:hover,
        input[type="button"]:hover,
        button:hover {
          background-color: #0054a6;
          color: #f4f4f4;
        }
      }
    }
  }
}
</style>
