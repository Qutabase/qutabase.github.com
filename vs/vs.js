function kinput(value) {
	document.getElementById(zoneid + value).innerHTML = eval('dex.' + value);
}

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
	else if (inp.id == zoneid + 'lv' || inp.id == zoneid + 'bind') {
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

function listClick(argument) {
	zoneid	=	'vsB_';
	vsB_lv.value	=	Jdex[argument].lv;
	vsB_bind.value	=	0;
	vsSearch(argument);
}

function vsSearch(srch) {

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
		dex = eval("Jdex['" + kodex_slot[zoneid] + "']");

		document.getElementById(zoneid + 'face').setAttribute('onclick'
				,	'location.href = "https://qutabase.github.io/?kodexName='
					+	encodeURIComponent(dex.name)
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
				, 'location.href="../skill/'
					+	role[dex.role]	+	'.html?skillName='
					+	encodeURIComponent(dex.skill.substring(0, 2))
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

		var	sd				=	['S','D'];
		sd.id 				=	'lea';
		var	effect			=	skill(dex, sd, val_lv, val_bind).data;
		var	ef				=	document.getElementById(zoneid + 'effect');
		ef.parentElement.style.background	=	dex.roleColor;
		ef.innerHTML		=	'';
		var	effecPerc		=	0;
		for (var i = 1; i < effect.val.length; i++) {
			ef.innerHTML	+=	(effect.desc[i])
								?
								effect.desc[i]	+	effect.val[i]	+	'<br>'
								:
								effect.val[i]	+	' '
								;
			effecPerc		=	effect.val[i].toString().indexOf('%');
			if (effecPerc + 1) {
				effect.val[i]	=	effect.val[i].toString().substr(0, effecPerc);
			}
		}

		if (zoneid == 'vsT_') {
			var w = new Worker("worker.js");
			w.postMessage(dex.skill.substr(0,2));
			w.onmessage = function (event) {

				var ex_list	=	event.data;
				var ul			=	document.getElementById('list_main');
				ul.innerHTML	=	'';

				for (var i = 1; i <= ex_list[0]; i++) {
					var	dex			=	eval("Jdex['" + ex_list[i] + "']");
					var	lsEffect	=	skill(dex, sd, 0, 0).data;
					var	winLose		=	[];
					winLose.value	=	'';
					for (var j = 1; j < effect.val.length; j++) {
						var	lsEfPerc	=	lsEffect.val[j].toString().indexOf('%');
						var	perc		=	'';
						if (lsEfPerc + 1) {
							lsEffect.val[j]	=	lsEffect.val[j].toString().substr(0, lsEfPerc);
							perc			=	'%';
						}
						winLose.value	=	lsEffect.val[j] - effect.val[j];
						winLose.value	=	(winLose.value == winLose.value.toFixed(2))
											?
											winLose.value
											:
											winLose.value.toFixed(2)
											;
						winLose.color	=	(winLose.value > 0)
											?
											winLose.color	=	'#20AD20'
											:
											winLose.color	=	'red'
											;
					}

					if (srch.indexOf('®마법소녀 팥쥐') != -1) {
						;
					}
					else if (ex_list[i].indexOf('® ') != -1) {
						temp = ex_list[i].substring(2);
						dex = eval("Jdex['" + temp + "']");
					}
					else if (ex_list[i].indexOf('®') != -1) {
						temp = ex_list[i].substring(1);
						dex = eval("Jdex['" + temp + "']");
					}
					imgLink			=	'https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/Kodex/'
										+	role[dex.role]		+	'/'
										+	dex.enskill			+	'/'
										+	rarity[dex.rarity]	+	'/'
										+	dex.id				+	'/small.png'
										;
					dex				=	eval("Jdex['" + ex_list[i] + "']");
					ul.innerHTML	=	ul.innerHTML
										+	'<div class="list_kodex" onclick="zoneid = \'vsB_\'; listClick(\''
										+	dex.name		+	'\');"><div><img src="'
										+	imgLink			+'" class="list_img"></div><div class="list_rarity">'
										+	dex.rarity		+	'</div><div class="list_name">'
										+	dex.name		+	'</div><div class="list_value" style="color: '
										+	winLose.color	+	';">'
										+	winLose.value	+	perc
										+	'</div></div>'
										;

				}
				w.terminate();


			}

		}

	}
	document.getElementById('kodex_vsExmpl').setAttribute('style', 'display: none;');
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