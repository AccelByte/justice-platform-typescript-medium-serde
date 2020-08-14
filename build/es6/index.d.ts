import * as t from "io-ts";
import { RawImageType, RawImageTypeInvalidError, RawImageCodec } from "./primitives/raw";
import { ImageMedium, ImageMediumCodec } from "./subtypes/image";
import { YoutubeVideoMedium, YoutubeVideoMediumCodec, YoutubeVideoMediumHelper } from "./subtypes/youtube-video";
export { RawImageType, RawImageTypeInvalidError, RawImageCodec, ImageMediumCodec, ImageMedium, YoutubeVideoMedium, YoutubeVideoMediumCodec, YoutubeVideoMediumHelper, };
export declare class MediumDeserializerNotFound extends Error {
}
export declare class MediumSerializerNotFound extends Error {
}
export declare type Medium = t.TypeOf<typeof MediumCodec>;
export declare const MediumCodec: t.UnionC<[t.TypeC<{
    kind: t.LiteralC<"youtubeVideo">;
    value: t.TypeC<{
        youtubeId: t.StringC;
        as: t.StringC;
    }>;
}>, t.TypeC<{
    kind: t.LiteralC<"image">;
    value: t.TypeC<{
        as: t.StringC;
        caption: t.StringC;
        height: t.NumberC;
        width: t.NumberC;
        imageUrl: t.StringC;
        smallImageUrl: t.StringC;
    }>;
}>]>;
export declare const MediumHelper: {
    fromRaw: (raw: unknown) => [Medium | null, null] | [null, Error];
    toRaw: (medium: Medium) => [RawImageType | null, null] | [null, Error];
};
