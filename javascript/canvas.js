//---------------- Standard part ----------------

var canvasObj;
var canvasCtx;

window.addEventListener("load", loadHandler, false);

function loadHandler() {
    canvasObj = document.querySelector("canvas");

    if (canvasObj.getContext) {
        canvasCtx = canvasObj.getContext("2d");
        setupExample();
    }
}

//---------------- Specific part ----------------

function setupExample() {
    drawPolygon();
}

function drawPolygon() {
	if (canvasCtx) {
    var stats = [20, 30, 2, 5, 46, 310, 12];
    var statsCount = stats.length;

    canvasCtx.fillStyle = "#E8E8E8";
    canvasCtx.fillRect(0, 0, canvasObj.width, canvasObj.height);

    canvasCtx.strokeStyle = "black";
    canvasCtx.lineWidth = 1;

    var centerX = canvasObj.width / 2;
    var centerY = canvasObj.height / 2;

    var radius = 100;
    var radiansBase;

    if (statsCount % 2 == 1) {
      //-- The number of sides is odd (3, 5, 7, etc...) --
      radiansBase = -Math.PI / 2;
    } else {
      //-- The number of sides is even (4, 6, 8, etc...) --
      radiansBase = -Math.PI / 2 + Math.PI / statsCount;
    }
    
    for (var i = 0; i < statsCount; i++) {
    	var iMassaged = radius/20;
      canvasCtx.fillStyle = 'rgb(' + Math.floor(255-stats[i]*i) + ',' + 
		                       Math.floor(255-stats[i]*i) + ',0)';

      var radians1 = radiansBase + i * 2*Math.PI / statsCount;
      var radians2 = radiansBase + (i+1) * 2*Math.PI / statsCount;

      var x1 = centerX + Math.cos(radians1) * radius;
      var y1 = centerY + Math.sin(radians1) * stats[i]*iMassaged;

      if ((i + 1) == statsCount) {
	      var x2 = centerX + Math.cos(radians2) * radius;
	      var y2 = centerY + Math.sin(radians2) * stats[0]*iMassaged;
	    } else {
	    	var x2 = centerX + Math.cos(radians2) * radius;
	      var y2 = centerY + Math.sin(radians2) * stats[i+1]*iMassaged;
	    }

      canvasCtx.beginPath();
      canvasCtx.moveTo(centerX, centerY);
			canvasCtx.lineTo(x1, y1);
			canvasCtx.lineTo(x2, y2);
			canvasCtx.lineTo(centerX, centerY);
			
			canvasCtx.closePath();
    	canvasCtx.fill();
      canvasCtx.stroke();

      if (i == 0) {
        canvasCtx.moveTo(x1, y1);
        var pointX1 = x1;
        var pointY1 = y1;
      } else if ((i + 1) == statsCount) {
      	canvasCtx.lineTo(pointX1, pointY1);
      } else {
				 canvasCtx.lineTo(x1, y1);
      }
    }
  }
}