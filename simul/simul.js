/* simul.js - JAVASCRIPT FILE FOR KODEX SIMULATOR
* CREATED BY SN KINOS 2018-01-
* UPDATE:
* 1.	2018-01-26. SN KINOS.	MODIFIED	simSearch
*/
function kinput(value) {
	document.getElementById(zoneid + value).innerHTML = eval('dex.' + value);
}

Jskill	=	JSON.parse(
				getJson("https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/skill.json")
			);
Jeffect	=	JSON.parse(
				getJson("https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/effect.json")
			);

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

role = {
	'공격':'atk'
,	'방어':'hp'
,	'회복':'spr'
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

desc = {
	'공격':'공격력 30%'
,	'방어':'체력 30%'
,	'회복':'정신력 50%'
};

perc = {
	'atk':''
,	'ntk':''
,	'stk':''
,	'inn':''
,	'hp':''
,	'spr':''
,	'hea':''
,	'sur':''
,	'shi':''
,	'Atk':''
,	'Hp':''
,	'Inn':''
,	'Spr':''
,	'sin':''
,	'gol':''
,	'bun':''
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
* KODEX SEARCHING ON KODEX SIMULATOR: 2018-01-26. SN KINOS
* UPDATE:
* 1.	2018-01-26. SN KINOS. 
*/
function simSearch(srch) {
/* 2018-02-25. SN KINOS	CHANGED FROM:	dex = eval("Jdex['" + srch + "']");
TO: */
	kodex_slot[zoneid]	=	srch;
	dex = eval("Jdex['" + srch + "']");
// 2018-01-26. STARFLIT.	END.
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
			console.log('ac1 on')
			document.getElementById('simul_index_role').innerHTML		= dex.role;
			document.getElementById('simul_index_roleImg').setAttribute('src', role[dex.role] + '.png');
			document.getElementById('simul_index_roleDesc').innerHTML	= "덱 전체 "	+	desc[dex.role]	+ " 증가<br>"
																		+	dex.role	+	" 계열 스킬 강화";
//	2018-02-12. SN KINOS ADDED SIMULATOR RENEWALLER
			renewal('ac1_');
			zoneid	=	'ac1_';
			dex = eval("Jdex['" + srch + "']");
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
					+	dex.name	+	'"'
		);

		dex	=	eval("Jdex['" + srch + "']");
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
				,	'location.href = "https://qutabase.github.io/skill/'
					+	role[dex.role] + '.html?skillName='
					+	dex.skill.substr(0,2) + '"'
		);
		kinput('skill');
		document.getElementById(zoneid + 'hp').innerHTML =	Math.round( 
																	Math.floor( 
																			dex.hp0 
																		+	dex.hpLv * (eval (zoneid + 'lv.value') - 1) 
																	)	*	( 1 + eval(zoneid + 'bind.value') * bind[dex.rarity] ) 
																);
		document.getElementById(zoneid + 'atk').innerHTML	=	Math.round( 
																	Math.floor( 
																			dex.atk0 
																		+	dex.atkLv * (eval(zoneid + 'lv.value') - 1)  
																	)	*	( 1 + eval(zoneid + 'bind.value') * bind[dex.rarity] ) 
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


		effect	=	Jskill[dex.skill].effect.split('/');
		document.getElementById(zoneid + 'effect').innerHTML = '';
		var	count	=	1;
		var	sd		=	[];
		if (document.getElementById('simul_index_role').innerHTML == dex.role) {
			sd 	=	['S','D'];
			sd.id	=	'lea';
		}
		else {
			sd		=	['s','d'];
		}
		var	st1	=	parseFloat(
						Jskill[dex.skill][sd[0] + 'tatic1']
					);
		var	st2	=	parseFloat(
						Jskill[dex.skill][sd[0] + 'tatic2']
					);
		var	st3	=	parseFloat(
						Jskill[dex.skill][sd[0] + 'tatic3']
					);
		var	dy1	=	parseFloat(
						Jskill[dex.skill][sd[1] + 'ynamic1']
					);
		var	dy2	=	parseFloat(
						Jskill[dex.skill][sd[1] + 'ynamic2']
					);
		var	dy3	=	parseFloat(
						Jskill[dex.skill][sd[1] + 'ynamic3']
					);
		
		var	pd	=	(sd.id)
					?
					Jskill[dex.skill].duration
					:
					Jskill[dex.skill].probability
					;
		var	dur	=	parseFloat(
						Jskill[dex.skill].duration
					);

		for (eff in effect){
			
			var	temp= Jeffect[effect[eff]];

			document.getElementById(zoneid + 'effect').setAttribute('style'
					,	'background: '	+	dex.roleColor + '; color: white;'
			);
			var	val	=	Number(
							eval(
								zoneid + role[dex.role] + '.innerHTML'
							)
						);
			var	st	=	parseFloat(
							Jskill[dex.skill][sd[0] + 'tatic'	+	count]
						);
			var	dy	=	(Jskill[dex.skill][sd[1] + 'ynamic'	+	count] == 'lea')
						? 
						parseFloat(
							Math.floor(
								val
								*	(
										1	+ desc[dex.role].substr(	desc[dex.role].length - 3, 2 )
										/ 100
									)
							)
							*	Jskill[dex.skill]['dynamic' + count]
						)
						:
						parseFloat(
							Jskill[dex.skill][sd[1] + 'ynamic'	+ count]
						) *	val
						;

			if (temp.value == 'deck') {
				val	=	Number(
							eval(
								'deck_'	+	role[dex.role]	+	'.innerHTML'
							)
						);
				dy	*=	0.01;
			}
			(sd.id)
			?
			val = Math.floor(
						val
						*	(
								1	+	desc[dex.role].substr(	desc[dex.role].length - 3, 2 )
								/	100
							)
					)
			:
			''
			;
			if (effect[eff] in perc) {
				val	*= 0.01;
				st *= 100;
			}

			else if (temp.value == 'prev') {
				if (prev.indexOf('%') == -1) {
					val	=	Number(
								prev.substring(0, prev.length - 2)
							);
				}
				else {
					val	=	Number(
								prev.substring(0, prev.length - 3)
							);
				}
			}
			document.getElementById(zoneid + 'effect').innerHTML	+=	temp.disp	+	': ';

			console.log(val, st, dy)
			exps	=	temp.exp1.split(',');
			for (var x in exps) {
				prev	=	(effect[eff] in perc)
							?
							Math.floor(
								eval(exps[x])	*	100
							)	/	100
							+ '%; '
							:
							Math.floor(
								eval(exps[x])
							)
							+ '; '
							;
				document.getElementById(zoneid + 'effect').innerHTML	+=	prev;
			}

			count += 1;

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