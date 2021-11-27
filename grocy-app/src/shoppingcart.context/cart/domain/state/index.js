"use strict";
exports.__esModule = true;
exports.Client = void 0;
var cart_1 = require("./cart");
var pending_cart_1 = require("./concrete/pending-cart");
var completed_cart_1 = require("./concrete/completed-cart");
var Client = /** @class */ (function () {
    function Client() {
    }
    Client.prototype.execute = function () {
        var cart = new cart_1.Cart(new pending_cart_1.PendingCart());
        cart.request();
        cart.transitionTo(new completed_cart_1.CompletedCart());
    };
    return Client;
}());
exports.Client = Client;
var client = new Client();
client.execute();
