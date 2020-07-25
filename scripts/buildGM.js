const fs = require('fs')

function wrapAppContent(appContent) {
    return `
// ==UserScript==
// @name         ElScriptos
// @namespace    ElScriptos - Risibank
// @version      0.0.2
// @description  ElScriptos, des stickers sans cliquer
// @author       ElScriptos Team
// @downloadURL  https://raw.githubusercontent.com/elscriptos/elscriptos/master/dist/index.js
// @updateURL    https://raw.githubusercontent.com/elscriptos/elscriptos/master/dist/index.js
// @match        https://www.jeuxvideo.com/forums/*
// @match        https://m.jeuxvideo.com/forums/*
// @match        https://m.jeuxvideo.com/forums/*
// @match        https://www.jeuxvideo.com/messages-prives/*
// @match        http://jvforum.fr/*
// @connect      risibank.fr
// @connect      api.risibank.fr
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_listValues
// @grant        GM_deleteValue
// @grant        GM_addStyle
// @icon         https://risibank.fr/src/picts/banner-light.png
// @noframes
// ==/UserScript==
(function() {
    "use strict";
    var parcelRequire;
    ${appContent}
})();`
}

const FILE_PATH = './dist/index.js'

const appContent = fs.readFileSync(FILE_PATH)
const wrappedAppContent = wrapAppContent(appContent)
fs.writeFileSync(FILE_PATH, wrappedAppContent)
