<template>
  <div>
    <p v-if="error">
      {{error}}
    </p>
    <input type="text" placeholder="Введите имя пользователя github" v-model="name">
  </div>
</template>

<script>
export default {
  name: "UserInput",
  data: () => ({
    name: '',
    error: '',
  }),
  methods: {
    async getUser() {
      try {
        this.error = ''
        const result = await this.axios.get(
          `https://api.github.com/users/${this.name}`
        );
      } catch (e) {
        this.error = e.message
      }
    }
  }
}
</script>

<style>

</style>