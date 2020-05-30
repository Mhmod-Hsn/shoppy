<template>
	<div id="notifications">

		<v-menu
			:close-on-content-click="false"
			:offset-y="true"
			bottom
			dense
			left
			transition="slide-y-transition"
			@change="$('html').style.overflow='none'"
		>
			<template v-slot:activator="{ on }">
				<v-badge
					:content="unreadNotifications"
					:value="unreadNotifications"
					bordered
					class="notifications-count-badge"
					color="error"
				>
					<v-btn
						icon
						v-on="on"
					>
						<v-icon>mdi-bell</v-icon>
					</v-btn>
				</v-badge>
			</template>
			<v-card
				class="mx-auto"
				id="notifications-list"
				max-width="400"
				tile
			>
				<v-list>
					<v-subheader>Notifications</v-subheader>

					<perfect-scrollbar
						scrollYMarginOffset="200"
						style="max-height: 300px; overflow-y: scroll;"
						v-scroll
					>

						<v-list-item-group>
							<v-list-item
								:class="{'primary darken-4': !notification.read}"
								:key="notification.id"
								class="bg-primary"
								dense
								two-line
								v-for="notification in notifications"
							>
								<v-list-item-action>
									<v-checkbox
										@click.self="changeNotificationState(notification.id,notification.read)"
										color="primary"
										v-model="notification.read"
									></v-checkbox>
								</v-list-item-action>
								<v-list-item-content>
									<v-list-item-title>
										New Order Placed
										<span class="float-right">
											{{notification.timestamp | fromTheMoment}}
										</span>
									</v-list-item-title>
									<v-list-item-subtitle>
										{{getProductFromId(notification.product)}} -
										{{notification.quantity}}

									</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
						</v-list-item-group>


						<div class="pa-0 ma-0 text-center">
							<v-btn
								:loading="loadingState"
								@click="loadMoreNotifications" block class="py-2" depressed
								small
								text
								v-if="showLoadMore">
								load more
							</v-btn>
							<p class="my-3" v-else>No more data</p>
						</div>
					</perfect-scrollbar>
				</v-list>
			</v-card>
		</v-menu>
	</div>
</template>

<script>
  export default {
    name: "Notifications",
	  data(){
      return{
        menuState: false
      }
	  },
    computed: {
      notifications() {
        return this.$store.state.notifications.notifications
      },
      unreadNotifications() {
        return this.$store.getters.unreadNotifications
      },
      showLoadMore() {
        return this.$store.state.notifications.showLoadMore
      },
      loadingState() {
        return this.$store.state.notifications.loadingState
      }
    },
    methods: {
      changeNotificationState(id, value) {
        value = !value;
        console.log(value);
        this.$store.dispatch('changeNotificationState', {id, value})
      },
      getProductFromId(id) {
        return this.$store.getters.getProductFromId(id)
      },
      loadMoreNotifications() {
        this.$store.dispatch('getNotifications')
      },
    },
  }

</script>

<style lang="sass">
	#notifications
		.v-subheader
			height: 26px

		.v-badge__wrapper
			span
				position: absolute !important
				bottom: auto !important
				left: 0px !important
				right: auto !important
				top: 5px !important

		.v-menu__content
			.v-list-item:not(:last-of-type)
				/*border-bottom: 1px solid rgba(255, 255, 255, 0.1)*/


</style>