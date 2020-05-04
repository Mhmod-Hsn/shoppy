<template>
	<v-col
		:lg="width[0]"
		:md="width[1]"
		:sm="width[2]"
		cols="12"
	>
		<v-card
			class="text-center"
			color="primary"
			elevation="10"
			raised>


			<v-card-title class="d-block pt-1">
				title
			</v-card-title>
		</v-card>
	</v-col>
</template>

<script>
  export default {
    name: "Todo",
    props: ['width']
  }
</script>

<style scoped>

</style>