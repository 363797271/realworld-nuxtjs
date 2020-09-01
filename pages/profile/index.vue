<template>
  <div class="profile-page">
    <!-- 作者信息 -->
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>{{ profile.bio }}</p>
            <!-- follow按钮 -->
            <button
              v-if="profile.username !== user.username"
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="onFollow"
              :disabled="followDisabled"
            >
              <i class="ion-plus-round"></i>
              &nbsp; {{ profile.following ? 'Unfollow' : 'Follow' }}
              {{ profile.username }}
            </button>
            <!-- edit链接 -->
            <nuxt-link
              v-else
              class="btn btn-sm btn-outline-secondary action-btn"
              :to="{
                name: 'settings'
              }"
            >
              <i class="ion-gear-a"></i>
              Edit Profile Settings
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <!-- 导航 -->
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'my'
                  }"
                  :to="{
                    name: 'profile',
                    params: {
                      username: username
                    },
                    query: {
                      tab: 'my'
                    }
                  }"
                  exact
                >
                  My Articles
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'favorited'
                  }"
                  :to="{
                    name: 'profile',
                    params: {
                      username: username
                    },
                    query: {
                      tab: 'favorited'
                    }
                  }"
                  exact
                >
                  Favorited Articles
                </nuxt-link>
              </li>
            </ul>
          </div>

          <!-- 文章列表 -->
          <div v-show="articles.length > 0">
            <!-- 文章列表 -->
            <ArticleItem
              v-for="article in articles"
              :key="article.slug"
              :article="article"
            />
          </div>

          <div class="article-preview" v-show="articles.length === 0">
            No articles are here... yet.
          </div>

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
                    name: 'profile',
                    params: {
                      username: username
                    },
                    query: {
                      page: item,
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getProfile, follow, unfollow } from '@/api/profile'
import { getArticles } from '@/api/article'
import ArticleItem from '@/pages/components/article/item'
export default {
  name: 'ProfileIndex',
  components: { ArticleItem },
  data() {
    return {
      followDisabled: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  async asyncData({ params, query, redirect }) {
    const username = params.username
    if (!username) {
      redirect('/')
    }

    const tab = query.tab || 'my'
    const page = parseInt(query.page) || 1
    const limit = 5

    const body = {
      limit: limit,
      offset: (page - 1) * limit
    }
    if (tab === 'favorited') {
      body.favorited = encodeURI(username)
    } else {
      body.author = encodeURI(username)
    }

    try {
      const [proRes, artRes] = await Promise.all([
        getProfile(username),
        getArticles(body)
      ])
      const profile = proRes.data.profile
      const articles = artRes.data.articles
      const totalPage = Math.ceil(artRes.data.articlesCount / limit)
      return {
        username,
        tab,
        page,
        articles,
        totalPage,
        profile
      }
    } catch (err) {
      redirect('/')
    }
  },
  watchQuery: ['tab', 'page'],
  methods: {
    async onFollow() {
      if (!this.user) {
        return this.$router.push({
          name: 'login'
        })
      }
      this.followDisabled = true
      try {
        const api = this.profile.following ? unfollow : follow
        const { data } = await api(this.username)
        this.profile.following = !this.profile.following
      } catch (err) {
        this.$error(err.message)
      }
      this.followDisabled = false
    }
  }
}
</script>

<style></style>
