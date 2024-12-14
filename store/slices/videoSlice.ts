import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { AppDispatch } from '@store/store'
import videoAPIs from '@/views/services/videoAPIs'
import type { videoState, Video } from '@/types/pages/widgetTypes'

const initialState: videoState = {
  videos: [],
  videoDetail: null,
  loading: false,
  error: null
}

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    fetchVideosRequest: state => {
      state.loading = true
      state.error = null
    },
    fetchVideosSuccess: (state, action: PayloadAction<Video[]>) => {
      state.videos = action.payload
      state.loading = false
      state.error = null
    },
    fetchVideosFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    fetchVideosDetailRequest: state => {
      state.loading = true
      state.error = null
    },
    fetchVideosDetailSuccess: (state, action: PayloadAction<Video>) => {
      state.videoDetail = action.payload
      state.loading = false
      state.error = null
    },
    fetchVideosDetailFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    clearUserDetail: state => {
      state.videoDetail = null
    }
  }
})

export const {
  fetchVideosRequest,
  fetchVideosSuccess,
  fetchVideosFailure,
  fetchVideosDetailRequest,
  fetchVideosDetailSuccess,
  fetchVideosDetailFailure,
  clearUserDetail
} = videoSlice.actions

export default videoSlice.reducer

export const fetchAllVideos = () => async (dispatch: AppDispatch) => {
  dispatch(fetchVideosRequest())

  try {
    const response = await videoAPIs.getAllVideo()
    const videos = response.data.data

    dispatch(fetchVideosSuccess(videos))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch videos'

    dispatch(fetchVideosFailure(errorMessage))
  }
}

export const fetchVideosDetail = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(fetchVideosDetailRequest())

  try {
    const response = await videoAPIs.getVideoDetail(id)
    const videoDetail = response.data

    dispatch(fetchVideosDetailSuccess(videoDetail))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user detail'

    dispatch(fetchVideosDetailFailure(errorMessage))
  }
}
