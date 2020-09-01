<template>
  <div class="home-page">
    <div class="banner" v-if="!user">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <!-- 文章导航 -->
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'your_feed'
                  }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed'
                    }
                  }"
                  exact
                >
                  Your Feed
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'global_feed'
                  }"
                  :to="{
                    name: 'home'
                  }"
                  exact
                >
                  Global Feed
                </nuxt-link>
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'tag'
                  }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag',
                      tag: tag
                    }
                  }"
                  exact
                >
                  # {{ tag }}
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-if="articles.length == 0">
            No articles are here... yet.
          </div>
          <!-- 文章列表 -->
          <ArticleItem
            v-for="article in articles"
            :key="article.slug"
            :article="article"
          />

          <!-- 分页 -->
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{
                  active: page === item
                }"
                v-for="item in totalPage"
                :key="item"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tag: tag,
                      tab: tab
                    }
                  }"
                >
                  {{ item }}
                </nuxt-link>
              </li>
            </ul>
          </nav>
        </div>
        <!-- 标签 -->
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                v-for="item in tags"
                :key="item"
                :to="{
                  name: 'home',
                  query: {
                    tag: item,
                    tab: 'tag'
                  }
                }"
                class="tag-pill tag-default"
              >
                {{ item }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles, getYourFeedArticles } from '@/api/article'
import { getTags } from '@/api/tag'
import { mapState } from 'vuex'
import ArticleItem from '@/pages/components/article/item'

export default {
  name: 'HomeIndex',
  components: { ArticleItem },
  async asyncData({ query }) {
    const page = Number.parseInt(query.page || 1)
    const limit = 10
    const tab = query.tab || 'global_feed'
    const tag = query.tag
    const loadArticles = tab === 'your_feed' ? getYourFeedArticles : getArticles

    const [articleRes, tagRes] = await Promise.all([
      loadArticles({
        limit: limit,
        offset: (page - 1) * limit,
        tag: tag
      }),
      getTags()
    ])
    const { articles, articlesCount } = articleRes.data
    let { tags } = tagRes.data
    tags = tags.slice(0, 20) // 数量太多，限制一下

    return {
      articles, // 文章列表
      articlesCount, // 文章总数
      tags, // 标签列表
      limit, // 每页大小
      page, // 页码
      tab, // 选项卡
      tag // 数据标签
    }
  },
  computed: {
    ...mapState(['user']),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  watchQuery: ['page', 'tag', 'tab']
}
</script>

<style></style>
