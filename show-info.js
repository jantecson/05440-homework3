var inputArray = [false, false, false, false];

const urlParams = new URLSearchParams(window.location.search);
const numLines = urlParams.get('num-lines');
const numTrials = urlParams.get('num-trials');
const studySelect = urlParams.get('study-select');

$(document).ready(function(){
    if ($("#name").val() != "" && $("#participantId").val() != "" && $("#tech").val() != "" && $("#experience").val() != ""){
        inputArray = [true, true, true, true];
        enableBtn(inputArray);
    };
});

var info_data = JSON.parse(sessionStorage.getItem("info"))

if (info_data != null){
    $("#name").val(info_data["name"]);
    inputArray[0] = true;
    enableBtn(inputArray);
}

$("#name").on("input", function () {
    inputArray[0] = true;
    enableBtn(inputArray);
});

if (info_data != null){
    $("#participantId").val(info_data["id"]);
    inputArray[1] = true;
    enableBtn(inputArray);
}

$("#participantId").on("input", function () {
    inputArray[1] = true;
    enableBtn(inputArray);
});


$("#tech").on("change", function () {
    inputArray[2] = true;
    enableBtn(inputArray);
    console.log("add new text box");
    $("#enter-detail").css("display", "block");
    // if ($("#tech").val() == ''){
    //     console.log("add new text box");
    //     $("#enter-detail").css("display", "block");
    // }
    // else{
    //     $("#enter-detail").css("display", "none");
    // }
});
$("#experience").on("change", function () {
    inputArray[3] = true;
    enableBtn(inputArray);
});


function enableBtn(array){
    enable = true;
    for (var i = 0; i<4; i++){
        if (array[i] == false){
            enable = false;
        }
    }
    if (enable==true){
        $(".btn-main").css("background-color","black");
        $(".btn-main").removeAttr("disabled");
    }
}

function getValue(mode){
    var username = $("#name").val();
    var id = $("#participantId").val();
    var tech = $("#tech").val();
    var experience = $("#experience").val();
    var autoswitch = $("#autoswitch").val();
    
    
    if ($("#enter-detail").css("display") == "none"){
        d = {"name":name, "id":id, "tech":tech, "exp":experience, "autoswitch": autoswitch, "detail":"", "num-lines": numLines,
        "num-trials": numTrials, "tech": tech, "id": id}
    }
    else{
        d = {"name":name, "id":id, "tech":tech, "exp":experience, "autoswitch": autoswitch, "detail":$('#detail').val(), "num-lines": numLines,
        "num-trials": numTrials, "tech": tech, "id": id}
    }
    var value;
    $.ajax({
        url: "//api.ipify.org/?format=json",
        dataType: 'JSON',
        success: function(data) {
            d["ip"] = data.ip
            value =  JSON.stringify(d);
            console.log(value)
            sessionStorage.setItem("info", value)
            location.href = './scrolling-test.html?mode=' + mode + '&num-lines=' + numLines + '&num-trials=' + numTrials + '&autoswitch=' + autoswitch + '&study_select=' + studySelect + "&tech=" + tech + "&participant=" + id;},
        error: function (jqXHR, textStatus, errorThrown) {
            d["ip"] = "fail to get ip"
            // console.log(jqXHR);
            // console.log(textStatus);
            // console.log(errorThrown);
            value =  JSON.stringify(d);
            console.log(value)
            sessionStorage.setItem("info", value);
            location.href = './scrolling-test.html?mode=' + mode + '&num-lines=' + numLines + '&num-trials=' + numTrials + '&autoswitch=' + autoswitch + '&study_select=' + studySelect + "&tech=" + tech + "&participant=" + id;}
    })
}

$("#btn-demo").click(function(){
    getValue('demo');
    //location.href='./scrolling-test.html?mode=demo'
})
$("#btn-formal").click(function(){
    getValue('formal');
    //location.href='./scrolling-test.html?mode=formal'
})
