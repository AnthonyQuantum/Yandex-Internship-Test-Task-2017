function switchToggle(event) {
    var toggler = event.currentTarget;
    toggler.classList.toggle('progress__toggle_activated');
}

function hideWheel(event) {
    switchToggle(event);
    var block = document.getElementsByClassName("progress")[0];
    block.classList.toggle("progress_hidden");
}



function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
  
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
}

var wheel = {
    startPos: 0,
    length: 0
};
var wheelInterval;

function animateWheel(event) {
    switchToggle(event);
    var block = document.getElementsByClassName("progress")[0];
    if (block.classList.contains("progress_animated")) {
        block.classList.remove("progress_animated");
        clearInterval(wheelInterval);
    } else {
        block.classList.add("progress_animated");
        wheelInterval = setInterval(function() {
            drawWheel();
            wheel.startPos = Math.ceil(wheel.startPos) + 1;
            if (wheel.startPos == 100) wheel.startPos = 0;
        }, 40);
    }
}

function updateWheel() {
    wheel.length = document.getElementsByClassName("progress__value-control")[0].value;
    drawWheel();
}

function drawWheel() {
    var endPos = +wheel.startPos + +wheel.length;
    if (+wheel.startPos == 100) wheel.startPos = 99.99;
    if (endPos == 100) endPos = 99.99;
    var startAngle = +wheel.startPos*3.6;
    var endAngle = endPos*3.6;
    document.getElementsByClassName("progress__arc")[0].setAttribute("d", describeArc(100, 100, 90, startAngle, endAngle));
}

function describeArc(x, y, radius, startAngle, endAngle){
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;       
}

window.onload = function() {
    updateWheel();
}