var canvas = document.querySelector("canvas");
var c = canvas.getContext('2d');
var xGrid = 10;
var yGrid = 10;
var cellSize;
var eq;
var colors = ["red", "yellow", "blue", "green"];
var colorconst = 0;
var z = "zoomin";
canvas.width = 1000;
canvas.height = 500;
var ran = 1;

function zoomInOut(){
	if(z == "zoomin"){
		void c.translate(0, 0);
		clearit();
		// canvas.width = 2000;
		// canvas.height = 1000;
		// cellSize = 10;
		// drawGrid();
		ran = 2;
		void c.translate(500, 250);

	}
	else{
		void c.translate(0, 0);		
		clearit();
		void c.translate(0, -250);		
		// canvas.width = 1000;
		// canvas.height = 500;
		// cellSize = 15;
		// drawGrid();
		// void c.translate(500, 0);
		ran = 1;
	}
}

zoomInOut();

var zoom = document.querySelector("#zoom");
zoom.addEventListener("click", function(){
	if(zoom.innerHTML == "Zoom In"){
		zoom.innerHTML = "Zoom Out";
		z = "zoomout";
		zoomInOut();
	}
	else{
		zoom.innerHTML = "Zoom In";
		z = "zoomin";
		zoomInOut();
	}
});

var submit = document.querySelector("#submit");
submit.addEventListener("click", function(){
	eq = document.querySelector("input").value;
	plot(function (x) {
	return eval(eq);
	}, [0, Math.PI * 6, -6, 6]);    
	document.querySelector("input").value = "";	
})



// canvas.width = 1000;
// canvas.height = 500;

function drawGrid(){
	c.clearRect(0, 0, 1000, 500);
	console.log("clear");
	c.beginPath();
	while(xGrid < canvas.height){
		c.moveTo(0, xGrid);
		c.lineTo(canvas.width, xGrid);
		xGrid += cellSize;
	}
	while(yGrid < canvas.width){
		c.moveTo(yGrid, 0);
		c.lineTo(yGrid, canvas.height);
		yGrid += cellSize;
	}
	c.strokeStyle = "gray";
	c.stroke();
	console.log("drew");
}

// drawGrid();
// void c.translate(500, 0);

 plot = function plot(fn, range) {
        var widthScale = (canvas.width / (range[1] - range[0])*ran),
            heightScale = (canvas.height / (range[3] - range[2])*ran),
            first = true;
            second = true;

	

// void c.translate(500, 0);
// void c.translate(500, 0);
        
        c.beginPath();
        
        for (var x = 0; x < canvas.width; x++) {
            var xFnVal = (x / widthScale) - range[0],
                yGVal = (fn(xFnVal) - range[2]) * heightScale;
            
            yGVal = canvas.height - yGVal; // 0,0 is top-left
            
            if (first) {
                c.moveTo(x, yGVal);
                first = false;
            }
            else {
                c.lineTo(x, yGVal);
            }
        }
		for (var x = -1; x > (-canvas.width); x--) {
            var xFnVal = (x / widthScale) - range[0],
                yGVal = (fn(xFnVal) - range[2]) * heightScale;
            
            yGVal = canvas.height - yGVal; // 0,0 is top-left
            
            if (second) {
                c.moveTo(x, yGVal);
                second = false;
            }
            else {
                c.lineTo(x, yGVal);
            }
        }        
        
        c.strokeStyle = colors[colorconst];
        colorconst++;
     	if(colorconst === 4){
     		clearit();
     	}
        c.lineWidth = 3;
        c.stroke(); 
void c.translate(0, 0);

    };
    function func(trig){
    	if(trig.id == "sin"){  		
	    	plot(function (x) {
		    return Math.sin(x);
			}, [0, Math.PI * 6, -6, 6]);    		
    	}
    	else if(trig.id == "cos"){
    	    	plot(function (x) {
			    return Math.cos(x);
				}, [0, Math.PI * 6, -6, 6]);  		
    	}
    	else if(trig.id == "tan"){
   	    	plot(function (x) {
		    return (Math.sin(x)/Math.cos(x));
			}, [0, Math.PI * 6, -6, 6]);  		
    	}
    	else if(trig.id == "clear"){
			c.clearRect(0, 0, 2000, 1000);
    	} 	

    }

function clearit(){
	c.clearRect(0, 0, 1000, 500);		
}    