import instance from '../../services/AxiosGlobal'

const getAllUser = () => {
  return instance.get('users')
}

const getUserDetail = (id: string) => {
  return instance.get(`users/${id}`)
}

const updatedUserDetail = (id: string, data: any) => {
  return instance.put(`users/${id}`, data)
}

const UserAPIs = {
  getAllUser,
  getUserDetail,
  updatedUserDetail
}

export default UserAPIs
