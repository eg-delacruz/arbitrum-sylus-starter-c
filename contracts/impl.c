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

ArbResult hola_mundo(uint8_t *input, size_t len)
{
  memcpy(buf_out, input, 32);
  return _success_bebi32(buf_out);
}

// Calcula el slot para el map de propiedades de una cuenta
void hash_idx_storage_slot(bebi32 const hash, bebi32 slot_out) {
    bebi32 base = STORAGE_SLOT_hash_idx;
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
    hash_idx_storage_slot(hash, slot);
    bebi32 buffer;
    storage_load_bytes32( slot, buffer);
    return bebi32_get_u64(buffer);
}

bool propertyExist(const void *storage, bebi32 const hash)
{
	return _property_idx(storage, hash) != 0;
}

uint64_t _hash_idx(const void *storage, bebi32 const hash)
{
    bebi32 slot;
    hash_idx_storage_slot(hash, slot);
    bebi32 buffer;
    storage_load_bytes32( slot, buffer);
    return bebi32_get_u64(buffer);
}


// Inspirada en el estandar ERC20 balanceOf(address)
// En su lugar recibe hash
ArbResult checkOwnership(const void *storage, uint8_t *input, size_t len) { // balanceOf(address)
    // validate input is an address padded to 32 bytes
    if (len != 32) {
        return _return_nodata(Failure);
    }

    uint8_t hash[32];
	memcpy(hash, input, 32);


    uint8_t owner[32];
    msg_sender_padded(owner);

    if(!bebi32_is_zero(owner))
    {
        uint8_t idx_hash_slot[32];
        hash_idx_storage_slot(hash, idx_hash_slot);

        storage_load_bytes32(idx_hash_slot, buf_out);
        if (bebi32_cmp(buf_out, owner) != 0)
            return _return_short_string(Success, "not_owner");
        else
            return _return_short_string(Success, "owner");
    }

    return _return_short_string(Failure, "not_owner");
}

ArbResult storeHash(void *storage, uint8_t *input, size_t len) {
    if (len != 32) {
        return _return_short_string(Failure, "Invalid input length");
    }

    // Obteniendo el hash desde el input
    uint8_t hash[32];
	memcpy(hash, input, 32);

    // La wallet que se guardará en el map;
    uint8_t owner[32];
    msg_sender_padded(owner);

    if(!bebi32_is_zero(owner))
    {
        // Obtenemos el index del map donde guardaremos la info
        uint8_t idx_hash_slot[32];
        hash_idx_storage_slot(hash, idx_hash_slot);

        // Guardamos en cache
        storage_cache_bytes32(idx_hash_slot, owner);

        // Persistimo la información
        storage_flush_cache(false);
    }

    return _return_short_string(Success, "Guardado");
}
