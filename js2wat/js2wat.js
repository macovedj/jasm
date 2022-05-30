const fs = require('fs');
const { tokenTypes } = require('./tokens')

const parse = async (file) => { 
  console.log({file})
  const bytes = await fs.readFileSync(file)
  let text = bytes.toString().replace(/\n/g, '').split(' ')
  .map(w => w.trim())
  .filter(x => x.length > 0)
  .join(' ')
  .split('')

  const tokens = text.reduce((acc, cur) => {
    let {curToken, tokenized} = acc
    switch(cur) {
      case "(":
        tokenized.push({ type: tokenTypes.LPAR, value: "("})
        return {curToken: [], tokenized}
      case ")":
        switch(curToken.join('')) {
          case "module":
            tokenized.push({type: tokenTypes.MOD, value: "module"})
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
          case "i32":
            tokenized.push({type: tokenTypes.PARAM, value: "i32"})
            break;
          case "result":
            tokenized.push({type: tokenTypes.RESULT, value: "result"})
            break;
          case "local.get":
            tokenized.push({type: tokenTypes.LOCAL_GET, value: "local.get"})
            break;
          case "i32.add":
            tokenized.push({type: tokenTypes.ADD_I32, value: "i32.add"})
            break;
          default:
            if (curToken.join('') !== '') {
              tokenized.push({type: tokenTypes.LITERAL, value: curToken.join('')})
            }
            break;
        }
        tokenized.push({ type: tokenTypes.RPAR, value: ")"})
        return {curToken: [], tokenized}
      case " ":
        switch(curToken.join('')) {
          case "module":
            tokenized.push({type: tokenTypes.MOD, value: "module"})
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
          case "i32":
            tokenized.push({type: tokenTypes.PARAM, value: "i32"})
            return {curToken: [], tokenized}
          case "result":
            tokenized.push({type: tokenTypes.RESULT, value: "result"})
            return {curToken: [], tokenized}
          case "local.get":
            tokenized.push({type: tokenTypes.LOCAL_GET, value: "local.get"})
            return {curToken: [], tokenized}
          case "i32.add":
            tokenized.push({type: tokenTypes.ADD_I32, value: "i32.add"})
            return {curToken: [], tokenized}
          case "":
            return {curToken: [], tokenized}
          default:
            tokenized.push({type: tokenTypes.LITERAL, value: curToken})
            return {curToken: [], tokenized}
        }
      default:
        curToken.push(cur)
        return acc
    }
  }, {curToken: [], tokenized: []})
  return tokens.tokenized
}

module.exports = {parse}