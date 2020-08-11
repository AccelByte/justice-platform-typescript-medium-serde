import * as t from "io-ts";
import { RawImageType } from "../primitives/raw";
import { Either } from "fp-ts/lib/Either";
import { Data } from "../primitives/data";
export declare class ImageTypeInvalidError extends Error {
}
export declare type ImageType = t.TypeOf<typeof ImageCodec>;
export declare const ImageCodec: t.TypeC<{
    as: t.StringC;
    caption: t.StringC;
    height: t.NumberC;
    width: t.NumberC;
    imageUrl: t.StringC;
    smallImageUrl: t.StringC;
}>;
export declare type ImageMedium = Data & t.TypeOf<typeof ImageMediumCodec>;
export declare const ImageMediumCodec: t.TypeC<{
    kind: t.LiteralC<"image">;
    value: t.TypeC<{
        as: t.StringC;
        caption: t.StringC;
        height: t.NumberC;
        width: t.NumberC;
        imageUrl: t.StringC;
        smallImageUrl: t.StringC;
    }>;
}>;
export declare const fromRaw: (raw: RawImageType) => Either<Error, ImageMedium | null>;
export declare const toRaw: (data: Data) => RawImageType | null;
