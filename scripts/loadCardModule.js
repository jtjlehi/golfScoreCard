import {displayLoadScreen, hideLoadScreen} from "./loadingModule.js";
import {makeNewPlayer} from "./playerModule.js";
import { showEditPlayerMenu, hideEditPlayerMenu } from "./editPlayerModule.js";
import {endGame} from "./endGameModule.js"

//the function that runs after you choose the tee type
export function startGame(teeTypes, teeTypeIndex) {
    //store the tee type data for if they reload the page
    displayLoadScreen();
    let teeTypesObj = {teeTypes: teeTypes};
    //shorter references
    let selectedTeeType = teeTypes[teeTypeIndex];
    let holes = selectedTeeType.holes;
    let holeCount = holes.length;
    //build the card
    showEditPlayerMenu(holes);
    displayHoleRow(holeCount);
    displayTeeRow(holeCount, selectedTeeType, holes);
    $('.teeRow').css('background-color', selectedTeeType.hexColor);
    $('.parRow').css('background-color', selectedTeeType.hexColor);
    //make the add player button work
    $('.addPlayerRow').click(function () {
        showEditPlayerMenu(holes);
    });
    $('.endGameRow').click(function () {
        endGame(selectedTeeType.totalPar);
    });
}
function displayHoleRow(holeCount) {
    for(let i = 1; i <= holeCount; i ++) {
        $('.holeNumRow .innerRow').append(`<div class="cardCell holeNumCell">${i}</div>`);
    }
}
function displayTeeRow(holeCount, teeType, holes) {
    $('.teeRowLabel').html(`<span>${teeType.color} (${teeType.totalPar} par)</span>`);
    for(let i = 0; i < holeCount; i ++) {
        $('.teeRow .innerRow').append(`<div class="cardCell teeCell">${holes[i].yards}</div>`);
        $('.parRow .innerRow').append(`<div class="cardCell parCell">${holes[i].par}</div>`);
        $('.hcpRow .innerRow').append(`<div class="cardCell hcpCell">${holes[i].hcp}</div>`);
    }
}