import {makeNewPlayer, addName, playerNames} from "./playerModule.js";

export function showEditPlayerMenu(holes) {
    $('.editPlayerCont').removeClass('hidden');
    $('.editPlayerCont').removeClass('editPlayerContHidden', 300);
    $('.editPlayerMenu').removeClass('menuHidden', 500, 'easeOutCubic');
    $('.enterPlayerChangesBtn').off();
    $('.enterPlayerChangesBtn').click(function () {
        if(testValidity()) {
            makeNewPlayer(holes, $('#playerNameInput').val(), $('#playerHCPInput').val());
            hideEditPlayerMenu();
            let playerCount = $('.playerCont').children().length;
            addName($('#playerNameInput').val());
            if (playerCount === 4) {
                $('.addPlayerRow').addClass('hidden');
            }
        }
    });
    $('.cancelMakePlayerChanges').click(function () {
        hideEditPlayerMenu();
    });
    $('#playerNameInput').off();
    $('#playerNameInput').keyup(function () {
        testValidity();
    });
}
function testValidity(currentName) {
    let el = $('#playerNameInput');
    let returnVal = true;
    playerNames.forEach((regEx) => {
        if(regEx.test(el.val()) && !regEx.test(currentName)) {
            $('.playerNameCont').addClass('is-invalid');
            returnVal = false;
        }
    });
    return returnVal;
}
export function hideEditPlayerMenu() {
    $('.editPlayerMenu').addClass('menuHidden', 400, 'easeInCubic');
    $('.editPlayerCont').addClass('editPlayerContHidden', 300);
    $('.editPlayerCont').addClass('hidden', 400);
}
export function editPlayer(el) {
    let editPlayerCont = $('.editPlayerCont');
    let oldName = $('#playerNameInput').val();
    editPlayerCont.removeClass('hidden');
    editPlayerCont.removeClass('editPlayerContHidden', 300);
    $('.editPlayerMenu').removeClass('menuHidden', 500, 'easeOutCubic');
    $('.enterPlayerChangesBtn').off();
    $('.enterPlayerChangesBtn').click(function () {
        if(testValidity(oldName)) {
            let newName = $('#playerNameInput').val();
            let newHCP = $('#playerHCPInput').val();
            el.find('.playerNameSpan').text(newName);
            el.find('.hcp').val(newHCP);
            hideEditPlayerMenu();
        }
    });
    $('#playerNameInput').off();
    $('#playerNameInput').keyup(function () {
        testValidity(oldName);
    });
}