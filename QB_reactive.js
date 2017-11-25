if( navigator.userAgent.indexOf('Firefox') >= 0 ) {
	var eventNames = ["mousedown", "mouseover", "mouseout", 
	                            "mousemove", "mousedrag", "click", "dblclick",
	                            "keydown", "keypress", "keyup" ]; 
		
	for( var i = 0 ; i < eventNames.length; i++ ) {
		window.addEventListener( eventNames[i], function(e) {
			window.event = e;
		}, true );
	}
}

skill_flag = 0
function menu_skill_click(argument) {
	if (!skill_flag) {
		document.getElementById('list_skill').setAttribute('style', 'display: block;');
		skill_flag = 1
	}
	else{
		document.getElementById('list_skill').setAttribute('style', 'display: none;');
		skill_flag = 0
	}
}
function getJson(url) {
	var httpReq = new XMLHttpRequest();
	httpReq.open("GET", url, false);
	httpReq.send(null);
	return httpReq.responseText;
}

Jdex = JSON.parse(getJson("https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/qurare.json"))
//eng = JSON.parse(getJson("https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/enskill.json"))

function kinput(value) {
	document.getElementById('kodex_'+value).innerHTML = eval('dex.'+value);
}
srch_len = 0;
function check(argument) {

	inp = document.getElementById('kodex_srch');
	if (window.event.keyCode == 13) {

		search(kodex_srch.value);
		return;

	}
	else if (kodex_srch.value != '' && srch_len == inp.value.length) {
		showExmpl(kodex_srch.value);
	}
	else if (kodex_srch.value == '' && window.event.keyCode == 8) {
		document.getElementById('kodex_exmpl').setAttribute('style', 'left: '+inp.offsetLeft+'px; top: '+eval(inp.offsetTop+30)+'px; display: none;');		
	}
	srch_len = inp.value.length;

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

function search(srch) {

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
		document.getElementById('kodex_img_0').setAttribute('src', encodeURI('https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/Kodex/'+role[dex.role]+'/'+dex.enskill+'/'+rarity[dex.rarity]+'/'+dex.id+'/'+dex.id+'an.jpg'));
		document.getElementById('kodex_img_1').setAttribute('src', encodeURI('https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/Kodex/'+role[dex.role]+'/'+dex.enskill+'/'+rarity[dex.rarity]+'/'+dex.id+'/'+dex.id+'bn.jpg'));
		document.getElementById('kodex_img_2').setAttribute('src', encodeURI('https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/Kodex/'+role[dex.role]+'/'+dex.enskill+'/'+rarity[dex.rarity]+'/'+dex.id+'/'+dex.id+'cn.jpg'));
		dex = eval("Jdex['" + srch + "']");
		kinput('rarity');
		kinput('name');
		kinput('cost');
		document.getElementById('kodex_rarity_m').innerHTML = dex.rarity;
		document.getElementById('kodex_name_m').innerHTML = dex.name;
		document.getElementById('kodex_cost_m').innerHTML = dex.cost;
		document.getElementById('kodex_rarity').setAttribute('style', 'color: '+dex.rarefont+'; background: '+dex.rareColor+';');
		document.getElementById('kodex_name').setAttribute('style', 'color: '+dex.rarefont+'; background: '+dex.rareColor+';');
		document.getElementById('kodex_rarity_m').setAttribute('style', 'color: '+dex.rarefont+'; background: '+dex.rareColor+';');
		document.getElementById('kodex_name_m').setAttribute('style', 'color: '+dex.rarefont+'; background: '+dex.rareColor+';');
		document.getElementById('kodex_skill').setAttribute('style', 'background: '+dex.roleColor+';');
		kinput('skill');
		kinput('role');
		kinput('skilltype');
		kinput('faction');
		kinput('illustrator');
		kinput('hp0');
		kinput('atk0');
		kinput('spr0');
		for (var i = 0; i < 7; i++) {
			document.getElementById('kodex_HP_'+i).innerHTML = dex.HP[i];
			document.getElementById('kodex_ATK_'+i).innerHTML = dex.ATK[i];
			document.getElementById('kodex_SPR_'+i).innerHTML = dex.SPR[i];
		}

	}
	kodex_srch.value = '';
	document.getElementById('kodex_exmpl').setAttribute('style', 'left: '+inp.offsetLeft+'px; top: '+eval(inp.offsetTop+30)+'px; display: none;')


}

ex_list = []
function exmpl(argument) {

	ex_list = []
	key_list = Object.keys(Jdex)
	var j = 0
	for (var i = 0; i < key_list.length /*&& j < 10*/; i++) {
		
		dex = eval("Jdex['" + key_list[i] + "']");
		if(dex.name.indexOf(kodex_srch.value) != -1){

			ex_list[j] = dex.name;
			j+=1;

		}

	}
	return j

}

function showExmpl(argument) {

	len = exmpl();
	ul = document.getElementById('kodex_exmpl')
	ul.setAttribute('style', 'left: '+inp.offsetLeft+'px; top: '+eval(inp.offsetTop+30)+'px; display: block;')
	ul.innerHTML = ''
	var i = 0
	for (i = 0; i < len; i++) {
		if (ex_list[i] != undefined) {
			dex = eval("Jdex['" + ex_list[i] + "']");
			ul.innerHTML = ul.innerHTML + "<li onclick='search(ex_list["+i+"])'>"+dex.rarity +"	"+ ex_list[i]+"</li>"
		}

	}
	if (i == 0) {
		document.getElementById('kodex_exmpl').setAttribute('style', 'left: '+inp.offsetLeft+'px; top: '+eval(inp.offsetTop+30)+'px; display: none;')
	}


}