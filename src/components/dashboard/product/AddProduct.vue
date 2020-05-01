<template>
	<v-expansion-panels>
		<v-expansion-panel>
			<v-expansion-panel-header>Add Product</v-expansion-panel-header>
			<v-expansion-panel-content>
				<v-row>


					<!--			name			-->
					<v-col sm="4">
						<v-text-field
							label="Product name"
							v-model="product.name"
						></v-text-field>
					</v-col>

					<!--			quantity			-->
					<v-col sm="4">
						<v-text-field
							label="Quantity"
							min="0"
							type="number"
							v-model="product.quantity"
						></v-text-field>
					</v-col>

					<!--			price			-->
					<v-col sm="4">
						<v-text-field
							label="Price"
							min="0"
							type="number"
							v-model="product.price"
						></v-text-field>
					</v-col>


					<!--			category			-->
					<v-col sm="4">
						<v-autocomplete
							:items="categories"
							item-text="name"
							item-value="slug"
							label="Category"
							v-model="product.category"
						></v-autocomplete>
					</v-col>

					<v-col sm="4">
						<v-file-input
							:rules="rules"
							id="fileinput"
							show-size
							v-model="product.image"
							label="Product images"
						></v-file-input>
					</v-col>

					<!--				Submit				-->
					<v-col sm="4">
						<div class="my-2">
							<v-btn
								@click="addNewProduct"
								block
								class="mt-3"
								color="primary"
							>
								<i class="fa fa-plus mr-2"></i>Add Product
							</v-btn>
						</div>
					</v-col>
				</v-row>
			</v-expansion-panel-content>
		</v-expansion-panel>
	</v-expansion-panels>

</template>

<script>
  import db from '@/firebase/init'

  import slugify from 'slugify'

  export default {
    name: "AddProduct",
    data() {
      return {
        rules: [
          value => !value || value.size < 1000000 ||
            'image size should be less than 1 MB!',
        ],
        product: {
          slug: '',
          category: '',
          name: '',
          quantity: 0,
          price: 0,
          image: null
        },
        categories: []
      }
    },
    methods: {
      getCategories() {
        db.collection('category').get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              let c = doc.data();
              c.id = doc.id;
              this.categories.push(c)
            })
          }).catch(e => {
          console.log('error' + e)
        })
      },

      addNewProduct() {
        if (this.product.name) {
          let slug = slugify(this.product.name, {
            replacement: '-',
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true
          });
          this.product.slug = slug;
          this.$store.dispatch('addProduct', this.product);
          this.product = {}
        }
      }
    },
    computed: {},
    mounted() {
      this.getCategories()
    }
  }
</script>

<style scoped>

</style>
