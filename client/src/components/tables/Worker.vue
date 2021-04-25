<template>
  <tr>
    <td>
      <img v-if="worker.avatar" :src="require(`../../../../server/uploads/images/${worker.avatar}`)" />
      <img
        v-else
        src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y"
      />
    </td>
    <td>{{ worker.name }}</td>
    <td>{{ worker.lastname }}</td>
    <td v-if="!worker.division_id">-</td>
    <td v-else>{{ worker.division_id.name }}</td>
    <td v-if="!worker.subdivision_id">-</td>
    <td v-else>{{ worker.subdivision_id.name }}</td>
    <td v-if="!worker.region_id">-</td>
    <td v-else>{{ worker.region_id.name }}</td>
    <td v-if="!worker.group_id">-</td>
    <td v-else>{{ worker.group_id.name }}</td>
    <td v-if="!worker.subgroup_id">-</td>
    <td v-else>{{ worker.subgroup_id.name }}</td>
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
