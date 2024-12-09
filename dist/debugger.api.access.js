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
exports.DebuggerApiAccess = void 0;
class DebuggerApiAccess {
    constructor(apiEndpoint) {
        this.apiEndpoint = apiEndpoint;
    }
    writeEntries(entries) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.apiEndpoint) {
                console.warn('未提供 API Endpoint，無法透過 API 寫入日誌。');
                return;
            }
            try {
                const response = yield fetch(this.apiEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(entries)
                });
                if (!response.ok) {
                    console.warn(`傳送日誌至 API 失敗，狀態碼：${response.status}`);
                }
                else {
                    console.info('成功將日誌傳送至 API。');
                }
            }
            catch (error) {
                console.error('傳送日誌至 API 時發生錯誤：', error);
            }
        });
    }
}
exports.DebuggerApiAccess = DebuggerApiAccess;
