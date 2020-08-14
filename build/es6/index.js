/*
 * Copyright (c) 2020 AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { isLeft } from "fp-ts/lib/Either";
import * as t from "io-ts";
import { RawImageTypeInvalidError, RawImageCodec, } from "./primitives/raw";
import { ImageMediumCodec, fromRaw as fromRawToImage, toRaw as toRawFromImage, } from "./subtypes/image";
import { YoutubeVideoMediumCodec, YoutubeVideoMediumHelper, fromRaw as fromRawToYoutubeVideo, toRaw as toRawFromYoutubeVideo, } from "./subtypes/youtube-video";
export { RawImageTypeInvalidError, RawImageCodec, ImageMediumCodec, YoutubeVideoMediumCodec, YoutubeVideoMediumHelper, };
// Error Classes
var MediumDeserializerNotFound = /** @class */ (function (_super) {
    __extends(MediumDeserializerNotFound, _super);
    function MediumDeserializerNotFound() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MediumDeserializerNotFound;
}(Error));
export { MediumDeserializerNotFound };
var MediumSerializerNotFound = /** @class */ (function (_super) {
    __extends(MediumSerializerNotFound, _super);
    function MediumSerializerNotFound() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MediumSerializerNotFound;
}(Error));
export { MediumSerializerNotFound };
export var MediumCodec = t.union([YoutubeVideoMediumCodec, ImageMediumCodec]);
// array of fromRawFunctions used for MediumHelper to iterate
// while attempting to convert RawImage to Medium
var fromRawFunctions = [fromRawToYoutubeVideo, fromRawToImage];
// Helpers for Medium type
export var MediumHelper = {
    fromRaw: function (raw) {
        if (!RawImageCodec.is(raw))
            return [null, new RawImageTypeInvalidError()];
        for (var _i = 0, fromRawFunctions_1 = fromRawFunctions; _i < fromRawFunctions_1.length; _i++) {
            var fromRawFunction = fromRawFunctions_1[_i];
            var result = fromRawFunction(raw);
            if (isLeft(result))
                return [null, result.left];
            if (result.right && result.right !== null)
                return [result.right, null];
        }
        return [null, new MediumDeserializerNotFound()];
    },
    toRaw: function (medium) {
        try {
            switch (medium.kind) {
                case "youtubeVideo":
                    return [toRawFromYoutubeVideo(medium), null];
                case "image":
                    return [toRawFromImage(medium), null];
                default:
                    return [null, new MediumSerializerNotFound()];
            }
        }
        catch (_a) {
            return [null, new MediumSerializerNotFound()];
        }
    },
};
