<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="user.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="user.username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="user.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                  required
                  v-model="user.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  required
                  minlength="8"
                  v-model="user.password"
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                @click.prevent="onSubmit"
                :disabled="disabled"
              >
                Update Settings
              </button>
            </fieldset>
          </form>

          <hr />
          <button class="btn btn-outline-danger" @click="logout">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, updateUser } from '@/api/user'
export default {
  name: 'settings',
  middleware: 'auth',
  data() {
    return {
      disabled: false,
      user: {
        bio: '',
        createdAt: '',
        email: '',
        image: '',
        username: ''
      }
    }
  },
  async created() {
    this.disabled = true
    try {
      const { data } = await getUser()
      this.user = data.user
    } catch (err) {
      this.$error(err.message)
    }
    this.disabled = false
  },
  methods: {
    async onSubmit() {
      this.disabled = true
      try {
        const { data } = await updateUser({
          user: this.user
        })
        this.$router.push({
          name: 'profile',
          params: {
            username: this.user.username
          }
        })
      } catch (err) {
        this.$error(err.message)
      }
      this.disabled = false
    },
    async logout() {
      this.$store.commit('logOut')
      this.$router.push('/')
    }
  }
}
</script>

<style></style>
