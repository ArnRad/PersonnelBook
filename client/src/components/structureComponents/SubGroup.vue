<template>
  <div class="subgroup-container">
    <AddEditSubGroup
      :id="id"
      v-if="displayView"
      @close="toggleViewForm"
      @update="getGroups()"
    />
    <div class="subgroup">
      <div class="subgroup-header">Pogrupiai</div>
      <div class="actions">
        <div class="buttons">
          <button @click="toggleViewForm()" class="button-add">
            <img src="../../assets/addWorkerIcon.png" />Pridėti pogrupį
          </button>
        </div>
      </div>
      <div>
        <table class="subgroup-table">
          <thead>
            <tr>
              <th>Pogrupio pavadinimas</th>
              <th>Priskirta grupė</th>
              <th></th>
            </tr>
          </thead>
          <tbody v-for="subgroup in subGroups" :key="subgroup.id">
            <tr>
              <td>{{ subgroup.name }}</td>
              <td v-if="subgroup.group">{{ subgroup.group.name }}</td>
              <td v-else>-</td>
              <td>
                <img
                  @click="toggleViewForm(subgroup._id)"
                  src="../../assets/edit-employee.png"
                />
                <img
                  class="delete-btn"
                  @click="deleteGroup(subgroup._id)"
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
import AddEditSubGroup from "../actions/AddEditSubGroup";

export default {
  name: "Group",

  data() {
    return {
      subGroups: {},
      id: 0,
      displayView: false
    };
  },

  components: {
    AddEditSubGroup
  },

  created() {
    this.getGroups();
  },

  methods: {
    getGroups() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("access_token");

      axios
        .get("http://" + this.globalURL + "/api/subgroups")
        .then(response => (this.subGroups = response.data.subgroup));
    },

    deleteGroup(id) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("access_token");

      axios
        .delete("http://" + this.globalURL + "/api/subgroups/" + id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token")
          },
          data: {
            username: localStorage.getItem("user_name")
          }
        })
        .then(response => {
          this.$alert('Pogrupis ištrintas!');
          this.getGroups();
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
.subgroup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 80px;

  .subgroup {
    width: 100%;

    .subgroup-header {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 84px;
      width: 100%;
      margin-top: 40px;
      border-top: 1px solid rgba(196, 196, 196, 0.3);

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

    .subgroup-table {
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
