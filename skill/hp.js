function getJson(url) {
	var httpReq = new XMLHttpRequest();
	httpReq.open("GET", url, false);
	httpReq.send(null);
	return httpReq.responseText;
}
roleDex = JSON.parse(getJson("https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/qurare.json"))
key_list = Object.keys(roleDex);
for (var i = 0; i < key_list.length; i++) {
	if (roleDex[key_list[i]].role != "방어") {
		delete roleDex[key_list[i]];
	}
}
key_list = Object.keys(roleDex);

function maker(argument) {

	all_flag = true;
	Sidestep = document.getElementById('Sidestep').checked;
	Crack = document.getElementById('Crack').checked;
	Endurance = document.getElementById('Endurance').checked;
	Brawl = document.getElementById('Brawl').checked;
	Solidarity = document.getElementById('Solidarity').checked;
	Provoke = document.getElementById('Provoke').checked;
	Charge = document.getElementById('Charge').checked;
	Dimsum = document.getElementById('Dimsum').checked;
	Retaliate = document.getElementById('Retaliate').checked;
	Balmung = document.getElementById('Balmung').checked;
	Protection = document.getElementById('Protection').checked;
	Fearless = document.getElementById('Fearless').checked;
	Valette = document.getElementById('Valette').checked;
	Resurrect = document.getElementById('Resurrect').checked;
	Guard = document.getElementById('Gurad').checked;
	Suppress = document.getElementById('Suppress').checked;
	Counter = document.getElementById('Counter').checked;
	WA2000 = document.getElementById('WA2000').checked;
	Support = document.getElementById('Support').checked;
	Fortitude = document.getElementById('Fortitude').checked;
	Regenerate = document.getElementById('Regenerate').checked;
	Jingle = document.getElementById('Jingle').checked;
	Fortify = document.getElementById('Fortify').checked;
	Evade = document.getElementById('Evade').checked;
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