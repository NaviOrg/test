function Display(id, honmon){
	
	if(document.all || document.getElementById){	//IE4,N6以降
		if (id) {
			if(document.all){
				obj = document.all(id).style;
			}else if(document.getElementById){
				obj = document.getElementById(id).style;
			}
			
			//alert(obj.display);
			
			if(obj.display == "block"){
				obj.display = "none";		//ツリーを閉じる
			}else{
				if (honmon) {
					obj.display = "block";		//ツリーを開くにする
					return;
				} else {
					obj.display = "block";		//ツリーを開くにする
				}
			}
		}
	}
}


