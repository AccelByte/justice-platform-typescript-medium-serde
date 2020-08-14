/*
 * Copyright (c) 2020 AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { MediumHelper } from "./index";
import { ImageMedium } from "./subtypes/image";
import { YoutubeVideoMedium } from "./subtypes/youtube-video";
import { RawImageType } from "./primitives/raw";

describe("ImageMedium", () => {
  const someobject: RawImageType = {
    as: "as",
    caption: "caption",
    height: 1,
    width: 1,
    imageUrl: "https://domain/some-image.ext",
    smallImageUrl: "https://domain/some-image/small.ext",
  };
  const [medium, error] = (MediumHelper.fromRaw(someobject) as unknown) as [
    ImageMedium,
    Error
  ];

  const [raw, toRawError] = MediumHelper.toRaw(medium);

  test("Valid image object converts to ImageMedium", () => {
    expect(medium).toBeTruthy();
    expect(error).toBeFalsy();
    if (medium) {
      expect(medium.kind).toBe("image");
      expect(medium.value.imageUrl).toBe("https://domain/some-image.ext");
      expect(medium.value.smallImageUrl).toBe(
        "https://domain/some-image/small.ext"
      );
      expect(medium.value.height).toBe(1);
      expect(medium.value.width).toBe(1);
      expect(medium.value.as).toBe("as");
      expect(medium.value.caption).toBe("caption");
    }
  });

  test("ImageMedium converts to rawImage", () => {
    expect(raw).toBeTruthy();
    expect(toRawError).toBeFalsy();
    if (raw) {
      expect(raw.as).toBe(someobject.as);
      expect(raw.caption).toBe(someobject.caption);
      expect(raw.height).toBe(someobject.height);
      expect(raw.width).toBe(someobject.width);
      expect(raw.imageUrl).toBe(someobject.imageUrl);
      expect(raw.smallImageUrl).toBe(someobject.smallImageUrl);
    }
  });
});

describe("YoutubeVideoMedium", () => {
  const someobject: RawImageType = {
    as: "as",
    caption: "caption",
    height: 123,
    width: 123,
    imageUrl: "accelbyte:youtube_id:oHg5SJYRHA0",
    smallImageUrl: "",
  };
  const [medium, error] = (MediumHelper.fromRaw(someobject) as unknown) as [
    YoutubeVideoMedium,
    Error
  ];
  const [raw, toRawError] = MediumHelper.toRaw(medium);

  test('Valid Image object with imageUrl prefixed with "accelbyte:youtube_id:" converts to YoutubeVideoMedium', () => {
    expect(medium).toBeTruthy();
    expect(error).toBeFalsy();
    if (medium) {
      expect(medium.kind).toBe("youtubeVideo");
      expect(medium.value.youtubeId).toBe("oHg5SJYRHA0");
    }
  });

  test("ImageMedium converts to rawImage", () => {
    expect(raw).toBeTruthy();
    expect(toRawError).toBeFalsy();
    if (raw) {
      expect(raw.imageUrl).toBe(someobject.imageUrl);
    }
  });

  test("fromRaw returns null when raw image type which imageUrl youtube id includes invalid URL character", () => {
    const raw: RawImageType = {
      as: "as",
      caption: "caption",
      height: 123,
      width: 123,
      imageUrl: "accelbyte:youtube_id:%E",
      smallImageUrl: "",
    };
    const [medium, error] = (MediumHelper.fromRaw(raw) as unknown) as [
      YoutubeVideoMedium,
      Error
    ];
    expect(medium).toBeFalsy();
    expect(error).toBeTruthy();
  });
});

test("toRaw return error when called with invalid medium", () => {
  const [medium, error] = MediumHelper.toRaw({
    kind: "invalid",
    value: "somevalue",
  } as any);
  expect(medium).toBeFalsy();
  expect(error).toBeTruthy();
});

test("toRaw return error when called with invalid parameter", () => {
  const [medium, error] = MediumHelper.toRaw(undefined as any);
  expect(medium).toBeFalsy();
  expect(error).toBeTruthy();
});

test("fromRaw return error when called with invalid parameter", () => {
  const [medium, error] = MediumHelper.fromRaw("randomvalue");
  expect(medium).toBeFalsy();
  expect(error).toBeTruthy();
});

test("Object without imageUrl does not parse to Medium", () => {
  const someobject = {
    as: "",
    caption: "",
    height: "",
    width: "",
    smallImageUrl: "",
  };
  const [medium, error] = MediumHelper.fromRaw(someobject);
  expect(error).toBeTruthy();
  expect(medium).toBe(null);
});
