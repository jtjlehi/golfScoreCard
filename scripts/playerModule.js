import {createPlayerRow, addHolesToPlayer, finishPlayerRow, stylePlayerRow} from "./createPlayerElementModule.js";
import {hideLoadScreen} from "./loadingModule.js";
//global player object
export let players = [];
export let playerNames = [];
export function addName(name) {
    playerNames.push(new RegExp('^' + name + '$'));
}

//the function I export in order to make new players
export function makeNewPlayer(holes, name, hcp) {
    if(players.length < 4) {
        players.push(new Player(holes, name, hcp, players.length + 1));
    }
    else {
        displayErrorScreen();
    }
}
export class Player{
    //holes is an array containing all the player holes for the player
    constructor(holes, name, hcp, index) {
        this.holes = new PlayerHoles(holes);
        this.hcp = hcp;
        this.index = index;
        this.name = name;
        this.totalScore = 0;
        this.playerRow = this.createElement();
        this.holeElements = this.playerRow.find('.innerRow').children();
        this.scoreElement = this.playerRow.find('.totalScore');
    }
    createElement() {
        let playerRow = createPlayerRow(this.index, this.name);
        $('.playerCont').append(playerRow);
        finishPlayerRow(this.index, playerRow, this.hcp);
        addHolesToPlayer(this.holes.length, this.index, playerRow.find('.innerRow'), this);
        stylePlayerRow(this.holes.length);
        $('.startCont').addClass('hidden');
        $('.cardCont').removeClass('hidden');
        hideLoadScreen();
        return playerRow;
    }
    changeHoleScore(index, element, scoreEl) {
        let addedVal = Number(element.val());
        this.totalScore = this.totalScore - this.holes.array[index].score + addedVal;
        this.holes.array[index].score = addedVal;
        scoreEl.val(this.totalScore);
    }
    changeHCP(HCP) {
        this.hcp = HCP;
    }
}
//the container for the holes;
export class PlayerHoles {
    constructor(holes) {
        this.array = this.createHoles(holes);
        this.length = holes.length;
    }
    createHoles(holeArray) {
        let returnArray = [];
        holeArray.forEach(val => {
            returnArray.push({
                par: val.par,
                hcp: val.hcp,
                score: 0
            });
        });
        return returnArray;
    }
    editHandicaps(hcp) {
        this.array.forEach(val => {
            if(val.hcp - hcp >= 0) {
                val.hcp = val.hcp - hcp;
            }
        });
    }
}