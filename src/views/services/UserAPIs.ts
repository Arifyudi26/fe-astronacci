import instance from '../../services/AxiosGlobal'

const getAllUser = () => {
  return instance.get('users')
}

const getUserDetail = (id: string) => {
  return instance.get(`users/${id}`)
}

const UserAPIs = {
  getAllUser,
  getUserDetail
}

export default UserAPIs
