import { EChartsOption } from 'echarts'
import { ReactNode } from 'react'

export interface EchartsInfo {
    options: EChartsOption,
    showLoading: boolean
}

export interface StatisticInfo {
    value: number,
    suffix: ReactNode,
    prefix: ReactNode,
    color: string,
    fontSize: number,
    precision: number
}