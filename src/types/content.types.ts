// 컨텐츠 관련 타입 정의

export interface ContentCardData {
  id: string
  projectId: string
  projectCode: string
  contentType: string
  thumbnailUrl?: string
  timestamp?: Date
  channels: string[]
  isFavorite?: boolean
}

export interface RecentlyVisitedContent extends ContentCardData {
  visitedAt: Date
}
