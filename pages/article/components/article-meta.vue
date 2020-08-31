<template>
  <!-- 文章相关元数据：作者、关注、点赞等 -->
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        params: {
          username: article.author.username
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
            username: article.author.username
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
    <template v-if="user">
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
        class="btn btn-sm btn-outline-secondary"
        :class="{
          active: article.author.following
        }"
      >
        <i class="ion-plus-round"></i>
        &nbsp; Follow Eric Simons
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{
          active: article.author.favorited
        }"
      >
        <i class="ion-heart"></i>
        &nbsp; Favorite Post
        <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </template>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'ArticleMeata',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  head() {
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
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style></style>
