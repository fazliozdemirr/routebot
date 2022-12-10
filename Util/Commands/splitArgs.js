module.exports = function splitArgs({ content, args }) {
  let toReturn = []
  content.forEach((item, posi1) => {
    if(args.includes(item)) {
      let word = []
      let skipAt
      content.forEach((arg, posi2) => {
        if(arg !== item && posi2 >= posi1) {
          if(args.includes(arg)) {
            skipAt = posi2
            return
          }
          if(posi2 > skipAt) return
          word.push(arg)
        }
      })
      toReturn.push({
        name: item,
        value: word.join(` `)
      })
    }
  })
  return toReturn
}