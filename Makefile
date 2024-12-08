STACK_SIZE=8192
CC=clang
LD=wasm-ld
CFLAGS=-Iinclude/ -Istylus-sdk-c/include --target=wasm32 -Os --no-standard-libraries -mbulk-memory -Wall -g -Wno-incompatible-function-pointer-types
LDFLAGS=-O2 --no-entry --stack-first -z stack-size=$(STACK_SIZE) -Bstatic

NAME = etherra.wasm

C_FILES = $(wildcard contracts/*.c) $(wildcard stylus-sdk-c/src/*.c)


OBJECTS = $(patsubst %.c, %.o, $(C_FILES))

all: $(NAME)

# Paso 1
$(OBJECTS): %.o: %.c
	@echo "Compiling $<..."
	@$(CC) $(CFLAGS) -c $< -o $@

# Paso 2: Enlazar
etherra_unstripped.wasm: $(OBJECTS) # TODO: Obtener los objetos correctos
	$(LD) $(LDFLAGS) $(OBJECTS) -o $@


$(NAME): etherra_unstripped.wasm
	wasm-strip -o $@ $<

# Step 4: check the wasm using cargo-stylus
# cargo stylus check --wasm-file ./etherra.wasm -e https://sepolia-rollup.arbitrum.io/rpc

# Step 5: deploy the wasm using cargo-stylus
# cargo stylus deploy --wasm-file ./etherra.wasm -e https://sepolia-rollup.arbitrum.io/rpc --cargo-stylus-version 0.5.3 --private-key 9b73cc1b5ac7be0d5fe5e7b8bcaf379c49365c80220d1cd169e678c53ade54f1

clean:
	@rm -rf $(OBJECTS) c_unstripped.wasm $(NAME)
re: clean all

frontend: all
	@npm run frontend

.phony: all clean cargo-generate re play frontend
