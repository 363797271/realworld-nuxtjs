<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages" :key="field + index">
                {{ field }} {{ message }}
              </li>
            </template>
          </ul>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tagStr"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                @click.prevent="onSubmit"
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                :disabled="disabled"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle, getArticle, updateArticle } from '@/api/article'
export default {
  name: 'EditorIndex',

  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: 'auth',

  data() {
    return {
      slug: this.$route.params.slug,
      errors: {},
      disabled: false,
      tagStr: '',
      article: {
        title: '',
        description: '',
        body: '',
        tagList: []
      }
    }
  },
  async created() {
    if (this.slug) {
      try {
        const { data } = await getArticle(this.slug)
        this.article = data.article
      } catch (err) {
        this.$error(err.message)
      }
    }
  },
  methods: {
    async onSubmit() {
      this.disabled = true
      try {
        const request = this.slug ? updateArticle : createArticle
        const { data } = await request(
          {
            article: this.article
          },
          this.slug
        )
        const { slug } = data.article
        this.$router.push({
          name: 'article',
          params: {
            slug
          }
        })
      } catch (err) {
        const { data = {} } = err.response || {}
        const { errors = {} } = data
        this.errors = errors || []
      }
      this.disabled = false
    }
  },
  watch: {
    tagStr(val) {
      this.article.tagList = this.tagStr ? this.tagStr.split(',') : []
    }
  }
}
</script>

<style></style>
