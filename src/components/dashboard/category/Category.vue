<template>
	<div id="cateegories">
		<h1>category</h1>
		<AddCategory/>

		<v-row v-if="categories">
			<v-col
				:key="category.id"
				lg="3"
				md="4" sm="6" v-for="category in categories">
				<SingleCategory :category="category"></SingleCategory>
			</v-col>
		</v-row>
	</div>
</template>

<script>
  import SingleCategory from './SingleCategory'
  import AddCategory from './AddCategory'

  export default {
    name: "Category",
    components: {
      SingleCategory,
      AddCategory
    },
    computed: {
      categories() {
        return this.$store.state.categories
      }
    },
    mounted() {
      this.$store.dispatch('getCategories')
    }
  }
</script>

<style scoped>

</style>