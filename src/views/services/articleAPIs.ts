import instance from '../../services/AxiosGlobal'

const getAllArticle = () => {
  return instance.get('article')
}

const getArticleDetail = (id: string) => {
  return instance.get(`article/${id}`)
}

const articleAPIs = {
  getAllArticle,
  getArticleDetail
}

export default articleAPIs
