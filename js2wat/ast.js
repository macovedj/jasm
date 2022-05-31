function parseParams(tokens) {
  tokens.shift()
  tokens.shift()
  tokens.shift()
  tokens.shift()
  let params = []
  while (tokens[0].type !== "RPAR") {
    params.push(tokens[0])
    tokens.shift()
  }
  tokens.shift()
  return params
}

function parseBody(tokens) {
  console.log(tokens[0])
  let body = []
  tokens.shift()
  console.log(tokens[0])
  switch(tokens[0].type) {
    case "LPAR":
      tokens.shift()
      body.push({return: tokens[0]})
      tokens.shift()
      tokens.shift()
      return body
    case "LCURL":
      break;
    default:
      while (tokens[0])
      break;
  }
}

const astBuilder = tokens => {
  let ast = {funcs: []}
  while (tokens.length > 0) {
    switch(tokens[0].type) {
      case "CONST":
        switch(tokens[3].type) {
          case "LPAR":
            let func = {
              name: tokens[1].value,
            }
            let params = parseParams(tokens)
            let body = parseBody(tokens)
            ast.funcs.push({...func, params, body})
        }
    }
  }
  return ast
}

module.exports = { astBuilder }