/**
 * Created by 巍 on 2016/12/29.
 */
var pubArticle = (function(){
        //注册post验证
        var $pubBtn = $('#submit') , $pubForm = $('#pubFrom'), $pubTitle = $('input[name="title"]'),
            $pubCat = $('select[name="category"]'),$pubCon = $('textarea[name ="con"]');

        //初始化编辑器
        CKEDITOR.replace( 'con' );
        //注册点击按钮事件
        $pubBtn.on('click',function(e){
            var btnThis = this;
            e.preventDefault();

            if($pubTitle.val() == ''){
                showError('请填写标题');
                return;
            }

            if(CKEDITOR.instances.con.getData() == ''){
                showError('请填写正文');
                return;
            }
            $.ajax({
                type:'post',
                url: '/api/user/pubArticle',
                dataType:'json',
                data:{title: $pubTitle.val(),category: $pubCat.val(), con: CKEDITOR.instances.con.getData(),pubdate: moment().format('YYYY-MM-DD HH:mm:ss')},
                success: function(data){
                    if(data.code == 4){
                        if(data.message){
                            $('.modal-body').html(data.message + ' <a href="/user/publist">查看博文列表</a>')
                            $('#myModal').modal();
                        }
                        setTimeout(function(){
                            location.reload();
                        },3000)
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
//


