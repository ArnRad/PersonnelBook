<template>
  <div class="nav-item" @click="isOpen = !isOpen">
    {{ title }}
    <img src="../assets/dropdown-arrow.png" />
    <transition name="fade" appear>
      <div class="sub-menu" v-if="isOpen">
        <div v-for="(item, i) in items" :key="i" class="nav-item">
          <router-link :to="item.link" class="nav-item-text">
            {{ item.title }}
          </router-link>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Dropdown",

  props: ["title", "items"],

  data() {
    return {
      isOpen: false
    };
  },

  created() {
    this.isOpen = false;
  }
};
</script>

<style lang="scss" scoped>
.nav-item {
  cursor: pointer;
  img {
    width: 12px;
    height: 10px;
  }
  .sub-menu {
    position: absolute;
    z-index: 999;
    background: rgb(186,44,39);
    background: linear-gradient(90deg, rgba(186,44,39,1) 0%, rgba(97,14,128,1) 100%);
    width: 7%;
    padding: 20px;
    margin-top: 15px;

    .nav-item {
      .nav-item-text {
        color: white;
        text-decoration: none;
      }
    }

    .nav-item:first-of-type {
      margin-bottom: 5px;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.bm-menu {
  .bm-item-list {
    .nav-item {
      .sub-menu {
        background: none;

        .nav-item {
          .nav-item-text {
            color: black;
            text-decoration: none;
          }

          .nav-item-text:hover {
            color: #0054a6;
          }
        }
      }
    }
    .nav-item:hover {
      color: #0054a6;
    }
  }
}
</style>
