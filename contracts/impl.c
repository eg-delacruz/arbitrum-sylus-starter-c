#include <string.h>
#include <stylus_types.h>
#include <bebi.h>
#include <storage.h>
#include <stdbool.h>
#include <stylus_debug.h>
#include <stylus_utils.h>
#include "Etherra.h"


/**
 * Aquí definimos las funciones con las que se puede interacturar con el contrato
 *
 * Puedes ver:
 * etherra.sol -> Aquí se define la interfaz que es generada
 * Makefile -> Para observar el proceso para construir las dependencias
 *
 */


// buffer used to write output, avoiding malloc
uint8_t buf_out[32];

// succeed and return a bebi32
ArbResult inline _success_bebi32(bebi32 const retval) {
    ArbResult res = {Success, retval , 32};
    return res;
}

// Calcula el slot para el map de propiedades de una cuenta
void property_slot(bebi32 const hash, bebi32 slot_out) {
    bebi32 base = STORAGE_SLOT__properties;
    map_slot(base, hash, 32, slot_out);
}

// FUENTE: ejemplo en stylus-sdk-c/examples/impl.c
// the default function is called if input doesn't match any selector
ArbResult default_func(void *storage, uint8_t *input, size_t len, bebi32 value) {
    // This will cause a revert with a reason strong, which can help debug
    return _return_short_string(Failure, "not supported");
}

// get index of a property from properties map
uint64_t _property_idx(const void *storage, bebi32 const hash) {
    bebi32 slot;
    property_slot(hash, slot);
    bebi32 buffer;
    storage_load(storage, slot, buffer);
    return bebi32_get_u64(buffer);
}

bool propertyExist(const void *storage, bebi32 const hash)
{
	return _property_idx(storage, hash) != 0;
}

// Inspirada en el estandar ERC20 balanceOf(address)
// En su lugar recibe hash
ArbResult checkOwnership(const void *storage, uint8_t *input, size_t len) { // balanceOf(address)
    // validate input is an address padded to 32 bytes
    if (len != 32) {
        return _return_nodata(Failure);
    }

    // Copiamos los primeros 32 bytes de input a hash
	bebi32 hash;
	memcpy(hash, input, 32);

	if (!propertyExist(storage, hash)) {
        return _return_short_string(Failure, "Property doesn't exist");
    }

	// Creo que obtenemos el valor de value en el map para el hash dado;
	property_slot(hash, buf_out);

	// Obtenemos la address de quien interactua con el contrato
	// bebi32 sender;
	// msg_sender_padded(sender);

    return _success_bebi32(buf_out);
}

ArbResult storeHash(void *storage, uint8_t *input, size_t len) {
    if (len != 32) {
        return _return_short_string(Failure, "Invalid input length");
    }

    bebi32 slot;
    bebi32 hash;
    memcpy(hash, input, 32);
    property_slot(hash, slot);

    return _return_short_string(Success, "Hash stored successfully");
}


