function getJson(url) {
	var httpReq = new XMLHttpRequest();
	httpReq.open("GET", url, false);
	httpReq.send(null);
	return httpReq.responseText;
}
roleDex = JSON.parse(getJson("https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/qurare.json"))
key_list = Object.keys(roleDex);
for (var i = 0; i < key_list.length; i++) {
	if (roleDex[key_list[i]].role != "공격") {
		delete roleDex[key_list[i]];
	}
}
key_list = Object.keys(roleDex);

function maker(argument) {

	all_flag = true;
	AE36 = document.getElementById('AE36').checked;
	HelloWorld = document.getElementById('HelloWorld').checked;
	KANGTA = document.getElementById('KANGTA').checked;
	Excitement = document.getElementById('Excitement').checked;
	Extortion = document.getElementById('Extortion').checked;
	Smite = document.getElementById('Smite').checked;
	Rage = document.getElementById('Rage').checked;
	Frenzy = document.getElementById('Frenzy').checked;
	Passion = document.getElementById('Passion').checked;
	EnNyance = document.getElementById('EnNyance').checked;
	Enhance = document.getElementById('Enhance').checked;
	Dynamite = document.getElementById('Dynamite').checked;
	Strafe = document.getElementById('Strafe').checked;
	Immune = document.getElementById('Immune').checked;
	Enrage = document.getElementById('Enrage').checked;
	Smash = document.getElementById('Smash').checked;
	Swipe = document.getElementById('Swipe').checked;
	CounterATK = document.getElementById('CounterATK').checked;
	Regress = document.getElementById('Regress').checked;
	Gunship = document.getElementById('Gunship').checked;
	Wrath = document.getElementById('Wrath').checked;
	Cancel = document.getElementById('Cancel').checked;
	Lucifer = document.getElementById('Lucifer').checked;
	Bombard = document.getElementById('Bombard').checked;
	Baltar = document.getElementById('Baltar').checked;
	Lucky = document.getElementById('Lucky').checked;
	Drain = document.getElementById('Drain').checked;
	for (var i = 0; i < key_list.length; i++) {
		var dex = eval("roleDex['" + key_list[i] + "']");
		if (eval(eval("dex.enskill"))) {
			document.getElementById(dex.id).setAttribute("style", "display: inline-block");
			all_flag = false;
		}
		else {
			document.getElementById(dex.id).setAttribute("style", "display: none;");
		}
	}
	if (all_flag) {
		for (var i = 0; i < key_list.length; i++) {
			var dex = eval("roleDex['" + key_list[i] + "']");
			document.getElementById(dex.id).setAttribute("style", "display: inline-block");

		}
	}

}