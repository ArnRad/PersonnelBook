<template>
  <div class="header">
    <div class="container">
      <a class="header-logo" href="/">
        <img alt="logo" src="../assets/logo.png"/>
      </a>
    </div>
    <div v-if="checkUser()" class="user-info">
      <div class="nav">
        <router-link to="/employees"
          ><div v-if="haveAccess('read employees')" class="nav-item">
            Darbuotojai
          </div></router-link
        >
        <router-link to="/structure"
          ><div v-if="haveAccess('read structures')" class="nav-item">
            Struktūra
          </div></router-link
        >
        <router-link to="/workplaces"
          ><div v-if="haveAccess('read workplaces')" class="nav-item">
            Darbovietės
          </div></router-link
        >
        <router-link to="/adminusers"
          ><div v-if="haveAccess('admin')" class="nav-item">
            Administracija
          </div></router-link
        >
      </div>

      <div class="burger-menu">
        <Slide>
          <router-link to="/employees"
            ><div v-if="haveAccess('read employees')" class="nav-item">
              Darbuotojai
            </div></router-link
          >
          <router-link to="/structure"
            ><div v-if="haveAccess('read structures')" class="nav-item">
              Struktūra
            </div></router-link
          >
          <router-link to="/workplaces"
            ><div v-if="haveAccess('read workplaces')" class="nav-item">
              Darbovietės
            </div></router-link
          >
          <router-link to="/adminusers"
            ><div v-if="haveAccess('admin')" class="nav-item">
              Administracija
            </div></router-link
          >

          <div class="slide-actions">
            <router-link
              :to="{
                name: 'UserInfo',
                params: { username: Username }
              }"
            >
              Vartotojo veiksmai
            </router-link>
            <div class="logout" @click="resetStorage">Atsijungti</div>
          </div>
        </Slide>
      </div>

      <div class="actions">
        <router-link
          :to="{
            name: 'UserInfo',
            params: { username: Username }
          }"
        >
          <img src="../assets/user-info.png" />
        </router-link>
        <img src="../assets/logout.png" @click="resetStorage" />
      </div>
    </div>
    <div class="user-info" v-else>
      <div class="actions">
        <router-link
          :to="{
            name: 'Login'
          }"
        >
          <img src="../assets/logout.png" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import { Slide } from "vue-burger-menu";

export default {
  name: "Header",

  data() {
    return {
      Username: localStorage.getItem("user_name")
    };
  },

  components: {
    Slide
  },

  mounted() {
    this.checkUser();
  },

  methods: {
    checkUser() {
      if (this.Username) return true;
    },

    resetStorage() {
      localStorage.clear();
      window.location.reload();
    },

    haveAccess(text) {
      let tokenInfo = VueJwtDecode.decode(localStorage.getItem("access_token"));
      if (tokenInfo.user.permissions.includes(text)) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss">
$mobile-width: 500px;
$tablet-width: 768px;
$desktopSmall-width: 1024px;
$desktopMid-width: 1750px;

@mixin mobile {
  @media (max-width: #{$desktopSmall-width - 1px}) {
    @content;
  }
}

@mixin tablet {
  @media (min-width: #{$tablet-width}) and (max-width: #{$desktopSmall-width - 1px}) {
    @content;
  }
}

@mixin desktopSmall {
  @media (min-width: #{$desktopSmall-width}) and (max-width: #{$desktopMid-width - 1px}) {
    @content;
  }
}

@mixin desktopMid {
  @media (min-width: #{$desktopMid-width}) {
    @content;
  }
}

.header {
background: rgb(186,44,39);
background: linear-gradient(90deg, rgba(186,44,39,1) 0%, rgba(97,14,128,1) 100%);
//background: $color1;

  width: 100%;
  height: 57px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  .container {
    width: 18%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    @include mobile {
      width: 35%;
    }

    .header-logo {
      color: white;
      font-weight: 700;
      font-size: 22px;
    }
  }

  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-family: "Oswald", sans-serif;
    color: #ffffff;
    text-transform: uppercase;
    margin-left: 30px;

    @include mobile {
      display: none;
    }

    .nav-item {
      margin-right: 30px;
    }
  }

  .user-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60%;

    .actions {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      position: absolute;
      right: 11%;
      @include mobile {
        display: none;
      }
      img {
        cursor: pointer;
        height: 15px;
        margin-left: 25px;
      }
    }

    .burger-menu {
      position: absolute;
      top: -18px;
      right: 80px;
      color: white;
      display: none;

      .bm-burger-button {
        width: 25px;
        height: 20px;
        left: 36px;
        top: 36px;
        cursor: pointer;

        .bm-burger-bars {
          background-color: white;
        }
      }

      .bm-item-list {
        color: black;
        text-decoration: none;
        margin-left: 10%;
        font-size: 20px;

        .bm-item-list .nav-item {
          text-decoration: none;
        }
      }

      .bm-item-list a:hover {
        color: #0054a6;
      }

      .bm-menu {
        background-color: white;
        text-decoration: none;
      }

      @include mobile {
        display: block;
      }

      .slide-actions {
        margin-top: 50px;
        display: block;

        .logout {
          margin-top: 20px;
          cursor: pointer;
        }

        .logout:hover {
          color: #0054a6;
        }
      }
    }
  }
}

a {
  text-decoration: none;
}
a,
a:visited,
a:hover,
a:active {
  color: inherit;
}
</style>
