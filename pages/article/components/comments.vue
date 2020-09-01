<template>
  <div>
    <p v-if="!user">
      <nuxt-link
        :to="{
          name: 'login'
        }"
      >
        Sign in
      </nuxt-link>
      or
      <nuxt-link
        :to="{
          name: 'register'
        }"
      >
        sign up
      </nuxt-link>
      to add comments on this article.
    </p>

    <form class="card comment-form" v-if="user">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="comment.body"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button
          @click.prevent="addComment"
          :disabled="addDisabled"
          class="btn btn-sm btn-primary"
        >
          Post Comment
        </button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username
            }
          }"
          class="comment-author"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username
            }
          }"
          class="comment-author"
        >
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">
          {{ comment.createdAt | date('MMM DD, YYYY') }}
        </span>
        <span class="mod-options" v-show="comment.author.username === username">
          <i class="ion-trash-a" @click="deleteComment(comment.id)"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, deleteComment, addComment } from '@/api/article'
import { mapState } from 'vuex'
export default {
  name: 'ArticleComments',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      comments: [], // 文章列表
      deleteDisabled: false,
      addDisabled: false,
      comment: {
        body: ''
      }
    }
  },
  computed: {
    ...mapState(['user']),
    username() {
      if (this.user) {
        return this.user.username
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      try {
        const { data } = await getComments(this.article.slug)
        this.comments = data.comments
      } catch (err) {
        this.$error(err.message)
      }
    },
    async deleteComment(id) {
      if (this.deleteDisabled) return
      this.deleteDisabled = true
      try {
        await deleteComment(this.article.slug, id)
        const findIndex = this.comments.findIndex(v => v.id === id)
        if (findIndex !== -1) {
          this.comments.splice(findIndex, 1)
        }
      } catch (err) {
        this.$error(err.message)
      }
      this.deleteDisabled = false
    },
    async addComment() {
      this.addDisabled = true
      try {
        await addComment(this.article.slug, {
          comment: this.comment
        })
        this.comment.body = ''
        this.init()
      } catch (err) {
        let msg = err.message
        if (err.response && err.response.data && err.response.data.errors) {
          msg = ''
          const errors = err.response.data.errors
          for (let key in errors) {
            console.log(key)
            errors[key].forEach(v => {
              msg += `${key} ${v};`
            })
          }
        }
        this.$error(msg)
      }
      this.addDisabled = false
    }
  }
}
</script>

<style></style>
