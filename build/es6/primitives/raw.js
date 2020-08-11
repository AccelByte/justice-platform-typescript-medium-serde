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
export var RawImageCodec = t.intersection([
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
var RawImageTypeInvalidError = /** @class */ (function (_super) {
    __extends(RawImageTypeInvalidError, _super);
    function RawImageTypeInvalidError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RawImageTypeInvalidError;
}(Error));
export { RawImageTypeInvalidError };
