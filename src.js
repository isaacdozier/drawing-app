var cWidth  = window.screen.availWidth
var cHeight = window.screen.availHeight

document.getElementById('draw').width  = cWidth
document.getElementById('draw').height = cHeight

var offsetX = -15, offsetY = -3
var ic  = "#"
var ink = "ffffff00"
var clear = true
var c = document.getElementById("draw")
var ctx = c.getContext("2d")
    ctx.strokeStyle = ic + ink

function draw(e) {
    ctx.lineTo(e.clientX+offsetX,e.clientY+offsetY)
    document.getElementById('draw').onclick = function(){
        if(clear === true){
            ink = "000000"
            clear = false
        } else {
            ink = "ffffff00"
            clear = true
        }
        ctx.beginPath();
        ctx.strokeStyle = ic + ink
    }
    ctx.stroke()
    setTimeout("callEvent()",1);
    
}
