import {startOnLoad} from './startModule.js';
import {startGame} from "./loadCardModule.js";
import { addActionMenu } from "./actionMenuModule.js"
//todo this next import is just for testing purposes, remove it when done
import {showEditPlayerMenu, hideEditPlayerMenu} from "./editPlayerModule.js";
setTimeout(showEditPlayerMenu, 1000);
setTimeout(hideEditPlayerMenu, 3000);
$(document).ready(function () {
    addActionMenu();
    let courseInfo = sessionStorage.getItem('courseInfo');
    let teeTypeIndex = sessionStorage.getItem('teeTypeIndex');
    let teeType = sessionStorage.getItem('teeType');
    if(teeType === null) {startOnLoad()}
    else{
        startGame(JSON.parse(teeType), JSON.parse(teeTypeIndex));
    }
});
