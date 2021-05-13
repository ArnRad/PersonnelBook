<template>
  <div class="notFound-container">
    <div class="notFound">
      <h1>404</h1>
      <h3>Keturi nulis keturi</h3>
      <h4>
        Puslapis nerastas.
      </h4>
      <div class="back-to-home">
        <router-link to="/">
          <button id="logButton" type="submit">Į pagrindinį puslapį</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageNotFound"
};
</script>

<style lang="scss" scoped>
.notFound-container {
  display: flex;
  justify-content: center;
  align-items: center;
  .notFound {
    text-align: center;
    margin-top: 60px;

    h1 {
      font-size: 78px;
    }

    h4 {
      margin-top: 20px;
    }

    .back-to-home {
      margin-top: 30px;
      input[type="submit"],
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
    }
  }
}
</style>
