<template>
	<v-dialog
		max-width="600"
		persistent
		v-model="showEditDialog"
	>
		<v-card class="px-4 py-3">
			<v-card-title class="headline">
				Edit {{newProduct.name}}
			</v-card-title>

			<v-row>
				<!--			name			-->
				<v-col sm="6">
					<v-text-field
						label="Product name"
						v-model="newProduct.name"
					></v-text-field>
				</v-col>


				<v-col sm="6">
					<v-file-input
						:rules="rules"
						label="Product images"
						show-size
						v-model="newProduct.image"
					></v-file-input>
				</v-col>

				<!--			quantity			-->
				<v-col sm="4">
					<v-text-field
						label="Quantity"
						min="0"
						type="number"
						v-model="newProduct.quantity"
					></v-text-field>
				</v-col>

				<!--			price			-->
				<v-col sm="4">
					<v-text-field
						label="Price"
						min="0"
						type="number"
						v-model="newProduct.price"
					></v-text-field>
				</v-col>


				<!--			category			-->
				<v-col sm="4">
					<v-autocomplete
						:items="categories"
						item-text="name"
						item-value="slug"
						label="Category"
						v-model="newProduct.category"
					></v-autocomplete>
				</v-col>


			</v-row>

			<v-card-actions>
				<v-btn
					@click="closeDialog"
					color="dark darken-1"
					text
				>
					Cancel
				</v-btn>

				<v-spacer></v-spacer>

				<v-btn
					@click="editProduct"
					color="primary darken-1"
				>
					Edit
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
  import slugify from 'slugify'


  export default {
    name: "EditProduct",
    data() {
      return {
        newProduct: {
          id: this.product.id,
          slug: this.product.slug,
          category: this.product.category,
          name: this.product.name,
          quantity: this.product.quantity,
          price: this.product.price,
          image: null
        },
        rules: [
          value => !value || value.size < 1000000 ||
            'image size should be less than 1 MB!',
        ],
      }
    },
    props: ['showEditDialog', 'product', 'categories'],
    methods: {
      closeDialog() {
        this.$emit('closeDialog')
      },

      editProduct() {
        this.newProduct.image === null ? delete this.newProduct.image : '';
        if (this.product.name) {
          this.product.slug = slugify(this.product.name, {
            replacement: '-',
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true
          });
          this.$store.dispatch('editProduct', this.newProduct);
          this.closeDialog()
        }
      },
    },
    mounted() {
      // this.product.image = null
    }

  }
</script>

<style scoped>

</style>