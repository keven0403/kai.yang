import { domain } from '@/constants/config'

export const isValidNumber = (num: number) => {
    return num != null && isFinite(num);
}

//随机数，用于绑定id
export const uuid = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
    }

    return (
        s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
    )
}

export const getTokenImgUrl = (address: string ) => {
    if (address) {
        // let httpAdmin: string = `${domain}images/tokenImage/` // 'https://www.0xscope.com/images/tokenImage/'
        let httpAdmin: string = `https://www.0xscope.com/images/tokenImage/`
        let suffer: string = '/logo.png'
        return `${httpAdmin}${address}${suffer}`
    } else {
        return ''
    }
}

export const getCexImgUrl = (name: string) => {
    let httpAdmin: string = `${domain}images/exchange/` // `${domain}exchange/`
    let suffer: string = '/logo.png'
    return `${httpAdmin}${name}${suffer}`
}

// 字符串首字母大写
export const formatStringToUppercase = (str: string) => {
    let newStr: string = ''
    if (str) {
        newStr = str.slice(0, 1).toUpperCase() + str.slice(1)
    }
    return newStr
}

//通过id获取图片
export function getUrlCode(name: string, str: string) {
    const reg = new RegExp(`(^|&)${ name}=([^&]*)(&|$)`);
    const r = str.substr(1).match(reg)
    if (r != null) {
        return  decodeURIComponent(r[2])
    }
    return ''
}

export const getPositionImgUrl = (id: string ) => {
    if (id) {
        let httpAdmin: string = `${domain}images/protocol/`
        let suffer: string = '/logo.png'
        return `${httpAdmin}${id}${suffer}`
    } else {
        return ''
    }
}

//数字每三位逗号分隔
export const handleNumbersSeparated = (val: any) => {
    let result = [], counter = 0
    let num_array = val.data.toString().split('.')
    let num = num_array[0]
    let str = ''
    for(let i = num.length - 1; i >= 0; i--){
        counter++
        result.unshift(num[i])
        if((!(counter % 3 )) && i != 0) {
            result.unshift(',')
        }
    }
    if(num_array.length > 1) {
        str = result.join('')
        str += '.' + num_array[1]
        return str
    }else {
        return str = result.join('')
    }
}

//去除特殊字符~!@#$^-&*()=|{}':;',\[].<>/?~！@#￥……&*（）——|{}【】'；：""'。，、？
export function trimNoSpaceSpecial(string: string) {
    //替换字符串中的所有特殊字符（包含空格）
    if (string != "") {
        const pattern = /[`~!@#$^\-&*()=|{}':;',\\\[\]\.<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/g;
        string = string.replace(pattern, "");
    }
    return string
}

// 去除特殊字符，不去空格
export function trimSpecial(s: string) {
    let pattern = new RegExp("[`~!@#$^&*()=|{}:;,\\[\\].<>/?~！@#￥……&*（）——|{}【】；：”“。，、？]")
    let rs = "";
    for (let i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs
}

//科学计数法转数字
export const getFullNum = (num: number) => {
    //处理非数字
    if(isNaN(num)) {
        return num
    }
    //处理不需要转换的数字
    let str = '' + num
    if(!/e/i.test(str)) {
        return num
    }
    return (num).toFixed(18).replace(/\.?0+$/, "")
}

export const formarAddress = (address: string, subLength: number) => {
    return `${address.substring(0, subLength)}...${address.substring(address.length - subLength)}`
}


export const formarLabelAddress = (address: string, subLength: number) => {
    if (address.length <= subLength) {
        return address
    } else {
        return `${address.substring(0, subLength)}...`
    }
}

export const color16 = () => {
    let r = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)
    let g = Math.floor(Math.random() * 256)
    let color = `#` + r.toString(16) + b.toString(16) + g.toString(16)
    return color
}

export const renderSize = (value: number) => {
    let res: string = ''
    let val: number = 1000
    if (value < 1) {
        res = '<$1'
    } else if (value < val) {
        res = `$${value.toFixed(2)}`
    } else {
        if (value < (val * val)) {
            var temp: number = value / val
            let tempStr: string = temp.toFixed(2)
            res =  '$' + tempStr + 'K'
        } else if (value < (val* val * val)) {
            var temp = value / (val * val)
            let tempStr: string = temp.toFixed(2)
            res = '$' + tempStr + 'M'
        } else {
            var temp = value / (val * val * val)
            let tempStr: string = temp.toFixed(2)
            res = '$' + tempStr + 'B'
        }
    }
    return res
}

export const getNftImgUrl = (address: string ) => {
    if (address) {
        let httpAdmin: string = `${domain}images/nft/` // 'https://www.0xscope.com/images/tokenImage/'
        let suffer: string = '/logo.png'
        return `${httpAdmin}${address}${suffer}`
    } else {
        return ''
    }
}

// 超过长度换行，不切割单词
export const textWrap = (text: string) => {
    let str = ''
    let maxNum = 30
    let arr = text.split(' ')
    let tmp = ''
    arr.forEach(item => {
        if (item.length >= maxNum) {
            str = str + item + '\n'
        } else {
            if (tmp.length + item.length < maxNum) {
                tmp = tmp + item + ' '
            } else {
                str = str + tmp + '\n'
                tmp = item + ' '
            }
        }
    })
    str = str + tmp
    return str
}