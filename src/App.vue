<template>
	<transition name="fade">
			<router-view/>
	</transition>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({}),
    computed: {
      title() {
        return this.$store.state.settings.title
      }
    },
  }
</script>


<style lang="sass">
	// import roboto font
	@import "./assets/css/roboto.css"

	// import fontawesome
	@import "./assets/font-awesome-4.7.0/css/font-awesome.min.css"

	// material icons
	@import "https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css"

	// import custom sass
	@import "./assets/css/styles.sass"
</style>