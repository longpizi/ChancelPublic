$(function() {
	mui.init();
	var scan = null; //扫描对象  
	function startRecognize() {
		try {
			var filters;
			//自定义的扫描控件样式  
			var styles = {
				frameColor: "#0000FF",
				scanbarColor: "#0000FF",
				background: ""
			};
			//扫描控件构造  
			scan = new plus.barcode.Barcode('code', filters, styles);
			scan.onmarked = onmarked;
			scan.onerror = onerror;
			scan.start();
		} catch(e) {
			mui.alert("出现错误啦:\n" + e);
		}

	};
	function onerror(e) {
		miu.alert(e);
	};
	function onmarked(type, result) {
		var text = '';
		switch(type) {
			case plus.barcode.QR:
				text = 'QR: ';
				break;
			case plus.barcode.EAN13:
				text = 'EAN13: ';
				break;
			case plus.barcode.EAN8:
				text = 'EAN8: ';
				break;

		}
		if(result!=""){
			$.ajax({
				url:all.google_host+"/add_google_authenticator.json",
				data:{'qr_context':result},
				type:'post',
				dataType: 'json',
				success:function(result_data){
					scan.close();
					scan.cancel();
					$("#code").hide();
				}
			})
		} 

	};
	// 从相册中选择二维码图片   
	function scanPicture() {
		plus.gallery.pick(function(path) {
			plus.barcode.scan(path, onmarked, function(error) {
				plus.nativeUI.alert("无法识别此图片");
			});
		});

	}
	$("#scanning_span").click(function() {
		scan = null;
		$("#code").show();
		mui.plusReady(function() {
			startRecognize();
		});

	})
})