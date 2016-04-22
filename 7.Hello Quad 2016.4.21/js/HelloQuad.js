//顶点着色器
var VSHADER_SOURCE = 
	'attribute vec4 a_Position;\n'+
	'void main(){\n'+
	'gl_Position = a_Position;\n'+
	'}\n';

//片元着色器
var FSHADER_SOURCE = 
	'precision mediump float;\n'+
	'uniform vec4 u_FragColor;\n'+
	'void main() {\n'+
	'gl_FragColor = u_FragColor;\n'+//点的颜色
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

	//设置顶点位置
	var n= initVertexBuffers(gl);
	if(n<0){
		console.log('Failed to set the position of the vertices');
		return;
	}

	//设置canvas背景色
	gl.clearColor(0.0,0.0,0.0,1.0);

	//清空canvas
	gl.clear(gl.COLOR_BUFFER_BIT);

	//绘制三个点
	gl.drawArrays(gl.TRIANGLE_STRIP,0,n);//n is 4
}

function initVertexBuffers(gl){
	var vertices=new Float32Array([-0.5,0.5,-0.5,-0.5,0.5,0.5,0.5,-0.5]);
	var n=4;

	//创建缓冲区对象
	var vertexBuffer = gl.createBuffer();
	if(!vertexBuffer){
		console.log('Failed to create the buffer object');
		return -1;
	}

	//将缓冲区对象绑定目标
	gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);

	//将缓冲区对象中写入数据
	gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

	//******获取attribute变量的存储位置
	var a_Position = gl.getAttribLocation(gl.program,'a_Position');
	if (a_Position<0) {
		console.log('Failed to get the storage location of a_Position');
		return;
	};

	//将缓冲区对象分配给a_Position
	gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);

	//连接a_Position与分配给他的缓冲区对象
	gl.enableVertexAttribArray(a_Position);

	return n;
}

