"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebuggerConsoleAccess = void 0;
const debugger_data_1 = require("./debugger.data");
class DebuggerConsoleAccess {
    writeEntries(entries) {
        for (const entry of entries) {
            switch (entry.level) {
                case debugger_data_1.DebugLevel.Error:
                    console.error(`【${entry.function}】${entry.message}`, ...entry.args);
                    break;
                case debugger_data_1.DebugLevel.Warning:
                    console.warn(`【${entry.function}】${entry.message}`, ...entry.args);
                    break;
                default:
                    console.info(`【${entry.function}】${entry.message}`, ...entry.args);
                    break;
            }
        }
    }
}
exports.DebuggerConsoleAccess = DebuggerConsoleAccess;
