let closeCourses;
let localObj = {latitude:40.4426135, longitude:-111.8631116, radius: 100};
$(document).ready(function () {
    $.post("https://golf-courses-api.herokuapp.com/courses", localObj, function (data, status) {
        closeCourses = JSON.parse(data);
        for(let p in closeCourses) {
            console.log(closeCourses);
        }
    });
});
