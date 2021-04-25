<template>
  <div class="cont">
    <div class="workplace-container">
      <AddEditWorkplaces :id="id" v-if="displayView" @close="toggleViewForm" />
      <div class="workplace">
        <div class="workplace-header">Darbovietės</div>
        <div class="actions">
          <div class="buttons">
            <button @click="toggleViewForm()" class="button-add">
              <img src="../assets/addWorkerIcon.png" />Pridėti darbovietę
            </button>
          </div>
        </div>
        <div>
          <table class="workplace-table">
            <thead>
              <tr>
                <th>Darbovietės adresas</th>
                <th></th>
              </tr>
            </thead>
            <tbody v-for="workplace in workPlaces" :key="workplace.id">
              <tr>
                <td>
                  {{ workplace.street }} {{ workplace.number }},
                  {{ workplace.city }}, {{ workplace.country }}
                </td>
                <td>
                  <img
                    @click="toggleViewForm(workplace._id)"
                    src="../assets/edit-employee.png"
                  />
                  <img
                    class="delete-btn"
                    @click="deleteGroup(workplace._id)"
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
import AddEditWorkplaces from "./actions/AddEditWorkplaces";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "WorkPlaces",

  data() {
    return {
      workPlaces: {},
      Divisions: [],
      id: 0,
      displayView: false
    };
  },

  components: {
    AddEditWorkplaces
  },

  created() {
    axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");
    this.getData()
  },

  methods: {
    getData() {
      axios
        .get("http://" + this.globalURL + "/api/workplaces")
        .then(response => (this.workPlaces = response.data.workplaces));

      axios
        .get("http://" + this.globalURL + "/api/divisions")
        .then(response => {
          (this.Divisions = response.data.divisions)
        });
    },
    deleteGroup(id) {
      if (localStorage.getItem("access_token")) {
        let tokenInfo = VueJwtDecode.decode(localStorage.getItem("access_token"));
        if (!tokenInfo.user.permissions.includes('delete workplaces')) {
          this.$router.push({ name: "404" });
        } else {
          let allowDelete = true;

          axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem("access_token");

          for (let i = 0; i < this.Divisions.length; i++) {
            if (this.Divisions[i].workplace_id === id) {allowDelete = false}
          }

          if(allowDelete) {
            axios
            .delete("http://" + this.globalURL + "/api/workplaces/" + id, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token")
              },
              data: {
                username: localStorage.getItem("user_name")
              }
            })
            .then(response => {
              this.$alert('Darbovietė pašalinta!');
              this.getData()
            });
          } else {
            this.$alert('Pirma ištrinkite visus padalinius priklausančius šiai darbovietei!');
          }
        }
      }
    },

    toggleViewForm(value) {
      if (localStorage.getItem("access_token")) {
        let tokenInfo = VueJwtDecode.decode(localStorage.getItem("access_token"));
        if (!tokenInfo.user.permissions.includes('create-edit workplaces')) {
          this.$router.push({ name: "404" });
        }
        else {
          this.displayView = !this.displayView;
          if (value) {
            this.id = value;
          } else {
            this.id = null;
          }
        }
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

  .workplace-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 80px;
    width: 80%;

    .workplace {
      width: 100%;

      .workplace-header {
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

      .workplace-table {
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
