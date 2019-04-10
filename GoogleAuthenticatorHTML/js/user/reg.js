$(function(){
	reg.init();
})
var reg={
	init:function(){
		$("#reg").click(function(){
			reg.reg();
		});
	},
	reg:function(){
		var _account=$("#account").val();
		var _password=$("#password").val();
		if(_account.trim()==""||_password.trim()==""){
			layer.msg("请输入账号密码",{icon:3})
		}else{
			var _url=all.google_host+"/register.json";
			$.post(_url,$("#reg_form").serialize(),function(result){
				if(result.status==100){
					layer.msg(result.message,{icon:1})
					setTimeout(function(){
						window.location.href="login.html"; 
					},1500);
				}else{
					layer.msg(result.message,{icon:3})
				}
			});
		}
	}
}
