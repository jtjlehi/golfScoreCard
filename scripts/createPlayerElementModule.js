import { editPlayer } from "./editPlayerModule.js";

export function createPlayerRow(playerIndex, playerName) {
    let el = $(`
        <div id="player${playerIndex}" class="playerRow">
            <div class="rowLabel playerLabel">
                <span class="playerNameSpan">${playerName}</span>
                <span class="material-icons editPlayerBtn">create</span>
            </div>
            <div class="innerRow"></div>
        </div>`);
    el.find('.editPlayerBtn').click(function () {
        editPlayer(el);
    });
    return el;
}
export function addHolesToPlayer(holeCount, playerIndex, holeCont) {
    for (let i = 0; i < holeCount; i++) {
        holeCont.append(`<input 
                        type="number" 
                        value="0" 
                        class="cardCell playerCell player${playerIndex}" 
                        data-index=i>`);
    }
}
export function finishPlayerRow(playerCount, row, hcp) {
    row.append(`<input type="number" class="hcp player${playerCount}Hcp" value=${hcp} readonly>`);
    row.append(
        `<input 
                class="totalScore player${playerCount}Score"
                type="number"
                value=0
                readonly>`);
}
export function stylePlayerRow(numOfHoles) {
    $('.cardCell').css({'width': (100 / numOfHoles) + "%"});
}