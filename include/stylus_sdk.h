// Adapted from:
// https://github.com/OffchainLabs/zig-on-stylus/blob/main/WALKTHROUGH.md
//
// Copyright 2022-2023, Offchain Labs, Inc.
// For licensing, see https://github.com/stylus-sdk-c/blob/stylus/licenses/COPYRIGHT.md

#ifndef STYLUS_SDK_H
#define STYLUS_SDK_H

#include "stylus_entry.h"

#ifdef __cplusplus
extern "C"
{
#endif

  VM_HOOK(pay_for_memory_grow)
  void pay_for_memory_grow(const uint16_t pages);

  VM_HOOK(storage_cache_bytes32)
  // Store 32bytes slot in the permanent storage - https://github.com/OffchainLabs/stylus-sdk-rs/blob/main/stylus-sdk/src/hostio.rs#L113
  void storage_cache_bytes32(const uint8_t *key, const uint8_t *value);

  VM_HOOK(storage_flush_cache)
  // Confirm to store all cached bytes - https://github.com/OffchainLabs/stylus-sdk-rs/blob/main/stylus-sdk/src/hostio.rs#L119
  void storage_flush_cache(bool clean_cache);

  // Define the FunctionRegistry struct
  typedef struct
  {
    uint32_t signature;
    ArbResult (*function)(uint8_t *input, size_t len);
  } FunctionRegistry;

  ArbResult call_function(FunctionRegistry *registry, uint8_t registry_size, uint32_t signature, uint8_t *input, size_t len);

  uint32_t to_function_selector(const char *function_abi);

#ifdef __cplusplus
}
#endif

#endif
