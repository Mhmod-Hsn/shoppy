<template>
	<v-app id="orders">
		<v-container class="" fluid>
			<h2 class="mb-2">Orders</h2>

			<AddOrder class="mb-3"/>

			<v-simple-table fixed-header>
				<template v-slot:default>
					<thead>
					<tr>
						<th class="text-center" width="50px">Index</th>
						<th width="150px">Name</th>
						<th width="10">Phone</th>
						<th width="120px">Product</th>
						<th width="5">Quantity</th>
						<th> Address</th>
						<th class="" width="200px">State</th>
						<th class="text-center" width="35px">edit</th>
						<th class="text-center" width="35px">Remove</th>
					</tr>
					</thead>
					<tbody>
					<tr :key="order.id" v-for="(order,index) in orders">
						<td :class="'border-'+order.state" class="border-row text-center">
							{{index
							+1}}
						</td>
						<td>{{ order.user }}</td>
						<td>{{ order.phone }}</td>
						<td>{{ getProductName(order.product) }}</td>
						<td>{{ order.quantity }}</td>
						<td>{{ order.address }}</td>


						<td style="position: relative">
							<v-select
								:items="stats"
								@change="changeState(order.id,$event)"
								background-color="transparent"
								dense
								hide-details
								label="Solo field"
								solo
								v-model="order.state"
							></v-select>
						</td>

						<td class="px-0 text-center">
							<v-btn @click="editOrder(order)" color="warning" dark fab
							       x-small
							>
								<v-icon>mdi-pencil</v-icon>
							</v-btn>
						</td>
						<td class="px-0 text-center">
							<v-btn @click="deleteOrder(order.id)" color="error" dark fab
							       x-small>
								<v-icon>fa fa-times</v-icon>
							</v-btn>
						</td>

					</tr>
					</tbody>
				</template>
			</v-simple-table>

		</v-container>

		<EditOrder
			:order="editingOrder"
			:showEditDialog="showEditDialog"
			@closeDialog="showEditDialog=false"
			v-if="showEditDialog"
		></EditOrder>
	</v-app>
</template>

<script>
  import AddOrder from './AddOrder'
  import EditOrder from './EditOrder'

  export default {
    data() {
      return {
        showEditDialog: false,
        editingOrder: {}
      }
    },
    components: {
      AddOrder,
      EditOrder
    },
    computed: {
      orders() {
        return this.$store.state.orders.orders;
      },
      stats() {
        return this.$store.state.orders.stats
      },
      products() {
        return this.$store.state.product.products
      },
    },
    mounted() {

    },
    methods: {
      changeState(id, value) {
        this.$store.dispatch('changeOrderState', {id, value})
      },
      getProductName(id) {
        for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].id === id) {
            return this.products[i].name
          }
        }
      },
      deleteOrder(id) {
        console.log(id);
        let confirm =
          window.confirm(`Are you sure to delete order #${id}?`);
        if (confirm) {
          this.$store.dispatch('removeOrder', id)
        }
      },
      editOrder(order) {
        this.editingOrder = order;
        this.showEditDialog = true
      }
    }
  };
</script>

<style lang="sass">
	.border-row
		border-left: 5px solid white

		&.border-Fulfilled
			border-color: #43A047

		&.border-New
			border-color: #00B0FF

		&.border-Cancelled
			border-color: #D32F2F

		&.border-Hold
			border-color: #FDD835

		table
			td
				padding: 0 5px !important
				height: 44px !important

		.theme--dark.v-data-table
			tbody
				tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper)
					background-color: #2b2b2b !important
</style>