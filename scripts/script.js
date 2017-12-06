import {startOnLoad} from './startModule.js';
import {startGame} from "./loadCardModule.js";
import { addActionMenu } from "./actionMenuModule.js"

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
