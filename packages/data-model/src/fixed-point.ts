import {
    DecodeResult,
    encodeBigInt,
    decodeBigInt,
    createBuilder,
    FragmentBuilder,
    mapDecodeResult,
} from '@scale-codec/definition-runtime';
import { f64ToFixnum, fixnumToF64 } from '@iroha2/i64-fixnum';

const PRECISION = 9;

function encodeFixedI64P9(f64Str: string): Uint8Array {
    return encodeBigInt(f64ToFixnum(f64Str, PRECISION), 'i64');
}

function decodeFixedI64P9(input: Uint8Array): DecodeResult<string> {
    return mapDecodeResult(decodeBigInt(input, 'i64'), (bi) => fixnumToF64(bi, PRECISION));
}

export const FixedPointI64P9: FragmentBuilder<string> = createBuilder(
    'FixedPointI64P9',
    encodeFixedI64P9,
    decodeFixedI64P9,
);
