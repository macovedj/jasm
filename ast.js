const astBuilder = (tokens) => {
  let ast = {mods: []}
  let curModule
  let pointer = 0
  for (let i = 0; i < tokens.length; i++) {
    console.log(curModule)
    console.log(i)
    console.log(ast)
    switch(tokens[i].type) {
      case "LPAR":
        break;
      case "MOD":
        ast.mods.push({funcs: []})
        curModule = ast.mods.length - 1
        break;
      case "FUNC":
        curFunc = {export: ""}
        ast.mods[curModule].funcs.push()
    }
  }
  return ast
}

module.exports = {astBuilder}