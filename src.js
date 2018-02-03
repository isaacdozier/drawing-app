//Build Toolbar
var curTool = "pencil"

var tools = [
    {
        name:"clear",
        icon:"window-close",
        info: "Clear Canvas",
        action: function(){
                    ctx.clearRect(0,0,640,320);
                }
    },
    {
        name:"paint-brush",
        icon:"paint-brush",
        info: "Thick Line",
        action: function(){
                    curTool = this.id
                    ctx.lineWidth=5;
                    highlightTool(this)
                    resetTools(this)
                }
    },
    {
        name:"pencil",
        icon:"pencil-alt",
        info: "Thin Line",
        action: function(){
                    curTool = this.id
                    
                    ctx.lineWidth=1;
                    highlightTool(this)
                    resetTools(this)
                    
                }
    }
]

document.getElementById('tool').innerHTML = btns(tools)
//toolbar tool variables
document.getElementById('clear').onclick       = tools[0].action
document.getElementById('paint-brush').onclick = tools[1].action
document.getElementById('pencil').onclick      = tools[2].action

function btns(t){
var tmp = ''
    for (var i = 0; i < t.length; i++) {
        if(tmp === ''){
            tmp = '<button style="background-color:#888888;border-color:#b3b3b3" title="' + t[i].info + '" id="' + t[i].name + '"><i class="fa fa-' + t[i].icon + '"></i></button>'
        } else {
            tmp = tmp 
                + '<button style="background-color:#888888;border-color:#b3b3b3" title="' + t[i].info + '" id="' + t[i].name + '"><i class="fa fa-' + t[i].icon + '"></i></button>'
        }
    }
return tmp
}

highlightTool(document.getElementById(curTool))

var userColor = 'black'                        //Default
var color     = ['black', 'grey', 'white','blue', 'red', 'green', 'purple', 'pink', 'orange'] //Options

document.getElementById('color').innerHTML = colors(color)

function colors(c){
var tmp = ''
    for (var i = 0; i < c.length; i++) {
        if(tmp === ''){
           tmp = '<button onclick="resetColors(' + c[i] + ')" style="background-color:' + c[i] + '" title="' + c[i] + '" class="colors" id="' + c[i] + '"></button>'
        } else {
            tmp = tmp 
                + '<button onclick="resetColors(' + c[i] + ')" style="background-color:' + c[i] + '" title="' + c[i] + '" class="colors" id="' + c[i] + '"></button>'
        }
    }
return tmp
}


//End Buttons Toolbar

//Build Canvas
var click, squareStart = false
var offsetX, offsetY, cnt = 0
var lastX = 0, lastY = 0
var c = document.getElementById("draw")
var ctx = c.getContext("2d")
    ctx.strokeStyle= "black"
    ctx.fillStyle="white";
    ctx.fillRect(0,0,640,320);
    

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
    }
}
//Draw -- General
function draw(e){
    
       ctx.lineTo(coorX(event),coorY(event)) 
    
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
function resetTools(t){
    for (var i = 0; i < tools.length; i++) {
       if(tools[i].name !== t.id){
           document.getElementById(tools[i].name).style.backgroundColor = '#888888' 
           document.getElementById(tools[i].name).style.borderColor = '#b3b3b3'
           document.getElementById(tools[i].name).style.color = 'black'
       } else {
           
       }
    }
}

function highlightTool(t){
    document.getElementById(t.id).style.color = userColor
    document.getElementById(t.id).style.backgroundColor = "lightGrey"
}

function resetColors(c){
    for (var i = 0; i < tools.length; i++) {
        console.log(c.id)
        if(tools[i].name === curTool){
            document.getElementById(tools[i].name).style.color = c.id
            resetTools(document.getElementById(curTool))
            userColor = c.id
            ctx.strokeStyle = c.id
        }
    }
}

function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}

document.getElementById('download').addEventListener('click', function() {
    var fileName = document.getElementById('fileName').value
    if (fileName == null || fileName == "") {
        fileName = "drawing_app_" + (Math.floor(Math.random() * 1000000) + 1);
    }
    downloadCanvas(this, 'draw', fileName);
}, false);
