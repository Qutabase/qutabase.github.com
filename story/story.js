lastStory = JSON.parse(
  getJson(
    'https://raw.githubusercontent.com/Qutabase/qutabase.github.com/master/story/test.json'
  )
);
eventStory = JSON.parse(
  getJson(
    'https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/eventStoryJ.qt'
  )
);
cardInfo = JSON.parse(
  getJson(
    'https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/CardInfoScript-dec.qt'
  )
);
mainStory = JSON.parse(
  getJson(
    'https://raw.githubusercontent.com/Sn-Kinos/Qutabase/master/mainStoryJB.qt'
  )
);

var dialogs;
function dialogPrs(argument) {
  dialogs = argument['Dialog'].split('#');
  $('#story_index').html('Ch. ' + chap + ' / ' + 'Index. ' + index);
  $('#sect_story').fadeTo(0, 1);
}

var line;
var nick;
var type;
var chap;
var index;
var count;
var shkBgFlg;
var story;
var delayT = 0;
var printFlag = false;
var endOfDlg = false;
var fullScrFlg = false;
var skipClick = {
  BACKGROUND: '',
  BGM: '',
  FLIP: '',
  HIDE: '',
  FADEOUT: '1',
  FADEIN: '1',
  FX: '',
  SHAKE: '',
  SENARIO: '',
  FONTSIZE: '',
  SHAKEBG: '',
  SHAKEBGLOOP: '',
  SHADE: '',
  VOICE: '',
  SE: '',
  LL: '',
  LM: '',
  LR: '',
  FLASH: '',
};

document
  .getElementsByTagName('footer')[0]
  .addEventListener('click', function () {
    document.getElementsByTagName('article')[0].style.display = 'inline-block';
  });

document.addEventListener(
  'keydown',
  function () {
    if (window.event.keyCode == 122) {
      window.event.returnValue = false;
      var elem = document.documentElement;
      if (fullScrFlg) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          /* Firefox */
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
          /* Chrome, Safari & Opera */
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          /* IE/Edge */
          elem.msRequestFullscreen();
        }
      }
    }
  },
  false
);

document.addEventListener('fullscreenchange', function () {
  if (fullScrFlg) {
    document
      .getElementsByTagName('article')[0]
      .classList.remove('story_fullScr');
    document.getElementById('dialog_name').style.fontSize = '26px';
    document.getElementById('dialog_context').style.fontSize = '24px';
    fullScrFlg = false;
  } else {
    document.getElementsByTagName('article')[0].classList.add('story_fullScr');
    document.getElementById('dialog_name').style.fontSize = '2vw';
    document.getElementById('dialog_context').style.fontSize = '1.85vw';
    fullScrFlg = true;
  }
});

story_ctrl_flag = 0;
document.getElementById('story_index').addEventListener('click', function () {
  menu_skill_click('story_ctrl');
});

document.getElementById('ctrl_index').addEventListener('click', function () {
  menu_select(story);
  execute(['HIDE', 'all']);
  endOfDlg = false;
  flipReset();
  document.getElementById('dialog_name').innerHTML = '이동 완료';
  document.getElementById('dialog_context').innerHTML =
    '클릭하시면 다음으로 넘어갑니다.';
});

document.getElementById('ctrl_vol').addEventListener('change', function () {
  var vol = this.value / 100;
  document.getElementById('story_BGM').volume = vol;
  document.getElementById('ctrl_volVal').innerHTML = Math.floor(vol * 100);
});
document.getElementById('story_BGM').volume = 0.25;

function chapPlay(argument) {
  chap = argument;
  var stories = eval(story + 'Story');
  if (story == 'main') {
    for (var kodex in stories) {
      if (stories[kodex]['Zone'] == eng[story + 'Zone'][chap][0]) {
        index = parseInt(stories[kodex]['Index']);
        break;
      }
    }
  } else if (story == 'event') {
    for (var kodex in stories) {
      if (
        parseInt(stories[kodex]['Zone'].toString().substr(2, 2)) == argument
      ) {
        index = parseInt(stories[kodex]['Index']);
        break;
      }
    }
  }
  dialogPrs(stories[index]);
}

function menu_select(argument) {
  /*
	nick	=	prompt("스토리에 표시될 이름을 입력해주세요.");
	/*/
  nick = 'Kinos';
  //*/
  count = 0;
  var start;
  chap = prompt('챕터 번호를 입력해주세요. (i숫자로 입력 시 인덱스 번호)');
  story = argument;
  if (argument == 'main') {
    if (chap[0] == 'i') {
      index = parseInt(chap.substr(1));
      var tmp = parseInt(mainStory[index]['Zone']);
      for (var i = 0; i < eng[argument + 'Zone'].length; i++) {
        if (
          parseInt(eng[argument + 'Zone'][i][0]) <= tmp &&
          tmp <=
            parseInt(eng[argument + 'Zone'][i][0]) +
              parseInt(eng[argument + 'Zone'][i][1]) -
              1
        ) {
          chap = i;
          dialogPrs(mainStory[index]);
          break;
        }
      }
    } else {
      chapPlay(parseInt(chap));
    }
  } else {
    if (chap[0] == 'i') {
      index = parseInt(chap.substr(1));
      chap = parseInt(eventStory[index]['Zone'].toString().substr(2, 2));
      dialogPrs(eventStory[index]);
    } else {
      chapPlay(parseInt(chap));
    }
    //dialogPrs(lastStory);
  }
  document.getElementById('sect_story').style.display = 'block';
  document.getElementById('sect_menu').style.display = 'none';
}

function flipReset() {
  for (var x in { L: '', M: '', R: '' }) {
    var elem = document.getElementById('story_' + x + '_img');
    if (elem.flip) {
      elem.style.transform = 'scale(1, 1)';
      document.getElementById('story_' + x + '_face').style.transform =
        'scale(1, 1)';
      elem.flip = false;
    }
  }
}

function filterReset() {
  $('.story_img_spotlight').removeClass('story_img_spotlight');
}

function prsLn(argument) {
  if (endOfDlg) {
    execute(['HIDE', 'all']);
    endOfDlg = false;
    flipReset();
    document.getElementById('dialog_name').innerHTML = '';
    document.getElementById('dialog_context').innerHTML = '';
  }

  try {
    line = argument[count].split(',');
    if (line == ['']) throw 'EndOfChapter';
  } catch (exception) {
    if (confirm('Ch. ' + (chap + 1) + '로 넘어가시겠습니까?')) {
      chapPlay(++chap);
    } else {
      document.getElementById('sect_menu').style.display = 'block';
      document.getElementById('sect_story').style.display = 'none';
      execute(['HIDE', 'all']);
    }
    count = 0;
    return;
  }
  count++;
  execute(line);

  try {
    var tmp = argument[count].split(',');
    if (tmp[0].toUpperCase() in skipClick) {
      setTimeout(
        function () {
          prsLn(argument);
        },
        tmp[0] == 'BACKGROUND' ? 1 : delayT + 1
      );
    } else if (
      (tmp[0] == 'L' || tmp[0] == 'M' || tmp[0] == 'R') &&
      (tmp[3] == undefined || tmp[3] == '' || tmp[3] == ' ')
    ) {
      setTimeout(function () {
        prsLn(argument);
      }, 1);
    }
    if (tmp[0] == 'L' || tmp[0] == 'M' || tmp[0] == 'R') {
      var fc = document.getElementById('story_buffer_face');
      switch (tmp[1]) {
        case '9001':
        case '9002':
        case '9003':
          tmp[1] = '1001' + tmp[1][3];
          fc.src = 'portrait/' + tmp[1] + '.png';
          break;
        case '10001':
        case '10002':
        case '10003':
          tmp[1] = '1001' + tmp[1][4];
          fc.src = 'portrait/' + tmp[1] + '.png';
          break;
        case '9004':
          fc.src = 'portrait/9004g.png';
          break;
        case '9006':
          fc.src = 'portrait/9006.png';
          tmp[1] = '9005';
          break;
        case '0':
          break;
        default:
          if ((fc.src = 'portrait/none.png')) {
            fc.src = 'portrait/none.png';
          }
      }

      document.getElementById('story_buffer_img').src =
        'portrait/' + tmp[1] + '.png';
      tmp[2] = tmp[2].toUpperCase();
      if (tmp[2] == 'EYEDOWN') {
        if (fc.style.backgroundImage.substr(this.length - 4, 4) != '.gif') {
          fc.style.backgroundImage = 'url(portrait/' + tmp[1] + '.gif)';
        }
      } else if (tmp[2] == 'NONE') {
        fc.style.backgroundImage = 'none';
      } else {
        fc.style.backgroundImage =
          'url(portrait/' + tmp[1] + tmp[2].toLowerCase() + '.png)';
      }
    }
  } catch (exception) {
    endOfDlg = true;
    if (story == 'main') {
      if (
        mainStory[index + 1]['Zone'] <=
        eng[story + 'Zone'][chap][0] + eng[story + 'Zone'][chap][1] - 1
      ) {
        dialogPrs(mainStory[++index]);
        // console.log(index);
        document.getElementById('story_senario').src = '';
        document.getElementById('story_senario').style.display = 'none';
        count = 0;
      }
    } else {
      if (
        eventStory[index]['Zone'].toString().substr(2, 2) ==
        eventStory[index + 1]['Zone'].toString().substr(2, 2)
      ) {
        dialogPrs(eventStory[++index]);
        document.getElementById('story_senario').src = '';
        document.getElementById('story_senario').style.display = 'none';
        count = 0;
      }
    }
  }
}

function execute(argument) {
  console.log(argument.toString());
  for (var i = 0; i < 2 && argument[i] != undefined; i++) {
    argument[i] = argument[i].toUpperCase();
  }
  if (argument[0] in { L: '', M: '', R: '' } && argument[2]) {
    argument[2] = argument[2].toUpperCase();
  }
  switch (argument[0]) {
    case 'BACKGROUNDGROUP':
      break;

    case 'BACKGROUND':
      if (delayT == 0) {
        var fadeDur = argument[2] != undefined ? argument[2] : 500;
        setTimeout(function () {
          document.getElementById('sect_story').style.backgroundImage =
            'url(bg/' + argument[1].toLowerCase() + '.jpg)';
          $('#story_BG').fadeOut(fadeDur);
          setTimeout(function () {
            var tmp = document.getElementById('story_BG');
            tmp.src = 'bg/' + argument[1].toLowerCase() + '.jpg';
            tmp.style.display = 'initial';
          }, fadeDur + 100);
          delayT = 0;
        }, delayT);
      } else {
        setTimeout(function () {
          document.getElementById('story_BG').src =
            'bg/' + argument[1].toLowerCase() + '.jpg';
          delayT = 0;
        }, delayT);
      }
      document.getElementById('story_BG').style.display = 'initial';
      break;

    case 'BGM':
      {
        var bgm = document.getElementById('story_BGM');
        if (argument[1] == null || argument[1] == '') {
          bgm.pause();
          bgm.src = '';
        } else if (
          'bgm/' + argument[1].toLowerCase() + '.mp3' ==
          bgm.getAttribute('src')
        ) {
          if (
            argument[3] == 'RESETPLAYBACK' ||
            argument[3] == 'ResetPlayback'
          ) {
            bgm.load();
            bgm.play();
          }
        } else {
          bgm.src = 'bgm/' + argument[1].toLowerCase() + '.mp3';
          bgm.play();
        }
      }
      break;

    case 'SE':
      // var se	=	document.getElementById('story_SE');
      // se.src	=	'SE/'	+	argument[1].toLowerCase()	+	'.wav';
      // se.play();
      break;

    case 'SENARIO':
      document.getElementById('story_senario').src = argument[1]
        ? 'popup/' + argument[1] + '.png'
        : '';
      break;

    case 'WAIT':
      break;

    case 'NEXT':
      setTimeout(function () {
        flipReset();
      }, 10);
      flipReset();
      break;

    case 'NA':
      document.getElementById('dialog_name').innerHTML = argument[1] + '　';
      printContext(2, argument);
      break;

    case 'LL':
    case 'LM':
    case 'LR':
      break;

    case 'L':
    case 'M':
    case 'R':
      setTimeout(function () {
        var elem = $('#story_' + argument[0] + '_img');
        var face = $('#story_' + argument[0] + '_face');
        if (argument[1] == 'on' || argument[1] == 'ON') {
          elem.css('display', 'initial');
          face.css('display', 'initial');
          return;
        }
        switch (argument[1]) {
          case '9001':
          case '9002':
          case '9003':
            argument[1] = '1001' + argument[1][3];
            break;
          case '10001':
          case '10002':
          case '10003':
            face.attr('src', 'portrait/' + argument[1] + '.png');
            argument[1] = '1001' + argument[1][4];
            break;
          case '9004':
            face.attr('src', 'portrait/9004g.png');
            break;
          case '9006':
            face.attr('src', 'portrait/9006.png');
            argument[1] = '9005';
            break;
          case '0':
            document.getElementById('story_' + argument[0] + '_img').src =
              'portrait/none.png';
            printContext(3, argument);
            return;
          default:
            if (face.attr('src') != 'portrait/none.png') {
              face.attr('src', 'portrait/none.png');
            }
        }

        elem.css('display', 'initial');
        face.css('display', 'initial');
        document.getElementById('story_' + argument[0] + '_img').src =
          'portrait/' + argument[1] + '.png';
        var tmp = document.getElementById('story_' + argument[0] + '_face');
        argument[1] = argument[1].replace(/[ABC]/g, '');
        if (argument[3] != '') {
          document.getElementById('dialog_name').innerHTML = '　';
          for (var kodex in cardInfo) {
            if (cardInfo[kodex].Number == argument[1]) {
              document.getElementById('dialog_name').innerHTML =
                cardInfo[kodex].GivenName;
            }
          }
        }
        if (argument[2] == 'EYEDOWN') {
          if (tmp.style.backgroundImage.substr(this.length - 4, 4) != '.gif') {
            tmp.style.backgroundImage = 'url(portrait/' + argument[1] + '.gif)';
          }
        } else if (argument[2] == 'NONE') {
          tmp.style.backgroundImage = 'none';
        } else {
          tmp.style.backgroundImage =
            'url(portrait/' + argument[1] + argument[2].toLowerCase() + '.png)';
        }
        printContext(3, argument);
        elem.addClass('story_img_spotlight');
        face.addClass('story_img_spotlight');
      }, delayT);
      break;

    case 'FLIP':
      {
        var elem = document.getElementById('story_' + argument[1] + '_img');
        var face = document.getElementById('story_' + argument[1] + '_face');
        if (!elem.flip) {
          elem.style.transform = 'scale(-1, 1)';
          face.style.transform = 'scale(-1, 1)';
          elem.flip = true;
        } else {
          elem.style.transform = 'scale(1, 1)';
          face.style.transform = 'scale(1, 1)';
          elem.flip = false;
        }
      }
      break;

    case 'HIDE':
      setTimeout(function () {
        if (argument[1] == 'ALL' || argument[1] == 'all') {
          document.getElementById('story_L_img').style.display = 'none';
          document.getElementById('story_M_img').style.display = 'none';
          document.getElementById('story_R_img').style.display = 'none';
          document.getElementById('story_L_face').style.display = 'none';
          document.getElementById('story_M_face').style.display = 'none';
          document.getElementById('story_R_face').style.display = 'none';
        } else {
          document.getElementById(
            'story_' + argument[1] + '_img'
          ).style.display = 'none';
          document.getElementById(
            'story_' + argument[1] + '_face'
          ).style.display = 'none';
        }
        delayT = 0;
      }, delayT);
      break;

    case 'FADEIN':
      $('#sect_story').fadeTo(parseInt(argument[1]), 1);
      delayT = parseInt(argument[1]);
      setTimeout(function () {
        delayT = 0;
      }, delayT);
      break;

    case 'FADEOUT':
      $('#sect_story').fadeTo(parseInt(argument[1]), 0.001);
      delayT = parseInt(argument[1]);
      break;

    case 'FONTSIZE':
      if (fullScrFlg) {
        $('#dialog_context').css(
          'font-size',
          1.85 + (parseInt(argument[1]) - 5 - 24) * 0.1 + 'vw'
        );
      } else {
        $('#dialog_context').css('font-size', parseInt(argument[1]) - 5 + 'px');
      }
      break;

    case 'SHAKE':
      if (argument[1] == 'ALL') {
        $('#story_L_img').effect(
          'shake',
          { times: parseInt(argument[2]) / 4 },
          (parseInt(argument[2]) / 30) * 500
        );
        $('#story_L_face').effect(
          'shake',
          { times: parseInt(argument[2]) / 4 },
          (parseInt(argument[2]) / 30) * 500
        );
        $('#story_M_img').effect(
          'shake',
          { times: parseInt(argument[2]) / 4 },
          (parseInt(argument[2]) / 30) * 500
        );
        $('#story_M_face').effect(
          'shake',
          { times: parseInt(argument[2]) / 4 },
          (parseInt(argument[2]) / 30) * 500
        );
        $('#story_R_img').effect(
          'shake',
          { times: parseInt(argument[2]) / 4 },
          (parseInt(argument[2]) / 30) * 500
        );
        $('#story_R_face').effect(
          'shake',
          { times: parseInt(argument[2]) / 4 },
          (parseInt(argument[2]) / 30) * 500
        );
      } else {
        $('#story_' + argument[1] + '_img').effect(
          'shake',
          { times: parseInt(argument[2]) / 4 },
          (parseInt(argument[2]) / 30) * 500
        );
        $('#story_' + argument[1] + '_face').effect(
          'shake',
          { times: parseInt(argument[2]) / 4 },
          (parseInt(argument[2]) / 30) * 500
        );
      }
      break;

    case 'SHAKEBG':
      $('#story_BG').effect(
        'shake',
        { times: parseInt(argument[1]) / 5 },
        (parseInt(argument[1]) / 30) * 500
      );
      break;

    case 'SHAKEBGLOOP':
      if (argument[1] == 'ON') {
        function shkLOOP() {
          $('#story_BG').effect(
            'shake',
            { times: parseInt(argument[2]) / 5 },
            (parseInt(argument[2]) / 30) * 500
          );
        }
        shkBgFlg = setInterval(shkLOOP, (parseInt(argument[2]) / 30) * 500);
      } else {
        clearInterval(shkBgFlg);
      }
      break;

    case 'FLASH':
      {
        delayT = parseInt(argument[1]);
        setTimeout(function () {
          var fx = document.getElementById('story_FX');
          fx.src = 'bg/none_2.jpg';
          fx.style.width = '100%';
          fx.style.height = '100%';
          $('#story_FX').fadeIn(parseInt(argument[1]) / 2);
          $('#story_FX').fadeOut(parseInt(argument[1]) / 2);
          delayT = 0;
        }, delayT);
      }
      break;
  }
}

function printContext(ind, context) {
  filterReset();
  clearInterval(type);
  if ($('#dialog_context').css('font-size') != fullScrFlg ? '1.85vw' : '24px') {
    $('#dialog_context').css('font-size', fullScrFlg ? '1.85vw' : '24px');
  }
  delete type;
  printFlag = true;
  for (var i = 0; i < context.length; i++) {
    var colors = /\[......\]/g;
    colors = context[i].match(colors);
    for (color in colors) {
      /*
			context[i]	=	context[i].replace(colors[color], "<span style='color: #"	+	colors[color].substr(1, 6)	+	";'>");
			context[i]	=	context[i].replace(/\[-\]/g, "</span>");
/*/
      context[i] = context[i].replace(colors[color], '');
      context[i] = context[i].replace(/\[-\]/g, '');
      context[i] = context[i].replace(/\[-\]/g, '');
      //*/
      context[i] = context[i].replace('{NICKNAME}', nick);
      context[i] = context[i].replace('<username/>', nick);
    }
  }
  var cntxt = context[ind];
  for (var i = ind + 1; context[i] != undefined; i++) {
    cntxt += ',' + context[i];
  }

  //*
  var skpFlg = false;
  function typing() {
    var mainC;
    try {
      mainC = cntxt.split('');
    } catch (exception) {
      mainC = '';
    }
    var i = 0;
    var dlgCnt = document.getElementById('dialog_context');
    dlgCnt.innerHTML = '';
    function show() {
      if (i < mainC.length) {
        dlgCnt.innerHTML += mainC[i];
        i++;
      } else {
        i = 9999;
        printFlag = false;
        delete type;
      }
    }
    type = setInterval(show, 15);
  }
  typing();
  /*/
	document.getElementById('dialog_context').innerHTML	=	cntxt;
	//*/
}
