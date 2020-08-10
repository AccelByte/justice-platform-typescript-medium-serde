# Platform TS Medium Serde

This module extends Platform.Item.Image functionality to store non-image data by providing TypeScript based frontend helpers to manage medium type easily. The implementation is based on [Support Showing Youtube Videos Link - Technical Specs](https://accelbyte.atlassian.net/wiki/spaces/NAIS/pages/853999696/Support+Showing+Youtube+Videos+Link+-+Technical+Specs).

# Usage

```typescript
import {
  RawImageType,
  YoutubeVideoMediumCodec,
  YoutubeVideoMediumHelper,
  ImageMediumCodec,
} from "platform-typescript-medium-serde";

const item = getPlatformItem();
const errors: Error[] = [];
const media: Medium[] = [];
item.images.forEach((rawImage: RawImageType) => {
  const [medium, error] = MediumHelper.fromRaw(rawImage);

  // Filter RawImageType that error when parsed
  if (error) media.push(error);
  if (medium) media.push(medium);
});

// Get all YoutubeVideoMedia from Media array
const youtubeVideoMedia = medium.filter(YoutubeVideoMediumCodec.is);

// Get all YoutubeVideoMedia from Media array
const imagesMedia = medium.filter(ImageMediumCodec.is);

// Push an image media from
imagesMedia.push({
  kind: "image",
  value: {
    as: "cover-image",
    caption: "This is a image media",
    width: 1,
    height: 1,
    imageUrl: "https://domain/path/to/file.ext",
    smallImageUrl: "https://domain/path/to/small-file.ext",
  },
});

// Push a youtube video medium to the array
youtubeVideoMedia.push(
  YoutubeVideoMediumHelper.createFromYoutubeId("oHg5SJYRHA0")
);

// Convert back to RawImageType[]
const toRawErrors: Error[] = [];
const newRawImages: RawImageType[] = [];
[...youtubeVideoMedia, ...imagesMedia].forEach((medium) => {
  const [raw, error] = MediumHelper.toRaw(medium);
  if (error) toRawErrors.push(error);
  if (raw) newRawImages.push(error);
});

const newItem = { ...item, images: newRawImages };
saveItem(newItem);
```
