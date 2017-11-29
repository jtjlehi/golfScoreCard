$(document).ready(function () {
    let courseInfo = sessionStorage.getItem('courseInfo');
    let teeType = sessionStorage.getItem('')
    if(courseInfo === undefined) {
        //grab the courses to choose from
        $('#zipCode').keyup(function (event) {
            if (event.which === 13) {
                getLocation();
            }
        });
    }
    else{
        teeTypeSelector(JSON.parse(courseInfo));
    }
});
//pull lat and long based on zip code
function getLocation(func) {
    let zipCode = $('#zipCode').val();
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
            teeTypeSelector(courseInfo.course);
        }
    });
}
//actually loading the game card
function teeTypeSelector(courseInfo) {
    //set up the course info to be easier to grab.
    courseInfo = courseInfo.course;
    let holes = courseInfo.holes;
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
        startGame(teeTypes, teeTypeIndex);
    });
    $('.teeSelectCont').removeClass('hidden');
    $('.startCont').addClass('hidden');
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
    sessionStorage.setItem('teeType', JSON.stringify(teeTypesObj));
    //shorter references
    let selectedTeeType = teeTypes[teeTypeIndex];
    let holes = selectedTeeType.holes;
    let holeCount = holes.length;
    //build the card
    displayHoleRow(holeCount);
    //display the card
    $('.teeSelectCont').addClass('hidden');
    $('.cardCont').removeClass('hidden');
}
function displayHoleRow(holeCount) {

}
function addPlayer(numOfHoles) {
    for(let i = 0; i < numOfHoles; i ++) {

    }
}