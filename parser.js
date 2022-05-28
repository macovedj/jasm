const fs = require('fs');
const { tokenTypes } = require('./tokens')

const parser = async () => { 
  const bytes = await fs.readFileSync('./add2.wat')
  let text = bytes.toString().replace(/\n/g, '').split(' ')
  .map(w => w.trim())
  .filter(x => x.length > 0)
  .join(' ')
  .split('')
  console.log(text)

  const tokens = text.reduce((acc, cur) => {
    let {curToken, tokenized} = acc
    // console.log({tokenized})
    // console.log({curToken})
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
          default:
            tokenized.push({type: tokenTypes.LITERAL, value: curToken.join('')})
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
            tokenized.push({type: tokenTypes.LOCAL_GET, value: "local.get"})
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
  console.log(tokens.tokenized)
  return tokens
}

parser()
module.exports = {parser}