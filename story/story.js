mainStory	=	JSON.parse(getJson("https://raw.githubusercontent.com/Qutabase/qutabase.github.com/master/story/test.json"));

function dialogPrs(argument) {
	var	dialogs	=	argument['main'].split('#');
	prsLn(dialogs);
}

function prsLn(argument) {
	for(line in argument) {
		line	=	argument[line].split(',');
		console.log(line);
	}
}

dialogPrs(mainStory);