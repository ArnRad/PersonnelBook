<template>
  <div class="test-container">
    <EmployeeView
      :worker="DisplayWorker"
      v-if="displayView"
      @close="toggleViewForm"
    />
    <div class="employee-view">
      <div class="filters-container">
        <Filters @filter-check="filterOn" @layout-check="layoutOn" :header="true"/>
        <div
          class="layout"
          v-bind:class="[isActiveLayout ? 'activeLayout' : 'inactiveLayout']"
        >
          <img
            @click="showGrid"
            class="layout-icon-grid"
            src="@/assets/grid-layout-icon.svg"
            v-bind:class="[isActiveGrid ? 'activeIcon' : 'inactiveIcon']"
          />
          <img
            @click="showRow"
            class="layout-icon-row"
            src="@/assets/row-layout-icon.svg"
            v-bind:class="[isActiveRow ? 'activeIcon' : 'inactiveIcon']"
          />
        </div>
      </div>
      <div class="items-container">
        <div class="items-count">Rasta įrašų: {{ employeeCount }}</div>
      </div>
      <div
        class="container-grid"
        v-bind:class="[isActiveGrid ? 'activeDisplay' : 'inactiveDisplay']"
      >
        <div class="employee-grid">
          <div v-for="employee in Employee" :key="employee.id">
            <EmployeeCardGrid @view="toggleViewForm" :employee="employee" />
          </div>
        </div>
      </div>
      <div
        class="container-row"
        v-bind:class="[isActiveRow ? 'activeDisplay' : 'inactiveDisplay']"
      >
        <div class="employee-row">
          <div v-for="employee in Employee" :key="employee.id">
            <EmployeeCardRow @view="toggleViewForm" :employee="employee" />
          </div>
        </div>
      </div>
    </div>
    <template v-if="this.pageCount">
      <Paginate
        :page-count="this.pageCount"
        :prev-text="'<'"
        :next-text="'>'"
        :page-class="'pagination-item'"
        :container-class="'pagination'"
        :click-handler="pagePaginationClick"
      >
      </Paginate>
    </template>
  </div>
</template>

<script>
import EmployeeCardGrid from "./tables/EmployeeCardGrid";
import EmployeeCardRow from "./tables/EmployeeCardRow";
import EmployeeView from "./modals/EmployeeView";
import Filters from "./Filters";
import Vue from "vue";
import axios from "axios";
import Paginate from "vuejs-paginate";

export default {
  name: "Employee",

  components: {
    EmployeeCardGrid,
    EmployeeCardRow,
    Paginate,
    Filters,
    EmployeeView
  },

  data() {
    return {
      Employee: {},
      employeeCount: "",
      pageCount: 0,
      isActiveGrid: true,
      isActiveRow: false,
      isActiveLayout: false,
      DisplayWorker: {},
      displayView: false,
      active: false,
      filterValue: ''
    };
  },

  created() {
    axios
      .get("http://" + this.globalURL + "/api/employees")
      .then(
        response => (
          this.Employee = response.data.employees,
          this.employeeCount = response.data.total,
          this.pageCount = response.data.last_page
        )
      );
  },

  methods: {
    showGrid() {
      this.isActiveGrid = true;
      this.isActiveRow = false;
    },

    showRow() {
      this.isActiveGrid = false;
      this.isActiveRow = true;
    },

    pagePaginationClick(pageNum) {
      if (this.filterValue) {
        let groups = []
        for(let i = 0; i < this.filterValue.employeesAll.length; i += this.filterValue.per_page)
        {
            groups.push(this.filterValue.employeesAll.slice(i, i + this.filterValue.per_page));
        }
        this.Employee = groups[pageNum - 1]
      } else {
        axios
          .get("http://" + this.globalURL + "/api/employees?page=" + pageNum)
          .then(response => (this.Employee = response.data.employees));
      }
    },

    toggleViewForm(value) {
      this.displayView = !this.displayView;
      if (value) {
        for (let i = 0; i < this.Employee.length; i++) {
          if (this.Employee[i]._id == value) {
            this.DisplayWorker = this.Employee[i];
          }
        }
      }
    },

    filterOn(value) {
      if (value.divisions || value.search || value.per_page) {
        this.filterValue = value;
        this.Employee = value.employees;
        this.employeeCount = value.total;
        this.pageCount = value.last_page;
      } else {
        this.filterValue = '';
        this.Employee = [];
        this.employeeCount = 0;
        this.pageCount = 1;
      }
    },

    layoutOn(value) {
      this.isActiveLayout = value;
    }
  }
};
</script>

<style lang="scss">
$desktopSmall-width: 1024px;
$desktopMid-width: 1750px;

@mixin mobile {
  @media (max-width: #{$desktopSmall-width - 1px}) {
    @content;
  }
}

@mixin desktopSmall {
  @media (min-width: #{$desktopSmall-width}) and (max-width: #{$desktopMid-width - 1px}) {
    @content;
  }
}

.test-container {
  .employee-view {
    .filters-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin-top: 20px;
      position: relative;

      .activeLayout {
        display: flex !important;
      }

      .inactiveLayout {
        display: flex !important;
        @include mobile {
          display: none !important;
        }
      }

      .layout {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 5%;
        margin-bottom: 20px;

        @include mobile {
          margin-bottom: 0px;
          width: 10%;
          position: absolute;
          bottom: 0;
        }

        img {
          cursor: pointer;
          margin: 0 5px;
          width: 20px;
          height: 20px;
        }
      }
    }

    .items-container {
      margin-top: 10px;
      display: flex;
      justify-content: center;
      align-items: center;

      .items-count {
        border: 1px solid #00264c;
        box-sizing: border-box;
        border-radius: 10px;
        height: 47px;
        width: 79%;
        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 16px;
      }
    }

    .container-grid {
      margin-top: 30px;
      display: flex;
      justify-content: center;
      align-items: center;

      .employee-grid {
        width: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
      }
    }

    .container-row {
      display: flex;
      justify-content: center;
      align-items: center;

      .employee-row {
        width: 80%;
      }
    }

    .activeDisplay {
      display: flex;
    }
    .inactiveDisplay {
      display: none;
    }
  }

  .pagination {
    display: flex;
    flex-direction: row;
    justify-content: center;
    list-style: none;

    padding-top: 30px;
    padding-bottom: 60px;

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

  .inactiveIcon {
    filter: invert(25%) sepia(10%) saturate(0%) hue-rotate(170deg)
      brightness(90%) contrast(82%);
  }
}
</style>
