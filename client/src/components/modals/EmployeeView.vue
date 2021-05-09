<template>
  <div id="myModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <div class="modal-container">
        <div class="row employee-info">
          <div class="employee-avatar">
            <img v-if="worker.avatar" :src="require(`../../../../server/uploads/images/${worker.avatar}`)" />
            <img
              v-else
              src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y"
            />
          </div>
          <div class="name-container">
            <div class="employee-name">
              <p>{{ worker.name }}</p>
              <p>{{ worker.lastname }}</p>
            </div>
          </div>
          <div class="position-container">
            <div class="employee-position">
              <p>{{ worker.position }}</p>
            </div>
          </div>
        </div>
        <div class="row workplace-info">
          <div class="workplace-header-container">
            <div class="workplace-header">Darbovietė</div>
          </div>
          <div v-if="worker.workplace_id" class="contact address">
            <p>Adresas</p>
            <p>
              {{ worker.workplace_id.street }}, {{ worker.workplace_id.number }},
              {{ worker.workplace_id.city }}, {{ worker.workplace_id.country }}
            </p>
          </div>
          <div v-if="worker.division_id" class="contact division">
            <p>Padalinys</p>
            <p>{{ worker.division_id.name }}</p>
          </div>
          <div v-if="worker.subdivision_id" class="contact subdivision">
            <p>Skyrius</p>
            <p>
              {{ worker.subdivision_id.name }}
            </p>
          </div>
          <div v-if="worker.region_id" class="contact region">
            <p>Regionas</p>
            <p>
              {{ worker.region_id.name }}
            </p>
          </div>
          <div v-if="worker.group_id" class="contact group">
            <p>Grupė</p>
            <p>
              {{ worker.group_id.name }}
            </p>
          </div>
          <div v-if="worker.subgroup_id" class="contact subgroup">
            <p>Pogrūpis</p>
            <p>
              {{ worker.subgroup_id.name }}
            </p>
          </div>
        </div>
        <div class="row contact-info">
          <div class="contact-header-container">
            <div class="contact-header">Kontaktai</div>
          </div>
          <div class="contact mobile-phone">
            <p>Trumpasis nr.</p>
            <p>
              {{ worker.mobile_number }}
            </p>
          </div>
          <div class="contact work-phone">
            <p>Darbo mob. nr.</p>
            <p>
              {{ worker.work_number }}
            </p>
          </div>
          <div class="contact email">
            <p>El.paštas</p>
            <p>
              {{ worker.email }}
            </p>
          </div>
          <div class="contact email-button">
            <div class="buttons">
              <button id="emailButton" class="login-button">
                <a :href="`mailto:${worker.email}`">Send Email</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmployeeView",

  props: {
    display: Boolean,
    worker: Object
  },

  computed: {
    worker1() {
      return this.worker;
    }
  }
};
</script>

<style lang="scss" scoped>
$desktopSmall-width: 1024px;

@mixin mobile {
  @media (max-width: #{$desktopSmall-width - 1px}) {
    @content
  }
}

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);

  .modal-content {
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */

    .close {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }

    .close:hover,
    .close:focus {
      color: black;
      text-decoration: none;
      cursor: pointer;
    }

    .modal-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;

      @include mobile {
        display: block;
      }

      .row {
        width: 30%;
        height: 450px;
        text-align: center;

        @include mobile {
          width: 100%;
          height: 290px;
        }
      }

      .row:first-of-type {
        @include mobile {
          height: 400px;
        }
      }
      .employee-info {
        .employee-avatar {
          img {
            object-fit: cover;
            height: 250px;
            width: 262px;
            border-radius: 50%;
            -webkit-box-shadow: 4px 4px 5px 0px rgba(0, 0, 0, 0.75);
            -moz-box-shadow: 4px 4px 5px 0px rgba(0, 0, 0, 0.75);
            box-shadow: 4px 4px 5px 0px rgba(0, 0, 0, 0.75);

            @include mobile {
              height: 150px;
              width: 150px;
            }
          }
        }

        .name-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 40px;
          .employee-name {
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgb(186,44,39);
            background: linear-gradient(90deg, rgba(186,44,39,1) 0%, rgba(97,14,128,1) 100%);
            border-radius: 7px 7px 7px 7px;
            font-size: 22px;
            color: #ffffff;
            font-family: "Oswald", sans-serif;
            text-transform: uppercase;
            height: 45px;
            width: 80%;

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
          margin-top: 20px;

          .employee-position {
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgb(186,44,39);
            background: linear-gradient(90deg, rgba(186,44,39,1) 0%, rgba(97,14,128,1) 100%);
            border-radius: 7px 7px 7px 7px;
            font-size: 22px;
            color: #ffffff;
            font-family: "Oswald", sans-serif;
            text-transform: uppercase;
            height: 60px;
            padding: 10px;
            width: 80%;

            @include mobile {
              height: 100px;
            }
          }
        }
      }

      .workplace-info {
        .workplace-header-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 200px;
          @include mobile {
            height: 120px;
          }

          .workplace-header {
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgb(186,44,39);
            background: linear-gradient(90deg, rgba(186,44,39,1) 0%, rgba(97,14,128,1) 100%);
            border-radius: 7px 7px 7px 7px;
            font-size: 22px;
            color: #ffffff;
            font-family: "Oswald", sans-serif;
            text-transform: uppercase;
            height: 45px;
            width: 80%;
          }
        }
      }

      .contact-info {
        .contact-header-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 200px;
          @include mobile {
            height: 120px;
          }

          .contact-header {
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgb(186,44,39);
            background: linear-gradient(90deg, rgba(186,44,39,1) 0%, rgba(97,14,128,1) 100%);
            border-radius: 7px 7px 7px 7px;
            font-size: 22px;
            color: #ffffff;
            font-family: "Oswald", sans-serif;
            text-transform: uppercase;
            height: 45px;
            width: 80%;
          }
        }
      }
    }
  }
}

.contact {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, #ffffff 0%, #e5e5e5 75.83%);
  height: 28px;
  border-radius: 7px;
  padding: 0 5px;
  margin-bottom: 10px;
  @include mobile {
    font-size: 12px;
  }
}

.email-button {
  justify-content: center;
  background: none;
  margin-top: 30px;
}

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

.contact:last-of-type {
  margin-bottom: 10px;
}

.activeDisplay {
  display: block;
}
.inactiveDisplay {
  display: none;
}
</style>
