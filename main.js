function init() {
	width = window.innerWidth || document.documentElement.clientWidth / 1 || document.body.clientWidth 
    height = window.innerHeight || document.documentElement.clientHeight / 1 || document.body.clientHeight / 1;
    row = Math.floor(Math.sqrt(9));
	dim = Math.min(0.5*width,0.8*height);
	siz = Math.max(1,(dim / row));
	marg = siz*0.1;
	siz -= marg;
	border = marg/2;//(dim+marg*2-(siz+marg)*row-marg)/2;

	var left = (width-siz/2-dim)/2;
	var top = (height-dim)/1.5;
    gameCanvas = document.getElementById("Sieve");
	gameCanvas2 = document.getElementById("Numbers");
	gameCanvasEffects = document.getElementById("Effects");
	gameCanvas3Selection = document.getElementById("Selection");
	document.getElementById("top").style.fontSize = dim*0.1+"px";
	document.getElementById("doingWhat").style.fontSize = dim*0.08+"px";
	document.getElementById("doingWhat").style.width = left-marg-20+"px";
	document.getElementById("doingWhat").style.left = 20+"px";
	document.getElementById("doingWhat").style.padding = marg+"px";
	document.getElementById("doingWhat").style.top = top+"px";
	let tempArr = document.getElementsByClassName("but");
	for (key in tempArr) {
		if (tempArr[key].id != undefined) {
			try {		
			//tempArr[key].style.left = 123+"px";
			tempArr[key].style.width = width-left-dim-2*marg-80+"px";
			} catch(e) {
				console.log("fuckoff");
			}
		}
	}
	document.getElementById("buttons").style.top = top+2*marg+top*1.8+"px";
	document.getElementById("buttons").style.width = width-left-dim-2*marg-20+"px";
	//document.getElementById("buttons").style.padding = marg+"px";
	document.getElementById("buttons").style.left = left+dim+2*marg+"px";
	if (firstPlay) {

		gameCanvasBG = document.getElementById("BG");
		gameCanvasBG.width=width;
		gameCanvasBG.height=height;
		gameCanvasBG.style.left=0+"px";
		gameCanvasBG.style.top=0+"px";
	}

	document.getElementById("primeNumbers").style.width = width-left-dim-4*marg-20+"px";
	document.getElementById("primeNumbers").style.height = top*1.8+"px";
	document.getElementById("primeNumbers").style.padding = marg+"px";
	document.getElementById("primeNumbers").style.top = top+"px";
	document.getElementById("primeNumbers").style.left = left+dim+2*marg+"px";

	document.getElementById("canvases").style.top = top+"px";
	document.getElementById("canvases").style.width = dim+marg+"px";
	document.getElementById("canvases").style.height = dim+marg+"px";
	document.getElementById("canvases").style.left = left+marg+"px";

	document.getElementById("canvasesInner").style.top = 0+"px";
	document.getElementById("canvasesInner").style.width = dim+marg+getScrollbarWidth()+"px";
	document.getElementById("canvasesInner").style.height = dim+marg+getScrollbarWidth()+"px";
	document.getElementById("canvasesInner").style.left = 0+"px";


	ctx = gameCanvas.getContext("2d");
	ctx2 = gameCanvas2.getContext("2d");
	ctx3Selection = gameCanvas3Selection.getContext("2d");
	ctxBG = gameCanvasBG.getContext("2d");
	ctxEffects = gameCanvasEffects.getContext("2d");



	start(9);
}
function start(n) {
	
	arr=[];
	boolArr=[];
	lastPrime=1;
	curPrime=1;
	curSearch=0;
	lastSearch=0;
	currentN = n;
	curDelete=0;
	steps = 1;
	done=false;
	if (auto2) {
		//doesnt work. curPrime is bound to index.
		for (var i = 1; i < n+1; i+=2) {
			//if (i%2!=0) {
				arr.push(i);

				boolArr.push(true);
			//	if (auto2) {
			//		if ((i)%2===1) {
			//			boolArr[i]=false;
			//		}
			//	}
			//}
		}
	} else {
		for (var i = 1; i < n+1; i++) {
			//if (i%2!=0) {
				arr.push(i);

				boolArr.push(true);
			//	if (auto2) {
			//		if ((i)%2===1) {
			//			boolArr[i]=false;
			//		}
			//	}
			//}
		}
	}
	boolArr[0]=false;
	//boolArr[1]=false;
	//lastPrime=2;
	//curPrime=2;
	//console.log(boolArr);

	row = Math.floor(Math.sqrt(arr.length));
	//dim = Math.min(0.5*width,0.8*height);
	siz = Math.max(1,(dim)/row);
	if (siz*0.1>1) {
		marg = siz*0.1;
		siz -= marg;
	} else {
		marg = 0;
	}

	posxMarg=border+marg*0.5;
	
	
	
	//var left = (width-siz/2-dim)/2;
	//var top = (height-dim)/1.5;
	
	var cvSiz = (marg+siz)*row+border*2;
	gameCanvas.width= cvSiz;
	gameCanvas.height= cvSiz;
	//gameCanvas.style.left=left+marg+"px";
	//gameCanvas.style.top=top+"px";

	
	gameCanvas2.width= cvSiz;
	gameCanvas2.height= cvSiz;

	gameCanvasEffects.width= cvSiz;
	gameCanvasEffects.height= cvSiz;

	
	gameCanvas3Selection.width= cvSiz;
	gameCanvas3Selection.height= cvSiz;
	//gameCanvas2.style.left=left+marg+"px";
	//gameCanvas2.style.top=top+"px";

	
	document.getElementById("bigFieldIncrPrice").innerHTML = Math.floor(Math.pow((Math.sqrt(arr.length)),3)) + "PP";
	

	theLoop=true;
	//firstPlay=false;

	drawSieve();
	//drawBG();
	tick();
	
}
function addBG(i) {
	// if (primeNumbers.length<1000) {
	// 	var col = "rgba(200,200,200,0.5)";
	// } else if (primeNumbers.length<2000) {
	// 	var col = "rgba(150,150,150,0.5)";
	// } else if (primeNumbers.length<3000) {
	// 	var col = "rgba(100,100,100,0.5)";
	// } else if (primeNumbers.length<4000) {
	// 	var col = "rgba(50,50,50,0.5)";
	// } else if (primeNumbers.length<5000) {
	// 	var col = "rgba(200,100,100,0.5)";
	// } else if (primeNumbers.length<6000) {
	// 	var col = "rgba(100,100,200,0.5)";
	// } else if (primeNumbers.length<7000) {
	// 	var col = "rgba(100,200,100,0.5)";
	// } else if (primeNumbers.length<8000) {
	// 	var col = "rgba(100,100,000,0.5)";
	// } else if (primeNumbers.length<9000) {
	// 	var col = "rgba(100,100,200,0.5)";
	// }
	var col1 = Math.floor(Math.random()*150);
	var col2 = Math.floor(Math.random()*150);
	var col3 = Math.floor(Math.random()*150);
	var alp = 1;//(0.4+parseInt(Math.random()*0.3));
		ctxBG.fontStyle = "rgba("+col1+","+col2+","+col3+","+alp+")";
		ctxBG.fillStyle="rgba("+col1+","+col2+","+col3+","+alp+")";
		//console.log(ctxBG.fontStyle);
//	} else if (primeNumbers.length<2000) {
//		//ctxBG.fontStyle = "rgba(250,250,250,0.5)";
//		//ctxBG.fillStyle="rgba(250,250,250,0.5)";
//	}
	var fSiz=height*0.1*Math.random();//Random-On-The_left//height*0.05*Math.random();
	var xPos=-150+(150+width)*Math.random();//Random-On-The_left//0.2*Math.random()*width;
	var yPos=(50+height)*Math.random();//Random-On-The_left//height*0.33+0.6*Math.random()*height;
	ctxBG.font=fSiz+"px Arial ";
	ctxBG.fillText(i,xPos,yPos);
	
	ctxBG:fillStyle="rgba(255,255,255,1)";
	ctxBG:fontStyle="rgba(255,255,255,1)";
	ctxBG.strokeText(i,xPos,yPos);
}
function drawCountdown(i) {
	ctx2.fillStyle = "rgba(0,0,0,1)";
	ctx2.font = "17px Arial";
	ctx2.clearRect(0,dim+marg-20,dim,dim);
	ctx2.fillText("Restarting in "+i,0,dim+marg-3);
}
function drawBG() {
	ctxBG.clearRect(0,0,width,height);
	ctxBG.fontStyle = "rgba(0,0,0,0.5)";
	
	var am = primeNumbers.length-1;
	for (var j = am ;j>=0;j--) {
		ctxBG.font=height*0.05*Math.random()+"px Arial";
		ctxBG.fillStyle="rgba(50,50,50,0.5)";
		ctxBG.fillText(primeNumbers[j],width*0.1+0.7*Math.random()*width,height*0.3+0.6*Math.random()*height);
	}

}


function drawSieve() {

	
	ctx2.clearRect(0,0,width,height);
	ctx.clearRect(0,0,width,height);

	//row = Math.floor(Math.sqrt(arr.length));
	//siz = Math.max(1,Math.min(Math.floor(width*0.5 / row),Math.floor(height*0.5/row)));
	//marg = Math.floor(siz*0.1);
	//siz -= marg;

	for (key in arr) {
		var posx = posxMarg+key*(siz+marg)-((siz+marg)*row)*Math.floor(key/row);
		var posy= posxMarg+(siz+marg)*Math.floor(key/row);
		ctx.fillStyle = "rgba(50,50,50,1)";
		ctx.fillRect(posx,posy,siz,siz);
		if (!boolArr[parseInt(key)]) {
			fillTile(parseInt(key)+1,"rgba(20,20,20,1)");
		}
		//ctx.fillStyle = "rgba(250,250,250,1)";
		//ctx.fillRect(posx+siz*0.1,posy+siz*0.1,siz*0.8,siz*0.8);
		if (arr.length<201) {
			var num = parseInt(Number(arr[key]));
			var ln = num.toString().length;
			ctx2.font=siz/1.5+"px Arial";
			ctx2.fillStyle="rgba(250,250,250,1)";
			
			ctx2.fillText(num,posx+siz*0.5-ln*siz*0.2,posy+siz*0.8);
			
		}
	}

	//fillTile(1,green);
	fillTile(1,red);
}

function fillTile(i, color) {
	i=i-1;
	let tempSiz = (siz *0.8);
	let tmpBord = (siz * 0.1);
	var posx = (posxMarg+i*(siz+marg)-((siz+marg)*row)*Math.floor(i/row));
	var posy= (posxMarg+(siz+marg)*Math.floor(i/row));
	if (color == green) {
		filling.push([i,0]);
	}// else {
		ctx.lineWidth="0px";
		ctx.fillStyle = color;
		ctx.fillRect(posx+tmpBord,posy+tmpBord,tempSiz,tempSiz);
	//}
}
function drawFilling(n) {
	n = n || 1;

	let tempSiz = (siz *0.8);
	let tmpBord = (siz * 0.1);
	//ctxEffects.clearRect(0,0,width,height);
	for (var key=filling.length-1;key>0;key--) {
		var posx = (border+marg*0.5+filling[key][0]*(siz+marg)-((siz+marg)*row)*Math.floor(filling[key][0]/row));
		var posy = (border+marg*0.5+(siz+marg)*Math.floor(filling[key][0]/row));
		let tmpCtx = gameCanvasEffects.getContext("2d");

		tmpCtx.clearRect(posx+tmpBord-1,posy+tmpBord-1,tempSiz+2,tempSiz+2);

		filling[key][1]++;//+=n;
		let l = filling[key][1]; 
		
		let r = 20;
		let g = Math.floor(80* (l/100) );
		let b = 20;
		//let a = 0.1 * (l/100);
		
		//if (l<50){
		//	tempSiz+=0.1;
		//} else {
		//	tempSiz-=0.1;
		//}
		tmpCtx.lineWidth="0px";
		tmpCtx.fillStyle = "rgba(20,"+g+",20,0.5)";
		tmpCtx.fillRect(posx+tmpBord,posy+tmpBord,tempSiz,tempSiz);
		
		if (filling[key][1]>= 100 ) {
			//console.log("yes");

		//	tmpCtx.clearRect(posx+tmpBord,posy+tmpBord,tempSiz,tempSiz);
			tmpCtx.fillStyle = "rgba(20,80,20,1)";
			tmpCtx.fillRect(posx+tmpBord,posy+tmpBord,tempSiz,tempSiz);
			ctxEffects.fillStyle = "rgba(255,255,255,1)";
			ctxEffects.fontStyle = "rgba(200,200,200,1)";
			ctxEffects.font=siz/1.5+"px Arial";
			var ln = (filling[key][0]).toString().length;
			ctxEffects.fillText(filling[key][0]+1,posx+siz*0.5-ln*siz*0.2,posy+siz*0.8);
			console.log(filling[key][1]);
			filling.splice(key,1);
		}
	}
}
function drawSelected(i,color) {

	var posx = border+marg*0.5+i*(siz+marg)-((siz+marg)*row)*Math.floor(i/row);
	var posy=border+marg*0.5+(siz+marg)*Math.floor(i/row);
	ctx3Selection.clearRect(0,0,width,height);
	ctx3Selection.beginPath();
	ctx3Selection.lineWidth = siz*0.05;
	ctx3Selection.strokeStyle = color;
	ctx3Selection.rect(posx-siz*0.025,posy-siz*0.025,siz*1.05,siz*1.05);
	ctx3Selection.stroke();	
}

var arr=[];
var boolArr=[]
var filling=[];
var dim;
var gameCanvas ;
var currentN;
var gameCanvas2 ;
var gameCanvas3Selection ;
var gameCanvasBG ;
var gameCanvasEffects ;
var firstPlay=true;
var auto2=false;
var ctx;
var ctx2;
var ctxEffects;
var ctx3Selection;
var ctxBG;
var width;
var height;
var border;
var row;
var siz = 50;
var marg = 5;
var lastPrime=1;
var curPrime=1;
var red = "rgba(80,20,20,0.5)";
var green = "rgba(20,80,20,0.5)";
var blue = "rgba(20,20,180,0.8)";
var lastTick = 0; //window.performance.now();
var ticker = 0;
var tickSpeed= 1000;
var theLoop=true;
var curSearch;
var lastSearch;
var curDelete;
var steps = 1;
var primePower=0;
var done = false;
var txt = "Looking for next Prime Number.. "
var primeNumbers = [];
var lastAmount = 0;
var countDown = 0;
var filling = [];
var posxMarg=0;

function addUnique(arr,that) {
	for (var i = 0; i<arr.length;i++) {
		if (arr[i]==that) {
			return arr.slice(0);
		}
	}
	arr.push(that);
	return arr.slice(0);
}

function step() {
	//console.log("Stepping");

	//if (curPrime <= row) {

		if (lastPrime == curPrime || !boolArr[curPrime] || curPrime>row) {
			//console.log("Searching");
			searchStep();
		} else {
			//console.log("Deleting");
			deleteStep() 
		}
	//} else {
//	//	for (var k = 0; k < arr.length+1;k++) {
//	//		if (boolArr[k]) {
//	//			window.setTimeout(function(){
//	//				fillTile(k,"rgba(20,80,20,0.8)");
//	//				
//	//			},10*k);
//
//	//		} else {
//	//		//	fillTile(k,"rgba(80,20,20,0.8)");
//	//		}
//	//	}
//	//	curSearch=null;
//	//	theLoop=false;
//
	//}
}

function searchStep() {
	//if (curPrime == lastPrime || !boolAr[curPrime]) {
		curPrime++
		lastSearch=curSearch;
		curSearch=curPrime;
		steps = 1;
		if (curPrime<=row) {
				txt+=curPrime+"?, ";
			}
		if (boolArr[curPrime]) {
			addPrimeNumber(curPrime);
			
			fillTile(curPrime,green);
			//txt = "Found new Prime Number" + curPrime + "!";
			if (curPrime>row) {
				txt = "Found Prime Number: "+curPrime+"!";
			} else {
				txt = "Deleting Multiples of "+ curPrime + ":</br> ";
			}
			return;
		}
		if (curPrime > arr.length) {
			curSearch=null;
			//theLoop=false;
			done=true;
			txt = "Waiting to Restart...";
			countDown = 50;
			//drawSelected(0,"rgba(255,255,255,1)");
			//if (arr.length<200) {
			//	for (key in arr) {
			//		drawSelected(key,"rgba(255,255,255,1)");
			//	}
			//}
			return;
		}
		
		//document.getElementById("doingWhat").innerHTML = "Looking for next Prime Number";

	//} 
}
function addPrimeNumber(i) {
	//document.getElementById("primeNumbers").innerHTML += "<div class='pm'>"+i+"</div>";
	primePower+=parseInt(i);

	primeNumbers = addUnique(primeNumbers,curPrime);
}
function deleteStep() {
	
		steps++;
	if (steps*curPrime<=arr.length) {
		lastSearch=curSearch;
		curSearch=steps*curPrime;
		boolArr[steps*curPrime]=false;
		fillTile(steps*curPrime,red);
		if (txt.length>100) {
			txt = "Deleting Multiples of "+ curPrime + ":</br> " ;
		}
		txt+= curPrime*steps +", ";
		//txt = "Deleting Multiples of "+ curPrime + ": ";
		//document.getElementById("doingWhat").innerHTML = "Deleting Multiples of " + curPrime;	
	} else {
		lastPrime=curPrime;
		txt = "Looking for next Prime Number after " + lastPrime + ":</br>";
	}
}

function tick() {
    
    var now =window.performance.now(); // current time in ms

    var deltaTime = now - lastTick; // amount of time elapsed since last tick
    
    lastTick = now;
    

    ticker += deltaTime;
      while (ticker > tickSpeed) {
        ticker -= tickSpeed;
        if (!done) {
        	step();
        }


      }


  	if (row < 1000 && tickSpeed > 10) {

  		drawFilling();
  	}
      if (tickSpeed>40) {

	      if (curSearch) {
	      	drawSelected(curSearch-1,blue);
	      	
	      }

	      //drawSelected(lastSearch-1,"rgba(255,255,255,1)");
      }
	  
	  document.getElementById("doingWhat").innerHTML = txt;	


      document.getElementById("PP").innerHTML = primePower;
      document.getElementById("PN").innerHTML = primeNumbers.length;
      let abc = primeNumbers[primeNumbers.length-1];
      abc = abc || "None";
      document.getElementById("HPN").innerHTML = abc;
      document.getElementById("FDM").innerHTML = "(" + Math.sqrt(currentN) + "x"+Math.sqrt(currentN)+") [total: "+ currentN+" ]";
      if(done) {
      	document.getElementById("fieldBut").style.display = "block";
      }
      var dif = primeNumbers.length-lastAmount;
      var doIt = Math.min(dif,100);
      while ( doIt>0) {
      	addBG(primeNumbers[primeNumbers.length-dif]);
      	dif--;
      	doIt--;
      	lastAmount++;
      }
      if (countDown>0){
      	countDown--;
      	drawCountdown(countDown);
      	if (countDown==0) {
      		ctx2.clearRect(0,dim+marg-20,dim,dim);
      		start(currentN);
      	}

      }

    	theLoop = window.requestAnimationFrame(tick);
      
  } 

  function clickBoard(m) {
  		var n = Math.pow(m+Math.sqrt(arr.length),2);
  		document.getElementById("fieldBut").style.display = "none";
  		start(n);
  }

  function clickBoardBig() {
  	//console.log(Math.pow(100,Math.ceil((speedBought+2)/2)) + "::::" + primePower);
  	var price = Math.floor(Math.pow((Math.sqrt(arr.length)),3));
  		if (price<=primePower) {
  			primePower-=price;
  			
  			
  			clickBoard(10);
  			document.getElementById("bigFieldIncrPrice").innerHTML = Math.floor(Math.pow((Math.sqrt(arr.length)),3)) + "PP";
  		}
  }


  var speedBought=0;
  function clickSpeed() {
  	//console.log(Math.pow(100,Math.ceil((speedBought+2)/2)) + "::::" + primePower);
  	var price = Math.floor(Math.pow(100,1+(speedBought/10)));
  		if (price<=primePower) {
  			primePower-=price;
  			speedBought++;
  			tickSpeed = Math.max(10,tickSpeed/2);
  			document.getElementById("speedBut").innerHTML="Reduce Tick Speed - "+ Math.floor(Math.pow(100,1+(speedBought/10)))+"PP";
  		}
  }
  function getScrollbarWidth() {
  var outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.width = "100px";
  outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

  document.body.appendChild(outer);

  var widthNoScroll = outer.offsetWidth;
  // force scrollbars
  outer.style.overflow = "scroll";

  // add innerdiv
  var inner = document.createElement("div");
  inner.style.width = "100%";
  outer.appendChild(inner);

  var widthWithScroll = inner.offsetWidth;

  // remove divs
  outer.parentNode.removeChild(outer);

  return widthNoScroll - widthWithScroll;
}
  