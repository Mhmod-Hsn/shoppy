<template>
	<v-card
		class="categoryCard"
		elevation="10"
	>
		<v-container>
			<h3>{{category.name}}</h3>

			<v-btn
				@click.stop="deleteCategory(category)"
				class="removeCategory"
				color="error"
				fab
			>
				<i aria-hidden="true" class="fa fa-trash-o"></i>
			</v-btn>

		</v-container>
	</v-card>
</template>

<script>
  export default {
    name: "SingleCategory",
    props: ['category'],
    methods: {
      deleteCategory(category) {
        let confirm =
          window.confirm(`Are you sure to delete category ${category.name} ?`)
        if (confirm) {
          this.$store.dispatch('removeCategory', category)
        }
      }
    }
  }
</script>

<style scoped>

</style>