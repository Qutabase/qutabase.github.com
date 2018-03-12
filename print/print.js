/*
	KODEX PRINT SIMULATOR
	2018-03-10
	DEVELOPED BY SN KINOS

	PRINT TABLE
		SEASON	|	NOT		|	SUM
	SSR	1.0%	|	1.5%	|	2.5%
	SR+	1.5%	|	1.5%	|	3.0%
	SR	5.0%	|	10.0%	|	15.0%
	R+	10.0%	|	30.0%	|	40.0%
	R			39.5%		|	39.5%

	11 BONUS
		SEASON	|	NOT		|	SUM
	SSR	3.4%	|	1.6%	|	5.0%
	SR+	40.0%	|	55.0%	|	95.0%

	PREMIUM MILEAGE
		SEASON	|	NOT		|	SUM
	SSR	22.0%	|	11.0%	|	33.0%
	SR+	40.0%	|	27.0%	|	67.0%

	SSR PREMIUM MILEAGE
		SEASON	|	NOT		|	SUM
	SSR	66.6%	|	33.4%	|	100.0%
*/

printCheck = {

}
function print() {
	var	list	=	document.getElementById('print_list');
	
	for (var i = 0; i < 11; i++) {

		var	rand	=	Math.floor(
							Math.random()	*	1000
						) + 1;
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
			//	SEASON SR
			range[1]	=	eng.season['SR+'][1];
			range[0]	=	eng.season['SR+'][0];
		}
		else if (rand < 55){
			//	Non-SEASON SR
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
			range[1]	=	eng.season.SR[0];
			range[0]	=	5001;
		}
		else if	(rand < 305) {
			//	SEASON R+
			range[1]	=	eng.season['R+'][1];
			range[0]	=	eng.season['R+'][0];
		}
		else if	(rand < 605) {
			//	Non-SEASON R+
			range[1]	=	1;
		}
		else {
			//	R
			range[0]	=	1;
		}

		var	pri_id	=	range[0]
						+	Math.floor(
								Math.random()
								*	(
										range[1]	-	range[0]
										+	1
									)
							);
		if (pri_id > 2) {

		}
		else {

			if (range[1] == 1) {
				pri_id	=	1;
			}
			else {
				pri_id	=	0;
			}

		}

		

	}

}