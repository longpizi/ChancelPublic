var index_socket = {
	code: function(_google_id,_google_key) {
		var websocket = null;
		//判断当前浏览器是否支持WebSocket
		if('WebSocket' in window) {
			websocket = new WebSocket("ws://"+all.google_host_t+"/google_code/"+_google_id+"/"+_google_key+"");
		} else {
			alert('Not support websocket')
		}

		//连接发生错误的回调方法
		websocket.onerror = function() {
//			setMessageInnerHTML("error");
		};

		//连接成功建立的回调方法
		websocket.onopen = function(event) {
//			setMessageInnerHTML("open");
		}

		//接收到消息的回调方法
		websocket.onmessage = function(event) {
			setMessageInnerHTML(event.data);
		}

		//连接关闭的回调方法
		websocket.onclose = function() {
//			setMessageInnerHTML("close");
		}

		//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
		window.onbeforeunload = function() {
			websocket.close();
		}

		var code=0;
		//将消息显示在网页上
		function setMessageInnerHTML(context) {
			var strs=context.split(",");
			$("#my_"+strs[0]).html(strs[1]);
			if(code!=strs[1]){
				code=strs[1]
				$(".progressbar_"+strs[0]).width(30)
			}else{
				$(".progressbar_"+strs[0]).width($(".progressbar_"+strs[0]).width()-1)
			}
			
//			console.log(strs[0]+"=="+strs[1]);
//			document.getElementById('message').innerHTML += innerHTML + '<br/>';
		}

		//关闭连接
		function closeWebSocket() {
			websocket.close();
		}

		//发送消息
		function send() {
//			var message = document.getElementById('text').value;
			websocket.send("ok");
		}
	}
}