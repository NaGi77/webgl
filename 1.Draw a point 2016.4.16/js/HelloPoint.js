//顶点着色器
var VSHADER_SOURCE=
'void main() {\n'+
'gl_Position = vec4(0.0,0.0,0.0,1.0);\n'+//点的位置
'gl_PointSize =10.0;\n'+
'}\n';

//片元着色器
var FSHADER_SOURCE = 
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

	//设置canvas背景色
	gl.clearColor(0.0,0.0,0.0,1.0);

	//清空canvas
	gl.clear(gl.COLOR_BUFFER_BIT);

	//绘制一个点
	gl.drawArrays(gl.POINTS,0,1);
}