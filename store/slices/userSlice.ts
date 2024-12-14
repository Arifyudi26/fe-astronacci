import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { AppDispatch } from '@store/store'
import UserAPIs from '@/views/services/UserAPIs'
import type { UsersState, User } from '@/types/pages/widgetTypes'

const initialState: UsersState = {
  users: [],
  userDetail: null,
  loading: false,
  error: null
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersRequest: state => {
      state.loading = true
      state.error = null
    },
    fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload
      state.loading = false
      state.error = null
    },
    fetchUsersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    fetchUserDetailRequest: state => {
      state.loading = true
      state.error = null
    },
    fetchUserDetailSuccess: (state, action: PayloadAction<User>) => {
      state.userDetail = action.payload
      state.loading = false
      state.error = null
    },
    fetchUserDetailFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    clearUserDetail: state => {
      state.userDetail = null
    }
  }
})

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchUserDetailRequest,
  fetchUserDetailSuccess,
  fetchUserDetailFailure,
  clearUserDetail
} = userSlice.actions

export default userSlice.reducer

export const fetchAllUsers = () => async (dispatch: AppDispatch) => {
  dispatch(fetchUsersRequest())

  try {
    const response = await UserAPIs.getAllUser()
    const users = response.data.data

    dispatch(fetchUsersSuccess(users))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch users'

    dispatch(fetchUsersFailure(errorMessage))
  }
}

export const fetchUserDetail = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(fetchUserDetailRequest())

  try {
    const response = await UserAPIs.getUserDetail(id)
    const userDetail = response.data

    dispatch(fetchUserDetailSuccess(userDetail))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user detail'

    dispatch(fetchUserDetailFailure(errorMessage))
  }
}
