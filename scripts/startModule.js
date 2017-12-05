import {teeTypeSelector} from "./teeModule.js";
export function startOnLoad() {
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
    $('#zipCodeButton').click(getLocation);
}
//pull lat and long based on zip code
function getLocation(func) {
    let zipCode = $('#zipCode').val();
    if(zipCode.length === 5) {
        let apiKey = "AIzaSyC8rMZYfIhoWQfVnbqDBqvoDpjLwtrk488";
        $.ajax(
            {url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + zipCode + "&key=" + apiKey,
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