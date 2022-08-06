"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.setEnv = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
dotenv_1["default"].config();
function setEnv(env, file) {
    if (file === 'config') {
        switch (env) {
            case 'prod':
                return path_1["default"].join(__dirname, '..', '..', 'src', 'env', '.env.prod');
            case 'test':
                return path_1["default"].join(__dirname, '..', '..', 'src', 'env', '.env.test');
            case 'dev':
                return path_1["default"].join(__dirname, '..', '..', 'src', 'env', '.env.dev');
        }
    }
    else if (file === 'app') {
        switch (env) {
            case 'prod':
                return path_1["default"].join(__dirname, '..', 'src', 'env', '.env.prod');
            case 'test':
                return path_1["default"].join(__dirname, '..', 'src', 'env', '.env.test');
            case 'dev':
                return path_1["default"].join(__dirname, '..', 'src', 'env', '.env.dev');
        }
    }
    else if (file === 'db') {
        switch (env) {
            case 'prod':
                return path_1["default"].join(__dirname, 'src', 'env', '.env.prod');
            case 'test':
                return path_1["default"].join(__dirname, 'src', 'env', '.env.test');
            case 'dev':
                return path_1["default"].join(__dirname, 'src', 'env', '.env.dev');
        }
    }
}
exports.setEnv = setEnv;
//# sourceMappingURL=env.js.map