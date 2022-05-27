const fs = require('fs');
const bytes = fs.readFileSync('./add2.wasm');

console.log("compiled bytes:", bytes)
const hard = new Uint8Array('0061736d0100000001070160027f7f017f03020100070a010661646454776f00000a09010700200020016a0b'.match(/../g).map(h=>parseInt(h,16))).buffer
console.log("hard bytes:", hard)


const execute = async () => {
  const hardModule = await WebAssembly.compile(hard);
  const hardInstance = await WebAssembly.instantiate(hardModule);
  console.log(hardInstance.exports.addTwo(13, 5));
  const compiledModule = await WebAssembly.compile(bytes);
  const compiledInstance = await WebAssembly.instantiate(compiledModule);
  console.log(compiledInstance.exports.addTwo(13, 5));
}

execute()