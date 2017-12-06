import {startGame} from "./loadCardModule.js";
import {displayLoadScreen, hideLoadScreen} from "./loadingModule.js";

function addHoles(holeCont, holesArray, index) {
    holesArray.forEach(function (hole) {
        let teeBox = hole.tee_boxes[index];
        holeCont.addHole(teeBox.yards, teeBox.par, teeBox.hcp);
    });
}
function displaySelectTee(teeTypes) {
    teeTypes.forEach(function (teeType, index) {
        let optionToAdd =
            `<option 
                value="${index}" 
                id="${teeType.type}TeeType">
                ${teeType.color}(${teeType.type})
            </option>`;
        $('.teeSelect').append(optionToAdd);
    });
}
class Tee {
    constructor(color, hexColor, type, totalPar, rating, yards) {
        this.color = color;
        this.hexColor = hexColor;
        this.type = type;
        this.totalPar = totalPar;
        this.rating = rating;
        this.yards = yards;
        this.holes = [];
    }
    addHole(yards, par, hcp) {
        this.holes.push(new Hole(yards, par, hcp));
    }
}
class Hole {
    constructor(yards, par, hcp) {
        this.yards = yards;
        this.par = par;
        this.hcp = hcp;
    }
}

export function teeTypeSelector(courseInfo) {
    //set up the course info to be easier to grab.
    displayLoadScreen();
    courseInfo = courseInfo.course;
    let holes = courseInfo.holes;
    let teeTypes = courseInfo.tee_types.map((teeType) =>
        new Tee(
            teeType.tee_color_type,
            teeType.tee_hex_color,
            teeType.tee_type,
            teeType.par,
            teeType.rating,
            teeType.yards
        )
    );
    teeTypes.forEach(function (teeBox, index) {
        addHoles(teeBox, holes, index);
    });
    displaySelectTee(teeTypes);
    //this function will be run when they choose the
    $('.chooseTeeType').click(function () {
        let teeTypeIndex = $('#teeSelect').val();
        sessionStorage.setItem('teeType', JSON.stringify(teeTypes));
        sessionStorage.setItem('teeTypeIndex', JSON.stringify(teeTypeIndex));
        startGame(teeTypes, teeTypeIndex);
    });
    $('.teeSelectCont').removeClass('hidden');
    $('.courseSelectCont').addClass('hidden');
    hideLoadScreen();
}