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
							v-model="editedOrder.user"
						></v-text-field>
					</v-col>

					<!--			email			-->
					<v-col sm="4">
						<v-text-field
							:rules="rules.email"
							label="Email"
							type="email"
							v-model="editedOrder.email"
						></v-text-field>
					</v-col>

					<!--			phone			-->
					<v-col sm="4">
						<v-text-field
							:rules="rules.phone"
							label="Phone"
							v-model="editedOrder.phone"
						></v-text-field>
					</v-col>

					<!--			address			-->
					<v-col sm="12">
						<v-text-field
							:rules="rules.required"
							label="Address"
							v-model="editedOrder.address"
						></v-text-field>
					</v-col>

					<!--			quantity			-->
					<v-col sm="4">
						<v-text-field
							:rules="rules.positiveNumber"
							label="Quantity"
							min="0"
							type="number"
							v-model="editedOrder.quantity"
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
							v-model="editedOrder.product"
						></v-autocomplete>
					</v-col>

					<!--			stats			-->
					<v-col sm="4">
						<v-select
							:items="stats"
							:rules="rules.required"
							background-color="transparent"
							label="Order State"
							v-model="editedOrder.state"
						></v-select>
					</v-col>

					<!--			Comments			-->
					<v-col sm="12">
						<v-textarea
							class="mt-4"
							height="80"
							label="Comments"
							no-resize
							v-model="editedOrder.comments"
						></v-textarea>
					</v-col>
				</v-row>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						@click="closeDialog"
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
        editedOrder: {
          id: this.order.id,
          user: this.order.user,
          email: this.order.email,
          phone: this.order.phone,
          address: this.order.address,
          quantity: this.order.quantity,
          product: this.order.product,
          state: this.order.state,
          comments: this.order.comments,
        }
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
      closeDialog() {
        this.$emit('closeDialog')
      },

      editOrder() {
        if (this.valid) {
          this.$store.dispatch('editOrder', this.editedOrder);

          this.$refs.editOrderForm.resetValidation();
          this.closeDialog()
        }
      },

    }
  }
</script>

<style scoped>

</style>