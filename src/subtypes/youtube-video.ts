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
const PREFIX = "platform:youtube_id:";

export class YoutubeRawMediumInvalidError extends Error {}

export type YoutubeVideoType = t.TypeOf<typeof YoutubeVideoCodec>;
export const YoutubeVideoCodec = t.type({
  youtubeId: t.string,
  as: t.string,
});
export type YoutubeVideoMedium = Data &
  t.TypeOf<typeof YoutubeVideoMediumCodec>;
export const YoutubeVideoMediumCodec = t.type({
  kind: t.literal("youtubeVideo"),
  value: YoutubeVideoCodec,
});
export const YoutubeVideoMediumHelper = {
  createFromYoutubeId: ({
    youtubeId,
    as,
  }: {
    youtubeId: string;
    as: string;
  }): YoutubeVideoMedium => {
    return {
      kind: "youtubeVideo",
      value: {
        as,
        youtubeId,
      },
    };
  },
};

const youtubeIdFromUrl = (
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
const youtubeIdToUrl = (youtubeId: string): string =>
  `${PREFIX}${encodeURIComponent(youtubeId)}`;

export const fromRaw = (
  raw: RawImageType
): Either<Error, YoutubeVideoMedium | null> => {
  return pipe(
    right(raw),
    chain(({ imageUrl, as }) =>
      pipe(
        youtubeIdFromUrl(imageUrl),
        chain((youtubeId) => right({ youtubeId, as }))
      )
    ),
    chain(({ as, youtubeId }) => {
      if (!youtubeId) return right(null);
      return right({
        kind: "youtubeVideo",
        value: { youtubeId: youtubeId, as: as || "" },
      });
    })
  );
};

export const toRaw = (data: Data): RawImageType | null => {
  if (YoutubeVideoMediumCodec.is(data)) {
    return {
      as: data.value.as,
      // Platform does not allow blank caption
      caption: "-",
      height: 0,
      width: 0,
      smallImageUrl: youtubeIdToUrl(data.value.youtubeId),
      imageUrl: youtubeIdToUrl(data.value.youtubeId),
    };
  }
  return null;
};
