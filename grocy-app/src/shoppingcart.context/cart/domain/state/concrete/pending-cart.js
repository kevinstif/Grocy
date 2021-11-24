"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.PendingCart = void 0;
var cart_state_1 = require("../abstract/cart-state");
var PendingCart = /** @class */ (function (_super) {
    __extends(PendingCart, _super);
    function PendingCart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PendingCart.prototype.handle = function () {
        console.log('Pending state Cart handles request');
        console.log('The Pending state will change the state of the context');
    };
    return PendingCart;
}(cart_state_1.CartState));
exports.PendingCart = PendingCart;
