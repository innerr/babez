function createGestureStage(imgInputId, gestureAreaId, canvasId, initPos) {
	var pos = initPos;
	var img;

	var stage = new createjs.Stage(canvasId);
	function tick(event) {
		stage.update(event);
	}
	createjs.Ticker.addEventListener('tick', tick);
	createjs.Ticker.setFPS(5);

	area = document.getElementById(gestureAreaId);
	interact(area).gesturable({
		onmove: function(event) {
			if (typeof img == 'undefined') {
				return;
			}
			pos.x = (parseFloat(pos.x) || 0) + event.dx;
			pos.y = (parseFloat(pos.y) || 0) + event.dy;
			pos.s = pos.s * (1 + event.ds);
			pos.a += event.da;
			img.scaleX = pos.s;
			img.scaleY = pos.s;
			img.rotation = pos.a;
			img.x = pos.x;
			img.y = pos.y;
			stage.update();
		},
		onstart: function(event) {
		},
		onend: function(event) {
		}
	}).draggable({
		onmove: function(event) {
			if (typeof img == 'undefined') {
				return;
			}
			var x = (parseFloat(pos.x) || 0) + event.dx;
			var y = (parseFloat(pos.y) || 0) + event.dy;
			var s = (parseFloat(pos.s) || 1);
			var a = (parseFloat(pos.a) || 0);
			img.scaleX = pos.s;
			img.scaleY = pos.s;
			img.rotation = pos.a;
			img.x = pos.x;
			img.y = pos.y;
			pos.x = x;
			pos.y = y;
			stage.update();
		}
	});

	var reader = new FileReader(),
	filter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

	reader.onload = function(e) {
		stage.removeChild(img);
		img = new createjs.Bitmap(e.target.result);
		var image = new Image();
		setTimeout(function(){
			img.x = pos.x;
			img.y = pos.y;
			img.scaleX = pos.s;
			img.scaleY = pos.s;
			stage.addChild(img);
			stage.update();
		}, 200)
	};

	document.getElementById(imgInputId).onchange = function() {
		if (document.getElementById(imgInputId).files.length === 0) {
			return;
		}
		var oFile = document.getElementById(imgInputId).files[0];
		if (!filter.test(oFile.type)) {
			alert("You must select a valid image file!");
			return;
		}
		reader.readAsDataURL(oFile);
	}
}
