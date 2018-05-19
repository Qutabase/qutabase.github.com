mainStory	=	JSON.parse(getJson("https://raw.githubusercontent.com/Qutabase/qutabase.github.com/master/story/test.json"));
cardInfo	= JSON.parse(getJson("https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/CardInfoScript-dec.qt"));

var dialogs;
function dialogPrs(argument) {
	dialogs	=	argument['main'].split('#');
}

var line;
var count = 0;
var skipClick	=	{
	'BACKGROUND':''
,	'BGM':''
,	'FLIP':''
,	'HIDE':''
,	'FADEOUT':''
,	'FADEIN':''
,	'FX':''
,	'SHAKE':''
};

function prsLn(argument) {
	line	=	argument[count].split(',');
	count++;
	execute(line);
	if (argument[count].split(',')[0] in skipClick) {
		prsLn(argument);
	}
}

function execute(argument) {
	console.log(argument.toString());
	switch(argument[0]) {
	case "BACKGROUND":
		document.getElementsByTagName('article')[0].style.backgroundImage	=	'url('	+	argument[1]	+	'.png)';
		break;
	case "BGM": {
		var bgm	=	document.getElementById('story_BGM');
		if (argument[1] == null) {
			bgm.pause();
		}
		else {
			bgm.src	=	argument[1]	+	'.mp3';
			bgm.play();
		}
	}	break;
	case "WAIT":
		setTimeout(function() {
			break;
		}, argument[1]);
		break;
	case "na":
		document.getElementById('dialog_name').innerHTML	=	argument[1]	+	'　';
		printContext(2, argument);
		break;
	case "LL": case "LM": case "LR":
	case "MM": case "MR":
	case "RR":

	case "L":
	case "M":
	case "R": {
		var	elem			=	document.getElementById('story_'	+	argument[0]	+	'_img');
		elem.src			=	argument[1]	+	'.png';
		elem.style.display	=	'initial';
		argument[1]	=	argument[1].replace(/[BC]/g, '');
		for(kodex in cardInfo) {
			if (cardInfo[kodex].Number == argument[1]) {
				document.getElementById('dialog_name').innerHTML	=	cardInfo[kodex].GivenName;
			}
		}
		printContext(3, argument);
	}	break;

	case "FLIP":
		var	elem	=	document.getElementById('story_'	+	argument[1]	+	'_img');
		if (!elem.flip) {
			elem.style.transform	=	"scale(-1, 1)";
			elem.flip	=	true;
		}
		else {
			elem.style.transform	=	"scale(1, 1)";
			elem.flip	=	false;
		}
		break;
	case "HIDE":
		if (argument[1] == "ALL") {
			document.getElementById('story_L_img').style.display	=	'none';
			document.getElementById('story_M_img').style.display	=	'none';
			document.getElementById('story_R_img').style.display	=	'none';
		}
		else {
			document.getElementById('story_'	+	argument[1]	+	'_img').style.display	=	'none';
		}
	}
}

function printContext(ind, context) {
	for (var i = 0; i < context.length; i++) {
		var colors	=	/\[......\]/g;
		colors		=	context[i].match(colors);
		for(color in colors) {
			context[i]	=	context[i].replace(colors[color], "<span style='color: #"	+	colors[color].substr(1, 6)	+	";'>");
			context[i]	=	context[i].replace("{nickname}", nick);
			context[i]	=	context[i].replace(/\[-\]/g, "</span>");
		}
	}
	var cntxt	=	context[ind];
	for(var i = ind + 1; context[i] != undefined; i++) {
		cntxt	+=	','	+	context[i];
	}

	/*
	var type	=	null;
	function typing() {
		var mainC	=	cntxt.split("");
		var i		=	0;
		var dlgCnt	=	document.getElementById('dialog_context');	
		dlgCnt.innerHTML	=	'';
		function show() {
			if (i < mainC.length) {
				dlgCnt.innerHTML	+=	mainC[i];
				i++;
			}
			else {
				dlgCnt.innerHTML	=	dlgCnt.innerHTML.replace('&lt;', '<');
				dlgCnt.innerHTML	=	dlgCnt.innerHTML.replace('&gt;', '>');
			}
		};
		var type	=	setInterval(show, 50);

	}
	typing();
	/*/
	document.getElementById('dialog_context').innerHTML	=	cntxt;
	//*/

}
dialogPrs(mainStory);

/*
var	nick	=	prompt("스토리에 표시될 이름을 입력해주세요.");
/*/
var nick	=	"Kinos";
//*/