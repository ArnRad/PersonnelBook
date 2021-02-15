<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header";
import Vue from "vue";

export default {
  name: "App",

  components: {
    Header
  }
};

Vue.mixin({
  data: function() {
    return {
      get globalURL() {
        return "localhost:5000";
      }
    };
  }
});
</script>

<style>
@import url("//fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;lang=en");
@import url("//fonts.googleapis.com/css?family=Oswald:300,400,600,700&amp;lang=en");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #f4f4f4;
  font-family: "Open Sans", sans-serif;
}
</style>
