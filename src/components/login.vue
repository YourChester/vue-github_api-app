<template>
  <v-card class="form">
    <v-form ref="loginform">
      <v-layout
        class="pa-6"
        align-center
        justify-center
        column
      >
        <v-flex class="form-flex">
          <v-alert
            v-if="error"
            outlined
            type="error"
          >
            {{error}}
          </v-alert>
        </v-flex>

        <v-flex class="form-flex">
          <v-text-field
            label="Username"
            color="green"
            v-model="form.username"
            :rules="rules"
          ></v-text-field>
        </v-flex>
        <v-flex class="form-flex">
          <v-text-field
            label="Password"
            color="green"
            type="password"
            v-model="form.password"
            :rules="rules"
          ></v-text-field>
        </v-flex>
        <v-flex class="form-flex">
          <v-btn
            depressed
            block
            color="green"
            class="white--text"
            :disabled="loading"
            :loading="loading"
            @click="authGitHub"
          >
            Войти
          </v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginGitHub',
  data: () => ({
    form: {
      username: '',
      password: '',
    },
    valid: true,
    loading: false,
    error: '',
    rules: [
      v => !!v || 'Обязательное поле',
    ]
  }),
  methods: {
    ...mapActions('user', ['auth']),
    async authGitHub() {
      try {
        if (!this.$refs.loginform.validate()) {
          return;
        }

        this.loading = true;
        this.erroe = '';

        await this.axios.get('https://api.github.com/authorizations', {
          auth: {
            username: this.form.username,
            password: this.form.password,
          },
        })
        
        const result = await this.axios.get('https://api.github.com/user', {
          auth: {
            username: this.form.username,
            password: this.form.password,
          },
        })
        this.auth({auth: this.form, user: result.data})

        this.$router.push('/')
      } catch (e) {
        this.error = 'Неверный логин или пароль'
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style lang="scss">
.form {
  width: 800px;
  position: absolute;
  top: calc(50% - 150px);
  left: calc(50% - 400px);

  &-flex {
    width: 400px !important;
  }
}
</style>