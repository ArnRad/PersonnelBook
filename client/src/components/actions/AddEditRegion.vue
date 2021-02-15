<template>
  <div id="myModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>

      <div class="form-container">
        <form class="form">
          <div class="header-region">{{ header }}</div>
          <div class="form-container">
            <ul>
              <li>
                <label for="name">Pavadinimas</label>
                <input
                  type="text"
                  name="name"
                  maxlength="20"
                  v-model="region.name"
                  required
                />
              </li>

              <li>
                <label for="subdivision">Pasirinkite skyrių</label>
                <select name="subdivision" v-model="selectedSubDivision">
                  <template v-for="subdivisionOne in subdivisionsAll">
                    <option :key="subdivisionOne.id" :value="subdivisionOne.id">
                      {{ subdivisionOne.name }}
                    </option>
                  </template>
                </select>
              </li>

              <li class="buttons">
                <input
                  v-show="!this.id"
                  type="submit"
                  @click.prevent="submitAdd"
                  value="Patvirtinti"
                />
                <input
                  v-show="this.id"
                  type="submit"
                  @click.prevent="submitEdit(region.id)"
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
      selectedSubDivision: 0,
      subdivisionsAll: {},
      header: "Pridėti naują regioną",
      region: {},
      workplacesAll: {}
    };
  },

  props: {
    id: Number
  },

  created() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("access_token");

    axios
      .get("http://" + this.globalURL + "/api/subdivisions")
      .then(
        response => (this.subdivisionsAll = response.data.subdivision.data)
      );

    if (this.id) {
      this.header = "Redaguoti regioną";

      axios
        .get("http://" + this.globalURL + "/api/regions/" + this.id)
        .then(response => {
          this.region = response.data.regions;
          this.selectedSubDivision = response.data.regions.subdivision_id;
        });
    }
  },

  methods: {
    submitAdd() {
      axios
        .post("http://" + this.globalURL + "/api/regions", {
          name: this.region.name,
          subdivision_id: this.selectedSubDivision
        })
        .then(response => {
          this.$alert(response.data.message);
          this.$emit("update");
        })
        .catch(error => {
          this.$alert(error);
        });
    },

    submitEdit(id) {
      axios
        .put("http://" + this.globalURL + "/api/regions/" + id, {
          name: this.region.name,
          subdivision_id: this.selectedSubDivision
        })
        .then(response => {
          this.$alert(response.data.message);
          this.$emit("update");
        })
        .catch(error => {
          this.$alert(error);
        });
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

        .header-region {
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
          width: 30%;
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
          justify-content: center;
          align-items: center;
        }

        input[type="submit"]:hover,
        input[type="button"]:hover,
        button:hover {
          background-color: #0054a6;
          color: #f4f4f4;
        }
      }
    }
  }
}
</style>
