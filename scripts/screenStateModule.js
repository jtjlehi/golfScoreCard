import {startOnLoad, loadCourses} from "./startModule.js";

export function initState() {
    if (sessionStorage.getItem('state') === null) {
        sessionStorage.setItem('state', '0');
    }
}
export function increaseState() {
    let pastState = sessionStorage.getItem('state');
    let newState = Number(pastState) + 1;
    sessionStorage.setItem('state', JSON.stringify(newState));
}
export function decreaseState() {
    return Number(sessionStorage.getItem('state') - 1);
}
export function getStateData(state) {
    let stateData = [
        JSON.parse(sessionStorage.getItem('zipCodeState')),
        JSON.parse(sessionStorage.getItem('courseState')),
        JSON.parse(sessionStorage.getItem('teeState')),
        JSON.parse(sessionStorage.getItem('playerMenuSate')),
        JSON.parse(sessionStorage.getItem('cardState'))
    ];
    return stateData[state];
}
export function runState() {
    let state = Number(sessionStorage.getItem('state'));
    console.log(state);
    let functions = [
        () => startOnLoad(),
        () => loadCourses(JSON.parse(sessionStorage.getItem('courseState')))
    ];
    functions[state]();
}