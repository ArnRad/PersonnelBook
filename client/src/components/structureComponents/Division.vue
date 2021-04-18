<template>
  <div class="division-container">
    <AddEditDivision
      :id="id"
      v-if="displayView"
      @close="toggleViewForm"
      @update="getDivisions()"
    />
    <div class="division">
      <div class="division-header">Padaliniai</div>
      <div class="actions">
        <div class="buttons">
          <button @click="toggleViewForm()" class="button-add">
            <img src="../../assets/addWorkerIcon.png" />Pridėti padalinį
          </button>
        </div>
      </div>
      <div>
        <table class="division-table">
          <thead>
            <tr>
              <th>Padalinio pavadinimas</th>
              <th>Darbovietė</th>
              <th></th>
            </tr>
          </thead>
          <tbody v-for="division in Divisions" :key="division.id">
            <tr>
              <td>{{ division.name }}</td>
              <td>
                {{ division.workplaces.street }}
                {{ division.workplaces.number }},
                {{ division.workplaces.city }},
                {{ division.workplaces.country }}
              </td>
              <td>
                <img
                  @click="toggleViewForm(division._id)"
                  src="../../assets/edit-employee.png"
                />
                <img
                  class="delete-btn"
                  @click="deleteDivision(division._id)"
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
import AddEditDivision from "../actions/AddEditDivision";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "Division",

  data() {
    return {
      Divisions: {},
      SubDivisions: [],
      id: 0,
      displayView: false
    };
  },

  components: {
    AddEditDivision
  },

  mounted() {
    this.getDivisions();
  },

  methods: {
    getDivisions() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("access_token");

      axios
        .get("http://" + this.globalURL + "/api/divisions")
        .then(response => {
          (this.Divisions = response.data.divisions)
        });

      axios
        .get("http://" + this.globalURL + "/api/subdivisions")
        .then(
          response => (
            (this.SubDivisions = response.data.subdivision)
          )
        );
    },

    deleteDivision(id) {
      if (localStorage.getItem("access_token")) {
        let tokenInfo = VueJwtDecode.decode(localStorage.getItem("access_token"));
        if (!tokenInfo.user.permissions.includes('delete structures')) {
          this.$router.push({ name: "404" });
        } else {
          let allowDelete = true;

          axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem("access_token");

          for (let i = 0; i < this.SubDivisions.length; i++) {
            if (this.SubDivisions[i].division_id[0] === id) {allowDelete = false}
          }
          
          if(allowDelete) {
            axios
              .delete("http://" + this.globalURL + "/api/divisions/" + id, {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("access_token")
                },
                data: {
                  username: localStorage.getItem("user_name")
                }
              })
              .then(response => {
                this.$alert('Padalinys ištrintas!');
                this.getDivisions();
              });
          } else {
            this.$alert('Pirma ištrinkite visus skyrius priklausančius šiam padaliniui!');
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
.division-container {
  display: flex;
  justify-content: center;
  align-items: center;

  .division {
    width: 100%;

    .division-header {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 84px;
      width: 100%;

      font-size: 18px;
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

    .division-table {
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
