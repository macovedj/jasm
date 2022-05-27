const fs = require('fs');

const compileFunction = async ({input, bytes}) => {

}

const compile = async ({input, bytes, numberOfFuncs}) => {
  console.log({input, bytes, numberOfFuncs})
  console.log(input[0])
  // if (input[0] !== '(') throw new Error(`INVALID EXPRESSION, MUST START WITH '(', INSTEAD GOT "${input[0]}"`)
  // if (input[input.length - 1] !== ')') throw new Error(`INVALID EXPRESSION, MUST END WITH ')', INSTEAD GOT "${input[input.length - 1]}"`)
  // const re = /(.*?)\s/
  // const token = input.match(re)[0].trim().substr(1)
  // console.log({token})

  const curToken = input[0]
  switch(curToken) {
    case "module":
      bytes += "0061736d01000000"
      input.shift()
  }

  // const output = input
  return compile({input, bytes, numberOfFuncs})
}

const execute = async () => {
  const bytes = await fs.readFileSync('./add2.wat')
  let text = bytes.toString()
  const tokens = text.replace(/\n| /g, '').split(' ')
  .map(w => w.trim())
  .filter(x => x.length > 0)
  const numberOfFuncs = tokens.reduce((acc, cur) => cur === 'func' ? acc + 1 : acc, 0)
  console.log(numberOfFuncs)
  return compile({input: tokens, bytes: "", numberOfFuncs})
}



execute()