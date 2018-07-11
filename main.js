var idname = $('#idname'),
        sendBtn = $('#sendBtn'),
        submitBtn = $('#submitBtn');
        show = $('#show'),
        showname = $('#showname'),
        showmoneylife = $('#showmoneylife'),
        showmoneyfight = $('#showmoneyfight'),
        showmoneymax = $('#showmoneymax'),
        showmoneyadd = $('#showmoneyadd'),
        showmoneycu = $('#showmoneycu'),
        showmoneynext = $('#showmoneynext'),
        showattend = $('#showattend'),
        showlevel = $('#showlevel'),
        showjob = $('#showjob'),
        calamoney = $('#calamoney'),
        addnum = $('#addnum'),
        imgchange = $('#imgchange'),
        error = $('#error'),
        showusername = $('#showusername'),
        logout =$('#logout'),
        shownum = 0,
        moneymax = 0,
        total = 0,
        livemoneysave = 0,
        fightmoneysave = 0,
        cumoneysave = 0;

    var parameter = {};

    $(function(){
      submitBtn.prop('disabled', true);
      submitBtn.css("background-color","#999");
      submitBtn.css("cursor","no-drop");
      alert($.client.browser);
    });

    function search_name(){
      if (event.keyCode == 13) {
      parameter = {
        idname: idname.val()
      };

      $.get('https://script.google.com/macros/s/AKfycbxQ3mzZnKPeD9E3gyTwyKRETnFs3CerYPhpg8mf8f8KTG_e_rWF/exec', parameter, function(data) {
        if(data == "undefined"){
          alert('查無資料！');
        }
        if(data == "0"){
          alert('家門名重複！');
        }
        if(data != "undefined" && data != "0"){
          var s = data;
          var ss = s.split(" ");
          var attend = ss[8] * 100;
          showname.html(ss[0]);
          showlevel.html(ss[1]);
          livemoneysave = ss[2];
          fightmoneysave = ss[3];
          var fn2 = formatNumber(ss[2]);
          var fn3 = formatNumber(ss[3]);
          var fn4 = formatNumber(ss[4]);
          var fn5 = formatNumber(ss[5]);
          var fn6 = formatNumber(ss[6]);
          showmoneylife.html("$" + fn2);
          showmoneyfight.html("$" + fn3);
          showmoneycu.html("$" + fn4);
          showmoneynext.html("$" + fn5);
          showmoneymax.html("$" + fn6);
          showmoneyadd.html(ss[7]);
          showattend.html(attend);
          showjob.html(ss[9]);
          shownum = ss[10];
          cumoneysave = ss[4];
          moneymax = ss[6];
          calamoney.html("$0");
          img_judge();
        }
      });
    }
    }

    function img_judge(){
      var job = showjob.html();

      switch(job){

        case "女巫":
        imgchange.css("background-image","url(img/witch.jpg)");
        break;

        case "巫師":
        imgchange.css("background-image","url(img/wizard.jpg)");
        break;

        case "狂戰":
        imgchange.css("background-image","url(img/crazy.jpg)");
        break;

        case "馴獸":
        imgchange.css("background-image","url(img/lg.jpg)");
        break;

        case "戰士":
        imgchange.css("background-image","url(img/warrior.jpg)");
        break;

        case "女武神":
        imgchange.css("background-image","url(img/g_warrior.jpg)");
        break;

        case "遊俠":
        imgchange.css("background-image","url(img/bow.jpg)");
        break;

        case "魔女":
        imgchange.css("background-image","url(img/witch2.jpg)");
        break;

        case "武士":
        imgchange.css("background-image","url(img/cava.jpg)");
        break;

        case "梅花":
        imgchange.css("background-image","url(img/g_cava.jpg)");
        break;

        case "忍者":
        imgchange.css("background-image","url(img/ninja.jpg)");
        break;

        case "女忍":
        imgchange.css("background-image","url(img/g_ninja.jpg)");
        break;

        case "黑騎":
        imgchange.css("background-image","url(img/blackw.jpg)");
        break;

        case "拳師":
        imgchange.css("background-image","url(img/pug.jpg)");
        break;
      }
    }

    function add_money(){
      var madd = addnum.val();
      var cum;

      submitBtn.prop('disabled', false);
      submitBtn.css("background-color","#222");
      submitBtn.css("cursor","pointer");

      var live = parseInt(livemoneysave);
      var fight = parseInt(fightmoneysave);

      var maxmoney = live * 2 + fight;
      var maxmoney2 = live * 0.5 + fight;

      if(madd >= 10000){
        cum = live * 2 + fight;

        if(cum > maxmoney){
          total = maxmoney;
        }
        if(cum >= cumoneysave * 2 && cum <= maxmoney){
          total = cumoneysave * 2;
        }
        if(cum < cumoneysave * 2){
          total = cum;
        }
      }

      if(madd >= 5001 && madd < 10000){
        if(live > 30000){
          cum = live * 0.5 + fight;
        }
        if(live <= 30000){
          cum = live + fight;
        }

        if(cum > maxmoney2){
          total = maxmoney2;
        }
        if(cum >= cumoneysave * 2 && cum <= maxmoney2){
          total = cumoneysave * 2;
        }
        if(cum < cumoneysave * 2){
          total = cum;
        }
      }

      if(madd <= 5000){
        cum = 30000 + fight;

        if(cum > moneymax){
          total = moneymax;
        }
        if(cum >= cumoneysave * 2 && cum <= moneymax){
          total = cumoneysave * 2;
        }
        if(cum < cumoneysave * 2){
          total = cum;
        }
      }

      calamoney.html("$" + formatNumber(total));
    }

    submitBtn.on('click',function() {
      if(shownum == 0){
        alert("錯誤！請輸入家門名");
      }else{
        var add_act = addnum.val();
        var rowint = parseInt(shownum);
        var cuser = getCookie("username");
        var d = new Date(); // 獲取現在的時間

        parameter = {
          row: rowint + 1,
          add_act: add_act,
          calamoney: total,
          time: d,
          user: cuser,
          member: showname.text(),
          cumoney: cumoneysave,
          lifemoney: livemoneysave,
          type: "續約"
        };
      
        $.get('https://script.google.com/macros/s/AKfycbxQ3mzZnKPeD9E3gyTwyKRETnFs3CerYPhpg8mf8f8KTG_e_rWF/exec', parameter);

        alert("已替 " + showname.text() + " 續約");
        location.reload();
      }
    });

    showlevel.blur(function(){
      if(showname.text() == "家門名"){
        alert("錯誤。");
        location.reload();
      }else{
        var data = showlevel.html();
        var rowint = parseInt(shownum);
        alert("將 " + showname.html() + " 家門的等級更改為 " + data + " 等級");

        parameter = {
        row: rowint + 1,
        column: 2,
        data: data
        };
          
        $.get('https://script.google.com/macros/s/AKfycbxQ3mzZnKPeD9E3gyTwyKRETnFs3CerYPhpg8mf8f8KTG_e_rWF/exec', parameter);
      }
    });

    showjob.blur(function(){
      var data = showjob.html();
      var rowint = parseInt(shownum);
      alert("將 " + showname.html() + " 家門的職業更改為 " + data);

      parameter = {
      row: rowint + 1,
      column: 10,
      data: data
      };
        
      $.get('https://script.google.com/macros/s/AKfycbxQ3mzZnKPeD9E3gyTwyKRETnFs3CerYPhpg8mf8f8KTG_e_rWF/exec', parameter);
    });

    error.on('click',function() {

      parameter = {
      sename: showname.text()
      };

      $.get('https://script.google.com/macros/s/AKfycbxQ3mzZnKPeD9E3gyTwyKRETnFs3CerYPhpg8mf8f8KTG_e_rWF/exec', parameter, function(data) {
        if(data == "undefined"){
          alert('查無該玩家過去的續約資料！');
        } else{
          var s = data;
          var ss = s.split(" ");
          var cuser = getCookie("username");
          var fn0 = formatNumber(ss[0]);
          var fn1 = formatNumber(ss[1]);
          var row = parseInt(ss[2]);
          var rowint = parseInt(shownum);
          var d = new Date();

          if(confirm("要將 " + showname.text() + " 的目前薪水回復至 " + "$" + fn0 + " 嗎？")){
            parameter = {
              bool: true,
              Logrow: row + 1,
              namerow: rowint + 1,
              lifeundo: ss[1],
              cundo: ss[0],
              type: "回復",
              time: d,
              user: cuser,
              member: showname.text(),
              after_cumoney: ss[0],
              before_cumoney: cumoneysave
            };

            $.get('https://script.google.com/macros/s/AKfycbxQ3mzZnKPeD9E3gyTwyKRETnFs3CerYPhpg8mf8f8KTG_e_rWF/exec', parameter);

            showmoneycu.html("$" + fn0);
            showmoneylife.html("$" + fn1);
            alert("已回復上一筆資料。");
          } else{
            // alert("取消。");
          }
        }
      });
    });

    // --------------- 轉換數字為貨幣單位 --------------- //
    function formatNumber(num, precision, separator) {
    var parts;
    if (!isNaN(parseFloat(num)) && isFinite(num)) {
        num = Number(num);
        num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString();
        parts = num.split('.');
        parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));
        return parts.join('.');
    }
    return NaN;
    }
    
    // --------------- cookie 部分 --------------- //
    function setCookie(cname,cvalue,exdays){
      var d = new Date();
      d.setTime(d.getTime()+(exdays*24*60*60*1000));
      var expires = "expires="+d.toGMTString();
      document.cookie = cname+"="+cvalue+"; "+expires;
    }

    function getCookie(cname){
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0){
              return c.substring(name.length,c.length);
            }
        }
        return "";
    }

    function delCookie(name)
    {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(name);
        if(cval!=null){
          document.cookie = name + "="+cval+";expires="+exp.toGMTString();
        }
    }

    function checkCookie(){
        var cuser = getCookie("username");

        if (cuser != ""){
            showusername.html(cuser);
        }
        else {
            alert("請先登入！");
            window.location.href = 'login.html';
        }
    }

    function dcookie(){
      delCookie("username");
    }

    logout.click(function(){
      window.location.href='login.html';
      delCookie("username");
    });