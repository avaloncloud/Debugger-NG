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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Debugger = void 0;
const debugger_data_1 = require("./debugger.data");
class Debugger {
    constructor(debug, outputImplFactory) {
        this.entries = [];
        this.debug = debug;
        this.outputImpl = outputImplFactory();
    }
    add(entry) {
        this.entries.push(entry);
    }
    setDebug(debug) {
        this.debug = debug;
    }
    Output() {
        return __awaiter(this, void 0, void 0, function* () {
            const hasError = this.entries.some(e => e.level === debugger_data_1.DebugLevel.Error);
            if (hasError || this.debug) {
                yield this.outputImpl.writeEntries(this.entries);
            }
            // 輸出後清空記錄，避免重複輸出
            this.entries = [];
        });
    }
}
exports.Debugger = Debugger;
