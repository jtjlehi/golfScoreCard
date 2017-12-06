export function addActionMenu() {
    $('.dropDownMenuCont-js').click(function () {
        let element = $('.actionMenuContent');
        if(element.hasClass('actionMenuOpen')) {
            element.removeClass('actionMenuOpen', {duration: 250});
            element.addClass('hidden', {duration: 0});
        }
        else {
            element.removeClass('hidden');
            element.addClass('actionMenuOpen', {duration: 300});
        }
    });
    $('.actionMenuContent li').hover(function () {
        $(this).addClass('liFocus');
    });
    $('.actionMenuContent li').mouseleave(function () {
        $(this).removeClass('liFocus');
    });
}