/**
 * 根据时间戳获取格式化日期 yyyy-MM-dd weekday
 * @param {number} timestamp 时间戳
 */
export function formatDate(timestamp) {
  const datee = new Date(timestamp)
  const year = datee.getFullYear() + ''
  const month = (datee.getMonth() + '').padStart(2, '0')
  const date = (datee.getDate() + '').padStart(2, '0')
  const weekMap = [
    '星期天',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六'
  ]
  const day = weekMap[datee.getDay()]
  return year + '-' + month + '-' + date + ' ' + day
}
