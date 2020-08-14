/*
 * Copyright (c) 2020 AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import * as t from "io-ts";
import { RawImageType } from "../primitives/raw";
import { Either, right, left } from "fp-ts/lib/Either";
import { Data } from "../primitives/data";

export class ImageTypeInvalidError extends Error {}

export type ImageType = t.TypeOf<typeof ImageCodec>;
export const ImageCodec = t.type({
  as: t.string,
  caption: t.string,
  height: t.number,
  width: t.number,
  imageUrl: t.string,
  smallImageUrl: t.string,
});
export type ImageMedium = Data & t.TypeOf<typeof ImageMediumCodec>;
export const ImageMediumCodec = t.type({
  kind: t.literal("image"),
  value: ImageCodec,
});

export const fromRaw = (
  raw: RawImageType
): Either<Error, ImageMedium | null> => {
  if (!ImageCodec.is(raw)) return left(new ImageTypeInvalidError());
  return right({
    kind: "image",
    value: { ...raw },
  });
};

export const toRaw = (data: Data): RawImageType | null => {
  if (ImageMediumCodec.is(data)) {
    return { ...data.value };
  }
  return null;
};
