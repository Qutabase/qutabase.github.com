eventStory	=	JSON.parse(getJson("https://raw.githubusercontent.com/Qutabase/qutabase.github.com/master/story/test.json"));
cardInfo	=	JSON.parse(getJson("https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/CardInfoScript-dec.qt"));
mainStory	=	JSON.parse(getJson("https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/mainStoryJ.qt"));


var dialogs;
function dialogPrs(argument) {
	dialogs	=	argument['Dialog'].split('#');
}

var line;
var	nick;
var type;
var index;
var count		=	0;
var printFlag	=	false;
var skipClick	=	{
	'BACKGROUND':''
,	'BGM':''
,	'FLIP':''
,	'HIDE':''
,	'FADEOUT':'1'
,	'FADEIN':'1'
,	'FX':''
,	'SHAKE':''
,	'senario':''
};

function menu_select(argument) {
	index	=	prompt("스토리 인덱스 번호를 입력해주세요.");
	if (argument == 'main') {
		dialogPrs(mainStory[parseInt(index)]);
	}
	else {
		dialogPrs(eventStory);
		/*
		nick	=	prompt("스토리에 표시될 이름을 입력해주세요.");
		/*/
		nick	=	"Kinos";
		//*/
	}
	document.getElementById('sect_story').style.display	=	'block';
	document.getElementById('sect_menu').style.display	=	'none';	
}

function prsLn(argument) {
	try {
		line	=	argument[count].split(',');
	}
	catch (exception) {
		document.getElementById('sect_menu').style.display	=	'block';
		document.getElementById('sect_story').style.display	=	'none';
		count	=	0;
		execute(['HIDE','all']);
		return;
	}
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
		document.getElementById('sect_story').style.backgroundImage	=	'url(bg/'	+	argument[1].toLowerCase()	+	'.jpg)';
		break;
	case "BGM": {
		var bgm	=	document.getElementById('story_BGM');
		if (argument[1] == null) {
			bgm.pause();
		}
		else {
			bgm.src	=	'bgm/'	+	argument[1]	+	'.mp3';
			bgm.play();
		}
	}	break;
	case 'senario':
		document.getElementById('story_senario').src	=	(!argument[1])
															?
															'popup/'	+	argument[1]	+	'.png'
															:
															''
															;
		break;
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
		elem.src			=	'portrait/'	+	argument[1]	+	'.png';
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
		if (argument[1] == "ALL" || argument[1] == "all") {
			document.getElementById('story_L_img').style.display	=	'none';
			document.getElementById('story_M_img').style.display	=	'none';
			document.getElementById('story_R_img').style.display	=	'none';
		}
		else {
			document.getElementById('story_'	+	argument[1]	+	'_img').style.display	=	'none';
		}
		break;
	case "FADEIN":
		$('#sect_story').fadeTo(argument[1], 1);
		break;
	case "FADEOUT":
		$('#sect_story').fadeTo(argument[1], 0.001);
		break;
	case "FONTSIZE":
		$('#dialog_context').css('font-size', argument[1]);
		break;
	}
}

function printContext(ind, context) {
	delete	type;
	printFlag	=	true;
	for (var i = 0; i < context.length; i++) {
		var colors	=	/\[......\]/g;
		colors		=	context[i].match(colors);
		for(color in colors) {
/*
			context[i]	=	context[i].replace(colors[color], "<span style='color: #"	+	colors[color].substr(1, 6)	+	";'>");
			context[i]	=	context[i].replace(/\[-\]/g, "</span>");
/*/
			context[i]	=	context[i].replace(colors[color], "");
			context[i]	=	context[i].replace(/\[-\]/g, "");
//*/
			context[i]	=	context[i].replace("{nickname}", nick);
		}
	}
	var cntxt	=	context[ind];
	for(var i = ind + 1; context[i] != undefined; i++) {
		cntxt	+=	','	+	context[i];
	}

	//*
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
			else{
				i		= 9999;
				printFlag	= false;
				delete	type;
			}
		};
		type	=	setInterval(show, 15);
	}
	typing();
	/*/
	document.getElementById('dialog_context').innerHTML	=	cntxt;
	//*/

}