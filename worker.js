function exmpl(argument) {

	ex_list = []
	var j = 0
	key_list = Object.keys(Jdex)
	for (var i = 0; i < key_list.length /*&& j < 10*/; i++) {
		
		dex = eval("Jdex['" + key_list[i] + "']");
		if(dex.name.indexOf(kodex_srch.value) != -1){

			ex_list.push(dex.name);
			j+=1;

		}

	}
	ex_list.unshift(j);
	return ex_list;

}
exmpl();
