
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
export const makeId = (length = 10) => (
  Array(length).join().split(',').map(() => (
    ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length))
  )).join('')
)
