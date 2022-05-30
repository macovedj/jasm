const { parse } = require('./parse')
const { astBuilder } = require('./ast')

const compile = async (file) => {
  const tokens = await parse(file)
  const ast = astBuilder(tokens)
  console.log({ast})
}

compile()

module.exports = { compile }