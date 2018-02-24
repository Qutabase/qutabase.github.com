function kinput(value) {
	document.getElementById('info_' + value).innerHTML = eval('dex.' + value);
}

Jskill	=	JSON.parse(
				getJson("https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/skill.json")
			);
Jeffect	=	JSON.parse(
				getJson("https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/effect.json")
			);

function vsCheck(argument) {

	inp = argument;
	if (window.event.keyCode == 13) {

		if (inp.id == 'info_bind') {
			vsSearch(document.getElementById('info_name'));
			return;
		}
		vsSearch(inp.value);
		return;

	}
	else if (inp.value != '') {
		showVsExmpl(inp.value);
	}
	else if (inp.value == '' && window.event.keyCode == 8) {
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
		document.getElementById('info_face').setAttribute('src'
				,	encodeURI(
						'https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/Kodex/'
						+	role[dex.role]		+	'/'
						+	dex.enskill			+	'/'
						+	rarity[dex.rarity]	+	'/'
						+	dex.id				+	'/raw.png'
					)
		);
		dex = eval("Jdex['" + srch + "']");
		document.getElementById('info_link').setAttribute('href', 'https://qutabase.github.io/?kodexName=' + encodeURI(dex.name));
		metaMake("title", "QUTABASE - " + dex.name)
		kinput('rarity');
		kinput('name');
		document.getElementById('info_rarity').setAttribute('style'
				, 'color: ' + dex.rarefont	+ '; background: ' + dex.rareColor + ';'
		);
		document.getElementById('info_name').setAttribute('style'
				, 'color: ' + dex.rarefont	+ '; background: ' + dex.rareColor + ';'
		);
		document.getElementById('info_name').setAttribute('onclick'
			, "this.innerHTML='<input type=\"text\" onkeyup=\"vsCheck(this)\" id=\"info_input\">';this.onclick=''"
		);
		document.getElementById('info_skill').setAttribute('style', 'background: ' + dex.roleColor + ';');
		document.getElementById('info_skill').setAttribute('onclick'
			, 'location.href="../skill/' + role[dex.role] + '.html?skillName=' + dex.skill.substring(0, 2) + '"'
		);
		kinput('skill');

		var	bind	=	document.getElementById('info_bind').value;
		document.getElementById('info_HP').innerHTML	=	dex.HP[bind];
		document.getElementById('info_ATK').innerHTML	=	dex.ATK[bind];
		document.getElementById('info_SPR').innerHTML	=	dex.SPR[bind];

		var w = new Worker("worker.js");
		w.postMessage(dex.skill.substr(0,2));
		w.onmessage = function (event) {

			var ex_list	=	event.data;
			var ul			=	document.getElementById('list_main');
			ul.innerHTML	=	'';

			for (var i = 1; i < ex_list[0]; i++) {
				var	dex			=	eval("Jdex['" + ex_list[i] + "']");
				var	value		=	skill(dex.skill, ['S', 'D'], dex);
				ul.innerHTML	=	ul.innerHTML
								+	'<div class="list_kodex"><div><a href="?"><img src="https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/Kodex/'
								+	role[dex.role]				+	'/'
								+	dex.enskill					+	'/'
								+	rarity[dex.rarity]			+	'/'
								+	dex.id						+	'/small.png" class="list_img"></a></div><div class="list_rarity">'
								+	dex.rarity					+	'</div><div class="list_name">'
								+	dex.name					+	'</div><div class="list_value">'
								+	value.data.val.slice(1);	+	'</div></div>'
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