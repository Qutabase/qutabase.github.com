inf = JSON.parse(getJson("https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/rew_inf.json"));
eventP = JSON.parse(getJson("https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/rew_event.json"));

function makeList(argument) {
	infList = document.getElementById('rewards_inf_list_box');
	infList.innerHTML = '';
	for (var i = 1 + argument * 10; i <= argument * 10 + 10; i++) {
		infList.innerHTML = infList.innerHTML + '<div class="rewards_inf_list_box_floor"><div class="box_floor_num">'+i+' 층</div><div class="box_floor_img"><img class="box_floor_img_src" title="'+inf[i].reward+'" alt="" src="item/'+inf[i].img+'.png"></div><div class="box_floor_reward">'+inf[i].reward+'</div><div class="box_floor_quan">'+inf[i].quan+'</div></div>'
	}

}
makeList(0);

floor_start.value = 1;

eventList = document.getElementById('rewards_event_list_box');
eventList.innerHTML = '';
for (var i in eventP){
	eventList.innerHTML = eventList.innerHTML + '<div class="rewards_event_list_box_point"><div class="box_point_num">'+i+'</div><div class="box_point_img"><img class="box_point_img_src" title="'+eventP[i].reward+'" alt="" src="item/'+eventP[i].img+'.png"></div><div class="box_point_reward">'+eventP[i].reward+'</div><div class="box_point_quan">'+eventP[i].quan+'</div></div>'
}

function change(argument) {
	if (argument.innerHTML == "무한나선") {
		document.getElementById('rewards_inf').style.display = 'block';
		document.getElementById('rewards_event').style.display = 'none';
		argument.style.background = '#FFD300'
		argument.parentElement.lastChild.style.background = 'none'
	}
	else {
		document.getElementById('rewards_inf').style.display = 'none';
		document.getElementById('rewards_event').style.display = 'block';
		argument.style.background = '#FFD300'
		argument.parentElement.firstChild.style.background = 'none'
	}
}
itemCheck = {
	"tik_pri":0,
	"pot_sp":0,
	"Fp":0,
	"pot_rev":0,
	"kod_ran":0,
	"kod_ran":0,
	"Cash":0,
	"illusion":0,
	"sum_eli":0,
	"tik_skp":0,
	"nor_exp":0,
	"nor_int":0,
	"nor_mny":0,
	"rar_exp":0,
	"rar_int":0,
	"rar_mny":0,
	"kno_p":0,
	"kno_c":0,
	"uni_p":0,
	"uni_c":0,
	"dim_p":0,
	"spr_exp":0,
	"5_ran":0,
	"6_ran":0,
	"sym_nor":0,
	"sym_con":0
}

function infGoal() {
	var inf_result = document.getElementById('inf_result_box');
	inf_result.innerHTML = '';
	for (var key in itemCheck) {
		itemCheck[key] = 0;
	}
	for (var i = Number(floor_start.value); i <= Number(floor_goal.value); i++) {
		if (itemCheck[inf[i].img] == 0) {
			itemCheck[inf[i].img] = inf[i].quan;
			var elem = document.createElement('div');
			elem.setAttribute('class', 'inf_result_box_item');
			elem.setAttribute('id', 'inf_'+inf[i].img);
			elem.innerHTML = '<div class="inf_result_box_img"><img title="'+inf[i].reward+'" alt="\n'+inf[i].reward+' " src="item/'+inf[i].img+'.png" width="60"></div>x'+inf[i].quan;
			inf_result.appendChild(elem)
		}
		else {
			var elem = document.getElementById('inf_'+inf[i].img);
			itemCheck[inf[i].img] += inf[i].quan;
			elem.innerHTML = '<div class="inf_result_box_img"><img title="'+inf[i].reward+'" alt="\n'+inf[i].reward+' " src="item/'+inf[i].img+'.png" width="60"></div>x'+itemCheck[inf[i].img];
		}
	}
}

function eventGoal() {
	var event_result = document.getElementById('event_result_box');
	event_result.innerHTML = '';
	for (var key in itemCheck) {
		itemCheck[key] = 0;
	}
	console.log(point_start.value, point_goal.value)
	for (var i = Number(point_start.value)*10000; i <= Number(point_goal.value)*10000 && i <= 3000000; i+=500) {
		try {
			if (itemCheck[eventP[i].img] == 0) {
				var elem = document.createElement("div");
				elem.setAttribute('class', 'event_result_box_item');
				elem.setAttribute('id', 'event_'+eventP[i].img);
				itemCheck[eventP[i].img] = eventP[i].quan;
				elem.innerHTML = '<div class="event_result_box_img"><img title="'+eventP[i].reward+'" alt="\n'+eventP[i].reward+' " src="item/'+eventP[i].img+'.png" width="60"></div>x'+eventP[i].quan;
				event_result.appendChild(elem);
			}
			else {
				var elem = document.getElementById('event_'+eventP[i].img);
				itemCheck[eventP[i].img] += eventP[i].quan;
				elem.innerHTML = '<div class="event_result_box_img"><img title="'+eventP[i].reward+'" alt="\n'+eventP[i].reward+' " src="item/'+eventP[i].img+'.png" width="60"></div>x'+itemCheck[eventP[i].img];
			}
		}
		catch (exception){}
	}
}