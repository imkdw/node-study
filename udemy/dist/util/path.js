"use strict";
/**
 * 루트 폴더를 알려주는 유틸모듈
 * Typescript 사용시 dist 폴더내에 views가 없으므로 사용이 힘듬
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.rootDir = void 0;
var path_1 = __importDefault(require("path"));
exports.rootDir = path_1["default"].dirname(require.main.filename);
//# sourceMappingURL=path.js.map