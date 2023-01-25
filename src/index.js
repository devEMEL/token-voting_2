"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var algosdk_1 = require("algosdk");
var myalgo_1 = require("./wallets/myalgo");
var myAlgo = new myalgo_1.MyAlgoSession();
var algodClient = new algosdk_1["default"].Algodv2('', "https://node.testnet.algoexplorerapi.io", '');
function signer(txns) {
    return __awaiter(this, void 0, void 0, function () {
        var sTxns;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, myAlgo.signTxns(txns)];
                case 1:
                    sTxns = _a.sent();
                    return [2 /*return*/, sTxns.map(function (s) { return s.blob; })];
            }
        });
    });
}
var buttonIds = ['connect', 'create_app', 'create_registration_and_voting', 'optin_to_app', 'create_asset', 'optin_to_asset', 'transfer_asset', 'cast_vote', 'clear_vote'];
var buttons = {};
var accountsMenu = document.getElementById('accounts');
buttonIds.forEach(function (id) {
    buttons[id] = document.getElementById(id);
});
buttons.connect.onclick = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, myAlgo.getAccounts()];
            case 1:
                _a.sent();
                myAlgo.accounts.forEach(function (account) {
                    accountsMenu.add(new Option("".concat(account.name, " - ").concat(account.address), account.address));
                });
                return [2 /*return*/];
        }
    });
}); };
// buttons.create_app.onclick = async () => {
//   const votingApp = new Voting({
//     // @ts-ignore
//     client: algodClient,
//     signer,
//     sender: accountsMenu.selectedOptions[0].value
//   });
//   const [createdAppId, appAddr, txId] = await votingApp.create({})
// }
// Deploy our app on chain (Only works if the ApplicationSpec was used to generate the client)
// const [appId, appAddr, txId] = await appClient.create(123445, 67666, 89888, 789888);
// console.log(`Created app ${appId} with address ${appAddr} in tx ${txId}`);
// Call the method by name, with named and typed arguments
// const result = await appClient.hello({name: "Beaker"});
// Get a typed result back from our app call
// console.log(result.value); // Hello, Beaker
