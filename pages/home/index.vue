<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link disabled" href="">Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="">Global Feed</a>
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
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
                  class="author"
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username
                    }
                  }"
                >
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">{{ article.createdAt }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{
                  active: article.favorited
                }"
              >
                <i class="ion-heart"></i>
                {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              class="preview-link"
              :to="{
                name: 'article',
                params: article.slug
              }"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <a href="" class="tag-pill tag-default">programming</a>
              <a href="" class="tag-pill tag-default">javascript</a>
              <a href="" class="tag-pill tag-default">emberjs</a>
              <a href="" class="tag-pill tag-default">angularjs</a>
              <a href="" class="tag-pill tag-default">react</a>
              <a href="" class="tag-pill tag-default">mean</a>
              <a href="" class="tag-pill tag-default">node</a>
              <a href="" class="tag-pill tag-default">rails</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { getArticles } from '@/api/article'
export default {
  name: 'home',
  async asyncData() {
    // const { data } = await getArticles()

    let data = {
      articles: [
        {
          title: 'front end',
          slug: 'front-end-wxzwgn',
          body: 'rrrrrrrrrrrrrrrrrrrrrrrrrrr',
          createdAt: '2020-08-27T09:01:23.606Z',
          updatedAt: '2020-08-27T09:01:23.606Z',
          tagList: [],
          description: 'rrrr',
          author: {
            username: 'jake',
            bio: 'I work at statefarm',
            image: 'https://i.stack.imgur.com/xHWG8.jpg',
            following: false
          },
          favorited: false,
          favoritesCount: 0
        },
        {
          title: 'front end',
          slug: 'front-end-9mvmcd',
          body: 'rrrrrrrrrrrrrrrrrrrrrrrrrrr',
          createdAt: '2020-08-27T09:01:23.604Z',
          updatedAt: '2020-08-27T09:01:23.604Z',
          tagList: [],
          description: 'rrrr',
          author: {
            username: 'jake',
            bio: 'I work at statefarm',
            image: 'https://i.stack.imgur.com/xHWG8.jpg',
            following: false
          },
          favorited: false,
          favoritesCount: 0
        },
        {
          title: 'front end',
          slug: 'front-end-mnf7i',
          body: 'rrrrrrrrrrrrrrrrrrrrrrrrrrr',
          createdAt: '2020-08-27T09:01:02.181Z',
          updatedAt: '2020-08-27T09:01:02.181Z',
          tagList: [],
          description: 'rrrr',
          author: {
            username: 'jake',
            bio: 'I work at statefarm',
            image: 'https://i.stack.imgur.com/xHWG8.jpg',
            following: false
          },
          favorited: false,
          favoritesCount: 0
        },
        {
          title: 'front end',
          slug: 'front-end-o59750',
          body: 'rrrrrrrrrrrrrrrrrrrrrrrrrrr',
          createdAt: '2020-08-27T09:01:01.719Z',
          updatedAt: '2020-08-27T09:01:01.719Z',
          tagList: [],
          description: 'rrrr',
          author: {
            username: 'jake',
            bio: 'I work at statefarm',
            image: 'https://i.stack.imgur.com/xHWG8.jpg',
            following: false
          },
          favorited: false,
          favoritesCount: 0
        },
        {
          title: 'front end',
          slug: 'front-end-yqkeyi',
          body: 'rrrrrrrrrrrrrrrrrrrrrrrrrrr',
          createdAt: '2020-08-27T08:58:03.646Z',
          updatedAt: '2020-08-27T08:58:03.646Z',
          tagList: [],
          description: 'rrrr',
          author: {
            username: 'jake',
            bio: 'I work at statefarm',
            image: 'https://i.stack.imgur.com/xHWG8.jpg',
            following: false
          },
          favorited: false,
          favoritesCount: 0
        },
        {
          title: 'rrjdj',
          slug: 'rrjdj-4nqn8q',
          body: 'gegege',
          createdAt: '2020-08-27T08:49:30.467Z',
          updatedAt: '2020-08-27T08:49:30.467Z',
          tagList: [],
          description: 'ushdd',
          author: {
            username: 'jake',
            bio: 'I work at statefarm',
            image: 'https://i.stack.imgur.com/xHWG8.jpg',
            following: false
          },
          favorited: false,
          favoritesCount: 0
        },
        {
          title: 'API request test',
          slug: 'api-request-test-80wvhj',
          body: 'this is body',
          createdAt: '2020-08-27T08:28:50.394Z',
          updatedAt: '2020-08-27T08:28:50.394Z',
          tagList: [],
          description: 'this is description API TESTING',
          author: {
            username: 'jake',
            bio: 'I work at statefarm',
            image: 'https://i.stack.imgur.com/xHWG8.jpg',
            following: false
          },
          favorited: false,
          favoritesCount: 0
        },
        {
          title: 'we',
          slug: 'we-4oavec',
          body: 'ewew',
          createdAt: '2020-08-27T08:13:55.488Z',
          updatedAt: '2020-08-27T08:13:55.488Z',
          tagList: [],
          description: 'we',
          author: {
            username: 'jake',
            bio: 'I work at statefarm',
            image: 'https://i.stack.imgur.com/xHWG8.jpg',
            following: false
          },
          favorited: false,
          favoritesCount: 0
        },
        {
          title: "what's wrong?",
          slug: 'what-s-wrong-a5euzy',
          body: '---',
          createdAt: '2020-08-27T08:03:41.908Z',
          updatedAt: '2020-08-27T08:03:41.908Z',
          tagList: [],
          description: '-.-',
          author: {
            username: 'jake',
            bio: 'I work at statefarm',
            image: 'https://i.stack.imgur.com/xHWG8.jpg',
            following: false
          },
          favorited: false,
          favoritesCount: 0
        },
        {
          title: 'fdsfds',
          slug: 'fdsfds-vnmv93',
          body: 'zdfsdf',
          createdAt: '2020-08-27T02:57:06.409Z',
          updatedAt: '2020-08-27T02:57:06.409Z',
          tagList: [],
          description: 'asdfasdf',
          author: {
            username: 'jake',
            bio: 'I work at statefarm',
            image: 'https://i.stack.imgur.com/xHWG8.jpg',
            following: false
          },
          favorited: false,
          favoritesCount: 0
        },
        {
          title: 'I love Cypress',
          slug: 'i-love-cypress-zicf0h',
          body: 'Are we humans? Or are we dancers?',
          createdAt: '2020-08-27T02:35:50.644Z',
          updatedAt: '2020-08-27T02:35:50.644Z',
          tagList: [],
          description: 'Testing Cypress',
          author: {
            username: 'jake',
            bio: 'I work at statefarm',
            image: 'https://i.stack.imgur.com/xHWG8.jpg',
            following: false
          },
          favorited: false,
          favoritesCount: 0
        },
        {
          title: 'I love Cypress',
          slug: 'i-love-cypress-ml3tp4',
          body: 'Are we humans? Or are we dancers?',
          createdAt: '2020-08-27T02:35:48.014Z',
          updatedAt: '2020-08-27T02:35:48.014Z',
          tagList: [],
          description: 'Testing Cypress',
          author: {
            username: 'jake',
            bio: 'I work at statefarm',
            image: 'https://i.stack.imgur.com/xHWG8.jpg',
            following: false
          },
          favorited: false,
          favoritesCount: 0
        },
        {
          title: 'I love Cypress',
          slug: 'i-love-cypress-t1fv98',
          body: 'Are we humans? Or are we dancers?',
          createdAt: '2020-08-27T02:35:45.154Z',
          updatedAt: '2020-08-27T02:35:45.154Z',
          tagList: [],
          description: 'Testing Cypress',
          author: {
            username: 'jake',
            bio: 'I work at statefarm',
            image: 'https://i.stack.imgur.com/xHWG8.jpg',
            following: false
          },
          favorited: false,
          favoritesCount: 0
        },
        {
          title: 'Blablabla',
          slug: 'blablabla-bizxo8',
          body: 'balblablab',
          createdAt: '2020-08-27T02:29:39.155Z',
          updatedAt: '2020-08-27T02:29:39.155Z',
          tagList: [],
          description: 'Yes',
          author: {
            username: 'jake',
            bio: 'I work at statefarm',
            image: 'https://i.stack.imgur.com/xHWG8.jpg',
            following: false
          },
          favorited: false,
          favoritesCount: 0
        },
        {
          title: 'I love Cypress',
          slug: 'i-love-cypress-55hvqi',
          body: 'Are we humans? Or are we dancers?',
          createdAt: '2020-08-27T02:29:30.120Z',
          updatedAt: '2020-08-27T02:29:30.120Z',
          tagList: [],
          description: 'Testing Cypress',
          author: {
            username: 'jake',
            bio: 'I work at statefarm',
            image: 'https://i.stack.imgur.com/xHWG8.jpg',
            following: false
          },
          favorited: false,
          favoritesCount: 0
        },
        {
          title: 'k;',
          slug: 'k-de9153',
          body: 'kkk',
          createdAt: '2020-08-27T01:35:01.384Z',
          updatedAt: '2020-08-27T01:35:01.384Z',
          tagList: [],
          description: 'kkk',
          author: {
            username: 'jake',
            bio: 'I work at statefarm',
            image: 'https://i.stack.imgur.com/xHWG8.jpg',
            following: false
          },
          favorited: false,
          favoritesCount: 0
        },
        {
          title: 'jjj',
          slug: 'jjj-ttkclb',
          body: ';lm',
          createdAt: '2020-08-27T01:33:26.695Z',
          updatedAt: '2020-08-27T01:33:26.695Z',
          tagList: [],
          description: 'k',
          author: {
            username: 'jake',
            bio: 'I work at statefarm',
            image: 'https://i.stack.imgur.com/xHWG8.jpg',
            following: false
          },
          favorited: false,
          favoritesCount: 1
        },
        {
          title: 'jjj',
          slug: 'jjj-mwzqq1',
          body: ';lm',
          createdAt: '2020-08-27T01:33:26.264Z',
          updatedAt: '2020-08-27T01:33:26.264Z',
          tagList: [],
          description: 'k',
          author: {
            username: 'jake',
            bio: 'I work at statefarm',
            image: 'https://i.stack.imgur.com/xHWG8.jpg',
            following: false
          },
          favorited: false,
          favoritesCount: 1
        },
        {
          title: 'jjj',
          slug: 'jjj-6004z8',
          body: ';lm',
          createdAt: '2020-08-27T01:33:25.587Z',
          updatedAt: '2020-08-27T01:33:25.587Z',
          tagList: [],
          description: 'k',
          author: {
            username: 'jake',
            bio: 'I work at statefarm',
            image: 'https://i.stack.imgur.com/xHWG8.jpg',
            following: false
          },
          favorited: false,
          favoritesCount: 1
        },
        {
          title: 'jjj',
          slug: 'jjj-t6k862',
          body: ';lm',
          createdAt: '2020-08-27T01:33:24.690Z',
          updatedAt: '2020-08-27T01:33:24.690Z',
          tagList: [],
          description: 'k',
          author: {
            username: 'jake',
            bio: 'I work at statefarm',
            image: 'https://i.stack.imgur.com/xHWG8.jpg',
            following: false
          },
          favorited: false,
          favoritesCount: 1
        }
      ],
      articlesCount: 500
    }
    return {
      articles: data.articles,
      articlesCount: data.articlesCount
    }
  }
}
</script>

<style></style>
