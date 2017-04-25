/**
 * Created by 巍 on 2016/12/29.
 */
var articleList = (function(){
    //我的博文列表
    $('td[data-flag=pubdate]').each(function(){
        $(this).text(moment($(this).attr('data-date')).format('YYYY-MM-DD HH:mm:ss'));
    });
    //发表评论
    function pubReview(url){
        var review  = $('#review');
        var review_con = $('#review_con');
        var submit = $('#submit');
        submit.click(function(e){
            e.preventDefault();
            if(!review_con.val()){
            	alert('内容不能为空')
            	return false;
            }
            $.ajax({
                url: url,
                type:'post',
                data:{aid: $('#aid').val(),con: review.find('#review_con').val(),pubdate: moment().format('YYYY-MM-DD HH:mm:ss')},
                success:function(data){
                    if(data.url){
                        location.href= data.url;
                    }
                    alert(data.message)
                },
                error: function(){

                }
            })
        })
    }
    pubReview('/api/review');
    
    //文章列表
    var renderList = function (){
    	var articleList = document.getElementById('articleList');
	    if(articleList){
	    	var  pageNum = location.search ? location.search.split('?')[1].split('=')[1] : 0;
	    	$.ajax({
	    		url:'/api/getList',
	    		type:'get',
	    		dataType:'json',
	    		data: {page: pageNum},
	    		success: function(data){
	    			var lsHtml = '';
	    					for(var i =0; i < data.aList.length; i++){
	    						lsHtml += '<div class="blog-post"><h2 class="blog-post-title"><a href="/article/' + data.aList[i]._id + '">'+ data.aList[i].title +' </a></h2>';
	    						lsHtml +='<p class="blog-post-meta">'+data.aList[i].pubdate + ' By <a href="javascript:" class="name">'+ data.aList[i].author + '</a></p>';
	    						lsHtml += '<div class="blog-post-con">'+ data.aList[i].con + '</div>';
	    						lsHtml += '<div class="blog-post-bot"><a href="/article/'+ data.aList[i]._id + '" name="addcomment" class="review" href="javascript:">';
	    						lsHtml += '<i class="z-icon-comment"></i><span class="num">'+ data.aList[i].viewCount + '</span> 条评论</a>';
	    						lsHtml += '</div></div>';
	    					}
	    			  articleList.innerHTML =  lsHtml;
	    		},
	    		error: function(data){
					articleList.innerHTML =  '网络错误,请稍后再试';
	    		}
	    	})
	   	 }
    }
    renderList();
})();
