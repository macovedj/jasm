const fs = require('fs');
const bytes3 = fs.readFileSync('./add3.wasm');
const bytes2 = fs.readFileSync('./add2.wasm');

console.log("compiled bytes three:", bytes3.toString('hex').match(/../g).join(' '))
console.log("compiled bytes two", bytes2)

const hard = new Uint8Array('0061736d0100000001070160027f7f017f03020100070a010661646454776f00000a09010700200020016a0b'.match(/../g).map(h=>parseInt(h,16))).buffer
const hard3 = new Uint8Array('0061736d01000000010e0260027f7f017f60037f7f7f017f03030200010715020661646454776f000008616464546872656500010a14020700200020016a0b0a002000200120026a6a0b'.match(/../g).map(h=>parseInt(h,16))).buffer
console.log("hard bytes two:", hard)
console.log("hard bytes three", hard3)


const execute = async () => {
  const hardModule = await WebAssembly.compile(hard);
  const hardInstance = await WebAssembly.instantiate(hardModule);
  console.log(hardInstance.exports.addTwo(13, 5));
  const hardModule3 = await WebAssembly.compile(hard3);
  const hardInstance3 = await WebAssembly.instantiate(hardModule3);
  console.log("HARD ONE")
  console.log(hardInstance3.exports.addThree(13, 5, 10));
  const compiledModule = await WebAssembly.compile(bytes2);
  const compiledInstance = await WebAssembly.instantiate(compiledModule);
  console.log(compiledInstance.exports.addTwo(13, 5));
}

execute()