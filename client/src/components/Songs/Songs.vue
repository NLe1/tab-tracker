<template>
  <div>
    <v-layout column>
      <v-flex xs6>
        <song-search-panel></song-search-panel>
        <song-panel class="mt-2"></song-panel>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import SongService from "../../services/SongService";
import SongPanel from "./SongPanel";
import SongSearchPanel from "./SongSearchPanel";
export default {
  data() {
    return {
      songs: null
    };
  },
  async mounted() {
    const res = await SongService.index();
    this.songs = res.data;
  },
  components: {
    SongPanel,
    SongSearchPanel
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
  .font-size: 18px;
}
.album-image {
  width: 70%;
  margin: 0 auto;
}
</style>
