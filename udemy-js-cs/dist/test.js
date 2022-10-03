"use strict";
/**
 * 메세지 1 바로 전송
 * 6초 뒤 메세지 2 전송
 * 4초 뒤 메세지 3 전송
 * 위 로직은 7번 반복
 */
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
exports.messageEvent = void 0;
function promiseMessage(message, ms) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(message), ms);
    });
}
function messageEvent() {
    return __awaiter(this, void 0, void 0, function* () {
        const datas = [
            { message: "First Message", ms: 1 },
            { message: "Second Message", ms: 6000 },
            { message: "Third Message", ms: 4000 },
        ];
        for (let i = 0; i < 7; i++) {
            for (const data of datas) {
                const { message, ms } = data;
                console.log(yield promiseMessage(message, ms));
            }
        }
    });
}
exports.messageEvent = messageEvent;
