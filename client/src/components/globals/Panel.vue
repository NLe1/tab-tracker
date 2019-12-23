<template>
  <div class="panel">
    <v-toolbar dark>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <slot name="action"></slot>
    </v-toolbar>

    <div class="pl-4 pr-4 pt-2 pb-2">
      <slot>no slot content defined.</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Panel",
  props: ["title"]
};
</script>

<style scoped>
.panel {
  padding: 2px;
}
</style>
