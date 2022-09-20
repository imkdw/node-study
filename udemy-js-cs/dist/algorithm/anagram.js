"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anagram = void 0;
function anagram(text1, text2) {
    if (text1.length !== text2.length) {
        return false;
    }
    const counter1 = {};
    const counter2 = {};
    for (const text of text1) {
        const str = text.toLowerCase();
        counter1[str] = (counter1[str] || 0) + 1;
    }
    for (const text of text2) {
        const str = text.toLowerCase();
        counter2[str] = (counter2[str] || 0) + 1;
    }
    for (const text in counter1) {
        if (!(text in counter2)) {
            return false;
        }
        if (counter1[text] !== counter2[text]) {
            return false;
        }
    }
    return true;
}
exports.anagram = anagram;
