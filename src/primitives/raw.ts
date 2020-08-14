/*
 * Copyright (c) 2020 AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import * as t from "io-ts";

/**
 * Representation of Platform.Item.Image
 * Used to maintain struct correctness while transforming medium
 */
export type RawImageType = t.TypeOf<typeof RawImageCodec>;
export const RawImageCodec = t.intersection([
  t.type({
    imageUrl: t.string,
  }),
  t.partial({
    as: t.string,
    caption: t.string,
    height: t.number,
    width: t.number,
    smallImageUrl: t.string,
  }),
]);

export class RawImageTypeInvalidError extends Error {}
