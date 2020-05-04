<template>
	<div id="overview">
		<h2>overview</h2>
		<v-row>
			<Card
				:content="cardContent"
				:key="index"
				v-for="(cardContent ,index) in cardsData"
				v-if="cardsData"
			></Card>

			<Todo :width="[4,6,12]"></Todo>
		</v-row>
	</div>
</template>

<script>
  import Card from './Card'
  import Todo from './Todo'

  export default {
    name: "Overview",
    components: {
      Card,
      Todo
    },
    data() {
      return {}
    },
    computed: {
      cardsData() {
        return [
          {
            title: 'Total products',
            subTitle: '',
            color: 'primary',
            value: this.$store.state.product.products.length,
            // [large,medium,sm]
            width: [3, 6, 6]
          },
          {
            title: 'Total categories',
            subTitle: '',
            color: 'success',
            value: this.$store.state.category.categories.length,
            // [large,medium,sm]
            width: [3, 6, 6]
          },
          {
            title: 'Total orders',
            subTitle: '',
            color: 'error',
            value: this.$store.state.orders.orders.length,
            // [large,medium,sm]
            width: [3, 6, 6]
          },
          {
            title: 'Orders past Week',
            subTitle: '',
            color: 'warning',
            value: this.$store.getters.ordersWeekly,
            // [large,medium,sm]
            width: [3, 6, 6]
          },
          {
            title: 'Since Last Week',
            subTitle: '',
            color: 'teal',
            value: [
              this.$store.getters.ordersWeekly,
              this.$store.state.orders.orders.length
            ],
            type: 'circle',
            // [large,medium,sm]
            width: [4, 6, 6]
          },
        ]
      },

    }
  }
</script>

<style scoped>

</style>