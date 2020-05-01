<template>
	<div id="cateegories">
		<!--		<h1 class="mb-3">category</h1>-->
		<AddCategory/>

		<v-row v-if="categories">
			<v-col
				:key="category.id"
				lg="3"
				@click.stop="editCategoryForm(category)" md="4" sm="6"
				v-for="category in categories">
				<SingleCategory
					:category="category">
				</SingleCategory>
			</v-col>
		</v-row>


		<EditCategory
			:editingCategory="editingCategory"
			:showEditDialog="showEditDialog"
			@closeDialog="showEditDialog=false"
			v-if="showEditDialog"
		></EditCategory>
	</div>
</template>

<script>
  import SingleCategory from './SingleCategory'
  import AddCategory from './AddCategory'
  import EditCategory from "./EditCategory";

  export default {
    name: "Category",
    data() {
      return {
        showEditDialog: false,
        editingCategory: null
      }
    },
    methods: {
      editCategoryForm(cat) {
        this.editingCategory = cat
        this.showEditDialog = true
      }
    },
    components: {
      EditCategory,
      SingleCategory,
      AddCategory
    },
    computed: {
      categories() {
        return this.$store.state.category.categories
      }
    },
    mounted() {
      this.$store.dispatch('getCategories')
    }
  }
</script>

<style scoped>

</style>