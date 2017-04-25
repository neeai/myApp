/**
 * Created by 巍 on 2016/12/27.
 */
var userHome = (function(){
    //getUserInfo

        $.ajax({
            type:'post',//注意后端处理也是get方式
            url:'/api/getuserinfo',
            data:{},
            dataType:'json',
            success: function(data){
                resultData = data;
                var htmltd = '';
                htmltd += '<tr>'+
                    '<td>'+ data._id +'</td>'+
                    '<td>'+ data.name +'</td>'+
                    '<td>'+ moment(data.regdate).format('YYYY-MM-DD HH:mm:ss') +'</td>'+
                    '</tr>';
                $('#userInfo-table').find('tbody').html(htmltd);
            }
        });


})();
