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
					:product="product">
				</SingleProduct>
			</v-col>
		</v-row>


	</div>
</template>

<script>
  import AddProduct from './AddProduct'
  import SingleProduct from './SingleProduct'

  export default {
    name: "Product",
    components: {
      AddProduct,
      SingleProduct
    },
    computed: {
      products() {
        return this.$store.state.product.products
      }
    },
    mounted() {
      this.$store.dispatch('getProducts')
    }
  }
</script>

<style scoped>

</style>