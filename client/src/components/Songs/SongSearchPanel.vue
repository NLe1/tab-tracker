<template>
  <panel title="Search">
    <v-text-field label="Search by song title, artist, album , or genre " v-model="search"></v-text-field>
  </panel>
</template>

<script>
import _ from "lodash";
import SongService from "../../services/SongService";
export default {
  data() {
    return {
      search: ""
    };
  },
  watch: {
    search: _.debounce(async function(value) {
      const route = {
        name: "songs"
      };
      if (this.search !== "") {
        route.query = {
          search: this.search
        };
      }

      this.$router.push(route);
    }, 600),

    "$route.query.search": {
      immediate: true,
      handler(value) {
        this.search = value;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
