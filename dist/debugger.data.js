"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugOutputType = exports.DebugLevel = void 0;
// 日誌等級
var DebugLevel;
(function (DebugLevel) {
    DebugLevel["Info"] = "info";
    DebugLevel["Warning"] = "warning";
    DebugLevel["Error"] = "error";
})(DebugLevel = exports.DebugLevel || (exports.DebugLevel = {}));
// 輸出類型
var DebugOutputType;
(function (DebugOutputType) {
    DebugOutputType["Console"] = "console";
    DebugOutputType["Api"] = "api";
})(DebugOutputType = exports.DebugOutputType || (exports.DebugOutputType = {}));
