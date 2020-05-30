<template>
  <v-app id="Error404-page">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-card class="mx-auto text-center" id="loginForm" outlined>
          <h1>Error 404</h1>
          <h4>requested page not found</h4>
          <router-link :to="{name: 'Error404'}">
            <v-btn color="primary" class="mt-4">Back to home</v-btn>
          </router-link>
        </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {};
</script>

<style scoped>
#Error404-page {
  background: #eee;
}

#loginForm {
  width: 400px;
  padding: 20px 10px;
}
</style>