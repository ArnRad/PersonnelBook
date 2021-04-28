import Vue from "vue";
import axios from "axios";
import Router from "vue-router";
import Employee from "@/components/Employee";
import Login from "@/components/Login";
import Register from "@/components/Register";
import Statistics from "@/components/Statistics";
import Workers from "@/components/Workers";
import Structure from "@/components/Structure";
import WorkPlaces from "@/components/WorkPlaces";
import AdminUsers from "@/components/AdminUsers";
import AddEditEmployee from "@/components/actions/AddEditEmployee";
import PageNotFound from "@/components/PageNotFound";
import UserInfo from "@/components/UserInfo";
import ExportWorkers from "@/components/ExportWorkers"
import VueJwtDecode from "vue-jwt-decode";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "Employee",
      component: Employee
    },
    {
      path: "/statistics",
      name: "Statistics",
      component: Statistics
    },
    {
      path: "*",
      name: "404",
      component: PageNotFound
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/employees",
      name: "Workers",
      component: Workers,
      meta: { requiresAuth: true, permission: "read employees" }
    },
    {
      path: "/employees/export",
      name: "export",
      component: ExportWorkers,
      meta: { requiresAuth: true }
    },
    {
      path: "/employees/add",
      name: "add",
      component: AddEditEmployee,
      meta: { requiresAuth: true, permission: "create-edit employees" }
    },
    {
      path: "/employees/edit/:id",
      name: "edit",
      component: AddEditEmployee,
      meta: { requiresAuth: true, permission: "create-edit employees" }
    },
    {
      path: "/structure",
      name: "Structure",
      component: Structure,
      meta: { requiresAuth: true, permission: "read structures" }
    },
    {
      path: "/workplaces",
      name: "WorkPlaces",
      component: WorkPlaces,
      meta: { requiresAuth: true, permission: "read workplaces" }
    },
    {
      path: "/adminusers",
      name: "AdminUsers",
      component: AdminUsers,
      meta: { requiresAuth: true, permission: "admin" }
    },
    {
      path: "/user/:username",
      name: "UserInfo",
      component: UserInfo,
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  axios.interceptors.response.use(
    function(response) {
      return response;
    },
    function(error) {
      if (error.response.data.status === "Token is Expired") {
        localStorage.clear();
        next({
          name: "Login"
        });
      }
      return Promise.reject(error);
    }
  );

  if (to.meta.requiresAuth) {
    if (!localStorage.getItem("user_name")) {
      next({
        name: "Login"
      });
    } else {
      next();
    }
  } else {
    next();
  }

  if (localStorage.getItem("access_token")) {
    let tokenInfo = VueJwtDecode.decode(localStorage.getItem("access_token"));
    if (to.meta.permission) {
      if (!tokenInfo.user.permissions.includes(to.meta.permission)) {
        next({
          name: "404"
        });
      }
    }
  }
});

export default router;
