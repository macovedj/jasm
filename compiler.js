const { parse } = require('./parser')
const { astBuilder } = require('./ast')

const compile = async (file) => {
  const tokens = await parse(file)

  const ast = astBuilder(tokens)
  
  let bytes = "0061736d0100000001"
  let numOfSections = ast.mods[0].funcs.length.toString(16)
  if (numOfSections.length < 2) numOfSections = `0${numOfSections}`
  let typeSectionSize = (ast.mods[0].funcs.reduce((acc, cur) => {
  //  4 comes from func type of 0x60, num of params, enumeration or params, num of results, enumeration of results
   return acc + 4 + cur.params.length
  }, 0) + 1).toString(16)
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
  sigs = ast.mods[0].funcs.reduce((acc, _, i) => {
    let byte = i.toString(16)
    if (byte.length < 2) byte = `0${byte}`
    return acc + byte
  }, '')
  bytes += "03" + funcSecSize + numOfFuncs + sigs
  // Export Section
  const numOfExports = ast.mods[0].funcs.filter(f => f.export.length > 0).length
  if (numOfExports > 0) {
    let strings = ast.mods[0].funcs.map(f => f.export).reduce((acc, cur, i) => {
      if (cur.length === 0) return acc
      let curLength = cur.length.toString(16)
      if (curLength.length < 2) curLength = `0${curLength}`
      const stringInHex = cur.split('').reduce((hexWord, _, idx) => hexWord + cur.charCodeAt(idx).toString(16), '')
      let sigIndex = i.toString(16)
      if (sigIndex.length < 2) sigIndex = `0${sigIndex}`
      return acc + curLength + stringInHex + "00" + sigIndex
    }, '')
    let exportSecSize = (strings.length / 2 + 1).toString(16)
    if (exportSecSize.length < 2) exportSecSize = `0${exportSecSize}`
    let hexNumExp = numOfExports.toString(16)
    if (hexNumExp) hexNumExp = `0${hexNumExp}`
    bytes += "07" + exportSecSize + hexNumExp + strings
  }
  // Code section
  // console.log({bytes})
  let codes = ast.mods[0].funcs.map(f => f.body).reduce((allBodies, curBody) => {
    let bodyLength = (curBody.length + 2).toString(16)
    if (bodyLength.length < 2) bodyLength = `0${bodyLength}`
    // later '00' will be changed to number of variable declarations
    return (allBodies + bodyLength + "00" + curBody.reduce((acc, cur) => {
      switch(cur.type) {
        case "LOCAL_GET":
          return acc + "20"
        case "LITERAL":
          console.log({cur})
          let literal = cur.value.join().toString(16)
          if (literal.length < 2) literal = `0${literal}`
          return acc + literal
        case "ADD_I32":
          return acc + "6a"
      }
      return acc
    }, "") + "0b")
  }, '')
  let codeSecSize = (Math.ceil(codes.length/2) + 1).toString(16)
  if (codeSecSize.length < 2) codeSecSize = `0${codeSecSize}` 
  bytes += "0a" + codeSecSize + numOfFuncs + codes
  // Name section
  console.log({bytes})
  return new Uint8Array(bytes.match(/../g).map(h=>parseInt(h,16))).buffer
}
// compile()

module.exports = {compile}