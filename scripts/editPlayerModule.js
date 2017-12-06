export function showEditPlayerMenu() {
    $('.editPlayerCont').removeClass('hidden');
    $('.editPlayerCont').removeClass('editPlayerContHidden', 300);
    $('.editPlayerMenu').removeClass('menuHidden', 500, 'easeOutQuint');
}
export function hideEditPlayerMenu() {
    $('.editPlayerMenu').addClass('menuHidden', 400, 'easeInCubic');
    $('.editPlayerCont').addClass('editPlayerContHidden', 300);
    $('.editPlayerCont').addClass('hidden', 400);
}