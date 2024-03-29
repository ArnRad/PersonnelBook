<template>
  <div class="subdivision-container">
    <AddEditSubDivision
      :id="id"
      v-if="displayView"
      @close="toggleViewForm"
      @update="getSubdivisions()"
    />
    <div class="subdivision">
      <div class="subdivision-header">Skyriai</div>
      <div class="actions">
        <div class="buttons">
          <button @click="toggleViewForm()" class="button-add">
            <img src="../../assets/addWorkerIcon.png" />Pridėti skyrių
          </button>
        </div>
      </div>
      <div>
        <table class="subdivision-table">
          <thead>
            <tr>
              <th>Skyriaus pavadinimas</th>
              <th>Priskirtas padalinys</th>
              <th>Padalinio adresas</th>
              <th></th>
            </tr>
          </thead>
          <tbody v-for="subdivision in SubDivisions" :key="subdivision.id">
            <tr>
              <td>{{ subdivision.name }}</td>
              <td>{{ subdivision.division_id.name}}</td>
              <td>
                {{
                subdivision.workplace_id.street
                + ' ' + subdivision.workplace_id.number
                + ', ' + subdivision.workplace_id.city
                + ', ' + subdivision.workplace_id.country
                }}
              </td>
              <td>
                <img
                  class="edit-btn"
                  @click="toggleViewForm(subdivision._id)"
                  src="../../assets/edit-employee.png"
                />
                <img
                  class="delete-btn"
                  @click="deleteSubDivision(subdivision._id)"
                  src="../../assets/delete-employee.png"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AddEditSubDivision from "../actions/AddEditSubDivision";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "SubDivision",

  data() {
    return {
      SubDivisions: {},
      Regions: [],
      id: 0,
      displayView: false
    };
  },

  components: {
    AddEditSubDivision
  },

  mounted() {
    this.getSubdivisions();
  },

  methods: {
    getSubdivisions() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("access_token");

      axios
        .get("http://" + this.globalURL + "/api/subdivisions")
        .then(
          response => (
            (this.SubDivisions = response.data.subdivision)
          )
        );

      axios
        .get("http://" + this.globalURL + "/api/regions")
        .then(response => (this.Regions = response.data.region));
    },

    deleteSubDivision(id) {
      if (localStorage.getItem("access_token")) {
        let tokenInfo = VueJwtDecode.decode(localStorage.getItem("access_token"));
        if (!tokenInfo.user.permissions.includes('delete structures')) {
          this.$router.push({ name: "404" });
        } else {
          let allowDelete = true;

          axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem("access_token");

          for (let i = 0; i < this.Regions.length; i++) {
            if (this.Regions[i].subdivision_id._id === id) {allowDelete = false}
          }

          if(allowDelete) {
            axios
              .delete("http://" + this.globalURL + "/api/subdivisions/" + id, {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("access_token")
                },
                data: {
                  username: localStorage.getItem("user_name")
                }
              })
              .then(response => {
                this.$alert('Skyrius ištrintas!');
                this.getSubdivisions();
              });
          } else {
            this.$alert('Pirma ištrinkite visus regionus priklausančius šiam skyriui!');
          }
        }
      }
    },

    toggleViewForm(value) {
      if (localStorage.getItem("access_token")) {
        let tokenInfo = VueJwtDecode.decode(localStorage.getItem("access_token"));
        if (!tokenInfo.user.permissions.includes('create-edit structures')) {
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
.subdivision-container {
  display: flex;
  justify-content: center;
  align-items: center;

  .subdivision {
    width: 100%;

    .subdivision-header {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 84px;
      width: 100%;
      margin-top: 40px;

      font-size: 18px;
      color: #00264c;
      border-bottom: 1px solid rgba(196, 196, 196, 0.3);
      border-top: 1px solid rgba(196, 196, 196, 0.3);
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

    .subdivision-table {
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
</style>
