function getJson(url) {
	var httpReq = new XMLHttpRequest();
	httpReq.open("GET", url, false);
	httpReq.send(null);
	return httpReq.responseText;
}

Jdex = JSON.parse(getJson("https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/qurare.json"))

function exmpl(argument) {

	ex_list = []
	var j = 0
	key_list = Object.keys(Jdex)
	for (var i = 0; i < key_list.length; i++) {
		
		var dex = eval("Jdex['" + key_list[i] + "']");

		if(dex.skill.substr(0,2) == argument){

			ex_list.push(dex.name);
			j+=1;

		}
	cosnole.log('asd')
	}
	ex_list.unshift(j);
	return ex_list;

}
onmessage = function (event){
	var temp = event.data;
	postMessage(exmpl(temp))
}
