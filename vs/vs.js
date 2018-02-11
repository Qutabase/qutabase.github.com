function kinput(value) {
	document.getElementById('kodex_' + zoneid + value).innerHTML = eval('dex.' + value);
}

Jskill	=	JSON.parse(
				getJson("https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/skill.json")
			);
Jeffect	=	JSON.parse(
				getJson("https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/effect.json")
			);

function vsCheck(argument) {

	inp = argument;
	zoneid = inp.parentElement.parentElement.id.substr(6,2) + '_';
	if (window.event.keyCode == 13) {

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
	'N':'1',
	'N+':'2',
	'R':'3',
	'R+':'4',
	'SR':'5',
	'SR+':'6',
	'SSR':'7',
	'QR':'8'
}

role = {
	'공격':'atk',
	'방어':'hp',
	'회복':'spr'
}

function vsSearch(srch) {
	
	dex = eval("Jdex['" + srch + "']");

	if (dex != undefined) {

		if (srch.indexOf('® ') != -1) {
			temp = srch.substring(2);
			dex = eval("Jdex['" + temp + "']");
		}
		else if (srch.indexOf('®') != -1) {
			temp = srch.substring(1);
			dex = eval("Jdex['" + temp + "']");
		}
		document.getElementById('kodex_'+zoneid+'face').setAttribute('src'
				,	encodeURI(
						'https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/Kodex/'
						+	role[dex.role]		+	'/'
						+	dex.enskill			+	'/'
						+	rarity[dex.rarity]	+	'/'
						+	dex.id				+	'/raw.png'
					)
		);
		document.getElementById('kodex_'+zoneid+'link').setAttribute('href', 'https://qutabase.github.io/?kodexName=' + encodeURI(dex.name));
		metaMake("title", "QUTABASE - " + dex.name)
		dex = eval("Jdex['" + srch + "']");
		document.getElementById('kodex_' + zoneid + 'rarity_m').innerHTML	=	dex.rarity;
		document.getElementById('kodex_' + zoneid + 'name_m').innerHTML		=	dex.name;
		document.getElementById('kodex_' + zoneid + 'cost_m').innerHTML		=	dex.cost;
		document.getElementById('kodex_' + zoneid + 'rarity_m').setAttribute('style'
				, 'color: ' + dex.rarefont + '; background: ' + dex.rareColor + ';'
		);
		document.getElementById('kodex_' + zoneid + 'name_m').setAttribute('style'
				, 'color: ' + dex.rarefont + '; background: ' + dex.rareColor + ';'
		);
		document.getElementById('kodex_' + zoneid + 'name_m').setAttribute('onclick'
			, "this.innerHTML='<input type=\"text\" class=\"kodex_vs_inp\" onkeyup=\"vsCheck(this)\" id=\"kodex_vsTName\">';this.onclick=''"
		);
		document.getElementById('kodex_' + zoneid + 'skill').setAttribute('style', 'background: ' + dex.roleColor + ';');
		document.getElementById('kodex_' + zoneid + 'skill').setAttribute('onclick'
			, 'location.href="../skill/' + role[dex.role] + '.html?skillName=' + dex.skill.substring(0, 2) + '"'
		);
		kinput('skill');
		kinput('hp0');
		kinput('atk0');
		kinput('spr0');
		for (var i = 0; i < 7; i++) {
			document.getElementById('kodex_' + zoneid + 'HP_' + i).innerHTML	= dex.HP[i];
			document.getElementById('kodex_' + zoneid + 'ATK_' + i).innerHTML	= dex.ATK[i];
			document.getElementById('kodex_' + zoneid + 'SPR_'+i).innerHTML		= dex.SPR[i];
		}

	}
	try {
		inp.value = '';
		document.getElementById('kodex_vsExmpl').setAttribute('style', 'display: none;')
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
		ul.setAttribute('style', 'left: '+inp.offsetLeft+'px; top: '+eval(inp.offsetTop+30)+'px; display: block;');
		ul.innerHTML = '';
		var i = 1;
		for (i = 1; i <= ex_list[0]; i++) {

			if (ex_list[i] != undefined) {
				dex = eval("Jdex['" + ex_list[i] + "']");
				ul.innerHTML = ul.innerHTML + "<li onclick='vsSearch(\""+ex_list[i]+"\")'>"+dex.rarity +"	"+ ex_list[i]+"</li>"
			}

		}
		if (i == 1) {
			document.getElementById('kodex_exmpl').setAttribute('style'
				, 'left: '+inp.offsetLeft+'px; top: '+eval(inp.offsetTop+30)+'px; display: none;'
			);
		}
		if (zoneid == 'vsT_') {
			ul.setAttribute('style', 'position: absolute; left: '+inp.offsetLeft+'px; top: '+eval(inp.offsetTop+30)+'px; display: block;');
		}
		else {
			ul.setAttribute('style', 'position: absolute; left: 272px; top: '+eval(478+(272-ul.offsetHeight))+'px; display: block;');
		}
		w.terminate();
	}

}