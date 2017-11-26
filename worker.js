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
	for (var i = 0; i < key_list.length /*&& j < 10*/; i++) {
		
		dex = eval("Jdex['" + key_list[i] + "']");
		if(dex.name.indexOf(argument) != -1){

			ex_list.push(dex.name);
			j+=1;

		}

	}
	ex_list.unshift(j);
	return ex_list;

}
onmessage = function(event){
	var temp = event.data;
	postMessage(exmpl(temp))
}
