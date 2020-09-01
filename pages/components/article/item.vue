<template>
  <div class="article-preview">
    <!-- 文章作者 -->
    <ArticleMeta view="list" :article="article" />
    <!-- 文章内容 -->
    <nuxt-link
      class="preview-link"
      :to="{
        name: 'article',
        params: {
          slug: article.slug
        }
      }"
    >
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li
          class="tag-default tag-pill tag-outline"
          v-for="tag in article.tagList"
          :key="tag"
        >
          {{ tag }}
        </li>
      </ul>
    </nuxt-link>
  </div>
</template>

<script>
import ArticleMeta from '@/pages/components/article/meta'
export default {
  name: 'ArticleItem',
  components: {
    ArticleMeta
  },
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style></style>
