// 最も近い値を格納したリストの添え字を求める
// mode = 0:通常の処理,  1:次の時間の処理,  3:次の次の時間の処理
function get_nearest_value(minutes, mode = 0, reset = false) {

    // オブジェクトのサイズ
    if (minutes == null) {
        var size = 0;
    } else {
        var size = Object.keys(minutes).length;
    }

    // 今の時間(分)
    var now_minutes = date.getMinutes();


    if (size < 1) {
        return -1;
    }

    // for (var key in minutes){
    //     if (minutes.hasOwnProperty(key)){
    //         console.log(key, minutes[key]);
    //     }
    // }

    // 現在時間+1の時刻表データ(分)を返す処理
    if (mode == 1) {
        return minutes[0];
    }

    if (reset) {
        now_minutes = 0;
    }

    var l_flag = false;
    // 次の発車時間が見つかったらその時間を返す
    for (var i = 0; i < size; i++) {
        if (minutes[i] >= now_minutes && mode == 0) {
            return minutes[i];
        }

        // 次の次のバスの時刻を返す
        if (minutes[i] >= now_minutes && mode == 3 && l_flag) {
            return minutes[i];
        }

        if (minutes[i] >= now_minutes && mode == 3) {
            l_flag = true;
        }
    }

    // 次の出発時間が見つからなかったら-1を返す
    return -1;
}


// 今日の日付けを取得
var date = new Date();
month = date.getMonth() + 1;
today = date.getFullYear() + "-" + month + "-" + date.getDate();


// 時刻表データを定義(JSON形式)
const A1_json = '{"0":null,"1":null,"2":null,"3":null,"4":null,"5":null,"6":null,"7":null,"8":[0,5,10,15,20,25,30,35,40,45,50,55],"9":[0,5,10,15,20,25,30,35,40,50,55],"10":[0,5,10,15,20,25,30,35,45,55],"11":[5,15,25,35,45,55],"12":[5,15,25,35,45,55],"13":[5,20,35,50],"14":[5,15,25,35,45,55],"15":[5,15,30,45],"16":[0,15,30,45],"17":[0,15,30,45],"18":[0,15,30,45],"19":[0,15,30,45],"20":[0,30],"21":[0],"22":null,"23":null}';
const A2_json = '{"0":null,"1":null,"2":null,"3":null,"4":null,"5":null,"6":null,"7":null,"8":[20,50],"9":[20,50],"10":[20,50],"11":[0,10,20,30,40,50],"12":[0,10,20,30,40,50],"13":[0,15,30,45],"14":[0,10,20,30,40,45,50,55],"15":[0,10,20,30,40,50],"16":[0,5,10,15,25,30,35,40,45,50,55],"17":[0,5,10,15,30,35,40,45,55],"18":[0,10,20,30,40,50],"19":[0,15,30,45],"20":[0,15,30,45],"21":[0,15,30,45],"22":null,"23":null}';
const B1_json = '{"0":null,"1":null,"2":null,"3":null,"4":null,"5":null,"6":null,"7":null,"8":[0,10,20,35,45],"9":[0,5,15,35,50],"10":[0,5,15,35,50],"11":[5,35],"12":[5,35],"13":[35],"14":[5,35],"15":[5,35],"16":[5,45],"17":[10,45],"18":[5,35],"19":[35],"20":[25],"21":[5],"22":null,"23":null}';
const B2_json = '{"0":null,"1":null,"2":null,"3":null,"4":null,"5":null,"6":null,"7":null,"8":[50],"9":[50],"10":[20,50],"11":[20,50],"12":[20],"13":[20,50],"14":[20,50],"15":[20,50],"16":[20],"17":[0,30,55],"18":[20,50],"19":[20,50],"20":[40],"21":[30],"22":null,"23":null}';
const C1_json = '{"0":null,"1":null,"2":null,"3":null,"4":null,"5":null,"6":null,"7":null,"8":[10,35],"9":[5,35],"10":[5,35],"11":[5,35],"12":[5,35],"13":[35],"14":[5,35],"15":[5,35],"16":[5,45],"17":[10,45],"18":[5,35],"19":[35],"20":[25],"21":[5],"22":null,"23":null}';
const C2_json = '{"0":null,"1":null,"2":null,"3":null,"4":null,"5":null,"6":null,"7":null,"8":[50],"9":[50],"10":[20,50],"11":[20,50],"12":[20],"13":[20,50],"14":[20,50],"15":[20,50],"16":[20],"17":[0,30,55],"18":[20,50],"19":[20,50],"20":[40],"21":[30],"22":null,"23":null}';
const daiya_json = '{"2019-4-1":"C","2019-4-2":"B","2019-4-3":"B","2019-4-4":"B","2019-4-5":"A","2019-4-6":"C","2019-4-7":null,"2019-4-8":"A","2019-4-9":"A","2019-4-10":"A","2019-4-11":"A","2019-4-12":"A","2019-4-13":"C","2019-4-14":null,"2019-4-15":"A","2019-4-16":"A","2019-4-17":"A","2019-4-18":"A","2019-4-19":"A","2019-4-20":"C","2019-4-21":null,"2019-4-22":"A","2019-4-23":"A","2019-4-24":"A","2019-4-25":"A","2019-4-26":"A","2019-4-27":"C","2019-4-28":null,"2019-4-29":null,"2019-4-30":null,"2019-5-1":null,"2019-5-2":null,"2019-5-3":null,"2019-5-4":null,"2019-5-5":null,"2019-5-6":"A","2019-5-7":"A","2019-5-8":"A","2019-5-9":"A","2019-5-10":"A","2019-5-11":"C","2019-5-12":null,"2019-5-13":"A","2019-5-14":"A","2019-5-15":"A","2019-5-16":"A","2019-5-17":"A","2019-5-18":"C","2019-5-19":null,"2019-5-20":"A","2019-5-21":"A","2019-5-22":"A","2019-5-23":"A","2019-5-24":"A","2019-5-25":"C","2019-5-26":null,"2019-5-27":"A","2019-5-28":"A","2019-5-29":"A","2019-5-30":"A","2019-5-31":"A","2019-6-1":"C","2019-6-2":null,"2019-6-3":"A","2019-6-4":"A","2019-6-5":"A","2019-6-6":"A","2019-6-7":"A","2019-6-8":"C","2019-6-9":null,"2019-6-10":"A","2019-6-11":"A","2019-6-12":"A","2019-6-13":"A","2019-6-14":"A","2019-6-15":"B","2019-6-16":null,"2019-6-17":"A","2019-6-18":"A","2019-6-19":"A","2019-6-20":"A","2019-6-21":"A","2019-6-22":"C","2019-6-23":null,"2019-6-24":"A","2019-6-25":"A","2019-6-26":"A","2019-6-27":"A","2019-6-28":"A","2019-6-29":"C","2019-6-30":null,"2019-7-1":"A","2019-7-2":"A","2019-7-3":"A","2019-7-4":"A","2019-7-5":"A","2019-7-6":"C","2019-7-7":null,"2019-7-8":"A","2019-7-9":"A","2019-7-10":"A","2019-7-11":"A","2019-7-12":"A","2019-7-13":"C","2019-7-14":null,"2019-7-15":"A","2019-7-16":"A","2019-7-17":"A","2019-7-18":"A","2019-7-19":"A","2019-7-20":"A","2019-7-21":"A","2019-7-22":"A","2019-7-23":"A","2019-7-24":"A","2019-7-25":"A","2019-7-26":"A","2019-7-27":"A","2019-7-28":"A","2019-7-29":"A","2019-7-30":"A","2019-7-31":"A","2019-8-1":"A","2019-8-2":"A","2019-8-3":"A","2019-8-4":null,"2019-8-5":"A","2019-8-6":"A","2019-8-7":"A","2019-8-8":"A","2019-8-9":"C","2019-8-10":"C","2019-8-11":null,"2019-8-12":null,"2019-8-13":null,"2019-8-14":null,"2019-8-15":null,"2019-8-16":null,"2019-8-17":"C","2019-8-18":null,"2019-8-19":"C","2019-8-20":"B","2019-8-21":"B","2019-8-22":"B","2019-8-23":"C","2019-8-24":"C","2019-8-25":null,"2019-8-26":"C","2019-8-27":"C","2019-8-28":"C","2019-8-29":"C","2019-8-30":"C","2019-8-31":"C","2019-9-1":null,"2019-9-2":"C","2019-9-3":"C","2019-9-4":"C","2019-9-5":"C","2019-9-6":"C","2019-9-7":"C","2019-9-8":null,"2019-9-9":"C","2019-9-10":"C","2019-9-11":"C","2019-9-12":"C","2019-9-13":"C","2019-9-14":"C","2019-9-15":null,"2019-9-16":null,"2019-9-17":"C","2019-9-18":"C","2019-9-19":"A","2019-9-20":"B","2019-9-21":"C","2019-9-22":null,"2019-9-23":"A","2019-9-24":"A","2019-9-25":"A","2019-9-26":"A","2019-9-27":"A","2019-9-28":"C","2019-9-29":null,"2019-9-30":"A","2019-10-1":"A","2019-10-2":"A","2019-10-3":"A","2019-10-4":"A","2019-10-5":"C","2019-10-6":null,"2019-10-7":"A","2019-10-8":"A","2019-10-9":"A","2019-10-10":"B","2019-10-11":"B","2019-10-12":"A","2019-10-13":"A","2019-10-14":null,"2019-10-15":"A","2019-10-16":"A","2019-10-17":"A","2019-10-18":"A","2019-10-19":"B","2019-10-20":null,"2019-10-21":"A","2019-10-22":null,"2019-10-23":"A","2019-10-24":"A","2019-10-25":"A","2019-10-26":"C","2019-10-27":null,"2019-10-28":"A","2019-10-29":"A","2019-10-30":"A","2019-10-31":"A","2019-11-1":"A","2019-11-2":"A","2019-11-3":null,"2019-11-4":"A","2019-11-5":"A","2019-11-6":"A","2019-11-7":"A","2019-11-8":"A","2019-11-9":"C","2019-11-10":null,"2019-11-11":"A","2019-11-12":"B","2019-11-13":null,"2019-11-14":"A","2019-11-15":"A","2019-11-16":"A","2019-11-17":null,"2019-11-18":"A","2019-11-19":"A","2019-11-20":"A","2019-11-21":"A","2019-11-22":"A","2019-11-23":"A","2019-11-24":null,"2019-11-25":"A","2019-11-26":"A","2019-11-27":"A","2019-11-28":"A","2019-11-29":"A","2019-11-30":"A","2019-12-1":"A","2019-12-2":"A","2019-12-3":"A","2019-12-4":"A","2019-12-5":"A","2019-12-6":"C","2019-12-7":null,"2019-12-8":"A","2019-12-9":"A","2019-12-10":"A","2019-12-11":"A","2019-12-12":"A","2019-12-13":"C","2019-12-14":null,"2019-12-15":"A","2019-12-16":"A","2019-12-17":"A","2019-12-18":"A","2019-12-19":"A","2019-12-20":"C","2019-12-21":null,"2019-12-22":"A","2019-12-23":"A","2019-12-24":"C","2019-12-25":null,"2019-12-26":null,"2019-12-27":null,"2019-12-28":null,"2019-12-29":null,"2019-12-30":null,"2019-12-31":null,"2020-1-1":null,"2020-1-2":null,"2020-1-3":null,"2020-1-4":null,"2020-1-5":"A","2020-1-6":"A","2020-1-7":"A","2020-1-8":"A","2020-1-9":"A","2020-1-10":"C","2020-1-11":null,"2020-1-12":null,"2020-1-13":"A","2020-1-14":"A","2020-1-15":"A","2020-1-16":"A","2020-1-17":"A","2020-1-18":"A","2020-1-19":"A","2020-1-20":"A","2020-1-21":"A","2020-1-22":"A","2020-1-23":"A","2020-1-24":"C","2020-1-25":"C","2020-1-26":"A","2020-1-27":"A","2020-1-28":"A","2020-1-29":"A","2020-1-30":"A","2020-1-31":"C","2020-2-1":null,"2020-2-2":"A","2020-2-3":"A","2020-2-4":"A","2020-2-5":"A","2020-2-6":"A","2020-2-7":"C","2020-2-8":null,"2020-2-9":"A","2020-2-10":null,"2020-2-11":"A","2020-2-12":"A","2020-2-13":"A","2020-2-14":"A","2020-2-15":null,"2020-2-16":"C","2020-2-17":"C","2020-2-18":"C","2020-2-19":"C","2020-2-20":"C","2020-2-21":"C","2020-2-22":null,"2020-2-23":null,"2020-2-24":"C","2020-2-25":"C","2020-2-26":"C","2020-2-27":"C","2020-2-28":"C","2020-2-29":null,"2020-3-1":"A","2020-3-2":"A","2020-3-3":"A","2020-3-4":"A","2020-3-5":"A","2020-3-6":"C","2020-3-7":null,"2020-3-8":"C","2020-3-9":"C","2020-3-10":"C","2020-3-11":"C","2020-3-12":"C","2020-3-13":"C","2020-3-14":null,"2020-3-15":"C","2020-3-16":"C","2020-3-17":"C","2020-3-18":"C","2020-3-19":null,"2020-3-20":"C","2020-3-21":null,"2020-3-22":"A","2020-3-23":"C","2020-3-24":"C","2020-3-25":"C","2020-3-26":"C","2020-3-27":"C","2020-3-28":null,"2020-3-29":"C","2020-3-30":"C"}';


//　JSONデータをパースする
const A1 = JSON.parse(A1_json);
const A2 = JSON.parse(A2_json);
const B1 = JSON.parse(B1_json);
const B2 = JSON.parse(B2_json);
const C1 = JSON.parse(C1_json);
const C2 = JSON.parse(C2_json);
const daiyas = JSON.parse(daiya_json);


// 今日のダイヤを取り出す
daiya = daiyas[today]


// もし今日のバスがなければページを遷移する
if (daiya == null) {
    window.location.href = "./nobus.html"; // 通常の遷移
}


// 今日のダイヤを基に運行時刻を選択
var to_daigaku = 0;
var to_yakusa = 0;

switch (daiya) {
    case "A":
        to_daigaku = A1;
        to_yakusa = A2;
        var first1 = 0;
        var first2 = 20;
        break;

    case "B":
        to_daigaku = B1;
        to_yakusa = B2;
        var first1 = 0;
        var first2 = 50;
        break;

    case "C":
        to_daigaku = C1;
        to_yakusa = C2;
        var first1 = 10;
        var first2 = 50;
        break;
}


// 現在の時間(hour)を取得
var hour = date.getHours();


// 現在の時間の時刻表データを取り出す
const to_daigaku_minutes1 = to_daigaku[hour];
const to_yakusa_minutes1 = to_yakusa[hour];


// 現在の時間+1の時刻表データを取り出す
var to_daigaku_minutes2 = to_daigaku[hour + 1];
var to_yakusa_minutes2 = to_yakusa[hour + 1];


// 現在の時間+2の時刻表データを取り出す
var to_daigaku_minutes3 = to_daigaku[hour + 2];
var to_yakusa_minutes3 = to_yakusa[hour + 2];


//　大学行きの次のバスの出発時間を調べる(-1が帰ってきた場合はその時間のバスはもう無い)
var to_daigaku_result = get_nearest_value(to_daigaku_minutes1, mode = 0);
var result_hour1 = hour;
var result_hour1_1 = hour;
var time_flag1 = false;
if (to_daigaku_result == -1) {
    to_daigaku_result = get_nearest_value(to_daigaku_minutes2, mode = 1);
    result_hour1 += 1;
    time_flag1 = true;
}


//　八草行きの次のバスの出発時間を調べる(-1が帰ってきた場合はその時間のバスはもう無い)
var to_yakusa_result = get_nearest_value(to_yakusa_minutes1, mode = 0);
var result_hour2 = hour;
var result_hour2_1 = hour;
var time_flag2 = false;
if (to_yakusa_result == -1) {
    to_yakusa_result = get_nearest_value(to_yakusa_minutes2, mode = 1);
    result_hour2 += 1;
    time_flag2 = true;
}


// 次の次のバスの出発時刻を調べる(大学行き)
if (!time_flag1) {
    var next_go_daigaku_time = get_nearest_value(to_daigaku_minutes1, mode = 3);
    if (next_go_daigaku_time == -1) {
        next_go_daigaku_time = get_nearest_value(to_daigaku_minutes2, mode = 1);
        result_hour1_1 += 1;
    }
} else {
    var next_go_daigaku_time = get_nearest_value(to_daigaku_minutes2, mode = 3, reset = true);
    result_hour1_1 += 1;
    if (next_go_daigaku_time == -1) {
        next_go_daigaku_time = get_nearest_value(to_daigaku_minutes3, mode = 1);
        result_hour1_1 += 1;
    }
}



// 次の次のバスの出発時刻を調べる(八草行き)
if (!time_flag2) {
    var next_go_yakusa_time = get_nearest_value(to_yakusa_minutes1, mode = 3);
    if (next_go_yakusa_time == -1) {
        next_go_yakusa_time = get_nearest_value(to_yakusa_minutes2, mode = 1);
        result_hour2_1 += 1;
    }
} else {
    var next_go_yakusa_time = get_nearest_value(to_yakusa_minutes2, mode = 3, reset = true);
    result_hour2_1 += 1;
    if (next_go_yakusa_time == -1) {
        next_go_yakusa_time = get_nearest_value(to_yakusa_minutes3, mode = 1);
        result_hour2_1 += 1;
    }
}



// ダイヤを表示する
document.getElementById("daiya").innerHTML = "今日は" + daiya + "ダイヤです";


// 次の出発時刻を表示する(大学行き)
if (to_daigaku_result != -1) {
    document.getElementById("to_daigaku").innerHTML = result_hour1 + ":" + ('00' + to_daigaku_result).slice(-2);
} else {
    if (hour <= 7) {
        document.getElementById("to_daigaku").innerHTML = "[始発] 08:" + ('00' + first1).slice(-2);
    } else {
        document.getElementById("to_daigaku").innerHTML = "本日の運行は終了しました";
    }
}


// 次の次の出発時間を表示する(大学行き)
if (next_go_daigaku_time != -1) {
    document.getElementById("after-the-next-daigaku").innerHTML = "after the next";
    document.getElementById("next_to_daigaku").innerHTML = result_hour1_1 + ":" + ('00' + next_go_daigaku_time).slice(-2);
}


// 次の出発時刻を表示する(八草行き)
if (to_yakusa_result != -1) {
    document.getElementById("to_yakusa").innerHTML = result_hour2 + ":" + ('00' + to_yakusa_result).slice(-2);
} else {
    if (hour <= 7) {
        document.getElementById("to_yakusa").innerHTML = "[始発] 08:" + ('00' + first2).slice(-2);
    } else {
        document.getElementById("to_yakusa").innerHTML = "本日の運行は終了しました";
    }
}


// 次の次の出発時間を表示する(八草行き)
if (next_go_yakusa_time != -1) {
    document.getElementById("after-the-next-yakusa").innerHTML = "after the next";
    document.getElementById("next_to_yakusa").innerHTML = result_hour2_1 + ":" + ('00' + next_go_yakusa_time).slice(-2);
} else {
    // document.getElementById("next_to_yakusa").innerHTML = "本日の運行は終了しました";
}


// 画像のリンクを生成
document.getElementById("to_daigaku_image").innerHTML = '<span class="image"><a href="https://ogane.sakura.ne.jp/AIT-BusInfo/static/images/' + daiya + '1.jpg"><img src="static/images/' + daiya + '1.jpg" alt=""></a></span><br></br>';
document.getElementById("to_yakusa_image").innerHTML = '<span class="image"><a href="https://ogane.sakura.ne.jp/AIT-BusInfo/static/images/' + daiya + '2.jpg"><img src="static/images/' + daiya + '2.jpg" alt=""></a></span><br></br>';