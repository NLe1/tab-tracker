<template>
  <panel title="Song Metadata">
    <v-layout class="song">
      <v-flex xs6>
        <div class="song-title">{{ song.title }}</div>
        <div class="song-artist">{{ song.artist }}</div>
        <div class="song-genre">{{ song.genre }}</div>
        <v-btn dark :to="{ name: 'song-edit' }">
          Edit
        </v-btn>
      </v-flex>
      <v-flex xs6>
        <img :src="song.albumImageUrl" class="album-image" />
        <br />
        {{ song.album }}
      </v-flex>
    </v-layout>
  </panel>
</template>

<script>
export default {
  props: ["song"]
};
</script>

<style scoped>
.song-title {
  font-size: 30px;
}

.song-artist {
  font-size: 24px;
}

.album-image {
  width: 100%;
  margin: 0 auto;
}
</style>
