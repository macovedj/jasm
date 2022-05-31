;; Example of how to write a string to stdout via the WebAssembly System Interface
;; Run with: wasmer run wasm-wasi-hello-world.wat
;; Inspired by: https://github.com/bytecodealliance/wasmtime/blob/main/docs/WASI-tutorial.md

(module
    ;; This function allows to write to a file descriptor
    ;; Signature: fd_write(fd, iovec, iovec_len, nwritten_Addr) -> nwritten
    (import "wasi_snapshot_preview1" "fd_write" (func $fd_write (param i32 i32 i32 i32) (result i32)))

    ;; This function writes a string to stdout
    (func $main
        ;; Create ciovec in linear memory at address 42
        i32.const 40            ;; mem addr of iovec
        i32.const 8             ;; pointer to start addr of string
        i32.store               ;; mem[40] = 8
        
        i32.const 40            ;; mem addr of iovec
        i32.const 21            ;; length of string
        i32.store offset=4      ;; mem[40+4] = 21

        ;; Prepare call to fd_write
        i32.const 1             ;; file descriptor: stdout
        i32.const 40            ;; pointer to ciovec
        i32.const 1             ;; len of ciovec
        i32.const 0             ;; Address of where to store the number of written bytes

        call $fd_write

        drop                    ;; drop write result
    )

    ;; Export main function as _start, which will be invoked by the runtime
    (export "_start" (func $main))

    (memory $mem 1)             ;; Memory with one page
    (export "memory" (memory 0));; Export memory so that the runtime can access it

    ;; Init memory with constant data
    (data (i32.const 8) "Hello from WASM-WASI\n")
)