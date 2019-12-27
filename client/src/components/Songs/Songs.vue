<template>
  <div>
    <v-layout>
      <v-flex xs6 v-if="isUserLoggedIn">
        <songs-bookmarks></songs-bookmarks>
        <recently-viewed-song class="mt-2"></recently-viewed-song>
      </v-flex>
      <v-flex
        :class="{
          xs12: !isUserLoggedIn,
          xs6: isUserLoggedIn
        }"
        class="ml-2"
      >
        <song-search-panel></song-search-panel>
        <song-panel class="mt-2"></song-panel>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import SongService from "../../services/SongService";
import SongHistoryService from "../../services/SongHistoryService";
import SongPanel from "./SongPanel";
import SongSearchPanel from "./SongSearchPanel";
import SongsBookmarks from "./SongsBookmarks";
import RecentlyViewedSong from "./RecentlyViewedSongs";
import { mapState } from "vuex";
export default {
  data() {
    return {
      songs: null
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn"])
  },
  async mounted() {
    const songRes = await SongService.index();
    this.songs = songRes.data;
    if (this.isUserLoggedIn) {
      this.history = (await SongHistoryService.index()).data;
    }
  },
  components: {
    SongPanel,
    SongSearchPanel,
    SongsBookmarks,
    RecentlyViewedSong
  }
};
</script>

<style scoped></style>
