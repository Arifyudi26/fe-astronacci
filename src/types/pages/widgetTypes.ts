import type { ThemeColor } from '@core/types'
import type { OptionsMenuType } from '@core/components/option-menu/types'
import type { CustomAvatarProps } from '@core/components/mui/Avatar'

export type CardStatsVerticalProps = {
  title: string
  stats: string
  avatarIcon: string
  subtitle: string
  avatarColor?: ThemeColor
  trendNumber: string
  trend?: 'positive' | 'negative'
  avatarSkin?: CustomAvatarProps['skin']
  avatarSize?: number
  moreOptions?: OptionsMenuType
}

export type Article = {
  id: string
  title: string
  content: string
  createdAt: string | null
  user: {
    name: string
    email: string
  }
}

export type articleState = {
  articles: Article[]
  articleDetail: Article | null
  loading: boolean
  error: string | null
}

export type User = {
  name: string
  email: string
  createdAt: string
  type_membership: string
  picture: string
}

export type AuthState = {
  user: User | null
  loading: boolean
  error: string | null
}

export type UsersState = {
  users: User[]
  userDetail: User | null
  loading: boolean
  error: string | null
}

export type Video = {
  id: string
  title: string
  url: string
  createdAt: string | null
  user: {
    name: string
    email: string
  }
}

export type videoState = {
  videos: Video[]
  videoDetail: Video | null
  loading: boolean
  error: string | null
}
