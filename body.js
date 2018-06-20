window.onload = function () {
    function isTouchDevice() {
        return 'ontouchstart' in window;
    }

    tablet = isTouchDevice();
    //tablet = true;
    if(!tablet){
        var settingsBlock = document.getElementById("settings-block");
        if(settingsBlock){
            settingsBlock.style.display = "block";
        }
    }

    LPS = document.getElementById("fps");

    canvas = document.getElementById("canvasfg");
    canvas2 = document.getElementById("canvasbg");
    canvas3 = document.getElementById("canvasol");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;
    canvas3.width = window.innerWidth;
    canvas3.height = window.innerHeight;

    var inactiveButtonColor = "rgba(255,255,255,0.03)";
    var activeButtonColor = "rgba(255,255,255,0.05)";

    if (tablet) {
        var p1LeftButton = document.getElementById("p1-left-button");
        var p1LeftButtonBackground = document.getElementById("p1-left-button-background");
        var p1RightButton = document.getElementById("p1-right-button");
        var p1RightButtonBackground = document.getElementById("p1-right-button-background");
        var p2LeftButton = document.getElementById("p2-left-button");
        var p2LeftButtonBackground = document.getElementById("p2-left-button-background");
        var p2RightButton = document.getElementById("p2-right-button");
        var p2RightButtonBackground = document.getElementById("p2-right-button-background");

        var p1MiddleButton = document.getElementById("p1-middle-button");
        var p2MiddleButton = document.getElementById("p2-middle-button");

        var p1DownButton = document.getElementById("p1-down-button");
        var p1DownButtonBackground = document.getElementById("p1-down-button-background");
        var p1UpButton = document.getElementById("p1-up-button");
        var p1UpButtonBackground = document.getElementById("p1-up-button-background");
        var p2DownButton = document.getElementById("p2-down-button");
        var p2DownButtonBackground = document.getElementById("p2-down-button-background");
        var p2UpButton = document.getElementById("p2-up-button");
        var p2UpButtonBackground = document.getElementById("p2-up-button-background");

        var buttonHeight = 125;
        var buttonWidth = 160;

        var smallButtonParts = document.getElementsByClassName("small-button-parts");
        for(var i = 0; i < smallButtonParts.length; i++){
            smallButtonParts[i].style.height = buttonHeight + "px";
            smallButtonParts[i].style.width = buttonWidth + "px";
        }

        var paddingHeight = canvas.height / 40;
        var topRowTop = paddingHeight;
        var bottomRowTop = (canvas.height - buttonHeight - paddingHeight);


        p1MiddleButton.style.height = buttonHeight + 8 + buttonHeight + "px";
        p1MiddleButton.style.width = canvas.width + "px";

        p2MiddleButton.style.height = buttonHeight + 8 + buttonHeight + "px";
        p2MiddleButton.style.width = canvas.width + "px";


        p1LeftButton.style.top = topRowTop + "px";
        p1LeftButtonBackground.style.top = topRowTop + "px";
        p1LeftButton.style.right = 0 + "px";
        p1LeftButtonBackground.style.right = 0 + "px";

        p1RightButton.style.top = topRowTop + "px";
        p1RightButtonBackground.style.top = topRowTop + "px";
        p1RightButton.style.right = buttonWidth + 4 + "px";
        p1RightButtonBackground.style.right = buttonWidth + 4 + "px";


        p2LeftButton.style.top = bottomRowTop + "px";
        p2LeftButtonBackground.style.top = bottomRowTop + "px";

        p2RightButton.style.top = bottomRowTop + "px";
        p2RightButtonBackground.style.top = bottomRowTop + "px";
        p2RightButton.style.left = buttonWidth + 4 + "px";
        p2RightButtonBackground.style.left = buttonWidth + 4 + "px";

        p1DownButton.style.top = topRowTop + "px";
        p1DownButtonBackground.style.top = topRowTop + "px";

        p1UpButton.style.top = topRowTop + buttonHeight + paddingHeight/4 + "px";
        p1UpButtonBackground.style.top = topRowTop + buttonHeight + paddingHeight/4 + "px";

        p2DownButton.style.top = bottomRowTop + "px";
        p2DownButtonBackground.style.top = bottomRowTop + "px";

        p2UpButton.style.top = bottomRowTop - buttonHeight - paddingHeight/4 + "px";
        p2UpButtonBackground.style.top = bottomRowTop - buttonHeight - paddingHeight/4 + "px";

        p1MiddleButton.style.top = p1DownButton.style.top;
        p2MiddleButton.style.top = p2UpButton.style.top;

        p1DownButton.style.left = 0;
        p1DownButtonBackground.style.left = 0;
        p1UpButton.style.left = 0;
        p1UpButtonBackground.style.left = 0;

        p2DownButton.style.right = 0;
        p2DownButtonBackground.style.right = 0;
        p2UpButton.style.right = 0;
        p2UpButtonBackground.style.right = 0;


        p1MiddleButton.addEventListener("touchstart", function () {
            Keys.forceKeyDown(75);
            p1MiddleButton.style.backgroundColor = activeButtonColor;
        }, false);
        p1MiddleButton.addEventListener("touchend", function () {
            Keys.forceKeyUp(75);
            p1MiddleButton.style.backgroundColor = inactiveButtonColor;
        }, false);

        p2MiddleButton.addEventListener("touchstart", function () {
            Keys.forceKeyDown(67);
            p2MiddleButton.style.backgroundColor = activeButtonColor;
        }, false);
        p2MiddleButton.addEventListener("touchend", function () {
            Keys.forceKeyUp(67);
            p2MiddleButton.style.backgroundColor = inactiveButtonColor;
        }, false);

        p1LeftButton.addEventListener("touchstart", function () {
            Keys.forceKeyDown(37);
            p1LeftButton.style.backgroundColor = activeButtonColor;
        }, false);
        p1LeftButton.addEventListener("touchend", function () {
            Keys.forceKeyUp(37);
            p1LeftButton.style.backgroundColor = inactiveButtonColor;
        }, false);

        p1RightButton.addEventListener("touchstart", function () {
            Keys.forceKeyDown(39);
            p1RightButton.style.backgroundColor = activeButtonColor;
        }, false);
        p1RightButton.addEventListener("touchend", function () {
            Keys.forceKeyUp(39);
            p1RightButton.style.backgroundColor = inactiveButtonColor;
        }, false);

        p2LeftButton.addEventListener("touchstart", function () {
            Keys.forceKeyDown(65);
            p2LeftButton.style.backgroundColor = activeButtonColor;
        }, false);
        p2LeftButton.addEventListener("touchend", function () {
            Keys.forceKeyUp(65);
            p2LeftButton.style.backgroundColor = inactiveButtonColor;
        }, false);

        p2RightButton.addEventListener("touchstart", function () {
            Keys.forceKeyDown(68);
            p2RightButton.style.backgroundColor = activeButtonColor;
        }, false);
        p2RightButton.addEventListener("touchend", function () {
            Keys.forceKeyUp(68);
            p2RightButton.style.backgroundColor = inactiveButtonColor;
        }, false);


        p1DownButton.addEventListener("touchstart", function () {
            Keys.forceKeyDown(40);
            p1DownButton.style.backgroundColor = activeButtonColor;
        }, false);
        p1DownButton.addEventListener("touchend", function () {
            Keys.forceKeyUp(40);
            p1DownButton.style.backgroundColor = inactiveButtonColor;
        }, false);

        p1UpButton.addEventListener("touchstart", function () {
            Keys.forceKeyDown(38);
            p1UpButton.style.backgroundColor = activeButtonColor;
        }, false);
        p1UpButton.addEventListener("touchend", function () {
            Keys.forceKeyUp(38);
            p1UpButton.style.backgroundColor = inactiveButtonColor;
        }, false);

        p2DownButton.addEventListener("touchstart", function () {
            Keys.forceKeyDown(83);
            p2DownButton.style.backgroundColor = activeButtonColor;
        }, false);
        p2DownButton.addEventListener("touchend", function () {
            Keys.forceKeyUp(83);
            p2DownButton.style.backgroundColor = inactiveButtonColor;
        }, false);

        p2UpButton.addEventListener("touchstart", function () {
            Keys.forceKeyDown(87);
            p2UpButton.style.backgroundColor = activeButtonColor;
        }, false);
        p2UpButton.addEventListener("touchend", function () {
            Keys.forceKeyUp(87);
            p2UpButton.style.backgroundColor = inactiveButtonColor;
        }, false);

        var touchObjects = document.getElementsByClassName("touch");
        for(var i = 0; i < touchObjects.length; i++){
            touchObjects[i].removeAttribute("hidden");
        }

        var touchButtons = document.getElementsByClassName("touch-button");
        for(var i = 0; i < touchButtons.length; i++){
            touchButtons[i].style.backgroundColor = inactiveButtonColor;
        }

        var catcher = function (evt) {
            if (evt.touches.length < 2)
                evt.preventDefault();
        };

        document.body.addEventListener('touchstart', catcher, true);

    }


    canvas3.focused = false;
    game_active = false;
//There must be a tab index


    animFrame = window.requestAnimationFrame;
    recursiveAnim = function () {
        if (game_active) {
            runGame();
            animFrame(recursiveAnim);
        }
    };


    canvas3.onfocus = function () {
        if (!game_active) {
            setTimeout(function () { //Anonymous function isn't called often
                animFrame(recursiveAnim);
                canvas3.focused = true;
                game_active = true;
                console.log("focus")
            }, 50); //This delay stops a bug where when there isn't a big enough gap of time between blurring and focusing it has the recursiveAnim running more than once
        }
    };
    canvas3.onblur = function () {
        if(!tablet) { //Otherwise buttons won't work
            game_active = false;
            canvas3.focused = false;
            console.log("blur");
        }
    };

    ctxfg = canvas.getContext("2d");
    ctxbg = canvas2.getContext("2d");
    ctxol = canvas3.getContext("2d");
    canvas3.addEventListener('click', onCanvasClick, false);
    document.addEventListener('keyup', function (event) {
        Keys.onKeyup(event);
    }, false);
    document.addEventListener('keydown', function (event) {
        Keys.onKeydown(event);
    }, false);


    globalTimeFactor = 0.18;

    //varTable = document.getElementById("varTable");

    keysDownText = document.createTextNode("Keys that are down go here");
    document.body.appendChild(keysDownText);

    globalShadowBlur = 0;

    if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1){ //If Chrome
        globalShadowBlur = 1;
    }else{
        globalShadowBlur = 0;
    }

    globalMotionBlur = false;
    globalTrajectoryPoints = 43;
    globalTrajectoryDistance = 3500 * globalTimeFactor; //Just seems to look better relative to time
    globalBulletTrajectory = true;
    //globalMotionTrajectory = 1; Not actually used?
    motionBlurSlider.value = 0.6;
    toggleSun.state = true; //This is a value of the function that handles toggling the sun
    gravitySlider.value = 6.673; //This is a value of the function that handles the gravity slider. After restarting, I'm unsure how to change the slider to look like this value
    globalGravity = 1;
    playerWins = []; //Corresponding index to players. Players are reset, but their wins should not be

    initGame = function () {
        canvas3.blur(); //pause
        frameCount = 0;

        playerDeath.timeLeft = 0;
        globalTimers = [];

        //If already existing, things should be overwriting

        ctxfg.clearRect(0, 0, canvas.width, canvas.height); //Clear all stars and other images
        ctxbg.clearRect(0, 0, canvas.width, canvas.height);

        ctxbg.fillStyle = "#050505";
        ctxbg.fillRect(0, 0, canvas.width, canvas.height);

        //SET UP ACTIVE STARS
        activeStars = [];
        var activeStarAmount = Math.floor(canvas.width * canvas.height / 20222)
        console.log("Active star amount: " + activeStarAmount);
        for (var i = 0; i < activeStarAmount; i++) {
            activeStars.push(new activeStar()); //I used to make the stars a single object and just draw squares from a long array. The array also had size, it was a bit like an associative array
        }

        //SET UP BACKGROUND STARS
        var backgroundMiniStarsAmount = Math.floor(canvas.width * canvas.height / 30)
        for (var i = 0; i < backgroundMiniStarsAmount; i++) {
            var posx = Math.random() * canvas.width;
            var posy = Math.random() * canvas.height;
            var size = Math.random() * 2;
            var brightness = (Math.random() / 1.8) - 0.45;
            ctxbg.shadowBlur = 0;
            //ctx.shadowColor = "rgba(255,255,255,"+brightness+")";
            ctxbg.fillStyle = "rgba(255,255,255," + brightness + ")";
            ctxbg.fillRect(posx - size, posy - size, size, size); //It's pretty much 4 times the size.
        }

        //SET UP MORE BACKGROUND STARS
        var backgroundStarAmount = Math.floor(canvas.width * canvas.height / 1555)
        console.log("Background star amount: " + backgroundStarAmount);
        for (var i = 0; i < backgroundStarAmount; i++) {
            var posx = Math.random() * canvas.width;
            var posy = Math.random() * canvas.height;
            var size = Math.random() * 2;
            var brightness = Math.random() - 0.2;
            ctxbg.fillStyle = "rgba(255,255,255," + brightness + ")";
            ctxbg.shadowBlur = 0;
            ctxbg.fillRect(posx - size, posy - size, size, size); //It's pretty much 4 times the size.
        }

        //SET UP SUN. Not many features of the sun need change when the game starts/restarts
        sun.posx = canvas.width / 2; //These only would need to change if the canvas is resized and then the game is restarted. It also helps to refer to canvas.width/height after the canvas has been created
        sun.posy = canvas.height / 2;
        //Because the position of the sun might have changed, so do the triangles need to adjust
        var counter = 0;
        sun.triangles = [];
        for (var i = 0; i < 2 * Math.PI; i += sun.radiansPerTriangle) {
            //Trying to make them on separate layers but add them one after the other
            sun.triangles[counter] = new sunTriangle(i, 1); //i is the amount to rotate in radians
            i += sun.radiansPerTriangle;
            sun.triangles[counter + (sun.triangleAmount / 2)] = new sunTriangle(i, 0);
            counter += 1;
        }

        //OLD USEFUL CODE
        //sun.triangles2 = sun.triangles1.slice(0); //this does not work with multi-dimensional arrays. Multi-dimensional areas don't copy so nicely. sun bug took a long time to fix
        //sun.triangles2 = sun.triangles1.clone();

        p1 = new player(1, "#9999FF", (canvas.width / 2) + 190, canvas.height / 2, 1.5 * Math.PI, 5.300645442327109); //Blue
        p2 = new player(0, "#99FF99", (canvas.width / 2) - 190, canvas.height / 2, 0.5 * Math.PI, 5.300645442327109); //Greeny Blue
        players = [p2, p1]; //Active players
        planets = [sun];
        bullets = [];
        squareParticles = [];
        spaceDust = [];
        meteors = [];
        masses = [planets, meteors];
        active = [activeStars, spaceDust, players, bullets, meteors, squareParticles, planets]; //This is the order of what is moved and drawn first to last. This array holds just references so it doesn't need to be rebuilt each frame

        collidables = [bullets, planets, meteors, players]; //List of those that have collidable properties

        for (var i = 0; i < 0; i++) { //Generate the spaceDust here so it can append to spaceDust list
            //STEPS:
            //1. Get random integer to be called radius
            var pointDistance = Math.random() * 150 + sun.radius + 150;
            //2. Get a random number to be the angle
            var pointAngleFromSun = Math.random() * 2 * Math.PI;
            //3. Break down radius/hypotenuse and angle into X and Y
            var pointx = sun.posx;
            var pointy = sun.posy;
            //The aim is to make it around the sun in a circle and not a square
            pointx += (pointDistance * Math.cos(pointAngleFromSun));
            pointy += (pointDistance * Math.sin(pointAngleFromSun));
            //6. Find direction headed and choose direction (clockwise or anti-clockwise)
            if (Math.random() < 0.5) {
                var direction = -1; //Anti-clockwise
            } else {
                var direction = 1; //Clockwise
            }
            var pointVelocityAngle = pointAngleFromSun += direction * 0.5 * Math.PI;
            //7. Find orbital velocity
            var orbitalVelocity = Math.sqrt(((Math.random() * 0.5 + 1) * gravitySlider.value * sun.mass) / (pointDistance));
            //8. Push it to the spaceDust list
            spaceDust.push(new spaceDustObj(pointVelocityAngle, orbitalVelocity, pointx, pointy));
            //Had a maths error here: (2 * 3 / 9 * 8) =/= (2 * 3) / (9 * 8)
        }

        //ctxfg.globalAlpha = 0.1; is pretty fun
        ctxfg.fillStyle = "#FF0000";
        ctxfg.strokeStyle = "#FF0000";
        //globalNegativeColor = 0; //Sounds like a fun idea for an item

        for (var i = 0; i < players.length; i++) {
            players[i].generateTrajectory();
        }

        updateHud(0);

        canvas3.focus();


        //It will always slow when something is added (to some degree according to computer speed). How much is according to PC speed. :( ACTUALLY I AM THINKING THAT I SHOULD DISAGREE WITH THIS. The motion blur doesn't slow it down at all, it just means it can't go faster
        //My guess is that the set interval thing doesn't worry about when things actually get done and if they took too long they would just overlap. It's odd that the game is actually able to run itself
        //More than once without an error
    };
    initGame();
};

function runGame() {

    //updateTable();
    //keysDownText.data = Keys.down;
    frameCount += 1;
    //Motion Blur really isn't worth it unless
    if (globalMotionBlur) {
        var sliderVal = motionBlurSlider.value * 255; //Calling this in the for loop was very intensive
        var savedFrameImageData = ctxfg.getImageData(0, 0, canvas.width, canvas.height); //getImageData is so intensive!
        for (var i = 0, n = savedFrameImageData.data.length; i < n; i += 4) {
            var alpha = savedFrameImageData.data[i + 3];
            //if (alpha > 254){
            //savedFrameImageData.data[i + 3] -= 50;
            //}else{
            //savedFrameImageData.data[i + 3] -= 0.5*Math.pow(alpha, 1.3);
            //}
            savedFrameImageData.data[i + 3] = alpha - sliderVal;
        }
        ctxfg.putImageData(savedFrameImageData, 0, 0);
    } else {
        ctxfg.clearRect(0, 0, canvas.width, canvas.height);
    }

    //My plan is to save the state of the canvas where... No, it will remove the blackness and old pictures

    //ctxfg.fillStyle = "rgba(255,0,0,"+motionBlurSlider.value+")";
    //Sets the canvas to draw partially black squares over what's there. Remember, the canvas is a static image.

    //The old blurring system made by Joe used to just make every frame replaced by a semi-transparent black fill. This would make it look like objects were fading. That stopped working when I wanted to
    //Created a star background. I couldn't use two canvases because the black would block it anyway. So I decided to make and draw the stars on load and then take a snapshot of the canvas. I would then
    //Use that snapshot to put on top of the black and under the normal objects each frame. The problem was the the stars would clear the everything under it, including the semi black images of motion blur
    //I then realised the solution that would look the best would be to make 2 different canvases and have the top canvas take an image of itself at the end of each step/frame. This would allow things
    //Passing in front of stars to keep their motion blur


    collidablesToCheck = []; //This needs to be here so it can be rebuilt for each frame and as objects are added and removed
    for (var i = 0; i < collidables.length; i++) { //collidables list will update as the lists inside it get changed and things are removed from them
        for (var j = 0; j < collidables[i].length; j++) {
            collidablesToCheck.push(collidables[i][j]); //It can't be created and checked at the same time
        }
    }
    //Check collision should not be done in the object like it was before. I had some collision errors and it made sense that there could
    //have been a problem with moving and checking collisions all being done out of order for each object
    for (var i = 0; i < collidables.length; i++) {
        for (var j = 0; j < collidables[i].length; j++) {
            checkCollision(collidables[i][j]);
        }
    }

    checkControls();


    for (var i = 0; i < active.length; i++) {
        for (var j = 0; j < active[i].length; j++) {
            active[i][j].run();
        }
    }

    if(globalGravityDynamic){ //Trajectory needs to be generated each trail
        for(var i=0; i<players.length; i++){ //Super wasteful, because it could end up done multiple times each frame
            players[i].generateTrajectory();
        }
    }

    for (var i = 0; i < globalTimers.length; i++) { //This is at the bottom so the game restarts once this code has executed, not in the middle
        globalTimers[i]();
    }
}
window.setInterval(updateLPS, 1000);


//CURRENT FEATURES OF THE GAME
//Can move a coordinate just with a velocity and an angle
//Can face a coordinate given by the mouse. Also finding those coordinates deserves an honourable mention
//Responds to keyboard input
//Uses constructors, meaning that multiple objects can be made with a sort of template. Player and mass list - No individual referencing
//Draws with squares, circles and paths
//Has a cool path which points in the direction it's facing
//Adds up velocities with vectors!
//Multiplayer
//Gravity and a slider for it
//Bullets
//Acceleration and deacceleration
//FOCUS and PAUSE
//Teleport on edge
//Motion blur
//Bullets with initial velocity
//Meteors
//Rotation of points
//Cool looking sun with triangles that move randomly along a trig curve
//Flickering stars
//Animation "engine"
//Collisions
//Explosions
//Render Glows
//SpaceDust
//Variable time
//Trajectory paths
//Score system


//GUN TYPES: Meteor gun, rocket launcher, lazer (common), Burst fire gun, repel gun, Robot AI gun OR A GIANT SPACE SNAKE, Rappid fire, black hole fun

//Destroying meteors should bring in items

//WEAPON/Item pickup will create a white flash like it does in SSBB

//Graphical style: I'm calling it flat pixel glow.

//SOON: ROCKET DAMAGE (stuff breaks and it goes out of control)
//SOON: Different game mode styles - I could just have a different list of things set up in the room for each selection.
//SOON/MAYBE: Scalable window size - Could be way too problematic
//SOON: Items?
//SOON: Multiple planets as a diff game mode
//SOON: Sound and music. Music can be streamed from hard drive or the internet, but I will not hold the file and distribute it
//WOAH: Imagine network play using html5 ports
//SOON: Render glows
//SOON: Bullet time

//Imagine having a co-op where you would fight off hordes together while flying round planets. Could use the space snake.

//The items should have small gravity and little things flying round it to go with the whole gravity idea
//They should orbit slowing INTO the sun so there is a time limit of how long it will last for.

//Some random space junk
//Ben thinks the game should be really short
//I'm thinking I'll let it flow how I originally decided
//The lifespan of someone is too short to have items atm
//I was thinking maybe having a quick arc shield you could put out that recharges
//Also maybe have a super shield that will make you become ethereal and pass through the sun to increase life span. I'd prefer those who die to die, but those who can quickly save themselves to survive
//If I was going to have really short rounds Ben thinks just 1 meteor a turn
//Maybe I could just have 3 lives and show hearts in the top corner. They would beat like a cute game. Squarey shape, not pixely shape. I'm not sure about lives. ^^
//Although I'm pretty sick of 'lives' and 'health' - use innovation about winning and other fluffy words
//Use animation states to show what people are holding
//The heart in the corners can have an animation of growing/shrinking. Yea. If they exist though.

//An item which marks colours on the tracjectory paths. When colours are the same it will show that they intercept


//CURRENT PROBLEMS/INEFFICIENCIES/BUGS
//Variables such as this.color are named as a separate variable for each of the objects constructed. Most of the time they don't need to be
//Functions also have this problem - should use prototype
//Some functions are created each time they are run
//Bad nested functions
//FIXED! Focus and unfocus not working properly and probably should be removed
//FIXED! The trajectory path shouldn't be created each frame, just when the player changes direction/has a new force applied. It could even just create the path once the player has stopped changing. This would be much more efficient!
//Trajectories aren't always right. Add a lot of planets and sometimes the spaceships go out of sync with their trajectories. Interestingly, the trajectories do not go out of sync with themselves - a cheap patch is to have a out of sync check with the first point
//I really should make bullet projections the same length as bullet lifetime

//I was thinking of making a gameState variable to hold all of the lists and objects created on init but it would have these negative effects:
//Slower creating variables
//A lot to change
//Harder to discern variables
//Some variables like sun would be created in two parts

