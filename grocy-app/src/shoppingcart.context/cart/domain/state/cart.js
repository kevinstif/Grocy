"use strict";
exports.__esModule = true;
exports.Cart = void 0;
var Cart = /** @class */ (function () {
    function Cart(state) {
        this.transitionTo(state);
    }
    Cart.prototype.transitionTo = function (state) {
        console.log("Context: Change state to " + state.constructor.name + ".");
        this.state = state;
        this.state.setContext(this);
    };
    Cart.prototype.request = function () {
        this.state.handle();
    };
    return Cart;
}());
exports.Cart = Cart;
