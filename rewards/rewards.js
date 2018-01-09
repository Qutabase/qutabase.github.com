inf = JSON.parse(getJson("https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/rew_inf.json"));
event = JSON.parse(getJson("https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/rew_event.json"));

function makeList(argument) {
	listBox = document.getElementById('rewards_inf_list_box');
	listBox.innerHTML = '';
	for (var i = 1 + argument * 10; i <= argument * 10 + 10; i++) {
		listBox.innerHTML = listBox.innerHTML + '<div class="rewards_inf_list_box_floor"><div class="box_floor_num">'+i+' 층</div><div class="box_floor_img"><img class="box_floor_img_src" src="item/'+inf[i].img+'.png"></div><div class="box_floor_reward">'+inf[i].reward+'</div><div class="box_floor_quan">x'+inf[i].quan+'</div></div>'
	}
}
makeList(0);

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
function infGoal(argument) {
	var inf_result = document.getElementById('inf_result_box');
	inf_result.innerHTML = '';
	for (var key in itemCheck) {
		itemCheck[key] = 0;
	}
	for (var i = 1; i <= argument; i++) {
		if (itemCheck[inf[i].img] == 0) {
			var elem = document.createElement("div");
			elem.setAttribute('class', 'inf_result_box_item');
			elem.setAttribute('id', 'inf_'+inf[i].img);
			itemCheck[inf[i].img] = inf[i].quan;
			elem.innerHTML = '<div class="inf_result_box_img"><img src="item/'+inf[i].img+'.png" width="40"></div>x'+inf[i].quan;
			inf_result.appendChild(elem);
		}
		else {
			var elem = document.getElementById('inf_'+inf[i].img);
			itemCheck[inf[i].img] += inf[i].quan;
			elem.innerHTML = '<div class="inf_result_box_img"><img src="item/'+inf[i].img+'.png" width="40"></div>x'+itemCheck[inf[i].img];
		}
	}
}

function eventGoal(argument) {
	var event_result = document.getElementById('event_result_box');
	event_result.innerHTML = '';
	for (var key in itemCheck) {
		itemCheck[key] = 0;
	}
	for (var i = 1; i <= argument; i++) {
		if (itemCheck[event[i].img] == 0) {
			var elem = document.createElement("div");
			elem.setAttribute('class', 'event_result_box_item');
			elem.setAttribute('id', 'event_'+event[i].img);
			itemCheck[event[i].img] = event[i].quan;
			elem.innerHTML = '<div class="event_result_box_img"><img src="item/'+event[i].img+'.png" width="40"></div>x'+event[i].quan;
			event_result.appendChild(elem);
		}
		else {
			var elem = document.getElementById('event_'+event[i].img);
			itemCheck[event[i].img] += event[i].quan;
			elem.innerHTML = '<div class="event_result_box_img"><img src="item/'+event[i].img+'.png" width="40"></div>x'+itemCheck[event[i].img];
		}
	}
}