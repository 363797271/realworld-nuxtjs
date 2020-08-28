<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <!-- 文章元信息 -->
        <article-meta :article="article"></article-meta>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <!-- 内容支持markdown -->
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <!-- 文章元信息 -->
        <article-meta :article="article"></article-meta>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <!-- 评论提交和展示列表 -->
          <article-components :article="article"></article-components>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
import MarkdownIt from 'markdown-it'
import ArticleMeta from './components/article-meta'
import ArticleComponents from './components/article-components'

export default {
  name: 'ArticleIndex',
  components: { ArticleMeta, ArticleComponents },
  async asyncData({ params }) {
    const { data } = await getArticle(params.slug)
    const { article } = data

    // 创建markdown渲染器
    const md = new MarkdownIt()
    article.body = md(article.body)

    return {
      article
    }
  }
}
</script>

<style></style>
