<template>
  <panel title="Song Metadata">
    <v-layout class="song">
      <v-flex xs8>
        <div class="song-title">{{ song.title }}</div>
        <div class="song-artist">{{ song.artist }}</div>
        <div class="song-genre">{{ song.genre }}</div>
        <v-btn dark :to="{ name: 'song-edit' }">
          Edit
        </v-btn>

        <v-btn dark v-if="isUserLoggedIn && !bookmark" @click="setAsBookmark">
          Bookmark
        </v-btn>

        <v-btn dark v-if="isUserLoggedIn && !!bookmark" @click="unsetAsBookmark">
          Unbookmark
        </v-btn>
      </v-flex>
      <v-flex xs4>
        <img :src="song.albumImageUrl" class="album-image" />
        <br />
        {{ song.album }}
      </v-flex>
    </v-layout>
  </panel>
</template>

<script>
import { mapState } from "vuex";
import BookmarksService from "../../services/BookmarksService";
export default {
  props: ["song"],
  data() {
    return {
      bookmark: null
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn"])
  },
  methods: {
    async setAsBookmark() {
      try {
        const res = await BookmarksService.post({
          SongId: this.song.id
        });
        this.bookmark = res.data !== "" ? res.data : null;
      } catch (error) {
        console.log(error);
      }
    },
    async unsetAsBookmark() {
      try {
        await BookmarksService.delete(this.bookmark.id);
        this.bookmark = null;
      } catch (error) {
        console.log(error);
      }
    }
  },
  async mounted() {
    try {
      const res = await BookmarksService.index({
        SongId: this.song.id
      });
      this.bookmark = res.data !== [] ? res.data[0] : null;
    } catch (error) {
      console.log(error);
    }
  }
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
