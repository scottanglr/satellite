//Credit to Joe (Distant hipster) for some pretty sweet graphics

var four = {

    rotatePoint : function(angle, x, y, pivotx, pivoty){
        //http://en.wikipedia.org/wiki/Rotation_matrix#In_two_dimensions
        newX = pivotx + (x - pivotx) * Math.cos(-angle) + (y - pivoty) * Math.sin(-angle); //I think the computer takes radians as already multiplied by PI
        newY = pivoty + (x - pivotx) * -Math.sin(-angle) + (y - pivoty) * Math.cos(-angle);
        return [newX, newY];
    },


    drawFrame: function(animation, animationTick, angle, pivotx, pivoty){ //array contains parts (objects) containing properties for color, stroke, fill, list of points
        //animation is an array of objects/parts that have their own properties. The parts contain their own frames and for now things like colour switching won't be available for each frame,
        //just each part
        //This does not manage what tick it is up to and whether it should change to something else. I thought that would be best from the actual object because you can't change the animation
        //at this point
        for(var i = 0; i<animation.parts.length; i++){
            var part = animation.parts[i]; //There could be many parts to a single object
            //Part is object containing drawTypes and frames

            //Frame is an array of points for a frame
            var frame = part.points[animationTick];

            //Making the shape points relative to the object position. Have to do this here so it happens each frame. The original points aren't changed.
            var newPoints = [];
            for(var k=0;k<frame.length;k++){
                var x = frame[k][0] + pivotx;
                var y = frame[k][1] + pivoty;
                newPoints.push(four.rotatePoint(angle, x, y, pivotx, pivoty));
            }
            ctxfg.beginPath();
            ctxfg.moveTo(newPoints[0][0], newPoints[0][1]);
            for(var j=1; j<newPoints.length; j++){
                ctxfg.lineTo(newPoints[j][0], newPoints[j][1]); //pivotx and pivoty put the shape relative to the position
            }
            ctxfg.closePath();


            if (part.fill === true){
                ctxfg.shadowBlur = part.shadowBlur;
                ctxfg.shadowColor = part.blurColor;
                ctxfg.fillStyle = part.fillStyle;
                ctxfg.shadowBlur = part.shadowBlur * globalShadowBlur;
                ctxfg.shadowColor = part.shadowColor;
                ctxfg.fill();

            }

            if (part.stroke === true){
                ctxfg.strokeStyle = part.strokeStyle;
                ctxfg.lineWidth = part.lineWidth;
                ctxfg.stroke();
            }

        }
    }

};

//Now because drawFrame won't know what the time/frame is for a particular object, as it would need to hold data for object requestion animation, the object must keep up with its own frames


//To set an object up for this you must give the object a few arrays of different animations to send to the function from the obj.
//The animations/animationParts have objects that need to be rendered inside. The objects to be rendered contain properties of stroke colour, fill colour, etc. The parts also contains the frames.
//Which frame is dependent on the frame number sent to the function.



//////////////////////////////////////////////////////////////////////////////////////////// Data types
////////////////////////////////////////////////////////////////////////////////////////////
Array.prototype.clone = function() { //RAD style http://stackoverflow.com/questions/2294703/multidimensional-array-cloning-using-javascript
    var arr = this.slice(0);
    for( var i = 0; i < this.length; i++ ) {
        if( this[i].clone ) {
            //recursion
            arr[i] = this[i].clone();
        }
    }
    return arr;
};

globalGravityDynamic = false;


//Key holds what you see here like this - Enter: 13
//_pressed holds 13: true
//However in their model I don't see the point of having it set to true as there are none in the array set to false
Keys = {};
Keys.active = [];
Keys.pressed = []
Keys.down = [];
Keys.released = [];
Keys.onKeydown = function(event){
    event.preventDefault();
    if(Keys.active.indexOf(event.keyCode) != -1 && Keys.pressed.indexOf(event.keyCode) === -1 && Keys.down.indexOf(event.keyCode) === -1){
        Keys.pressed.push(event.keyCode);
    }
};
Keys.forceKeyDown = function(keyCode){
    if(Keys.active.indexOf(keyCode) != -1 && Keys.pressed.indexOf(keyCode) === -1 && Keys.down.indexOf(keyCode) === -1){
        Keys.pressed.push(keyCode);
    }
};

Keys.onKeyup = function(event) { //Can be called when not in game
    event.preventDefault();
    if(event.keyCode == 13){
        initGame();
    }else{
        if(event.keyCode == 66){
            canvas3.blur();
        }else{
            if(event.keyCode == 70){
                canvas3.focus();
            }else{
                if(Keys.active.indexOf(event.keyCode) != -1 && Keys.released.indexOf(event.keyCode) === -1){
                    Keys.released.push(event.keyCode);
                }
            }
        }
    }

};

Keys.forceKeyUp = function(keyCode) { //Can be called when not in game
    if(keyCode == 13){
        initGame();
    }else{
        if(keyCode == 66){
            canvas3.blur();
        }else{
            if(keyCode == 70){
                canvas3.focus();
            }else{
                if(Keys.active.indexOf(keyCode) != -1 && Keys.released.indexOf(keyCode) === -1){
                    Keys.released.push(keyCode);
                }
            }
        }
    }

};

//Template
/*
 Keys.X = {};
 Keys.X.onKeydown = function(){

 }
 Keys.X.onKeyUp = function(){

 }
 Keys.X.onKeyIsDown = function(){

 }
 */

//P1 forwards
Keys.UP = {};
Keys.UP.keyCode = 38;
Keys.UP.onKeydown = function(){
    p1.thrustDirection = 1;
};
Keys.UP.onKeyUp = function(){
    p1.thrustDirection = 0;
};
Keys.UP.onKeyIsDown = function(){
    if (players.indexOf(p1) != -1) {
        p1.thrust(0);
    }
};
Keys.active.push(Keys.UP.keyCode);

//P2 forwards
Keys.W = {};
Keys.W.keyCode = 87;
Keys.W.onKeydown = function(){
    p2.thrustDirection = 1;
} ;
Keys.W.onKeyUp = function(){
    p2.thrustDirection = 0;
};
Keys.W.onKeyIsDown = function(){
    if (players.indexOf(p2) != -1) {
        p2.thrust(0);
    }
};
Keys.active.push(Keys.W.keyCode);

//P1 backwards
Keys.DOWN = {};
Keys.DOWN.keyCode = 40;
Keys.DOWN.onKeydown = function(e){
    p1.thrustDirection = -1;
};
Keys.DOWN.onKeyUp = function(e){
    p1.thrustDirection = 0;
};
Keys.DOWN.onKeyIsDown = function(){
    if (players.indexOf(p1) != -1) {
        p1.thrust(1);
    }
};
Keys.active.push(Keys.DOWN.keyCode);

//P2 backwards
Keys.S = {};
Keys.S.keyCode = 83;
Keys.S.onKeydown = function(){
    p2.thrustDirection = -1;
};
Keys.S.onKeyUp = function(){
    p2.thrustDirection = 0;
};
Keys.S.onKeyIsDown = function(){
    if (players.indexOf(p2) != -1) {
        p2.thrust(1);
    }
};
Keys.active.push(Keys.S.keyCode);

//P1 CCW rotate
Keys.LEFT = {};
Keys.LEFT.keyCode = 37;
Keys.LEFT.onKeydown = function(){};
Keys.LEFT.onKeyUp = function(){};
Keys.LEFT.onKeyIsDown = function(){
    if (players.indexOf(p1) != -1) {
        p1.faceAngle -= 0.025*globalTimeFactor + 0.025;
        //I had rotatePoints here so it could actually rotate but I have to simulate now as it wasn't moving with the player constantly
        //and I can't translate it to player once it has started rotating
        // That is -0.1 already multiplied by pi, not -0.1PI. Maybe. I don't get radians really.
    }
};
Keys.active.push(Keys.LEFT.keyCode);

//P2 CCW rotate
Keys.A = {};
Keys.A.keyCode = 65;
Keys.A.onKeydown = function(){} ;
Keys.A.onKeyUp = function(){};
Keys.A.onKeyIsDown = function(){
    if (players.indexOf(p2) != -1) {
        p2.faceAngle -= 0.025*globalTimeFactor + 0.025;
    }
};
Keys.active.push(Keys.A.keyCode);

//P1 CW rotate
Keys.RIGHT = {};
Keys.RIGHT.keyCode = 39;
Keys.RIGHT.onKeydown = function(){} ;
Keys.RIGHT.onKeyUp = function(){};
Keys.RIGHT.onKeyIsDown = function(){
    if (players.indexOf(p1) != -1) {
        p1.faceAngle += 0.025*globalTimeFactor + 0.025;
        //I had rotatePoints here so it could actually rotate but I have to simulate now as it wasn't moving with the player constantly
        //and I can't translate it to player once it has started rotating
        // That is -0.1 already multiplied by pi, not -0.1PI. Maybe. I don't get radians really.
    }
};
Keys.active.push(Keys.RIGHT.keyCode);

//P2 CW rotate
Keys.D = {};
Keys.D.keyCode = 68;
Keys.D.onKeydown = function(){};
Keys.D.onKeyUp = function(){};
Keys.D.onKeyIsDown = function(){
    if (players.indexOf(p2) != -1) {
        p2.faceAngle += 0.025*globalTimeFactor + 0.025;
    };
};
Keys.active.push(Keys.D.keyCode);

//P1 shoot
Keys.K = {};
Keys.K.keyCode = 75;
Keys.K.onKeydown = function(){};
Keys.K.onKeyUp = function(){};
Keys.K.onKeyIsDown = function(){
    if (players.indexOf(p1) != -1) {
        p1.shoot();
    };
};
Keys.active.push(Keys.K.keyCode);

//P2 shoot
Keys.C = {};
Keys.C.keyCode = 67;
Keys.C.onKeydown = function(){};
Keys.C.onKeyUp = function(){};
Keys.C.onKeyIsDown = function(){
    if (players.indexOf(p2) != -1) {
        p2.shoot();
    };
};
Keys.active.push(Keys.C.keyCode);

//P1 Change bullet
Keys.J = {};
Keys.J.keyCode = 74;
Keys.J.onKeydown = function(){
    if(p1.currentItem === "meteor" || p1.currentItem === "slowBullet"){
        p1.showTrajectory = true;
        p1.currentItem = "fastBullet";
    }else{ //Fast bullet is selected
        p1.showTrajectory = true;
        p1.currentItem = "slowBullet";
    }
};
Keys.J.onKeyUp = function(){};
Keys.J.onKeyIsDown = function(){};
Keys.active.push(Keys.J.keyCode);

//P1 Change bullet
Keys.L = {};
Keys.L.keyCode = 76;
Keys.L.onKeydown = function(){
    console.log("Item swapped");
    p1.currentItem = "meteor";
    p1.showTrajectory = false;
};
Keys.L.onKeyUp = function(){};
Keys.L.onKeyIsDown = function(){};
Keys.active.push(Keys.L.keyCode);

//P2 Change bullet
Keys.X = {};
Keys.X.keyCode = 88;
Keys.X.onKeydown = function(){
    if(p2.currentItem === "meteor" || p2.currentItem === "slowBullet"){
        p2.currentItem = "fastBullet";
    }else{ //Fast bullet is selected
        p2.currentItem = "slowBullet";
    }
};
Keys.X.onKeyUp = function(){};
Keys.X.onKeyIsDown = function(){};
Keys.active.push(Keys.X.keyCode);

Keys.associations = { //Creates links to above objects
    //P1
    37 : Keys.LEFT,
    38 : Keys.UP,
    39 : Keys.RIGHT,
    40 : Keys.DOWN,

    75 : Keys.K,
    76 : Keys.L,
    74 : Keys.J,
    //P2
    87 : Keys.W,
    65 : Keys.A,
    83 : Keys.S,
    68 : Keys.D,

    67 : Keys.C,
    88 : Keys.X,
    86 : Keys.V

}

//You can't press at once up, left and right. The older version also had this problem.
//You can press W, A and D. Interesting bug. You can press UP, RIGHT and DOWN but not UP, LEFT and DOWN. Maybe the arrays/keycodes don't allow for numbers in the middle?
checkControls = function() { //Checks per frame
    for (var i=0; i<Keys.released.length ;i++){//Enacts on key release function and removes item from key released key array and down array
        Keys.associations[Keys.released[i]].onKeyUp();
        console.log(Keys.released[i] + " up");
        Keys.down.splice(Keys.down.indexOf(Keys.released[i]), 1);
        Keys.released.splice(i, 1);

    }
    for (var i=0; i<Keys.pressed.length; i++){ //Enacts on keydown action and moves key to down list
        Keys.associations[Keys.pressed[i]].onKeydown();
        console.log(Keys.pressed[i] + " down");
        Keys.down.push(Keys.pressed[i]);
        Keys.pressed.splice(i, 1);
    }
    for (var i=0; i<Keys.down.length; i++){ //Fires on the same frame as press
        Keys.associations[Keys.down[i]].onKeyIsDown();
    }

    /*
     if (players.indexOf(p1) != -1) {//my solution of checking if player is alive is to check if it's in the global active players list. I could use an isAlive property, though.
     if (Key.isDown(Key.UP)) {
     // The if statement has to be after to check that it won't add the veloctiy and it will only minus
     var returnedValues = addVelocities(p1.velocityAngle, p1.velocity, p1.faceAngle, 0.2*globalTimeFactor);
     //0.4 is my acceleration. It's velocity/s (step)
     if (returnedValues[1] < 24 || returnedValues[1] < p1.velocity ) {// If new velocity is not greater than 6 or it is going down after getting super speed, it can change speed
     p1.velocity = returnedValues[1];
     }
     p1.velocityAngle = returnedValues[0];//Despite the result of possibly having a greater v than 6 or a v that is less, angle should still change
     p1.generateTrajectory();

     }
     if (Key.isDown(Key.LEFT)) {
     p1.faceAngle += -0.3*globalTimeFactor;
     //I had rotatePoints here so it could actually rotate but I have to simulate now as it wasn't moving with the player constantly
     //and I can't translate it to player once it has started rotating

     // That is -0.1 already multiplied by pi, not -0.1PI. Maybe. I don't get radians really.
     }
     if (Key.isDown(Key.DOWN)) {
     var returnedValues = addVelocities(p1.velocityAngle, p1.velocity, p1.faceAngle - 1 * Math.PI, 0.2*globalTimeFactor); //-1 to give opp direction thrust
     if (returnedValues[1] < 24 || returnedValues[1] < p1.velocity ) {
     p1.velocity = returnedValues[1];
     }
     p1.velocityAngle = returnedValues[0];
     p1.generateTrajectory();

     }
     if (Key.isDown(Key.RIGHT)) {
     p1.faceAngle += 0.3*globalTimeFactor;
     }
     if (Key.isDown(Key.K)) {
     p1.shoot();
     }
     if (Key.isDown(Key.L)) { //Alternates between Specials
     console.log("Item swapped");
     p1.currentItem = "meteor";
     p1.showTrajectory = false;
     }
     if (Key.isDown(Key.J)) { //Alternates between Bullets - Suffers from a key release problem
     if(p1.currentItem === "meteor" || p1.currentItem === "slowBullet"){
     p1.currentItem = "fastBullet";
     p1.showTrajectory = false;
     }else{ //Fast bullet is selected
     p1.currentItem = "slowBullet";
     p1.showTrajectory = true;
     }
     }
     }
     //P2
     if (players.indexOf(p2) != -1) {
     if (Key.isDown(Key.W)) {
     var returnedValues = addVelocities(p2.velocityAngle, p2.velocity, p2.faceAngle, 0.2*globalTimeFactor);
     if (returnedValues[1] < 24 || returnedValues[1] < p2.velocity ) {
     p2.velocity = returnedValues[1];
     }
     p2.velocityAngle = returnedValues[0];
     p2.generateTrajectory();

     }
     if (Key.isDown(Key.A)) {
     p2.faceAngle += -0.3*globalTimeFactor;
     }
     if (Key.isDown(Key.S)) {
     var returnedValues = addVelocities(p2.velocityAngle, p2.velocity, p2.faceAngle - 1 * Math.PI, 0.2*globalTimeFactor);
     if (returnedValues[1] < 24 || returnedValues[1] < p2.velocity ) {
     p2.velocity = returnedValues[1];
     }
     p2.velocityAngle = returnedValues[0];
     p2.generateTrajectory();

     }
     if (Key.isDown(Key.D)) {
     p2.faceAngle += 0.3*globalTimeFactor;
     }
     if (Key.isDown(Key.X)) {
     if (p2.bulletWait <= 0) {
     p2.shoot();
     }
     }
     }
     */
};

//////////////////////////////////////////////////////////////////////////////////////////// Window functions
////////////////////////////////////////////////////////////////////////////////////////////

//700 is the standard height, so divide everything onto 700 to find how much it should take of the screen

function resizeWindow(){ //Sometimes this causes a lot of lag, sometimes this doesn't, I don't understand why yet. It lags after all this code is ran, however
    /*
    console.log("Resizing window");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas2.height = window.innerHeight;
    canvas2.width = window.innerWidth;
    canvas3.height = window.innerHeight;
    canvas3.width = window.innerWidth;
    */
}
window.onresize = function(){
    //Solution used http://stackoverflow.com/questions/15812618/window-onresize-fires-twice
    if (typeof resizeTimer !== "undefined"){ //Checks if the timer has been created. This stops the resizeWindow function from being called too frequently as user adjusts window size
        clearTimeout(resizeTimer);
    }
    //Start timer
    resizeTimer = setTimeout(resizeWindow, 100); //After 100 ms this can be called again without the timer being cleared
};


/*
 function updateTable(){
 varTable.rows[1].cells[0].innerHTML = p1.posx;
 varTable.rows[2].cells[0].innerHTML = p1.posy;
 varTable.rows[1].cells[1].innerHTML = p1.faceAngle;
 varTable.rows[1].cells[2].innerHTML = p1.velocityAngle;
 varTable.rows[2].cells[2].innerHTML = p1.velocity;
 }
 */

function toggleFullscreen() {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  }
  else {
    cancelFullScreen.call(doc);
  }
}

function toggleSun(){
    if (toggleSun.state){ //if toggleSun.state === true / on
        var sunIndex = planets.indexOf(sun);
        planets.splice(sunIndex, 1);
        toggleSun.state = false
    }else{
        planets.push(sun);
        toggleSun.state = true
    }
}

//I'm a little unsure as to why only the sun has the .state method.

function toggleGravityDirection(){
    if (globalGravity === 1){
        globalGravity = -1;
    }else{
        globalGravity = 1;
    }
    for(var i=0; i<players.length; i++){
        players[i].generateTrajectory();
    }
}

function toggleRenderGlows(){
    if (globalShadowBlur){
        globalShadowBlur = 0;
    }else{
        globalShadowBlur = 1;
    }
}

function toggleMotionBlur(){
    if (globalMotionBlur){
        globalMotionBlur = false;
    }else{
        globalMotionBlur = true;
    }
}

function gravitySlider(value){
    gravitySlider.value = value;
    console.log(value);
    for(var i=0; i<players.length; i++){
        players[i].generateTrajectory();
    }
}

function motionBlurSlider(value){ //Firefox will show this as a text box. You can input numbers
    motionBlurSlider.value = value;
    console.log(value);
}

function globalTimeFactorSlider(value){ //Firefox will show this as a text box. You can input numbers
    globalTimeFactor = value;
    console.log(value);
    for(var i=0; i<players.length; i++){
        players[i].generateTrajectory();
    }
}

function globalTrajectoryPointsSlider(value){ //Firefox will show this as a text box. You can input numbers
    globalTrajectoryPoints = value;
    console.log(value);
    for(var i=0; i<players.length; i++){
        players[i].generateTrajectory();
    }
}

function globalTrajectoryDistanceSlider(value){ //Firefox will show this as a text box. You can input numbers
    globalTrajectoryDistance = value;
    console.log(value);
    for(var i=0; i<players.length; i++){
        players[i].generateTrajectory();
    }
}


function onCanvasClick(event) {
    var x = event.pageX;
    var y = event.pageY;
    x -= canvasol.offsetLeft;
    y -= canvasol.offsetTop;
    console.log("MOUSEX: " + x);
    console.log("MOUSEY: " + y);
    //if (planets.indexOf(p1) != -1){
    //	planets.pop() //That bomb from phun works
    //}
    planets.push(new planet(200,20,"#FF00EE",x,y));
    for(var i=0; i<players.length; i++){
        players[i].generateTrajectory();
    }
}

//HUD

//Every variable to be drawn should be an html element. All this should do is overwrite existing innerHTML of a DOM. I think that's how I should say it. Make sure to clear the previous!

updateLPS = function(){//Loops per second
    var framesPassed = frameCount - updateLPS.currentFrameCount;
    updateLPS.currentFrameCount = frameCount;
    LPS.innerText = framesPassed;
};
updateLPS.currentFrameCount = 0;



huds = [];
huds[0] = function(){	//In Game Canvas - Cannot be run atm if a player is dead as it will not show their score
    ctxol.clearRect( 0 , 0 , canvas.width , canvas.height );
    var pointer = 0;
    var totalWins = 0;
    for(var i=0; i<playerWins.length; i++){ //Only has values of players with score
        if(playerWins[i]){
            totalWins += playerWins[i];
        }
    }
    console.log("Total wins: " + totalWins);
    if(totalWins){
        for(var i=0; i<playerWins.length; i++){
            //An undefined will be created at position 0 if a number is created at position 1
            if(playerWins[i]){
                console.log("Drawing bar for player at index position " + i);
                ctxol.fillStyle = players[i].color;	//playerWins[players[i].originalIndex] would have worked too, but we can assume the character is now alive again
                ctxol.shadowColor = players[i].color;
                ctxol.shadowBlur = 40;
                ctxol.fillRect(pointer, 0, ((playerWins[i]/totalWins)*canvas.width), canvas.height/55);
                ctxol.fillRect(pointer, canvas.height, ((playerWins[i]/totalWins)*canvas.width), -canvas.height/55);
                pointer = (playerWins[i]/totalWins)*canvas.width;
            }
        }
    }else{ //First round
        for(var i=0; i<players.length; i++){
            ctxol.fillStyle = players[i].color;
            ctxol.shadowColor = players[i].color;
            ctxol.shadowBlur = 40;
            ctxol.fillRect(0, i*((canvas.height/55)/players.length), canvas.width, (canvas.height/55)/players.length);
            ctxol.fillRect(0, canvas.height-(i*((canvas.height/55)/players.length)), canvas.width, -(canvas.height/55)/players.length);
        }
    }



};
huds[1] = function(){

}; //Game over

function updateHud(selection){ //Only when changing a value of the HUD, not drawing it
    console.log("updating hud " + selection);
    huds[selection]();
}

//////////////////////////////////////////////////////////////////////////////////////////// Game functions
////////////////////////////////////////////////////////////////////////////////////////////



function hexToRGB(hexString){ //Downloaded parts of this http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);
    return (r+","+g+","+b);
}

function invertRGB(RGBString){
    console.log(RGBString);
    RGBString.replace(/\s+/g, ' '); //Remove any spaces.
    var RGBarray = RGBString.split(",");
    var r = -1*(255-RGBarray[0]); //This is how you invert something ;)
    var g = -1*(255-RGBarray[1]);
    var b = -1*(255-RGBarray[2]);
    return (r+","+g+","+b);
}


function rotatePoints(angle, points, pivotx, pivoty){ //Takes a list of points with lists of x,y values inside
    //http://en.wikipedia.org/wiki/Rotation_matrix#In_two_dimensions
    for(var i = 0; i<points.length; i++){
        var x = points[i][0];
        var y = points[i][1];
        points[i][0] = pivotx + (x - pivotx) * Math.cos(-angle) + (y - pivoty) * Math.sin(-angle); //I think the computer takes radians as already multiplied by PI
        points[i][1] = pivoty + (x - pivotx) * -Math.sin(-angle) + (y - pivoty) * Math.cos(-angle);

    }
}


function rotatePoint(angle, x, y, pivotx, pivoty){
    //http://en.wikipedia.org/wiki/Rotation_matrix#In_two_dimensions
    newX = pivotx + (x - pivotx) * Math.cos(-angle) + (y - pivoty) * Math.sin(-angle); //I think the computer takes radians as already multiplied by PI
    newY = pivoty + (x - pivotx) * -Math.sin(-angle) + (y - pivoty) * Math.cos(-angle);
    return [newX, newY];
}


var testCollision = { 		//This object is to hold/organise the methods of testing collision
    distance : function(x1,y1,x2,y2,radius) {//Radial test
        var xDistance = Math.abs(x2 - x1);
        var yDistance = Math.abs(y2 - y1);
        var distanceBetween = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
        return (distanceBetween < radius); //Return the test of false or true
    }

    //Don't forget you can use this context.isPointInPath(x,y);
};

function checkCollision(me){

    this.collide = function () {
        if (you.strength === "sun"){ //sun should never collide with anything of the same strength anyway
            me.deleteSelf(); //No velocity or angle anyway
        }else if(me.strength === "sun"){ //I put this one here so I don't have to check it for every other stage because you and me should never both be sun so it can be an else
            you.deleteSelf();

            //I SHOULD ADD SOMETHING CALLED PLANETS IN HERE INSTEAD OF STRONG. Planets shouldn't bounce with meteorites.

        }else if (you.strength === "strong"){
            if (me.strength === "strong"){
                //bounce(me,you);
                console.log("bounce");
            }else if (me.strength === "weak"){
                me.deleteSelf(you.velocity, you.velocityAngle, you.posx, you.posy);
            }
        }else if (you.strength === "weak"){
            if (me.strength === "strong"){
                //Not needed atm with you being deleted regardless
            }else if (me.strength === "weak"){
                me.deleteSelf(you.velocity, you.velocityAngle, you.posx, you.posy);
            }
            you.deleteSelf(me.velocity, me.velocityAngle, me.posx, me.posy); //He will crash because he's weak regardless of what he crashes into
        }else{
            console.log("ERROR, bad/no strength detected for object you");
        }

    }

    //Remove it from the list of things to check against for efficiency. Also stops it from colliding with self
    var meIndex = collidablesToCheck.indexOf(me);
    collidablesToCheck.splice(meIndex, 1); //Objects can still collide with objects of the same type :)
    for(var i=0;i<collidablesToCheck.length;i++){
        var you = collidablesToCheck[i];
        //Have you collided?
        //test with what has greatest cirlce hit radius
        if (me.collisionSize < you.collisionSize){
            if (testCollision.distance(me.posx, me.posy, you.posx, you.posy, you.collisionSize)){ //If collided
                this.collide();
            }
        }else{
            if (testCollision.distance(you.posx, you.posy, me.posx, me.posy, me.collisionSize)){ //It has to test the collision box size things with both of them because if a smaller thing goes into a bigger...
                this.collide(); //Although only one "collide()" will be done
            }
        }
    }
};



function addVelocities(angle1, velocity1, angle2, velocity2) { //This hurt my brain
    var x1 = velocity1 * Math.cos(angle1);
    var y1 = velocity1 * Math.sin(angle1);
    var x2 = velocity2 * Math.cos(angle2);
    var y2 = velocity2 * Math.sin(angle2);
    var xTotal = x1 + x2;
    var yTotal = y1 + y2;
    var newAngle = Math.atan2(yTotal, xTotal); //Angle can still change despite the velocity going over 15. If I had it after the if it wouldn't be able to slow by applying velocity at a different angle
    var newVelocity = Math.sqrt(xTotal * xTotal + yTotal * yTotal);
    if (newVelocity > 30) {//Max velocity something can go is 30 if it has a force added to it
        newVelocity = 30; //This shouldn't be relevant to the time factor for some reason - because when it is things max out when time is slow
        //Probably because velocity isn't changing according to time, just the translation
    }
    return [newAngle, newVelocity];
}

function calcGravity(massObj, player) {
    var xDistance = massObj.posx - player.posx;
    var yDistance = massObj.posy - player.posy;
    var radius = Math.sqrt(xDistance * xDistance + yDistance * yDistance); //Squaring something will give a positive number, so I don't need to absolute it
    //I'm not using direct distance formula for some odd reason - probably because I forgot it.
    var gAcceleration = globalTimeFactor * globalGravity * gravitySlider.value * (massObj.mass / (radius * radius))//Gravitational pull in m/s/s. Earth would come us as 9.8m/s/s on the surface
    //^^ It doesn't show an error if it's given no .mass
    var angleToMassObj = Math.atan2(yDistance, xDistance); //Given in radians
    //^This is giving a negative angle sometimes. Still working though

    //This adds the velocity each step, therefore its accelerating. acceleration = velocity/s
    //So every step it adds a 0.5ms, next step 0.5ms, next step 0.5ms. It does mean it goes up exponentially like 1ms, 4ms, 9ms, 16ms.
    var returnedValues = addVelocities(player.velocityAngle, player.velocity, angleToMassObj, gAcceleration);
    //Most frustrating error here^ getting the params round the wrong way
    player.velocityAngle = returnedValues[0];
    player.velocity = returnedValues[1];

}

//Global timers
function playerDeath(){
    playerDeath.timeLeft += (-1*globalTimeFactor);
    console.log("Counting down after death: " + playerDeath.timeLeft);
    if(playerDeath.timeLeft <= 0){
        console.log("END GAME");
        var currentTimer = globalTimers.indexOf(playerDeath);
        globalTimers.splice(currentTimer, 1);
        for(var i=0; i<players.length; i++){ //For all players alive
            if(playerWins[players[i].originalIndex]){
                playerWins[players[i].originalIndex] += 1; //The list changes if one player dies, so this keeps it static when referring to the playerWins array. Players are cleared each round, so playerWins is needed
                console.log("Adding win to player (index position) " + players[i].originalIndex);
            }else{ //Creating values of the array here is needed because I want players to stay dynamic. If I created values of 0 when the game starts I have to tell it how many players will be created. This allows it
                //to not need to know how many players there are. Obviously I can't create the 0s in the while initialising a round because it will overwrite the array.
                playerWins[players[i].originalIndex] = 1;
                console.log("Creating wins for player (index position) " + players[i].originalIndex)
            }


        }
        initGame();
    }
}



//////////////////////////////////////////////////////////////////////////////////////////// Constructors
////////////////////////////////////////////////////////////////////////////////////////////

function player(index, color, x, y, velocityAngle, velocity) {
    //Maybe I can use these values ^ if they still exist to do an obj.reset() or I could just let the object be replaced
    //I should rethink how to represent a score and not just follow game conventions
    //Maybe it could be like a bar that swings (shows) either left or right depending on who's winning. It doesn't have to say kills or deaths. Kills doesn't work because suicide is common. Deaths is just sad.
    //Designs:
    //Thick bars on the player's side the same colour as the player, The start in the middle and move to the height of the canvas. They can measure wins and reach a certain point for the player to win

    //A bar down the bottom or top of the screen which is divided into two sections. It's a bar of two fractions, comparing wins. I think I will do this one and I'll have it on the top.

    this.originalIndex = index;
    this.velocity = velocity;
    this.faceAngle = velocityAngle; //faceAngle should not go out of sync with point rotation because the point rotation is done each frame
    //only oncreate only of course ^
    this.velocityAngle = velocityAngle;
    this.color = color;
    this.thrustDirection = 0;
    this.strength = "weak"; //weak hits weak it dies, weak hits strong it dies, weak hits sun it dies, etc

    this.bulletWait = 0; //SetTimeout is not to be used as it should be in sync with the game frames
    this.canShoot = true;
    this.collisionSize = 20;
    this.hitBox = "triangle";
    this.currentItem = "fastBullet";
    this.showTrajectory = false

    // Have to make the picture in the same direction the default angle points -----> that way
    this.posx = x;
    this.posy = y;
    //These points are just here so they can be referenced and then rotated. These are just referred to for things like shooting.
    this.point2x = this.posx-15;
    this.point2y = this.posy-10;
    this.point3x = this.posx+15;
    this.point3y = this.posy;
    this.point4x = this.posx-15;
    this.point4y = this.posy+10;

    //Create animations here and add them to the list underneath called this.animations
    var normal = { //Animation parts. The first item says how many frames are in this animation.
        frames : 1, //human terms    ALWAYS REMEMBER TO RESET TICK WHEN ANIMATION STOPS


        //So, what I wanted is to have a property called onEnd, telling it where to go when this animation ends
        //I wanted it to go to this one when it's done but that created recursion. They all go to this one unless told
        //I used to have an onEnd property telling it where to go when it has finished the animation but this one would enter itself
        //I don't really want to have it constantly moving from function to function anyway because it would go
        //Deeper and deeper possibly


        body : { //this is a part of the object as a whole
            points : [ //this is a list of frames

                //frame 1
                [ //Just an array of frames, not like point1, point2, etc. This way I don't have to think about updating all the time.
                    //These points are not changed but used to give position to rotated points
                    [0, 0], //Each point like this. These are relative to the pivot point that's sent. I used to have it just like [this.posx-15, this.posy-10] but it didn't update the location each frame
                    [-15, -10],
                    [15, 0],
                    [-15, 10]
                ]//Add a comma here to add more frames and one at the end of the line above to add more points


            ],
            fill : true,
            stroke : false,
            strokeStyle : "#000000",
            lineWidth : 4,
            fillStyle : this.color,
            shadowBlur : 1,
            shadowColor : this.color,
            blurColor : this.color
        }
    };
    normal.parts = [normal.body];//The parts of the animation to iterate through to render. "You can't refer to a property of an object before you have initialized that object; use an external variable."
    this.animationTick = -1; //It will start at -1 because it hasn't ticked yet to go onto the frame of what it's meant to draw. Frame 0 is a frame. Before a clock does its first tick its at 0. Now because the first of an array is 0, the before first is -1
    this.currentAnimation = normal; //I don't think it is duplicating. I tried testing that they both === each other and it sais true
    //Private animations can now be accessed from the outside through currentAnimation

    this.thrust = function(direction){ //0 is forward, 1 is backward
        var returnedValues = addVelocities(this.velocityAngle, this.velocity, this.faceAngle - direction * Math.PI, 0.2*globalTimeFactor);
        //0.4 is my acceleration. It's velocity/s (step)
        if (returnedValues[1] < 24 || returnedValues[1] < this.velocity ) {// If new velocity is not greater than 6 or it is going down after getting super speed, it can change speed
            this.velocity = returnedValues[1];
        }
        this.velocityAngle = returnedValues[0];//Despite the result of possibly having a greater v than 6 or a v that is less, angle should still change
        this.generateTrajectory();
    };

    this.shoot = function() {
        if(this.canShoot === true ) {
            this.canShoot = false;
            this.showTrajectory = false;
            this.updatePoint(3);
            var extraX = Math.cos(this.faceAngle); //temporary code so it won't destroy itself on create. It's moved a bit further on.
            var extraY = Math.sin(this.faceAngle);
            if (this.currentItem === "fastBullet"){ // Could use switches
                var returnedValues = addVelocities(this.velocityAngle, this.velocity, this.faceAngle, 16); //Adding initial velocity of rocket to bullet launch. globalTimeFactor is not a factor because it does not affect velocities
                bullets.push(new bullet(returnedValues[0], returnedValues[1], this.point3x +(extraX*6), this.point3y + (extraY*6))); //Best to do it from the rotated point of the spaceship. The main point doesn't rotate
                ///I originally didn't have this here ^ because I wanted to know who's bullet was who's, but I don't mind now. I could always send a value to this function for ID
                this.bulletWait = 8;
                //this.bulletWait = 0;   VVVVVV
                //THIS WILL SHOW
                //That when you speed up while shooting your bullets will collide with each other. That's fine, but afterwards...
            } else if (this.currentItem === "meteor"){
                var returnedValues = addVelocities(this.velocityAngle, this.velocity, this.faceAngle, 2);
                meteors.push(new meteor(returnedValues[0], returnedValues[1], this.point3x + (extraX*64) , this.point3y + (extraY*64) ));

                /*
                for(var i=0; i<players.length; i++){
                    players[i].generateTrajectory();
                }
                Meteor moves, so this is done on each run time frame.
                */
                this.currentItem = "fastBullet"; //Reset
                this.bulletWait = 8;
            } else if (this.currentItem === "slowBullet"){ //Fires at oribital speed
                var returnedValues = addVelocities(this.velocityAngle, this.velocity, this.faceAngle, 10.6);
                bullets.push(new bullet(returnedValues[0], returnedValues[1], this.point3x +(extraX*6), this.point3y + (extraY*6)));
                this.bulletWait = 15;
            }
        }
    };

    this.deleteSelf = function(otherVelocity, otherAngle, otherPosx, otherPosy) {
        var currentPlayer = players.indexOf(this);
        players.splice(currentPlayer, 1);
        console.log("Player deleted");
        if(playerDeath.timeLeft){ //If playerDeath has already started
            playerDeath.timeLeft = 20;
        }else{ //If the timer hasn't started
            playerDeath.timeLeft = 30;
            globalTimers.push(playerDeath);
        }

        for (var i=0;i<40;i++){ //Explosion in direction
            if (i%5 === 0){// 1/5 debri pieces will look like this:
                var debriColor = this.color
                var debriShadowBlur = 10;
                var debriSize = 2 + Math.random()*6;
                var debriAliveTime = 25+Math.random()*10;
                var debriVelocity = this.velocity+Math.random();
                var debriGravity = true;
            }else{
                var debriColor = "rgb(255,"+(255-i*5)+","+(255-(i*5)-100) + ")";
                var debriShadowBlur = 0;
                var debriSize = Math.random()*3;
                var debriAliveTime = 5+Math.random()*15;
                var debriVelocity = this.velocity+2;
                var debriGravity = true;
            }
            var randomAngle = (Math.random() * (2*0.25*Math.PI)) - 0.25*Math.PI;
            var debriAngle = this.velocityAngle - randomAngle + randomAngle*2;

            squareParticles.push(new squareParticle(debriColor, this.posx, this.posy, debriVelocity, debriAngle, debriAliveTime, debriSize, debriShadowBlur, debriGravity));
            //The angle in the old statement seems wrong anyway
            //squareParticles.push(new squareParticle(this.color, this.posx, this.posy, this.velocity, this.velocityAngle - randomAngle + randomAngle*2 , i, false)); //Technically it won't be even because i(0) % 2 is not even
        }
        for (var i=0;i<5;i++){ //Explosion from where hit

            if (i%5 === 0){// 1/5 debri pieces will look like this:
                var debriColor = this.color;
                var debriShadowBlur = 10;
                var debriSize = 2 + Math.random()*6;
                var debriAliveTime = 25+Math.random()*10;
                var debriVelocity = otherVelocity+Math.random();
                var debriGravity = true;
            }else{
                var debriColor = "rgb(255,"+(255-i*5)+","+(255-(i*5)-100) + ")";
                var debriShadowBlur = 0;
                var debriSize = Math.random()*3;
                var debriAliveTime = 5+Math.random()*15;
                var debriVelocity = otherVelocity;
                var debriGravity = true;
            }
            var randomAngle = (Math.random() * (2*0.10*Math.PI)) - 0.10*Math.PI;
            var debriAngle = otherAngle - randomAngle + randomAngle*2;

            squareParticles.push(new squareParticle(debriColor, otherPosx, otherPosy, debriVelocity, debriAngle, debriAliveTime, debriSize, debriShadowBlur, debriGravity));
            //squareParticles.push(new squareParticle(this.color, otherPosx, otherPosy, otherVelocity/1.5, otherAngle - randomAngle + randomAngle*2, i, true));
        }
        //At least 1 debri piece going to direction from where it was hit to fight the randomness factor
        squareParticles.push(new squareParticle(this.color, otherPosx, otherPosy, debriVelocity, otherAngle, 25+Math.random()*10, 2 + Math.random()*6, 10, true )); //Maybe 1.5 defies constant of momentum law
    };

    this.generateTrajectory = function(){ //This should wait until the end of the frame so it doesn't gen twice in one frame
        this.trajectoryParticleList = [];
        var pointerParticle = {};
        pointerParticle.posx = this.posx;
        pointerParticle.posy = this.posy;
        pointerParticle.velocityAngle = this.velocityAngle;
        pointerParticle.velocity = this.velocity;

        //cloning
        var particle = {};
        particle.posx = pointerParticle.posx;
        particle.posy = pointerParticle.posy;
        particle.velocityAngle = pointerParticle.velocityAngle;
        particle.velocity = pointerParticle.velocity;
        this.trajectoryParticleList.push(particle);

        for(var k = 0; k < globalTrajectoryPoints ; k++){ //Create list of particles
            for(var l = 0; l < globalTrajectoryDistance/globalTrajectoryPoints; l++){ //Creates distances between particles. Larger distance for less points, smaller distance for more points
                for (var i = 0; i < masses.length; i++) {
                    for (var j = 0; j < masses[i].length; j++){ //Does not need to worry about checking for self
                        calcGravity(masses[i][j], pointerParticle);
                    }
                }
                pointerParticle.posx += (pointerParticle.velocity * Math.cos(pointerParticle.velocityAngle) * globalTimeFactor); //Takes values in radians
                pointerParticle.posy += (pointerParticle.velocity * Math.sin(pointerParticle.velocityAngle) * globalTimeFactor);
            }
            //cloning
            var particle = {};
            particle.posx = pointerParticle.posx;
            particle.posy = pointerParticle.posy;
            particle.velocityAngle = pointerParticle.velocityAngle;
            particle.velocity = pointerParticle.velocity;
            this.trajectoryParticleList.push(particle);
        }
    };


    this.updateTrajectoryPath = function(){
        for(var k = 0; k < this.trajectoryParticleList.length ; k++){
            for (var i = 0; i < masses.length; i++) {
                for (var j = 0; j < masses[i].length; j++){ //Does not need to worry about checking for self
                    calcGravity(masses[i][j], this.trajectoryParticleList[k]);
                }
            }
            this.trajectoryParticleList[k].posx += (this.trajectoryParticleList[k].velocity * Math.cos(this.trajectoryParticleList[k].velocityAngle) * globalTimeFactor); //Takes values in radians
            this.trajectoryParticleList[k].posy += (this.trajectoryParticleList[k].velocity * Math.sin(this.trajectoryParticleList[k].velocityAngle) * globalTimeFactor);
            //The teleporty error creates too many bugs. It's not worth solving
        }
    }

    this.draw = function() {
        this.animationTick += 1; //Tick before drawing

        if(Math.abs(this.thrustDirection) === 1){
            for(var i = 0; i < 1; i++){
                var yellow = Math.floor(Math.random() * 150) + 105;
                var dustColor = "rgba(255," + yellow + ",100, 0.8)";
                var dustShadowBlur = 0;
                var dustSize = Math.random() * 2 + 1;
                var dustAliveTime = 2 + Math.random() * 1;
                var dustGravity = false;
                //If I didn't have returned values, if the thrust is going against the motion, it can end up going against the angle (regularly) or against the velocity of the spaceship
                if(this.thrustDirection === 1){
                    var randomAngle = (Math.random() * 0.40) - 0.20; //Check the debri function, it may be doing it wrong. This is correct.
                    var dustAngle = this.faceAngle + randomAngle - Math.PI;
                    var returnedValues = addVelocities(this.velocityAngle, this.velocity, dustAngle, 15 * this.thrustDirection);
                    var dustVelocity = returnedValues[1];
                    dustAngle = returnedValues[0];
                    squareParticles.push(new squareParticle(dustColor, this.posx, this.posy, dustVelocity, dustAngle, dustAliveTime, dustSize, dustShadowBlur, dustGravity));
                }else{
                    var randomAngle = (Math.random() * 0.10) - 0.05; //Check the debri function, it may be doing it wrong. This is correct.
                    var dustAngle = this.faceAngle + randomAngle - Math.PI;
                    var returnedValues = addVelocities(this.velocityAngle, this.velocity, dustAngle, 15 * this.thrustDirection);
                    var dustVelocity = returnedValues[1];
                    dustAngle = returnedValues[0];
                    if(frameCount % 2 == 0){
                        this.updatePoint(2);
                        squareParticles.push(new squareParticle(dustColor, this.point2x, this.point2y, dustVelocity, dustAngle, dustAliveTime, dustSize, dustShadowBlur, dustGravity));
                    }else {
                        this.updatePoint(4);
                        squareParticles.push(new squareParticle(dustColor, this.point4x, this.point4y, dustVelocity, dustAngle, dustAliveTime, dustSize, dustShadowBlur, dustGravity));
                    }

                }

            }

        }

        if (this.animationTick > this.currentAnimation.frames-1){ //Remember to reset the animationTick when any animation is changed or it will make a bad error
            //this.currentAnimation = this.currentAnimation.onEnd; //Recursion was a problem with this idea
            this.currentAnimation = normal; //When animations are done they will always reset to the default position of normal. No onEnd business
            this.animationTick = -1; //DO NOT FORGET TO RESET EVER. -1 is the state where is hasn't ever ticked
            this.animationTick += 1; //It would make more sense to make it just 0, but that -1 usually would be the reset, but in this case it needs to move on to draw the next frame
            //But it also needs to test up above at that point
        }
        four.drawFrame(this.currentAnimation, this.animationTick, this.faceAngle, this.posx, this.posy);
        //rotating points for drawing now only happens in the animation function. Rotating for other things only comes when called.

        //Draw movement trajectory path
        //This was the easiest method. I tried researching more legit ways but it go extremely complicated.

        ctxfg.lineWidth = 1;
        //ctxfg.shadowBlur = 10 * globalShadowBlur;
        ctxfg.shadowBlur = 0;
        for(var i = 0; i < this.trajectoryParticleList.length-1 ; i++){
            ctxfg.strokeStyle = "rgba("+hexToRGB(this.color)+","+(0.6*(1-(i/this.trajectoryParticleList.length)))+")";
            ctxfg.fillStyle = "rgba("+hexToRGB(this.color)+","+(0.6*(1-(i/this.trajectoryParticleList.length)))+")";
            //ctxfg.shadowColor = "rgba("+hexToRGB(this.color)+",0.2)";

            ctxfg.beginPath();
            ctxfg.moveTo(this.trajectoryParticleList[i].posx, this.trajectoryParticleList[i].posy);
            ctxfg.lineTo(this.trajectoryParticleList[i+1].posx, this.trajectoryParticleList[i+1].posy);
            ctxfg.stroke()

            ctxfg.beginPath();
            if ((i+1)%4 === 0){
                ctxfg.arc(this.trajectoryParticleList[i+1].posx, this.trajectoryParticleList[i+1].posy, 4, 0, 2 * Math.PI, false);
            }else{
                ctxfg.arc(this.trajectoryParticleList[i+1].posx, this.trajectoryParticleList[i+1].posy, 2, 0, 2 * Math.PI, false);
            }
            ctxfg.fill();

        }

        //Draw bullet trajectory path
        if(globalBulletTrajectory && this.canShoot === true && this.showTrajectory){ //CPU intensive
            this.updatePoint(3);
            var extraX = Math.cos(this.faceAngle); //temporary code so it won't destroy itself on create. It's moved a bit further on.
            var extraY = Math.sin(this.faceAngle);
            if(this.currentItem === "slowBullet"){
                var returnedValues = addVelocities(this.velocityAngle, this.velocity, this.faceAngle, 10.6); //Adding initial velocity of rocket to bullet launch. globalTimeFactor is not a factor because it does not affect velocities
            }else{
                if(this.currentItem === "fastBullet"){
                    var returnedValues = addVelocities(this.velocityAngle, this.velocity, this.faceAngle, 16);
                }else{
                    var returnedValues = addVelocities(this.velocityAngle, this.velocity, this.faceAngle, 2);
                }
            }
            var trajParticle = {};
            trajParticle.posx = this.point3x +(extraX*6);
            trajParticle.posy = this.point3y + (extraY*6);
            trajParticle.velocity = returnedValues[1];
            trajParticle.velocityAngle = returnedValues[0];

            ctxfg.strokeStyle = "rgba(255,0,0,0.3)";
            ctxfg.fillStyle = "rgba(255,0,0,0.3)";

            //ctxfg.shadowColor = "rgba(255,0,0,0.2)";
            //ctxfg.shadowBlur = 10 * globalShadowBlur;
            ctxfg.lineWidth = 1;
            ctxfg.shadowBlur = 0;
            for(var k = 0; k < globalTrajectoryPoints ; k++){ //30 vertices
                ctxfg.beginPath();
                ctxfg.moveTo(trajParticle.posx, trajParticle.posy);
                for(var l = 0; l < globalTrajectoryDistance/globalTrajectoryPoints; l++){ //15 skips
                    for (var i = 0; i < masses.length; i++) {
                        for (var j = 0; j < masses[i].length; j++){ //Does not need to worry about checking for self
                            calcGravity(masses[i][j], trajParticle);
                        }
                    }
                    trajParticle.posx += (trajParticle.velocity * Math.cos(trajParticle.velocityAngle) * globalTimeFactor); //Takes values in radians
                    trajParticle.posy += (trajParticle.velocity * Math.sin(trajParticle.velocityAngle) * globalTimeFactor);
                }
                ctxfg.lineTo(trajParticle.posx, trajParticle.posy);
                ctxfg.stroke()
                ctxfg.beginPath();
                if ((k+1)%4 === 0){
                    ctxfg.arc(trajParticle.posx, trajParticle.posy, 4, 0, 2 * Math.PI, false);
                }else{
                    ctxfg.arc(trajParticle.posx, trajParticle.posy, 2, 0, 2 * Math.PI, false);
                }
                ctxfg.fill()

            }

        }

    };

    this.updatePoint = function(point) { //On demand rotation for number of point sent

        //This system shouldn't be permanent when the animations for the player are created. Guns should probably just fire from the animation state
        switch(point) {
            case 1:
            //This should be posx, posy anyway. Already updated with movement
            case 2:
                this.point2x = this.posx-15;
                this.point2y = this.posy-10;
                var point2 = [this.point2x, this.point2y];
                rotatePoints(this.faceAngle, [point2], this.posx, this.posy);
                this.point2x = point2[0]; //This is an annoying way to do it because sending [[this.point2x, this.point2y]] instead of point2 didn't work
                this.point2y = point2[1]; //I don't want to change the function either because it's in use a lot
                break;
            case 3:
                this.point3x = this.posx+15;
                this.point3y = this.posy;
                var point3 = [this.point3x, this.point3y];
                rotatePoints(this.faceAngle, [point3], this.posx, this.posy);
                this.point3x = point3[0];
                this.point3y = point3[1];
                break;
            case 4:
                this.point4x = this.posx-15;
                this.point4y = this.posy+10;
                var point4 = [this.point4x, this.point4y];
                rotatePoints(this.faceAngle, [point4], this.posx, this.posy);
                this.point4x = point4[0];
                this.point4y = point4[1];
                break;
            default:
                console.log("Error with point sent to be updated");
        }
    };

    this.move = function() {
        this.posx += (this.velocity * Math.cos(this.velocityAngle) * globalTimeFactor); //Takes values in radians
        this.posy += (this.velocity * Math.sin(this.velocityAngle) * globalTimeFactor);
        //This is the teleporty part
        if (this.posx < 0) {
            this.posx = canvas.width;
            this.generateTrajectory();
        } else {
            if (this.posx > canvas.width) {
                this.posx = 0;
                this.generateTrajectory();
            }
        }
        if (this.posy < 0) {
            this.posy = canvas.height;
            this.generateTrajectory();
        } else {
            if (this.posy > canvas.height) {
                this.posy = 0;
                this.generateTrajectory();
            }
        }
    };

    this.face = function(x, y) {//Faces a coordinate
        this.faceAngle = Math.atan2((y - this.posy), (x - this.posx));
    };

    this.run = function() {//Objective way of running the program. It used to be more programatic
        this.bulletWait -= 1*globalTimeFactor;
        if (this.bulletWait <= 0 ){
            this.canShoot = true;
            this.showTrajectory = true;
        }
        this.move();
        for (var i = 0; i < masses.length; i++) {
            for (var j = 0; j < masses[i].length; j++){ //Does not need to worry about checking for self
                calcGravity(masses[i][j], this);
            }
        }
        this.updateTrajectoryPath();
        this.draw(); //If the object should be dead it will still draw its last frame
    };

}

function squareParticle(color, x, y, velocity, angle, aliveTime, size, shadowBlur, gravity){
    // i is the current generation number of the explosion
    this.velocityAngle = angle;
    this.color = color;
    this.velocity = velocity;
    this.aliveTime = aliveTime;
    this.size = size;
    this.shadowBlur = shadowBlur;
    this.gravity = gravity;
    this.posx = x;
    this.posy = y;
    //No collision to save cpu time
    this.deleteSelf = function(otherVelocity, otherAngle, otherPosx, otherPosy) { //Hopefully it shows an error if somehow my code parses arguments into the function
        var currentDebriSquare = squareParticles.indexOf(this);
        squareParticles.splice(currentDebriSquare, 1);
    };

    this.move = function() {
        this.posx += (this.velocity * Math.cos(this.velocityAngle) * globalTimeFactor);
        this.posy += (this.velocity * Math.sin(this.velocityAngle) * globalTimeFactor);
    };

    this.draw = function() {
        ctxfg.fillStyle = this.color;
        ctxfg.shadowColor = this.color;
        ctxfg.shadowBlur = this.shadowBlur * globalShadowBlur; //The lesser coloured squares have a shadow blur
        ctxfg.beginPath();
        //IDEA: Rotating squares?
        ctxfg.fillRect(this.posx-(this.size/2), this.posy-(this.size/2), this.size, this.size);
    };

    this.run = function(){
        this.aliveTime += -1*globalTimeFactor;
        if (this.aliveTime <= 0){
            this.deleteSelf();
        }
        this.move();
        if(this.gravity) {
            for (var i = 0; i < masses.length; i++) {
                for (var j = 0; j < masses[i].length; j++) {
                    calcGravity(masses[i][j], this);
                }
            }
        }
        this.draw();
    };
}


function planet(mass, radius, color, x, y) {
    this.mass = mass;
    this.radius = radius;
    this.color = color;
    this.posx = x;
    this.posy = y;
    this.collisionSize = radius;
    this.strength = "planet";
    this.draw = function() {
        ctxfg.beginPath();
        ctxfg.fillStyle = this.color;
        ctxfg.shadowColor = this.color;
        ctxfg.shadowBlur = 20 * globalShadowBlur;
        ctxfg.arc(this.posx, this.posy, this.radius, 0, 2 * Math.PI);
        ctxfg.fill();
    };

    this.deleteSelf = function(otherVelocity, otherAngle, otherPosx, otherPosy){
        console.log("Nothing here for planet deleteSelf()");
    }

    this.run = function() {
        this.draw();
    };
}

function spaceDustObj(angle, velocity, x, y){
    this.size = Math.random()*2+1;
    this.velocityAngle = angle;
    this.velocity = velocity;
    this.posx = x;
    this.posy = y;
    this.motionTrail = [];
    this.alpha = Math.random()*0.2+0.2;
    this.move = function() {
        this.posx += (this.velocity * Math.cos(this.velocityAngle)*globalTimeFactor);
        this.posy += (this.velocity * Math.sin(this.velocityAngle)*globalTimeFactor);
    };
    this.draw = function() {
        ctxfg.shadowBlur = 0;
        this.motionTrail.push([this.posx, this.posy]);
        for (var i = this.motionTrail.length-1; i > -1 ; i--){
            ctxfg.fillStyle = "rgba(150,255,255,"+((i+1)*this.alpha/10)+")";
            ctxfg.beginPath();
            ctxfg.fillRect(this.motionTrail[i][0]-(this.size/2), this.motionTrail[i][1]-(this.size/2), this.size, this.size);
        }
        if (this.motionTrail.length > 15){
            this.motionTrail.shift();
        }
    };

    this.run = function(){
        this.move();
        for (var i = 0; i < masses.length; i++) {
            for (var j = 0; j < masses[i].length; j++){
                calcGravity(masses[i][j], this);
            }
        }
        this.draw();
    };
}

//ITEM TYPES

function bullet(angle, velocity, x, y) {
    this.velocityAngle = angle; //bullet always faces its velocityAngle
    this.velocity = velocity;
    this.posx = x;
    this.posy = y;
    this.strength = "weak";
    this.collisionSize = 4;
    this.aliveTime = 165;
    this.color = "#FF0000"
    this.deleteSelf = function(otherVelocity, otherAngle, otherPosx, otherPosy) {
        var currentBullet = bullets.indexOf(this);
        bullets.splice(currentBullet, 1);
    };

    this.draw = function() {

        //Motion trail didn't look so good
        ctxfg.shadowBlur = 10 * globalShadowBlur;
        ctxfg.lineWidth = 4;
        ctxfg.fillstyle = this.color;
        ctxfg.shadowColor = this.color;
        ctxfg.strokeStyle = this.color;
        ctxfg.beginPath();
        var point2x = this.posx + (9 * Math.cos(this.velocityAngle));
        var point2y = this.posy + (9 * Math.sin(this.velocityAngle));
        ctxfg.moveTo(this.posx, this.posy);
        ctxfg.lineTo(point2x, point2y);
        ctxfg.stroke();
        ctxfg.lineWidth = 0.5;
        ctxfg.strokeStyle = "#000000";
        ctxfg.stroke();  //Gives it a black stripe down the centre

        //Draw trajectory
        /*
         var trajParticle = {};
         trajParticle.posx = this.posx;
         trajParticle.posy = this.posy;
         trajParticle.velocity = this.velocity;
         trajParticle.velocityAngle = this.velocityAngle;

         ctxfg.strokeStyle = "rgba("+hexToRGB(this.color)+",0.5)";
         ctxfg.fillStyle = "rgba("+hexToRGB(this.color)+",0.5)";
         ctxfg.lineWidth = 1;
         //ctxfg.shadowColor = "rgba("+hexToRGB(this.color)+",0.2)"
         //ctxfg.shadowBlur = 10 * globalShadowBlur;
         ctxfg.shadowBlur = 0;
         for(var k = 0; k < globalTrajectoryPoints ; k++){ //30 vertices
         ctxfg.beginPath();
         ctxfg.moveTo(trajParticle.posx, trajParticle.posy);
         for(var l = 0; l < 0.5*globalTrajectoryPoints; l++){ //15 skips
         for (var i = 0; i < masses.length; i++) {
         for (var j = 0; j < masses[i].length; j++){ //Does not need to worry about checking for self
         calcGravity(masses[i][j], trajParticle);
         }
         }
         trajParticle.posx += (trajParticle.velocity * Math.cos(trajParticle.velocityAngle) * globalTimeFactor); //Takes values in radians
         trajParticle.posy += (trajParticle.velocity * Math.sin(trajParticle.velocityAngle) * globalTimeFactor);
         }
         ctxfg.lineTo(trajParticle.posx, trajParticle.posy);
         ctxfg.stroke()
         ctxfg.beginPath();
         ctxfg.arc(trajParticle.posx, trajParticle.posy, 2, 0, 2 * Math.PI, false);
         ctxfg.fill()
         }
         */

    };

    this.move = function() {
        this.posx += (this.velocity * Math.cos(this.velocityAngle)*globalTimeFactor);
        this.posy += (this.velocity * Math.sin(this.velocityAngle)*globalTimeFactor);
        //The teleport from the other side thing for bullets is just too OP
        if (this.posx < 0 || this.posx > canvas.width || this.posy < 0 || this.posy > canvas.height) { //If it goes out of bounds kill it
            this.deleteSelf();
        }
    };

    this.run = function() {
        this.aliveTime += -1*globalTimeFactor;
        if (this.aliveTime <= 0){
            this.deleteSelf();
        }
        this.move();
        for (var i = 0; i < masses.length; i++) {
            for (var j = 0; j < masses[i].length; j++){
                calcGravity(masses[i][j], this);
            }
        }

        this.draw();
    };
}


function meteor(angle, velocity, x, y) {
    //this.type = type; //Whether it be one that spawns an item or just a plain boring one that is fired from the player
    //So yea, items should come in meteors
    this.velocityAngle = angle; //Velocity angle is entering minus. That's worrying.
    this.velocity = velocity;
    this.posx = x;
    this.posy = y;
    this.color = "140,100,70";
    this.strength = "strong"; //If it hits another strong it rebounds, if it hits weak it kills, if it hits kill, it dies
    this.radius = 5 + Math.random()*5;
    this.mass = 10*this.radius;
    this.previousPositions = [];
    // THIS WAS THE WORST BUG. It took me a day or two to work this out. See when I created this object using the this.shoot() func of the player
    //It would get rid of both players. It took me a while to work out that it was not killing the player because of the shoot method, or physics collision stuff being crazy, or the meteor
    //deleting the players. No, the players and the bullets weren't deleting with their special delete funcs. I worked out that it was somewhere when it calculated gravity, but I spent most of my time trying to figure out
    //in that spot without actually going why the gravity function wasn't working. I figured it would throw an error if it was missing something. That was what was putting me off, no error.
    //So I realised I forgot to put the mass in for the mass object but I really have no idea why it didn't have a cry when it couldn't find meteor.mass and it would just delete the players
    //and bullets
    //I diagnosed by disabling things mostly

    //Things like this put me off:
    //Well that's weird. Apparently, masses[0][0] === sun (true). I type in masses[0][0] it returns sun. I type in  masses[1][0] and it returns meteor.
    //I try masses[1][0] === meteor and it RETURNS FALSE!! Both sun and meteor were created with constructors
    // even meteors[0] === meteor (false)
    //EDIT: Probably because sun is called sun. This is just a new - Maybe?

    this.collisionSize = this.radius;

    this.deleteSelf = function(otherVelocity, otherAngle, otherPosx, otherPosy) {
        var currentMeteor = meteors.indexOf(this);
        meteors.splice(currentMeteor, 1);
        for(var i=0; i<players.length; i++){
            players[i].generateTrajectory();
        }
        globalGravityDynamic = false; //If it should remain true, another meteor will reset it. Only skipping one frame is no big deal
    };

    this.draw = function() {

        ctxfg.shadowColor = "rgb(" + this.color +")";
        ctxfg.shadowBlur = 10 * globalShadowBlur;
        //Goes in reverse order: the current position at the end of the array
        ctxfg.fillStyle = "rgb(" + this.color +")";
        ctxfg.beginPath();
        ctxfg.arc(this.posx, this.posy, this.radius, 0, 2 * Math.PI);
        ctxfg.fill();

        if(frameCount % 5 === 0) {
            this.previousPositions.push([this.posx, this.posy]);
            if (this.previousPositions.length > 30) {
                this.previousPositions.shift();
            }
        }
        for(var i = 0; i < this.previousPositions.length; i++) {
            ctxfg.fillStyle = "rgba(" + this.color + "," + (1 / (this.previousPositions.length - 1)) * i + ")";
            ctxfg.beginPath();
            ctxfg.arc(this.previousPositions[i][0], this.previousPositions[i][1], this.radius*(i / (this.previousPositions.length - 1)), 0, 2 * Math.PI);
            ctxfg.fill();
        }
    };

    this.move = function() {
        this.posx += (this.velocity * Math.cos(this.velocityAngle)*globalTimeFactor);
        this.posy += (this.velocity * Math.sin(this.velocityAngle)*globalTimeFactor);
        var padding = canvas.width*0.1; //Necessary so the gravity trajectory doesn't rappidly snap as meteor goes away
        if (this.posx < -padding || this.posx > canvas.width +padding || this.posy < - padding|| this.posy > canvas.height + padding) { //If it goes out of bounds kill it
            this.deleteSelf();
        }
    };

    this.run = function() {
        this.move();
        for (var i = 0; i < masses.length; i++) {
            for (var j = 0; j < masses[i].length; j++){
                if (masses[i][j] != this){ //Makes sure it doesn't add gravity with itself
                    calcGravity(masses[i][j], this);
                }
            }
        }
        globalGravityDynamic = true;
        this.draw();
    };
}

function itemBox(angle, velocity, x, y){};

function sunTriangle(originalAngle, ID){
    this.ID = ID; //0 or 1
    this.angle = 0;
    this.originalAngle = originalAngle;
    this.phase = 2*Math.PI*Math.random();
    if (ID === 0){
        this.color = "#FF2200"; //MAKE INTO RGBA
        this.direction = 1;
    }else{
        this.color = "#FF9900";
        this.direction = -1;
    }
    //Objects are created facing right
    this.draw = function() { //This is called on demand by the sun
        this.angle += 0.005*this.direction*globalTimeFactor;
        this.drawAngle = this.angle + this.originalAngle + Math.abs((1/17*(Math.sin(((frameCount/20)*globalTimeFactor)+this.phase))));
        //I'm guessing that amplitude has to be constant so it can fallback to its original position.
        //Random phase is fine because it will go back
        //It should be DC so it doesn't counter act the normal angle increace. DC. Wut?
        ctxfg.shadowBlur = 0;
        ctxfg.fillStyle = this.color;
        this.point1 = rotatePoint(this.drawAngle, sun.posx+sun.radius, sun.posy-10, sun.posx, sun.posy); //This is rotated fully from start position each frame
        this.point3 = rotatePoint(this.drawAngle, sun.posx+sun.radius+25, sun.posy, sun.posx, sun.posy);
        this.point2 = rotatePoint(this.drawAngle, sun.posx+sun.radius, sun.posy+10, sun.posx, sun.posy);
        ctxfg.beginPath();
        ctxfg.moveTo(this.point1[0], this.point1[1]);
        ctxfg.lineTo(this.point2[0], this.point2[1]);
        ctxfg.lineTo(this.point3[0], this.point3[1]);
        ctxfg.closePath();
        ctxfg.fill();
    };
}

function activeStar(){
    this.posx = Math.random()*canvas.width;
    this.posy = Math.random()*canvas.height;
    this.size = 2+Math.random()*2;
    this.draw = function() {
        var r = 200 + Math.floor(Math.random()*55);
        var g = 150 + Math.floor(Math.random()*105);
        var b = 125 + Math.floor(Math.random()*130);
        ctxfg.fillStyle = "rgb("+ r + ","+ g + ","+ b + ")";
        ctxfg.shadowColor = "rgb("+ r + ","+ g + ","+ b + ")";
        ctxfg.shadowBlur = 20 * globalShadowBlur;
        this.flicker = Math.random()/2;
        ctxfg.fillRect(this.posx-this.size-this.flicker, this.posy-this.size-this.flicker, this.size+this.flicker*2, this.size+this.flicker*2);  //Size as a result is twice as large. EDIT: I just changed the - to a +
    },
        this.run = function() {
            this.draw();
        }
};

//////////////////////////////////////////////////////////////////////////////////////////// Single Objects
////////////////////////////////////////////////////////////////////////////////////////////

//It just feels more appropriate to use object literal notation rather than a constructor for just a single object
sun = {
    mass : 800,
    radius : 80,
    color : "#FFFF33",
    strength : "sun",
    triangleAmount : 32,
    //trianges : [], Is already created on game run
    deleteSelf : function(otherVelocity, otherAngle, otherPosx, otherPosy){
        console.log("sun: deleteSelf shouldn't have been called");
    }
};
//This part does sort of remove the advantages of object literal notation
sun.radiansPerTriangle = 2*Math.PI/sun.triangleAmount;
sun.collisionSize = sun.radius+28;
sun.draw = function() {
    //I want the sun part under so the blur doesn't go over the spikes... or maybe I should want it over the top?
    ///////////SUN
    ctxfg.beginPath();
    ctxfg.fillStyle = sun.color;
    ctxfg.shadowColor = "#FF5500";
    ctxfg.shadowBlur = 40;
    ctxfg.arc(sun.posx, sun.posy, sun.radius, 0, 2 * Math.PI);
    ctxfg.fill()
    ///////////TRIANGLES
    for (var i=0;i<sun.triangleAmount;i++){
        sun.triangles[i].draw();
    }

};
sun.run = function() {
    sun.draw();
};