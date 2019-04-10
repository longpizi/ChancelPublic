//不需要加载元素直接初始化
var _url = all.google_host + "/index.json";
$.ajax({
	url: _url,
	type: 'get',
	dataType: 'json',
	xhrFields: {
		withCredentials: true //携带cookie
	},
	success: function(result) {
		if(result.status != 100) {
			window.location.href = "login.html";
		} else {
			$(".loading").remove();
			$("#context").show();
			$("#account_span").html(result.account);
			$.ajax({
				url: all.google_host + "/query_google_authenticator.json",
				type: 'get',
				dataType: 'json',
				xhrFields: {
					withCredentials: true //携带cookie
				},
				success: function(_result) {
					if(_result.status == 105) {
						for(var i = 0; i < _result.authenticator_list.length; i++) {
							var $div = $("<div class='card'><div class = 'card_number' ><div class = 'txt0' ><span style = 'font-size: 25px;'  id='my_"+_result.authenticator_list[i].id+"'> 170 550 </span><br><span> " + _result.authenticator_list[i].account + " </span><div class='progressbar_"+_result.authenticator_list[i].id+"' id='progressbar'></div></div>")
							$("#qr_context_div").append($div);
							index_socket.code(_result.authenticator_list[i].id,_result.authenticator_list[i].googleKey);
						}
					} else {
						window.location.href = "login.html";
					}
				}

			});
		}
	}

});$(function(){
	var progressbar = {
			init: function() {
				var count = 0;
				//通过间隔定时器实现百分比文字效果,通过计算CSS动画持续时间进行间隔设置
				var timer = setInterval(function(e) {
					count++;
					$("#progressbar").width($("#progressbar").width()-1)
					if(count === 30) clearInterval(timer);
				}, 1000);
			}
		};
		progressbar.init();
})
