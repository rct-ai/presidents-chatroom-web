import dayjs from 'dayjs'

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const getUserId = () => {
  const local = localStorage.getItem('voting/userid')
  if (local) return local

  const id = window.crypto.randomUUID().slice(0, 8)
  localStorage.setItem('voting/userid', `0x${id}`)
  return id
}
