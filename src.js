//Build Toolbar
var tools = [
    {
        name:"paint-brush"
    },
    {
        name:"pencil-alt"
    }
    //{
    //    name:"square"
    //}
]

document.getElementById('tool').innerHTML = btns(tools)

function btns(t){
var tmp = ''
    for (var i = 0; i < t.length; i++) {
        if(tmp === ''){
            tmp = '<button id="' + t[i].name + '"><i class="fa fa-' + t[i].name + '"></i></button>'
        } else {
            tmp = tmp + '<button id="' + t[i].name + '"><i class="fa fa-' + t[i].name + '"></i></button>'
        }
    }
return tmp
}

//toolbar tool variables
////PAINT BRUSH - THICK LINE
document.getElementById('paint-brush').onclick = function(){
    resetTools()
    ctx.lineWidth=5;
}
////PENCIL - THIN LINE
document.getElementById('pencil-alt').onclick = function(){
    resetTools()
    ctx.lineWidth=1;
}
////CLEAR CANVAS BUTTON
document.getElementById('clear').onclick = function(){
    resetTools()
    ctx.clearRect(0,0,640,320);
}

//Build Canvas
var click, squareStart = false
var offsetX, offsetY, cnt = 0
var lastX = 0, lastY = 0
var c = document.getElementById("draw")
var ctx = c.getContext("2d")
    ctx.strokeStyle = "#000000"
    ctx.fillStyle="white";
    ctx.fillRect(0,0,640,320);
    
////DRAW BOX
//document.getElementById('square').onclick = function(){
//    squareStart = true
//}
//set canvas dimensions
document.getElementById('draw').width  = 640
document.getElementById('draw').height = 320
//Mouse Events 
////click -> draw line
document.body.onmousedown = function(){ 
    ctx.beginPath()
    click = true
    lastX = coorX, lastY = coorY
}
////release click -> stop drawing
document.body.onmouseup = function(){
    click = false
    lastX = 0, lastY = 0
}  
//called from canvas -> onmousemove
//acts as a refresher based on user activity
function refresh(e) {
    //--Events--
    ////draw line
    if(click){
        draw(event)
        
    ctx.strokeRect(lastX,lastY,coorX(event),coorY(event))
    }
}
//Draw -- General
function draw(e){
    if(squareStart){
        drawSquare(coorX(event),coorY(event))
    } else {
       ctx.lineTo(coorX(event),coorY(event)) 
    }
    ctx.stroke()
}

//Draw Square
function drawSquare(x,y){
        ctx.strokeRect(lastX,lastY,x,y);
        squareStart = false
}
//Helper Functions`
function coorX(e){
     //screen and scroll offsets
    offsetX = document.getElementById('draw').offsetLeft  
            + document.getElementById('canvas').offsetLeft
     return e.clientX - offsetX
}
function coorY(e){
    offsetY = document.getElementById('canvas').offsetTop
            - window.pageYOffset
    return e.clientY - offsetY
}
function replaceName(name){
    return name.split('-').join('')
}
function resetTools(){
    squareStart = false
}