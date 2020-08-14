import * as t from "io-ts";
/**
 * Representation of Platform.Item.Image
 * Used to maintain struct correctness while transforming medium
 */
export declare type RawImageType = t.TypeOf<typeof RawImageCodec>;
export declare const RawImageCodec: t.IntersectionC<[t.TypeC<{
    imageUrl: t.StringC;
}>, t.PartialC<{
    as: t.StringC;
    caption: t.StringC;
    height: t.NumberC;
    width: t.NumberC;
    smallImageUrl: t.StringC;
}>]>;
export declare class RawImageTypeInvalidError extends Error {
}
