@section('aaa')


<title>Web家庭の医学 | 病気や症状の詳しいWeb解説書</title>

</head>

<body id="index">

<div id="header">
	<p id="branding"><a title="Web家庭の医学" href="index.html">Web家庭の医学</a></p>

	<ul id="search">
		<li><a title="キーワード検索">キーワード検索</a></li>
	</ul>

	<ul id="nav-section">
		<li id="byoki"><a title="" href="{{ URL::to('main') }}">病気の知識</a></li>
		<li id="shojo"><a title="" href="bu1/01_shojo.html">症状とセルフケア</a></li>
		<li id="kyukyu"><a title="" href="bu1/01_kyukyu.html">救命処置と応急手当</a></li>
		<li id="seikatsu"><a title="" href="bu3/01_seikatsu.html">健康な生活のために</a></li>
		<li id="ishi"><a title="" href="bu1/01_ishi.html">医師の選び方・かかり方</a></li>
	</ul>
	<ol id="bread-crumb">
		<li><a class="active" title="" href="index.html">ホーム</a></li>
	</ol>
</div>

<div id="content">
	<div id="content-main">
		<h2>病気についてくわしく説明したWeb医学書です</h2>
		<div id="topimage"><img src="./img/topimage.jpg" alt="Web家庭の医学イメージ画像" /></div>
		<div id="toptext">
			<p>医学、医療は日々進歩しています。他方、メディアも進化し多様化しながら、暮らしに不可欠なものとなってきました。こうした現代にあって、わたしたちの医療行動も変化しようとしています。例えば、受診するとき、パソコンや携帯電話などでさまざまな医療・健康サイトを検索し、情報を入手して、という人が増えています。<br />
このサイトは、そうした皆さまが、自分がどういう病気なのか知りたい、治療法を選択するときの判断材料がほしい、医者にかかるべきか迷っている、といった医療情報を入手したいと思ったときに役立てていただきたい「家庭の医学事典」です。
本サイトが、皆さまの健康な生活のために大いに役立つことを心から願っています。</p>
			<p>株式会社保健同人社</p>
		</div>
	</div>
</div>
@stop
