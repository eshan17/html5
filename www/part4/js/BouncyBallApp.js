var BouncyBallApp = function(){
    this.setup();
    window.util.deltaTimeRequestAnimationFrame(this.draw.bind(this));
}

BouncyBallApp.prototype.zoomOut = function() {
    this.side -= 20;
    if(this.side < 5) {
        this.side += 20;
    }
};

BouncyBallApp.prototype.zoomIn = function() {
    console.log("in zoomIn");
    this.side += 20;
    if(this.side > Math.min(this.width, this.height)) {
        this.side -=20;
    }
};



//==============================================
//SETUP
//==============================================

BouncyBallApp.prototype.setup = function(){
    window.util.patchRequestAnimationFrame();
    window.util.patchFnBind();
    this.initCanvas();
    this.side = Math.min(this.width/2, this.height/2);
    TouchHandler.init(this);
    this.draw(this);
}

BouncyBallApp.prototype.drawSquare = function(){
    
    this.page.fillRect(this.width/2 - this.side/2, this.height/2 - this.side/2, this.side, this.side, 'green');
};

BouncyBallApp.prototype.initCanvas = function(){
    this.body = $(document.body);
    this.body.width(document.body.offsetWidth);
    this.body.height(window.innerHeight - 20);
    this.width = 320;
    this.height = 480;
    this.canvas = window.util.makeAspectRatioCanvas(this.body, this.width/this.height);
    this.page = new ScaledPage(this.canvas, this.width);
};

//==============================================
//DRAWING
//==============================================

BouncyBallApp.prototype.draw = function(timeDiff){
    this.clearPage();

    this.drawSquare();

    //this.drawBall(timeDiff);
    TouchHandler.drawBalls(timeDiff);
    //this.updateBall();
}

BouncyBallApp.prototype.clearPage = function(){
    this.page.fillRect(0, 0, this.width, this.height, '#eee');
}

