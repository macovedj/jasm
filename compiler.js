const { parser } = require('./parser')
const { astBuilder } = require('./ast')

const compile = async (tokens) => {
  const ast = astBuilder(tokens)
  
  let bytes = "0061736d0100000001"
  let numOfSections = ast.mods[0].funcs.length.toString(16)
  if (numOfSections.length < 2) numOfSections = `0${numOfSections}`
  let typeSectionSize = ast.mods[0].funcs.reduce((acc, cur) => {
  //  5 comes from func type of 0x60, num of params, enumeration or params, num of results, enumeration of results
   return acc + 5 + cur.params.length
  }, 0).toString(16)
  if (typeSectionSize.length < 2) typeSectionSize = `0${typeSectionSize}`
  bytes += typeSectionSize + numOfSections
  ast.mods[0].funcs.forEach((curFunc) => {
    bytes += "60"
    let numOfParams = curFunc.params.length.toString(16)
    if (numOfParams.length < 2) numOfParams =`0${numOfParams}`
    let paramBytes = curFunc.params.reduce((acc, cur) => {
      switch(cur) {
        case 'i32':
          return acc + '7f'
        }
    },'')
    let returnByte
    switch(curFunc.result) {
      case 'i32':
        returnByte = '7f'
        break
    }
    bytes += numOfParams + paramBytes + '01' + returnByte
  })
  // Function Section
  let numOfFuncs = ast.mods[0].funcs.length
  let funcSecSize = (numOfFuncs + 1).toString(16)
  numOfFuncs = numOfFuncs.toString(16)
  if (numOfFuncs.length < 2) numOfFuncs = `0${numOfFuncs}`
  if (funcSecSize.length < 2) funcSecSize = `0${funcSecSize}`
  sigs = ast.mods[0].funcs.reduce((acc, cur, i) => {
    let byte = i.toString(16)
    console.log({byte})
    if (byte.length < 2) byte = `0${byte}`
    return acc + byte
  }, '')
  bytes += "03" + funcSecSize + numOfFuncs + sigs
  // Export Section
  return "COMPILE"
}

const execute = async () => {
  const tokens = await parser()
  return compile(tokens)
}

execute()