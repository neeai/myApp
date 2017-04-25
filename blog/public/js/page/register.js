/**
 * Created by 巍 on 2016/12/26.
 */

var register = (function(){
    //注册post验证
    var $regBtn = $('#submit') , $regForm = $('#regFrom'), $regName = $('input[name="user"]'),
        $regPwd = $('input[name="password"]'), $regPwd2 = $('input[name="password2"]');

    //注册点击按钮事件
    $regBtn.on('click',function(e){
        var btnThis = this;
        e.preventDefault();

        if($regName.val() == ''){
            showError('请填写用户名');
            return;
        }

        if($regPwd.val() == ''){
            showError('密码不能为空');
            return;
        }

        if($regPwd2.val() == ''){
            showError('请重复输入密码');
            return;
        }

        if($regPwd.val() != $regPwd2.val()){
            showError('两次输入密码不一致');
            return;
        }

        $.ajax({
            type:'post',
            url: '/api/register',
            dataType:'json',
            data:{user: $regName.val(),password: $regPwd.val(),regdate: moment().format('YYYY-MM-DD HH:mm:ss')},
            success: function(data){
                if(data.code == 3){
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