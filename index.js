$("button").addClass("function font-weight-bold btn btn-lg col-3 rounded-pill");
$(".transparency").animate({ opacity: "0.5" });

var selectedNumber = [];
var selectedOperator = [];
var result = 0;
var previousPressed = undefined;

/* $("body").keypress(function (event) {
  $("input").val(event.key);
}); */

function display() {
  if (selectedNumber.length === 0) {
    $("input").val("0");
    return;
  }

  if (selectedNumber.length === 1) {
    $("input").val(selectedNumber[0]);
    return;
  }
  if (selectedNumber.length >= 1) {
    $("input").val(selectedNumber[selectedNumber.length - 1]);
    if (
      selectedOperator[selectedOperator.length - 1] === "equals" ||
      selectedOperator[selectedOperator.length - 1] === "module"
    ) {
      $("input").val(result);
      selectedNumber = [result];
      selectedOperator = [];
    }
  }
}

function calculate() {
  if (selectedNumber.length === selectedOperator.length) return;

  var calculationResult = selectedNumber[0];

  for (var index = 1; index < selectedNumber.length; index++) {
    var operator = selectedOperator[index - 1];
    {
      calculationResult = operations(
        calculationResult,
        selectedNumber[index],
        operator
      );
    }
  }
  result = calculationResult;
}
function operations(value1, value2, operation) {
  switch (operation) {
    case "plus":
      return Number(value1) + Number(value2);
    case "minus":
      return Number(value1) - Number(value2);
    case "divide":
      return Number(value1) / Number(value2);
    case "multiple":
      return Number(value1) * Number(value2);
    case "module":
      return Number(value1) % Number(value2);

    default:
      return 0;
  }
}

$(".btn").click(function () {
  var clicked = $(this).attr("id");
  if (clicked !== undefined && Number.isInteger(Number(clicked))) {
    if (previousPressed !== "decimal") {
      if (selectedNumber.length === selectedOperator.length + 1) {
        selectedNumber[selectedNumber.length - 1] =
          selectedNumber[selectedNumber.length - 1] + clicked;
      } else {
        selectedNumber.push(clicked);
      }
    } else {
      selectedNumber[selectedNumber.length - 1] =
        selectedNumber[selectedNumber.length - 1] + "." + clicked;
    }
  } else {
    if (clicked === "plusminus") {
      selectedNumber[selectedNumber.length - 1] =
        Number(selectedNumber[selectedNumber.length - 1]) * -1;
    } else if (clicked === "AC") {
      selectedNumber = [];
      selectedOperator = [];
    } else if (clicked === "decimal") {
    } else {
      selectedOperator.push(clicked);
    }
  }
  previousPressed = clicked;
  calculate();
  display();
});
