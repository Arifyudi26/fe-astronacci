import instance from '../../services/AxiosGlobal'

const getAllVideo = () => {
  return instance.get('video')
}

const getVideoDetail = (id: string) => {
  return instance.get(`video/${id}`)
}

const videoAPIs = {
  getAllVideo,
  getVideoDetail
}

export default videoAPIs
