<template>
  <div class="container-employee">
    <div class="employee-card" @click="$emit('view', employee._id)">
      <div class="employee-data">
        <div class="employee-avatar">
          <img 
            height="80" width="80"
            v-if="employee.avatar"
            :src="require(`../../../../server/uploads/images/${employee.avatar}`)"
          />
          <img
            height="80" width="80"
            v-else
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y"
          />
        </div>
        <div class="name-container">
          <div class="employee-name">
            <p>{{ employee.name }}</p>
            <p>{{ employee.lastname }}</p>
          </div>
          <div class="employee-position">
            <p>{{ employee.position }}</p>
          </div>
        </div>
      </div>
      <div class="employee-contacts">
        <div class="contact-col-1">
          <div class="contact home-phone-number">
            <p>Trumpasis nr:</p>
            <p>{{ employee.mobile_number }}</p>
          </div>
          <div class="contact work-phone-number">
            <p>Darbo mob. nr:</p>
            <p>{{ employee.work_number }}</p>
          </div>
        </div>
        <div class="contact-col-2">
          <div class="contact email">
            <p>El. paštas:</p>
            <p>{{ employee.email }}</p>
          </div>
          <div class="contact address">
            <p>Adresas:</p>
            <p>Kaunas</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EmployeeCardRow",

  props: {
    employee: Object
  }
};
</script>

<style lang="scss" scoped>
$desktopSmall-width: 1024px;

@mixin mobile {
  @media (max-width: #{$desktopSmall-width - 1px}) {
    @content;
  }
}

.employee-card {
  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(90deg, #ffffff 28.14%, #e5e5e5 66.45%);
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.1);
  border-radius: 7px;

  height: 76px;
  margin: 30px 0px;
  width: 100%;
  min-width: 300px;

  .employee-data {
    width: 40%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .employee-avatar img {
      box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
      border-radius: 7px;
      @include mobile {
        display: none;
      }
    }

    .name-container {
      background: rgb(186,44,39);
      background: linear-gradient(90deg, rgba(186,44,39,1) 0%, rgba(97,14,128,1) 100%);
      border-radius: 0px 7px 7px 0px;
      width: 80%;
      height: 70px;
      color: #ffffff;

      @include mobile {
        width: 100%;
        border-radius: 7px 7px 7px 7px;
      }

      .employee-name {
        display: flex;
        justify-content: center;
        align-items: center;

        margin-top: 7px;
        text-transform: uppercase;
        font-size: 22px;
        font-family: "Oswald", sans-serif;
        @include mobile {
          font-size: 16px;
        }

        p:last-of-type {
          margin-left: 5px;
        }
      }

      .employee-position {
        margin: 5px 0;
        display: flex;
        justify-content: center;

        p {
          text-align: center;
        }

        font-family: "Oswald", sans-serif;
        font-size: 14px;
        @include mobile {
          font-size: 10px;
        }
        text-transform: uppercase;
      }
    }
  }

  .employee-contacts {
    width: 60%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .contact {
      color: #333333;
      display: flex;
      margin: 10px 40px;
      @include mobile {
        font-size: 10px;
      }
    }

    .contact-col-2 {
      @include mobile {
        display: none;
      }
    }

    .contact p:first-of-type {
      font-weight: 700;
      margin-right: 5px;
      @include mobile {
        font-size: 10px;
        margin: 0;
      }
    }
  }
}
</style>
