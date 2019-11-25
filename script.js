$("#dateSelect").attr("value", moment().format('MM/DD/YYYY'));
$("#currentDay").text("Time: " +moment().format('LT'));
$("#currentTime").text("Date: "+ moment().format('LL'));

var toDos =[];

function timerSet(){
    //math to get miliseconds until end of hour
    var timerEnd = moment().endOf('hour');
    var now = moment();
    var timer = timerEnd.diff(now);
    console.log(timer);
    return timer;
};

function setClass(time){  //return the class for the hour passed
//gets current hour
var hours = moment().hours();
//test line below if needed
// var hours = 13;  

// console.log(hours);
var timeH = parseInt(time);  //just in case
// console.log(timeH);
var classSet = "";
if ( timeH < hours ){
    classSet = "past";
} else if ( timeH === hours ) {
    classSet = "present";
} else if ( timeH > hours ) {
    classSet = "future";
}
return classSet;  //returns class string
};


setInterval(function () {   //initializes timer
    $('.past').removeClass('past');  //remove styles
    $('.present').removeClass('present');
    $('.future').removeClass('future');
    for (var i = 9; i < 18; i++) {  //updated fields on the hour
        var tempId = "#hour" + i;
        $(tempId).addClass(setClass(i));
    }

}, timerSet());


function createFields() {
for (var i = 9; i < 18; i++) { //counter for i to be the hour
var timePill = $("<div>");
var timeDiv = $("<div>");
var fieldDiv = $("<textarea>");
var saveBtn = $("<button>");

var hourDisp = 0;  //remove the below and set to 'i' to go to 24-hr time
if ( i > 12 ) {
 hourDisp = i - 12;
} else ( hourDisp = i)
var tempId = "hour" + i;
var buttonId = "btn" + i;
timeDiv.text(hourDisp + ":00").addClass("hour col-2");
fieldDiv.addClass("inputField col-8").addClass(setClass(i));
fieldDiv.attr("id", tempId);
saveBtn.attr("id", buttonId);  //Implement unique button ids to call
saveBtn.addClass("saveBtn col-xs-2").text("Save");
timePill.addClass("row");
timePill.append(timeDiv).append(fieldDiv).append(saveBtn);
// timePill.addClass("row")
$("#main").append(timePill);
}
getFields();
}

//builds out the planner for the current day
function getFields() {
let dateSet = $("#dateSelect").val();
dateSet = moment(dateSet).format("DDMMYYYY");
toDos = JSON.parse(localStorage.getItem(dateSet));
if (toDos != null) {
for (var i = 9; i < 18; i++) {
    var tempId = "#hour" + i;
    let j = i - 9;
    $(tempId).val("");
    $(tempId).val(toDos[j]);
}
}
// console.log(dateSet);
// console.log(toDos);

}


//saves the planner as seen for the current day
function setFields() {
    let dateSet = $("#dateSelect").val();
    dateSet = moment(dateSet).format("DDMMYYYY");
    toDos = [];
    // debugger;
    for (var i = 9; i < 18; i++) {
        var tempId = "#hour" + i;
        let j = i - 9;
        toDos[j] = $(tempId).val();
        console.log($(tempId).val());
    }
    localStorage.setItem(dateSet, JSON.stringify(toDos));
}

//adding another spec for fun that pratces targeting individual buttons
function setField() {
    let dateSet = $("#dateSelect").val();
    dateSet = moment(dateSet).format("DDMMYYYY");
    toDos = JSON.parse(localStorage.getItem(dateSet));  //calls field from local to build existing array
    if ( toDos === null) {
        toDos =[];
    }
   console.log(this);
   let tempKey = "";
   tempKey = $(this).attr("id").slice(3);
   let tempNum = parseInt(tempKey);
   tempNum -= 9; //adjust array postion for hour
   tempKey = "#hour"+ tempKey;
   console.log(tempKey);
   console.log($(tempKey).val());
   toDos[tempNum] = $(tempKey).val();
   console.log(toDos[tempNum]);

localStorage.setItem(dateSet, JSON.stringify(toDos));
}

//buttons listeners
$("#set-date-btn").on("click", function() {
    event.preventDefault();
    $("#main").empty();
    createFields();
});

$("#current-date-btn").on("click", function() {
    // $(tempId).text();
    $("#dateSelect").attr("value", moment().format('MM/DD/YYYY'));
    });

// $(document).on("click", ".saveBtn", setFields);

$(document).on("click", ".saveBtn", setField);


createFields();
