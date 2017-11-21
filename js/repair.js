/**
 * Created by jf on 2017/9/27.
 */
$(function() {
    //对用户输入的帐号进行查询
    $("#repair_accounts").blur(function () {
        var accounts = $("#repair_accounts").val();
        if ($.trim(accounts) == '') {
            //$('#none_1').css('style','');
            $(".err-message").html('<font color="red">请输入账号!</font>');
        } else {
            $.ajax({
                url: "/?ct=cs&ac=ajax_accounts",
                data: {accounts: $.trim(accounts)},
                dataType: 'json',
                type: 'post',
                success: function (msg) {
                    if (msg.status == 200) {
                        $(".err-message").html('<font color="green">帐号正确！</font>');
                        $("#user").html(accounts);
                        $("#user_name_1").html(accounts);
                    } else if (msg.state == 202) {
                        $(".err-message").html('<font color="red">帐号错误，请核对后重新输入!</font>');
                        return false;
                    }
                }
            })
        }
    });
    //验证手机号码格式
    $('#phone_1').blur(function(){
        var mobile=$('#phone_1').val();
        if(mobile ==''){
            $(".err_mobile").html('<font color="red">请输入手机号码！</font>');
            return false;
        }else{
            if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(mobile))){
                $(".err_mobile").html('<font color="red">不是完整的11位手机号或者正确的手机号前七位！</font>');
                return false;
            }else{
                $(".err_mobile").html('<font color="green">手机号码格式正确！</font>');
                $("#mobile_lx").html(mobile);
                $("#mobile-id").html(mobile);
            }
        }
    });
    //验证码正确与否
    $(".code-inp").blur(function () {
        var caption = $(".code-inp").val();
        if ($.trim(caption) == '') {
            //$('#err_accounts').css('style','');
            $(".err-code").html('<font color="red">请输入验证码!</font>');
            return false;
        } else {
            $.ajax({
                url: "/?ct=cs&ac=ajax_code",
                data: {caption: $.trim(caption)},
                dataType: 'json',
                type: 'post',
                success: function (msg) {
                    if (msg.status == 200) {
                        $('.err-code').html('<font color="green">验证码正确!</font>');
                    } else if (msg.status == 202) {
                        $('.err-code').html('<font color="red">验证码错误!</font>');
                        return false;
                    }
                }
            })
        }
    });
    //初步发送手机验证码
    $("#buttons_1").click(function () {
        var phone = $("#phone_1").val();
        $.ajax({
            url: "/?ct=cs&ac=ajax_phone",
            data: {phone: $.trim(phone)},
            dataType: 'json',
            type: 'post',
            success: function (msg) {
                //alert(msg);
                if (msg.status == 200) {
                    $(".err-messag").html('<font color="blue">已发送！请注意查收！</font>');
                    $("#code-1-1").attr("value",msg.bb);
                } else if (msg.status == 202) {
                    $(".err-messag").html('<font color="red">请输入手机号码!</font>');
                    return false;
                }
            }
        })
    });
    //验证码验证
    $("#code_1_1").change(function(){
        var code_1_1 = $("#code_1_1").val();
        var code_2=$("#code-1-1").val();
        if(code_1_1==code_2){
            $(".err-messag").html('<font color="green">验证码正确!</font>');
        }else{
            $(".err-messag").html('<font color="red">验证码错误，请重新发送!</font>');
            return false;
        }
    })
    //第一个div表单页面的提交
    $("#button_1").click(function(){
        var accounts = $("#repair_accounts").val();
        var phone_1 = $("#phone_1").val();
        var code_1 = $("#code_1").val();
        var code_1_1 = $("#code_1_1").val();
        if(accounts==''){
            $(".err-message").html('<font color="red">帐号格式错误或不存在!</font>');
            return false;
        }else if(phone_1 ==''){
            $(".err_mobile").html('<font color="red">手机号格式错误或不存在!!</font>');
            return false;
        }else if(code_1==''){
            $('.err-code').html('<font color="red">验证码错误或不存在!</font>');
            return false;
        }else if(code_1_1==''){
            $(".err-messag").html('<font color="red">请重新校验验证码输入!</font>');
            return false;
        }else {
            $(".repair-o-step-1").hide();
            $(".repair-o-step-2").show();
        }
    });
    //上一步
    $("#button_-1").click(function(){
        $(".repair-o-step-2").hide();
        $(".repair-o-step-1").show();
    });
    //第二个表单页面的提交
    $("#button_2").click(function(){
        var sfzh = $("#sfzh").val();
        var email = $("#email").val();
        var repair_mobile = $("#repair_mobile").val();
        if(sfzh==''){
            $(".err-sfzh").html('<font color="red">身份证号格式错误或不存在!</font>');
            return false;
        }else if(email ==''){
            $(".err_email").html('<font color="red">邮箱格式错误或不存在!!</font>');
            return false;
        }else if(repair_mobile==''){
            $('.err-mobile').html('<font color="red">手机号码格式错误或不存在!</font>');
            return false;
        }else {
            $(".repair-o-step-2").hide();
            $(".repair-o-step-3").show();
        }
    });
    //上一步
    $("#button_-2").click(function(){
        $(".repair-o-step-3").hide();
        $(".repair-o-step-2").show();
    });
    //第三个表单页面的提交
    $("#button_3").click(function(){
        var time = $("#create_time").val();
        var content = $("#content").val();
        if(time==''){
            $(".err-time").html('<font color="red">日期格式错误或不存在!</font>');
            return false;
        }else if(content ==''){
            $(".err_content").html('<font color="red">请认真填写，不能为空!!</font>');
            return false;
        }else {

            $(".repair-o-step-3").hide();
            $(".repair-o-step-4").show();
        }
    });
    //上一步
    $("#button_-3").click(function(){
        $(".repair-o-step-4").hide();
        $(".repair-o-step-3").show();
    });
    //第四个表单页面的提交
    $("#button_4").click(function(){
        var user_name = $("#user_name").val();
        var sex = $('#sex1 #sex2').val();
        if(user_name==''){
            $(".err_user_name").html('<font color="red">名字格式错误或不存在!</font>');
            return false;
        }else if(sex ==''){
            $(".err_sex").html('<font color="red">请选择性别!!</font>');
            return false;
        }else {
            var accounts = $("#repair_accounts").val();
            var phone = $("#phone_1").val();
            var sfzh=$("#sfzh").val();
            var shengfen=$(".sub_inp1 option:selected").text()+$("#sub_inp2 option:selected").text();
            var youxi=$(".youxi_id option:selected").text();
            var email=$("#email").val();
            var mobile = $("#repair_mobile").val();
            var yuanyin=$(".xiufu_id option:selected").text();
            var time=$("#create_time").val();
            var shengfen_1=$(".sub_inp_bc option:selected").text()+$("#sub_inp4 option:selected").text();
            var cz_jl = $('#cz_jl_time').val()+$('#cz_jl_sz').val();
            var user_name=$("#user_name").val();
            var content=$("#content").val();
            var sex = $('.sex_id option:selected').val();
            var image=$("#image").val();
            var service_num_time=$("#service_num_time").text();
            $.ajax({
                url: "/?ct=cs&ac=ajax_result",
                data: {
                    accounts: $.trim(accounts),
                    phone: $.trim(phone),
                    sfzh: $.trim(sfzh),
                    shengfen: $.trim(shengfen),
                    youxi: $.trim(youxi),
                    email: $.trim(email),
                    mobile: $.trim(mobile),
                    yuanyin: $.trim(yuanyin),
                    time: $.trim(time),
                    shengfen_1: $.trim(shengfen_1),
                    cz_jl: $.trim(cz_jl),
                    user_name: $.trim(user_name),
                    content: $.trim(content),
                    sex: $.trim(sex),
                    image: $.trim(image),
                    service: $.trim(service_num_time)
                },
                dataType: 'json',
                type: 'post',
                success: function (msg) {
                    //alert(msg);
                    if (msg.status == 200) {
                        $(".repair-o-step-4").hide();
                        $(".repair-o-step-5").show();
                    } else if (msg.status == 202) {
                        $(".repair-o-step-4").hide();
                        $(".repair-o-step-1").show();
                    }
                }
            })

        }
    });
    //$("#phone_1").blur(function () {
    //    var code = $("#phone_1");
    //    if ($.trim(code.val()) == '') {
    //        //$('#err_accounts').css('style','');
    //        $(".err_mobile").html('<font color="red">请输入手机号码!</font>');
    //    }
    //});
    //验证身份证号
    $('#sfzh').blur(function(){
        var sfzh=$("#sfzh").val();
        if(sfzh==''){
            $(".err-sfzh").html('<font color="red">请输入身份证号！</font>');
        }else{
            if( !(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(sfzh)) ){
                $(".err-sfzh").html('<font color="red">输入的身份证号长度不对，或者号码不符合规定！</font>');
                return false;
            }else{
                $(".err-sfzh").html('<font color="green">身份证号格式正确！</font>');
                $("#sfzh_id").html(sfzh);
            }
        }
    })
    //设置事件，获取省份ID和下属城市
    $('.sub_inp1').change(function () {
        var shengfen=$(".sub_inp1 option:selected").text();
        $.ajax({
            url:"/?ct=cs&ac=ajax_repair",
            data:{shengfen:shengfen},
            dataType:'json',
            type:'post',
            success:function (msg) {
                if(msg.status ==200){
                    var str='';
                    var len=msg.bb.length;
                    str+="<option>请选择所在城市</option>";
                    for(var i=0;i<len;i++){
                        str+= "<option value='"+i+"'>"+msg.bb[i].chengshi+"</option>"
                    }
                    $('#sub_inp2').html(str);
                }
            }
        })
    });
    //设置事件，获取省份ID和下属城市
    $('.sub_inp_bc').change(function () {
        var shengfen=$(".sub_inp_bc option:selected").text();
        $.ajax({
            url:"/?ct=cs&ac=ajax_repair",
            data:{shengfen:shengfen},
            dataType:'json',
            type:'post',
            success:function (msg) {
                if(msg.status ==200){
                    var str='';
                    var len=msg.bb.length;
                    str+="<option>请选择所在城市</option>";
                    for(var i=0;i<len;i++){
                        str+= "<option value='"+i+"'>"+msg.bb[i].chengshi+"</option>"
                    }
                    $('#sub_inp4').html(str);
                }
            }
        })
    });
    //验证邮箱格式
    $('#email').blur(function(){
        var email=$('#email').val();
        if(email==''){
         $('.err-email').html('<font color="red">请输入邮箱！</font>');
        }else{
            if( !( /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(email)) ){
                $(".err-email").html('<font color="red">输入的邮箱长度不对，或者格式不符合规定！</font>');
                return false;
            }else{
                $(".err-email").html('<font color="green">邮箱格式正确！</font>');
                $("#email_user").html(email);
                $("#email-id").html(email);
            }
        }
    });
    //验证手机号码格式
    $('#repair_mobile').blur(function(){
        var mobile=$('#repair_mobile').val();
        if(mobile ==''){
            $(".err_mobile_1").html('<font color="red">请输入手机号码！</font>');
        }else{
            if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(mobile))){
                $(".err_mobile_1").html('<font color="red">不是完整的11位手机号或者正确的手机号前七位！</font>');
            }else{
                $(".err_mobile_1").html('<font color="green">手机号码格式正确！</font>');
                $("#mobile_lx").html(mobile);
            }
        }
    });
    //帐号修复结果查询
    $("#btn").click(function(){
        var query_name=$("#query_name").val();
        var query_rand=$("#query_rand").val();
        var query_mima=$("#query_mima").val();
        if(query_name==''){
         $("#err_name").html('<font color="red">请输入你的帐号！</font>');
        }else if(query_rand==''){
         $("#err_rand").html('<font color="red">请输入你要查询的单号！</font>');
        }else if(query_mima==''){
         $("#err_mima").html('<font color="red">请输入密码！</font>');
        }else{
            $(".service-num").html(query_rand);
            $.ajax({
                url:"/?ct=cs&ac=ajax_btn",
                data:{query_rand:query_rand,query_name:query_name,query_mima:query_mima},
                dataType:'json',
                type:'post',
                success:function (msg) {
                    //alert(msg);
                    if(msg.status ==200){
                        $(".repairResult-1-step").hide();
                        $(".repairResult-3-step").show();
                        $('#home_keleyi_com').attr('href','/?ct=cs&ac=findpsw');
                    }else if(msg.status == 1){
                        $(".repairResult-1-step").hide();
                        $(".repairResult-3-step").show();
                        $('#home_keleyi_com').attr('href','/?ct=account&ac=email');
                    }else if(msg.status == 2){
                        $(".repairResult-1-step").hide();
                        $(".repairResult-3-step").show();
                        $('#home_keleyi_com').attr('href','/?ct=account&ac=unbind_mobile');
                    }else if(msg.status == 3){
                        $(".repairResult-1-step").hide();
                        $(".repairResult-3-step").show();
                        $('#home_keleyi_com').attr('href','/?ct=account&ac=mibao');
                    }else if (msg.status == 202){
                        $(".repairResult-1-step").hide();
                        $(".repairResult-4-step").show();
                    }else if(msg.status == 404){
                        $("#error_num").html('<font color="red">你输入的信息错误，请查证后再输入！</font>');
                    }else if(msg.status == 403){
                        $(".repairResult-1-step").hide();
                        $(".repairResult-2-step").show();
                    }
                }
            })
        }

    });

});

//function buttonss() {
//    var obphone = $('.step-1 .phone-inp').attr('data-true');
//    var codeinp = $('.step-1 .code-inp').attr('data-true');
//    var mescode = $('.step-1 .mes-code').attr('data-true');
//    if(obphone == 1 && codeinp == 1 && mescode == 1){
//        $('#stepbutton1').removeAttr('disabled');
//    }else{
//        $('#stepbutton1').attr('disabled','disabled');
//    }
//}
//每个依次验证
//function vif(type,obj,num) {
//    var newobj = $(obj);
//    var obvif = newobj.next('input[type="hidden"]').val();
//    $.post('/?ct=cs&ac=vifAjax',{
//        type : type,
//        num : num,
//        obvif : obvif
//    },function (data) {
//        switch(data.info)
//        {
//            case 201:
//                $('#vifmobile'+num).removeClass('err').addClass('ok').html('输入正确！');
//                newobj.attr('data-true','1');
//                $('#stepbutton1').attr('data-mobile',type);
//                buttonss();
//                $('#buttons').attr('data-mobile',type);
//                break;
//            case 200:
//                $('#vifmobile'+num).removeClass('err').addClass('ok').html('输入正确！');
//                newobj.attr('data-true','1');
//                buttonss();
//                break;
//            case 202:
//                $('.vifmobile'+num).removeClass('err').html('');
//                newobj.attr('data-true','1');
//                //  外挂举报需要用
//                $('.wg-o-step .sub-btn-td #wgbutton').removeAttr('disabled');
//                buttonss();
//                per_vif()
//                break;
//            case 500:
//                $('#vifmobile3').removeClass('ok').addClass('err');
//                newobj.attr('data-true','0');
//                buttonss()
//                $('#vifmobile3').html('您输入的短信验证码已经失效！');
//                break;
//            case 1:
//                $('#vifmobile'+data.info).removeClass('ok').addClass('err');
//                newobj.attr('data-true','0');
//                buttonss()
//                $('#vifmobile'+data.info).html('您输入的手机号错误！');
//                $('#buttons').attr('data-mobile',type);
//                break;
//            case 2:
//                $('.vifmobile'+data.info).removeClass('ok').addClass('err');
//                newobj.attr('data-true','0');
//                buttonss()
//                $('.vifmobile'+data.info).html('您输入的验证码错误！');
//                //  外挂举报需要用
//                $('.wg-o-step .sub-btn-td #wgbutton').attr('disabled','disabled');
//                break;
//            case 3:
//                $('#vifmobile'+data.info).removeClass('ok').addClass('err');
//                newobj.attr('data-true','0');
//                buttonss()
//                $('#vifmobile'+data.info).html('您输入的短信验证码错误！');
//                break;
//            default:
//                false
//        }
//    });
//}
//$('#buttons,#stepbutton1').click(function () {
//    var obthis = $(this);
//    var mobile = obthis.attr('data-mobile');
//    var user_name = obthis.attr('data-json');
//    $.post('/?ct=cs&ac=mobileAjax',{
//        mobile : mobile,
//        user_name : user_name
//    },function (msg) {
//        if(msg.new == 1){
//            $('.query-o-step .step-2').show();
//            $('.query-o-step .step-1').hide();
//            alert('发送成功')
//            return false;
//        };
//        (msg.info == 200) ? (alert('发送成功,验证码5分钟内有效！'),$('#stepbutton1').attr('data-json',msg.user_name)) : alert('请检查手机号！');
//        (msg.success) ? (obthis.parent('li').prev('li').find('input[type="hidden"]').val(msg.success),obthis.removeClass('buttonshovers'),obthis.css('color','#999'),vifnewbuttons(),vifold()) : false;
//    })
//});
////  验证码过期时间
//var oldtime=300;
//function vifold() {
//    if(oldtime == 0){
//        $('#buttons').parent('li').prev('li').find('input[type="hidden"]').val("old");
//        oldtime = 300;
//        return;
//    }else {
//        oldtime--;
//    }
//    setTimeout(function() {
//            vifold() }
//        ,1000)
//}
////重新获取时间
//var countdown=60;
//function vifnewbuttons() {
//    var obthis = $('#buttons');
//    if (countdown == 0) {
//        obthis.removeAttr("disabled");
//        obthis.html("获取验证码");
//        obthis.css('color','#2d5294');
//        obthis.addClass('buttonshovers')
//        countdown = 60;
//        return;
//    } else {
//        obthis.attr('disabled','disabled');
//        obthis.html("重新发送(" + countdown + ")");
//        countdown--;
//    }
//    setTimeout(function() {
//            vifnewbuttons() }
//        ,1000)
//}
//  添加记录
var num = 1;
$('#tj_jv').click(function () {
    num++
    var str = '';
    str +='<tr class="login-address"><td>账号充值记录：</td><td><input name="" placeholder="请选择充值日期"/><input name="" placeholder="充值金额（数字）"/></td></tr>';
    $(this).parent('td').parent('tr').after(str)
});
////重新获取时间
//var countdown=60;
//function vifnewbuttons() {
//    var obthis = $('#buttons');
//    if (countdown == 0) {
//        obthis.removeAttr("disabled");
//        obthis.html("获取验证码");
//        obthis.css('color','#2d5294');
//        obthis.addClass('buttonshovers')
//        countdown = 60;
//        return;
//    } else {
//        obthis.attr('disabled','disabled');
//        obthis.html("重新发送(" + countdown + ")");
//        countdown--;
//    }
//    setTimeout(function() {
//            vifnewbuttons() }
//        ,1000)
//}
