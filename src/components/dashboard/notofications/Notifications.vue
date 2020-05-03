<template>
	<div id="notifications">

		<v-menu
			:close-on-content-click="false"
			:offset-y="true"
			bottom
			dense
			left
			transition="slide-y-transition"
		>
			<template v-slot:activator="{ on }">
				<v-btn
					dark
					icon
					v-on="on"
				>
					<v-btn icon>
						<!--					<v-badge>5</v-badge>-->
						<v-icon>mdi-bell</v-icon>
					</v-btn>
				</v-btn>
			</template>

			<v-card
				class="mx-auto"
				id="notifications-list"
				max-width="400"
				tile
			>
				<v-list>
					<v-list-item
						@click=""
						dense
						two-line
					>
						<v-checkbox class="d-none"></v-checkbox>

						<v-list-item-content>
							<v-list-item-title>New Order Placed
								<span class="float-right">30 min ago</span></v-list-item-title>
							<v-list-item-subtitle>product name - quantity
							</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-card>
		</v-menu>
	</div>
</template>

<script>
  export default {
    name: "Notifications"
  }
</script>

<style lang="sass" scoped>
	/*#notifications*/
	/*	position: relative*/

	/*	#notifications-list*/
	/*		position: absolute*/
	/*		right: 0*/
	/*		top: 0*/

</style>