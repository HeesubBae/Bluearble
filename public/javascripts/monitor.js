function please_wait(data)
{
	var css_wigth;
	var data_theme;
	$('#game_stage').empty();
		$(data).each(function (i) {
			if(data.length==2){
				if(data[i].weight==0){data_theme="f";}
				if(data[i].weight==1){data_theme="g";}
				css_width=50;
			}else{
				if(data[i].weight==0){css_width='33.3'; data_theme="f";}
				if(data[i].weight==1){css_width='33.4'; data_theme="g";}
				if(data[i].weight==2){css_width='33.3'; data_theme="h";}
			}
			$("#game_stage").append("<div class='game_stage_user_div' style='width:"+css_width+"%;'>");
			$(".game_stage_user_div").append("<ul class='game_stage_user_ul' data-role='listview' data-inset='true'>");
			$(".game_stage_user_div ul:last").append("<li data-role='list-divider' data-theme="+data_theme+">" 
													  +"<span class='game_stage_user_name'>"+data[i].user_name+"</span><br>" 
													  +"<span class='game_stage_user_current_price'>보유금액 : "+data[i].current_money+"만원</span>"
													  +"</li>");			
			$(data[i].MyLandInfos).each(function (j) {
				$(".game_stage_user_div ul:last").append("<li data-icon='false'><a href='#'><img src='/nation/"+data[i].MyLandInfos[j].idx+".png' class='ui-li-icon'>"+data[i].MyLandInfos[j].name+"<img style='float:right; margin-right:8%;' src='/nation/r"+data[i].weight+""+data[i].MyLandInfos[j].buildState+".png' ><span class='ui-li-count' style='display:inline-block;'>"+data[i].MyLandInfos[j].totallpenalty+"만원</span></a></li>");
			});
			$('.game_stage_user_div').append("</ul></div>").trigger("create");
			//$("#game_stage").append("")
		});

		
};

function turn(data)
{
	console.log(data.user.weight);
	$('#turn_popup').empty();
	$('#turn_popup').append("<div class='turn_user_div' style='width:500px; height:500px; background-image:url(/turn/"+data.user.weight+".png);'></div>");
	$('.turn_user_div').append("<div class='turn_user_name'><span class='turn_user_name_span1'>"+data.user.user_name+"</span><span class='turn_user_name_span2'>님</span></div>");
};


function dice(data)
{
	var dice_result=data.d1+data.d2;
	var same=1;
	if(data.d1==data.d2)
	{
		same=2;
	}
	$('#dice_popup').empty();
	$('#dice_popup').append("<div class='dice_result_div' style='background-image:url(/dice/dice_result"+same+".png);'>"+dice_result+"</div>");
	$('#dice_popup').append("<img src='/dice/"+data.d1+".png'/>&nbsp;&nbsp;<img src='/dice/"+data.d2+".png'/>");

};

function broad_cast(data)
{
	console.log(data);
	var status=data.status;
	var buildState=data.buildState;

	$('#broad_cast_popup').empty();
	$('#broad_cast_popup').append("<div class='broad_cast_user_div' style=' float:left; width:550px; height:500px; background-image:url(/broad_cast/"+data.weight+".png);'></div>");
	$('.broad_cast_user_div').append("<div class='turn_user_name'><span class='turn_user_name_span1'>"+data.user_name+"</span><span class='turn_user_name_span2'>님</span></div>");		

	if(status==0 && buildState==1000)
	{
		$('.broad_cast_user_div').append("<div class='broad_cast_land_name'>["+data.current_place_name+"]땅을</div>");
		$('.broad_cast_user_div').append("<div class='broad_cast_end_text' style='text-align:center';>구매하였습니다.</div>");
	}

	if(status==3 && buildState==1100)
	{
		$('.broad_cast_user_div').append("<div class='broad_cast_land_name'>["+data.current_place_name+"]에</div>");
		$('.broad_cast_user_div').append("<div class='broad_cast_end_text' style='text-align:center';>[빌딩]을 건설하였습니다.</div>");
	}

	if(status==3 && buildState==1110)
	{
		$('.broad_cast_user_div').append("<div class='broad_cast_land_name'>["+data.current_place_name+"]에</div>");
		$('.broad_cast_user_div').append("<div class='broad_cast_end_text' style='text-align:center';>[호텔]을 건설하였습니다.</div>");
	}

	if(status==5)
	{
		$('.broad_cast_user_div').append("<div class='broad_cast_land_name'>&nbsp;</div>");
		$('.broad_cast_user_div').append("<div class='broad_cast_end_text' style='text-align:center';>파산하였습니다.</div>");
	}

	if(status==6)
	{
		$('.broad_cast_user_div').append("<div class='broad_cast_land_name'>["+data.current_place_name+"]땅을</div>");
		$('.broad_cast_user_div').append("<div class='broad_cast_end_text' style='text-align:center';>인수하였습니다.</div>");
	}

	if(status==7)
	{
		$('.broad_cast_user_div').append("<div class='broad_cast_land_name'>["+data.owner+"]에게 통행료</div>");
		$('.broad_cast_user_div').append("<div class='broad_cast_end_text' style='text-align:center';>"+data.totallpenalty+"만원을 지불했다.</div>");
	}

	if(status==8)
	{
		$('.broad_cast_user_div').append("<div class='broad_cast_land_name'>무.인.도에</div>");
		$('.broad_cast_user_div').append("<div class='broad_cast_end_text' style='text-align:center';>고립되었습니다.</div>");
	}

	if(status==10)
	{
		$('.broad_cast_user_div').append("<div class='broad_cast_land_name'>복지기금 10만원을 </div>");
		$('.broad_cast_user_div').append("<div class='broad_cast_end_text' style='text-align:center';>[기부]하였습니다.</div>");
	}

	if(status==11)
	{
		$('.broad_cast_user_div').append("<div class='broad_cast_land_name'>복지기금 "+ data.SocialMoney +"원을 </div>");
		$('.broad_cast_user_div').append("<div class='broad_cast_end_text' style='text-align:center';>[회수]하였습니다.</div>");
	}

	if(status==12)
	{
		$('.broad_cast_user_div').append("<div class='broad_cast_land_name'>월급 20만원을 </div>");
		$('.broad_cast_user_div').append("<div class='broad_cast_end_text' style='text-align:center';>받았습니다.</div>");
	}
}


function youwin(data)
{
	$('#youwin_popup').empty();
	$('#youwin_popup').append("<div class='broad_cast_user_div' style=' float:left; width:550px; height:500px; background-image:url(/broad_cast/"+data.weight+".png);'></div>");
	$('.broad_cast_user_div').append("<div class='turn_user_name'><span class='turn_user_name_span1'>"+data.user_name+"</span><span class='turn_user_name_span2'>님</span></div>");
	$('.broad_cast_user_div').append("<div class='broad_cast_land_name'>승리</div>");
}
/*
<div id="game_stage" data-role='page'>

	<div class='game_stage_user_div'>
	<ul data-role="listview" data-inset="true">
		<li data-role="list-divider" data-theme="f">
			<span class='game_stage_user_name'>배희섭</span><br>
			<span class='game_stage_user_current_price'>보유금액 : 300만원</span>
		</li>
		
		<li><a href="#"><img src="themes/nation/1.png" class="ui-li-icon">파리 <span class="ui-li-count">300만원</span></a></li>
		<li><a href="#"><img src="themes/nation/2.png" class="ui-li-icon">부에노스<span class="ui-li-count">300만원</span></a></li>
		<li><a href="#"><img src="themes/nation/3.png" class="ui-li-icon">산티에고<span class="ui-li-count">300만원</span></a></li>
		<li><a href="#"><img src="themes/nation/4.png" class="ui-li-icon">모스크바<span class="ui-li-count">300만원</span></a></li>
		<li><a href="#"><img src="themes/nation/5.png" class="ui-li-icon">워싱턴<span class="ui-li-count">300만원</span></a></li>
	</ul>
	</div>

*/