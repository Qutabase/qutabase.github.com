function kinput(value) {
	document.getElementById(zoneid + value).innerHTML = eval('dex.' + value);
}

Jskill	=	JSON.parse(
				getJson("https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/skill.json")
			);
Jeffect	=	JSON.parse(
				getJson("https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/effect.json")
			);

kodex_slot	=	{
	'vsT_':''
,	'vsB_':''
};

function vsCheck(argument) {

	inp		= 	argument;
	zoneid	=	inp.id.substr(0,4);
	if (window.event.keyCode == 13 && inp.id == zoneid + 'input') {

		kodex_slot[zoneid]	=	eval(zoneid	+	'input.value');
		vsSearch(kodex_slot[zoneid]);
		return;

	}
	else if (inp.id == zoneid + 'bind') {
		vsSearch(kodex_slot[zoneid]);
		return;
	}
	else if (inp.id == zoneid + 'input' && inp.value != '') {
		showVsExmpl(inp.value);
	}
	else if (inp.id == zoneid + 'input' && inp.value == '' && window.event.keyCode == 8) {
		document.getElementById('kodex_vsExmpl').setAttribute('style', 'display: none;');
	}

}

rarity = {
	'N':'1'
,	'N+':'2'
,	'R':'3'
,	'R+':'4'
,	'SR':'5'
,	'SR+':'6'
,	'SSR':'7'
,	'QR':'8'
}

role = {
	'공격':'atk'
,	'방어':'hp'
,	'회복':'spr'
}

function vsSearch(srch) {

	dex = eval("Jdex['" + srch + "']");

	if (dex != undefined) {

		if (srch.indexOf('®마법소녀 팥쥐') != -1) {
			;
		}
		else if (srch.indexOf('® ') != -1) {
			temp = srch.substring(2);
			dex = eval("Jdex['" + temp + "']");
		}
		else if (srch.indexOf('®') != -1) {
			temp = srch.substring(1);
			dex = eval("Jdex['" + temp + "']");
		}
		document.getElementById(zoneid + 'face').setAttribute('src'
				,	encodeURI(
						'https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/Kodex/'
						+	role[dex.role]		+	'/'
						+	dex.enskill			+	'/'
						+	rarity[dex.rarity]	+	'/'
						+	dex.id				+	'/raw.png'
					)
		);
		dex = eval("Jdex['" + srch + "']");

		document.getElementById(zoneid + 'face').setAttribute('onclick'
				,	'location.href = "https://qutabase.github.io/?kodexName='
					+	encodeURI(dex.name)
					+	'"'
		);
		kinput('rarity');
		kinput('name');
		document.getElementById(zoneid + 'rarity').setAttribute('style'
				, 'color: ' + dex.rarefont	+ '; background: ' + dex.rareColor + ';'
		);
		document.getElementById(zoneid + 'name').setAttribute('style'
				, 'color: ' + dex.rarefont	+ '; background: ' + dex.rareColor + ';'
		);
		document.getElementById(zoneid + 'name').setAttribute('onclick'
			, "this.innerHTML='<input type=\"text\" onkeyup=\"vsCheck(this)\" id=\""
				+	zoneid
				+	"input\" class=\"info_input\">';this.onclick=''"
		);
		document.getElementById(zoneid + 'skill').setAttribute('style', 'background: ' + dex.roleColor + ';');
		document.getElementById(zoneid + 'skill').setAttribute('onclick'
			, 'location.href="../skill/' + role[dex.role] + '.html?skillName=' + dex.skill.substring(0, 2) + '"'
		);
		kinput('skill');

		var	bind	=	document.getElementById(zoneid + 'bind').value;
		document.getElementById(zoneid + 'HP').innerHTML	=	dex.HP[bind];
		document.getElementById(zoneid + 'ATK').innerHTML	=	dex.ATK[bind];
		document.getElementById(zoneid + 'SPR').innerHTML	=	dex.SPR[bind];

		if (bind > 6) {
			document.getElementById(zoneid + 'HP').innerHTML	=	dex.HP[6];
			document.getElementById(zoneid + 'ATK').innerHTML	=	dex.ATK[6];
			document.getElementById(zoneid + 'SPR').innerHTML	=	dex.SPR[6];
			bind	=	6;
		}
		else if (dex.HP[bind] == undefined) {
			document.getElementById(zoneid + 'HP').innerHTML	=	dex.HP[0];
			document.getElementById(zoneid + 'ATK').innerHTML	=	dex.ATK[0];
			document.getElementById(zoneid + 'SPR').innerHTML	=	dex.SPR[0];
			bind	=	0;
		}

		var	sd				=	['S','D'];
		sd.id 				=	'lea';
		var	effect			=	skill(dex, sd, bind).data;
		var	ef				=	document.getElementById(zoneid + 'effect');
		ef.parentElement.style.background	=	dex.roleColor;
		ef.innerHTML		=	'';
		for (var i = 1; i < effect.val.length; i++) {
			ef.innerHTML	+=	effect.desc[i]	+	''	+	effect.val[i]	+	'<br>';
		}

		var w = new Worker("worker.js");
		w.postMessage(dex.skill.substr(0,2));
		w.onmessage = function (event) {

			var ex_list	=	event.data;
			var ul			=	document.getElementById('list_main');
			ul.innerHTML	=	'';

			for (var i = 1; i < ex_list[0]; i++) {
				var	dex			=	eval("Jdex['" + ex_list[i] + "']");
				var	value		=	skill(dex, sd, 0).data;
				ul.innerHTML	=	ul.innerHTML
								+	'<div class="list_kodex"><div><a href="?"><img src="https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/Kodex/'
								+	role[dex.role]		+	'/'
								+	dex.enskill			+	'/'
								+	rarity[dex.rarity]	+	'/'
								+	dex.id				+	'/small.png" class="list_img"></a></div><div class="list_rarity">'
								+	dex.rarity			+	'</div><div class="list_name">'
								+	dex.name			+	'</div><div class="list_value">'
								+	value.val.slice(1);	+	'</div></div>'
								;

			}

			w.terminate();

		}



	}
	try {
		inp.value = '';
		document.getElementById('kodex_vsExmpl').setAttribute('style', 'display: none;');
	}
	catch (exception){
		;
	}
	document.getElementsByTagName('article')[0].setAttribute("style", "display: inline-block;")

}

function showVsExmpl(argument) {
	rarity = {
		'N':'1',
		'N+':'2',
		'R':'3',
		'R+':'4',
		'SR':'5',
		'SR+':'6',
		'SSR':'7',
		'QR':'8'
	}

	var w = new Worker("https://qutabase.github.io/worker.js")
	w.postMessage(inp.value)
	w.onmessage = function (event) {
		ex_list = event.data;
		ul = document.getElementById('kodex_vsExmpl');
		ul.setAttribute('style'
				,	'left: ' + inp.offsetLeft
					+	'px; top: ' + eval(inp.offsetTop + 40)
					+	'px; display: block;'
		);
		ul.innerHTML = '';
		var i = 1;
		for (i = 1; i <= ex_list[0]; i++) {

			if (ex_list[i] != undefined) {
				dex = eval("Jdex['" + ex_list[i] + "']");
				ul.innerHTML = ul.innerHTML + "<li onclick='vsSearch(\""+ex_list[i]+"\")'>"+dex.rarity +"	"+ ex_list[i]+"</li>"
			}

		}
		if (i == 1) {
			document.getElementById('kodex_vsExmpl').setAttribute('style'
				,	'left: ' + inp.offsetLeft
					+	'px; top: ' + eval(inp.offsetTop + 40)
					+	'px; display: none;'
			);
		}
		w.terminate();
	}

}