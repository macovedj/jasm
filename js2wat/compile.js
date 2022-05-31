const { parse } = require('./parse')
const { astBuilder } = require('./ast')

const compile = async () => {
  const tokens = await parse(process.argv[2])
  const ast = astBuilder(tokens)
  let wat = '(module '
  const funcs = ast.funcs.reduce((acc, cur) => {
    console.log(cur)
    return acc + `(func (export "${cur.name}")` +
    // TODO change param names to param types
    ` ${cur.params.length > 0 ? `(params ${cur.params.map(param => param.value).join(' ')}` : ''})`
  }, '')
  wat += funcs
  console.log({wat})
  return wat
}

compile()

module.exports = { compile }