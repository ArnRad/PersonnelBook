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
                  v-if="subdivisionOne.division_id[0] == selectedDivision._id"
                  :key="subdivisionOne._id"
                  :value="subdivisionOne"
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
                  :key="subgroupOne._id"
                  v-if="subgroupOne.group_id == selectedGroup._id"
                  :value="subgroupOne"
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
              maxlength="30"
              v-model="employee.email"
            />
          </li>

          <li>
            <label for="workplace">Darbovietė</label>
            <select name="workplace" v-model="selectedWorkplace" required>
              <option
                v-for="workplaceOne in workplacesAll"
                :key="workplaceOne._id"
                :value="workplaceOne"
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
                  :key="regionOne._id"
                  v-if="regionOne.subdivision_id == selectedSubDivision._id"
                  :value="regionOne"
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
              <template v-for="divisionOne in divisionsAll">
                <option
                  :key="divisionOne._id"
                  :value="divisionOne"
                  v-if="divisionOne.workplace_id[0] == selectedWorkplace._id"
                >
                  {{ divisionOne.name }}
                </option>
              </template>
            </select>
          </li>
          <li>
            <label for="group">Grupė</label>
            <select name="group" v-model="selectedGroup" required>
              <template v-for="groupOne in groupsAll">
                <option
                  :key="groupOne._id"
                  v-if="groupOne.region_id == selectedRegion._id"
                  :value="groupOne"
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

      selectedWorkplace: [],
      selectedDivision: [],
      selectedSubDivision: [],
      selectedRegion: [],
      selectedGroup: [],
      selectedSubGroup: [],
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
      .then(response => (this.workplacesAll = response.data.workplaces));

    axios.get("http://" + this.globalURL + "/api/divisions").then(response => {
      this.divisionsAll = response.data.divisions;
    });

    axios
      .get("http://" + this.globalURL + "/api/subdivisions")
      .then(
        response => (this.subdivisionsAll = response.data.subdivision)
      );

    axios
      .get("http://" + this.globalURL + "/api/regions")
      .then(response => (this.regionsAll = response.data.region));

    axios
      .get("http://" + this.globalURL + "/api/groups")
      .then(response => (this.groupsAll = response.data.group));

    axios
      .get("http://" + this.globalURL + "/api/subgroups")
      .then(response => (this.subgroupsAll = response.data.subgroup));

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
      axios
        .post("http://" + this.globalURL + "/api/employees", {
          name: this.employee.name,
          lastname: this.employee.lastname,
          mobile_number: this.employee.mobile_number,
          work_number: this.employee.work_number,
          email: this.employee.email,
          gender: this.employee.gender,
          position: this.employee.position,
          workplace: this.selectedWorkplace,
          division: this.selectedDivision,
          subdivision: this.selectedSubDivision,
          region: this.selectedRegion,
          group: this.selectedGroup,
          subgroup: this.selectedSubGroup
        })
        .then(response => {
          this.$alert('Darbuotojas sėkmingai pridėtas!');
        })
        .catch(error => {
          this.$alert(error);
        });
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
