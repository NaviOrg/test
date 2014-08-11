<?php

/*
|--------------------------------------------------------------------------
| アプリケーションルート
|--------------------------------------------------------------------------
|
| このファイルでアプリケーションの全ルートを定義します。
| 方法は簡単です。対応するURIをLaravelに指定してください。
| そしてそのURIに対応する実行コードをクロージャーで指定します。
|
*/

Route::controller('/','HomeController');

Route::get('main',array('as'=>'main',function() //最初のloginが
{
	return View::make('main');
	//	return Redirect::to('login');
}));
