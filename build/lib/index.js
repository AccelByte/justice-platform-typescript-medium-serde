"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediumHelper = exports.MediumCodec = exports.MediumSerializerNotFound = exports.MediumDeserializerNotFound = exports.YoutubeVideoMediumHelper = exports.YoutubeVideoMediumCodec = exports.ImageMediumCodec = exports.RawImageCodec = exports.RawImageTypeInvalidError = void 0;
var Either_1 = require("fp-ts/lib/Either");
var t = require("io-ts");
var raw_1 = require("./primitives/raw");
Object.defineProperty(exports, "RawImageTypeInvalidError", { enumerable: true, get: function () { return raw_1.RawImageTypeInvalidError; } });
Object.defineProperty(exports, "RawImageCodec", { enumerable: true, get: function () { return raw_1.RawImageCodec; } });
var image_1 = require("./subtypes/image");
Object.defineProperty(exports, "ImageMediumCodec", { enumerable: true, get: function () { return image_1.ImageMediumCodec; } });
var youtube_video_1 = require("./subtypes/youtube-video");
Object.defineProperty(exports, "YoutubeVideoMediumCodec", { enumerable: true, get: function () { return youtube_video_1.YoutubeVideoMediumCodec; } });
Object.defineProperty(exports, "YoutubeVideoMediumHelper", { enumerable: true, get: function () { return youtube_video_1.YoutubeVideoMediumHelper; } });
// Error Classes
var MediumDeserializerNotFound = /** @class */ (function (_super) {
    __extends(MediumDeserializerNotFound, _super);
    function MediumDeserializerNotFound() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MediumDeserializerNotFound;
}(Error));
exports.MediumDeserializerNotFound = MediumDeserializerNotFound;
var MediumSerializerNotFound = /** @class */ (function (_super) {
    __extends(MediumSerializerNotFound, _super);
    function MediumSerializerNotFound() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MediumSerializerNotFound;
}(Error));
exports.MediumSerializerNotFound = MediumSerializerNotFound;
exports.MediumCodec = t.union([youtube_video_1.YoutubeVideoMediumCodec, image_1.ImageMediumCodec]);
// array of fromRawFunctions used for MediumHelper to iterate
// while attempting to convert RawImage to Medium
var fromRawFunctions = [youtube_video_1.fromRaw, image_1.fromRaw];
// Helpers for Medium type
exports.MediumHelper = {
    fromRaw: function (raw) {
        if (!raw_1.RawImageCodec.is(raw))
            return [null, new raw_1.RawImageTypeInvalidError()];
        for (var _i = 0, fromRawFunctions_1 = fromRawFunctions; _i < fromRawFunctions_1.length; _i++) {
            var fromRawFunction = fromRawFunctions_1[_i];
            var result = fromRawFunction(raw);
            if (Either_1.isLeft(result))
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
                    return [youtube_video_1.toRaw(medium), null];
                case "image":
                    return [image_1.toRaw(medium), null];
                default:
                    return [null, new MediumSerializerNotFound()];
            }
        }
        catch (_a) {
            return [null, new MediumSerializerNotFound()];
        }
    },
};
