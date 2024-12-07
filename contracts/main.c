 // autogenerated by cargo-stylus

#include <stylus_types.h>
#include <stylus_entry.h>
#include <bebi.h>
#include <stylus_utils.h>
#include <stylus_sdk.h>
#include "Etherra.h"


int Etherra_entry(size_t argc) {
    /* bebi32 value;
    msg_value(value);
    if (len < 4) {
        return default_func(NULL, input, len, value);
    }
    uint32_t selector = bebi_get_u32(input, 0);
    input +=4;
    len -=4;
    if (selector==SELECTOR_storeHash) {
        if (!bebi32_is_zero(value)) revert();
        return storeHash(NULL, input, len);
    }
    if (selector==SELECTOR_checkOwnership) {
        if (!bebi32_is_zero(value)) revert();
        return checkOwnership(NULL, input, len);
    }

    input -=4;
    len +=4;
    return default_func(NULL, input, len, value); */

    uint8_t argv[argc];
    read_args(argv);

    FunctionRegistry registry[] = {
      {to_function_selector("checkOwnership(bytes32)"), checkOwnership},
      {to_function_selector("storeHash(bytes32)"), storeHash},
    };

    uint32_t signature = *((uint32_t *)argv);

    ArbResult res = call_function(registry, sizeof(registry) / sizeof(registry[0]), signature, argv + 4, argc - 4);

    return (write_result(res.output, res.output_len), res.status);
}


ENTRYPOINT(Etherra_entry)
