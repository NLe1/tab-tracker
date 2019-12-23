<template>
  <panel title="Tabs">
    <textarea readonly label="Tab" type="text" v-model="tab"></textarea>
  </panel>
</template>

<script>
export default {
  props: ["tab"]
};
</script>

<style scoped>
textarea {
  width: 100%;
  font-family: monospace;
  border: none;
  height: 500px;
  border-style: none;
  border-color: transparent;
  overflow: auto;
  padding: 5px;
}
</style>
