<template>
 <div class="workers-container">
    <div class="workers">
      <div class="workers-header">Eksportuoti darbuotojus</div>
      <div class="filters">
          <Filters @filter-check="filterOn" :header="false"/>
      </div>
      <div class="actions">
        <div class="workers-found">
            Rasta darbuotojų: 
            <div class="workers-count">
                {{employeeCount}}
            </div>
        </div>
        <div>
          <button class="button export">
          <JsonCSV 
            :data="arrayToExport"
            :separator-excel="true"
            name="employees_data.csv"
          >
            <img src="../assets/exportWorkerIcon.png" />Generuoti CSV dokumentą
          </JsonCSV>
          </button>
        </div>
      </div>
    </div>
 </div>
</template>

<script>
import axios from "axios";
import Filters from "./Filters";
import JsonCSV from 'vue-json-csv'

export default {
  name: "Workers",

  components: {
    Filters,
    JsonCSV
  },

  data() {
    return {
        filtervalue: "",
        Employee: [],
        employeeCount: "",
        arrayToExport: []
    };
  },

  created() {
    axios
      .get("http://" + this.globalURL + "/api/employees")
      .then(
        response => (
          this.Employee = response.data.employees,
          this.employeeCount = response.data.total,
          this.pageCount = response.data.last_page,
          this.convertDataForExport(response.data.employeesAll)
        )
    );
  },

  methods: {
    filterOn(value) {
      if (value.divisions || value.search || value.per_page) {
        this.filterValue = value
        this.Employee = value.employees
        this.convertDataForExport(value.employees)
        this.employeeCount = value.total
      } else {
        this.filterValue = ''
        this.Employee = []
        this.employeeCount = 0
      }
    },
    convertDataForExport (array) {
      this.arrayToExport = []
      array.forEach(element => {
        let object = {
          "Vardas": element.name, 
          "Pavardė": element.lastname,
          "Telefono numeris": element.mobile_number,
          "Darbo telefono numeris": element.work_number,
          "El.paštas": element.email,
          "Lytis": element.gender,
          "Pareigos": element.position,
          "Darbovietės adresas": `${element.workplace_id.street} ${element.workplace_id.number}, ${element.workplace_id.city}, ${element.workplace_id.country}`,
          "Padalinys": element.division_id.name,
          "Skyrius": element.subdivision_id.name,
          "Regionas": element.region_id.name,
          "Grupė": element.group_id.name,
          "Pogrupis": element.subgroup_id.name
        }
        this.arrayToExport.push(object)
      })
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

    .filters {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;

      .filters {
          width: 100%;

          li {
            width: 200px;
          }
      }
    }

    .actions {
        margin-top: 30px;
        display: flex;
        justify-content: center;
        align-items: center;

        .workers-found {
            padding: 0px 20px 0px 20px;
            border: 1px solid #969696;
            box-sizing: border-box;
            border-radius: 10px;
            height: 47px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 50px;

            font-size: 16px;

            .workers-count {
                margin-left: 5px;
                font-weight: 800;
            }
        }
    }
 }
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

  .export {
    color: #008000;
    border: 1px solid #008000;
  }
}
</style>
