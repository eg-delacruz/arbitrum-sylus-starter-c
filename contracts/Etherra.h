 // autogenerated by cargo-stylus
#ifndef __ETHERRA_ETHERRA_
#define __ETHERRA_ETHERRA_

#include <stylus_types.h>
#include <bebi.h>

#ifdef __cplusplus
extern "C" {
#endif

ArbResult default_func(void *storage, uint8_t *input, size_t len, bebi32 value);

#define SELECTOR_storeHash 0x7fe88885 // storeHash(bytes32)
ArbResult storeHash(void *storage, uint8_t *input, size_t len); // storeHash(bytes32)
#define SELECTOR_checkOwnership 0xde0be52d // checkOwnership(bytes32)
ArbResult checkOwnership(const void *storage, uint8_t *input, size_t len); // checkOwnership(bytes32)

#define STORAGE_SLOT__properties {0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00} // t_mapping(t_bytes32,t_address)


#ifdef __cplusplus
}
#endif

#endif // __ETHERRA_ETHERRA_
