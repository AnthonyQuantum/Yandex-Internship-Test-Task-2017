var Progress = {
    switchToggle: function switchToggle(event) {
        var toggler = event.currentTarget;
        toggler.classList.toggle('progress__toggle_activated');
    },

    hideWheel: function hideWheel(event) {
        this.switchToggle(event);
        var block = document.getElementsByClassName("progress")[0];
        block.classList.toggle("progress_hidden");
    },

    animateWheel: function animateWheel(event) {
        this.switchToggle(event);
        var block = document.getElementsByClassName("progress")[0];
        block.classList.toggle("progress_animated");
    },

    updateWheel: function updateWheel() {
        var inp = document.getElementsByClassName("progress__value-control")[0];
        if (inp.value < 0) inp.value = 0;
        if (inp.value > 100) inp.value = 100;
        this.drawWheel(inp.value);
    },

    drawWheel: function drawWheel(length) {
        if (length == 100) length = 99.99;
        document.getElementsByClassName("progress__arc")[0].setAttribute("d", this._describeArc(100, 100, 90, 0, length*3.6));
    },

    _polarToCartesian: function _polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
      
        return {
          x: centerX + (radius * Math.cos(angleInRadians)),
          y: centerY + (radius * Math.sin(angleInRadians))
        };
    },

    _describeArc: function _describeArc(x, y, radius, startAngle, endAngle){
        var start = this._polarToCartesian(x, y, radius, endAngle);
        var end = this._polarToCartesian(x, y, radius, startAngle);
    
        var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
        var d = [
            "M", start.x, start.y, 
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
        ].join(" ");
    
        return d;       
    }
};