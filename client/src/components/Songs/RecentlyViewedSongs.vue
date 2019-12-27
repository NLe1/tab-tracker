<template>
  <panel title="Recently Viewed Songs">
    <div v-if="!songs && !isUserLoggedIn">You have to logged in to see your songs</div>
    <half-circle-spinner
      v-if="!songs && isUserLoggedIn"
      :animation-duration="1000"
      :size="60"
      color="#ff1d5e"
    />
    <div v-if="!!songs && isUserLoggedIn">
      <div v-if="!!songs">
        <v-data-table
          :headers="headers"
          :items-per-page="5"
          :sortBy.sync="sortBy"
          :sortDesc.sync="sortDesc"
          :items="songs"
        ></v-data-table>
      </div>
    </div>
  </panel>
</template>

<script>
import { mapState } from "vuex";
import SongHistoryService from "../../services/SongHistoryService";
import { HalfCircleSpinner } from "epic-spinners";

export default {
  data() {
    return {
      songs: null,
      sortBy: "createdAt",
      sortDesc: true,
      headers: [
        {
          text: "Title",
          value: "title"
        },
        {
          text: "Artist",
          value: "artist"
        }
      ]
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"])
  },
  async mounted() {
    if (this.isUserLoggedIn) {
      this.songs = (await SongHistoryService.index()).data;
    }
  },
  components: {
    HalfCircleSpinner
  }
};
</script>

<style scoped></style>
