//顶点着色器
var VSHADER_SOURCE = 
	'attribute vec4 a_Position;\n'+
	'void main(){\n'+
	'gl_Position = a_Position;\n'+
	'gl_PointSize=10.0;\n'+
	'}\n';

//片元着色器
var FSHADER_SOURCE = 
'precision mediump float;\n'+
''
'void main() {\n'+
'gl_FragColor = vec4(1.0,0.0,1.0,1.0);\n'+//点的颜色
'}\n';

function main(){
	//获取
	var canvas= document.getElementById('webgl');
	//获取绘图上下文
	var gl=getWebGLContext(canvas);
	if(!gl){
		console.log('Failed to get the rendering context for WebGL');
		return;
	}

	//初始化着色器
	if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
		console.log('Failed to initialize shaders.');
		return;
	}

	//******获取attribute变量的存储位置
	var a_Position = gl.getAttribLocation(gl.program,'a_Position');
	if (a_Position<0) {
		console.log('Failed to get the storage location of a_Position');
		return;
	};

	//注册鼠标点击事件的响应函数
	canvas.onmousedown = function(ev){
		click(ev,gl,canvas,a_Position);
	};

	//将顶点位置传输给attribu变量
	gl.vertexAttrib3f(a_Position,0.0,0.0,0.0,1.0);

	//设置canvas背景色
	gl.clearColor(0.0,0.0,0.0,1.0);

	//清空canvas
	gl.clear(gl.COLOR_BUFFER_BIT);
}
 var g_points =[];//鼠标点击位置数组
 function click(ev,gl,canvas,a_Position){
	var x = ev.clientX;
	var y = ev.clientY;
	var rect = ev.target.getBoundingClientRect(); 	
	x = ((x-rect.left)-canvas.height/2)/(canvas.height/2);
	y = (canvas.width/2 - (y-rect.top))/(canvas.width/2);
	//将坐标存到g_points中
	g_points.push(x);
	g_points.push(y);

	//清除canvas
	gl.clear(gl.COLOR_BUFFER_BIT);

	var len=g_points.length;
	for (var i = 0; i < len; i+=2) {
		gl.vertexAttrib3f(a_Position,g_points[i],g_points[i+1],0.0);

		//绘制点
		gl.drawArrays(gl.POINTS,0,1);
	};
 }