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
					ctx.beginPath();
					ctx.moveTo(newPoints[0][0], newPoints[0][1]);
					for(var j=1; j<newPoints.length; j++){
							ctx.lineTo(newPoints[j][0], newPoints[j][1]); //pivotx and pivoty put the shape relative to the position
					}
					ctx.closePath();
					
					
					if (part.fill === true){
						ctx.shadowBlur = part.shadowBlur;
						ctx.shadowColor = part.blurColor;
						ctx.fillStyle = part.fillStyle;
						ctx.shadowBlur = part.shadowBlur * globalShadowBlur;
						ctx.shadowColor = part.shadowColor;
						ctx.fill();
						
					}
					
					if (part.stroke === true){
						ctx.strokeStyle = part.strokeStyle;
						ctx.lineWidth = part.lineWidth;
						ctx.stroke();
					}

				}
			}
			
		};

		//Now because drawFrame won't know what the time/frame is for a particular object, as it would need to hold data for object requestion animation, the object must keep up with its own frames


		//To set an object up for this you must give the object a few arrays of different animations to send to the function from the obj.
		//The animations/animationParts have objects that need to be rendered inside. The objects to be rendered contain properties of stroke colour, fill colour, etc. The parts also contains the frames.
		//Which frame is dependent on the frame number sent to the function.
