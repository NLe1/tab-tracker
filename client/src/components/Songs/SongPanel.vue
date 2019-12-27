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

    <half-circle-spinner v-if="!songPages" :animation-duration="1000" :size="60" color="#ff1d5e" />
    <div class="scroll" v-if="!!songPages">
      <div class="song" v-for="song in songPages" :key="song.title">
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
            >View</v-btn>
          </v-flex>
          <v-flex xs6>
            <img :src="song.albumImageUrl" class="album-image" />
          </v-flex>
        </v-layout>
      </div>
    </div>

    <template>
      <div class="text-center">
        <v-pagination v-model="page" :length="lengthPages"></v-pagination>
      </div>
    </template>
  </panel>
</template>

<script>
import SongService from "../../services/SongService";
import { HalfCircleSpinner } from "epic-spinners";

export default {
  data() {
    return {
      page: 1,
      songs: null,
      lengthPages: 0,
      songPages: null
    };
  },
  components: {
    HalfCircleSpinner
  },
  watch: {
    "$route.query.search": {
      immediate: true,
      async handler(value) {
        const res = await SongService.index(value);
        this.songs = res.data;
        this.lengthPages = Math.floor(this.songs.length / 4);
        this.songPages = this.songs.slice(0, 4);
      }
    },
    page(value) {
      let startIndex = (value - 1) * 4;
      this.songPages = this.songs.slice(startIndex, startIndex + 4);
    }
  }
};
</script>

<style lang="scss" scoped>
.scroll {
  width: auto;
  height: 580px;
  overflow-x: hidden;
}
.song {
  padding: 20px;
  height: 300px;
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
