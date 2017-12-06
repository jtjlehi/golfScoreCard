export function displayLoadScreen() {
    $('.loadCont').removeClass('hidden');
}
export function hideLoadScreen() {
    setTimeout(() => {

    }, 300);
    $('.loadCont').addClass('hidden');
}