<template>
  <div class="container-employee">
    <div class="employee-card" @click="$emit('view', employee._id)">
      <div class="employee-data">
        <div class="employee-avatar">
          <!--<img :src="employee.avatar" />-->
          <img
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y"
          />
        </div>
        <div class="name-container">
          <div class="employee-name">
            <p>{{ employee.name }}</p>
            <p>{{ employee.lastname }}</p>
          </div>
        </div>
        <div class="position-container">
          <div class="employee-position">
            <p>{{ employee.position }}</p>
          </div>
        </div>
      </div>
      <div class="employee-contacts">
        <div class="contact home-phone-number">
          <p>Trumpasis nr.</p>
          <p>{{ employee.mobile_number }}</p>
        </div>
        <div class="contact work-phone-number">
          <p>Darbo mob. nr.</p>
          <p>{{ employee.work_number }}</p>
        </div>
        <div class="contact email">
          <p>El. paštas</p>
          <p>{{ employee.email }}</p>
        </div>
        <div class="contact address">
          <p>Adresas</p>
          <p>Kaunas</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EmployeeCardGrid",

  props: {
    employee: Object
  }
};
</script>

<style lang="scss" scoped>
.container-employee {
  .employee-card {
    background: #ffffff;
    box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.1);
    border-radius: 7px;
    margin: 10px 10px;
    min-width: 320px;
    height: 417px;

    .employee-data {
      text-align: center;
      color: #ffffff;

      .employee-avatar {
        height: 160px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 128px;
          height: 128px;
          border-radius: 50%;
          -webkit-box-shadow: 4px 4px 5px 0px rgba(0, 0, 0, 0.75);
          -moz-box-shadow: 4px 4px 5px 0px rgba(0, 0, 0, 0.75);
          box-shadow: 4px 4px 5px 0px rgba(0, 0, 0, 0.75);
        }
      }

      .name-container {
        display: flex;
        justify-content: center;
        align-items: center;

        .employee-name {
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgb(186,44,39);
          background: linear-gradient(90deg, rgba(186,44,39,1) 0%, rgba(97,14,128,1) 100%);
          border-radius: 7px 7px 7px 7px;
          font-size: 18px;
          font-family: "Oswald", sans-serif;
          text-transform: uppercase;
          height: 40px;
          width: 60%;

          p:last-of-type {
            margin-left: 5px;
          }
        }
      }

      .position-container {
        margin-top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;

        .employee-position {
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgb(186,44,39);
          background: linear-gradient(90deg, rgba(186,44,39,1) 0%, rgba(97,14,128,1) 100%);
          border-radius: 7px 7px 7px 7px;
          font-size: 16px;
          font-family: "Oswald", sans-serif;
          padding: 10px;
          text-transform: uppercase;
          height: 50px;
          max-width: 250px;
          min-width: 250px;
        }
      }
    }

    .employee-contacts {
      padding: 0 35px;
      font-size: 11px;
      margin-top: 20px;

      .contact {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: linear-gradient(90deg, #ffffff 0%, #e5e5e5 75.83%);
        height: 28px;
        border-radius: 7px;
        padding: 0 5px;
        margin-bottom: 5px;
      }

      .contact:last-of-type {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
