import { useState, useEffect } from 'react'

// 컨텐츠 즐겨찾기 타입
export interface ContentFavorite {
  id: string
  type: string
  projectCode: string
  projectId: string
}

// 기본 컨텐츠 즐겨찾기 데이터
const DEFAULT_CONTENT_FAVORITES: ContentFavorite[] = [
  {
    id: 'hev-25-fmc-beauty-angle-cut-1',
    type: 'Beauty Angle Cut',
    projectCode: 'CN7I(AL23)_HEV_25FMC',
    projectId: 'hev-25-fmc',
  },
  {
    id: 'hev-26-my-beauty-angle-cut-2',
    type: 'Beauty Angle Cut',
    projectCode: 'CN7I(AL23)_HEV_26MY',
    projectId: 'hev-26-my',
  },
  {
    id: 'gv80-26-my-beauty-angle-cut-3',
    type: 'Beauty Angle Cut',
    projectCode: 'GV80_26MY',
    projectId: 'gv80-26-my',
  },
]

/**
 * 즐겨찾기 관리 훅
 * 모든 페이지에서 동일한 즐겨찾기 데이터를 사용하도록 중앙 집중식 관리
 */
export function useFavorites() {
  // 프로젝트 즐겨찾기
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('project-favorites')
    if (saved) {
      try {
        return new Set(JSON.parse(saved))
      } catch {
        return new Set()
      }
    }
    return new Set()
  })

  // 컨텐츠 즐겨찾기
  const [contentFavorites, setContentFavorites] = useState<ContentFavorite[]>(() => {
    const saved = localStorage.getItem('content-favorites')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        // 파싱 실패 시 기본값 저장 후 반환
        localStorage.setItem('content-favorites', JSON.stringify(DEFAULT_CONTENT_FAVORITES))
        return DEFAULT_CONTENT_FAVORITES
      }
    }
    // localStorage에 데이터가 없으면 기본값 저장 후 반환
    localStorage.setItem('content-favorites', JSON.stringify(DEFAULT_CONTENT_FAVORITES))
    return DEFAULT_CONTENT_FAVORITES
  })

  // localStorage 변경 감지 (다른 탭이나 컴포넌트에서의 변경 사항 동기화)
  useEffect(() => {
    const handleStorageChange = () => {
      // 프로젝트 즐겨찾기 동기화
      const savedProjects = localStorage.getItem('project-favorites')
      if (savedProjects) {
        try {
          setFavorites(new Set(JSON.parse(savedProjects)))
        } catch {
          setFavorites(new Set())
        }
      } else {
        setFavorites(new Set())
      }

      // 컨텐츠 즐겨찾기 동기화
      const savedContents = localStorage.getItem('content-favorites')
      if (savedContents) {
        try {
          setContentFavorites(JSON.parse(savedContents))
        } catch {
          setContentFavorites(DEFAULT_CONTENT_FAVORITES)
        }
      } else {
        setContentFavorites(DEFAULT_CONTENT_FAVORITES)
      }
    }

    // storage 이벤트는 다른 탭에서만 발생하므로, 같은 탭 내 변경을 위해 interval 사용
    const intervalId = setInterval(handleStorageChange, 500)

    return () => clearInterval(intervalId)
  }, [])

  return {
    favorites,
    contentFavorites,
  }
}
