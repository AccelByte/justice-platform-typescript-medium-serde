/*
 * Copyright (c) 2020 AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import * as t from "io-ts";
import { Data } from "../primitives/data";
import { RawImageType } from "../primitives/raw";
import { Either, right, chain, tryCatch } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";

// Image URL will be prefixed
const PREFIX = "accelbyte:youtube_id:";

export class YoutubeRawMediumInvalidError extends Error {}

export type YoutubeVideoType = t.TypeOf<typeof YoutubeVideoCodec>;
export const YoutubeVideoCodec = t.type({
  youtubeId: t.string,
});
export type YoutubeVideoMedium = Data &
  t.TypeOf<typeof YoutubeVideoMediumCodec>;
export const YoutubeVideoMediumCodec = t.type({
  kind: t.literal("youtubeVideo"),
  value: YoutubeVideoCodec,
});
export const YoutubeVideoMediumHelper = {
  createFromYoutubeId: (youtubeId: string): YoutubeVideoMedium => {
    return {
      kind: "youtubeVideo",
      value: {
        youtubeId,
      },
    };
  },
};

const encodedToYoutubeId = (
  str: string
): Either<YoutubeRawMediumInvalidError, string | null> => {
  // return null if not prefixed by the correct prefix
  return pipe(
    right(str),
    chain((str) => {
      if (!str.startsWith(PREFIX)) return right(null);
      return tryCatch(
        () => decodeURIComponent(str.slice(PREFIX.length)),
        () => new YoutubeRawMediumInvalidError()
      );
    })
  );
};
const youtubeIdToEncoded = (youtubeId: string): string =>
  `${PREFIX}${encodeURIComponent(youtubeId)}`;

export const fromRaw = (
  raw: RawImageType
): Either<Error, YoutubeVideoMedium | null> => {
  return pipe(
    right(raw),
    chain((raw) => encodedToYoutubeId(raw.imageUrl)),
    chain((youtubeVideoId) => {
      if (!youtubeVideoId) return right(null);
      return right({
        kind: "youtubeVideo",
        value: { youtubeId: youtubeVideoId },
      });
    })
  );
};

export const toRaw = (data: Data): RawImageType | null => {
  if (YoutubeVideoMediumCodec.is(data)) {
    return {
      as: "",
      caption: "",
      height: 0,
      width: 0,
      smallImageUrl: "",
      imageUrl: youtubeIdToEncoded(data.value.youtubeId),
    };
  }
  return null;
};
