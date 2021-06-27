let SHIBA = [
	"NHKマイルカップ",
	"ヴィクトリアマイル",
	"エリザベス女王杯",
	"オークス",
	"ジャパンカップ",
	"スプリンターズステークス",
	"ホープフルステークス",
	"マイルチャンピオンシップ",
	"安田記念",
	"菊花賞",
	"高松宮記念",
	"阪神ジュベナイルフィリーズ",
	"桜花賞",
	"皐月賞",
	"秋華賞",
	"大阪杯",
	"朝日杯",
	"天皇賞秋",
	"天皇賞春",
	"日本ダービー",
	"宝塚記念",
	"有馬記念"
];
let DIRT = [
	"JBCクラシック",
	"JBCスプリント",
	"JBCレディスクラシック",
	"帝王賞",
	"東京大賞典",
	"フェブラリーステークス",
	"チャンピオンカップ",
	"ジャパンダートダービー"
];
let LIST = SHIBA.concat(DIRT);

function init() {
	LIST.forEach((item)=> {
		$('#roulette_list1').append(`<img id="id_${item}" src="img/${item}.PNG" class="roulette"/>`);
	})
	SHIBA.forEach((item)=> {
		$('#roulette_list2').append(`<img id="id_${item}" src="img/${item}.PNG" class="roulette"/>`);
	})
	DIRT.forEach((item)=> {
		$('#roulette_list3').append(`<img id="id_${item}" src="img/${item}.PNG" class="roulette"/>`);
	})
}
// 表示モード
const MODE_ALL		= 1;
const MODE_SHIBA	= 2;
const MODE_DIRT		= 3;
let mode = MODE_ALL;
jQuery(()=> {
	// ルーレット設定
	let option = {
		speed : 10,
		duration : 1,
		stopImageNumber : -1,
	}

	// initialize!
	init();
	$('#roulette_list1').roulette(option);
	$('#roulette_list2').roulette(option);
	$('#roulette_list3').roulette(option);
	// // START!
	$('.start').click(()=> {
		// ルーレット開始
		$(`#roulette_list${mode}`).roulette('start');
		// フクキタル演出
		$(`#id_gif_hukukitaru`).hide();
		$(`#id_video_hukukitaru`).show();
		let video = $(`#id_video_hukukitaru`).get(0);
		if(video) video.play();
		$("#id_img_hukidashi").attr('src', 'img/吹き出し2.png');
		
		// ボタン連打回避
		$('.start').prop('disabled', true);
		// 停止処理
		setTimeout(()=> {
			$(`#id_gif_hukukitaru`).show();
			$(`#id_video_hukukitaru`).hide();
			$("#id_img_hukidashi").attr('src', 'img/吹き出し3.png');
			$(`#roulette_list${mode}`).roulette('stop');
		}, 7 * 1000);
		// 吹き出し変更
		setTimeout(()=> {
			$("#id_img_hukidashi").attr('src', 'img/吹き出し1.png');
			$('.start').prop('disabled', false);
		}, 10 * 1000);
	});
	// STOP!
	$('.stop').click(()=> {
		$(`#roulette_list${mode}`).roulette('stop');	
	});
	// 全レース
	$('#item-1').click(()=>  {
		mode = MODE_ALL;
		$('#roulette_list1').css('display', '');
		$('#roulette_list2').css('display', 'none');
		$('#roulette_list3').css('display', 'none');
		$('div.container').addClass('background-all');
		$('div.container').removeClass('background-shiba');
		$('div.container').removeClass('background-dirt');
	});
	// 芝のみ
	$('#item-2').click(()=>  {
		mode = MODE_SHIBA;
		$('#roulette_list1').css('display', 'none');
		$('#roulette_list2').css('display', '');
		$('#roulette_list3').css('display', 'none');
		$('div.container').removeClass('background-all');
		$('div.container').addClass('background-shiba');
		$('div.container').removeClass('background-dirt');
	});
	// ダートのみ
	$('#item-3').click(()=>  {
		mode = MODE_DIRT;
		$('#roulette_list1').css('display', 'none');
		$('#roulette_list2').css('display', 'none');
		$('#roulette_list3').css('display', '');
		$('div.container').removeClass('background-all');
		$('div.container').removeClass('background-shiba');
		$('div.container').addClass('background-dirt');
	});
});
