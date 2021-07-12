function getNearVal(minutes, mode = 0, reset = false) {
    /*
    現在時間から最も近い時刻表のデータを返す関数
    :param mode 
     mode=0: 通常の処理のモード
     mode=1: 1時間後の時刻表の配列の0番目の値を返すモード
     mode=2: 2つ先の時間の時刻表の値を返すモード
    :param minutes:     # array:その時間の時刻表(分)の配列データ
    :param mode:        # int：動作モードを指定する値
    :param reset:       # bool：現在の時間(分)をリセット(0分)にするか
    :return:            # int：現在時刻から一番近い出発時間(分)
    */

    // 時刻表データ(分)が空なら0を入れておく
    const size = minutes === null ? 0 : Object.keys(minutes).length;

    // 今の時間(分)の取得
    const date = new Date();
    var nowMinutes = date.getMinutes();

    // オブジェクトのサイズを確認
    if (size < 1) { return -1; }

    // 現在時間+1の時刻表データ(分)を返す処理
    if (mode == 1) { return minutes[0]; }

    // リセットフラグを確認する
    if (reset) { nowMinutes = 0; }

    var isRunOnce = false;
    // 次の発車時間が見つかったらその時間を返す
    for (var i = 0; i < size; i++) {
        if (minutes[i] >= nowMinutes && mode == 0) {
            return minutes[i];
        }

        // 2つ先のバスの時刻表の値を返す
        if (minutes[i] >= nowMinutes && mode == 2 && isRunOnce) {
            return minutes[i];
        }

        if (minutes[i] >= nowMinutes && mode == 2) {
            isRunOnce = true;
        }
    }

    // 次の出発時間が見つからなかったら-1を返す
    return -1;
}


function getTodayTimetable() {
    /*
    今日の時刻表データを返す関数
    :return:    # array：toDaigaku  大学行きの今日の時刻表データ,
                # array：toYakusa   八草行きの今日の時刻表データ,
                # int：toDaigakuFirst  大学行きの始発時間(分),
                # int：toYakusaFirst   八草行きの始発時間(分)
    */

    // 今日の日付けを取得
    const date = new Date();
    month = date.getMonth() + 1;


    //　日付の形式をYYYY-MM-DDにする
    today = date.getFullYear() + "-" + month + "-" + date.getDate();


    // 時刻表データを定義(JSON形式)
    const A1_json = '{"0":null,"1":null,"2":null,"3":null,"4":null,"5":null,"6":null,"7":null,"8":[0,5,10,15,20,25,30,35,40,45,50,55],"9":[0,5,10,15,20,25,30,35,40,50,55],"10":[0,5,10,15,20,25,30,35,45,55],"11":[5,15,25,35,45,55],"12":[5,15,25,35,45,55],"13":[5,20,35,50],"14":[5,15,25,35,45,55],"15":[5,15,30,45],"16":[0,15,30,45],"17":[0,10,25,40],"18":[0,15,45],"19":[0,15,30,45],"20":[0,30],"21":[0],"22":null,"23":null}';
    const A2_json = '{"0":null,"1":null,"2":null,"3":null,"4":null,"5":null,"6":null,"7":null,"8":[20,50],"9":[20,50],"10":[20,50],"11":[0,10,20,30,40,50],"12":[0,10,20,30,40,50],"13":[0,15,30,45],"14":[0,10,20,30,40,45,50,55],"15":[0,10,20,30,40,50],"16":[0,5,10,15,25,30,35,40,45,50,55],"17":[0,10,15,20,25,30,35,40,45,55],"18":[0,10,20,30,40,50],"19":[0,15,30,45],"20":[0,15,30,45],"21":[0,15,30,45],"22":null,"23":null}';
    const B1_json = '{"0":null,"1":null,"2":null,"3":null,"4":null,"5":null,"6":null,"7":null,"8":[0,10,20,35,45],"9":[0,5,25,35,50],"10":[0,10,30,55],"11":[0,25,50],"12":[25],"13":[35],"14":[5,35],"15":[5,35],"16":[5,45],"17":[10,45],"18":[5,35],"19":[35],"20":[25],"21":[5],"22":null,"23":null}';
    const B2_json = '{"0":null,"1":null,"2":null,"3":null,"4":null,"5":null,"6":null,"7":null,"8":[50],"9":[40],"10":[5,50],"11":[15,40],"12":[10],"13":[20,50],"14":[20,50],"15":[20,50],"16":[20],"17":[0,30,55],"18":[20,50],"19":[20,50],"20":[40],"21":[30],"22":null,"23":null}';
    const C1_json = '{"0":null,"1":null,"2":null,"3":null,"4":null,"5":null,"6":null,"7":null,"8":[10,35],"9":[0,25,50],"10":[10,55],"11":[25,50],"12":[25],"13":[35],"14":[5,35],"15":[5,35],"16":[5,45],"17":[10,45],"18":[5,35],"19":[35],"20":[25],"21":[5],"22":null,"23":null}';
    const C2_json = '{"0":null,"1":null,"2":null,"3":null,"4":null,"5":null,"6":null,"7":null,"8":[50],"9":[40],"10":[5,50],"11":[15,40],"12":[10],"13":[20,50],"14":[20,50],"15":[20,50],"16":[20],"17":[0,30,55],"18":[20,50],"19":[20,50],"20":[40],"21":[30],"22":null,"23":null}';
    const daiya_json = '{"2021-4-1":"C","2021-4-2":"C","2021-4-3":null,"2021-4-4":null,"2021-4-5":"A","2021-4-6":"B","2021-4-7":"B","2021-4-8":"B","2021-4-9":"B","2021-4-10":null,"2021-4-11":null,"2021-4-12":"A","2021-4-13":"A","2021-4-14":"A","2021-4-15":"A","2021-4-16":"A","2021-4-17":null,"2021-4-18":null,"2021-4-19":"A","2021-4-20":"A","2021-4-21":"A","2021-4-22":"A","2021-4-23":"A","2021-4-24":null,"2021-4-25":null,"2021-4-26":"A","2021-4-27":"A","2021-4-28":"A","2021-4-29":"A","2021-4-30":"A","2021-5-1":null,"2021-5-2":null,"2021-5-3":null,"2021-5-4":null,"2021-5-5":null,"2021-5-6":"A","2021-5-7":"A","2021-5-8":null,"2021-5-9":null,"2021-5-10":"A","2021-5-11":"A","2021-5-12":"A","2021-5-13":"A","2021-5-14":"A","2021-5-15":null,"2021-5-16":null,"2021-5-17":"A","2021-5-18":"A","2021-5-19":"A","2021-5-20":"A","2021-5-21":"A","2021-5-22":null,"2021-5-23":null,"2021-5-24":"A","2021-5-25":"A","2021-5-26":"A","2021-5-27":"A","2021-5-28":"A","2021-5-29":"A","2021-5-30":"A","2021-5-31":"A","2021-6-1":"A","2021-6-2":"A","2021-6-3":"A","2021-6-4":"A","2021-6-5":null,"2021-6-6":null,"2021-6-7":"A","2021-6-8":"A","2021-6-9":"A","2021-6-10":"A","2021-6-11":"A","2021-6-12":null,"2021-6-13":null,"2021-6-14":"A","2021-6-15":"A","2021-6-16":"A","2021-6-17":"A","2021-6-18":"A","2021-6-19":null,"2021-6-20":null,"2021-6-21":"A","2021-6-22":"A","2021-6-23":"A","2021-6-24":"A","2021-6-25":"A","2021-6-26":null,"2021-6-27":null,"2021-6-28":"A","2021-6-29":"A","2021-6-30":"A","2021-7-1":"A","2021-7-2":"A","2021-7-3":null,"2021-7-4":null,"2021-7-5":"A","2021-7-6":"A","2021-7-7":"A","2021-7-8":"A","2021-7-9":"A","2021-7-10":null,"2021-7-11":null,"2021-7-12":"A","2021-7-13":"A","2021-7-14":"A","2021-7-15":"A","2021-7-16":"A","2021-7-17":"A","2021-7-18":"A","2021-7-19":"A","2021-7-20":"A","2021-7-21":"A","2021-7-22":null,"2021-7-23":null,"2021-7-24":"A","2021-7-25":"A","2021-7-26":"A","2021-7-27":"A","2021-7-28":"A","2021-7-29":"A","2021-7-30":"A","2021-7-31":null,"2021-8-1":null,"2021-8-2":"A","2021-8-3":"A","2021-8-4":"A","2021-8-5":"A","2021-8-6":"A","2021-8-7":null,"2021-8-8":null,"2021-8-9":null,"2021-8-10":"A","2021-8-11":"C","2021-8-12":"C","2021-8-13":"C","2021-8-14":null,"2021-8-15":null,"2021-8-16":null,"2021-8-17":"C","2021-8-18":"B","2021-8-19":"B","2021-8-20":"B","2021-8-21":null,"2021-8-22":null,"2021-8-23":"C","2021-8-24":"C","2021-8-25":"C","2021-8-26":"C","2021-8-27":"C","2021-8-28":null,"2021-8-29":null,"2021-8-30":"C","2021-8-31":"C","2021-9-1":"C","2021-9-2":"C","2021-9-3":"C","2021-9-4":null,"2021-9-5":null,"2021-9-6":"C","2021-9-7":"C","2021-9-8":"C","2021-9-9":"C","2021-9-10":"C","2021-9-11":null,"2021-9-12":null,"2021-9-13":"C","2021-9-14":"C","2021-9-15":"C","2021-9-16":"C","2021-9-17":"C","2021-9-18":null,"2021-9-19":null,"2021-9-20":null,"2021-9-21":"B","2021-9-22":"A","2021-9-23":null,"2021-9-24":"B","2021-9-25":null,"2021-9-26":null,"2021-9-27":"A","2021-9-28":"A","2021-9-29":"A","2021-9-30":"A","2021-10-1":"A","2021-10-2":null,"2021-10-3":null,"2021-10-4":"A","2021-10-5":"A","2021-10-6":"A","2021-10-7":"B","2021-10-8":"B","2021-10-9":"A","2021-10-10":"A","2021-10-11":null,"2021-10-12":"A","2021-10-13":"A","2021-10-14":"A","2021-10-15":"A","2021-10-16":"C","2021-10-17":null,"2021-10-18":"A","2021-10-19":"A","2021-10-20":"A","2021-10-21":"A","2021-10-22":"A","2021-10-23":"C","2021-10-24":null,"2021-10-25":"A","2021-10-26":"A","2021-10-27":"A","2021-10-28":"A","2021-10-29":"A","2021-10-30":"A","2021-10-31":"A","2021-11-1":"A","2021-11-2":"B","2021-11-3":null,"2021-11-4":"A","2021-11-5":"A","2021-11-6":null,"2021-11-7":null,"2021-11-8":"A","2021-11-9":"A","2021-11-10":"A","2021-11-11":"A","2021-11-12":"A","2021-11-13":"A","2021-11-14":null,"2021-11-15":"A","2021-11-16":"A","2021-11-17":"A","2021-11-18":"A","2021-11-19":"A","2021-11-20":"A","2021-11-21":"A","2021-11-22":"A","2021-11-23":null,"2021-11-24":"A","2021-11-25":"A","2021-11-26":"A","2021-11-27":"A","2021-11-28":"A","2021-11-29":"A","2021-11-30":"A","2021-12-1":"A","2021-12-2":"A","2021-12-3":"A","2021-12-4":null,"2021-12-5":null,"2021-12-6":"A","2021-12-7":"A","2021-12-8":"A","2021-12-9":"A","2021-12-10":"A","2021-12-11":null,"2021-12-12":null,"2021-12-13":"A","2021-12-14":"A","2021-12-15":"A","2021-12-16":"A","2021-12-17":"A","2021-12-18":"A","2021-12-19":null,"2021-12-20":"A","2021-12-21":"A","2021-12-22":"A","2021-12-23":"A","2021-12-24":"A","2021-12-25":null,"2021-12-26":null,"2021-12-27":null,"2021-12-28":null,"2021-12-29":null,"2021-12-30":null,"2021-12-31":null,"2021-1-1":null,"2021-1-2":null,"2021-1-3":null,"2021-1-4":null,"2021-1-5":null,"2021-1-6":null,"2021-1-7":"C","2021-1-8":null,"2021-1-9":null,"2021-1-10":null,"2021-1-11":"A","2021-1-12":"A","2021-1-13":"A","2021-1-14":"A","2021-1-15":"A","2021-1-16":"A","2021-1-17":"A","2021-1-18":"A","2021-1-19":"A","2021-1-20":"A","2021-1-21":"A","2021-1-22":null,"2021-1-23":null,"2021-1-24":"A","2021-1-25":"A","2021-1-26":"C","2021-1-27":"A","2021-1-28":"A","2021-1-29":"A","2021-1-30":null,"2021-1-31":"A","2021-2-1":"A","2021-2-2":"A","2021-2-3":"A","2021-2-4":"A","2021-2-5":null,"2021-2-6":null,"2021-2-7":"A","2021-2-8":"A","2021-2-9":"A","2021-2-10":"A","2021-2-11":"A","2021-2-12":null,"2021-2-13":null,"2021-2-14":"C","2021-2-15":"C","2021-2-16":"A","2021-2-17":"A","2021-2-18":"A","2021-2-19":null,"2021-2-20":null,"2021-2-21":"C","2021-2-22":"C","2021-2-23":null,"2021-2-24":"C","2021-2-25":"C","2021-2-26":null,"2021-2-27":null,"2021-2-28":"C","2021-3-1":"A","2021-3-2":"A","2021-3-3":"A","2021-3-4":"A","2021-3-5":null,"2021-3-6":null,"2021-3-7":"C","2021-3-8":"C","2021-3-9":"C","2021-3-10":"C","2021-3-11":"C","2021-3-12":null,"2021-3-13":null,"2021-3-14":"C","2021-3-15":"C","2021-3-16":"C","2021-3-17":"C","2021-3-18":"C","2021-3-19":null,"2021-3-20":null,"2021-3-21":null,"2021-3-22":"C","2021-3-23":"A","2021-3-24":"C","2021-3-25":"C","2021-3-26":null,"2021-3-27":null,"2021-3-28":"C","2021-3-29":"C","2021-3-30":"C","2021-3-31":"C"}';


    //　JSONデータをパースする
    const A1 = JSON.parse(A1_json);
    const A2 = JSON.parse(A2_json);
    const B1 = JSON.parse(B1_json);
    const B2 = JSON.parse(B2_json);
    const C1 = JSON.parse(C1_json);
    const C2 = JSON.parse(C2_json);
    const daiyas = JSON.parse(daiya_json);


    // 今日のダイヤを取り出す
    daiya = daiyas[today];

    // もし今日のバスがなければページを遷移する
    if (daiya == null) {
        window.location.href = "./nobus.html";
    }


    // 今日のダイヤを基に運行時刻を選択
    var toDaigaku = 0;          // その日の全ての大学行きの出発時間(分)を入れる変数
    var toYakusa = 0;           // その日の全ての八草行きの出発時間(分)を入れる変数
    var toDaigakuFirst = 0;     // 最初の大学行きの出発時間(分)を入れる変数
    var toYakusaFirst = 0;      // 最初の八草行きの出発時間(分)を入れる変数

    switch (daiya) {
        case "A":
            toDaigaku = A1;
            toYakusa = A2;
            toDaigakuFirst = 0;
            toYakusaFirst = 20;
            break;

        case "B":
            toDaigaku = B1;
            toYakusa = B2;
            toDaigakuFirst = 0;
            toYakusaFirst = 50;
            break;

        case "C":
            toDaigaku = C1;
            toYakusa = C2;
            toDaigakuFirst = 10;
            toYakusaFirst = 50;
            break;
    }

    return { toDaigaku, toYakusa, toDaigakuFirst, toYakusaFirst };
}


function getNextMin(timeTable, hour) {
    /*
    次の出発時間を調べる関数
    :param timeTable:   # array:時刻表(分)の配列データ
    :param hour:        # int：現在時間(時)
    :return:            # array：result  大学行きの今日の時刻表データ,
                        # int：hour      現在時間(時) or 現在時間+1(時)
                        # bool：flag     現在時間に+1されたかのフラグ
    */

    var result = getNearVal(timeTable[hour], mode = 0);
    var flag = false;
    if (result === -1) {
        result = getNearVal(timeTable[hour + 1], mode = 1);
        hour += 1;
        flag = true;
    }
    return { result, hour, flag };
}


function getAfterNextMin(flag, timeTable, hour, hour2) {
    /*
    次の次の出発時間を調べる関数
    :param flag:        # 現在時間に+1されたかのフラグ
    :param timeTable:   # array:時刻表(分)の配列データ
    :param hour:        # int：現在時間(時)
    :param hour2:       # int：現在時間(時) or 現在時間+1(時)
    :return:            # int：result  次の次の出発時間(分),
                        # int：hour2   現在時間(時) or 現在時間+1(時) or 現在時間+2(時)
    */

    if (!flag) {
        var result = getNearVal(timeTable[hour], mode = 2);
        if (result == -1) {
            result = getNearVal(timeTable[hour + 1], mode = 1);
            hour2 += 1;
        }
    } else {
        var result = getNearVal(timeTable[hour + 1], mode = 2, reset = true);
        hour2 += 1;
        if (result == -1) {
            result = getNearVal(timeTable[hour + 2], mode = 1);
            hour2 += 1;
        }
    }
    return { result, hour2 }
}


function onDisplay(hour, hour2, hour3, minutes1, minutes2, first, id1, id2, id3) {
    /*
    出発時間を表示する関数
    :param hour:        # int：現在時間(時)
    :param hour2:       # int：現在時間(時) or 現在時間+1(時)
    :param hour3:       # int：現在時間(時) or 現在時間+1(時) or 現在時間+2(時)
    :param minutes1:    # int：次の出発時間(分)
    :param minutes2:    # int：次の次の出発時間(分)
    :param first:       # int：始発時間(分)
    :param id1:         # str：表示する部分のid
    :param id2:         # str：表示する部分のid
    :param id3:         # str：表示する部分のid
    */

    // 次の出発時刻を表示する
    if (minutes1 != -1) {
        document.getElementById(id1).innerHTML = hour2 + ":" + ('00' + minutes1).slice(-2);
    } else {
        if (hour <= 7) {
            document.getElementById(id1).innerHTML = "[始発] 08:" + ('00' + first).slice(-2);
        } else {
            document.getElementById(id1).innerHTML = "本日の運行は終了しました";
        }
    }

    // 次の次の出発時間を表示する
    if (minutes2 != -1) {
        document.getElementById(id2).innerHTML = "after the next";
        document.getElementById(id3).innerHTML = hour3 + ":" + ('00' + minutes2).slice(-2);
    }
}


function main() {

    //時刻表の初期表示は非表示
    document.getElementById("A1").style.display = "none";
    document.getElementById("B1").style.display = "none";
    document.getElementById("C1").style.display = "none";
    document.getElementById("A2").style.display = "none";
    document.getElementById("B2").style.display = "none";
    document.getElementById("C2").style.display = "none";

    // 今日の運行時刻表を取得
    const { toDaigaku, toYakusa, toDaigakuFirst, toYakusaFirst } = getTodayTimetable();

    // 現在の時間(hour)を取得
    const date = new Date();
    const hour = date.getHours();

    //　大学行きの次のバスの出発時間を調べる(-1が帰ってきた場合はその時間のバスはもう無い)
    const { result: toDaigakuMin, hour: resultHour1, flag: t_Flag1 } = getNextMin(toDaigaku, hour);
    var resultHour1_1 = hour;

    //　八草行きの次のバスの出発時間を調べる(-1が帰ってきた場合はその時間のバスはもう無い)
    const { result: toYakusaMin, hour: resultHour2, flag: t_Flag2 } = getNextMin(toYakusa, hour);
    var resultHour2_1 = hour;

    // 次の次のバスの出発時刻を調べる(大学行き)
    var { result: toDaigakuMin2, hour2: resultHour1_1 } = getAfterNextMin(t_Flag1, toDaigaku, hour, resultHour1_1);

    // 次の次のバスの出発時刻を調べる(八草行き)
    var { result: toYakusaMin2, hour2: resultHour2_1 } = getAfterNextMin(t_Flag2, toYakusa, hour, resultHour2_1);

    // ダイヤを表示する
    document.getElementById("daiya").innerHTML = "今日は" + daiya + "ダイヤです";

    // 出発時刻を表示する(大学行き)
    onDisplay(hour, resultHour1, resultHour1_1, toDaigakuMin, toDaigakuMin2, toDaigakuFirst, "to_daigaku", "after-the-next-daigaku", "next_to_daigaku");

    // 出発時刻を表示する(八草行き)
    onDisplay(hour, resultHour2, resultHour2_1, toYakusaMin, toYakusaMin2, toYakusaFirst, "to_yakusa", "after-the-next-yakusa", "next_to_yakusa");

    // その日のダイヤの時刻表を表示
    console.log(`daiya = ${daiya}`)
    const A1 = document.getElementById("A1");
    const B1 = document.getElementById("B1");
    const C1 = document.getElementById("C1");
    const A2 = document.getElementById("A2");
    const B2 = document.getElementById("B2");
    const C2 = document.getElementById("C2");

    if (daiya == "A") {
        A1.style.display = "block";
        A2.style.display = "block";
    } else if (daiya == "B") {
        B1.style.display = "block";
        B2.style.display = "block";
    } else if (daiya == "C") {
        C1.style.display = "block";
        C2.style.display = "block";
    }

}

setInterval('main()', 1000);