<template>
	<div id="products">
		<AddProduct/>

		<v-row v-if="products">
			<v-col
				:key="product.id"
				@click.stop=""
				lg="3" md="4" sm="6"
				v-for="product in products">
				<SingleProduct
					:key="product.id"
					:product="product"
					@editProduct="editProduct"
				>
				</SingleProduct>
			</v-col>
		</v-row>

		<EditProduct
			:categories="categories"
			:product="editingProduct"
			:showEditDialog="showEditDialog"
			@closeDialog="showEditDialog=false"
			v-if="showEditDialog"
		></EditProduct>

	</div>
</template>

<script>
  import AddProduct from './AddProduct'
  import SingleProduct from './SingleProduct'
  import EditProduct from './EditProduct'


  export default {
    name: "Product",
    data() {
      return {
        showEditDialog: false,
        editingProduct: null
      }
    },
    components: {
      AddProduct,
      SingleProduct,
      EditProduct
    },
    methods: {
      editProduct(product) {
        this.editingProduct = product;
        this.showEditDialog = true
      }
    },
    computed: {
      products() {
        return this.$store.state.product.products
      },
      categories() {
        return this.$store.state.category.categories
      }
    },
    mounted() {
      this.$store.dispatch('getCategories');
      this.$store.dispatch('getProducts')
    }
  }
</script>

<style scoped>

</style>