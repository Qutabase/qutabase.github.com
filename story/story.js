eventStory	=	JSON.parse(getJson("https://raw.githubusercontent.com/Qutabase/qutabase.github.com/master/story/test.json"));
cardInfo	=	JSON.parse(getJson("https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/CardInfoScript-dec.qt"));
mainStory	=	JSON.parse(getJson("https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/mainStoryJB.qt"));


var dialogs;
function dialogPrs(argument) {
	dialogs	=	argument['Dialog'].split('#');
	$('#story_index').html(
			'Ch. '		+	chap	+	' / '
		+	'Index. '	+	index
	);
}

var line;
var	nick;
var type;
var chap;
var	index;
var count;
var	delayT		=	0;
var printFlag	=	false;
var	endOfDlg	=	false;
var skipClick	=	{
	'BACKGROUND':''
,	'BGM':''
,	'FLIP':''
,	'HIDE':''
,	'FADEOUT':'1'
,	'FADEIN':'1'
,	'fadeout':'1'
,	'fadein':'1'
,	'FX':''
,	'SHAKE':''
,	'senario':''
,	'FONTSIZE':''
,	'SHAKEBG':''
,	'SHADE':''
,	'shade':''
,	'voice':''
,	'SE':''
};

function chapPlay(argument) {
	chap	=	argument;
	for (var kodex in mainStory) {
		if (mainStory[kodex]['Zone'] == eng['zone'][chap][0]) {
			index	=	parseInt(mainStory[kodex]['Index']);
			break;
		}
	}
	dialogPrs(mainStory[index]);
}

function menu_select(argument) {
	count	=	0;
	var	start;
	chap	=	prompt("챕터 번호를 입력해주세요. (i숫자로 입력 시 인덱스 번호)");

	if (argument == 'main') {
		if (chap[0] == 'i') {
			index	=	parseInt(chap.substr(1));
			var	tmp	=	parseInt(mainStory[index]['Zone'])
			for (var i = 0; i < eng['zone'].length; i++) {
				if (parseInt(eng['zone'][i][0]) <= tmp && tmp <= parseInt(eng['zone'][i][0]) + parseInt(eng['zone'][i][1]) - 1) {
					chap	=	i;
					dialogPrs(mainStory[index]);
					break;
				}
			}
		}
		else {
			chapPlay(parseInt(chap));
		}
	}
	else {
		dialogPrs(eventStory);
		//*
		nick	=	prompt("스토리에 표시될 이름을 입력해주세요.");
		/*/
		nick	=	"Kinos";
		//*/
	}
	document.getElementById('sect_story').style.display	=	'block';
	document.getElementById('sect_menu').style.display	=	'none';
}

function prsLn(argument) {
	if (endOfDlg) {
		execute(['HIDE','all']);
		endOfDlg = false;
	}

	try {
		line	=	argument[count].split(',');
		if (line == ['']) throw "EndOfChapter";
	}
	catch (exception) {
		if (confirm('Ch. ' + (chap + 1) + '로 넘어가시겠습니까?')) {
			chapPlay(++chap);
		}
		else {
			document.getElementById('sect_menu').style.display	=	'block';
			document.getElementById('sect_story').style.display	=	'none';
			execute(['HIDE','all']);
		}
		count	=	0;
		return;
	}
	count++;
	execute(line);

	try {
		if (argument[count].split(',')[0] in skipClick) {
			prsLn(argument);
		}
	}

	catch (exception) {
		endOfDlg	=	true;
		if (mainStory[index+1]['Zone'] <= eng['zone'][chap][0] + eng['zone'][chap][1] - 1) {
			dialogPrs(mainStory[++index]);
			console.log(index);
			document.getElementById('story_senario').src	=	'';
			count	=	0;
		}
	}
}

function execute(argument) {
	console.log(argument.toString());
	switch(argument[0]) {
	case "BACKGROUNDGROUP":
		break;

	case "BACKGROUND":
		if (delayT == 0) {
			setTimeout( function() {
				document.getElementById('sect_story').style.backgroundImage	=
						'url(bg/'	+	argument[1].toLowerCase()	+	'.jpg)';
				$('#story_BG').fadeOut(500);
				setTimeout( function() {
					var	tmp				=	document.getElementById('story_BG');
					tmp.src				=	'bg/'	+	argument[1].toLowerCase()	+	'.jpg';
					tmp.style.display	=	'initial';
				}, 510);
				delayT	=	0;
			}, delayT);
		}
		else {
			setTimeout( function() {
				document.getElementById('story_BG').src	=
						'bg/'	+	argument[1].toLowerCase()	+	'.jpg';
				delayT	=	0;
			}, delayT);
		}
		break;

	case "BGM": {
		var bgm	=	document.getElementById('story_BGM');
		if (argument[1] == null || argument[1] == '') {
			bgm.pause();
			bgm.src	=	'';
		}
		else if ('bgm/' + argument[1] + '.mp3' == bgm.getAttribute('src')) {
			;
		}
		else {
			bgm.src	=	'bgm/'	+	argument[1]	+	'.mp3';
			bgm.play();
		}
	}	break;

	case 'senario': case 'SENARIO':
		document.getElementById('story_senario').src	=	(argument[1])
															?
															'popup/'	+	argument[1]	+	'.png'
															:
															''
															;
		break;

	case "WAIT":
		break;

	case "na": case "NA": case "Na":
		document.getElementById('dialog_name').innerHTML	=	argument[1]	+	'　';
		printContext(2, argument);
		break;

	case "LL": case "LM": case "LR":
	case "MM": case "MR":
	case "RR":

	case "L":
	case "M":
	case "R": {
		var	elem	=	$('#story_'	+	argument[0]	+	'_img');
		var	face	=	$('#story_'	+	argument[0]	+	'_face');
		if (argument[1] == 'on' || argument[1] == 'ON') {
			elem.css('display',	'initial');
			face.css('display',	'initial');
			return;
		}
		switch(argument[1]) {
		case '10001': case '10002': case '10003':
			face.attr(
					'src'
				,	'portrait/'	+	argument[1]	+	'.png'
			);
			argument[1]	=	'1001'	+	argument[1][4]
			break;
		case '9004':
			face.attr(
					'src'
				,	'portrait/9004g.png'
			);
			break;
		case '0':
			document.getElementById('story_'	+	argument[0]	+	'_img').src	=	'portrait/none.png';
			printContext(3, argument);
			return;
		default:
			if (face.attr('src') != 'portrait/none.png') {
				face.attr('src', 'portrait/none.png');
			}
		}

		document.getElementById('story_'	+	argument[0]	+	'_img').src	=	'portrait/'	+	argument[1]	+	'.png';
		var tmp	=	document.getElementById('story_'	+	argument[0]	+	'_face');
		argument[1]	=	argument[1].replace(/[ABC]/g, '');
		document.getElementById('dialog_name').innerHTML	=	'　';
		for(var	kodex in cardInfo) {
			if (cardInfo[kodex].Number == argument[1]) {
				document.getElementById('dialog_name').innerHTML	=	cardInfo[kodex].GivenName;
			}
		}
		if (argument[2] == 'EyeDown') {
			if (tmp.style.backgroundImage.substr(this.length - 4, 4) != '.gif') {
				tmp.style.backgroundImage	=	'url(portrait/'	+	argument[1]	+	".gif)";
			}
		}
		else if (argument[2] == 'none') {
			tmp.style.backgroundImage	=	'none';
		}
		else {
			tmp.style.backgroundImage	=	'url(portrait/'	+	argument[1]	+	argument[2]	+	".png)";
		}
		elem.css('display',	'initial');
		face.css('display',	'initial');
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
		setTimeout(function() {
			if (argument[1] == "ALL" || argument[1] == "all") {
				document.getElementById('story_L_img').style.display	=	'none';
				document.getElementById('story_M_img').style.display	=	'none';
				document.getElementById('story_R_img').style.display	=	'none';
				document.getElementById('story_L_face').style.display	=	'none';
				document.getElementById('story_M_face').style.display	=	'none';
				document.getElementById('story_R_face').style.display	=	'none';
			}
			else {
				document.getElementById('story_'	+	argument[1]	+	'_img').style.display	=	'none';
				document.getElementById('story_'	+	argument[1]	+	'_face').style.display	=	'none';
			}
			delayT	=	0;
		}, delayT);
		break;

	case "FADEIN": case "fadein":
		$('#sect_story').fadeTo(parseInt(argument[1]), 1);
		break;

	case "FADEOUT": case "fadeout":
		$('#sect_story').fadeTo(parseInt(argument[1]), 0.001);
		delayT	=	parseInt(argument[1]);
		break;

	case "FONTSIZE":
		$('#dialog_context').css('font-size', (parseInt(argument[1]) - 4)	+	"px");
		break;

	case 'SHAKE':
		$('#story_'	+	argument[1]	+	'_img').effect('shake', {times: parseInt(argument[2]) / 4}, parseInt(argument[2]) / 30 * 500);
		$('#story_'	+	argument[1]	+	'_face').effect('shake', {times: parseInt(argument[2]) / 4}, parseInt(argument[2]) / 30 * 500);
		break;
	case 'SHAKEBG':
		$('#story_BG').effect('shake', {times: parseInt(argument[1]) / 5}, parseInt(argument[1]) / 30 * 500);
		break;
	}

}

function printContext(ind, context) {
	if ($('#dialog_context').css('font-size') != "24px") {
		$('#dialog_context').css('font-size', "24px");
	}
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
		var mainC;
		try	{
			mainC	=	cntxt.split("");
		}
		catch (exception) {
			mainC	=	'';
		}
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