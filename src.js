document.getElementById('draw').width  = 640
document.getElementById('draw').height = 320

var click, offsetX, offsetY, cnt = 0
var c = document.getElementById("draw")
var ctx = c.getContext("2d")
    ctx.strokeStyle = "#000000"
    ctx.fillStyle="white";
    ctx.fillRect(0,0,640,320);
    
document.getElementById('draw').onmousedown = function(){ 
    ctx.beginPath()
    click = true
}

document.body.onmouseup = function(){
    click = false
}  

document.getElementById('clear').onclick = function(){
    ctx.clearRect(0,0,640,320);
}

function refresh(e) {
    if(click){
        draw(event)
    }
}

function draw(e){
    offsetX = document.getElementById('draw').offsetLeft  
            + document.getElementById('canvas').offsetLeft
            
    offsetY = document.getElementById('canvas').offsetTop
            - window.pageYOffset
    
    ctx.lineTo(e.clientX - offsetX,e.clientY - offsetY)
    ctx.stroke()
}