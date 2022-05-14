import dayjs from 'dayjs'

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const formatDateFromSec = (date, format = 'YYYY-MM-DD HH:mm:ss') =>
  dayjs.unix(date).format(format)
