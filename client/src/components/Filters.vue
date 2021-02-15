<template>
  <div class="filters">
    <div class="form">
      <ul class="filters-con">
        <li>
          <label for="workplace">Adresas</label>
          <select
            name="workplace"
            v-model="selectedWorkplace"
            @change="loadDivisions()"
          >
            <option value="" selected disabled hidden>Visi</option>
            <template v-for="workplaceOne in workplacesAll">
              <option :key="workplaceOne.id" :value="workplaceOne.id">
                {{ workplaceOne.street }}
              </option>
            </template>
          </select>
        </li>
        <li>
          <label for="division">Padalinys</label>
          <select
            name="division"
            v-model="selectedDivision"
            @change="loadSubDivisions()"
          >
            <option value="" selected disabled hidden>Visi</option>
            <template v-for="divisionOne in divisionsAll">
              <option :key="divisionOne.id" :value="divisionOne.id">
                {{ divisionOne.name }}
              </option>
            </template>
          </select>
        </li>
        <li>
          <label for="subdivision">Skyrius</label>
          <select
            name="subdivision"
            v-model="selectedSubDivision"
            @change="loadRegionsGroups()"
          >
            <option value="" selected disabled hidden>Visi</option>
            <template v-for="subdivisionOne in subdivisionsAll">
              <option :key="subdivisionOne.id" :value="subdivisionOne.id">
                {{ subdivisionOne.name }}
              </option>
            </template>
          </select>
        </li>
        <li>
          <label for="region">Regionas</label>
          <select name="region" v-model="selectedRegion">
            <option value="" selected disabled hidden>Visi</option>
            <template v-for="regionOne in regionAll">
              <option :key="regionOne.id" :value="regionOne.id">
                {{ regionOne.name }}
              </option>
            </template>
          </select>
        </li>
        <li>
          <label for="group">Grupė</label>
          <select
            name="group"
            v-model="selectedGroup"
            @change="loadSubGroups()"
          >
            <option value="" selected disabled hidden>Visi</option>
            <template v-for="groupOne in groupsAll">
              <option :key="groupOne.id" :value="groupOne.id">
                {{ groupOne.name }}
              </option>
            </template>
          </select>
        </li>
        <li>
          <label for="subgroup">Pogrūpis</label>
          <select name="subgroup" v-model="selectedSubGroup">
            <option value="" selected disabled hidden>Visi</option>
            <template v-for="subgroupOne in subgroupsAll">
              <option :key="subgroupOne.id" :value="subgroupOne.id">
                {{ subgroupOne.name }}
              </option>
            </template>
          </select>
        </li>
        <li>
          <label for="filter-count">Filtruoti po</label>
          <select
            name="filter-count"
            v-model="selectedFilterCount"
            @change="loadCount()"
          >
            <option value="" selected disabled hidden>8</option>
            <option :value="8">8</option>
            <option :value="16">16</option>
            <option :value="24">24</option>
          </select>
        </li>

        <li>
          <label for="search">Paieška</label>
          <div class="search-input-field">
            <input
              @change.prevent="search"
              v-model="searchInput"
              type="text"
              name="search"
              required
            />
          </div>
        </li>
      </ul>
      <div class="slide-container">
        <div class="slide">
          <div class="button-container" @click="toggleFilters()">
            <div class="button">Filtrai</div>
          </div>
          <slide-up-down :active="active">
            <div class="slide-filters-container">
              <ul class="slide-filters">
                <li>
                  <label for="workplace">Adresas</label>
                  <select
                    name="workplace"
                    v-model="selectedWorkplace"
                    @change="loadDivisions()"
                  >
                    <option value="" selected disabled hidden>Visi</option>
                    <template v-for="workplaceOne in workplacesAll">
                      <option :key="workplaceOne.id" :value="workplaceOne.id">
                        {{ workplaceOne.street }}
                      </option>
                    </template>
                  </select>
                </li>
                <li>
                  <label for="division">Padalinys</label>
                  <select
                    name="division"
                    v-model="selectedDivision"
                    @change="loadSubDivisions()"
                  >
                    <option value="" selected disabled hidden>Visi</option>
                    <template v-for="divisionOne in divisionsAll">
                      <option :key="divisionOne.id" :value="divisionOne.id">
                        {{ divisionOne.name }}
                      </option>
                    </template>
                  </select>
                </li>
                <li>
                  <label for="subdivision">Skyrius</label>
                  <select
                    name="subdivision"
                    v-model="selectedSubDivision"
                    @change="loadRegionsGroups()"
                  >
                    <option value="" selected disabled hidden>Visi</option>
                    <template v-for="subdivisionOne in subdivisionsAll">
                      <option
                        :key="subdivisionOne.id"
                        :value="subdivisionOne.id"
                      >
                        {{ subdivisionOne.name }}
                      </option>
                    </template>
                  </select>
                </li>
                <li>
                  <label for="region">Regionas</label>
                  <select name="region" v-model="selectedRegion">
                    <option value="" selected disabled hidden>Visi</option>
                    <template v-for="regionOne in regionAll">
                      <option :key="regionOne.id" :value="regionOne.id">
                        {{ regionOne.name }}
                      </option>
                    </template>
                  </select>
                </li>
                <li>
                  <label for="group">Grupė</label>
                  <select
                    name="group"
                    v-model="selectedGroup"
                    @change="loadSubGroups()"
                  >
                    <option value="" selected disabled hidden>Visi</option>
                    <template v-for="groupOne in groupsAll">
                      <option :key="groupOne.id" :value="groupOne.id">
                        {{ groupOne.name }}
                      </option>
                    </template>
                  </select>
                </li>
                <li>
                  <label for="subgroup">Pogrūpis</label>
                  <select name="subgroup" v-model="selectedSubGroup">
                    <option value="" selected disabled hidden>Visi</option>
                    <template v-for="subgroupOne in subgroupsAll">
                      <option :key="subgroupOne.id" :value="subgroupOne.id">
                        {{ subgroupOne.name }}
                      </option>
                    </template>
                  </select>
                </li>
                <li>
                  <label for="filter-count">Filtruoti po</label>
                  <select
                    name="filter-count"
                    v-model="selectedFilterCount"
                    @change="loadCount()"
                  >
                    <option value="" selected disabled hidden>8</option>
                    <option :value="8">8</option>
                    <option :value="16">16</option>
                    <option :value="24">24</option>
                  </select>
                </li>

                <li>
                  <label for="search">Paieška</label>
                  <div class="search-input-field">
                    <input
                      @change.prevent="search"
                      v-model="searchInput"
                      type="text"
                      name="search"
                      required
                    />
                  </div>
                </li>
              </ul>
            </div>
          </slide-up-down>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import SlideUpDown from "vue-slide-up-down";

Vue.component("slide-up-down", SlideUpDown);

export default {
  name: "Filters",

  data() {
    return {
      Employee: {},
      selectedWorkplace: "",
      selectedDivision: "",
      selectedSubDivision: "",
      selectedRegion: "",
      selectedGroup: "",
      selectedSubGroup: "",
      selectedFilterCount: "",
      searchInput: [],
      workplacesAll: {},
      divisionsAll: {},
      subdivisionsAll: {},
      regionAll: {},
      groupsAll: {},
      subgroupsAll: {},
      active: false
    };
  },

  created() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("access_token");

    axios
      .get("http://" + this.globalURL + "/api/employees")
      .then(response => (this.workplacesAll = response.data.data.workplaces));
  },

  methods: {
    toggleFilters() {
      this.active = !this.active;
      this.$emit("layout-check", this.active);
    },

    loadDivisions() {
      axios
        .get(
          "http://" +
            this.globalURL +
            "/api/employees?workplace=" +
            this.selectedWorkplace
        )
        .then(
          response => (
            (this.divisionsAll = response.data.data.divisions),
            this.$emit("filter-check", response.data.employees)
          )
        );
    },

    loadSubDivisions() {
      axios
        .get(
          "http://" +
            this.globalURL +
            "/api/employees?workplace=" +
            this.selectedWorkplace +
            "&division=" +
            this.selectedDivision
        )
        .then(
          response => (
            (this.subdivisionsAll = response.data.data.subdivisions),
            this.$emit("filter-check", response.data.employees)
          )
        );
    },

    loadRegionsGroups() {
      axios
        .get(
          "http://" +
            this.globalURL +
            "/api/employees?workplace=" +
            this.selectedWorkplace +
            "&division=" +
            this.selectedDivision +
            "&subdivision=" +
            this.selectedSubDivision
        )
        .then(
          response => (
            (this.regionAll = response.data.data.regions),
            (this.groupsAll = response.data.data.groups),
            this.$emit("filter-check", response.data.employees)
          )
        );
    },

    loadSubGroups() {
      axios
        .get(
          "http://" +
            this.globalURL +
            "/api/employees?workplace=" +
            this.selectedWorkplace +
            "&division=" +
            this.selectedDivision +
            "&subdivision=" +
            this.selectedSubDivision +
            "&region=" +
            this.selectedRegion +
            "&group=" +
            this.selectedGroup
        )
        .then(
          response => (
            (this.subgroupsAll = response.data.data.subgroups),
            this.$emit("filter-check", response.data.employees)
          )
        );
    },

    loadCount() {
      axios
        .get(
          "http://" +
            this.globalURL +
            "/api/employees?workplace=" +
            this.selectedWorkplace +
            "&division=" +
            this.selectedDivision +
            "&subdivision=" +
            this.selectedSubDivision +
            "&region=" +
            this.selectedRegion +
            "&group=" +
            this.selectedGroup +
            "&subgroup=" +
            this.selectedSubGroup +
            "&limit=" +
            this.selectedFilterCount
        )
        .then(response => this.$emit("filter-check", response.data));
    },

    search() {
      axios
        .get(
          "http://" +
            this.globalURL +
            "/api/employees?search=" +
            this.searchInput
        )
        .then(response => this.$emit("filter-check", response.data.employees));
    }
  }
};
</script>

<style lang="scss" scoped>
$mobile-width: 500px;
$tablet-width: 768px;
$desktopSmall-width: 1024px;
$desktopMid-width: 1750px;

@mixin mobile {
  @media (max-width: #{$desktopSmall-width - 1px}) {
    @content;
  }
}

@mixin tablet {
  @media (min-width: #{$tablet-width}) and (max-width: #{$desktopSmall-width - 1px}) {
    @content;
  }
}

@mixin desktopSmall {
  @media (min-width: #{$desktopSmall-width}) and (max-width: #{$desktopMid-width - 1px}) {
    @content;
  }
}

@mixin desktopMid {
  @media (min-width: #{$desktopMid-width}) {
    @content;
  }
}

.filters {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 75%;
  @include mobile {
    width: 88%;
  }

  .form {
    width: 100%;
    ul {
      list-style: none;
      padding: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 15px;
    }
    li {
      display: block;
      padding: 10px;
      border: 1px solid #969696;
      margin-bottom: 30px;
      width: 150px;
      border-radius: 7px;

      @include desktopSmall {
        width: 115px;
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
      font-size: 12px;
      padding: 0;
      font-family: "Open-Sans", sans-serif;
      background-color: #f4f4f4;
      color: #818198;
      cursor: pointer;
    }

    .filters-con {
      @include mobile {
        display: none;
      }
      .filter-row {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }

      .filter-row:last-child {
        margin-left: 10px;
      }
    }
  }

  .slide-container {
    .slide {
      display: none;
      @include mobile {
        display: block;
        text-align: center;
      }

      .button-container {
        margin-top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        .button {
          border: 1px solid #00264c;
          box-sizing: border-box;
          border-radius: 10px;
          height: 47px;
          width: 90%;
          display: flex;
          justify-content: center;
          align-items: center;

          font-size: 16px;
        }
      }

      .slide-filters-container {
        display: flex;
        justify-content: center;
        align-items: center;
        .slide-filters {
          display: block;

          li {
            width: 300px;
          }
        }
      }
    }
  }
}
</style>
