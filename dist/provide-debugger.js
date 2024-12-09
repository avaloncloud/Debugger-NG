"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideDebugger = void 0;
const debugger_1 = require("./debugger");
const debugger_factory_1 = require("./debugger.factory");
function provideDebugger(options) {
    return {
        provide: debugger_1.Debugger,
        useFactory: () => {
            var _a;
            const factory = debugger_factory_1.OutputFactory.create({
                debugOutputType: options.debugOutputType,
                apiEndpoint: options.apiEndpoint
            });
            return new debugger_1.Debugger((_a = options.debug) !== null && _a !== void 0 ? _a : true, factory);
        }
    };
}
exports.provideDebugger = provideDebugger;
