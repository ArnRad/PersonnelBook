<template>
  <div>
    <div class="cont">
      <div class="activity-container">
        <div class="activity">
          <div class="activity-header">Veiksmai</div>
          <div class="actions">
            <LogFilters />
          </div>
          <div>
            <table class="activity-table">
              <thead>
                <tr>
                  <th>Vardas</th>
                  <th>Pavardė</th>
                  <th>Veiksmas</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody v-for="log in Logs" :key="log.id">
                <tr>
                  <td>{{ log.name }}</td>
                  <td>{{ log.surname }}</td>
                  <td>{{ log.description }}</td>
                  <td>{{ log.created_at }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
</template>

<script>
import axios from "axios";
import Paginate from "vuejs-paginate";
import LogFilters from "./LogFilters";

export default {
  name: "ActivityLog",

  components: {
    Paginate,
    LogFilters
  },

  data() {
    return {
      Logs: {},
      pageCount: 0
    };
  },

  created() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("access_token");

    axios
      .get("http://" + this.globalURL + "/api/logs")
      .then(
        response => (
          (this.Logs = response.data.data.data),
          (this.pageCount = response.data.data.last_page)
        )
      );
  },

  methods: {
    pagePaginationClick(pageNum) {
      axios
        .get("http://" + this.globalURL + "/api/logs?page=" + pageNum)
        .then(response => (this.Logs = response.data.data.data));
    }
  }
};
</script>

<style lang="scss">
.cont {
  display: flex;
  justify-content: center;
  align-items: center;

  .activity-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;

    .activity {
      width: 100%;

      .activity-header {
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

      .activity-table {
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
      }
    }
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
</style>
