const astBuilder = (tokens) => {
  let ast = {mods: []}
  let curModule
  let funcDef
  while (tokens.length > 0) {
    console.log(tokens)
    switch(tokens[0].type) {
      case "LPAR":
        tokens.shift()
        break;
      case "RPAR":
        tokens.shift()
        break;
      case "MOD":
        ast.mods.push({funcs: []})
        curModule = ast.mods.length - 1
        tokens.shift()
        break;
      case "FUNC":
        funcDef = true
        curFunc = {export: "", params: [], body: [], result: ""}
        tokens.shift()
        tokens.shift()
        while (funcDef) {
          switch(tokens[0].type) {
            case "EXPORT":
              tokens.shift()
              curFunc.export = tokens[0].value.replace(/"/g, "")
              tokens.shift()
              tokens.shift()
              tokens.shift()
              break
            case "PARAMDECL":
              tokens.shift()
              while (tokens[0].type === "PARAM") {
                curFunc.params.push(tokens[0].value)
                tokens.shift()
              }
              tokens.shift()
              tokens.shift()
              break
            case "RESULT":
              tokens.shift()
              curFunc.result = tokens[0].value
              tokens.shift()
              tokens.shift()
              break
            default:
              while (tokens[0].type !== "RPAR") {
                curFunc.body.push(tokens[0])
                tokens.shift()
              }
              tokens.shift()
              funcDef = false
              ast.mods[curModule].funcs.push(curFunc)
          }
        }
    }
  }
  return ast
}

module.exports = {astBuilder}