<template>
  <div class="notFound-container">
    <div class="notFound">
      <h1>404</h1>
      <h3>Keturi nulis keturi</h3>
      <h4>
        Puslapis nerastas.
      </h4>
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
  }
}
</style>
