/**
 * Created by Administrator on 2017/10/20.
 */
$(function(){
    $(".ac_rightnav .ac_accountsafe .set-password  .words_box.active>a").text("已设置");
    $(".ac_rightnav .ac_accountsafe .set-password  .words_box.active .tit>i").text("已设置");
    $(".ac_rightnav .ac_accountsafe .set-password .user-phone .words_box.active>a").text("更换手机");


    //账户安全设置
    $(".ac_rightnav .ac_accountsafe .set-password .li-box .words_box .edit-btn").on("click",function(){

        var obj_index=$(this).closest("li").index();

        var obj_box= $(this).closest(".words_box");
        if(obj_box.hasClass("active"))return
        else {
            $(".ac_rightnav .ac_accountsafe .set-password").hide();
            $(".ac_accountsafe .edit-contentbox ").show();
            $(".ac_accountsafe .edit-contentbox .edit-contentlist").eq(obj_index).show().siblings().hide();
        }
    });
    $(".ac_accountsafe .edit-contentbox .edit-contentlist .submit-btn").on("click",function(){
        $(".ac_rightnav .ac_accountsafe .set-password").show();
        $(".ac_accountsafe .edit-contentbox ").hide();
        $(".ac_accountsafe .edit-contentbox .edit-contentlist").hide();
    });

    $(".form_datetime").datetimepicker({format: 'yyyy-mm-dd hh:ii'});
});
