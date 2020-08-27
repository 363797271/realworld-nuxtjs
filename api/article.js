import request from '@/utils/request'

// 获取公共文章列表
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

// 获取用户关注的文章列表
export const getYourFeedArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params,
    headers: {
      // 添加用户身份
      Authorization: `Token {token}`
    }
  })
}
