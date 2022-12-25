var index = 0;
var form = 0;
var correct = 0;
var altogether = 0;
var inputTag = '<input type="text" id="myInput" autocomplete="off">';

function generateVerb() {
  hideAnswer();

  index = Math.floor(Math.random() * dict.length);
  form = Math.floor(Math.random() * 3);

  var entry = dict[index];

  $("#first").text(entry[0]);
  $("#second").text(entry[1]);
  $("#third").text(entry[2]);
  $("#uzbek").text(entry[3]);

  switch (form) {
    case 0:
      $("#first").html(inputTag);
      break;
    case 1:
      $("#second").html(inputTag);
      break;
    default:
      $("#third").html(inputTag);
  }

  $("#myInput").focus();
}

function checkVerb() {
  var myInput = $("#myInput").val().trim().toLowerCase();
  myInput = "$" + myInput + "$";

  var correctInput = "$" + dict[index][form].replace("/", "$") + "$";
  var timer = 0;

  if (correctInput.indexOf(myInput) > -1) {
    correct++;
    $("#myInput").css({ backgroundColor: "YellowGreen" });
    timer = 1500;
  } else {
    $("#myInput").css({ backgroundColor: "DarkSalmon" });
    showAnswer();
    timer = 3000;
  }

  setTimeout(generateVerb, timer);

  updateCounters();
}

function updateCounters() {
  $("#counterCorrect").text(correct);
  $("#counterAltogether").text(altogether);
}

function showAnswer() {
  $("#answer").text(dict[index][form]).show();
}

function hideAnswer() {
  $("#answer").hide();
}

$(document).ready(function () {
  generateVerb();

  $("form").submit(function () {
    altogether++;
    if ($("#myInput").attr("value") == "") {
      return false;
    }
    $("#myInput").attr({ disabled: "disabled" });
    checkVerb();
    return false;
  });
});
