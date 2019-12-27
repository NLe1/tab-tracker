<template>
  <div>
    <v-app-bar>
      <v-toolbar-title class="mr-4">
        <router-link tag="span" class="home" light :to="{ name: 'songs' }">Tab Tracker</router-link>
      </v-toolbar-title>

      <v-toolbar-items>
        <v-btn dark :to="{ name: 'songs' }">Browse</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn v-if="!$store.state.isUserLoggedIn" dark :to="{ name: 'login' }">Login</v-btn>
        <v-btn v-if="!$store.state.isUserLoggedIn" dark :to="{ name: 'register' }">Sign up</v-btn>
        <v-btn @click="logout" v-if="$store.state.isUserLoggedIn" dark>Log Out</v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      try {
        this.$store.dispatch("setToken", null);
        this.$store.dispatch("setUser", null);
        this.$router.push({ name: "songs" });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
.home {
  cursor: pointer;
}
.home:hover {
  color: #e9e;
}
</style>
