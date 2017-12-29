if( navigator.userAgent.indexOf('Firefox') >= 0 ) {
	var eventNames = ["mousedown", "mouseover", "mouseout", "mousemove", "mousedrag", "click", "dblclick", "keydown", "keypress", "keyup" ]; 
		
	for( var i = 0 ; i < eventNames.length; i++ ) {
		window.addEventListener( eventNames[i], function(e) {
			window.event = e;
		}, true);
	}
}

var hour = new Date()
hour = hour.getHours()
if (6 <= hour && hour < 18) {
	document.getElementsByTagName('body')[0].setAttribute('style', 'background: url("https://qutabase.github.io/bgW.png");')
	document.getElementById('kodex_form').setAttribute("style", 'background: none;')
	document.getElementById('logo').setAttribute('src', 'https://qutabase.github.io/logo.svg')
	document.getElementsByTagName('footer')[0].setAttribute('style', 'color: #273869;')
}

function getJson(url) {
	var httpReq = new XMLHttpRequest();
	httpReq.open("GET", url, false);
	httpReq.send(null);
	return httpReq.responseText;
}

Jdex = JSON.parse(getJson("https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/qurare.json"))
eng = JSON.parse(getJson("https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/enskill.json"))

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

function kinput(value) {
	document.getElementById('kodex_'+value).innerHTML = eval('dex.'+value);
}

function check(argument) {

	inp = document.getElementById('kodex_srch');
	if (window.event.keyCode == 13) {


		location.href = "https://qutabase.github.io/?kodexName="+kodex_srch.value;
		// search(kodex_srch.value);
		// document.getElementById('kodex_srch').value = '';
		// document.getElementById('kodex_exmpl').setAttribute('style', 'left: '+inp.offsetLeft+'px; top: '+eval(inp.offsetTop+30)+'px; display: none;')

		return;

	}
	else if (kodex_srch.value != '') {
		showExmpl(kodex_srch.value);
	}
	else if (kodex_srch.value == '' && window.event.keyCode == 8) {
		document.getElementById('kodex_exmpl').setAttribute('style', 'left: '+inp.offsetLeft+'px; top: '+eval(inp.offsetTop+30)+'px; display: none;');		
	}

}

function metaMake(index, content) {
	
	var headMeta = document.getElementsByTagName('head')[0];
	var metaAdd = document.createElement("meta");
	if (index.substring(0, 2) == 'og') {
		metaAdd.setAttribute('property', index)
	} else {
		metaAdd.name = index
	}
	metaAdd.content = content;
	headMeta.appendChild(metaAdd);

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
		metaMake("title", "QUTABASE - " + dex.name)
		metaMake("og:title", "QUTABASE - " + dex.name)
		metaMake("og:description", dex.skill + " - " + dex.ATK[0] + " / " + dex.HP[0])
		metaMake("og:image", encodeURI('https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/Kodex/'+role[dex.role]+'/'+dex.enskill+'/'+rarity[dex.rarity]+'/'+dex.id+'/'+dex.id+'cn.jpg'))
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
		document.getElementById('kodex_skill').setAttribute('onclick', 'location.href="skill/'+role[dex.role]+'.html?skillName='+dex.skill.substring(0, 2)+'"');
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
	try {
		document.getElementById('kodex_srch').value = '';
		document.getElementById('kodex_exmpl').setAttribute('style', 'left: '+inp.offsetLeft+'px; top: '+eval(inp.offsetTop+30)+'px; display: none;')
	}
	catch (exception){
		;
	}
	document.getElementsByTagName('article')[0].setAttribute("style", "display: inline-block;")

}

function showExmpl(argument) {
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

	var w = new Worker("worker.js")
	w.postMessage(inp.value)
	w.onmessage = function (event) {
		ex_list = event.data;
		ul = document.getElementById('kodex_exmpl');
		ul.setAttribute('style', 'left: '+inp.offsetLeft+'px; top: '+eval(inp.offsetTop+30)+'px; display: block;');
		ul.innerHTML = '';
		var i = 1;
		for (i = 1; i <= ex_list[0]; i++) {

			if (ex_list[i] != undefined) {
				dex = eval("Jdex['" + ex_list[i] + "']");
				ul.innerHTML = ul.innerHTML + "<a href='https://qutabase.github.io/?kodexName="+ex_list[i]+"'><li>"+dex.rarity +"	"+ ex_list[i]+"</li></a>"
			}

		}
		if (i == 0) {
			document.getElementById('kodex_exmpl').setAttribute('style', 'left: '+inp.offsetLeft+'px; top: '+eval(inp.offsetTop+30)+'px; display: none;')
		}
		w.terminate();
	}

}

function url_parse(argument) {
	var temp = window.location.search.substring(1);
	var all_param = temp.split('&');
	for (var i = 0; all_param.length; i++) {
		var key = all_param[i].split('=');
		if (key[0] == argument) {
			return key[1];
		}
	}
}
