Jdex = JSON.parse(getJson("https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/qurare.json"))
key_list = Object.keys(Jdex);
for (var i = 0; i < key_list.length; i++) {
	if (Jdex[key_list[i]].role != "공격") {
		delete Jdex[key_list[i]];
	}
}
key_list = Object.keys(Jdex);
function maker(argument) {

	AE36 = document.getElementById('AE36').checked;
	HelloWorld = document.getElementById('HelloWorld').checked;
	KANGTA = document.getElementById('KANGTA').checked;
	Smite = document.getElementById('Smite').checked;
	Rage = document.getElementById('Rage').checked;
	Frenzy = document.getElementById('Frenzy').checked;
	Passion = document.getElementById('Passion').checked;
	EnNyance = document.getElementById('EnNyance').checked;
	Enhance = document.getElementById('Enhance').checked;
	Dynamite = document.getElementById('Dynamite').checked;
	Blind = document.getElementById('Blind').checked;
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
		var dex = eval("Jdex['" + key_list[i] + "']");
		alert(eval(eval("dex.enskill")));
		if (eval(eval("dex.enskill"))) {
			document.getElementById(dex.id).setAttribute("style", "display: inline-block");
		}
		else {
			document.getElementById(dex.id).setAttribute("style", "display: none;");
		}
	}

}