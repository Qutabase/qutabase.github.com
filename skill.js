
desc = {
	'공격':'공격력 30%'
,	'방어':'체력 30%'
,	'회복':'정신력 50%'
};

perc = {
	'atk':''
,	'ntk':''
,	'stk':''
,	'inn':''
,	'hp':''
,	'spr':''
,	'hea':''
,	'sur':''
,	'tik':''
,	'shi':''
,	'Atk':''
,	'Hp':''
,	'Inn':''
,	'Spr':''
,	'gol':''
,	'sur':''
,	'bun':''
};

function skill(argument, sd, dex) {
	var	res		=	{};
	res['data']	=	{};
	res['data']['desc']	=	['description'];
	res['data']['val']	=	['value'];
	res['data']['name']	=	dex.name;
	var	effect	=	Jskill[argument].effect.split('/');
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
		var	val	=	Number(
						dex[role[dex.role].toUpperCase()][0]
					);
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
		if ((effect[eff] in perc)) {
			val *= 0.01;
			st *= 100;
		}

		if (temp.value == 'deck') {
			val	=	50000;
		}
		else if (temp.value == 'prev') {
			if (prev.indexOf('%') == -1) {
				val	=	Number(
							prev.substring(0, prev.length - 2)
						);
			}
			else {
				val	=	Number(
							prev.substring(0, prev.length - 3)
						);
			}
		}
		res['data']['desc'].push(temp.disp	+	': ');

		// console.log(val, st, dy)
		exps	=	temp.exp1.split(',');
		for (var x in exps) {
			prev	=	(effect[eff] in perc)
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
			res['data']['val'].push(prev);
		}

		count += 1;

	}
	return res;
}