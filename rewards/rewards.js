function makeList(argument) {
	listBox = document.getElementById('rewards_inf_list_box');
	listBox.innerHTML = '';
	for (var i = 1 + argument * 10; i <= argument * 10 + 10; i++) {
		listBox.innerHTML = listBox.innerHTML + '<div class="rewards_inf_list_box_floor"><div class="floor_num">'+i+' 층</div><div class="floor_img"><img class="floor_img_src" src="item/tik_pri.png"></div><div class="floor_reward">응축된 불확정의 상징물</div><div class="floor_quan">x99</div></div>'
	}
}
makeList(0);