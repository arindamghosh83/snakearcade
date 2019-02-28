export const dropFirst = xs => xs.slice(1)
export const dropLast  = xs => xs.slice(0, xs.length - 1)
export const merge     = o1 => o2 => Object.assign({}, o1, o2)
export const mod       = x => y => ((y % x) + x) % x // http://bit.ly/2oF4mQ7
export const rnd       = min => max => Math.floor(Math.random() * max) + min  // random number between min and max


    