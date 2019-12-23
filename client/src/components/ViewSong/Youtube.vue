<template>
  <panel title="Youtube Video">
    <v-layout>
      <youtube :video-id="youtubeId" :player-width="550" :player-height="300"></youtube>
    </v-layout>
  </panel>
</template>

<script>
export default {
  props: ["youtubeId"]
};
</script>

<style scoped></style>
