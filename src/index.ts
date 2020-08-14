/*
 * Copyright (c) 2020 AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { Either, isLeft } from "fp-ts/lib/Either";
import * as t from "io-ts";
import {
  RawImageType,
  RawImageTypeInvalidError,
  RawImageCodec,
} from "./primitives/raw";
import {
  ImageMedium,
  ImageMediumCodec,
  fromRaw as fromRawToImage,
  toRaw as toRawFromImage,
} from "./subtypes/image";
import {
  YoutubeVideoMedium,
  YoutubeVideoMediumCodec,
  YoutubeVideoMediumHelper,
  fromRaw as fromRawToYoutubeVideo,
  toRaw as toRawFromYoutubeVideo,
} from "./subtypes/youtube-video";

export {
  RawImageType,
  RawImageTypeInvalidError,
  RawImageCodec,
  ImageMediumCodec,
  ImageMedium,
  YoutubeVideoMedium,
  YoutubeVideoMediumCodec,
  YoutubeVideoMediumHelper,
};

// Error Classes
export class MediumDeserializerNotFound extends Error {}
export class MediumSerializerNotFound extends Error {}

// Medium and Medium Codec
export type Medium = t.TypeOf<typeof MediumCodec>;
export const MediumCodec = t.union([YoutubeVideoMediumCodec, ImageMediumCodec]);

// array of fromRawFunctions used for MediumHelper to iterate
// while attempting to convert RawImage to Medium
const fromRawFunctions: ((
  raw: RawImageType
) => Either<Error, Medium | null>)[] = [fromRawToYoutubeVideo, fromRawToImage];

// Helpers for Medium type
export const MediumHelper = {
  fromRaw: (raw: unknown): [Medium | null, null] | [null, Error] => {
    if (!RawImageCodec.is(raw)) return [null, new RawImageTypeInvalidError()];
    for (const fromRawFunction of fromRawFunctions) {
      const result = fromRawFunction(raw);
      if (isLeft(result)) return [null, result.left];
      if (result.right && result.right !== null) return [result.right, null];
    }
    return [null, new MediumDeserializerNotFound()];
  },
  toRaw: (medium: Medium): [RawImageType | null, null] | [null, Error] => {
    try {
      switch (medium.kind) {
        case "youtubeVideo":
          return [toRawFromYoutubeVideo(medium), null];
        case "image":
          return [toRawFromImage(medium), null];
        default:
          return [null, new MediumSerializerNotFound()];
      }
    } catch {
      return [null, new MediumSerializerNotFound()];
    }
  },
};
