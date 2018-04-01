/*
	KODEX PRINT SIMULATOR
	2018-03-10
	DEVELOPED BY SN KINOS
*/

printCheck = {

}

var	list	=	document.getElementById('print_list');
var	res		=	document.getElementById('print_result');

eng.season.SR[1]	-=	3;	//	EXCEPTING MONSTER KODEX

//*	//	ADD / ON HEAD OF THIS LINE
eng.season.SSR[1]		-=	2;	//	EPISODE 1
eng.season['SR+'][1]	-= 2;
/*/
eng.season.SSR[0]		+=	2;	//	EPISODE 2
eng.season['SR+'][0]	+=	2;
//*/

/*
	result()	-	RESULT PRINTER
*/
function result(range) {
	var	pri_id		=	range[0]
						+	Math.floor(
								Math.random()
								*	(
										range[1]	-	range[0]
										+	1
								)
							);

	var	key_list	=	Object.keys(Jdex);
	var	dex			=	{};
	var	kodexLink	=	'#';
	var	imgLink		=	"../raw.png";
	var	bgColor		=	'';
	if (pri_id > 2) {
		for (var j = 0; j < key_list.length; j++) {
			var	srch	=	key_list[j];
			if (Jdex[srch].id == pri_id) {

				dex			=	Jdex[srch];
				if (srch.indexOf('®마법소녀 팥쥐') != -1) {
					;
				}
				else if (srch.indexOf('® ') != -1) {
					temp = srch.substring(2);
					dex = eval("Jdex['" + temp + "']");
				}
				else if (srch.indexOf('®') != -1) {
					temp = srch.substring(1);
					dex = eval("Jdex['" + temp + "']");
				}
				imgLink		=	'https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/Kodex/'
								+	role[dex.role]		+	'/'
								+	dex.enskill			+	'/'
								+	rarity[dex.rarity]	+	'/'
								+	dex.id				+	'/raw.png'
								;
				kodexLink	=	'../index.html?kodexName='
								+	encodeURIComponent(dex.name)
								;
				bgColor		=	dex.rareColor;

			}
		}
	}
	else {

		imgLink	=	range[0]	+	'.png';
		pri_id	=	range[0];
		bgColor	=	(range[0] == 2)
					?
					"#FFE746"
					:
					"#B6D8F5"
					;

	}

	if (imgLink == "../raw.png") {
		print1();
		return;
	}
	

	if (printCheck[pri_id]) {
		printCheck[pri_id]	+=	1;
		var	elem			=	document.getElementById('res_' + pri_id);
		elem.innerHTML		=	'<div><img class="res_img" src="'
								+	imgLink		+	'"></div><br>x'
								+	printCheck[pri_id]
								;
	}
	else {
		printCheck[pri_id]	=	1;
		var	elem			=	document.createElement('div');
		elem.setAttribute(	'id',		'res_'	+	pri_id);
		elem.setAttribute(	'class',	'res_kodex');
		elem.style.background	=	bgColor;
		elem.setAttribute(	'onclick'
				,	'location.href="'
					+	kodexLink
					+	'";'
		);
		elem.innerHTML		=	'<div><img class="res_img" src="'
								+	imgLink		+	'"></div><br>x'
								+	printCheck[pri_id]
								;
		list.appendChild(elem)
	}
}

/*
	print1()	-	PREMIUM PRINT
		SEASON	|	NOT		|	SUM
	SSR	1.0%	|	1.5%	|	2.5%
	SR+	1.5%	|	1.5%	|	3.0%
	SR	5.0%	|	10.0%	|	15.0%
	R+	10.0%	|	30.0%	|	40.0%
	R			39.5%		|	39.5%
*/

function print1(argument) {

	var	rand	=	Math.floor(
						Math.random()	*	1000
					);
	var	range	=	[0,0];

	if	(rand < 10) {
		//	SEASON SSR
		range[1]	=	eng.season.SSR[1];
		range[0]	=	eng.season.SSR[0];
	}
	else if (rand < 25) {
		//	Non-SEASON SSR
		range[1]	=	eng.season.SSR[0];
		range[0]	=	17001;
	}
	else if (rand < 40) {
		//	SEASON SR+
		range[1]	=	eng.season['SR+'][1];
		range[0]	=	eng.season['SR+'][0];
	}
	else if (rand < 55){
		//	Non-SEASON SR+
		range[1]	=	eng.season['SR+'][0];
		range[0]	=	6001;
	}
	else if(rand < 105) {
		//	SEASON SR
		range[1]	=	eng.season.SR[1];
		range[0]	=	eng.season.SR[0];
	}
	else if(rand < 205) {
		//	Non-SEASON SR
		range[0]	=	2
	}
	else if	(rand < 305) {
		//	SEASON R+
		range[1]	=	eng.season['R+'][1];
		range[0]	=	eng.season['R+'][0];
	}
	else if	(rand < 605) {
		//	Non-SEASON R+
		range[0]	=	1;
	}
	else {
		//	R
		;
	}

	result(range);

}

/*
	printB()	-	11 BONUS
		SEASON	|	NOT		|	SUM
	SSR	3.4%	|	1.6%	|	5.0%
	SR+	40.0%	|	55.0%	|	95.0%
*/

function printB(argument) {

	var	rand	=	Math.floor(
						Math.random()	*	1000
					);
	var	range	=	[0,0];

	if (rand < 34) {
		//	SEASON SSR
		range[1]	=	eng.season.SSR[1];
		range[0]	=	eng.season.SSR[0];

	}
	else if (rand < 50) {
		//	Non-SEASON SSR
		range[1]	=	eng.season.SSR[0];
		range[0]	=	17001;
	}
	else if (rand < 450) {
		//	SEASON SR+
		range[1]	=	eng.season['SR+'][1];
		range[0]	=	eng.season['SR+'][0];
	}
	else {
		//	Non-SEASON SR+
		range[1]	=	eng.season['SR+'][0];
		range[0]	=	6001;
	}

	result(range);

}

function print11() {

	document.getElementById('print_cash').innerHTML	=	Number(document.getElementById('print_cash').innerHTML) + 50;
	
	for (var i = 0; i < 10; i++)
		print1();
	printB();

}

/*
	printm()	-	PREMIUM MILEAGE
		SEASON	|	NOT		|	SUM
	SSR	22.0%	|	11.0%	|	33.0%
	SR+	40.0%	|	27.0%	|	67.0%
*/

function printm() {

	var	rand	=	Math.floor(
						Math.random()	*	100
					);
	var	range	=	[0,0];

	if (rand < 22) {
		//	SEASON SSR
		range[1]	=	eng.season.SSR[1];
		range[0]	=	eng.season.SSR[0];

	}
	else if (rand < 33) {
		//	Non-SEASON SSR
		range[1]	=	eng.season.SSR[0];
		range[0]	=	17001;
	}
	else if (rand < 73) {
		//	SEASON SR+
		range[1]	=	eng.season['SR+'][1];
		range[0]	=	eng.season['SR+'][0];
	}
	else {
		//	Non-SEASON SR+
		range[1]	=	eng.season['SR+'][0];
		range[0]	=	6001;
	}

	result(range);

}

/*
	printM()	-	SSR PREMIUM MILEAGE
		SEASON	|	NOT		|	SUM
	SSR	66.6%	|	33.4%	|	100.0%
*/

function printM() {

	var	rand	=	Math.floor(
						Math.random()	*	1000
					);
	var	range	=	[0,0];

	if (rand < 666) {
		//	SEASON SSR
		range[1]	=	eng.season.SSR[1];
		range[0]	=	eng.season.SSR[0];

	}
	else {
		//	Non-SEASON SSR
		range[1]	=	eng.season.SSR[0];
		range[0]	=	17001;
	}

	result(range);

}
