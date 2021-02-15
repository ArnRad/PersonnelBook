<template>
  <div class="structure-container">
    <div class="structure">
      <div class="structure-header">Struktūra</div>
      <Division />
      <SubDivision />
      <Region />
      <Group />
      <SubGroup />
    </div>
  </div>
</template>

<script>
import Division from "./structureComponents/Division";
import SubDivision from "./structureComponents/SubDivision";
import Region from "./structureComponents/Region";
import Group from "./structureComponents/Group";
import SubGroup from "./structureComponents/SubGroup";
import axios from "axios";

export default {
  name: "Structure",

  components: {
    Division,
    SubDivision,
    Region,
    Group,
    SubGroup
  }
};
</script>

<style lang="scss" scoped>
.structure-container {
  display: flex;
  justify-content: center;
  align-items: center;

  .structure {
    width: 80%;

    .structure-header {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 84px;
      width: 100%;

      font-size: 21px;
      color: #00264c;
      border-bottom: 1px solid rgba(196, 196, 196, 0.3);
    }
  }
}
</style>
