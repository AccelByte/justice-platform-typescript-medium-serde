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
import * as t from "io-ts";
import { right, chain, tryCatch } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
// Image URL will be prefixed
var PREFIX = "platform:youtube_id:";
var YoutubeRawMediumInvalidError = /** @class */ (function (_super) {
    __extends(YoutubeRawMediumInvalidError, _super);
    function YoutubeRawMediumInvalidError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return YoutubeRawMediumInvalidError;
}(Error));
export { YoutubeRawMediumInvalidError };
export var YoutubeVideoCodec = t.type({
    youtubeId: t.string,
    as: t.string,
});
export var YoutubeVideoMediumCodec = t.type({
    kind: t.literal("youtubeVideo"),
    value: YoutubeVideoCodec,
});
export var YoutubeVideoMediumHelper = {
    createFromYoutubeId: function (_a) {
        var youtubeId = _a.youtubeId, as = _a.as;
        return {
            kind: "youtubeVideo",
            value: {
                as: as,
                youtubeId: youtubeId,
            },
        };
    },
};
var youtubeIdFromUrl = function (str) {
    // return null if not prefixed by the correct prefix
    return pipe(right(str), chain(function (str) {
        if (!str.startsWith(PREFIX))
            return right(null);
        return tryCatch(function () { return decodeURIComponent(str.slice(PREFIX.length)); }, function () { return new YoutubeRawMediumInvalidError(); });
    }));
};
var youtubeIdToUrl = function (youtubeId) {
    return "" + PREFIX + encodeURIComponent(youtubeId);
};
export var fromRaw = function (raw) {
    return pipe(right(raw), chain(function (_a) {
        var imageUrl = _a.imageUrl, as = _a.as;
        return pipe(youtubeIdFromUrl(imageUrl), chain(function (youtubeId) { return right({ youtubeId: youtubeId, as: as }); }));
    }), chain(function (_a) {
        var as = _a.as, youtubeId = _a.youtubeId;
        if (!youtubeId)
            return right(null);
        return right({
            kind: "youtubeVideo",
            value: { youtubeId: youtubeId, as: as || "" },
        });
    }));
};
export var toRaw = function (data) {
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
