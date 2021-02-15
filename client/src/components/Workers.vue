<template>
  <div class="workers-container">
    <div class="workers">
      <div class="workers-header">Darbuotojai</div>
      <div class="actions">
        <div class="buttons">
          <router-link :to="{ name: 'add' }">
            <button class="button add">
              <img src="../assets/addWorkerIcon.png" />Pridėti darbuotoją
            </button>
          </router-link>
          <button @click="exportWorkers()" class="button export">
            <img src="../assets/exportWorkerIcon.png" />Eksportuoti darbuotojus
          </button>
        </div>
        <div class="search-bar">
          <li>
            <label for="search">Paieška</label>
            <div class="search-input-field">
              <img @click="search" src="../assets/search-icon.png" />
              <input
                v-model="searchInput"
                type="text"
                name="search"
                maxlength="20"
                required
              />
            </div>
          </li>
        </div>
      </div>
      <div>
        <table class="content-table">
          <thead>
            <tr>
              <th></th>
              <th>Vardas</th>
              <th>Pavardė</th>
              <th>Padalinys</th>
              <th>Skyrius</th>
              <th>Regionas</th>
              <th>Grupė</th>
              <th>Pogrupis</th>
              <th>Veiksmai</th>
            </tr>
          </thead>
          <tbody v-for="worker in Worker" :key="worker.id">
            <Worker :worker="worker" @delete="deleteEmployee" />
          </tbody>
        </table>
      </div>
      <Paginate
        :page-count="this.pageCount"
        :prev-text="'<'"
        :next-text="'>'"
        :page-class="'pagination-item'"
        :container-class="'pagination'"
        :click-handler="pagePaginationClick"
      >
      </Paginate>
    </div>
  </div>
</template>

<script>
import Worker from "./tables/Worker";
import axios from "axios";
import Paginate from "vuejs-paginate";
import AddEditEmployee from "./actions/AddEditEmployee";

export default {
  name: "Workers",

  components: {
    Worker,
    Paginate
  },

  data() {
    return {
      Worker: [],
      allWorkers: [],
      sortedWorkers: [],
      totalWorkers: 0,
      pageCount: 0,
      WorkerID: 0,
      EditWorker: Worker,
      searchInput: ""
    };
  },

  mounted() {
    axios
      .get("http://" + this.globalURL + "/api/employees?limit=8")
      .then(
        response => (
          (this.Worker = response.data.employees),
          (this.pageCount = response.data.last_page)
        )
      );
  },

  methods: {
    pagePaginationClick(pageNum) {
      axios
        .get(
          "http://" + this.globalURL + "/api/employees?limit=8&page=" + pageNum
        )
        .then(response => (this.Worker = response.data.employees));
    },

    exportWorkers() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("access_token");

      axios({
        url: "http://" + this.globalURL + "/api/employees/export",
        method: "GET",
        responseType: "blob"
      }).then(response => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute("download", "employees.csv");
        document.body.appendChild(fileLink);

        fileLink.click();
      });
    },

    deleteEmployee(id) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("access_token");

      axios
        .get("http://" + this.globalURL + "/api/workplaces")
        .then(response => (this.workplacesAll = response.data.data));

      axios
        .delete("http://" + this.globalURL + "/api/employees/" + id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token")
          },
          data: {
            username: localStorage.getItem("user_name")
          }
        })
        .then(response => {
          this.$alert(response.data.message);
        });
    },

    search() {
      axios
        .get(
          "http://" +
            this.globalURL +
            "/api/employees?search=" +
            this.searchInput
        )
        .then(
          response => (
            (this.Worker = response.data.employees),
            (this.pageCount = response.data.last_page)
          )
        );
    }
  }
};
</script>

<style lang="scss">
.workers-container {
  display: flex;
  justify-content: center;
  align-items: center;

  .workers {
    width: 80%;

    .workers-header {
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

        .button {
          height: 38px;
          border-radius: 10px;
          padding: 0 10px;

          display: flex;
          justify-content: center;
          align-items: center;

          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          cursor: pointer;

          img {
            height: 16px;
            width: 16px;
            margin-right: 5px;
          }
        }

        .add {
          color: #00264c;
          border: 1px solid #00264c;
        }

        .export {
          color: #008000;
          border: 1px solid #008000;
        }

        .button:last-of-type {
          margin-left: 10px;
        }
      }

      .search-bar {
        width: 50%;
        display: flex;
        justify-content: flex-end;

        ul {
          list-style: none;
          padding: 0;
          display: flex;
          justify-content: space-around;
          margin-top: 15px;
        }
        li {
          display: block;
          padding: 10px;
          border: 1px solid #969696;
          margin-bottom: 30px;
          border-radius: 7px;

          .search-input-field {
            display: flex;
            justify-content: center;
            align-items: center;

            img {
              height: 16px;
              width: 16px;
              cursor: pointer;
            }
          }
        }
        li:last-child {
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
          font-size: 11px;
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
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          padding: 0 10px;
          font-family: "Open-Sans", sans-serif;
          background-color: #f4f4f4;
        }
      }
    }

    .content-table {
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
    }

    .pagination {
      display: flex;
      flex-direction: row;
      justify-content: center;
      list-style: none;

      margin: 30px 0;

      li {
        color: #00264c;
        margin: 0 3px;
        padding: 0 3px;
      }

      li:first-of-type,
      li:last-of-type {
        color: #0054a6;
        font-weight: 800;
      }

      .active {
        background: rgb(186,44,39);
        background: linear-gradient(90deg, rgba(186,44,39,1) 0%, rgba(97,14,128,1) 100%);
        border-radius: 7px;
        color: #ffffff;
      }
    }
  }
}
</style>
