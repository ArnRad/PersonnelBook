<template>
  <div id="myModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>

      <div class="form-container">
        <form class="form" @submit.prevent="submitForm">
          <div class="header-division">{{ header }}</div>
          <div class="form-container">
            <ul>
              <li>
                <label for="name">Pavadinimas</label>
                <input
                  type="text"
                  name="name"
                  maxlength="40"
                  v-model="division.name"
                  required
                />
              </li>

              <li class="checkField" v-if="!this.id">
                <label for="workplace">Pasirinkite darbovietes</label>
                <div
                  v-for="workplaceOne in workplacesAll"
                  :key="workplaceOne.id"
                >
                  <input
                    type="checkbox"
                    name="workplace"
                    v-model="selectedWorkplace"
                    :value="workplaceOne._id"
                  />
                  <label for="workplace">
                    {{ workplaceOne.street }} {{ workplaceOne.number }},
                    {{ workplaceOne.city }}, {{ workplaceOne.country }} </label
                  >
                </div>
              </li>

              <li class="buttons">
                <input
                  v-show="!this.id"
                  type="submit"
                  value="Patvirtinti"
                />
                <input
                  v-show="this.id"
                  type="submit"
                  value="Redaguoti"
                />
                <button @click="$emit('close')">Atšaukti</button>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddEditDivision",

  data() {
    return {
      selectedWorkplace: [],
      header: "Pridėti naują padalinį",
      division: {},
      workplacesAll: {}
    };
  },

  props: {
    id: String
  },

  created() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("access_token");

    axios
      .get("http://" + this.globalURL + "/api/workplaces")
      .then(response => (this.workplacesAll = response.data.workplaces));

    if (this.id) {
      this.header = "Redaguoti padalinį";

      axios
        .get("http://" + this.globalURL + "/api/divisions/" + this.id)
        .then(response => {
          this.division = response.data;
          this.selectedWorkplace.push(response.data.workplaces._id)
        });
    }
  },

  methods: {
    submitForm() {
      if (!this.id) {
      axios
        .post("http://" + this.globalURL + "/api/divisions", {
          name: this.division.name,
          workplace_id: this.selectedWorkplace
        })
        .then(response => {
          this.$alert('Padalinys sėkmingai pridėtas!');
          this.$emit("update");
        })
        .catch(error => {
          this.$alert(error);
        });
      } else {
	      axios
          .patch("http://" + this.globalURL + "/api/divisions/" + this.id, {
            name: this.division.name
          })
          .then(response => {
            this.$alert('Padalinys atnaujintas!');
            this.$emit("update");
          })
          .catch(error => {
            this.$alert(error);
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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

    .form-container {
      display: flex;
      justify-content: center;
      align-items: center;

      .form {
        width: 80%;

        .header-division {
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
          margin: 0;
          width: 40%;
        }

        li {
          display: block;
          padding: 10px;
          border: 0.75px solid #969696;
          margin-bottom: 30px;
          border-radius: 7px;
        }

        li:last-child {
          border: none;
          margin-bottom: 50px;
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
          font-size: 10px;
          overflow: hidden;
          font-family: "Open-Sans", sans-serif;
          background-color: #ffffff;
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
          background-color: #ffffff;
        }

        input[type="submit"],
        input[type="button"],
        button {
          background: #f4f4f4;
          border: 1px solid #969696;
          padding: 7px 15px;
          margin: 0 10px;
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
          justify-content: center;
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
    }
  }
}
</style>
