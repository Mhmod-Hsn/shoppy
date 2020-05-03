<template>
	<v-expansion-panels>
		<v-expansion-panel>
			<v-expansion-panel-header>Add Order</v-expansion-panel-header>
			<v-expansion-panel-content>
				<v-form ref="newOrderForm" v-model="valid">
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
								dense
								label="Comments"
								v-model="order.comments"
							></v-textarea>

						</v-col>


						<!--				Submit				-->
						<v-col sm="12">
							<div class="text-right">
								<v-btn
									:disabled="!valid"
									@click="addNewOrder"
									class="mt-3"
									color="primary"
								>
									<i class="fa fa-plus mr-2"></i>Add Order
								</v-btn>
							</div>
						</v-col>
					</v-row>
				</v-form>
			</v-expansion-panel-content>
		</v-expansion-panel>
	</v-expansion-panels>
</template>

<script>
  export default {
    data() {
      return {
        valid: false,
        order: {
          user: '',
          email: '',
          phone: '',
          address: '',
          quantity: '',
          product: '',
          state: '',
          comments: ''
        }
      }
    },
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
      addNewOrder() {
        if (this.valid) {
          this.order.timestamp = Date.now();
          this.$store.dispatch('addOrder', this.order);

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
          this.$refs.newOrderForm.resetValidation()
        }
      },

    }
  }
</script>

<style scoped>

</style>