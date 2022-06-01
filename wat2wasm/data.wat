(module
  (data (i32.const 0) "abcdefghijklmnopqrstuvwxyz")
  (func (export "readData") (param i32) (result i32)
    local.get 0
    i32.load8_u
  ))