import { EChartsOption } from 'echarts'
import * as echarts from 'echarts'
import WaterMarkImg from '@/assets/images/logo.png'
import { formatStringToUppercase, handleNumbersSeparated, textWrap } from '@/utils'

// 折线图
export const getAllTimeActivityOptions = (
    data1: any[] = [], 
    data2: any[] = [],
    seriesTitle1: string = '',
    seriesTitle2: string = '',
) => {
    const options: EChartsOption = {
        title: {
            show: false,
            left: 'center',
            text: 'Tootip and dataZoom on Mobile Device'
        },
        legend: {
            top: 'bottom',
            data: ['Intention'],
            show: false
        },
        graphic: [
            {
                type: 'image',
                silent: true,
                left: 'center',
                top: 'middle',
                z: 100,
                style: {
                    image: WaterMarkImg,
                    width: 120,
                }
            }
        ],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            confine: true,
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            textStyle: {
                fontSize: 15, //设置字体大小
                color: '#000'
            },
        },
        toolbox: {
            show: false,
            left: 'center',
            itemSize: 25,
            top: 55,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {}
            }
        },
        xAxis: {
            type: 'time',
            axisPointer: {
                type: 'line',
                value: '2016-10-08',
                snap: true,
                lineStyle: {
                    type: [5, 20],
                    dashOffset: 20,
                    color: '#58CFFF',
                    width: 2
                },
                label: {
                    show: true,
                    formatter: function (params: any) {
                        return echarts.format.formatTime('yyyy-MM-dd', params.value);
                    },
                    backgroundColor: '#7581BD'
                },
                handle: {
                    show: true,
                    color: '#7581BD'
                }
            },
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            axisTick: {
                inside: true
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#3E434E'
                }
                
            },
            axisLabel: {
                inside: true,
                formatter: '{value}\n'
            },
            z: 10
        },
        grid: {
            top: 0,
            left: 15,
            right: 15,
            bottom: 40
        },
        dataZoom: [
            {
                type: 'inside',
                throttle: 50
            }
        ],
        series: [
            {
                name: seriesTitle1,
                type: 'line',
                symbol: 'none',
                symbolSize: 5,
                sampling: 'average',
                lineStyle: {
                    color: '#4583ff',
                },
                itemStyle: {
                    color: '#4583ff' // 折线拐点颜色
                },
                stack: 'a',
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: '#D2DAEB'
                        },
                        {
                            offset: 1,
                            color: '#FFFDFA'
                        }
                    ])
                },
                data: data1
            },
            {
                name: seriesTitle2,
                type: 'line',
                stack: 'a',
                symbol: 'none',
                symbolSize: 5,
                lineStyle: {
                    color: '#f0b90a',
                },
                sampling: 'average',
                itemStyle: {
                    color: '#f0b90a', // 折线拐点颜色
                    borderWidth: 90
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: '#FDF3D6' 
                        },
                        {
                            offset: 1,
                            color:'#FEF8EA'
                        }
                    ])
                },
                data: data2 
            },
        ]
    }
    return options
}

// 双柱状图和折线图组合
export const getActiveUserOptions = (xAxis: any[] = [], data1: any[] = [], data2: any[] = [], data3: any[] = []) => {
    const options: EChartsOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            confine: true,
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            textStyle: {
                fontSize: 15, //设置字体大小
                color: '#000'
            },
            formatter: function (params: any) {
                let str = params[0].axisValue + "<br />"
                params.forEach((item: any) => {
                    let value = item.value
                    if(!value && value !==0) return 0
                    let val = value.toString()
                    let reg = val.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
                    let valStr = val.replace(reg,"$1,")

                    str +=
                    '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:'
                    + item.color
                    + '"></span>' 
                    + item.seriesName + " : "
                    + valStr + "<br />"
                })
                return str
            }
        },
        toolbox: {
            show: false
        },
        graphic: [
            {
                type: 'image',
                silent: true,
                left: 'center',
                top: 'middle',
                z: 100,
                style: {
                    image: WaterMarkImg,
                    width: 120,
                }
            }
        ],
        legend: {
            show: false
        },
        grid: {
            top: '10',
            left: '10',
            right: '10',
            bottom: '10',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: xAxis,
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '',
                min: 0,
                axisLabel: {
                    formatter: '{value}'
                },
                splitLine: { 
                    show: true,
                    lineStyle: {
                        type: 'solid',
                        color: '#3E434E'
                    }
                }
            },
            {
                type: 'value',
                name: '',
                min: 0,
                axisLabel: {
                    formatter: '{value}'
                },
                splitLine: { 
                    show: true,
                    lineStyle: {
                        type: 'solid',
                        color: '#3E434E'
                    }
                }
            }
        ],
        series: [
            {
                name: 'Active User',
                type: 'bar',
                color: ['#23B899'],
                data: data1
            },
            {
                name: 'New User',
                type: 'bar',
                color: ['#4583FF'],
                data:  data2
            },
            {
                name: 'Total User',
                type: 'line',
                yAxisIndex: 1,
                lineStyle: {
                    color: '#FFD302',
                },
                itemStyle: {
                    color: '#FFD302', // 折线拐点颜色
                },
                data: data3
            }
        ]
    }
    return options
}

// 柱状图
export const getActiveUserTransactionsOptions = (xAxis: any[] = [], data1: any[] = [], data2: any[] = []) => {
    const options: EChartsOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            confine: true,
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            textStyle: {
                fontSize: 15, //设置字体大小
                color: '#000'
            },
            formatter: function (params: any) {
                let str = params[0].axisValue + "<br />"
                params.forEach((item: any) => {
                    let value = item.value
                    if(!value && value !==0) return 0
                    let val = value.toString()
                    let reg = val.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
                    let valStr = val.replace(reg,"$1,")

                    str +=
                    '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:'
                    + item.color
                    + '"></span>' 
                    + item.seriesName + " : "
                    + valStr + "<br />"
                })
                return str
            }
        },
        toolbox: {
            show: false
        },
        graphic: [
            {
                type: 'image',
                silent: true,
                left: 'center',
                top: 'middle',
                z: 100,
                style: {
                    image: WaterMarkImg,
                    width: 120,
                }
            }
        ],
        legend: {
            show: false
        },
        grid: {
            top: '10',
            left: '10',
            right: '10',
            bottom: '10',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: xAxis,
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '',
                min: 0,
                axisLabel: {
                    formatter: '{value}'
                },
                splitLine: { 
                    show: true,
                    lineStyle: {
                        type: 'solid',
                        color: '#3E434E'
                    }
                }
            },
            {
                type: 'value',
                name: '',
                min: 0,
                axisLabel: {
                    formatter: '{value}'
                },
                splitLine: { 
                    show: true,
                    lineStyle: {
                        type: 'solid',
                        color: '#3E434E'
                    }
                }
            }
        ],
        series: [
            {
                name: 'Active User',
                type: 'bar',
                color: ['#23B899'],
                data: data1
            },
            {
                name: 'Transactions',
                type: 'bar',
                color: ['#4583FF'],
                data:  data2
            }
        ]
    }
    return options
}

// 双折现 dex-cex
export const getHighRiskOptions = (
    date: any[] = [],
    data1: any[] = [], 
    data2: any[] = [],
    title1: string = '',
    title2: string = ''
) => {
    const data1List: any[] = data1.filter((val: number) => val > 0 )
    const data2List: any[] = data2.filter((val: number) => val > 0 )
    const options: EChartsOption = {
        title: {
            show: false,
            left: 'center',
            text: 'Tootip and dataZoom on Mobile Device'
        },
        legend: {
            top: 'bottom',
            data: ['Intention'],
            show: false
        },
        graphic: [
            {
                type: 'image',
                silent: true,
                left: 'center',
                top: 'middle',
                z: 100,
                style: {
                    image: WaterMarkImg,
                    width: 120,
                }
            }
        ],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            confine: true,
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            textStyle: {
                fontSize: 15, //设置字体大小
                color: '#000'
            },
            formatter: function (params: any) {
                let str = params[0].axisValue + "<br />"
                params.forEach((item: any) => {
                    let value = item.value
                    if(!value && value !==0) return 0
                    let val = value.toString()
                    let reg = val.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
                    let valStr = val.replace(reg,"$1,")

                    if(valStr === '0.1') {
                        valStr = 0
                    }

                    str +=
                    '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:'
                    + item.color
                    + '"></span>' 
                    + item.seriesName + " : "
                    + valStr + "<br />"
                })
                return str
            }
        },
        toolbox: {
            show: false,
            left: 'center',
            itemSize: 25,
            top: 55,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {}
            }
        },
        xAxis: {
            type: 'category',
            axisPointer: {
                type: 'line',
                value: '',
                snap: true,
                lineStyle: {
                    type: [5, 20],
                    dashOffset: 20,
                    color: '#58CFFF',
                    width: 2
                },
                label: {
                    show: true,
                    formatter: function (params: any) {
                        return echarts.format.formatTime('yyyy-MM-dd', params.value);
                    },
                    backgroundColor: '#7581BD'
                },
                handle: {
                    show: true,
                    color: '#7581BD'
                }
            },
            splitLine: {
                show: false
            },
            data: date
        },
        yAxis: {
            type: 'log',
            axisTick: {
                inside: true
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#3E434E'
                }
                
            },
            axisLabel: {
                inside: true,
                formatter: '{value}\n'
            },
            min: function(value) {
                if (value.min < 1) {
                    return value.min
                } else {
                    return Math.round(value.min * 0.98 * 100) / 100
                }
            },
            max: function(value) {
                if (value.max < 1) {
                    return value.max
                } else {
                    return Math.round(value.max * 1.02 * 100) / 100
                }
            },
        },
        grid: {
            top: 0,
            left: 30,
            right: 30,
            bottom: 40
        },
        series: [
            {
                name: title1,
                type: 'line',
                symbol: 'none',
                sampling: 'average',
                smooth: true,
                lineStyle: {
                    color: '3AC89F',
                },
                itemStyle: {
                    color: '#3AC89F' // 折线拐点颜色
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: '#3AC89F'
                        },
                        {
                            offset: 1,
                            color: '#232D42'
                        }
                    ])
                },
                data: data1List
            },
            {
                name: title2,
                type: 'line',
                symbol: 'none',
                sampling: 'average',
                smooth: true,
                lineStyle: {
                    color: '#333FFE',
                },
                itemStyle: {
                    color: '#333FFE', // 折线拐点颜色
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: '#333FFE'
                        },
                        {
                            offset: 1,
                            color: '#264442'
                        }
                    ])
                },
                data: data2List,
                zlevel: -1,
            }
        ]
    }
    return options
}

// 动态排序柱状图
export const getUsersBasedOptions = (ydata: any[] = [], data: any[] = [], name: string = '') => {
    const options: EChartsOption = {
        toolbox: {
            show: false
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            confine: true,
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            textStyle: {
                fontSize: 15, //设置字体大小
                color: '#000'
            },
        },
        legend: {
            show: false
        },
        grid: {
            left: 30,
            right: 120,
            bottom: 10,
            top: 10,
            containLabel: true
        },
        graphic: [
            {
                type: 'image',
                silent: true,
                left: 'center',
                top: 'middle',
                z: 100,
                style: {
                    image: WaterMarkImg,
                    width: 120,
                }
            }
        ],
        xAxis: {
            show: false,
            max: 'dataMax',
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'category',
            data: ydata,
            inverse: true,
            animationDuration: 300,
            animationDurationUpdate: 300,
            axisLabel:{
                align: 'right',
                margin: 40,
                formatter: (val: any) => {
                    return textWrap(val)
                }
            },
            splitLine: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        series: [
            {
                // realtimeSort: true,
                name: name,
                type: 'bar',
                data: data,
                color: '#B4D4FF',
                barWidth: '8',
                label: {
                    show: true,
                    position: 'right',
                    valueAnimation: true,
                    color: '#fff',
                    fontSize: 12,
                    formatter: function (val: any) {
                        return  handleNumbersSeparated(val) + ' addresses'
                    }
                },
                showBackground: true,
                backgroundStyle: {
                    color: 'transparent'
                }
            }
        ],
        animationDuration: 0,
        animationDurationUpdate: 3000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear'
    }
    return options
}

export const dynamicLineOptions = (dataList: any[], titleList: string[], colors: string[]) => {
    let series: any[] = []
    dataList.forEach((dataItem: any, index: number) => {
        series.push({
            name: titleList[index],
            type: 'line',
            symbol: 'none',
            symbolSize: 5,
            sampling: 'average',
            smooth: true,
            lineStyle: {
                color: colors[index],
            },
            itemStyle: {
                color: colors[index] // 折线拐点颜色
            },
            data: dataItem
        },)
    })

    const options: EChartsOption = {
        title: {
            show: false,
            left: 'center',
            text: 'Tootip and dataZoom on Mobile Device'
        },
        legend: {
            top: 'bottom',
            data: ['Intention'],
            show: false
        },
        graphic: [
            {
                type: 'image',
                silent: true,
                left: 'center',
                top: 'middle',
                z: 100,
                style: {
                    image: WaterMarkImg,
                    width: 120,
                }
            }
        ],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            confine: true,
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            textStyle: {
                fontSize: 15, //设置字体大小
                color: '#000'
            },
        },
        toolbox: {
            show: false,
            left: 'center',
            itemSize: 25,
            top: 55,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {}
            }
        },
        xAxis: {
            type: 'time',
            axisPointer: {
                type: 'line',
                value: '',
                snap: true,
                lineStyle: {
                    type: [5, 20],
                    dashOffset: 20,
                    color: '#58CFFF',
                    width: 2
                },
                label: {
                    show: true,
                    formatter: function (params: any) {
                        return echarts.format.formatTime('yyyy-MM-dd', params.value);
                    },
                    backgroundColor: '#7581BD'
                },
                handle: {
                    show: true,
                    color: '#7581BD'
                }
            },
            splitLine: {
                show: false
            }
        },
        yAxis: {
            // type: 'value',
            type: 'log',
            axisTick: {
                inside: true
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#3E434E'
                }
                
            },
            axisLabel: {
                inside: true,
                formatter: '{value}\n'
            },
            z: 10
        },
        grid: {
            top: 0,
            left: 15,
            right: 15,
            bottom: 40
        },
        dataZoom: [
            {
                type: 'inside',
                throttle: 50
            }
        ],
        series
    }
    return options
}

// log line chart
export const getPorfolioChart = (date: any[] = [], data: any[] = [], project: string = '') => {
    let seriesList: any[] = []
    let type: any = 'log'
    if(data.length > 0) {
        data.forEach((item:any, index:number) => {
            let seriesItem:any = {
                name: item.name,
                type: 'line',
                symbol: 'roundRect',
                sampling: 'average',
                symbolSize: [5, 5],
                smooth: true,
                lineStyle: {
                    color: item.color,
                    width: item.name.toLowerCase() === project.toLowerCase() ? 3 : 1
                },
                itemStyle: {color: item.color}, // 折线拐点颜色
                data: item.data,
                zlevel: index
            }
            seriesList.push(seriesItem)
        })
    }

    const options: EChartsOption = {
        title: {
            show: false,
            left: 'center',
            text: 'Tootip and dataZoom on Mobile Device'
        },
        legend: {
            top: 'bottom',
            data: ['Intention'],
            show: false
        },
        graphic: [
            {
                type: 'image',
                silent: true,
                left: 'center',
                top: 'middle',
                z: 100,
                style: {
                    image: WaterMarkImg,
                    width: 120,
                }
            }
        ],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            confine: true,
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            textStyle: {
                fontSize: 15, //设置字体大小
                color: '#000'
            },
            formatter: function (params: any) {
                let str = params[0].axisValue + "<br />"
                params.forEach((item: any) => {
                    let value = item.value
                    if(!value && value !==0) return 0
                    let val = value.toString()
                    let reg = val.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
                    let valStr = val.replace(reg,"$1,")

                    if(valStr === '0.1') {
                        valStr = 0
                    }

                    str +=
                    '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:'
                    + item.color
                    + '"></span>' 
                    + item.seriesName + " : "
                    + valStr + "<br />"
                })
                return str
            }
        },
        toolbox: {
            show: false,
            left: 'center',
            itemSize: 25,
            top: 55,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisPointer: {
                type: 'line',
                value: '',
                snap: true,
                lineStyle: {
                    type: [5, 20],
                    dashOffset: 20,
                    color: '#58CFFF',
                    width: 2
                },
                label: {
                    show: true,
                    formatter: function (params: any) {
                        return echarts.format.formatTime('yyyy-MM-dd', params.value);
                    },
                    backgroundColor: '#7581BD'
                },
                handle: {
                    show: true,
                    color: '#7581BD'
                }
            },
            splitLine: {
                show: false
            },
            data: date
        },
        yAxis: {
            type: type,
            axisTick: {
                inside: true
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#3E434E' 
                }
                
            },
            axisLabel: {
                inside: true,
                formatter: '{value}\n'
            },
            min: function(value) {
                // if (value.min < 1) {
                //     return value.min
                // } else {
                //     return Math.round(value.min * 0.98 * 100) / 100
                // }
                return value.min
            },
            max: function(value) {
                if (value.max < 1) {
                    return value.max
                } else {
                    return Math.round(value.max * 1.02 * 100) / 100
                }
            },
        },
        grid: {
            top: 20,
            left: 35,
            right: 35,
            bottom: 30
        },
        series: seriesList
    }
    return options
}

// 极坐标系下的堆叠柱状图
export const getPolarOptions = (data1: number[], data2: number[], data3: number[], projects: string[], project: string, tabKey: string) => {
    const option: any = {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross"
            },
            confine: true,
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            textStyle: {
                fontSize: 13, //设置字体大小
                color: '#000'
            },
            formatter: function (params: any) {
                let type = 'addresses'
                if(tabKey === 'address') {
                    type = 'addresses'
                }else {
                    type = 'entity'
                }
                let title1 = `Only in ${formatStringToUppercase(project)}`
                let title2 = `Overlaped ${type}`
                let title3 = `Only in ${params[0].axisValue}`
                let value1 = params[0].value
                let value2 = params[1].value
                let value3 = params[2].value
                let p1 = ((value1/(value1 + value2))*100).toFixed(2) + '%'
                let p2 = ((value2/(value1 + value2))*100).toFixed(2) + '%'
                let p3 = ((value2/(value2 + value3))*100).toFixed(2) + '%'
                let p4 = ((value3/(value2 + value3))*100).toFixed(2) + '%'
                let color1 = params[0].color
                let color2 = params[1].color
                let color3 = params[2].color
                let d1 = `of ${formatStringToUppercase(project)} ${type}`
                let d2 = `of ${formatStringToUppercase(project)} ${type}`
                let d3 = `of ${params[0].axisValue} ${type}`
                let d4 = `of ${params[0].axisValue} ${type}`

                let str = `
                    <div>   
                        <div>
                            <span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:${color1}"></span>
                            <span>
                                ${title1}: ${value1}
                            </span>
                            <div style="margin-left: 18px">${p1} ${d1}</div>
                        </div>
                        <div>
                            <span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:
                            ${color2}
                            "></span>
                            <span>
                                ${title2}: ${value2}
                            </span>
                            <div style="margin-left: 18px">${p2} ${d2}</div>
                            <div style="margin-left: 18px">${p3} ${d3}</div>
                        </div>
                        <div>
                            <span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:
                            ${color3}
                            "></span> 
                            <span>
                                ${title3}: ${value3}
                            </span>
                            <div style="margin-left: 18px">${p4} ${d4}</div>
                        </div>
                    </div`
                return str
            }
        },
        angleAxis: {},
        radiusAxis: {
            type: 'category',
            data: projects,
            nameTextStyle: {
                color: '#fff'
            },
            axisLabel: {
                show: false
            },
            z: 2
        },
        polar: {},
        series: [
            {
                type: 'bar',
                data: data1,
                coordinateSystem: 'polar',
                name: `Only in [${''} - Reported]`,
                stack: 'a',
                emphasis: {
                    focus: 'series'
                }
            },
            {
                type: 'bar',
                data: data2,
                coordinateSystem: 'polar',
                name: 'Overlaped addresses/entities',
                stack: 'a',
                emphasis: {
                    focus: 'series'
                }
            },
            {
                type: 'bar',
                data: data3,
                coordinateSystem: 'polar',
                name: `Only in [${''} - Similar Project]`,
                stack: 'a',
                emphasis: {
                    focus: 'series'
                }
            },
        ],
        legend: {
            show: false,
            data: ['当前项目地址独有部分', 'Overlap address part', '对比项目地址独有部分']
        }
    }
    return option
}

// 单柱状图和折线图组合
export const getTotalValueLockedOptions = (xAxis: any[] = [], data1: any[] = [], data2: any[] = [], title1: string, title2: string) => {
    const options: EChartsOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            confine: true,
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            textStyle: {
                fontSize: 15, //设置字体大小
                color: '#000'
            },
            formatter: function (params: any) {
                let str = params[0].axisValue + "<br />"
                params.forEach((item: any) => {
                    let value = item.value
                    if(!value && value !==0) return 0
                    let val = value.toString()
                    let reg = val.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
                    let valStr = val.replace(reg,"$1,")

                    str +=
                    '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:'
                    + item.color
                    + '"></span>' 
                    + item.seriesName + " : "
                    + valStr + "<br />"
                })
                return str
            }
        },
        toolbox: {
            show: false
        },
        graphic: [
            {
                type: 'image',
                silent: true,
                left: 'center',
                top: 'middle',
                z: 100,
                style: {
                    image: WaterMarkImg,
                    width: 120,
                }
            }
        ],
        legend: {
            show: false
        },
        grid: {
            top: '10',
            left: '10',
            right: '10',
            bottom: '10',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: xAxis,
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '',
                min: 0,
                axisLabel: {
                    formatter: '{value}'
                },
                splitLine: { 
                    show: true,
                    lineStyle: {
                        type: 'solid',
                        color: '#3E434E'
                    }
                }
            },
            {
                type: 'value',
                name: '',
                min: 0,
                axisLabel: {
                    formatter: '{value}'
                },
                splitLine: { 
                    show: true,
                    lineStyle: {
                        type: 'solid',
                        color: '#3E434E'
                    }
                }
            }
        ],
        series: [
            {
                name: title1,
                type: 'line',
                yAxisIndex: 1,
                lineStyle: {
                    color: '#23B899',
                },
                itemStyle: {
                    color: '#23B899', // 折线拐点颜色
                },
                data: data1
            },
            {
                name: title2,
                type: 'bar',
                color: ['#4583FF'],
                data: data2
            }
        ]
    }
    return options
}

// 单柱状图和折线图组合
export const getPriceRelationOptions = (xAxis: any[] = [], data1: any[] = [], data2: any[] = []) => {
    const options: EChartsOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            confine: true,
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            textStyle: {
                fontSize: 15, //设置字体大小
                color: '#000'
            },
            formatter: function (params: any) {
                let str = params[0].axisValue + "<br />"
                params.forEach((item: any) => {
                    let value = item.value
                    if(!value && value !==0) return 0
                    let val = value.toString()
                    let reg = val.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
                    let valStr = val.replace(reg,"$1,")

                    str +=
                    '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:'
                    + item.color
                    + '"></span>' 
                    + item.seriesName + " : "
                    + valStr + "<br />"
                })
                return str
            }
        },
        toolbox: {
            show: false
        },
        graphic: [
            {
                type: 'image',
                silent: true,
                left: 'center',
                top: 'middle',
                z: 100,
                style: {
                    image: WaterMarkImg,
                    width: 120,
                }
            }
        ],
        legend: {
            show: false
        },
        grid: {
            top: '10',
            left: '10',
            right: '10',
            bottom: '10',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: xAxis,
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '',
                min: 0,
                axisLabel: {
                    formatter: '{value}'
                },
                splitLine: { 
                    show: true,
                    lineStyle: {
                        type: 'solid',
                        color: '#3E434E'
                    }
                }
            },
            {
                type: 'value',
                name: '',
                min: 0,
                axisLabel: {
                    formatter: '{value}'
                },
                splitLine: { 
                    show: true,
                    lineStyle: {
                        type: 'solid',
                        color: '#3E434E'
                    }
                }
            }
        ],
        series: [
            {
                name: 'Holders',
                type: 'bar',
                color: ['#23B899'],
                data: data1
            },
            {
                name: 'Price',
                type: 'line',
                yAxisIndex: 1,
                lineStyle: {
                    color: '#FFD302',
                },
                itemStyle: {
                    color: '#FFD302', // 折线拐点颜色
                },
                data: data2
            }
        ]
    }
    return options
}

//饼状图
export const getHeldPeriodsOptions = (data: any[] = [], colors: any[] = [], logoUrl: string = '') => {
    const options: EChartsOption = {
        graphic: {//图形中间图片
            elements: [{
                type: "image",
                style: {
                    image: WaterMarkImg,//你的图片地址
                    width: 100
                },
                left: "center",
                top: "center",
            }],
        },
        tooltip: {
            trigger: 'item',
            axisPointer: {
                type: 'cross'
            },
            confine: true,
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            textStyle: {
                fontSize: 12, //设置字体大小
                color: '#000'
            },
            formatter: function (info: any) {
                let value: string = handleNumbersSeparated(info.data)
                let proportion: number = Number(info.data.proportion)
                let str: string = ''

                str += info.data.name + " : " + proportion + '%' + "<br />" + 'Value: ' + value
                return str
            }
        },
        toolbox: {
            show: false
        },
        legend: {
            top: '5%',
            left: 'center',
            show: false
        },
        grid:{
            left:0,
            top:0,
            right:0,
            bottom:0
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: ['60%', '90%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                color: colors.length ? colors : ['#8D48FF', '#F2B705', '#E84142', '#3AC89F'],
                emphasis: {
                    label: {
                        show: false,
                        fontSize: '40',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: data
            }
        ]
    }
    return options
}