function dialogPrs(argument) {
	var	dialogs	=	argument.split('#');
	console.log(mainDlg);
}

mainStory	=	JSON.parse(getJson("https://raw.githubusercontent.com/Qutabase/qutabase.github.com/master/story/mainStory.json"));

dialogPrs(mainStory);