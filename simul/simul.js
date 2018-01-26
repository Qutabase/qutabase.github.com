function kinput(value) {
	document.getElementById(zoneid+value).innerHTML = eval('dex.'+value);
}
// Jhp = JSON.parse(getJson("https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/skill_hp.json"))
// Jatk = JSON.parse(getJson("https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/skill_atk.json"))
// Jspr = JSON.parse(getJson("https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/skill_spr.json"))
Jskill = JSON.parse(getJson("https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/skill.json"))

kodex_slot = {
	'ac1':'',
	'ac2':'',
	'ac3':'',
	'ac4':'',
	'ac5':'',

	'pa1':'',
	'pa2':'',
	'pa3':'',
	'pa4':'',
	'pa5':''
}
function simCheck(argument) {

	inp = argument;
	zoneid = inp.id.substr(0,4);
	if (window.event.keyCode == 13 && argument.id == zoneid+'name_inp') {

		kodex_slot[zoneid.substr(0,2)] = eval(zoneid+'name_inp.value')
		simSearch(kodex_slot[zoneid.substr(0,2)]);
		return;

	}
	else if (argument.id == zoneid+'lv' || argument.id == zoneid+'bind') {
		simSearch(kodex_slot[zoneid.substr(0,2)]);
		return;
	}
	else if (argument.id == zoneid+'name_inp' && inp.value != '') {
		showSimExmpl(inp.value);
	}
	else if (argument.id == zoneid+'name_inp' && inp.value == '' && window.event.keyCode == 8) {
		document.getElementById('kodex_simExmpl').setAttribute('style', 'display: none;');		
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
bind = {
	'bind':'0.5 0.5 0.6 0.6 0.7 0.8 0.9 0.8',
	'N':0.05,
	'N+':0.05,
	'R':0.06,
	'R+':0.06,
	'SR':0.07,
	'SR+':0.08,
	'SSR':0.09,
	'QR':0.08
}
function simSearch(srch) {
	
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
		document.getElementById(zoneid+'img').setAttribute('src', encodeURI('https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/Kodex/'+role[dex.role]+'/'+dex.enskill+'/'+rarity[dex.rarity]+'/'+dex.id+'/small.png'));
		document.getElementById(zoneid+'link').setAttribute('href', 'https://qutabase.github.io/?kodexName='+dex.name);
		dex = eval("Jdex['" + srch + "']");
		kinput('name');
		document.getElementById(zoneid+'name').setAttribute('style', 'color: '+dex.rarefont+'; background: '+dex.rareColor+';');
		document.getElementById(zoneid+'name').setAttribute('onclick', "this.innerHTML='<input type=\"text\" class=\"kodex_sim_inp\" onkeyup=\"simCheck(this)\" id=\""+zoneid+"name_inp\">';this.onclick='';eval(\""+zoneid+"name_inp.focus();\")");
		document.getElementById(zoneid+'skill').setAttribute('style', 'background: '+dex.roleColor+';');
		kinput('skill');
		document.getElementById(zoneid+'hp').innerHTML = Math.round( Math.floor(dex.hp0 + dex.hpLv*(eval(zoneid+'lv.value') - 1) ) * ( 1 + eval(zoneid+'bind.value') * bind[dex.rarity] ))
		document.getElementById(zoneid+'atk').innerHTML = Math.round( Math.floor(dex.atk0 + dex.atkLv*(eval(zoneid+'lv.value') - 1) ) * ( 1 + eval(zoneid+'bind.value') * bind[dex.rarity] ))
		document.getElementById(zoneid+'spr').innerHTML = Math.floor( ( Number(eval(zoneid+'hp.innerHTML')) + Number(eval(zoneid+'atk.innerHTML')) ) / 2);

		document.getElementById(zoneid+'skill').setAttribute('onmouseover', "this.innerHTML = "+Math.floor(eval('J'+role[dex.role]+'[dex.skill].static') * Math.floor( document.getElementById(zoneid+role[dex.role]).innerHTML * 1.3) ) );
		document.getElementById(zoneid+'skill').setAttribute('onmouseout', "this.innerHTML = '"+dex.skill+"'");
	}
	// try {
		document.getElementById('kodex_simExmpl').setAttribute('style', 'display: none;')
	// }
	// catch (exception){
		// ;
	// }
	document.getElementsByTagName('article')[0].setAttribute("style", "display: inline-block;")

}

function showSimExmpl(argument) {
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
		ul = document.getElementById('kodex_simExmpl');
		ul.setAttribute('style', 'left: '+inp.offsetLeft+'px; top: '+eval(inp.offsetTop+40)+'px; display: block;');
		ul.innerHTML = '';
		var i = 1;
		for (i = 1; i <= ex_list[0]; i++) {

			if (ex_list[i] != undefined) {
				dex = eval("Jdex['" + ex_list[i] + "']");
				ul.innerHTML = ul.innerHTML + "<li onclick='simSearch(\""+ex_list[i]+"\")'>"+dex.rarity +"	"+ ex_list[i]+"</li>"
			}

		}
		if (i == 0) {
			document.getElementById('kodex_simExmpl').setAttribute('style', 'left: '+inp.offsetLeft+'px; top: '+eval(inp.offsetTop+40)+'px; display: none;')
		}
		w.terminate();
	}

}