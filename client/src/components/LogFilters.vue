<template>
  <div class="filters">
    <form class="form">
      <ul>
        <li>
          <label for="user">Vartotojas</label>
          <select name="user">
            <option value="Name">Admin</option>
            <option value="Vilnius">Vilnius</option>
          </select>
        </li>
        <li>
          <label for="count">Filtruoti po</label>
          <select name="count">
            <option value="Kaunas">Kaunas</option>
            <option value="Vilnius">Vilnius</option>
          </select>
        </li>
        <li>
          <label for="logs">Veiksmai</label>
          <select name="logs">
            <option value="Kaunas">Kaunas</option>
            <option value="Vilnius">Vilnius</option>
          </select>
        </li>
      </ul>
    </form>
  </div>
</template>

<script>
export default {
  name: "LogFilters",
};
</script>

<style lang="scss" scoped>
.filters {
  display: flex;
  justify-content: space-between;
  width: 30%;
  .form {
    width: 100%;
    ul {
      list-style: none;
      padding: 0;
      display: flex;
      justify-content: space-around;
      margin-top: 15px;
    }
    li {
      display: block;
      padding: 10px;
      border: 1px solid #969696;
      margin-bottom: 30px;
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
      line-height: 20px;
      font-size: 12px;
      padding: 0;
      font-family: "Open-Sans", sans-serif;
      background-color: #f4f4f4;
      color: #818198;
      cursor: pointer;
    }
  }
}
</style>