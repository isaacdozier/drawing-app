//Detail Values
var details = [
    {
        name:"stability",
        value:2,
        min:0,
        max:10
    }]

//Build Toolbar
var curTool = "pencil"
var tools = [
    {
        //0
        name:"clear",
        icon:"window-close",
        info: "Clear Canvas",
        action: function(){
                    ctx.clearRect(0,0,640,320);
                }
    },
    {
        //1
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
        //2
        name:"pencil",
        icon:"pencil-alt",
        info: "Thin Line",
        action: function(){
                    curTool = this.id
                    ctx.lineWidth=1;
                    highlightTool(this)
                    resetTools(this)
                    
                }
    }//,
    //{
        //3
    //    name:"undo",
    //    icon:"undo",
    //    info: "Undo",
        //action: function(){
        //    var tmp = canvasArray.pop()
        //    
        //    var img = new Image();
        //    img.onload = function() {
        //        ctx.drawImage(img, 0, 0);
        //    };
        //    img.src = tmp;
        //}         
    //},
    //{
        //4
    //    name:"redo",
    //    icon:"redo",
    //    info: "redo",
        //action: function(){}
    //},
    //{
        //5
    //    name:"image",
    //    icon:"image",
    //    info: "Insert Image as Background",
        //action: function(){}
   // }
]

document.getElementById('tool').innerHTML = buildToolButtons(tools)
//toolbar tool variables
document.getElementById('clear').onclick       = tools[0].action
document.getElementById('paint-brush').onclick = tools[1].action
document.getElementById('pencil').onclick      = tools[2].action
//document.getElementById('undo').onclick        = tools[3].action

function init(){
    resetColors(document.getElementById(userColor))
    highlightTool(document.getElementById(curTool))
    buildDetails(details)
}

function buildToolButtons(t){
var tmp = ''
    for (var i = 0; i < t.length; i++) {
        if(tmp === ''){
            tmp = '<button class="btn" btn title="' + t[i].info + '" id="' + t[i].name + '"><i class="fa fa-' + t[i].icon + '"></i></button>'
        } else {
            tmp = tmp 
                + '<button class="btn" btn title="' + t[i].info + '" id="' + t[i].name + '"><i class="fa fa-' + t[i].icon + '"></i></button>'
        }
    }
return tmp
}

function buildDetails(d){
var tmp = ''
    for (var i = 0; i < d.length; i++) {
        if(tmp === ''){
            tmp =  d[i].name + ': <input type="number" id="' + d[i].name +'" value="' + d[i].value + '" min="' + d[i].min + '" max="' + d[i].max + '"/>'
        } else {
            tmp = tmp + d[i].name + ': <input type="number" id="' + d[i].name +'" value="' + d[i].value + '" min="' + d[i].min + '" max="' + d[i].max + '"/>'
        }
    }
document.getElementById('details').innerHTML = tmp
}

var userColor = 'white' //Default
var color     = ['black',  'grey',  'white',
                 'blue',   'red',   'green', 
                 'purple', 'orange','teal'] //Options

document.getElementById('color').innerHTML = colors(color)

function colors(c){
var tmp = ''
    for (var i = 0; i < c.length; i++) {
        if(tmp === ''){
           tmp = '<button onclick="resetColors(' + c[i] + ')" style="background-color:' + c[i] + '" title="' + c[i] + '" class="colors btn" id="' + c[i] + '"></button>'
        } else {
            tmp = tmp 
                + '<button onclick="resetColors(' + c[i] + ')" style="background-color:' + c[i] + '" title="' + c[i] + '" class="colors btn" id="' + c[i] + '"></button>'
        }
    }
return tmp
}

function pointer(cur){
    document.getElementById('draw').style.cursor = 'url(' + cur + '),auto'
}


//End Buttons Toolbar

//Build Canvas
var click, squareStart = false

var cnt = 0
var stability = function(){return document.getElementById("stability").value}
var c = document.getElementById("draw")
var ctx = c.getContext("2d")
    ctx.strokeStyle= 'white'
    ctx.fillRect(0,0,640,320);
    
function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  )*0.80;
}

function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  )*0.50;
}

document.getElementById('draw').width = 640
document.getElementById('draw').height = 320
//Mouse Events 
////click -> draw line
document.body.onmousedown = function(){ 
    ctx.beginPath()
    click = true
}
////release click -> stop drawing
document.body.onmouseup = function(){
    click = false
} 

document.getElementById('draw').onmouseup = function(){
    printCanvasToArray('draw')
}
 
//called from canvas -> onmousemove
//acts as a refresher based on user activity
function refresh(e) {
    if(click && cnt > stability()){
        draw(event)
        cnt = 0
    } else {
        cnt++
    }
    
}
//Draw -- General
function draw(e){
    ctx.lineTo(coorX(event),coorY(event)) 
    ctx.stroke()
}

var X, Y
var offsetX = document.getElementById('draw').offsetLeft  
            + document.getElementById('canvas').offsetLeft 
var offsetY = document.getElementById('canvas').offsetTop
            - window.pageYOffset
            
function edges(){
    var XLeft = coorX(event) < offsetX
    var XRight = coorX(event) > (getWidth()-offsetX)
    var YTop = coorY(event) < offsetY
    var YBottom = coorY(event) > (getHeight()-offsetY)
    
    return XLeft || XRight || YTop || YBottom
}

//Helper Functions`
function coorX(e){
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
           document.getElementById('draw').style.cursor = 'url('+tools[i].icon+'.cur),auto'
       }
    }
}

function highlightTool(t){
    document.getElementById(t.id).style.color = userColor
    document.getElementById(t.id).style.backgroundColor = "lightGrey"
}

function resetColors(c){
    for (var i = 0; i < tools.length; i++) {
        if(tools[i].name === curTool){
            document.getElementById(tools[i].name).style.color = c.id
            
            resetTools(document.getElementById(curTool))
            
            userColor = c.id
            ctx.strokeStyle = c.id
        }
    }
}

//Download image functions
var canvasArray = []
function printCanvasToArray(canvasId) {
    canvasArray.push(document.getElementById(canvasId).toDataURL())
    console.log(canvasArray.length)
}

function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}

document.getElementById('download').addEventListener('click', function() {
    var fileName = (document.getElementById('fileName').value+'').split('.').join('-').split(' ').join('_')
    if (fileName == null || fileName == "") {
        fileName = "drawing_app_" + (Math.floor(Math.random() * 1000000) + 1);
    }
    downloadCanvas(this, 'draw', fileName);
}, false);
