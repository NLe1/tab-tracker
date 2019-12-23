<template>
  <div id="app">
    <v-app>
      <PageHeader />

      <main>
        <v-container>
          <router-view></router-view>
        </v-container>
      </main>
    </v-app>
  </div>
</template>

<script>
import PageHeader from "./components/Header";
export default {
  name: "App",
  components: {
    PageHeader
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.danger-alert {
  color: red;
}
</style>
