function getJson(url) {
	var httpReq = new XMLHttpRequest();
	httpReq.open("GET", url, false);
	httpReq.send(null);
	return httpReq.responseText;
}
roleDex = JSON.parse(getJson("https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/qurare.json"))
key_list = Object.keys(roleDex);
for (var i = 0; i < key_list.length; i++) {
	if (roleDex[key_list[i]].role != "회복") {
		delete roleDex[key_list[i]];
	}
}
key_list = Object.keys(roleDex);

function maker(argument) {

	all_flag = true;
	Mercury = document.getElementById('Mercury').checked;
	Wolf = document.getElementById('Wolf').checked;
	Encourage = document.getElementById('Encourage').checked;
	Prayer = document.getElementById('Prayer').checked;
	Hopeginger = document.getElementById('Hopeginger').checked;
	Lilim = document.getElementById('Lilim').checked;
	Shield = document.getElementById('Shield').checked;
	Recycle = document.getElementById('Recycle').checked;
	Sacred = document.getElementById('Sacred').checked;
	Interrogate = document.getElementById('Interrogate').checked;
	Arcana = document.getElementById('Arcana').checked;
	Empower = document.getElementById('Empower').checked;
	Fairy = document.getElementById('Fairy').checked;
	Friendship = document.getElementById('Friendship').checked;
	Purify = document.getElementById('Purify').checked;
	Fixing = document.getElementById('Fixing').checked;
	Punish = document.getElementById('Punish').checked;
	Repent = document.getElementById('Repent').checked;
	Cure = document.getElementById('Cure').checked;
	Heal = document.getElementById('Heal').checked;
	Amity = document.getElementById('Amity').checked;
	Peace = document.getElementById('Peace').checked;
	Dispel = document.getElementById('Dispel').checked;
	Contrite = document.getElementById('Contrite').checked;
	for (var i = 0; i < key_list.length; i++) {
		var dex = eval("roleDex['" + key_list[i] + "']");
		if (eval(eval("dex.enskill"))) {
			document.getElementById(dex.id).setAttribute("style", "display: inline-block");
			all_flag = false;
		}
		else {
			document.getElementById(dex.id).setAttribute("style", "display: none;");
		}
		console.log(dex.name)
	}
	if (all_flag) {
		for (var i = 0; i < key_list.length; i++) {
			var dex = eval("roleDex['" + key_list[i] + "']");
			document.getElementById(dex.id).setAttribute("style", "display: inline-block");

		}
	}

}