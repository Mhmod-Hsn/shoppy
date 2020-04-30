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
        <span class="hidden-sm-and-down">{{title}}</span>
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
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
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
            M
          </span>
        </v-avatar>
      </v-btn>
    </v-app-bar>


    <v-content>
      <v-container class="dashboard-content" fluid>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import firebase from 'firebase'


  export default {
    data: () => ({
      drawer: true,
      items: [
        {icon: 'mdi mdi-home', text: 'Home', component: 'Dashboard'},
        {
          icon: 'fa fa-dropbox',
          text: 'Categories',
          component: 'DashboardCategory'
        },
        {
          icon: 'mdi-chevron-up',
          'icon-alt': 'mdi-chevron-down',
          text: 'More',
          model: false,
          children: [
            {text: 'Import', component: 'Category'},
          ],
        },
      ],
    }),
    computed: {
      title() {
        return this.$store.state.title
      }
    },
    mounted() {
      let user = firebase.auth().currentUser

      if (!user) {
        this.$router.push({name: 'Login'})
      }


      //  Dark mode
      this.$vuetify.theme.dark = true

    }
  }
</script>
