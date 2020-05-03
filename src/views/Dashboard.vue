<template>
  <v-app id="inspire">
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      v-model="drawer"
    >
      <v-list dense>
        <template v-for="item in items">
          <v-row
            :key="item.heading"
            align="center"
            v-if="item.heading"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
              class="text-center"
              cols="6"
            >
              <a
                class="body-2 black--text"
                href="#!"
              >EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            :to="{name: item.component}"
            append-icon=""
            exact
            v-else-if="item.children"
            v-model="item.model"
          >
            <template v-slot:activator>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </template>
            <v-list-item
              :key="i"
              :to="{name: item.component}"
              exact
              link
              v-for="(child, i) in item.children"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            :key="item.text"
            :to="{name: item.component}"
            exact
            link
            v-else
          >
            <v-list-item-action>
              <i :class="item.icon"></i>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title
        class="ml-0 pl-4"
        style="width: 300px"
      >
        <span class="hidden-sm-and-down">{{$store.state.settings.settings.shopName}}</span>
      </v-toolbar-title>
      <v-text-field
        class="hidden-sm-and-down"
        flat
        hide-details
        label="Search"
        prepend-inner-icon="mdi-magnify"
        solo-inverted
      />
      <v-spacer/>
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <Notifications class="mx-5"></Notifications>
      <v-btn
        icon
        large
      >
        <v-avatar
          color="primary"
          item
          size="38px"
        >
          <span class="headline">
            {{this.$store.getters.currentUser}}
          </span>
        </v-avatar>
      </v-btn>
    </v-app-bar>


    <v-content>
      <v-container class="dashboard-content" fluid>
	      <transition mode="out-in" name="slide-fade">
		      <router-view/>
	      </transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import {fb} from '@/firebase/init'
  import Notifications
    from './../components/dashboard/notofications/Notifications'

  export default {
    components: {
      Notifications,
    },
    data: () => ({
      drawer: true,
      items: [
        {
          icon: 'mdi mdi-home',
          text: 'Overview',
          component: 'Dashboard'
        },
        {
          icon: 'fa fa-th',
          text: 'Products',
          component: 'DashboardProducts'
        },
        {
          icon: 'fa fa-dropbox',
          text: 'Categories',
          component: 'DashboardCategory'
        },
        {
          icon: 'fa fa-shopping-cart',
          text: 'Orders',
          component: 'DashboardOrders'
        },
        {
          icon: 'fa fa-gear',
          text: 'Settings',
          component: 'DashboardSettings'
        },
      ],
    }),
    methods: {},
    computed: {
      darkTheme() {
        return this.$store.state.settings.settings.darkTheme
      }
    },
    mounted() {
      this.$store.dispatch('getCategories');
      this.$store.dispatch('getSettings');
      this.$store.dispatch('getProducts');
      this.$store.dispatch("getOrders");
      this.$store.dispatch("getNotifications");



      this.$vuetify.theme.dark = this.$store.state.settings.settings.darkTheme;
      let user = fb.auth().currentUser;

      if (!user) {
        this.$router.push({name: 'Login'})
      }
    },
    watch: {
      darkTheme(newValue, oldValue) {
        this.$vuetify.theme.dark = newValue
      },
    }
  }
</script>
