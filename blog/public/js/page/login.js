/**
 * Created by 巍 on 2016/12/26.
 */

var login = (function(){
    //注册post验证
    var $logBtn = $('#submit') , $loginForm = $('#loginFrom'), $logName = $('input[name="user"]'),
        $logPwd = $('input[name="password"]');

    //注册点击按钮事件
    $logBtn.on('click',function(e){
        var btnThis = this;
        e.preventDefault();

        if($logName.val() == ''){
            showError('请填写用户名');
            return;
        }

        if($logPwd.val() == ''){
            showError('密码不能为空');
            return;
        }


        $.ajax({
            type:'post',
            url: '/api/login',
            dataType:'json',
            data:{user: $logName.val(),password: $logPwd.val()},
            success: function(data){
                if(data.code == 4){
                    if(data.message){
                        $('.modal-body').html(data.message)
                        $('#myModal').modal();
                    }
                    if(data.url){
                        setTimeout(function(){
                            location.href= data.url;
                        },1000)
                    }
                }else{
                    if(data.message){
                        showError(data.message);
                    }
                }
            }
        });
    });

    //注册表单错误提示模态
    function showError(err){
        if(Object.prototype.toString.apply(err) == '[object String]'){
            $('.modal-body').html(err);
            $('#myModal').modal();
            setTimeout(function(){$('#myModal').modal('hide')}, 800);
        }
    }
})();
