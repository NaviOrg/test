<?php
class HomeController extends BaseController {
	//コンストラクター
	public function __construct()
	{
		$log = Logger::getLogger("www");
		$log->info('コンストラクター');
	}
 	//トップページ
	public function getIndex()
	{
		$log = Logger::getLogger("www");
		$log->info('index');
		return View::make('home');
	}
}
