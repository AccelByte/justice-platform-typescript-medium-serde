# Platform TS Medium Serde

This module extends Platform.Item.Image functionality to store non-image data by providing TypeScript based frontend helpers to manage medium type easily. The implementation is based on [Support Showing Youtube Videos Link - Technical Specs](https://accelbyte.atlassian.net/wiki/spaces/NAIS/pages/853999696/Support+Showing+Youtube+Videos+Link+-+Technical+Specs).

# Usage

Installing dependencies

```
// You can use both git+ssh or git+https protocol as long as you have the credentials
npm install git+ssh://bitbucket.org/accelbyte/justice-platform-typescript-medium-serde.git

// Installing from specific branch
npm install git+ssh://bitbucket.org/accelbyte/justice-platform-typescript-medium-serde.git#v0.1.0
```

Using the package

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
  YoutubeVideoMediumHelper.createFromYoutubeId({
    youtubeId: "oHg5SJYRHA0",
    as: "",
  })
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

# Development

### Prerequisites

- Make
- Docker

###### Building the project

```bash
make build
```

###### Testing the project

```bash
make test
```

# Publishing Package

Build files are committed to the repository inside `build` directory to allow installing the package directly from git.

Before pushing a commit make sure to execute `make build` and `make test`.

Jenkins jobs are run on commits to make sure builds are up-to-date. When build files are not up-to-date the Jenkins jobs will fail and update the commit status
