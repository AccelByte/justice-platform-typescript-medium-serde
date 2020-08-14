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
exports.toRaw = exports.fromRaw = exports.YoutubeVideoMediumHelper = exports.YoutubeVideoMediumCodec = exports.YoutubeVideoCodec = exports.YoutubeRawMediumInvalidError = void 0;
var t = require("io-ts");
var Either_1 = require("fp-ts/lib/Either");
var function_1 = require("fp-ts/lib/function");
// Image URL will be prefixed
var PREFIX = "platform:youtube_id:";
var YoutubeRawMediumInvalidError = /** @class */ (function (_super) {
    __extends(YoutubeRawMediumInvalidError, _super);
    function YoutubeRawMediumInvalidError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return YoutubeRawMediumInvalidError;
}(Error));
exports.YoutubeRawMediumInvalidError = YoutubeRawMediumInvalidError;
exports.YoutubeVideoCodec = t.type({
    youtubeId: t.string,
    as: t.string,
});
exports.YoutubeVideoMediumCodec = t.type({
    kind: t.literal("youtubeVideo"),
    value: exports.YoutubeVideoCodec,
});
exports.YoutubeVideoMediumHelper = {
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
    return function_1.pipe(Either_1.right(str), Either_1.chain(function (str) {
        if (!str.startsWith(PREFIX))
            return Either_1.right(null);
        return Either_1.tryCatch(function () { return decodeURIComponent(str.slice(PREFIX.length)); }, function () { return new YoutubeRawMediumInvalidError(); });
    }));
};
var youtubeIdToUrl = function (youtubeId) {
    return "" + PREFIX + encodeURIComponent(youtubeId);
};
exports.fromRaw = function (raw) {
    return function_1.pipe(Either_1.right(raw), Either_1.chain(function (_a) {
        var imageUrl = _a.imageUrl, as = _a.as;
        return function_1.pipe(youtubeIdFromUrl(imageUrl), Either_1.chain(function (youtubeId) { return Either_1.right({ youtubeId: youtubeId, as: as }); }));
    }), Either_1.chain(function (_a) {
        var as = _a.as, youtubeId = _a.youtubeId;
        if (!youtubeId)
            return Either_1.right(null);
        return Either_1.right({
            kind: "youtubeVideo",
            value: { youtubeId: youtubeId, as: as || "" },
        });
    }));
};
exports.toRaw = function (data) {
    if (exports.YoutubeVideoMediumCodec.is(data)) {
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
