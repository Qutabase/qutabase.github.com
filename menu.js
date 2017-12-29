skill_flag = 0
function menu_skill_click(argument) {
	if (!skill_flag) {
		document.getElementById('list_skill').setAttribute('style', 'display: block;');
		skill_flag = 1
	}
	else{
		document.getElementById('list_skill').setAttribute('style', 'display: none;');
		skill_flag = 0
	}
}