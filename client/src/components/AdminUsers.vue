<template>
  <div class="cont">
    <div class="users-container">
      <AddEditUser
        :id="id"
        v-if="displayView"
        @close="toggleViewForm"
        @update="getUsers()"
      />
      <div class="users">
        <div class="users-header">Administratorių paskyros</div>
        <div class="actions">
          <div class="buttons">
            <button @click="toggleViewForm()" class="button-add">
              <img src="../assets/addWorkerIcon.png" />Pridėti vartotoją
            </button>
          </div>
        </div>
        <div>
          <table class="users-table">
            <thead>
              <tr>
                <th>Vardas</th>
                <th>Pavardė</th>
                <th>El. paštas</th>
                <th>Prisijungimo vardas</th>
                <th>Sukūrimo data</th>
                <th></th>
              </tr>
            </thead>
            <tbody v-for="user in Users" :key="user._id">
              <tr>
                <td>{{ user.name }}</td>
                <td>{{ user.surname }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.date }}</td>
                <td>
                  <img
                    @click="toggleViewForm(user._id)"
                    src="../assets/edit-employee.png"
                  />
                  <img
                    class="delete-btn"
                    @click="deleteGroup(user._id)"
                    src="../assets/delete-employee.png"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AddEditUser from "./actions/AddEditUser";

export default {
  name: "AdminUsers",

  data() {
    return {
      Users: {},
      id: 0,
      displayView: false
    };
  },

  components: {
    AddEditUser
  },

  mounted() {
    this.getUsers();
  },

  methods: {
    getUsers() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("access_token");

      axios
        .get("http://" + this.globalURL + "/api/users")
        .then(response => {
          (this.Users = response.data.users)
        });
    },

    deleteGroup(id) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("access_token");

      axios
        .delete("http://" + this.globalURL + "/api/users/" + id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token")
          },
          data: {
            username: localStorage.getItem("user_name")
          }
        })
        .then(response => {
          this.$alert('Vartotojas ištrintas!');
          this.getUsers();
        });
    },

    toggleViewForm(value) {
      this.displayView = !this.displayView;
      if (value) {
        this.id = value;
      } else {
        this.id = null;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.cont {
  display: flex;
  justify-content: center;
  align-items: center;

  .users-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;

    .users {
      width: 100%;

      .users-header {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 84px;
        width: 100%;

        font-size: 21px;
        color: #00264c;
        border-bottom: 1px solid rgba(196, 196, 196, 0.3);
      }

      .actions {
        display: flex;
        margin-top: 40px;

        .buttons {
          width: 50%;
          display: flex;
          justify-content: flex-start;

          .button-add {
            height: 38px;
            border-radius: 10px;
            padding: 0 10px;

            display: flex;
            justify-content: center;
            align-items: center;

            color: #00264c;
            border: 1px solid #00264c;

            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            cursor: pointer;
            text-decoration: none;

            img {
              height: 16px;
              width: 16px;
              margin-right: 5px;
            }
          }
        }
      }

      .users-table {
        border-collapse: collapse;
        width: 100%;
        margin-top: 15px;
        text-align: left;

        thead tr {
          color: white;
          text-transform: uppercase;

          background: rgb(186,44,39);
          background: linear-gradient(90deg, rgba(186,44,39,1) 0%, rgba(97,14,128,1) 100%);
          border-radius: 7px;
          height: 52px;
        }

        th,
        td {
          padding: 12px 15px;
        }

        tbody:nth-of-type(even) {
          background: linear-gradient(90deg, #ffffff 0%, #e5e5e5 75.83%);
        }

        tbody tr {
          height: 73px;
        }

        tbody td:last-of-type {
          padding: 22px 20px;
          float: right;
          height: 73px;

          img {
            margin-right: 10px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
