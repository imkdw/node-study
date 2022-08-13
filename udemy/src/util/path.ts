/**
 * 루트 폴더를 알려주는 유틸모듈
 * Typescript 사용시 dist 폴더내에 views가 없으므로 사용이 힘듬
 */

import path from "path";

export const rootDir = path.dirname(require.main.filename);
