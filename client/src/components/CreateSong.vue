<template>
  <v-layout>
    <v-flex xs4>
      <panel title="Song Metadata">
        <v-text-field
          required
          :rules="[required]"
          label="Artist"
          type="text"
          v-model="song.artist"
        ></v-text-field>
        <v-text-field
          required
          :rules="[required]"
          label="Title"
          type="text"
          v-model="song.title"
        ></v-text-field>
        <v-text-field
          required
          :rules="[required]"
          label="Genre"
          type="text"
          v-model="song.genre"
        ></v-text-field>
        <v-text-field
          required
          :rules="[required]"
          label="Album"
          type="text"
          v-model="song.album"
        ></v-text-field>
        <v-text-field
          required
          :rules="[required]"
          label="Album Image URL"
          type="text"
          v-model="song.albumImageUrl"
        ></v-text-field>
        <v-text-field
          required
          :rules="[required]"
          label="Youtube ID"
          type="text"
          v-model="song.youtubeID"
        ></v-text-field>
      </panel>
    </v-flex>
    <v-flex xs8>
      <panel class="ml-2" title="Song Structure">
        <v-textarea required :rules="[required]" label="Tab" type="text" v-model="song.tab"></v-textarea>
        <v-textarea
          required
          :rules="[required]"
          label="Lyric"
          type="text"
          v-model="song.lyrics"
        ></v-textarea>
      </panel>
      <div class="danger-alert" v-if="error">{{ error }}</div>
      <v-btn dark @click="create">Create Song</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import SongService from "../services/SongService";
export default {
  data() {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImageUrl: null,
        youtubeID: null,
        lyrics: null,
        tab: null
      },
      required: value => !!value || "Required.",
      error: null
    };
  },
  methods: {
    async create() {
      this.error = null;
      const areAllFieldsFilledIn = Object.keys(this.song).every(key => !!this.song[key]);
      if (!areAllFieldsFilledIn) {
        this.error = "Please fill in all the required fields.";
        return;
      }
      //Call API
      try {
        const res = await SongService.post(this.song);
        this.$router.push({ name: "songs" });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped></style>
