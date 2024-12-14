import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { AppDispatch } from '@store/store'
import articleAPIs from '@/views/services/articleAPIs'
import type { articleState, Article } from '@/types/pages/widgetTypes'

const initialState: articleState = {
  articles: [],
  articleDetail: null,
  loading: false,
  error: null
}

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    fetchArticlesRequest: state => {
      state.loading = true
      state.error = null
    },
    fetchArticlesSuccess: (state, action: PayloadAction<Article[]>) => {
      state.articles = action.payload
      state.loading = false
      state.error = null
    },
    fetchArticlesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    fetchArticleDetailRequest: state => {
      state.loading = true
      state.error = null
    },
    fetchArticleDetailSuccess: (state, action: PayloadAction<Article>) => {
      state.articleDetail = action.payload
      state.loading = false
      state.error = null
    },
    fetchArticleDetailFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    clearUserDetail: state => {
      state.articleDetail = null
    }
  }
})

export const {
  fetchArticlesRequest,
  fetchArticlesSuccess,
  fetchArticlesFailure,
  fetchArticleDetailRequest,
  fetchArticleDetailSuccess,
  fetchArticleDetailFailure,
  clearUserDetail
} = articleSlice.actions

export default articleSlice.reducer

export const fetchAllArticles = () => async (dispatch: AppDispatch) => {
  dispatch(fetchArticlesRequest())

  try {
    const response = await articleAPIs.getAllArticle()
    const articles = response.data.data

    dispatch(fetchArticlesSuccess(articles))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch articles'

    dispatch(fetchArticlesFailure(errorMessage))
  }
}

export const fetchArticleDetail = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(fetchArticleDetailRequest())

  try {
    const response = await articleAPIs.getArticleDetail(id)
    const articleDetail = response.data

    dispatch(fetchArticleDetailSuccess(articleDetail))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user detail'

    dispatch(fetchArticleDetailFailure(errorMessage))
  }
}
