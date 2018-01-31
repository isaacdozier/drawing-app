document.getElementById('draw').width  = 640
document.getElementById('draw').height = 320

var offsetX, offsetY, cnt = 0
var ink = "#ffffff00"
var clear = true
var c = document.getElementById("draw")
var ctx = c.getContext("2d")
    ctx.strokeStyle = ink
    
function draw(e) {
    if(cnt === 1){
        
        offsetX = document.getElementById('draw').offsetLeft  
                + document.getElementById('inner').offsetLeft
        offsetY = document.getElementById('inner').offsetTop
        
        ctx.lineTo(e.clientX - offsetX,e.clientY - offsetY)
        
        document.getElementById('draw').onclick = function(){
            
            if(clear === true){
                ink = "#000000"
                clear = false
            } else {
                ink = "#ffffff00"
                clear = true
                
            }
            ctx.beginPath();
            ctx.strokeStyle = ink
        }
        ctx.stroke()
        cnt = 0
    }
    cnt++
}
