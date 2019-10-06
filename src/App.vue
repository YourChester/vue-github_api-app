<template>
  <v-app>
    <v-toolbar
      v-if="auth"
      flat
    >
      <v-avatar>
        <img
          :src="user.avatar_url"
          :alt="user.login"
        >
      </v-avatar>
      <v-toolbar-title class="ml-4">{{ user.login }}</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <div class="mr-6">Followers: {{user.followers}}</div>
      <div class="mr-6">Following: {{user.following}}</div>
      <v-btn
        depressed
        color="black"
        class="white--text"
        @click="exit"
      >
        Выход
      </v-btn>
    </v-toolbar>

    <v-content class="main-width">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {},
  data: () => ({
  }),
  computed: {
    ...mapGetters('user', ['auth', 'user'])
  },
  methods: {
    ...mapActions('user', ['logOut']),
    exit() {
      this.logOut()
      this.$router.push('/auth')
    }
  }
};
</script>

<style lang="scss">
header {
  flex: none !important;
}

.main {
  &-width{
    width: 1400px;
    margin: 0 auto;
  }
}
</style>