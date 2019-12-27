<template>
  <panel title="Bookmarks">
    <div v-if="!bookmarks && !isUserLoggedIn">You have to logged in to see your bookmarks</div>
    <half-circle-spinner
      v-if="!bookmarks && isUserLoggedIn"
      :animation-duration="1000"
      :size="60"
      color="#ff1d5e"
    />
    <div v-if="!!bookmarks && isUserLoggedIn">
      <div v-if="!!bookmarks">
        <v-data-table
          :headers="headers"
          :items-per-page="5"
          :sortBy.sync="sortBy"
          :sortDesc.sync="sortDesc"
          :items="bookmarks"
        ></v-data-table>
      </div>
    </div>
  </panel>
</template>

<script>
import { mapState } from "vuex";
import BookmarksService from "../../services/BookmarksService";
import SongService from "../../services/SongService";
import { HalfCircleSpinner } from "epic-spinners";

export default {
  data() {
    return {
      headers: [
        {
          text: "Title",
          value: "title"
        },
        {
          text: "Artist",
          value: "artist"
        }
      ],
      sortBy: "createdAt",
      sortDesc: true,
      bookmarks: null
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"])
  },
  async mounted() {
    if (this.isUserLoggedIn) {
      this.bookmarks = (await BookmarksService.index()).data;
    }
  },
  components: {
    HalfCircleSpinner
  }
};
</script>

<style lang="scss" scoped></style>
