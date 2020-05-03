<template>
	<v-dialog
		max-width="800"
		persistent
		v-model="showEditDialog"
	>
		<v-card class="px-4 py-3">
			<v-card-title class="headline">
				Edit order
			</v-card-title>
			<v-form ref="editOrderForm" v-model="valid">
				<v-row>

					<!--			name			-->
					<v-col sm="4">
						<v-text-field
							:rules="rules.name"
							label="Client name"
							v-model="order.user"
						></v-text-field>
					</v-col>

					<!--			email			-->
					<v-col sm="4">
						<v-text-field
							:rules="rules.email"
							label="Email"
							type="email"
							v-model="order.email"
						></v-text-field>
					</v-col>

					<!--			phone			-->
					<v-col sm="4">
						<v-text-field
							:rules="rules.phone"
							label="Phone"
							v-model="order.phone"
						></v-text-field>
					</v-col>

					<!--			address			-->
					<v-col sm="12">
						<v-text-field
							:rules="rules.required"
							label="Address"
							v-model="order.address"
						></v-text-field>
					</v-col>

					<!--			quantity			-->
					<v-col sm="4">
						<v-text-field
							:rules="rules.positiveNumber"
							label="Quantity"
							min="0"
							type="number"
							v-model="order.quantity"
						></v-text-field>
					</v-col>

					<!--			product			-->
					<v-col sm="4">
						<v-autocomplete
							:items="products"
							:rules="rules.required"
							item-text="name"
							item-value="id"
							label="Product"
							v-model="order.product"
						></v-autocomplete>
					</v-col>

					<!--			stats			-->
					<v-col sm="4">
						<v-select
							:items="stats"
							:rules="rules.required"
							background-color="transparent"
							label="Order State"
							v-model="order.state"
						></v-select>
					</v-col>

					<!--			Comments			-->
					<v-col sm="12">
						<v-textarea
							class="mt-4"
							height="80"
							label="Comments"
							no-resize
							v-model="order.comments"
						></v-textarea>
					</v-col>
				</v-row>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						@click="showEditDialog = false"
						color="dark darken-1"
						text
					>
						Cancel
					</v-btn>

					<v-btn
						@click="editOrder"
						color="primary darken-1"
					>
						Edit
					</v-btn>
				</v-card-actions>

			</v-form>
		</v-card>
	</v-dialog>
</template>

<script>
  export default {
    name: "EditOrder",
    data() {
      return {
        valid: false,
      }
    },
    props: ['order', 'showEditDialog'],
    computed: {
      stats() {
        return this.$store.state.orders.stats
      },
      products() {
        return this.$store.state.product.products
      },
      rules() {
        return this.$store.state.rules
      },
    },
    methods: {
      editOrder() {
        if (this.valid) {
          this.order.timestamp = Date.now();
          this.$store.dispatch('editOrder', this.order);

          this.order = {
            user: '',
            email: '',
            phone: '',
            address: '',
            quantity: '',
            product: '',
            state: '',
            comments: ''
          };
          this.$refs.editOrderForm.resetValidation();
          this.showEditDialog = false
        }
      },

    }
  }
</script>

<style scoped>

</style>