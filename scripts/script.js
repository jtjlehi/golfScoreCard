$(document).ready(function () {
    let courseInfo = sessionStorage.getItem('courseInfo');
    let teeTypeIndex = sessionStorage.getItem('teeTypeIndex');
    let teeType = sessionStorage.getItem('teeType');
    if(teeType === null) {
        //grab the courses to choose from
        $('#zipCode').keyup(function (event) {
            if (event.which === 13) {
                getLocation();
            }
        });
        $('#zipCode').focus(function () {
            $('#forZipCode').animate({width: '70px'}, 300);
        });
        $('#zipCode').blur(function () {
            $('#forZipCode').animate({width: '0px'});
        });
        $('#zipCodeButton').click(getLocation, teeTypeIndex);
    }
    else{
        startGame(JSON.parse(teeType), JSON.parse(teeTypeIndex));
    }
});
//pull lat and long based on zip code
function getLocation(func) {
    let zipCode = $('#zipCode').val();
    if(zipCode.length === 5) {
        let apiKey = "AIzaSyC8rMZYfIhoWQfVnbqDBqvoDpjLwtrk488";
        $.ajax("https://maps.googleapis.com/maps/api/geocode/json?address=" + zipCode + "&key=" + apiKey, {
            success: function (data) {
                let locationInfo = {
                    latitude: data.results[0].geometry.location.lat,
                    longitude: data.results[0].geometry.location.lng,
                    radius: 100
                };
                loadCourses(locationInfo);
            }
        });
    }
}
function loadCourses(locationInfo) {
    $.post("https://golf-courses-api.herokuapp.com/courses", locationInfo, function (data, status) {
        let allCourses = JSON.parse(data);
        let courses = allCourses.courses;
        courses.forEach(function (value) {
            //add each course into the start screen selection thing
            addCourse(value);
        });
        $('.courseSelectCont').removeClass('hidden');
        $('.locationSelectCont').addClass('hidden');
    });
    $('#startButton').on('click', function () {
        let courseId = $('#courseSelect').val();
        //actually select the course and start the game.
        selectCourse(courseId);
    });
}
//the function to add courses
function addCourse(course) {
    let element = '<option value="' + course.id + '" id="'+ course.id + '">' + course.name + '</option>';
    $('#courseSelect').append(element);
}
//request for the data to load the game card
function selectCourse(courseId) {
    $.ajax('https://golf-courses-api.herokuapp.com/courses/' + courseId, {
        success: function (data) {
            let courseInfo = JSON.parse(data);
            sessionStorage.setItem("courseInfo", JSON.stringify(courseInfo));
            teeTypeSelector(courseInfo);
        }
    });
}
//actually loading the game card
function teeTypeSelector(courseInfo) {
    //set up the course info to be easier to grab.
    courseInfo = courseInfo.course;
    let holes = courseInfo.holes;
    //todo this may not be needed see if it is, then just remove it.
    let menHandyCap = [];
    let womenHandyCap = [];
    //actually put the handy cap values into the arrays
    holes.forEach(function (hole) {
        hole.tee_boxes.forEach(function (teeBox) {
            let tee_type = teeBox.tee_type;
            if(tee_type === "women") {
                womenHandyCap.push(teeBox.hcp);
            }
            if(tee_type === "men"){
                menHandyCap.push(teeBox.hcp);
            }
        });
    });
    //container for all the tee rows
    let teeTypes = [];
    //basic info needed for the tee rows
    courseInfo.tee_types.forEach(function (teeType) {
        teeTypes.push(
            new Tee(
            teeType.tee_color_type,
            teeType.tee_hex_color,
            teeType.tee_type,
            teeType.par,
            teeType.rating,
            teeType.yards
        ));
    });
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
//the function that runs after you choose the tee type
function startGame(teeTypes, teeTypeIndex) {
    //store the tee type data for if they reload the page
    let teeTypesObj = {teeTypes: teeTypes};
    //shorter references
    let selectedTeeType = teeTypes[teeTypeIndex];
    let holes = selectedTeeType.holes;
    let holeCount = holes.length;
    //build the card
    displayHoleRow(holeCount);
    displayTeeRow(holeCount, selectedTeeType, holes);
    addPlayer(holeCount, true);
    $('.teeRow').css('background-color', selectedTeeType.hexColor);
    $('.parRow').css('background-color', selectedTeeType.hexColor);
    //display the card
    $('.startCont').addClass('hidden');
    $('.cardCont').removeClass('hidden');
}
function displayHoleRow(holeCount) {
    for(let i = 1; i <= holeCount; i ++) {
        $('.holeNumRow .innerRow').append(`<div class="cardCell holeNumCell">${i}</div>`);
    }
}
function displayTeeRow(holeCount, teeType, holes) {
    $('.teeRowLabel').html(`<span>${teeType.color} (${teeType.totalPar} par)</span>`);
    for(let i = 0; i < holeCount; i ++) {
        $('.teeRow .innerRow').append(`<div class="cardCell teeCell">${holes[i].yards}</div>`);
        $('.parRow .innerRow').append(`<div class="cardCell parCell">${holes[i].par}</div>`);
        $('.hcpRow .innerRow').append(`<div class="cardCell hcpCell">${holes[i].hcp}</div>`);
    }
}
function addPlayer(numOfHoles, firstTime) {
    if($('.playerCont').length < 5) {
        //pull the information on the player row
        let playerRow = addPlayerConditional(firstTime);
        for (let i = 0; i < numOfHoles; i++) {
            let cell = playerRow.row.children().last();
            cell.append(`<input type="number" value="0" class="cardCell playerCell player${playerRow.count}">`);
        }
        playerRow.row.append(`<input type="number" class="hcp player${playerRow.count}Hcp" value="0">`);
        playerRow.row.append(
            `<input 
                class="totalScore player${playerRow.count}Score"
                type="number"
                value=0
                readonly>`);
        $('.cardCell').css({'width': (100 / numOfHoles) + "%"});
    }
}
//a conditional that is run every time you add the list, and then returns a value to "playerRow" above
function addPlayerConditional(firstTime) {
    //test if it is the first player
    if(firstTime === undefined) {
        let playerCont = $('.playerCont');
        let playerCount = playerCont.children().last().data('playerCount') + 1;
        playerRow =
            $(`
            <div id="player${playerCount}" class="playerRow">
                <div class="rowLabel playerLabel">
                    <span>Player 1</span>
                    <span class="material-icons">create</span>
                </div>
                <div class="innerRow"></div>
            </div>`);
        playerCont.append(playerRow);
        playerRow.data('playerCount', playerCount);
        return {
            row: playerRow,
            count: playerCount
        };
    }
    else{
        $('#player1').data('playerCount', 1);
        return {
            row: $('#player1'),
            count: 1
        }
    }
}