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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as t from "io-ts";
import { right, left } from "fp-ts/lib/Either";
var ImageTypeInvalidError = /** @class */ (function (_super) {
    __extends(ImageTypeInvalidError, _super);
    function ImageTypeInvalidError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ImageTypeInvalidError;
}(Error));
export { ImageTypeInvalidError };
export var ImageCodec = t.type({
    as: t.string,
    caption: t.string,
    height: t.number,
    width: t.number,
    imageUrl: t.string,
    smallImageUrl: t.string,
});
export var ImageMediumCodec = t.type({
    kind: t.literal("image"),
    value: ImageCodec,
});
export var fromRaw = function (raw) {
    if (!ImageCodec.is(raw))
        return left(new ImageTypeInvalidError());
    return right({
        kind: "image",
        value: __assign({}, raw),
    });
};
export var toRaw = function (data) {
    if (ImageMediumCodec.is(data)) {
        return __assign({}, data.value);
    }
    return null;
};
