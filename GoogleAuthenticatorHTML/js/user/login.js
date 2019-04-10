$(function() {
	login.init();
})
var login = {
	init: function() {
		$("#login").click(function() {
			login.login();
		});
	},
	login: function() {
		var _account = $("#account").val();
		var _password = $("#password").val();
		if(_account.trim() == "" || _password.trim() == "") {
			layer.msg("请输入账号密码", {
				icon: 3
			})
		} else {
			var _url = all.google_host + "/login.json";

			$.ajax({
				url: _url,
				type: 'post',
				dataType: 'json',
				data: $("#login-form").serialize(),
				xhrFields: {
					withCredentials: true //携带cookie
				},
				success: function(result) {
					if(result.status == 100) {
						layer.msg(result.message, {
							icon: 1
						})
						setTimeout(function() {
							window.location.href = "index.html";
						}, 1500);
					} else {
						layer.msg(result.message, {
							icon: 3
						})
					}
				}

			});
		}
	}
}