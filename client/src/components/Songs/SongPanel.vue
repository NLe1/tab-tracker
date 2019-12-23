<template>
  <panel title="Songs">
    <v-btn
      slot="action"
      fab
      light
      small
      absolute
      right
      middle
      class="light accent-4"
      :to="{ name: 'song-create' }"
    >
      <v-icon>add</v-icon>
    </v-btn>

    <div class="song" v-for="song in songs" :key="song.title">
      <v-layout>
        <v-flex xs6>
          <div class="song-title">{{ song.title }}</div>
          <div class="song-artist">{{ song.artist }}</div>
          <div class="song-genre">{{ song.genre }}</div>
          <v-btn
            dark
            class="accent-4"
            :to="{
              name: 'song',
              params: { songId: song.id }
            }"
            >View</v-btn
          >
        </v-flex>
        <v-flex xs6>
          <img :src="song.albumImageUrl" class="album-image" />
        </v-flex>
      </v-layout>
    </div>
  </panel>
</template>

<script>
import SongService from "../../services/SongService";

export default {
  data() {
    return {
      songs: null
    };
  },
  watch: {
    "$route.query.search": {
      immediate: true,
      async handler(value) {
        const res = await SongService.index(value);
        this.songs = res.data;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.song {
  padding: 20px;
  height: 400px;
  overflow: hidden;
}
.song-title {
  font-size: 30px;
}

.song-artist {
  font-size: 24px;
}
.song-genre {
  font-size: 18px;
}
.album-image {
  width: 70%;
  margin: 0 auto;
}
</style>
