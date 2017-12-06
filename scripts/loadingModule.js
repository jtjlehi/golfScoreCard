export function displayLoadScreen() {
    $('.loadCont').removeClass('hidden');
    console.log('display fired')
}
export function hideLoadScreen() {
    setTimeout(() => {

    }, 300);
    $('.loadCont').addClass('hidden');
    console.log('remove fired')
}