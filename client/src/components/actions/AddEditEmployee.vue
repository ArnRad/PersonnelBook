<template>
  <div class="form-container">
    <form class="form">
      <div class="header-employee">{{ header }}</div>
      <div class="form-container">
        <ul>
          <li>
            <label for="name">Vardas</label>
            <input
              v-model="employee.name"
              type="text"
              name="name"
              maxlength="20"
              required
            />
          </li>
          <li>
            <label for="position">Pareigos</label>
            <input
              type="text"
              name="position"
              maxlength="20"
              v-model="employee.position"
              required
            />
          </li>
          <li>
            <label for="work_number">Darbo mobilus telefono numeris</label>
            <input
              type="text"
              name="work_number"
              maxlength="20"
              v-model="employee.work_number"
            />
          </li>
          <li>
            <label for="subdivision">Skyrius</label>
            <select name="subdivision" v-model="selectedSubDivision" required>
              <template v-for="subdivisionOne in subdivisionsAll">
                <option
                  v-if="subdivisionOne.division_id == selectedDivision"
                  :key="subdivisionOne.id"
                  :value="subdivisionOne.id"
                >
                  {{ subdivisionOne.name }}
                </option>
              </template>
            </select>
          </li>
          <li>
            <label for="subgroup">Pogrupis</label>
            <select name="subgroup" v-model="selectedSubGroup" required>
              <template v-for="subgroupOne in subgroupsAll">
                <option
                  :key="subgroupOne.id"
                  v-if="subgroupOne.group_id == selectedGroup"
                  :value="subgroupOne.id"
                >
                  {{ subgroupOne.name }}
                </option>
              </template>
            </select>
          </li>
        </ul>
        <ul>
          <li>
            <label for="lastname">Pavardė</label>
            <input
              type="text"
              name="lastname"
              maxlength="20"
              v-model="employee.lastname"
              required
            />
          </li>

          <li>
            <label for="email">El.paštas</label>
            <input
              type="email"
              name="email"
              maxlength="20"
              v-model="employee.email"
            />
          </li>

          <li>
            <label for="workplace">Darbovietė</label>
            <select name="workplace" v-model="selectedWorkplace" required>
              <option
                v-for="workplaceOne in workplacesAll"
                :key="workplaceOne.id"
                :value="workplaceOne.id"
              >
                {{ workplaceOne.street }}
              </option>
            </select>
          </li>
          <li>
            <label for="region">Regionas</label>
            <select name="region" v-model="selectedRegion">
              <template v-for="regionOne in regionsAll">
                <option
                  :key="regionOne.id"
                  v-if="regionOne.subdivision_id == selectedSubDivision"
                  :value="regionOne.id"
                >
                  {{ regionOne.name }}
                </option>
              </template>
            </select>
          </li>
        </ul>
        <ul>
          <li>
            <label for="gender">Lytis</label>
            <select name="gender" v-model="employee.gender" required>
              <option value="Vyras">Vyras</option>
              <option value="Moteris">Moteris</option>
            </select>
          </li>
          <li>
            <label for="mobile_number">Trumpasis numeris</label>
            <input
              type="text"
              name="mobile_number"
              maxlength="20"
              v-model="employee.mobile_number"
            />
          </li>
          <li>
            <label for="division">Padalinys</label>
            <select name="division" v-model="selectedDivision" required>
              <template v-for="divisionOne in testDivisionsAll">
                <option
                  :key="divisionOne.data.id"
                  :value="divisionOne.data.id"
                  v-if="divisionOne.dataWorkplace_id == selectedWorkplace"
                >
                  {{ divisionOne.data.name }}
                </option>
              </template>
            </select>
          </li>

          <li>
            <label for="group">Grupė</label>
            <select name="group" v-model="selectedGroup" required>
              <template v-for="groupOne in groupsAll">
                <option
                  :key="groupOne.id"
                  v-if="
                    groupOne.subdivision_id == selectedSubDivision ||
                      groupOne.region_id == selectedRegion
                  "
                  :value="groupOne.id"
                >
                  {{ groupOne.name }}
                </option>
              </template>
            </select>
          </li>
        </ul>
      </div>
      <li class="add-image">
        <input
          type="file"
          ref="file"
          hidden="hidden"
          @change="handleFileUpload()"
        />
        <p>Darbuotojo nuotrauka</p>
        <button @click="submitFile()" type="button">Įkelti</button>
      </li>

      <li class="buttons">
        <input
          v-show="!this.$route.params.id"
          @click.prevent="submitAdd"
          type="submit"
          value="Patvirtinti"
        />
        <input
          v-show="this.$route.params.id"
          @click="submitEdit"
          type="submit"
          value="Redaguoti"
        />
        <button @click="$router.push('/employees')">Atšaukti</button>
      </li>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddEditForm",

  data() {
    return {
      file: "",
      testDivisionsAll: [],
      workplacesAll: {},
      divisionsAll: {},
      subdivisionsAll: {},
      regionsAll: {},
      groupsAll: {},
      subgroupsAll: {},

      selectedWorkplace: 1,
      selectedDivision: 0,
      selectedSubDivision: 0,
      selectedRegion: 0,
      selectedGroup: 0,
      selectedSubGroup: 0,
      header: "Pridėti naują darbuotoją",
      employee: {},
      workplace: {},
      division: {},
      subdivision: {},
      region: {},
      group: {},
      subgroup: {}
    };
  },

  created() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("access_token");

    this.employee.gender = "Vyras";

    axios
      .get("http://" + this.globalURL + "/api/workplaces")
      .then(response => (this.workplacesAll = response.data.data));

    axios.get("http://" + this.globalURL + "/api/divisions").then(response => {
      this.divisionsAll = response.data;
      for (let i = 0; i < this.divisionsAll.length; i++) {
        for (let j = 0; j < response.data[i].workplaces.length; j++) {
          let newObject = {
            data: response.data[i],
            dataWorkplace_id: response.data[i].workplaces[j].pivot.workplace_id
          };

          this.testDivisionsAll.push(newObject);
        }
      }
    });

    axios
      .get("http://" + this.globalURL + "/api/subdivisions")
      .then(
        response => (this.subdivisionsAll = response.data.subdivision.data)
      );

    axios
      .get("http://" + this.globalURL + "/api/regions")
      .then(response => (this.regionsAll = response.data.regions.data));

    axios
      .get("http://" + this.globalURL + "/api/groups")
      .then(response => (this.groupsAll = response.data.groups));

    axios
      .get("http://" + this.globalURL + "/api/subgroups")
      .then(response => (this.subgroupsAll = response.data.data));

    if (this.$route.params.id) {
      this.header = "Redaguoti darbuotoją";

      axios
        .get(
          "http://" + this.globalURL + "/api/employees/" + this.$route.params.id
        )
        .then(
          response => (
            (this.employee = response.data.employee),
            (this.workplace = response.data.employee.workplace),
            (this.division = response.data.employee.division),
            (this.subdivision = response.data.employee.subdivision),
            (this.region = response.data.employee.subdivision.regions[0]),
            (this.group = response.data.employee.subdivision.groups[0]),
            (this.subgroup = response.data.employee.subgroup),
            (this.selectedWorkplace = response.data.employee.workplace.id),
            (this.selectedDivision = response.data.employee.division.id),
            (this.selectedSubDivision = response.data.employee.subdivision.id),
            (this.selectedRegion =
              response.data.employee.subdivision.regions[0].id),
            (this.selectedGroup =
              response.data.employee.subdivision.groups[0].id),
            (this.selectedSubGroup = response.data.employee.subgroup.id)
          )
        );
    }
  },

  methods: {
    submitAdd() {
      if (this.selectedRegion != 0) {
        axios
          .post("http://" + this.globalURL + "/api/employees", {
            name: this.employee.name,
            lastname: this.employee.lastname,
            mobile_number: this.employee.mobile_number,
            work_number: this.employee.work_number,
            email: this.employee.email,
            gender: this.employee.gender,
            position: this.employee.position,
            workplace_id: this.selectedWorkplace,
            division_id: this.selectedDivision,
            subdivision_id: this.selectedSubDivision,
            region_id: this.selectedRegion,
            group_id: this.selectedGroup,
            subgroup_id: this.selectedSubGroup
          })
          .then(response => {
            this.$alert(response.data.message);
          })
          .catch(error => {
            this.$alert(error);
          });
      } else {
        axios
          .post("http://" + this.globalURL + "/api/employees", {
            name: this.employee.name,
            lastname: this.employee.lastname,
            mobile_number: this.employee.mobile_number,
            work_number: this.employee.work_number,
            email: this.employee.email,
            gender: this.employee.gender,
            position: this.employee.position,
            workplace_id: this.selectedWorkplace,
            division_id: this.selectedDivision,
            subdivision_id: this.selectedSubDivision,
            group_id: this.selectedGroup,
            subgroup_id: this.selectedSubGroup
          })
          .then(response => {
            this.$alert(response.data.message);
          })
          .catch(error => {
            this.$alert(error);
          });
      }
    },

    submitEdit() {},

    submitFile() {
      let formData = new FormData();
      formData.append("file", this.file);

      axios
        .post("http://" + this.globalURL + "/api/avatars", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(function() {
          console.log("SUCCESS!!");
        })
        .catch(function() {
          console.log("FAILURE!!");
        });
    },

    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    }
  }
};
</script>

<style lang="scss" scoped>
.form-container {
  display: flex;
  justify-content: center;

  .form {
    width: 80%;

    .header-employee {
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
      margin: 0 40px;
      width: 30%;
    }

    li {
      display: block;
      padding: 10px;
      border: 0.75px solid #969696;
      margin-bottom: 30px;
      border-radius: 7px;
    }

    .add-image {
      border: none;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-left: 30px;
      margin-bottom: 40px;
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
      height: 25px;
      line-height: 25px;
      font-size: 14px;
      padding: 0;
      font-family: "Open-Sans", sans-serif;
      background-color: #f4f4f4;
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
      justify-content: flex-end;
      align-items: center;
      border: none;
    }

    input[type="submit"]:hover,
    input[type="button"]:hover,
    button:hover {
      background-color: #0054a6;
      color: #f4f4f4;
    }
  }
}
</style>
