import * as t from "io-ts";
import { Data } from "../primitives/data";
import { RawImageType } from "../primitives/raw";
import { Either } from "fp-ts/lib/Either";
export declare class YoutubeRawMediumInvalidError extends Error {
}
export declare type YoutubeVideoType = t.TypeOf<typeof YoutubeVideoCodec>;
export declare const YoutubeVideoCodec: t.TypeC<{
    youtubeId: t.StringC;
}>;
export declare type YoutubeVideoMedium = Data & t.TypeOf<typeof YoutubeVideoMediumCodec>;
export declare const YoutubeVideoMediumCodec: t.TypeC<{
    kind: t.LiteralC<"youtubeVideo">;
    value: t.TypeC<{
        youtubeId: t.StringC;
    }>;
}>;
export declare const YoutubeVideoMediumHelper: {
    createFromYoutubeId: (youtubeId: string) => YoutubeVideoMedium;
};
export declare const fromRaw: (raw: RawImageType) => Either<Error, YoutubeVideoMedium | null>;
export declare const toRaw: (data: Data) => RawImageType | null;
