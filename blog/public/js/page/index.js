/**
 * Created by 巍 on 2016/12/29.
 */
var index = (function(){
    //首页
    var showArticle = $('#showArticle');
    var str = '';

//  $.ajax({
//      url:'/api/getArtList',
//      type:'get',
//      data:{},
//      dataType:'json',
//      success: function(data){
//          var resultObj = data;
//          for(var i=0;i< resultObj.length; i++){
//              str += '<div class="blog-post">'+
//                  '<h2 class="blog-post-title"><a href="/article/' + resultObj[i]._id+ '">' + resultObj[i].title + '</a></h2>' +
//                  '<p class="blog-post-meta">' + moment(resultObj[i].pubdate).format('YYYY-MM-DD HH:mm:ss') + ' By <a href="javascript:" class="name">' + resultObj[i].author + '</a></p>' +
//                  '<div class="blog-post-con"> ' + resultObj[i].con +
//                  '</div>'+
//                      '<div class="blog-post-bot">'+
//                      '<a href="/review/'+ resultObj[i]._id +'" name="addcomment" class="review" href="javascript:">'+
//                  ' <i class="z-icon-comment"></i><span class="num">0</span> 条评论</a>'+
//                  '</div>'+
//              '</div>';
//          }
//
//         // showArticle.find('.blog-list').html(str);
//      }
//  });
//function cutStr(str,start,end){
//    if(Object.prototype.toString.apply(str) == '[object String]'){
//        //排除图片
//        var regRule = /<p><img(.*?)><\/p>/g, newstr ='';
//        str = str.replace(regRule,'').replace(/^\s$/g,'');
//        newstr = str.substring(start,end);
//        if(!newstr.replace(/^\s$/g,'')){
//            newstr = '暂无文字'
//        }
//        newstr += '...';
//        return newstr;
//
//    }
//}

})();














