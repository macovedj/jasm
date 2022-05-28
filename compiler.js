const { parser } = require('./parser')
const { astBuilder } = require('./ast')

const compile = async (tokens) => {
  console.log(astBuilder(tokens))
  // if (input[0] !== '(') throw new Error(`INVALID EXPRESSION, MUST START WITH '(', INSTEAD GOT "${input[0]}"`)
  // if (input[input.length - 1] !== ')') throw new Error(`INVALID EXPRESSION, MUST END WITH ')', INSTEAD GOT "${input[input.length - 1]}"`)
  // const re = /\((.*?)\(/
  // const token = input.match(re)[0].trim().substr(1)


  // switch(curToken) {
  //   case "(module":
  //     bytes += "0061736d01000000"
  //     input = input.substr(1,input.length)
  // }

  // const output = input
  return "COMPILE"
}

const execute = async () => {
  const tokens = await parser()
  return compile(tokens)
}



execute()