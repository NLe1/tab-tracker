<template>
  <panel title="Lyrics">
    <textarea readonly label="Lyrics" type="text" v-model="lyrics"></textarea>
  </panel>
</template>

<script>
export default {
  props: ["lyrics"]
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
