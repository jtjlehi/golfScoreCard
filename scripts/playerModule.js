import {createPlayerRow, addHolesToPlayer, finishPlayerRow, stylePlayerRow} from "./createPlayerElementModule.js";
//global player object
export let players = [];
//the function I export in order to make new players
export function makeNewPlayer(holes, hcp) {
    if(players.length < 4) {
        players.push(new Player(holes, hcp, players.length + 1));
    }
    else {
        displayErrorScreen();
    }
}
export class Player{
    //holes is an array containing all the player holes for the player
    constructor(holes, hcp, index) {
        this.holes = new PlayerHoles(holes);
        this.hcp = hcp;
        this.index = index;
        this.name = 'player' + this.index;
        this.totalScore = 0;
        this.playerRow = this.createElement();
        this.holeElements = this.playerRow.find('.innerRow').children();
        this.scoreElement = this.playerRow.find('.totalScore');
    }
    createElement() {
        let playerRow = createPlayerRow(this.index, this.name);
        $('.playerCont').append(playerRow);
        addHolesToPlayer(this.holes.length, this.index, playerRow.children().last());
        finishPlayerRow(this.index, playerRow);
        stylePlayerRow(this.holes.length);
        return playerRow;
    }
    changeHoleScore(index, element) {
        let addedVal = this.holeElements[index].val();
        let scoreElement = this.scoreElement;
        this.totalScore = this.totalScore - this.holes[index].score + addedVal;
        this.scoreElement.val(this.totalScore);
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