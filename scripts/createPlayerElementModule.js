export function createPlayerRow(playerIndex, playerName) {
    return $(`
        <div id="player${playerIndex}" class="playerRow">
            <div class="rowLabel playerLabel">
                <span>player ${playerIndex}</span>
                <span class="material-icons">create</span>
            </div>
            <div class="innerRow"></div>
        </div>`);
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
export function finishPlayerRow(playerCount, row) {
    row.append(`<input type="number" class="hcp player${playerCount}Hcp" value="0">`);
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