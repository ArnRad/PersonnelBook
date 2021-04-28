<template>
    <div class="statistics-container">
        <div class="statistics">
            <div class="statistics-header">Įmonės darbuotojų statistikos</div>
            <div class="cirlce-container">
                <div class="circle">
                    <vue-ellipse-progress 
                        :progress="100"
                        color="#ba2c27"
                        :size="250"
                        :thickness="40"
                        emptyThickness="40"
                        :legend="true"
                        :legendValue="this.employeeCount"
                        animation="reverse 1000 200"
                        :noData="false"
                        :loading="false"
                        fontColor="black" 
                        :half="false"
                        :gap="10"
                        reverse
                        fontSize="2rem"
                    >
                        <p slot="legend-caption">Darbuotojų</p>
                    </vue-ellipse-progress>
                </div>
                <div class="circle">
                    <vue-ellipse-progress 
                        :progress="CircleOneProgress"
                        color="#ab1d63"
                        :size="250"
                        :thickness="40"
                        emptyThickness="40"
                        :legend="CircleOneLegendFlag"
                        :legendValue="CircleOneLegend"
                        animation="reverse 1000 200"
                        :noData="false"
                        :loading="false"
                        fontColor="black" 
                        :half="false"
                        :gap="10"
                        fontSize="2rem"
                    >
                        <p v-if="CircleOneLegend !== null" slot="legend-caption">Darbuotojų</p>
                        <p v-else slot="legend-caption">Pasirinkite filtrą</p>
                        <span v-if="CircleOneLegend !== null" slot="legend-value">/{{employeeCount}}</span>
                    </vue-ellipse-progress>
                    <div class="circle-actions">
                        <li>
                            <label for="workplace">Pasirinkite darbovietę</label>
                            <select
                                v-model="selectedWorkplace"
                                @change="loadCircleOne()"
                            >
                                <option value="" selected disabled hidden>Nepasirinkta</option>
                                <template v-for="workplaceOne in workplacesAll">
                                <option :key="workplaceOne._id" :value="workplaceOne._id">
                                    {{ workplaceOne.street }}
                                </option>
                                </template>
                            </select>
                        </li>
                    </div>
                </div>
                <div class="circle">
                    <vue-ellipse-progress 
                        :progress="CircleTwoProgress"
                        color="#83164c"
                        :size="250"
                        :thickness="40"
                        emptyThickness="40"
                        :legend="CircleTwoLegendFlag"
                        :legendValue="CircleTwoLegend"
                        animation="reverse 1000 200"
                        :noData="false"
                        :loading="false"
                        fontColor="black" 
                        :half="false"
                        :gap="10"
                        reverse
                        fontSize="2rem"
                    >
                        <p v-if="CircleTwoLegend !== null" slot="legend-caption">Darbuotojų</p>
                        <p v-else slot="legend-caption">Pasirinkite filtrą</p>
                        <span v-if="CircleTwoLegend !== null" slot="legend-value">/{{employeeCount}}</span>
                    </vue-ellipse-progress>
                    <div class="circle-actions">
                        <li>
                            <label for="workplace">Pasirinkite padalinį</label>
                            <select
                                v-model="selectedDivision"
                                @change="loadCircleTwo()"
                            >
                                <option value="" selected disabled hidden>Nepasirinkta</option>
                                <template v-for="divisionOne in divisionsAll">
                                <option :key="divisionOne._id" :value="divisionOne._id">
                                    {{ divisionOne.name }} {{divisionOne.workplace_id.street}}
                                </option>
                                </template>
                            </select>
                        </li>
                    </div>
                </div>
                <div class="circle">
                    <vue-ellipse-progress 
                        :progress="CircleThreeProgress"
                        color="#610e80"
                        :size="250"
                        :thickness="40"
                        emptyThickness="40"
                        :legend="CircleThreeLegendFlag"
                        :legendValue="CircleThreeLegend"
                        animation="reverse 1000 200"
                        :noData="false"
                        :loading="false"
                        fontColor="black" 
                        :half="false"
                        :gap="10"
                        fontSize="2rem"
                    >
                        <p v-if="CircleThreeLegend !== null" slot="legend-caption">Darbuotojų</p>
                        <p v-else slot="legend-caption">Pasirinkite filtrą</p>
                        <span v-if="CircleThreeLegend !== null" slot="legend-value">/{{employeeCount}}</span>
                    </vue-ellipse-progress>
                    <div class="circle-actions">
                        <li>
                            <label for="workplace">Pasirinkite skyrių</label>
                            <select
                                v-model="selectedSubdivision"
                                @change="loadCircleThree()"
                            >
                                <option value="" selected disabled hidden>Nepasirinkta</option>
                                <template v-for="subdivisionOne in subdivisionsAll">
                                <option :key="subdivisionOne._id" :value="subdivisionOne._id">
                                    {{ subdivisionOne.name }} {{subdivisionOne.workplace_id.street}}
                                </option>
                                </template>
                            </select>
                        </li>
                    </div>
                </div>
            </div>
        </div>
        <div class="statistics">
            <div class="statistics-header">Atlyginimo skaičiuoklė</div>
            <div class="salary-counter-container">
                <div class="text">"Ant popieriaus"</div>
                <li>
                    <label for="name">Atlyginimas €</label>
                    <input
                    type="number"
                    maxlength="20"
                    required
                    v-model="salary"
                    />
                </li>
                <div class="buttons">
                    <button type="button" @click="countSalary()" class="login-button">Skaičiuoti</button>
                </div>
            </div>
            <div class="table">
                <table v-if="salaryFlag" class="content-table">
                    <tbody>
                        <tr>
                            <td>Paskaičiuotas atlyginimas "ant popieriaus"</td>
                            <td>{{salary}} €</td>
                        </tr>
                        <tr>
                            <td>Pritaikytas NPD</td>
                            <td>{{salaryData.npd}} €</td>
                        </tr>
                        <tr>
                            <td>Pajamų mokestis (GPM)</td>
                            <td>{{salaryData.gpm}} €</td>
                        </tr>
                        <tr>
                            <td>Sodra</td>
                            <td>{{salaryData.sodra}} €</td>
                        </tr>
                        <tr class="green">
                            <td>Išmokamas atlyginimas į rankas</td>
                            <td>{{salaryData.salaryTotal}} €</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"

export default {
  name: "Statistics",

  data () {
      return {
          selectedWorkplace: '',
          selectedDivision: '',
          selectedSubdivision: '',
          salaryData: {
              npd: '-',
              gpm: '-',
              sodra: '-',
              salaryTotal: '-'
          },
          salaryFlag: false,
          salary: '',
          employeeCount: 0,
          workplacesAll: [],
          divisionsAll: [],
          subdivisionsAll: [],
          Employee: [],
          CircleOneLegend: null,
          CircleOneLegendFlag: false,
          CircleOneProgress: 80,
          CircleTwoLegend: null,
          CircleTwoLegendFlag: false,
          CircleTwoProgress: 60,
          CircleThreeLegend: null,
          CircleThreeLegendFlag: false,
          CircleThreeProgress: 40
      }
  },

  created() {
    axios
      .get("http://" + this.globalURL + "/api/employees")
      .then(
        response => (
            this.Employee = response.data.employeesAll,
            this.employeeCount = response.data.total
        )
      )

    axios
      .get("http://" + this.globalURL + "/api/workplaces")
      .then(response => {
          this.workplacesAll = response.data.workplaces
        });

    axios
      .get("http://" + this.globalURL + "/api/divisions")
      .then(response => {
          this.divisionsAll = response.data.divisions
          });

    axios
      .get("http://" + this.globalURL + "/api/subdivisions")
      .then(response => {
          this.subdivisionsAll = response.data.subdivision
          });
  },

  methods: {
    loadCircleOne () {
        let counter = 0
        this.CircleOneLegendFlag = true
        this.Employee.forEach(employee => {
            if (employee.workplace_id._id === this.selectedWorkplace) {
                counter++
            }
        })
        if (counter === 0) {
            this.CircleOneProgress = 0
        } else {
            this.CircleOneProgress = counter * 100 / this.employeeCount
        }
        this.CircleOneLegend = counter
    },
    loadCircleTwo () {
        let counter = 0
        this.CircleTwoLegendFlag = true
        this.Employee.forEach(employee => {
            if (employee.division_id._id === this.selectedDivision) {
                counter++
            }
        })
        if (counter === 0) {
            this.CircleTwoProgress = 0
        } else {
            this.CircleTwoProgress = counter * 100 / this.employeeCount
        }
        this.CircleTwoLegend = counter
    },
    loadCircleThree () {
        let counter = 0
        this.CircleThreeLegendFlag = true
        this.Employee.forEach(employee => {
            if (employee.subdivision_id._id === this.selectedSubdivision) {
                counter++
            }
        })
        if (counter === 0) {
            this.CircleThreeProgress = 0
        } else {
            this.CircleThreeProgress = counter * 100 / this.employeeCount
        }
        this.CircleThreeLegend = counter
    },
    countSalary () {
        if (this.salary) {
            this.salaryFlag = true
        }
        if (this.salary > 642 && this.salary <= 2864) {
            let npd = (this.salary - 642) * 0.18
            this.salaryData.npd = (400 - npd).toFixed(2)
        } else if (this.salary > 2864) {
            this.salaryData.npd = 0
        } else if (this.salary <= 642) {
            this.salaryData.npd = 400
        }
        if (this.salary > 400) {
            this.salaryData.gpm = ((this.salary - this.salaryData.npd) * 0.2).toFixed(2)
        } else {
            this.salaryData.gpm = 0
        }
        
        this.salaryData.sodra = (this.salary * 0.195).toFixed(2)
        this.salaryData.salaryTotal = (this.salary - this.salaryData.gpm - this.salaryData.sodra).toFixed(2)
    }
  }
};
</script>

<style lang="scss" scoped>
.statistics-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .statistics {
    width: 80%;

    .statistics-header {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 84px;
      width: 100%;

      font-size: 21px;
      color: #00264c;
      border-bottom: 1px solid rgba(196, 196, 196, 0.3);
    }

    .cirlce-container {
        margin-top: 60px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        .circle {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 30px;

            .circle-actions {
                margin-top: 50px;
            }
        }
    }

    .salary-counter-container {
        margin-top: 60px;
        display: flex;
        justify-content: center;
        align-items: flex-start;

        .text {
            font-size: 21px;
            margin-bottom: 5px;
            margin-right: 20px;
        }

        .buttons {
            margin-left: 40px;
        }
    }

    .table {
        margin-top: 50px;
        margin-bottom: 60px;
        display: flex;
        justify-content: center;

            .content-table {
                border-collapse: collapse;
                margin-top: 15px;
                text-align: left;
                width: 50%;

                tbody tr {
                    color: white;
                    text-transform: uppercase;

                    display: flex;
                    justify-content: space-between;
                    background: linear-gradient(90deg, #ba2c27 0%, #610e80 100%);

                    padding: 20px;

                    border-radius: 7px;
                    height: 52px;
                }

                tbody tr:nth-of-type(even) {
                    color: black;
                    background: linear-gradient(90deg, #ffffff 0%, #e5e5e5 75.83%);
                }

            }
    }
 }


 
    .green {
        background: linear-gradient(90deg, #49a735 0%, #00550a 100%) !important;
        color: white !important;
    }

    li {
      display: block;
      padding: 10px;
      border: 1px solid #969696;
      margin-bottom: 30px;
      width: 200px;
      border-radius: 7px;
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
    input[type="checkbox"],
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
      font-size: 12px;
      padding: 0;
      font-family: "Open-Sans", sans-serif;
      background-color: #f4f4f4;
      color: #818198;
      cursor: pointer;
    }

    input[type="submit"],
      input[type="button"],
      button {
        background: #f4f4f4;
        border: 1px solid #969696;
        padding: 7px 15px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        font-size: 18px;
        text-transform: uppercase;
        letter-spacing: 0.016em;
        font-family: "Open-Sans", sans-serif;
        color: black;
        cursor: pointer;
      }

      .buttons {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }

      input[type="submit"]:hover,
      input[type="button"]:hover,
      button:hover {
        background: rgb(186,44,39);
        background: linear-gradient(90deg, rgba(186,44,39,1) 0%, rgba(97,14,128,1) 100%);
        color: #f4f4f4;
      }

}
</style>
