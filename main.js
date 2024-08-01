$(document).ready( function(){
    'use strict';
    paper.install(window);
    paper.setup(document.getElementById('mainCanvas'));

    var topLeft = view.center - [80, 80];
    var bottomRight = view.center + [80, 80];

    var path = new Path.Rectangle(topLeft, bottomRight);
    var gradient = new Gradient(['yellow', 'red', 'blue']);

    var color = new Color(gradient,topLeft,bottomRight);

    // var tool = new Tool();

    // tool.onMouseDown = function(event){
    //     var c = Shape.Circle(event.point, 20);
    //     c.fillColor = 'yellow';
    // }
    var circle = Shape.Circle(200,200,80);
    circle.fillColor = color;
    var text = new PointText(200,200);
    text.justification = 'center';

    text.fillColor = 'white';
    text.fontSize = 20;
    text.content = 'hello world';

    paper.view.draw();
}
)