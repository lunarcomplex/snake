// graphics controller
//
//
//
//

// display an image with everything taken into consideration
function displayImage(canvas, image, canvas_x, canvas_y, scale_w, scale_h,
	offset_x, offset_y, offset_w, offset_h, alpha,
	rotate, revolve, radius, rgb){
	canvas.context.save();

	if(rgb != ""){
		hidden_canvas.width = offset_w;
		hidden_canvas.height = offset_h;
		hidden_context.drawImage(image, offset_x, offset_y, offset_w, offset_h, 0, 0, offset_w, offset_h);
		hidden_context.globalCompositeOperation = "source-in";
		hidden_context.beginPath();
		hidden_context.rect(0, 0, canvas_x, canvas_y);
		hidden_context.fillStyle = rgb;
		hidden_context.fill();
	}

	canvas.context.globalAlpha = alpha;
	canvas.context.translate(canvas_x+(scale_w/2), canvas_y+(scale_h/2));
	canvas.context.rotate(revolve*Math.PI/180*(-1));
	canvas.context.translate(radius, radius);
	canvas.context.rotate(rotate*Math.PI/180*(-1));

	if(rgb != ""){
		canvas.context.drawImage(hidden_canvas, offset_x, offset_y, offset_w, offset_h, (scale_w/2)*(-1), (scale_h/2)*(-1), scale_w, scale_h);
	}else{
		canvas.context.drawImage(image, offset_x, offset_y, offset_w, offset_h, (scale_w/2)*(-1), (scale_h/2)*(-1), scale_w, scale_h);
	}
	
	canvas.context.restore();
}

//displayImage(image, offset_X, offset_Y, offset_W, offset_H, location_X, location_Y, scale_W, scale_H, rotation, alpha, rgb, point_X, point_Y)

// display full image at a certain point on the canvas with an alpha
function displayImage_A(canvas, image, canvas_x, canvas_y, alpha){
	canvas.context.save();
	canvas.context.globalAlpha = alpha;
	canvas.context.drawImage(image, canvas_x, canvas_y);
	canvas.context.restore();
}

// display full image at a certain point on the canvas
//		and scale it accordingly from that point via scale w & h
//		also includes an alpha
function displayImage_B(canvas, image, canvas_x, canvas_y, scale_w, scale_h, alpha){
	canvas.context.save();
	canvas.context.globalAlpha = alpha;
	canvas.context.drawImage(image, canvas_x, canvas_y, scale_w, scale_h);
	canvas.context.restore();
}

// 
function displayImage_C(canvas, image, canvas_x, canvas_y, scale_w, scale_h, offset_x, offset_y, offset_w, offset_h, alpha){
	canvas.context.save();
	canvas.context.globalAlpha = alpha;
	canvas.context.drawImage(image, offset_x, offset_y, offset_w, offset_h, canvas_x, canvas_y, scale_w, scale_h);
	canvas.context.restore();
}

// extra functions for future additions
function displayImage_D(){}
function displayImage_E(){}
function displayImage_F(){}
function displayImage_G(){}
function displayImage_H(){}
function displayImage_I(){}
function displayImage_J(){}
function displayImage_K(){}
function displayImage_L(){}

function displayText(canvas, text, location_X, location_Y, align, baseline, red, green, blue, alpha, size, font, shadow){
	if(shadow){
		// main_context.fillStyle = "rgba(0, 0, 0, 1)";
		canvas.context.fillStyle = "rgba(0, 0, 0, " + alpha.toString() + ")";
		canvas.context.font = size.toString() + "px " + font.toString();
		canvas.context.textAlign = align;
		canvas.context.textBaseline = baseline;
		canvas.context.fillText(text, location_X+2, location_Y+2);
	}
	canvas.context.fillStyle = "rgba(" + red.toString() + ", " + green.toString() + ", " + blue.toString() + ", " + alpha.toString() + ")";
	canvas.context.font = size.toString() + "px " + font.toString();
	canvas.context.textAlign = align;
	canvas.context.textBaseline = baseline;
	canvas.context.fillText(text, location_X, location_Y);
}

function drawSquare(canvas, x, y, width, height, red, green, blue, alpha){
	canvas.context.beginPath();
	canvas.context.rect(x, y, width, height);
	canvas.context.fillStyle = "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";
	canvas.context.fill();
}

function drawCircle(canvas, x, y, radius, red, green, blue, alpha){
	canvas.context.beginPath();
	canvas.context.arc(x, y, radius, 0, 2*Math.PI);
	canvas.context.strokeStyle = "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";
	canvas.context.stroke();
}

function drawArc(canvas, x, y, radius, start, end, red, green, blue, alpha){
	canvas.context.beginPath();
	canvas.context.lineWidth = 10;
	canvas.context.arc(x, y, radius, (start/100)*(2*Math.PI), (end/100)*(2*Math.PI));
	canvas.context.strokeStyle = "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";
	canvas.context.stroke();
}

function drawCircleFilled(canvas, x, y, radius, red, green, blue, alpha){
	canvas.context.beginPath();
	canvas.context.arc(x, y, radius, 0, 2*Math.PI);
	canvas.context.fillStyle = "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";
	canvas.context.fill();
	canvas.context.strokeStyle = "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";
	canvas.context.stroke();
}

function drawLine(canvas, x1, y1, x2, y2, thickness, red, green, blue, alpha){
	canvas.context.beginPath();
	canvas.context.lineWidth = thickness;
	canvas.context.lineCap = "round";
	canvas.context.moveTo(x1, y1);
	canvas.context.lineTo(x2, y2);
	canvas.context.strokeStyle = "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";
	canvas.context.stroke();
}

function numberFormat(num){
	if(num != undefined){
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
}