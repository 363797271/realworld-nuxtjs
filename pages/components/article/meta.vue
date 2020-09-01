<template>
  <!-- 文章相关元数据：作者、关注、点赞等 -->
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        params: {
          username: encodeURI(article.author.username)
        }
      }"
    >
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        :to="{
          name: 'profile',
          params: {
            username: encodeURI(article.author.username)
          }
        }"
        class="author"
      >
        {{ article.author.username }}
      </nuxt-link>
      <span class="date">
        {{ article.author.createdAt | date('MMM DD, YYYY') }}
      </span>
    </div>

    <!-- 文章列表展示内容 -->
    <button
      v-if="view === 'list'"
      class="btn btn-outline-primary btn-sm pull-xs-right"
      :class="{
        active: article.favorited
      }"
      @click="onFavorite"
      :disabled="article.favoritedDisabled"
    >
      <i class="ion-heart"></i>
      {{ article.favoritesCount }}
    </button>

    <!-- 文章详情页展示内容 -->
    <template v-if="view === 'detail'">
      <template v-if="user && user.username === article.author.username">
        <nuxt-link
          class="btn btn-outline-secondary btn-sm"
          :to="{
            name: 'editor',
            params: {
              slug: article.slug
            }
          }"
        >
          <i class="ion-edit"></i>
          Edit Article
        </nuxt-link>

        <button class="btn btn-outline-danger btn-sm">
          <i class="ion-trash-a"></i>
          Delete Article
        </button>
      </template>
      <template v-else>
        <button
          class="btn btn-sm"
          :class="{
            'btn-outline-secondary': !article.author.following,
            'btn-secondary': article.author.following
          }"
          @click="onFollow"
          :disabled="article.followDisabled"
        >
          <i class="ion-plus-round"></i>
          &nbsp; {{ article.author.following ? 'Unfollow' : 'Follow' }}
          {{ article.author.username }}
        </button>
        &nbsp;&nbsp;
        <button
          class="btn btn-sm"
          :class="{
            'btn-outline-primary': !article.favorited,
            'btn-primary': article.favorited
          }"
          @click="onFavorite"
          :disabled="article.favoritedDisabled"
        >
          <i class="ion-heart"></i>
          &nbsp; Favorite Post
          <span class="counter">({{ article.favoritesCount }})</span>
        </button>
      </template>
    </template>
  </div>
</template>
<script>
import { follow, unfollow } from '@/api/profile'
import { addFavorite, deleteFavorite } from '@/api/article'
import { mapState } from 'vuex'
export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      required: true
    },
    view: {
      validator(value) {
        return ['list', 'detail'].includes(value)
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  head() {
    if (this.view === 'detail') {
      return {
        title: `${this.article.title} - RealWorld`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.article.description
          }
        ]
      }
    }
  },
  methods: {
    async onFavorite() {
      if (!this.user) {
        return this.$router.push({
          name: 'login'
        })
      }
      const article = this.article
      article.favoritedDisabled = true
      if (article.favorited) {
        // 取消点赞
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount += -1
      } else {
        // 添加点赞
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favoritedDisabled = false
    },
    async onFollow() {
      if (!this.user) {
        return this.$router.push({
          name: 'login'
        })
      }
      const article = this.article
      article.followDisabled = true
      try {
        const api = article.author.following ? unfollow : follow
        const { data } = await api(article.author.username)
        article.author.following = !article.author.following
      } catch (err) {
        this.$error(err.message)
      }
      article.followDisabled = false
    }
  },
  mounted() {
    if (this.article.favoritedDisabled === undefined) {
      this.$set(this.article, 'favoritedDisabled', false)
    }
    if (this.article.followDisabled === undefined) {
      this.$set(this.article, 'followDisabled', false)
    }
  }
}
</script>

<style></style>
