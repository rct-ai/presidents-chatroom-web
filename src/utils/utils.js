export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

crypto.randomUUID = function randomUUID() {
  return (
    [1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,
    c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
};

export const getUserId = () => {
  const local = localStorage.getItem('voting/userid')
  if (local) return local

  const id = `0x${crypto.randomUUID().slice(0, 8)}`
  localStorage.setItem('voting/userid', id)
  return id
}
