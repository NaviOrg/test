<?php

/*
|--------------------------------------------------------------------------
| Laravelクラスローダーの登録
|--------------------------------------------------------------------------
|
| Composerを使用することに加え、コントローラーとモデルをロードするために
| Laravelのクラスローダーを使用することもできます。Composerを更新しなくても
| 「グローバル」な名前空間にあなたのクラスを設置しておくのに便利です。
|
*/

ClassLoader::addDirectories(array(

	app_path().'/commands',
	app_path().'/controllers',
	app_path().'/models',
	app_path().'/database/seeds',

));

/*
|--------------------------------------------------------------------------
| アプリケーションエラーログ
|--------------------------------------------------------------------------
|
| 素晴らしいMonologライブラリーの上に構築されたアプリケーションのために
| ここではエラーログの設定を行なっています。デフォルトでは、一つの
| 基本的なログファイルを作成し、使用します。
|
*/

Log::useFiles(storage_path().'/logs/laravel.log');

/*
|--------------------------------------------------------------------------
| アプリケーションエラーハンドラー
|--------------------------------------------------------------------------
|
| ここではアプリケーションでエラーが発生した場合の、エラーの処理（ログしたり、
| カスタムビューで特定のエラーを表示したりするなどを含む）を定義します。
| 異なったタイプの例外を処理するために多くのエラーハンドラーを登録することも
| できます。もし、何もリターンしなれば、デフォルトのエラービューが表示され、
| それにはデバッグ中であれば詳細なスタックトレースも含まれます。
|
*/

App::error(function(Exception $exception, $code)
{
	Log::error($exception);
});

/*
|--------------------------------------------------------------------------
| メンテナンスモードハンドラー
|--------------------------------------------------------------------------
|
| Artisanコマンドの"down"でメンテナンスモードにすることができます。
| このアプリケーションにふさわしいメンテナンスモードでの
| 表示をここで定義してください。
|
*/

App::down(function()
{
	return Response::make("Be right back!", 503);
});

/*
|--------------------------------------------------------------------------
| フィルターファイルの読み込み
|--------------------------------------------------------------------------
|
| 以下でアプリケーションのフィルターファイルを読み込んでいます。
| これによりルートとフィルターを同じルーティングファイルに押しこまずに
| 分けて保存できるようになりました。
|
*/

require app_path().'/filters.php';

//	Log4PHPプロパティファイル読み込み
Logger::configure(__DIR__.'/../config/log4php.properties');
//	Logger
$logger = Logger::getLogger("www");
//	Logger
$loggerDB = Logger::getLogger("db");
//	Logger
$sqllogger = Logger::getLogger("sql");

Event::listen( 'illuminate.query',
function( $query, $bindings, $time, $name ) use( $sqllogger )
{
	//	$data = compact( 'bindings', 'time', 'name' );

	// Format binding data for sql insertion
	foreach( $bindings as $i => $binding )
	{
		if( $binding instanceof \DateTime )
		{
			$bindings[$i] = $binding->format( '\'Y-m-d H:i:s\'' );
		}
		else if( is_string( $binding ) )
		{
			$bindings[$i] = "'$binding'";
		}
	}

	// Insert bindings into query
	$query = str_replace( array( '%', '?' ), array( '%%', '%s' ), $query );
	$query = vsprintf( $query, $bindings );

	$sqllogger->info( 'SQL=['.$query.'] TIME=['.$time.']' );
} );


