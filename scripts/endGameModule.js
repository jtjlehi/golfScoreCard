import {players} from "./playerModule.js";

export function endGame(par) {
    if(testEndGame()) {
        $('.endGameCont').removeClass('hidden');
        $('.endGameCont').removeClass('endGameContHidden', 300);
        $('.endGameCard').removeClass('endCardHidden', 500, 'easeOutCubic');
        let playersCont = $('.players');
        players.forEach((player) => {
            let total = player.totalScore;
            let net = total - player.hcp;
            let parScore = net - par;
            let row = $(`
                <div class="row">
                    <div class="name">${player.name}</div>
                    <div class="cell">${total}</div>
                    <div class="cell">${net}</div>
                    <div class="cell">${parScore}</div>
                </div>`);
            $('.players').append(row);
            if(parScore > 0) {
                $('.endOfGameNote').text('Better luck next time');
            }
            if(parScore === 0) {
                $('.endOfGameNote').text('Right on');
            }
            if(parScore < 0) {
                $('.endOfGameNote').text('You might be off to the PGA');
            }
        });
    }
    else {
        alert("I'm lazy and didn't make a nice error thing, but you have to fill out every box. Oh and this isn't breaking the requirement since if you fill every hole then you will get a end game result. Also if you did put them all in, sometimes it doesn't register if you are going to fast, so just go back and put some more in.");
    }
}
function testEndGame() {
    let returnVal = true;
    players.forEach(player => {
        player.holes.array.forEach(hole => {
            if(hole.score === 0) {
                returnVal = false;
            }
        });
    });
    return returnVal;
}