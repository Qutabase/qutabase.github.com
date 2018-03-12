/* simul.js - JAVASCRIPT FILE FOR KODEX SIMULATOR
* CREATED BY SN KINOS 2018-01-
* UPDATE:
* 1.	2018-01-26. SN KINOS.	MODIFIED	simSearch
*/
function kinput(value) {
	document.getElementById(zoneid + value).innerHTML = eval('dex.' + value);
}

kodex_slot = {
	'ac1_':''
,	'ac2_':''
,	'ac3_':''
,	'ac4_':''
,	'ac5_':''

,	'pa1_':''
,	'pa2_':''
,	'pa3_':''
,	'pa4_':''
,	'pa5_':''
};

function simCheck(argument) {

	inp		=	argument;
	zoneid	=	inp.id.substr(0,4);

	if (window.event.keyCode == 13 && inp.id == zoneid + 'name_inp') {

		kodex_slot[zoneid]	=	eval(zoneid	+	'name_inp.value');
		simSearch(kodex_slot[zoneid]);
		eval(zoneid	+	'_lv.focus();');
		return;

	}
	else if (inp.id == zoneid + 'lv' || inp.id == zoneid + 'bind') {
		simSearch(kodex_slot[zoneid]);
		return;
	}
	else if (inp.id == zoneid + 'name_inp' && inp.value != '') {
		showSimExmpl(inp.value);
	}
	else if (inp.id == zoneid + 'name_inp' && inp.value == '' && window.event.keyCode == 8) {
		document.getElementById('kodex_simExmpl').setAttribute('style', 'display: none;');		
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
};

bind = {
	'bind':'0.5 0.5 0.6 0.6 0.7 0.8 0.9 0.8'
,	'N':0.05
,	'N+':0.05
,	'R':0.06
,	'R+':0.06
,	'SR':0.07
,	'SR+':0.08
,	'SSR':0.09
,	'QR':0.08
};

function renewal(argument) {
	for (x in kodex_slot) {
		if (kodex_slot[x] != '' && x != argument) {
			zoneid = x;
			simSearch(kodex_slot[x]);
		}
	}
}

/*
* simsearch(srch) - KODEX SEARCHING ON KODEX SIMULATOR: 2018-01-26. SN KINOS
* UPDATE:
* 1.	2018-01-26. SN KINOS.
* 2.		-01-28. SN KINOS.
* 2.		-02-12. SN KINOS.
* 2.		-02-25. SN KINOS.
* 2.		-03-12. SN KINOS.
*/
function simSearch(srch) {
/* 2018-02-25. SN KINOS	CHANGED FROM:
	kodex_slot[zoneid]	=	srch;
	dex = eval("Jdex['" + srch + "']");
*/
	if (srch.substr(0,3) == ('아르콘') || srch.substr(0,3) == '고양이') {
		kodex_slot[zoneid]	=	srch;
	}
	else if (srch.substr(0,2) in eng.skill) {
		for (var x in Jdex) {
			if (Jdex[x].skill.substr(0,2) == srch.substr(0,2)) {
				kodex_slot[zoneid]	=	Jdex[x].name;
				break;
			}
		}
	}
	else {
		kodex_slot[zoneid]	=	srch;
	}

	dex	=	eval("Jdex['" + kodex_slot[zoneid] + "']");
// 2018-02-25. SN KINOS.	END.
	if (dex != undefined) {

		if (srch.indexOf('® ') != -1) {	//2018-01-26. STARFLIT: srch.indexOf('(R) ')
			temp	=	srch.substring(2);
			dex		=	eval("Jdex['" + temp + "']");
		}
		else if (srch.indexOf('®') != -1) {
			temp	=	srch.substring(1);
			dex		=	eval("Jdex['" + temp + "']");
		}
		
		if (zoneid == 'ac1_') {
			document.getElementById('simul_index_role').innerHTML		= dex.role;
			document.getElementById('simul_index_roleImg').setAttribute('src', role[dex.role] + '.png');
			document.getElementById('simul_index_roleDesc').innerHTML	= "덱 전체 "	+	desc[dex.role]	+ " 증가<br>"
																		+	dex.role	+	" 계열 스킬 강화";
//	2018-02-12. SN KINOS ADDED SIMULATOR RENEWALLER
			renewal('ac1_');
			zoneid	=	'ac1_';
			dex = eval("Jdex['" + kodex_slot[zoneid] + "']");
//	2018-02-12. SN KINOS END.

		}

		document.getElementById(zoneid + 'img').setAttribute('src'
			,	encodeURI(	'https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/Kodex/'
						+	role[dex.role]		+	'/'
						+	dex.enskill			+	'/'
						+	rarity[dex.rarity]	+	'/'
						+	dex.id				+	'/small.png'
				)
		);
		document.getElementById(zoneid + 'img').setAttribute('onclick'
				, 'location.href = "https://qutabase.github.io/?kodexName='
					+	encodeURIComponent(dex.name)
					+	'"'
		);

		dex = eval("Jdex['" + kodex_slot[zoneid] + "']");
		kinput('name');
		document.getElementById(zoneid + 'name').setAttribute('style',
				'color: '	+	dex.rarefont	+	'; background: '	+	dex.rareColor	+	';'
		);
		document.getElementById(zoneid + 'name').setAttribute(
				'onclick'
			,	"this.innerHTML='<input type=\"text\" class=\"kodex_sim_inp\" onkeyup=\"simCheck(this)\" id=\""
					+	zoneid
					+	"name_inp\">';this.onclick='';eval(\""
					+	zoneid
					+	"name_inp.focus();\")"
		);
		//	18-01-28 MODIFIED FROM:
		// document.getElementById(zoneid + 'skill').setAttribute('onmouseover'
		// 	,	"this.innerHTML = "
		// 		+ Math.floor(Jskill[dex.skill].static) * Math.floor(document.getElementById(zoneid + role[dex.role]).innerHTML * 1.3)
		// );
		// document.getElementById(zoneid + 'skill').setAttribute('onmouseout', "this.innerHTML = '" + dex.skill + "'");
		//	TO:
		document.getElementById(zoneid + 'skill').setAttribute('style'
				,	'background: '	+	dex.roleColor
					+	'; cursor: pointer;'
		);
		document.getElementById(zoneid + 'skill').setAttribute('onclick'
				,	'location.href = "../skill/'
					+	role[dex.role] + '.html?skillName='
					+	encodeURIComponent(dex.skill.substr(0,2))
					+	'"'
		);
		kinput('skill');

		var	val_lv	=	eval(zoneid + 'lv.value');
		if (val_lv > 130) {
			val_lv	=	130;
		}
		else if (val_lv > 0) {
			;
		}
		else {
			val_lv	=	dex.lv;
		}
		eval(zoneid + 'lv.value	=	val_lv');

		var	val_bind	=	eval(zoneid + 'bind.value');
		if (val_bind > 6) {
			val_bind	=	6;
		}
		else if (dex.HP[val_bind] == undefined) {
			val_bind	=	0;
		}
		eval(zoneid + 'bind.value	=	val_bind');

		document.getElementById(zoneid + 'hp').innerHTML =	Math.round(
																	Math.floor(
																			dex.hp0
																		+	dex.hpLv	*	(val_lv - 1)
																	)	*	( 1 + val_bind * bind[dex.rarity] )
																);
		document.getElementById(zoneid + 'atk').innerHTML	=	Math.round(
																	Math.floor(
																			dex.atk0 
																		+	dex.atkLv	*	(val_lv - 1)
																	)	*	( 1 + val_bind * bind[dex.rarity] )
																);
		document.getElementById(zoneid + 'spr').innerHTML	=	Math.floor( 
																	( Number(eval(zoneid + 'hp.innerHTML')) 
																	+ Number(eval(zoneid + 'atk.innerHTML')) 
																	) / 2 
																);

		var sum_atk	=	0;
		var sum_hp		=	0;
		var sum_spr	=	0;

		for (key in kodex_slot) {
			sum_atk	+=	Number(	eval(	key +	'atk.innerHTML'	)	);
			sum_hp	+=	Number(	eval(	key +	'hp.innerHTML'	)	);
			sum_spr	+=	Number(	eval(	key +	'spr.innerHTML'	)	);
		}
		document.getElementById('deck_atk').innerHTML	=	sum_atk;
		document.getElementById('deck_hp').innerHTML	=	sum_hp;
		document.getElementById('deck_spr').innerHTML	=	sum_spr;

		var	sd		=	[];
		if (document.getElementById('simul_index_role').innerHTML == dex.role) {
			sd 	=	['S','D'];
			sd.id	=	'lea';
		}
		else {
			sd		=	['s','d'];
		}
		var	effect			=	skill(dex, sd, val_lv, val_bind).data;
		var	ef				=	document.getElementById(zoneid + 'effect');
		ef.style.background	=	dex.roleColor;
		ef.innerHTML		=	'';
		var	effecPerc		=	0;
		for (var i = 1; i < effect.val.length; i++) {
			ef.innerHTML	+=	(effect.desc[i])
								?
								effect.desc[i]	+	effect.val[i]	+	'; '
								:
								effect.val[i]	+	' '
								;
			effecPerc		=	effect.val[i].toString().indexOf('%');
			if (effecPerc + 1) {
				effect.val[i]	=	effect.val[i].toString().substr(0, effecPerc);
			}
		}

	}

	document.getElementById('kodex_simExmpl').setAttribute('style', 'display: none;')
	document.getElementsByTagName('article')[0].setAttribute("style", "display: inline-block;")

}

function showSimExmpl(argument) {
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

	var w = new Worker("https://qutabase.github.io/worker.js")
	w.postMessage(inp.value)
	w.onmessage = function (event) {

		ex_list = event.data;
		ul = document.getElementById('kodex_simExmpl');
		ul.setAttribute('style', 'left: ' + inp.offsetLeft + 'px; top: ' + eval(inp.offsetTop + 40) + 'px; display: block;');
		ul.innerHTML = '';

		var i = 1;
		for (i = 1; i <= ex_list[0]; i++) {

			if (ex_list[i] != undefined) {
				dex = eval("Jdex['" + ex_list[i] + "']");
				ul.innerHTML =	ul.innerHTML
								+ "<li onclick='simSearch(\"" + ex_list[i] + "\")'>"
								+ dex.rarity + "	" + ex_list[i]
								+ "</li>";
			}

		}

		if (i == 0) {
			document.getElementById('kodex_simExmpl').setAttribute(
					'style'
				,	'left: ' + inp.offsetLeft
					+ 'px; top: ' + eval(inp.offsetTop + 40)
					+ 'px; display: none;'
			);
		}
		w.terminate();

	}

}