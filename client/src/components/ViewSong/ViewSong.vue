<template>
  <div>
    <v-layout>
      <v-flex xs6>
        <song-metadata v-if="hasSong" :song="song"></song-metadata>
      </v-flex>

      <v-flex xs6>
        <youtube v-if="hasSong" :youtubeId="song.youtubeID" />
      </v-flex>
    </v-layout>
    <v-layout class="mt-2">
      <v-flex xs6>
        <tab :tab="song.tab" v-if="hasSong"></tab>
      </v-flex>

      <v-flex xs6>
        <lyrics :lyrics="song.lyrics" v-if="hasSong"></lyrics>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SongService from "../../services/SongService";
import SongMetadata from "./SongMetadata";
import Youtube from "./Youtube";
import Lyrics from "./Lyrics";
import Tab from "./Tab";
import SongHistoryService from "../../services/SongHistoryService";

export default {
  data() {
    return {
      song: null,
      hasSong: false
    };
  },
  async mounted() {
    const songId = parseInt(this.route.params.songId);
    const song = await SongService.show(songId);
    this.song = song.data;
    this.hasSong = true;
    if (this.isUserLoggedIn) {
      SongHistoryService.post({
        SongId: songId,
        UserId: this.user.id
      });
    }
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "route"])
  },
  components: {
    SongMetadata,
    Youtube,
    Lyrics,
    Tab
  }
};
</script>

<style scoped>
.song {
  padding: 20px;
  height: 400px;
  overflow: hidden;
}
</style>
