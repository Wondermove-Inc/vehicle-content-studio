import { RecentlyVisitedContent, ContentCardData } from '@/types/content.types'

const STORAGE_KEY = 'recently-visited-contents-v3'
const MAX_ITEMS = 20 // 최대 저장 개수

/**
 * 최근 방문한 컨텐츠 기록
 */
export function addRecentlyVisitedContent(content: ContentCardData): void {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    let recentContents: RecentlyVisitedContent[] = []

    if (saved) {
      recentContents = JSON.parse(saved).map((item: any) => ({
        ...item,
        visitedAt: new Date(item.visitedAt),
      }))
    }

    // 기존에 같은 컨텐츠가 있으면 제거
    recentContents = recentContents.filter(item => item.id !== content.id)

    // 새로운 방문 기록을 맨 앞에 추가
    recentContents.unshift({
      ...content,
      visitedAt: new Date(),
    })

    // 최대 개수 제한
    if (recentContents.length > MAX_ITEMS) {
      recentContents = recentContents.slice(0, MAX_ITEMS)
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentContents))
  } catch (error) {
    console.error('Failed to save recently visited content:', error)
  }
}

/**
 * 최근 방문한 컨텐츠 목록 가져오기
 */
export function getRecentlyVisitedContents(limit?: number): RecentlyVisitedContent[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return []

    const parsed = JSON.parse(saved).map((item: any) => ({
      ...item,
      visitedAt: new Date(item.visitedAt),
    }))

    return limit ? parsed.slice(0, limit) : parsed
  } catch (error) {
    console.error('Failed to load recently visited contents:', error)
    return []
  }
}

/**
 * 최근 방문한 컨텐츠 목록 초기화
 */
export function clearRecentlyVisitedContents(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear recently visited contents:', error)
  }
}
