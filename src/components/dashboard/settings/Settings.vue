<template>
  <div id="settings">
    <h2>Settings</h2>
    <v-card>
      <v-container>
        <!--				Shop Name -->
        <v-row>
          <v-col>
            <v-text-field label="Sop Name" hide-details="auto" v-model="settings.shopName"></v-text-field>
          </v-col>
        </v-row>

        <!--      Currency -->
        <v-row>
          <v-col>
            <v-text-field label="Currency" v-model="settings.currency"></v-text-field>
          </v-col>
        </v-row>

        <!--				Dark Theme -->
        <v-row>
          <v-col>
            <v-switch label="Dark Theme" labe v-model="settings.darkTheme" color="red"></v-switch>
          </v-col>
        </v-row>

        <v-btn class="ml-auto d-block" color="primary" @click="saveSettings">Save</v-btn>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {};
  },
  methods: {
    saveSettings() {
      this.$store.dispatch("updateSettings", this.settings);
    }
  },
  computed: {
    settings() {
      return this.$store.state.settings.settings;
    }
  },
  mounted() {
    this.$store.dispatch("getSettings");
  }
};
</script>

<style scoped>
</style>