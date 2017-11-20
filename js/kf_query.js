function next(type,old,cla,hicla) {
    if(cla =='query-o-step-rg' && type ==4){
        if($('input[name="iagree"]').is(':checked') == false){
            alert("请仔细阅读用户协议并同意！");
            return false;
        }
        $.post('/?ct=cs&ac=perAjax',{
            arr : arr
        },function (per) {
            console.log(per);
           if(per == 2){
               console.log('网络错误！');
               return false;
           }
        })
    }
    $('.'+cla).show();
    $('.'+hicla).hide();
    //  首页隐藏第一步显示
    $('.'+cla+'.o-step .step-'+type).show();
    $('.'+cla+'.o-step .step-'+old).hide();
    $('.'+cla+'.o-step .step-'+type+' input').eq(0).focus();
}
function buttond() {
    var obphone = $('.step-2 .phone-inp').attr('data-true');
    var codeinp = $('.step-2 .code-inp').attr('data-true');
    var mescode = $('.step-2 .mes-code').attr('data-true');
    console.log(obphone);
    console.log(codeinp);
    console.log(mescode);
    if(obphone == 1 && codeinp == 1 && mescode == 1){
        $('#stepbutton2').removeAttr('disabled');
        $("#stepbutton2").click(function () {
            $(".step-2").hide();
            $(".step-3").show();
        })
    }else{
        $('#stepbutton2').attr('disabled','disabled');
    }
}

function vifs(type,obj,num) {
    var newobj = $(obj);
    var obvif = newobj.next('input[type="hidden"]').val();
    $.post('/?ct=cs&ac=vifAjax',{
        type : type,
        num : num,
        obvif : obvif
    },function (data) {
        console.log(data)
        switch(data.info)
        {
            case 201:
                $('.vifmobile'+num).removeClass('err').addClass('ok').html('输入正确！');
                newobj.attr('data-true','1');
                $('.stepbutton2').attr('data-mobile',type);
                buttond();
                $('#buttons').attr('data-mobile',type);
                break;
            case 200:
                $('.vifmobile'+num).removeClass('err').addClass('ok').html('输入正确！');
                newobj.attr('data-true','1');
                buttond()
                break;
            case 202:
                $('.vifmobile'+num).removeClass('err').html('');
                newobj.attr('data-true','1');
                buttond();
                break;
            case 500:
                $('.vifmobile3').removeClass('ok').addClass('err');
                newobj.attr('data-true','0');
                buttond()
                $('.vifmobile3').html('您输入的短信验证码已经失效！');
                break;
            case 1:
                $('.vifmobile'+data.info).removeClass('ok').addClass('err');
                newobj.attr('data-true','0');
                buttond()
                $('.vifmobile'+data.info).html('您输入的手机号错误');
                $('#buttons').attr('data-mobile',type);
                break;
            case 2:
                $('.vifmobile'+data.info).removeClass('ok').addClass('err');
                newobj.attr('data-true','0');
                buttond()
                $('.vifmobile'+data.info).html('您输入的验证码错误！');
                break;
            case 3:
                $('.vifmobile'+data.info).removeClass('ok').addClass('err');
                newobj.attr('data-true','0');
                buttond()
                $('.vifmobile'+data.info).html('您输入的短信验证码错误！');
                break;
            default:
                false
        }
    });
}
function unuserprb() {
    alert('请登录在操作！')
}
// 判断是否全部正确
function buttonss() {
    var obphone = $('.step-1 .phone-inp').attr('data-true');
    var codeinp = $('.step-1 .code-inp').attr('data-true');
    var mescode = $('.step-1 .mes-code').attr('data-true');
    if(obphone == 1 && codeinp == 1 && mescode == 1){
        $('#stepbutton1').removeAttr('disabled');
    }else{
        $('#stepbutton1').attr('disabled','disabled');
    }
}


//每个依次验证
function vif(type,obj,num) {
    var newobj = $(obj);
    var obvif = newobj.next('input[type="hidden"]').val();
   $.post('/?ct=cs&ac=vifAjax',{
       type : type,
       num : num,
       obvif : obvif
   },function (data) {
       switch(data.info)
       {
           case 201:
               $('#vifmobile'+num).removeClass('err').addClass('ok').html('输入正确！');
               newobj.attr('data-true','1');
               $('#stepbutton1').attr('data-mobile',type);
               buttonss();
               $('#buttons').attr('data-mobile',type);
               break;
           case 200:
               $('#vifmobile'+num).removeClass('err').addClass('ok').html('输入正确！');
               newobj.attr('data-true','1');
               buttonss();
               break;
           case 202:
               $('.vifmobile'+num).removeClass('err').html('');
               newobj.attr('data-true','1');
               //  外挂举报需要用
               $('.sub-btn-td #wgbutton').removeAttr('disabled');
               buttonss();
               per_vif()
               break;
           case 500:
               $('#vifmobile3').removeClass('ok').addClass('err');
               newobj.attr('data-true','0');
               buttonss()
               $('#vifmobile3').html('您输入的短信验证码已经失效！');
               break;
           case 1:
               $('#vifmobile'+data.info).removeClass('ok').addClass('err');
               newobj.attr('data-true','0');
               buttonss()
               $('#vifmobile'+data.info).html('您输入的手机号错误！');
               $('#buttons').attr('data-mobile',type);
               break;
           case 2:
               $('.vifmobile'+data.info).removeClass('ok').addClass('err');
               newobj.attr('data-true','0');
               buttonss()
               $('.vifmobile'+data.info).html('您输入的验证码错误！');
               //  外挂举报需要用
               $('.wg-o-step .sub-btn-td #wgbutton').attr('disabled','disabled');
               break;
           case 3:
               $('#vifmobile'+data.info).removeClass('ok').addClass('err');
               newobj.attr('data-true','0');
               buttonss()
               $('#vifmobile'+data.info).html('您输入的短信验证码错误！');
               break;
           default:
               false
       }
   });
}

//  发送验证码及提交
$('#buttons,#stepbutton1').click(function () {
    var obthis = $(this);
    var mobile = obthis.attr('data-mobile');
    var user_name = obthis.attr('data-json');
    var my_pwd = obthis.attr('data-pwd');
    $.post('/?ct=cs&ac=mobileAjax',{
        mobile : mobile,
        user_name : user_name,
        my_pwd : my_pwd
    },function (msg) {
        if(msg.new == 1){
            $('.query-o-step .step-2').show();
            $('.query-o-step .step-1').hide();
            alert('发送成功')
            return false;
        };
        (msg.info == 200) ? (alert('发送成功,验证码5分钟内有效！'),$('#stepbutton1').attr('data-json',msg.user_name)) : alert('请检查手机号！');
        (msg.success) ? (obthis.parent('li').prev('li').find('input[type="hidden"]').val(msg.success),obthis.removeClass('buttonshovers'),obthis.css('color','#999'),vifnewbuttons(),vifold()) : false;
    })
});
//  验证码过期时间
var oldtime=300;
function vifold() {
    if(oldtime == 0){
        $('#buttons').parent('li').prev('li').find('input[type="hidden"]').val("old");
        oldtime = 300;
        return;
    }else {
        oldtime--;
    }
    setTimeout(function() {
            vifold() }
        ,1000)
}
//重新获取时间
var countdown=60;
function vifnewbuttons() {
    var obthis = $('#buttons');
    if (countdown == 0) {
        obthis.removeAttr("disabled");
        obthis.html("获取验证码");
        obthis.css('color','#2d5294');
        obthis.addClass('buttonshovers')
        countdown = 60;
        return;
    } else {
        obthis.attr('disabled','disabled');
        obthis.html("重新发送(" + countdown + ")");
        countdown--;
    }
    setTimeout(function() {
            vifnewbuttons() }
        ,1000)
}

//  添加记录
var num = 1;
$('#add_record').click(function () {
    if(num ==3){
        alert("最多只能添加三条！");
        return false;
    }
    num++
    var str = '';
    str +='<tr class="recharge-record"><td></td><td><input title="'+num+'" name="pay_time'+num+'"'+'onblur="pay_vif(this.title)" placeholder="日期:2016-04-02"/><input title="'+num+'" name="pay_money'+num+'"'+' placeholder="充值金额（数字）" onblur="pay_vif(this.title)"/><input type="hidden" name="pay_orders'+num+'"></td></tr>';
    $(this).parent('td').parent('tr').after(str)
});
//  保存值
var arr = new Array();
function  per_vif() {
   var game = $('.query-o-step-rg .step-1 input[name="game"]').val();
   var servers = $('.query-o-step-rg .step-1 input[name="servers"]').val();
   var uname = $('.query-o-step-rg .step-1 input[name="uname"]').val();
   var uleve = $('.query-o-step-rg .step-1 input[name="uleve"]').val();
   //     -----------第二步表单信息---------
   var user_realname = $('.query-o-step-rg .step-2 input[name="user_realname"]').val();
   var reg_num = $('.query-o-step-rg .step-2 input[name="reg_num"]').val();
   var reg_time = $('.query-o-step-rg .step-2 input[name="jHsDateInput"]').val();
   //   ---------------注册地址待定--------
   var reg_home = $('.query-o-step-rg .step-2 input[name="reg_home"]').val();
   var user_email = $('.query-o-step-rg .step-2 input[name="user_email"]').val();
   var user_phone = $('.query-o-step-rg .step-2 input[name="user_phone"]').val();
    //   ---------------充值记录--------
    var pay_order = '';
   for(i = 1 ; i <=num ; i++){
       pay_order +=$('.query-o-step-rg .step-3 input[name="pay_orders'+i+'"]').val()+'|';

   }
        pay_orders = '{'+pay_order.substring(0,pay_order.length-1)+'}';


    //   ---------------遇得到的情况待定--------
   var user_content = $('.query-o-step-rg .step-3 textarea[name="user_content"]').val();
   var revif = $('.query-o-step-rg .step-3 input[name="revif"]').attr('data-true');
   arr[1] = game+','+servers+','+uname+','+uleve;
   arr[2] = user_realname+','+reg_num+','+reg_time+','+reg_home+','+user_email+','+user_phone;
   arr[3] = pay_orders+','+user_content;

   //  逐条判断      ------第一步----
   (game == '' || servers == '' || uname == '' || uleve == '') ? $('#queryrg-step1').attr('disabled','disabled').removeClass('rebuttonshovers') :  ($('#queryrg-step1').removeAttr('disabled').addClass('rebuttonshovers').attr('onclick','next(2,1,"query-o-step-rg","query-o-step")'),
       $('.query-o-step-rg .step-2 input[type!="hidden"]').attr('onblur','per_vif()'));
    //  逐条判断      ------第二步----
   (user_realname == '' || reg_num == '' || reg_time == '' || reg_home == '' || user_email == '' || user_phone == '') ? $('#queryrg-step2').attr('disabled','disabled').removeClass('rebuttonshovers') : ($('#queryrg-step2').removeAttr('disabled').addClass('rebuttonshovers').attr('onclick','next(3,2,"query-o-step-rg","query-o-step")'),$('.query-o-step-rg .step-3 input[title="1"]').attr('onblur','pay_vif(this.title)'));
    //  逐条判断      ------第三步----

        (pay_orders == '' || user_content == '' || revif == '0') ? $('#queryrg-step3').attr('disabled','disabled').removeClass('rebuttonshovers') : ($('#queryrg-step3').removeAttr('disabled').addClass('rebuttonshovers').attr('onclick','next(4,3,"query-o-step-rg","query-o-step")'));

}


function city(obj,val) {
    var obthis = $(obj);
    var shw ='';
    var obtext = obthis.find('option:selected').text();
    $.ajax({
        url:"/?ct=cs&ac=ajax_city",
        data:{val:val},
        dataType:'json',
        type:'post',
        success:function (city) {
            $.each(city, function(i,item){
                shw += '<option value="'+item.name+'">'+item.name+'</option>';
            });
            //  默认值
            $('.query-o-step-rg .step-2 input[name="reg_home"]').val('{'+obtext+':'+city[0]['name']+'}');
            obthis.next('select').find('option').remove();
            obthis.next('select').prepend(shw);
        }
    })
}

// 点击城市截取更换
function country(val) {
    var obstr = $('.query-o-step-rg .step-2 input[name="reg_home"]').val().split(":");
    $('.query-o-step-rg .step-2 input[name="reg_home"]').val(obstr[0]+':'+val+'}');
}

function pay_vif(val) {

    var obthi = $('input[name="pay_orders'+val+'"]');
    var pay_time = $('input[name="pay_time'+val+'"]').val();
    var pay_money = $('input[name="pay_money'+val+'"]').val();
    obthi.val(pay_time+':'+pay_money);
    per_vif()
}
