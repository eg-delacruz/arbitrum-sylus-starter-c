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
etherra_unstripped.wasm: $(OBJECTS)
	$(LD) $(LDFLAGS) $(OBJECTS) -o $@


$(NAME): etherra_unstripped.wasm
	wasm-strip -o $@ $<

# Step 4: check the wasm using cargo-stylus
check: 
	cargo stylus check --wasm-file ./etherra.wasm -e https://sepolia-rollup.arbitrum.io/rpc

deploy:
	cargo stylus deploy --wasm-file ./etherra.wasm -e https://sepolia-rollup.arbitrum.io/rpc --cargo-stylus-version 0.5.3 --private-key $PRIVATE_KEY

# Step 5: deploy the wasm using cargo-stylus
# cargo stylus deploy --wasm-file ./etherra.wasm -e https://sepolia-rollup.arbitrum.io/rpc --cargo-stylus-version 0.5.3 --private-key $PRIVATE_KEY

interface.json: interface_compile.json ./contracts/etherra.sol
	cat $< | solc --standard-json --pretty-json > $@

cargo-generate: interface.json
	cargo stylus cgen $< interface-gen
	cp ./interface-gen/etherra/Etherra.h ./contracts/

clean:
	@rm -rf $(OBJECTS) etherra_unstripped.wasm $(NAME)
re: clean all

frontend: all
	@npm run frontend

.phony: all clean cargo-generate re play frontend
