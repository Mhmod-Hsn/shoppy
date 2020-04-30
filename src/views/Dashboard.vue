<template>
  <div class="about">
    <h1>This is an Dashboard page</h1>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    mounted() {
      let user = firebase.auth().currentUser

      if (!user) {
        this.$router.push({name: 'Login'})
      }
    }
  }
</script>
