/*
 * popup window wrapper for 家庭の医学
 *
 * copyright 2009 man'age matsuda, ishiwata, tachibana
 *
 */

popup_image_window_width=620+20;				//画像類ポップアップの幅
popup_foot_window_width=600;					//脚注ポップアップの幅

winobject=Array();								// Window object
window_num = 0;									// Window count
window_page= 0;									// Window Page
window_page_count=0;							// Window Page Count
tmp_img = new Object;							// Preload image
tmp_wait_count=0;								// load wait counter
image_path='../img/contents/images/';			// image path

/**
 * @author matsuda
 *
 */
function popupinit() {
	var GETS = new Array();
	var URL = window.location.search.substring(1);
	var P = URL.split('&');
	for (var i=0; i<P.length; i++) {
		var Eq = P[i].indexOf('=');
		if (Eq > 0) {
			var key = P[i].substring(0,Eq);
			var element = P[i].substring(Eq+1);
			GETS[key] = element;
		}
	}

	var myUrl=GETS['img'];
	var myUrlOrg=GETS['org'];
	var alt_text=decodeURI(GETS['alt']);
	window_num=GETS['num'];
	window_page_count=GETS['page'];
	if(window_page_count==0) {
		var img_filename='../img/contents/images/' + myUrlOrg;
	} else {
		var img_filename='../img/contents/images/' + myUrl;
		window_page=1;
	}
	var ma_WindowInnerHTML = "<a name='popup_window_top" + window_num + "'></a><div id='image'><div id='imag' style='text-align:center'><img id='popup_image" + window_num+ "' src='" + img_filename + "' alt='"+  alt_text +"' /></div><div id='WinPager" + window_num + "' class='WinPager'><span id='WinPager_prev" + window_num + "'>&nbsp;</span><span id='WinPager_nombre" + window_num + "'></span><span id='WinPager_next" + window_num + "'>&nbsp;</span></div>";

	document.getElementById("contents_inner").innerHTML=ma_WindowInnerHTML;

	if(window_page!=0) {
		setTimeout("checkPages('" + myUrlOrg + "', "+ window_num+ ")",10);
	}

}

/**
 * @author matsuda
 * @param fn_filename popup filename
 *
 */
function openFootNote( fn_filename) {
	window_page=0;
	openPopupMain(fn_filename,"","");
}

/**
 * @author matsuda
 * @param myUrl image filename
 * @param myTitle window caption
 */
function openPopup(myUrl,myTitle){
	tmp_wait_count=0;
	var img_filename=image_path + myUrl;
	tmp_img=document.createElement('img');
	tmp_img.src=img_filename;
	setTimeout("openPopupCheckImage('"+ myUrl + "','"+ myTitle + "','" + myUrl + "')",50);
}

/**
 * @author matsuda
 * @param myUrl image filename
 * @param myTitle window caption
 */
function openPopupCheckImage(myUrl,myTitle,myUrlOrg){
	tmp_wait_count++;
	if(tmp_img.height!=0 && tmp_img.height!=30) {
		openPopupMain(myUrl,myTitle,myUrlOrg);
	} else {
		if(tmp_wait_count==30) {
			myUrl = myUrl.replace(/\.gif/,'_1.gif');
			tmp_img.src=image_path+myUrl;
			window_page=1;
		}
		var tmr=setTimeout("openPopupCheckImage('"+ myUrl + "','"+ myTitle + "','" + myUrlOrg + "')",50);
		if(tmp_wait_count>100) {
			clearTimeout(tmr);
			alert("file not found.");
		}
	}
}

/**
 * @author matsuda
 * @param myUrl image filename
 * @param myTitle window caption
 */
function openPopupMain(myUrl,myTitle,myUrlOrg){
	window_num ++;
	var width = 480, height = 300, spacing = 20;

	if(myTitle!="") {
		var img_filename='../img/contents/images/' + myUrl;
		var alt_text=myTitle;
		var width = 480, height = 500, spacing = 20;
		var img_width=tmp_img.width;
		var img_height=tmp_img.height;

		var tmp_obj=document.getElementById("pop");
		tmp_obj.style.visibility="hidden";
		tmp_obj.style.width="1000px";
		tmp_obj.style.width="";

		img_width=img_width+80;
	}

	var sc_pls=0;
	var winH= window.innerHeight;
	if(winH==undefined) {
		winH=window.screenTop;
		sc_pls=200
	}
	var winW= window.innerWidth;
	if(winW==undefined) {
		winW=document.body.clientWidth;
	}

	if(img_width>width) {
		if(img_width>winW) img_width=winW;
		width=img_width;
	}
	var sc=(winH/2)-(height/2);

	if(sc_pls==0) {
		var sc_top=scrollTop() +sc;
	} else {
		var sc_top=scrollTop() +sc_pls;
	}
	var sc_left=winW/2-width/2;

	if(1>sc_top) sc_top=1;

	if(myTitle!="") {
		var win = new Window("win" + window_num, {
			url: "../js/popup.html?img=" + myUrl + "&org="+ myUrlOrg + "&alt=" + encodeURI(myTitle) + "&num=" + window_num + "&pg=" + window_page,
			title: myTitle,
			className: "dialog",
			top: sc_top,
			left: sc_left,
			width: popup_image_window_width,
			height: height,
			zIndex: 100 + window_num,
			resizable: true,
			draggable:true
		});
	} else {
		var win = new Window("win" + window_num, {
			url: myUrl,
			title: "家庭の医学　保健同人社",
			className: "dialog",
			top: sc_top,
			left: sc_left,
			width: popup_foot_window_width,
			height: height,
			zIndex: 100 + window_num,
			resizable: true,
			draggable:true
		});
	}
	win.setDestroyOnClose();
	win.show();
	winobject[window_num]=win;
}

function checkPages(filename, win_num) {
	window_page_count=1;
	tmp_wait_count=0;
	if(filename.indexOf(".gif")!=-1) {
		var tmp_myUrl = filename.replace(/\.gif/,'_' + String(window_page_count) + '.gif');
	} else {
		if(filename.indexOf(".jpg")!=-1) {
			var tmp_myUrl = filename.replace(/\.jpg/,'_' + String(window_page_count) + '.jpg');
		}
	}
	delete tmp_img;
	tmp_img = new Object;
	tmp_img=document.createElement('img');
	tmp_img.src=image_path+tmp_myUrl;
	setTimeout("checkPageCount('" + filename + "', " + win_num + ")",50);
}

function checkPageCount(filename, win_num) {
	var doc=new Object;
	var doc_delim="";
	tmp_wait_count++;
	if(tmp_img.height!=0 && tmp_img.height!=30) {
		if(window_page_count==window_page) {
			if(window_page!=1) {
				document.getElementById('WinPager_prev' + win_num).innerHTML="<a class='WinPager_prev_page' href=\"#popup_window_top" + win_num + "\" onclick=\"javascript:window_change_page('" + filename + "'," + String(window_page_count - 1) + ", " + win_num + ")\">前へ</a>&nbsp;|&nbsp;";
			}
		}
		if(window_page_count==window_page+1) {
			document.getElementById('WinPager_next' + win_num).innerHTML="&nbsp;|&nbsp;<a class='WinPager_next_page' href=\"#popup_window_top" + win_num + "\" onclick=\"javascript:window_change_page('" + filename + "'," + String(window_page + 1) + ", " + win_num + ")\">次へ</a>";
		}
		if(window_page_count!=1) doc_delim= "&nbsp;|&nbsp;";

		doc=document.getElementById('WinPager_nombre' + win_num).innerHTML;
		if(window_page_count==window_page) {
			doc=doc + doc_delim + "&nbsp;" + String(window_page_count) + "&nbsp;";
		} else {
			doc=doc + doc_delim + "<a class='WinPager_nombre_page' href=\"#popup_window_top" + win_num + "\" onclick=\"javascript:window_change_page('" + filename + "'," + String(window_page_count) + ", " + win_num + ")\">&nbsp;" + String(window_page_count) + "&nbsp;</a>";
		}
		document.getElementById('WinPager_nombre' + win_num).innerHTML=doc;
		window_page_count++;
		tmp_wait_count=0;
		delete tmp_img;
		tmp_img = new Object;
		tmp_img=document.createElement('img');
		var tmp_myUrl = filename.replace(/\.gif/,'_' + String(window_page_count) + '.gif');
		tmp_img.src=image_path+tmp_myUrl;
		var tmr=setTimeout("checkPageCount('" + filename + "', "+win_num+")",50);
	}  else {
		var tmr=setTimeout("checkPageCount('" + filename + "', "+win_num+")",50);
		if(tmp_wait_count>100) {
			clearTimeout(tmr);
		}
	}

	if(window_page_count>20) {
			clearTimeout(tmr);
	}
}

function window_change_page(filename,w_page,win_num) {

	window_page=w_page;
	var tmp_myUrl = filename.replace(/\.gif/,'_' + String(window_page) + '.gif');
	var obj=document.getElementById("popup_image"+ win_num);
	obj.src=image_path+tmp_myUrl;
	document.getElementById("WinPager"+ win_num).innerHTML="<span id='WinPager_prev" + win_num +"'>&nbsp;</span><span id='WinPager_nombre" + win_num +"'></span><span id='WinPager_next" + win_num +"'>&nbsp;</span>";
	checkPages(filename , win_num);
}

/**
 * @author matsuda
 * @param p close UI window object
 */
function closePopup(p) {
	winobject[p].close();
}

/**
 * @author ishiwata
 * @param e event object
 * @param msg popup caption
 * @param img image filename
 */
function sp (e, msg, img) {
	if(!document.getElementById) return;
	var obj = document.getElementById("pop");
	//var obj = "<div class='pop'></div>"
	var x = e.clientX + scrollLeft();
	var y = e.clientY + scrollTop();
	if(img == ''){
		obj.innerHTML = msg;
	}else{
		obj.innerHTML = msg + "<img src='../img/contents/thumbs/" + img + "' width=240>";
	}
	if((x - 60 ) <= 450){obj.style.left = (x - 60) + "px";}
	else				{obj.style.left =   450    + "px";}
	obj.style.top  = (y + 12) + "px";
	obj.style.visibility = "visible";
}

/**
 * @author ishiwata
 */
function cp () {
	if(!document.getElementById) return;
	var obj = document.getElementById("pop");
	obj.style.visibility = "hidden";
}

/**
 * @author ishiwata
 * @return window position
 */
function scrollLeft () {
	if(window.pageXOffset)					{return window.pageXOffset;}
	if(document.compatMode == "CSS1Compat")	{return document.body.parentNode.scrollLeft;}
	if(document.body.scrollLeft)			{return document.body.scrollLeft;}
	return 0;
}

/**
 * @author ishiwata
 * @return window position
 */
function scrollTop () {
	if(window.pageYOffset)					{return window.pageYOffset;}
	if(document.compatMode == "CSS1Compat")	{return document.body.parentNode.scrollTop;}
	if(document.body.scrollTop)				{return document.body.scrollTop;}
	return 0;
}
