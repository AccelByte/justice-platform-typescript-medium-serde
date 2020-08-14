/*
 * Copyright (c) 2020 AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import {
  toRaw,
  fromRaw,
  YoutubeVideoMediumCodec,
  YoutubeVideoMediumHelper,
} from "./youtube-video";
import { isRight } from "fp-ts/lib/Either";

test("toRaw returns null when given invalid parameter", () => {
  expect(toRaw(1 as any)).toBe(null);
  expect(toRaw("1" as any)).toBe(null);
  expect(toRaw({} as any)).toBe(null);
  expect(toRaw(new Error() as any)).toBe(null);
  expect(toRaw((() => {}) as any)).toBe(null);
});

test('fromRaw returns video with `as`="" if `as` is not provided', () => {
  const result = fromRaw({
    imageUrl: "platform:youtube_id:oHg5SJYRHA0",
  });
  expect(isRight(result)).toBe(true);
  expect(isRight(result) && (result.right as any).value.youtubeId).toBe(
    "oHg5SJYRHA0"
  );
  expect(isRight(result) && (result.right as any).value.as).toBe("");
});

test("createFromYoutubeId returns YoutubeVideoMedium", () => {
  expect(
    YoutubeVideoMediumCodec.is(
      YoutubeVideoMediumHelper.createFromYoutubeId({
        youtubeId: "oHg5SJYRHA0",
        as: "",
      })
    )
  ).toBeTruthy();
});
