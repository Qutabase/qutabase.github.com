/*	skill.js - QUTABASE SKILL VALUE CALCULATOR
*	CREATED BY SN KINOS
*
*/
Jskill	=	JSON.parse(
				getJson("https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/skill.json")
			);
Jeffect	=	JSON.parse(
				getJson("https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/effect.json")
			);

desc = {
	'공격':'공격력 30%'
,	'방어':'체력 30%'
,	'회복':'정신력 50%'
};

perc = {	//	SKILL IN THIS DICT, IT SHOWS SKILL VALUE WITH NN.NN%
	'atk':''
,	'ntk':''
,	'stk':''
,	'inn':''
,	'hp':''
,	'spr':''
,	'sur':''
,	'Atk':''
,	'Hp':''
,	'Inn':''
,	'Spr':''
,	'sin':''
,	'gol':''
,	'bun':''
,	'fr':''
,	'pye':''
};

bindex = {
	'bind':'0.5 0.5 0.6 0.6 0.7 0.8 0.9 0.8'
,	'N':0.05
,	'N+':0.05
,	'R':0.06
,	'R+':0.06
,	'SR':0.07
,	'SR+':0.08
,	'SSR':0.09
,	'QR':0.08
};

function skill(dex, sd, lv, bind) {
	var	res		=	{};
	res['name']	=	dex.name;
	res['data']	=	{};
	res['data']['desc']	=	['description'];
	res['data']['val']	=	['value'];
	var	effect	=	Jskill[dex.skill].effect.split('/');
	// document.getElementById(zoneid + 'effect').innerHTML = '';
	var	count = 1;
	// var	sd	=	(document.getElementById('simul_index_role').innerHTML == dex.role) ? ['S','D'] : ['s','d'];

	var	st1	=	parseFloat(
					Jskill[dex.skill][sd[0] + 'tatic1']
				);
	var	st2	=	parseFloat(
					Jskill[dex.skill][sd[0] + 'tatic2']
				);
	var	st3	=	parseFloat(
					Jskill[dex.skill][sd[0] + 'tatic3']
				);
	var	dy1	=	parseFloat(
					Jskill[dex.skill][sd[1] + 'ynamic1']
				);
	var	dy2	=	parseFloat(
					Jskill[dex.skill][sd[1] + 'ynamic2']
				);
	var	dy3	=	parseFloat(
					Jskill[dex.skill][sd[1] + 'ynamic3']
				);
	
	var	pd	=	(sd.id)
				?
				Jskill[dex.skill].duration
				:
				Jskill[dex.skill].probability
				;
	var	dur	=	parseFloat(
					Jskill[dex.skill].duration
				);

	for (eff in effect){
		
		var	temp	=	Jeffect[effect[eff]];

		// document.getElementById(zoneid + 'effect').setAttribute('style'
		// 		,	'background: '	+	dex.roleColor + '; color: white;'
		// );
		if (lv) {
			var	val	=	(dex.role == '회복')
						?
						Math.floor(
							( Number(eval(zoneid + 'hp.innerHTML'))
							+ Number(eval(zoneid + 'atk.innerHTML'))
							) / 2
						)
						:
						Math.round(
							Math.floor(
									eval('dex.'	+	role[dex.role]	+	'0')
								+	eval('dex.'	+	role[dex.role]	+	'Lv')	*	(lv - 1)
							)	*	( 1 + bind * bindex[dex.rarity] )
						);
		}
		else {
			var	val	=	Number(
							dex[role[dex.role].toUpperCase()][bind]
						);
		}
		var	st	=	parseFloat(
						Jskill[dex.skill][sd[0] + 'tatic'	+	count]
					);
		var	dy	=	(Jskill[dex.skill][sd[1] + 'ynamic'	+	count] == 'lea')
					? 
					parseFloat(
						Math.floor(
							val
							*	(
									1	+ desc[dex.role].substr(	desc[dex.role].length - 3, 2 )
									/ 100
								)
						)
						*	Jskill[dex.skill]['dynamic' + count]
					)
					:
					parseFloat(
						Jskill[dex.skill][sd[1] + 'ynamic'	+ count]
					) *	val
					;
		if (temp.value == 'deck') {
			val	+=	50000;
			dy	*=	0.01;
		}
		(sd.id)
		?
		val = Math.floor(
					val
					*	(
							1	+	desc[dex.role].substr(	desc[dex.role].length - 3, 2 )
							/	100
						)
				)
		:
		''
		;
		if (temp.value == 'prev') {
			val	=	prev;
		}
		if ((effect[eff] in perc)) {
			val *= 0.01;
			st *= 100;
		}
		res['data']['desc'].push(temp.disp	+	': ');

		exps	=	temp.exp1.split(',');
		res['data']['val'][count]	=	[];
		for (var x in exps) {
			prev					=	(effect[eff] in perc)
										?
										Math.floor(
											eval(exps[x])	*	100
										)	/	100
										+ '%'
										:
										Math.floor(
											eval(exps[x])
										)
										;
			res['data']['val'][count].push(prev);
		}

		count += 1;

	}
	return res;
}