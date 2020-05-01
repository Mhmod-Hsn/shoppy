<template>

	<v-card
		class="productCard"
		elevation="10"
	>

		<v-img
			:src="product.image"
			height="200px"
		></v-img>


		<v-card-title>
			{{product.name}}
		</v-card-title>

		<v-card-subtitle>
			Quantity: {{product.quantity}}
			Price: {{product.price | priceText}}
		</v-card-subtitle>

		<v-card-actions>

			<v-btn
				color="error"
				text
				@click="deleteProduct(product)"
			>
				<i aria-hidden="true" class="fa fa-trash-o mr-2"></i>
				delete
			</v-btn>
			<v-spacer></v-spacer>
			<v-btn
				color="warning"
				@click="editProduct(product)"
			>
				<i aria-hidden="true" class="fa fa-pencil-square-o mr-2"></i>
				edit
			</v-btn>

		</v-card-actions>
	</v-card>


</template>

<script>
  export default {
    name: "SingleProduct",
    props: ['product'],
    methods: {
      deleteProduct(product) {
        let confirm =
          window.confirm(`Are you sure to delete category ${product.name} ?`);
        if (confirm) {
          this.$store.dispatch('removeProduct', product)
        }
      },
      editProduct(product) {
        this.$emit('editProduct', product)
      }
    }
  }
</script>

<style scoped>

</style>