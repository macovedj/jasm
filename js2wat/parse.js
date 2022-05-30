const fs = require('fs');
const { tokenTypes } = require('./tokens')

const parse = async (file) => {
  const bytes = await fs.readFileSync(file)
  let text = bytes.toString().replace(/\n/g, '').split(' ')
  .map(w => w.trim())
  .filter(x => x.length > 0)
  .join(' ')
  .split('')
  console.log({text})

  const tokens = text.reduce((acc, cur, i) => {
    let {curToken, tokenized} = acc
    console.log({curToken})
    switch(cur) {
      case "(":
        tokenized.push({ type: tokenTypes.LPAR, value: "("})
        return {curToken: [], tokenized}
      case ")":
        switch(curToken.join('')) {
          case "const":
            tokenized.push({type: tokenTypes.CONST, value: "const"})
            break;
          case "=":
            tokenized.push({type: tokenTypes.ASSIGN, value: "assign"})
            break;
          case "=>":
            tokenized.push({type: tokenTypes.FAT_ARROW, value: "fat_arrow"})
            break;
          case "func":
            tokenized.push({type: tokenTypes.FUNC, value: "func"})
            break;
          case "export":
            tokenized.push({type: tokenTypes.EXPORT, value: "export"})
            break;
          case "param":
            tokenized.push({type: tokenTypes.PARAMDECL, value: "param"})
            break;
          default:
            console.log("DEFAULT")
            if (curToken.join('') !== '') {
              tokenized.push({type: tokenTypes.LITERAL, value: curToken.join('')})
            }
            break;
        }
        tokenized.push({ type: tokenTypes.RPAR, value: ")"})
        return {curToken: [], tokenized}
      case " ":
        switch(curToken.join('')) {
          case "const":
            tokenized.push({type: tokenTypes.CONST, value: "const"})
            return {curToken: [], tokenized}
          case "=":
            tokenized.push({type: tokenTypes.ASSIGN, value: "assign"})
            return {curToken: [], tokenized}
          case "=>":
            tokenized.push({type: tokenTypes.FAT_ARROW, value: "fat_arrow"})
            return {curToken: [], tokenized}
          case "func":
            tokenized.push({type: tokenTypes.FUNC, value: "func"})
            return {curToken: [], tokenized}
          case "export":
            tokenized.push({type: tokenTypes.EXPORT, value: "export"})
            return {curToken: [], tokenized}
          case "param":
            tokenized.push({type: tokenTypes.PARAMDECL, value: "param"})
            return {curToken: [], tokenized}
          case "result":
            tokenized.push({type: tokenTypes.RESULT, value: "result"})
            return {curToken: [], tokenized}
          case "":
            return {curToken: [], tokenized}
          default:
            tokenized.push({type: tokenTypes.LITERAL, value: curToken.join('')})
            return {curToken: [], tokenized}
        }
      default:
        curToken.push(cur)
        if (i === text.length - 1) {
          tokenized.push({type: tokenTypes.LITERAL, value: curToken.join('')})
          return { tokenized }
        }
        return acc
    }
  }, {curToken: [], tokenized: []})

  return tokens.tokenized
}

parse('./js2wat/hello.js')

module.exports = {parse}