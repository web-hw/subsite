/**
 * Created by Administrator on 2017/9/29.
 */
function problemResult(obj,resultid,uid) {
    var obthis = $(obj);
    obthis.addClass('on');
    obthis.parents().parents('.tab-btn').find('a[type!=' + resultid + ']').removeClass();
    $.ajax({
        url: "/?ct=cs&ac=probAjax",
        data: {
            resultid: resultid,
            uid: uid
        },
        // dataType: 'json',
        type: 'post',
        success: function (rel) {
            console.log(rel)
            $('#record-list').next().first().remove();
            $('#record-list').after(rel);
        }
    })
}
$('#prev').click(function () {
    $('.record-o-step-1').show();
    $('.record-o-step-2').hide();
})

function lookcont(id,type) {
    $('.record-o-step-1').hide();
    $('.record-o-step-2').show();
    var str = '';
    $.ajax({
        url : "/?ct=cs&ac=numqueryAjax",
        data : {
            id : id,
            type : type
        },
        // dataType : 'json',
        type : 'post',
        success : function (msg) {

            $('.record-o-step-2 #myorder-title').html('['+msg.problem_id+']');
            if(msg.result == 1){
                // 回复
                str +='<div class="reply"><span class="reply-arrow f-left"></span><div class="con-list"><div class="h-tit">客服工号'+msg.kf_id+'回复<span>'+msg.result_time+'</span></div><div>'+msg.result_content+'</div></div></div>'

            }
            //   问题详情
            str += '<div class="history clearfix"><span class="content-arrow f-left"></span><div class="con-list">';
            str += '<div class="h-tit">提单内容　<span>'+msg.create_time+'</span></div> <ul class="clearfix">';
            if(msg.count == 22){
                str += '<li>问题编号</li><li>'+msg.problem_id+'</li>';
                str += '<li>所在游戏</li><li>'+msg.user_game+'</li>';
                str += '<li>所在服务器</li><li>'+msg.user_server+'服</li>';
                str += '<li>角色名</li><li>'+msg.user_name+'</li>';
                str += '<li>等级</li><li>'+msg.user_lever+'</li>';
                str += '<li>姓名</li><li>'+msg.user_realname+'</li>';
                str += '<li>邮箱</li><li>'+msg.user_email+'</li>';
                str += '<li>联系手机号</li><li>'+msg.user_phone+'</li>';
                str += '<li>注册证件</li><li>'+msg.reg_num+'</li>';
                str += '<li>注册时间</li><li>'+msg.reg_time+'</li>';
                str += '<li>注册地址</li><li>'+msg.reg_home+'</li>';
                str += '<li>充值记录</li><li>'+msg.pay_orders+'</li>';
                str += '<li>遇到的问题</li><li>'+msg.user_content+'</li>';
            }else if (msg.count == 20){
                str += '<li>问题编号</li><li>'+msg.problem_id+'</li>';
                str += '<li>账号</li><li>'+msg.self_name+'</li>';
                str += '<li>游戏</li><li>'+msg.fd_game+'</li>';
                str += '<li>服务器</li><li>'+msg.fd_server+'</li>';
                str += '<li>角色名</li><li>'+msg.fd_gname+'</li>';
                str += '<li>截图</li><li><img src="'+msg.fd_imgs+'" width="35" height="35" alt="" id="prb_img" style="cursor:pointer"></li></li>';
                str += '<li>联系电话</li><li>'+msg.fd_mobile+'</li>';
                str += '<li>QQ</li><li>'+msg.fd_qicq+'</li>';
                str += '<li>建议或bug具体说明</li><li>'+msg.fd_content+'</li>';
            }else{
                str += '<li>问题编号</li><li>'+msg.problem_id+'</li>';
                str += '<li>账号</li><li>'+msg.self_name+'</li>';
                str += '<li>游戏</li><li>'+msg.bug_game+'</li>';
                str += '<li>服务器</li><li>'+msg.bug_server+'</li>';
                str += '<li>角色名</li><li>'+msg.bug_gname+'</li>';
                str += '<li>截图</li><li><img src="'+msg.bug_imgs+'" width="35" height="35" alt="" id="prb_img" style="cursor:pointer"></li>';
                str += '<li>建议或bug具体说明</li><li>'+msg.bug_content+'</li>';
            }
            str += ' </ul></div></div>';
            $('.record-o-step-2 .s-content').html(str);
        }
    })
}

$("#game").change(function(){
    var gid=$(this).val();
    if(gid){
        $.post("?ct=account&ac=president",{
            gid:gid
        },function(data){
            if(data != ''){
                $("#server").empty().append("<option value='0'>请选择举报角色所在游戏</option>");
                $.each(data,function(key,value){
                    var option = $("<option>").val(key).text(value);
                    $("#server").append(option);
                });
            }
        },"json");

    }
});