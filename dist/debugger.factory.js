"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputFactory = void 0;
const debugger_data_1 = require("./debugger.data");
class OutputFactory {
    static create(options) {
        // 為了避免在前端造成 bundling 問題，直接使用 require (Node風格)
        // 若使用Angular 19並非 SSR環境，可視情況修改為動態import或預先import
        const { DebuggerConsoleAccess } = require('./debugger.console.access');
        const { DebuggerApiAccess } = require('./debugger.api.access');
        if (options.debugOutputType === debugger_data_1.DebugOutputType.Console) {
            return () => new DebuggerConsoleAccess();
        }
        if (options.debugOutputType === debugger_data_1.DebugOutputType.Api) {
            if (!options.apiEndpoint) {
                console.warn('未提供 API Endpoint，將回退至 Console 輸出。');
                return () => new DebuggerConsoleAccess();
            }
            return () => new DebuggerApiAccess(options.apiEndpoint);
        }
        console.warn('不支援的輸出類型，將回退至 Console 輸出。');
        return () => new DebuggerConsoleAccess();
    }
}
exports.OutputFactory = OutputFactory;
