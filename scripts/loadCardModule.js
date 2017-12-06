import {displayLoadScreen, hideLoadScreen} from "./loadingModule.js";
//actually loading the game card
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
    displayHoleRow(holeCount);
    displayTeeRow(holeCount, selectedTeeType, holes);
    addPlayer(holeCount, true);
    $('.teeRow').css('background-color', selectedTeeType.hexColor);
    $('.parRow').css('background-color', selectedTeeType.hexColor);
    //display the card
    $('.startCont').addClass('hidden');
    $('.cardCont').removeClass('hidden');
    hideLoadScreen();
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
function addPlayer(numOfHoles, firstTime) {
    if($('.playerCont').length < 5) {
        //pull the information on the player row
        let playerRow = addPlayerConditional(firstTime);
        for (let i = 0; i < numOfHoles; i++) {
            let cell = playerRow.row.children().last();
            cell.append(`<input type="number" value="0" class="cardCell playerCell player${playerRow.count}">`);
        }
        playerRow.row.append(`<input type="number" class="hcp player${playerRow.count}Hcp" value="0">`);
        playerRow.row.append(
            `<input 
                class="totalScore player${playerRow.count}Score"
                type="number"
                value=0
                readonly>`);
        $('.cardCell').css({'width': (100 / numOfHoles) + "%"});
    }
}
//a conditional that is run every time you add the list, and then returns a value to "playerRow" above
function addPlayerConditional(firstTime) {
    //test if it is the first player
    if(firstTime === undefined) {
        let playerCont = $('.playerCont');
        let playerCount = playerCont.children().last().data('playerCount') + 1;
        playerRow =
            $(`
            <div id="player${playerCount}" class="playerRow">
                <div class="rowLabel playerLabel">
                    <span>Player 1</span>
                    <span class="material-icons">create</span>
                </div>
                <div class="innerRow"></div>
            </div>`);
        playerCont.append(playerRow);
        playerRow.data('playerCount', playerCount);
        return {
            row: playerRow,
            count: playerCount
        };
    }
    else{
        $('#player1').data('playerCount', 1);
        return {
            row: $('#player1'),
            count: 1
        }
    }
}