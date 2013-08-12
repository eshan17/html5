// This code uses the "exports" pattern to keep its namespace clean.
// This pattern is used widely in node.
// Contrast it, for example, with any of the prototypical objects like Ball.js.

var TouchHandler = (function() {
    var exports = {};
    var touchBalls = {};
    var touchCounts = 0;
    var page;
    var touchInstancesArray = [];
    var numofFingers = 0;

    exports.init = function(app) {
        var radius = 20;
        var canvas = app.canvas[0];
        page = app.page;

        function onTouchStart(e) {
            var i, ballConfig, touch, ballLocation;
            e.preventDefault();
            
            for (i = 0; i < e.changedTouches.length; i++) {
                touch = e.changedTouches[i];
                ballLocation = page.pageToCanvas(touch.pageX, touch.pageY);
                ballConfig = {'x': ballLocation.x,
                              'y': ballLocation.y,
                              'radius': radius,
                              'maxX': app.width,
                              'maxY': app.height,
                              'style': 'red'};
                touchBalls[touch.identifier] = new Ball(ballConfig);
                numofFingers++;
            }
        }

        function onTouchMove(e) {
            var i, touch, ballLocation;
            e.preventDefault();
            touchCounts++;

            for (i = 0; i < e.changedTouches.length; i++) {
                touch = e.changedTouches[i];

                ballLocation = page.pageToCanvas(touch.pageX, touch.pageY);
                if (touchBalls[touch.identifier] !== undefined) {
                  touchBalls[touch.identifier].x = ballLocation.x;
                  touchBalls[touch.identifier].y = ballLocation.y;
                }
            }

            console.log("Number of fingers are: " + numofFingers);
            console.log("touchcounts is: " + touchCounts);
            if(numofFingers > 1)
            {
                if(touchCounts > 5 && touchCounts % 2 !== 0 && e.changedTouches.length > 1)
                {
                  touchInstances = 
                  {
                    finger1: {
                        x: touchBalls[e.changedTouches[0].identifier].x,
                        y: touchBalls[e.changedTouches[0].identifier].y
                    },
                    finger2: {
                        x: touchBalls[e.changedTouches[1].identifier].x,
                        y: touchBalls[e.changedTouches[1].identifier].y
                    }
                  };

                  if(touchInstancesArray.length >= 5)
                    touchInstancesArray.shift();

                    touchInstancesArray.push(touchInstances);
                    // console.log("The length of the array is: " + touchInstancesArray.length);


                    //the last element in the array
                    var f2x2 = touchInstancesArray[touchInstancesArray.length-1]["finger2"]["x"];
                    var f2y2 = touchInstancesArray[touchInstancesArray.length-1]["finger2"]["y"];
                    var f1x2 = touchInstancesArray[touchInstancesArray.length-1]["finger1"]["x"];
                    var f1y2 = touchInstancesArray[touchInstancesArray.length-1]["finger1"]["y"];

                    //the first element in the array
                    var f2x1 = touchInstancesArray[0]["finger2"]["x"];
                    var f2y1 = touchInstancesArray[0]["finger2"]["y"];
                    var f1x1 = touchInstancesArray[0]["finger1"]["x"];
                    var f1y1 = touchInstancesArray[0]["finger1"]["y"];

                    var diff1x = f2x1 - f1x1;
                    var diff1y = f2y1 - f1y1;

                    var squaredx1 = Math.pow(diff1x, 2);
                    var squaredy1 = Math.pow(diff1y, 2);
                    var sumOfSquares1 = squaredx1 + squaredy1;
                    var diff1 = Math.sqrt(sumOfSquares1);

                    var diff2x = f2x2 - f1x2;
                    var diff2y = f2y2 - f1y2;

                    var squaredx2 = Math.pow(diff2x, 2);
                    var squaredy2 = Math.pow(diff2y, 2);
                    var sumOfSquares2 = squaredx2 + squaredy2;
                    var diff2 = Math.sqrt(sumOfSquares2);

                    var diff = (diff2 - diff1);  
                    // console.log("hahaha the diff is " + diff);  
                    // console.log(window.eshan);
                    if(diff > 1)
                    {

                        window.eshan.zoomIn();
                    }
                    else if(diff < -1)
                    {
                        window.eshan.zoomOut();
                    }
                }
            }
        }

        function onTouchCancel(e) {
            // called when browser loses focus (eg, on iOS when it recognizes a gesture)
            touchBalls = [ ];
        }
        
        function onTouchEnd(e) {
            for (i = 0; i < e.changedTouches.length; i++) {
                touch = e.changedTouches[i];
                delete touchBalls[touch.identifier];
                numofFingers = numofFingers - 1;
            }
        }

        canvas.addEventListener('touchstart', onTouchStart);
        canvas.addEventListener('touchmove', onTouchMove);
        canvas.addEventListener('touchend', onTouchEnd);
        canvas.addEventListener('touchcancel', onTouchCancel);
    }

    exports.drawBalls = function() {
      for (id in touchBalls) {
        ball = touchBalls[id];
        ball.draw.bind(ball)(page)
      }
    };

    return exports;
})();
