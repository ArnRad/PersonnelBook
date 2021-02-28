<template>
  <tr>
    <td>
      <!--<img :src="employee.avatar" />-->
      <img
        src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y"
      />
    </td>
    <td>{{ worker.name }}</td>
    <td>{{ worker.lastname }}</td>
    <td v-if="!worker.division">-</td>
    <td v-else>{{ worker.division.name }}</td>
    <td v-if="!worker.subdivision">-</td>
    <td v-else>{{ worker.subdivision.name }}</td>
    <td v-if="!worker.region">-</td>
    <td v-else>{{ worker.region.name }}</td>
    <td v-if="!worker.group">-</td>
    <td v-else>{{ worker.group.name }}</td>
    <td v-if="!worker.subgroup">-</td>
    <td v-else>{{ worker.subgroup.name }}</td>
    <td class="actions-container">
      <router-link
        :to="{
          name: 'edit',
          params: { id: worker._id }
        }"
      >
        <img src="../../assets/edit-employee.png" />
      </router-link>
      <img
        @click="$emit('delete', worker._id)"
        src="../../assets/delete-employee.png"
      />
    </td>
  </tr>
</template>

<script>
import axios from "axios";

export default {
  name: "Worker",

  props: {
    worker: Object
  },

  methods: {}
};
</script>

<style scoped lang="scss">
tr {
  height: 73px;
}

td img {
  height: 50px;
  width: 50px;
}

.actions-container {
  img {
    width: 23px;
    height: 20px;
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>
