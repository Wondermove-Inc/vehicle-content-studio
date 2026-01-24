// 프로젝트 검색 Mock 데이터
export interface SearchProjectItem {
  projectCode: string
  modelYear: string
  modelName: string
  canCreateMY: boolean // MY 생성 가능 여부
}

export const SEARCH_PROJECT_MOCK: SearchProjectItem[] = [
  { projectCode: 'CN7G_HEV_25FMC', modelYear: 'OA 25', modelName: 'AVANTE(CN7)', canCreateMY: true },
  { projectCode: 'CN7_HEV_PE', modelYear: 'OA 23', modelName: 'AVANTE(CN7) PE', canCreateMY: false },
  { projectCode: 'CN7A_ICE_FMC', modelYear: 'OB 21', modelName: 'AVANTE(CN7) USA', canCreateMY: false },
  { projectCode: 'CN7A_ICE_PE', modelYear: 'OB 21', modelName: 'AVANTE(CN7) USA', canCreateMY: false },
  { projectCode: 'CN7A_ICE_FL', modelYear: 'OB 21', modelName: 'AVANTE(CN7) USA', canCreateMY: false },
  { projectCode: 'CN7_ICE_FL', modelYear: 'OB 21', modelName: 'AVANTE(CN7) USA', canCreateMY: false },
  { projectCode: 'CN7A_PE', modelYear: 'OB 21', modelName: 'AVANTE(CN7) USA', canCreateMY: false },
  { projectCode: 'CN7A_PE', modelYear: 'OB 21', modelName: 'AVANTE(CN7) USA', canCreateMY: false },
  { projectCode: 'NX4_HEV_27MY', modelYear: 'OA 27', modelName: 'TUCSON(NX4)', canCreateMY: false },
  { projectCode: 'NX4_HEV_26MY', modelYear: 'OA 26', modelName: 'TUCSON(NX4)', canCreateMY: false },
  { projectCode: 'NX4_PHEV_25FMC', modelYear: 'OA 25', modelName: 'TUCSON(NX4) PHEV', canCreateMY: true },
  { projectCode: 'LX2_ICE_27MY', modelYear: 'OA 27', modelName: 'PALISADE(LX2)', canCreateMY: false },
  { projectCode: 'LX2_ICE_26MY', modelYear: 'OA 26', modelName: 'PALISADE(LX2)', canCreateMY: false },
  { projectCode: 'LX2_ICE_25FMC', modelYear: 'OA 25', modelName: 'PALISADE(LX2)', canCreateMY: true },
  { projectCode: 'OS_EV_27MY', modelYear: 'OA 27', modelName: 'IONIQ 5(OS)', canCreateMY: false },
  { projectCode: 'OS_EV_26MY', modelYear: 'OA 26', modelName: 'IONIQ 5(OS)', canCreateMY: false },
  { projectCode: 'OS_EV_25FMC', modelYear: 'OA 25', modelName: 'IONIQ 5(OS)', canCreateMY: true },
  { projectCode: 'SX1_ICE_27MY', modelYear: 'OA 27', modelName: 'SANTA FE(SX1)', canCreateMY: false },
  { projectCode: 'SX1_HEV_26MY', modelYear: 'OA 26', modelName: 'SANTA FE(SX1) HEV', canCreateMY: false },
  { projectCode: 'SX1_PHEV_25FMC', modelYear: 'OA 25', modelName: 'SANTA FE(SX1) PHEV', canCreateMY: true },
]
