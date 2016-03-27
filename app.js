var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var engine = require('ejs-locals')
var path = require('path');
var net = require('net');
var url = require('url');
var fs = require('fs');
var io = require('socket.io');

var app = express();

// all environments
app.set('port', process.env.PORT || 9001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.engine('ejs',engine);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/arduino', routes.arduino);
app.get('/users', user.list);

// Web Server
var server=http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});





///////////////////////////////////// Blue Marble Source //////////////////////////////////////////////////
///////////////////////////////////// Blue Marble Source //////////////////////////////////////////////////
///////////////////////////////////// Blue Marble Source //////////////////////////////////////////////////
///////////////////////////////////// Blue Marble Source //////////////////////////////////////////////////
///////////////////////////////////// Blue Marble Source //////////////////////////////////////////////////
///////////////////////////////////// Blue Marble Source //////////////////////////////////////////////////
///////////////////////////////////// Blue Marble Source //////////////////////////////////////////////////
///////////////////////////////////// Blue Marble Source //////////////////////////////////////////////////
///////////////////////////////////// Blue Marble Source //////////////////////////////////////////////////




/////////////////////////////////// 땅 정보 ////////////////////////////////////////

var LandInfos= [];


function LandInfo( _idx, _name, _landprice, _buildingPrice, _hotelPrice, _LandMarkPrice, _landToll, _buildingToll, _hotelToll, _LandMarkToll, _totallpenalty, _possibleBuilding, _owner, _isAttract, _buildState, _arduinoPosition)
{
   this.idx = _idx;								// 땅 index

   this.name = _name;							//땅이름
   this.landPrice = _landprice;					//땅가격
   this.buildingPrice = _buildingPrice;			//빌딩가격
   this.hotelPrice = _hotelPrice;				//호텔 가격
   this.LandMarkPrice = _LandMarkPrice;			//랜드마크 가격

   this.landToll = _landToll;					//땅만 지었을 때 통행세
   this.buildingToll = _buildingToll;			//빌딩 지었을 때 통행세
   this.hotelToll = _hotelToll;					//호텔 지었을 때 통행세
   this.LandMarkToll = _LandMarkToll;			//랜드마크 지었을 때 통행세

   this.totallpenalty = _totallpenalty;			//현재 이곳에 걸렸을 때 낼 벌금
   this.possibleBuilding = _possibleBuilding;	//현재 지을 수 있는 빌딩의 가격
   this.owner = _owner;							//이 땅의 주인(0~3) or 땅 상태
   this.isAttract = _isAttract;					//현재 이 땅이 관광지인지 아닌지 상태 변수
   this.buildState = _buildState;				//현재 건물이 지어진 현황

   this.arduinoPosition = _arduinoPositionnn		//아두이노 위치값
}


function LandInfoInit(){
	var land = new LandInfo(0,'출발점',0,0,0,0,0,0,0,0,0,0,555,0,"0000",'x');
	LandInfos.push(land);
	var land = new LandInfo(1,'아테네',10,15,25,30,3,27,55,70,0,10,-1,0,"0000",'a');
	LandInfos.push(land);
	var land = new LandInfo(2,'파리',12,15,25,30,3,30,60,75,0,12,-1,0,"0000",'b');
	LandInfos.push(land);
	var land = new LandInfo(3,'런던',14,30,50,60,5,45,75,90,0,14,-1,0,"0000",'c');
	LandInfos.push(land);
	var land = new LandInfo(4,'독도',50,0,0,0,60,0,0,0,0,50,-1,1,"0000",'d');
	LandInfos.push(land);
	var land = new LandInfo(5,'로마',16,30,50,60,6,50,90,100,0,16,-1,0,"0000",'e');
	LandInfos.push(land);
	var land = new LandInfo(6,'무인도',0,0,0,0,0,0,0,0,0,0,666,0,"0000",'f');
	LandInfos.push(land);
	var land = new LandInfo(7,'모스크바',16,30,50,60,6,50,90,100,0,16,-1,0,"0000",'g');
	LandInfos.push(land);
	var land = new LandInfo(8,'멕시코시티',16,30,50,60,6,50,90,100,0,16,-1,0,"0000",'h');
	LandInfos.push(land);
	var land = new LandInfo(9,'부에노스',22,45,75,80,9,70,105,125,0,22,-1,0,"0000",'i');
	LandInfos.push(land);
	var land = new LandInfo(10,'화와이',20,0,0,0,30,0,0,0,0,20,-1,1,"0000",'j');
	LandInfos.push(land);
	var land = new LandInfo(11,'도쿄',5,15,25,30,1,9,25,40,0,5,-1,0,"0000",'k');
	LandInfos.push(land);
	var land = new LandInfo(12,'사회수납처',0,0,0,0,0,0,0,0,0,0,777,0,"0000",'l');
	LandInfos.push(land);
	var land = new LandInfo(13,'카이로',28,45,75,80,12,85,120,150,0,28,-1,0,"0000",'m');
	LandInfos.push(land);
	var land = new LandInfo(14,'해운대',50,0,0,0,25,0,0,0,0,50,-1,1,"0000",'n');
	LandInfos.push(land);
	var land = new LandInfo(15,'산티아고',30,60,100,120,13,90,127,140,0,30,-1,0,"0000",'o');
	LandInfos.push(land);
	var land = new LandInfo(16,'시드니',32,60,100,120,15,100,140,160,0,32,-1,0,"0000",'p');
	LandInfos.push(land);
	var land = new LandInfo(17,'방콕',32,60,100,120,15,100,140,160,0,32,-1,0,"0000",'q');
	LandInfos.push(land);
	var land = new LandInfo(18,'무료주차장',0,0,0,0,0,0,0,0,0,0,888,0,"0000",'r');
	LandInfos.push(land);
	var land = new LandInfo(19,'뉴델리',28,45,75,80,12,85,120,140,0,28,-1,0,"0000",'s');
	LandInfos.push(land);
	var land = new LandInfo(20,'사회접수처',0,0,0,0,0,0,0,0,0,0,444,0,"0000",'t');
	LandInfos.push(land);
	var land = new LandInfo(21,'워싱턴 DC',35,60,100,120,17,110,150,170,0,35,-1,0,"0000",'u');
	LandInfos.push(land);
	var land = new LandInfo(22,'베이징',32,60,100,120,15,100,140,160,0,32,-1,0,"0000",'v');
	LandInfos.push(land);
	var land = new LandInfo(23,'서울',40,70,120,140,25,150,200,250,0,40,-1,0,"0000",'w');
	LandInfos.push(land);
	//console.dir(LandInfos);
}


/////////////////////////////////// 땅 정보 ////////////////////////////////////////

var SocialMoney = 0;
var monitors=[];
var ARDUINO;

// 사용자 정보 클래스
function UserInfo()
{
	this.id="";
	this.user_name="";
	this.isBot="";
	this.current_money=1000;
	this.weight=0;
	this.current_place=0;
	this.isolated=0;
	this.driftdays=0
	this.bankrupt=0;
	this.bankrupt_check=0;
	this.dice_processing=0
	this.MyLandInfos=[];
}


// 사용자 정보 생성자
function addUser(id,isbot,user_name)
{
	var user = new UserInfo();
	user.id = id;
	user.isBot = isbot;		
	user.user_name = user_name
	users.push(user);
}


// 소켓 아이디에 맞는 사용자 배열 Index 리턴
function getMatchId(id)
{
	for (idx in users) {
			if(users[idx].id==id)
			return idx;
	}	
}

// 소켓 아이디에 맞는 사용자 배열 Index 리턴
function removeGetMatchMonitorId(id)
{
	if(monitors.length!=0){
		for (idx in monitors) {
				if(monitors[idx]==id)
				{
					monitors.splice(idx,1);
				}
		}	
	}
}


// 닉네임에 맞는 사용자 배열 Index 리턴
function getMatchName(user_name)
{
	for (idx in users) {
			if(users[idx].user_name==user_name)
			return idx;
	}	
}


// 사용자 삭제 - 이름을 받고 삭제
function removeUser(bot_name)
{
	for (idx in users) {
			//console.log("idx= ["+ idx +"]"+ users[idx].user_name + "=? botname =  "  + bot_name);
			if(users[idx].user_name==bot_name){
			//console.log("delete _ info =" + users[idx].name);
			users.splice(idx,1);
			//console.log("delete Commit");
		}
	}
}

// 사용자 정보 갱신 -- 대기방 
function user_list(){

	var object=JSON.stringify(users);

	
	for (idx in users) {
		io.sockets.sockets[users[idx].id].emit('user_list', object)
	}
	broadcast_monitor('user_list',object);
}

// 턴정하기 주사위값 받아서 weight에 넣기
function addDiceValueToWeight(user_name,dice_value_sum)
{
	var idx=getMatchName(user_name);
	users[idx].weight=dice_value_sum*1;
}


// 패킷 기본정보 클래스
function DefaultInfo()
{
	
	this.user_name="";
	//this.game_order="";//decide_order 니 순서는 이거다.
}


// 패킷의 기본 정보 생성
function createDefaultObject(idx)
{
	var object = new DefaultInfo();
	object.id = users[idx].id;
	object.user_name = users[idx].user_name;
	object.isBot = users[idx].isBot;
	object.current_money = users[idx].current_money;
	object.weight=users[idx].weight;
	

	return object;
}

// 정렬함수
function SortUsers(){

	for(i=0; i<=users.length-1; i++)
	{
		for(j=i+1; j<=users.length-1; j++)
		{
			if(users[i].weight < users[j].weight)
			{
				var temp=users[i];
				users[i]=users[j]
				users[j]=temp;
			}
		}
	}
}

// 니 순서는 이거다. 
function decide_order(){
	
	for (idx in users) {
		var object=createDefaultObject(idx);
		object.game_order=idx;
		var object2=JSON.stringify(object);
		users[idx].weight=idx;
		io.sockets.sockets[users[idx].id].emit('decide_order', object2);
	}
	
}


function broadcast_monitor(e,d)
{
	if(monitors.length !=0){
		for(idx in monitors)
		{
			io.sockets.sockets[monitors[idx]].emit(e,d);
		}
	//monitor.emit(e,d);
	}
}

function please_wait(){
	var object3=JSON.stringify(users);
	broadcast_monitor('please_wait',object3);

	
	var win=isWiner(); // 우승자 검색.

			for (idx in users) {

				// 파산은 됬는데 땅 정보가 초기화 되지 않는경우 
				if(users[idx].bankrupt==1 && users[idx].bankrupt_check==0) 
				{
					for (land in users[idx].MyLandInfos)
					{
						console.log("land" + land);
						console.log("----------------------");
						console.dir(LandInfos[land_idx]);
						console.log("----------------------");
						var land_idx=users[idx].MyLandInfos[land].idx
						LandInfos[land_idx].totallpenalty = 0;
						LandInfos[land_idx].possibleBuilding = LandInfos[land_idx].landPrice;
						LandInfos[land_idx].owner = -1;
						LandInfos[land_idx].buildState = "0000";
						

						// + 아두이누 통신 파산 ★ 미구연
						var arduinoString="";
						var char_user_idx = user_idx_to_char(idx)
						send_to_arduino(char_user_idx);

					}
					users[idx].bankrupt_check=1;
					users[idx].MyLandInfos=[];
					users[idx].current_money=0;
				}
				// 파산이 아닐시
				else if(users[idx].bankrupt==0){ 
					var object=users[idx];
						object.users=[];

					var object2=JSON.stringify(object);
					if(win!=1){
						io.sockets.sockets[users[idx].id].emit('please_wait',object2);
						console.log('pleas wait to ' + idx);
					}
				}

			}//for

}


// 턴 함수
function isTurn(turn){
	number=turn;
	while(1)
	{
		if(users[number%(users.length)].bankrupt==1)
		{
			number++;
		}
		else
		{
			break;
		}
	}
	return number;
}


// 실제 살아있는 사용자수
function RealUsersLengh(){
	var count=0;
	for (idx in users) {
		if(users[idx].bankrupt==0){
			count++;
		}	
	}
	return count;
}


// 사용자가 보유한 땅 정보 중 특정 위치 값 반환
function findIndexInMyLandInfos(owner,land_idx)
{
	var number=0;
	
	for (idx in users[owner].MyLandInfos) 
	{
		if(users[owner].MyLandInfos[idx].idx==land_idx)
		{
			number=idx;
			break;
		}
	}		
	return number;
}


// 사용자가 보유한 땅 정보 중 특정 위치 땅 삭제
function removeLandInMyLandInfos(owner,land_idx)
{
	for (idx in users[owner].MyLandInfos) 
	{
		if(users[owner].MyLandInfos[idx].idx==land_idx)
		{
			users[owner].MyLandInfos.splice(idx,1);
			break;
		}
	}		
}

// 주사위 내부연산
function DiceProcess(data)
{
	// 0 Json.Parse
	var object = data;

	// 1 IDX 찾기
	var idx = object.weight;
	var isBot = object.isBot;
	var d1 = object.dice_value1;
	var d2 = object.dice_value2;
//	var d1 = 6;
//	var d2 = 6;

	console.log("||||||||||||||||||||||||||||||||||||||||||||||||" );
	console.log("user  =" + idx)
	console.log("weight = " + object.weight);

	// 3 내가 서 있는 땅정보 || inPlace (땅정보 객체)
	console.log("Before = " + users[idx].current_place);
	console.log(" d1    =" + d1);
	console.log(" d2    =" + d2);	
	
	if(users[idx].current_place +( d1+d2 ) >= 24 )
	{
		users[idx].current_money = users[idx].current_money + 20;
	}

	users[idx].current_place =  (users[idx].current_place +( d1+d2 ) ) % 24;


	console.log("After = " + users[idx].current_place);
	var inPlace = LandInfos[users[idx].current_place];

	// 4 무인도 처리 시작
	if(users[idx].isolated == 0 && inPlace.owner== 666 )   //무인도에 처음으로 진입
	{
		users[idx].isolated = 1;										// ※ 무인도에 진입

		var object = createDefaultObject(idx)							// name 만 가지고 있음
		object.status = 8 ;												// 땅 이벤트 
		object.current_place = users[idx].current_place;				// 현재 밝고 있는 땅
		object.driftdays = users[idx].driftdays							// 고립일 0부터 시작
		object.buildState = inPlace.buildState;							// ★ 빌딩상태
		object.d1=d1;
		object.d2=d2;
	//	object.LandInfos=LandInfos;
	//	object.UserInfo=users;
		var result =object;	
		
		users[idx].driftdays ++;										// 고립일 

		return result;
	}
	else if(users[idx].isolated == 1 && d1 != d2)						//더블이 안나온 경우
	{
		if(users[idx].driftdays == 3)									// 3일이 되었나?
		{
			users[idx].isolated = 0;
			users[idx].driftdays = 0; 
		}
		else
		{
			users[idx].current_place=6;									// ※ 강제로 무인도에 해줌.
			var object = createDefaultObject(idx)						// name 만 가지고 있음
			object.status = 8 ;											// 땅 이벤트 
			object.current_place = users[idx].current_place;			// 현재 밝고 있는 땅
			object.driftdays = users[idx].driftdays						// 고립일 0부터 시작  
			object.buildState = inPlace.buildState;						// ★ 빌딩상태
			object.d1=d1;
			object.d2=d2;
		//	object.LandInfos=LandInfos;
		//	object.UserInfo=users;
			users[idx].driftdays ++;

			var result =object;	  
			return result;
		}   
	}
	else if(users[idx].isolated == 1 && d1 == d2)							//더블이 안나온 경우
	{
			users[idx].isolated = 0;
			users[idx].driftdays = 0; 
	}
	// 4 무인도 처리 끝

	// 5 빈땅 시작
	if(inPlace.owner == -1)													//빈땅
	{
		console.log("currentmoeny " + users[idx].current_money + "     /////    landToll!!!!" + inPlace.landPrice);
		if(users[idx].current_money >= inPlace.landPrice)					//살돈 있을 때
		{
			var object = createDefaultObject(idx)							// name 만 가지고 있음
			object.status = 0 ;												// 땅 이벤트 
			object.current_place = users[idx].current_place;				// 현재 밝고 있는 땅
			object.buildState = inPlace.buildState;							// ★ 빌딩상태
			object.possibleBuilding = inPlace.possibleBuilding;				//인공지능추가
			object.current_money = users[idx].current_money;				//인공지능추가
			object.d1=d1;
			object.d2=d2;
		//	object.LandInfos=LandInfos;
		//	object.UserInfo=users;
			var result =object;	  
			return result;
		}	
		else																//없을 때
		{
			var object = createDefaultObject(idx)							// name 만 가지고 있음
			object.status = 1 ;												// 땅 이벤트 
			object.current_place = users[idx].current_place;				// 현재 밝고 있는 땅
			object.buildState = inPlace.buildState;							// ★ 빌딩상태
			object.d1=d1;
			object.d2=d2;
		//	object.LandInfos=LandInfos;
		//	object.UserInfo=users;
			var result =object;	  

			return result;
		}
	}
	// 5 빈땅 끝

	// 6 내땅 시작
	else if(inPlace.owner == idx)											//내땅
	{
		if(inPlace.building_status == 1111 || inPlace.isAttract)			//지을건물이 없고 관광지일때
		{
			var object = createDefaultObject(idx)							// name 만 가지고 있음
			object.status = 2 ;												// 땅 이벤트 
			object.current_place = users[idx].current_place;				// 현재 밝고 있는 땅
			object.buildState = inPlace.buildState;							// ★ 빌딩상태
			object.d1=d1;
			object.d2=d2;
		//	object.LandInfos=LandInfos;
		//	object.UserInfo=users;
			var result =object;	  
			return result;
		}
		else if( !inPlace.isAttract )										//관광지가 아닐때
		{
			if(users[idx].current_money > inPlace.possibleBuilding)			//빌딩을 지을 돈이 있을 때
			{						
				var object = createDefaultObject(idx)						// name 만 가지고 있음
				object.status = 3 ;											// 땅 이벤트 
				object.current_place = users[idx].current_place;			// 현재 밝고 있는 땅
				object.buildState = inPlace.buildState;						// ★ 빌딩상태
				object.possibleBuilding = inPlace.possibleBuilding;	
				object.current_money = users[idx].current_money;				//인공지능추가
				object.d1=d1;
				object.d2=d2;
			//	object.LandInfos=LandInfos;
			//	object.UserInfo=users;
				var result =object;	  
				return result;												// ★확인 버튼만 있음됨.
			}
			else
			{
				var object = createDefaultObject(idx)						// name 만 가지고 있음
				object.status = 4 ;											// 땅 이벤트 
				object.current_place = users[idx].current_place;			// 현재 밝고 있는 땅
				object.buildState = inPlace.buildState;						// ★ 빌딩상태
				object.d1=d1;
				object.d2=d2;
				console.log("HHHHHHHHHHHHHHHHHHHHHHHH");
				console.log("HHHHHHHHHHHHHHHHHHHHHHHH");
				console.log("HHHHHHHHHHHHHHHHHHHHHHHH");
				//console.dir(object);
				console.log("HHHHHHHHHHHHHHHHHHHHHHHH");
				console.log("HHHHHHHHHHHHHHHHHHHHHHHH");
				console.log("HHHHHHHHHHHHHHHHHHHHHHHH");
				//object.LandInfos=LandInfos;
				//object.UserInfo=users;
				var result =object;	  
				return result;
			}
		}  
	}
	// 6 내땅 끝
	
	// 7 적땅 시작
	
	else if(inPlace.owner != idx && inPlace.owner<3)							//적땅
	{
		console.log("TTTTTTTTTTTT 0 TTTTTTTTTTTT");
		if(users[idx].current_money < inPlace.totallpenalty)                //벌금을 낼 여력이 없을 때
		{
			console.log("TTTTTTTTTTTT 1 TTTTTTTTTTTT");
			var object = createDefaultObject(idx)							// name 만 가지고 있음
			object.status = 5 ;												// 땅 이벤트 
			object.current_place = users[idx].current_place;				// 현재 밝고 있는 땅
			object.buildState = inPlace.buildState;							// ★ 빌딩상태
			object.owner_name = users[inPlace.owner].user_name;				// ★ 땅 보유주 이름
			object.totallpenalty = inPlace.totallpenalty;					// ★벌금 금액
			object.d1=d1;
			object.d2=d2;
			console.log("HHHHHHHHHHHHHHHHHHHHHHHH");
			console.log("HHHHHHHHHHHHHHHHHHHHHHHH");
			console.log("HHHHHHHHHHHHHHHHHHHHHHHH");
			//console.dir(object);
			console.log("HHHHHHHHHHHHHHHHHHHHHHHH");
			console.log("HHHHHHHHHHHHHHHHHHHHHHHH");
			console.log("HHHHHHHHHHHHHHHHHHHHHHHH");
			//object.LandInfos=LandInfos;
			//object.UserInfo=users;
			var result =object;								// ★ 파산
			return result;
		}
		else																//벌금을 낼 여력이 있을 때
		{
			console.log("TTTTTTTTTTTT 2 TTTTTTTTTTTT");
			users[idx].current_money = users[idx].current_money - inPlace.totallpenalty;
			users[inPlace.owner].current_money = users[inPlace.owner].current_money  + inPlace.totallpenalty; 

			if(users[idx].current_money > inPlace.totallpenalty*1.5  && ! inPlace.isAttract)      //인수할 돈이 있고 도시일때
			{
			console.log("TTTTTTTTTTTT STATUS 6 TTTTTTTTTTTT");
				var object = createDefaultObject(idx)											// name 만 가지고 있음
				object.status = 6 ;																// 땅 이벤트 
				object.current_place = users[idx].current_place;								// 현재 밝고 있는 땅
				object.totallpenalty = inPlace.totallpenalty;									// ★벌금 금액
				object.current_money = users[idx].current_money ;								// ★현재 내 돈
				object.rebuyPrice	= inPlace.totallpenalty * 1.5;								// ★인수 금액
				object.buildState = inPlace.buildState;											// ★ 빌딩상태
				object.owner_name = users[inPlace.owner].user_name;								// ★ 땅 보유주 이름
				object.d1=d1;
				object.d2=d2;

				var result =object;								
				return result;
			}
			else																				//인수할 돈이 없거나 관광지 일때 -> 어차피 관광지니까 돈만내고 꺼지라는 말
			{
			console.log("TTTTTTTTTTTT STATUS 7 TTTTTTTTTTTT");
				var object = createDefaultObject(idx)											// name 만 가지고 있음
				object.status = 7 ;																// 땅 이벤트 
				object.current_place = users[idx].current_place;								// 현재 밝고 있는 땅
				object.totallpenalty = inPlace.totallpenalty;									// ★벌금 금액
				object.current_money = users[idx].current_money ;								// ★현재 내 돈
				object.buildState = inPlace.buildState;											// ★ 빌딩상태
				object.owner_name = users[inPlace.owner].user_name;								// ★ 땅 보유주 이름
				object.d1=d1;
				object.d2=d2;
				//object.LandInfos=LandInfos;
				//object.UserInfo=users;
			//	console.dir(object);
				var result =object;								
				return result;
			}
		}
	}
	// 7 적땅 끝

	// 8 사회복지기금 접수 시작
	else if(inPlace.owner == 444)																	
	{
		var temp_money= users[idx].current_money - 10;
		
		if(temp_money > 0){
			SocialMoney = SocialMoney + 10 ; 
			users[idx].current_money = temp_money;
			var object = createDefaultObject(idx)													// name 만 가지고 있음
			object.status = 10 ;																	// 땅 이벤트 
			object.current_place = users[idx].current_place;										// 현재 밝고 있는 땅
			object.current_money = users[idx].current_money ;										// ★ 현재 내 돈
			object.buildState = inPlace.buildState;													// ★ 빌딩상태
			object.d1=d1;
			object.d2=d2;
			//object.LandInfos=LandInfos;
			//object.UserInfo=users;
			var result =object;
			return result;
		}else{
			var object = createDefaultObject(idx)													// name 만 가지고 있음
			object.status = 14 ;																	// 땅 이벤트 
			object.current_place = users[idx].current_place;										// 현재 밝고 있는 땅
			object.buildState = inPlace.buildState;													// ★ 빌딩상태
			object.totallpenalty = inPlace.totallpenalty;											// ★벌금 금액
			object.d1=d1;
			object.d2=d2;
			//object.LandInfos=LandInfos;
			//object.UserInfo=users;
			var result =object;														// ★ 파산
			return result;
		}
	}
	// 8 사회복지기금 접수 끝

	// 9 사회복지기금 회수 시작
	else if(inPlace.owner == 777)
	{		
			users[idx].current_money = users[idx].current_money + SocialMoney;
			var object = createDefaultObject(idx)													// name 만 가지고 있음
			object.status = 11 ;																	// 땅 이벤트 
			object.current_place = users[idx].current_place;										// 현재 밝고 있는 땅
			object.current_money = users[idx].current_money ;										// ★ 현재 내 돈
			object.SocialMoney = SocialMoney;														// ★ 내가 획득한 돈
			object.buildState = inPlace.buildState;													// ★ 빌딩상태
			object.d1=d1;
			object.d2=d2;
			//object.LandInfos=LandInfos;
			//object.UserInfo=users;
			SocialMoney = 0 ; 
			var result =object;
			return result;
	}
	// 9 사회복지기금 회수 끝

	// 10 스타트 지점 시작
	else if(inPlace.owner == 555)                     //스타트 지점
	{
			
			var object = createDefaultObject(idx)													// name 만 가지고 있음
			object.status = 12 ;																	// 땅 이벤트 
			object.current_place = users[idx].current_place;										// 현재 밝고 있는 땅
			object.current_money = users[idx].current_money ;										// ★ 현재 내 돈
			object.salary = 20;																		// ★ 내가 획득한 돈
			object.buildState = inPlace.buildState;													// ★ 빌딩상태
			object.d1=d1;
			object.d2=d2;
			//object.LandInfos=LandInfos;
			//object.UserInfo=users;
			//SocialMoney = 0 ; 
			var result =object;
			return result;
	}
	// 10 스타트 지점 끝
	
	// 11 무료주차장
	else if(inPlace.owner == 888)																	
	{
			var object = createDefaultObject(idx)													// name 만 가지고 있음
			object.status = 13 ;																	// 땅 이벤트 
			object.current_place = users[idx].current_place;										// 현재 밝고 있는 땅
			object.buildState = inPlace.buildState;													// ★ 빌딩상태
			object.d1=d1;
			object.d2=d2;
			//object.LandInfos=LandInfos;
			//object.UserInfo=users;
			var result =object;
			return result;
	}
	// 11 스타트 지점 끝

}//function DiceProcess(data)


// 갱신연산
function select_result_process(input_object)
{
	console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
//	console.dir(input_object);
	console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	// _0 Json.Parse
	var data = input_object;

	// _1 IDX 찾기
	var idx = data.weight;									// 사용자 IDX
	var status = data.status;								// 현재 상태
	var current_place = users[idx].current_place;			// 현재 위치
	
	// _2 리턴 객체 초기화
	var object = createDefaultObject(idx)					// 리턴 객체 생성
		object.status = 444;								// 초기값 444로 셋팅
		object.current_place_name = LandInfos[current_place].name; // [1] 현재 땅이름

	// 0 ★빈땅 살돈 있을 때							-> 빌딩처리 (샀다/안샀다)
	if(status == 0)	
	{
		if(data.buildState == 1000)
		{
			// 누가 땅을 어떻게 했다.
			object.status = 0 ;																			// [0] 현재 상태
			object.current_place = users[idx].current_place;											// [1] 현재 땅번호
			object.buildState = data.buildState;														// [2] 현재 빌딩상태
			object.totallpenalty = LandInfos[current_place].landToll									// [3] 현재 통행세
			

			// 1) 벌금 변경
			LandInfos[current_place].totallpenalty =  LandInfos[current_place].landToll;
			
			// 2) 현재 지을수 있는 빌딩의 가격 변경
			LandInfos[current_place].possibleBuilding = LandInfos[current_place].buildingPrice;
			
			// 3) 소유주 변경
			LandInfos[current_place].owner = idx;
			
			// 4) 빌딩 상태 변경 
			LandInfos[current_place].buildState = data.buildState;
			
			// 5) 사용자 객체에 땅 정보 추가
			var land=LandInfos[current_place];

			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.dir(land);
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			console.log('-----------------------------------------');
			users[idx].MyLandInfos.push(land);

			// 6) 사용자 현재 보유금액 변경 
			users[idx].current_money = users[idx].current_money -  LandInfos[current_place].landPrice;

			/* 필요 정보 
			data.buildState;		
			   필요 정보 */
					

		}

		return object;

	}

	// 1 빈땅 살돈 없을 때							-> 확인
	else if(status == 1)
	{
		// 누가 돈이 없어서 땅을 사지 못하였습니다.
		object.status = 444 ;																			// [0] 현재 상태
		object.current_place = users[idx].current_place;												// [1] 현재 땅번호
		
		
		return object;	
	}

	// 2 지을건물이 없고 관광지 일때				-> 확인
	else if(status == 2)
	{
		// 누가 지을건물이 없고 관광지이다.
		object.status = 444 ;																			// [0] 현재 상태
		object.current_place = users[idx].current_place;												// [1] 현재 땅번호

		
		return object;	
	}

	// 3 ★지을건물이 있을때							-> 빌딩처리 (어떤걸 살꺼냐?)
	else if(status == 3)
	{
		// 누가 땅을 이전에 무슨상태(1=Before 건물상태 ,2=통행료) 에서 -> 지금 어떻게(1=After 건물상태 ,2=통행료 인상) 했다.
		object.status = 3 ;																				// [0] 현재 상태
		object.current_place = users[idx].current_place;												// [1] 현재 땅번호
		object.buildState = data.buildState;															// [2] 현재 빌딩상태
//		object.totallpenalty = LandInfos[current_place].??Toll											// [3] 현재 통행세
		object.before_totallpenalty = LandInfos[current_place].landToll									// [4] 이전 통행세
		object.before_buildState = LandInfos[current_place].buildState									// [5] 이전 빌딩상태
		object.isbuilding =0 																			// [6] 건축을 했다 안했다?
		
		console.log("□□□□□ status 3 □□□□□");
		console.log("data.buildState   "+data.buildState);
		console.log("LandInfos[current_place].buildState   " + LandInfos[current_place].buildState);
		if(data.buildState != LandInfos[current_place].buildState)
		{
		object.isbuilding =1 																			// [6] 건축을 했다 안했다?
		console.log("                status   = 3  ,data.buildState  = " + data.buildState);
			// 1) 벌금 변경
			// 2) 현재 지을수 있는 빌딩의 가격 변경
			// 3) 사용자 현재 보유금액 변경 
			if(data.buildState == 1100)
			{
				console.log("□□□□□□□□□□ 1100 □□□□□□□□□□");
				LandInfos[current_place].totallpenalty	  = LandInfos[current_place].buildingToll;
				LandInfos[current_place].possibleBuilding = LandInfos[current_place].hotelPrice;
				users[idx].current_money = users[idx].current_money - LandInfos[current_place].buildingPrice;
				object.totallpenalty = LandInfos[current_place].buildingToll										// [3] 현재 통행세

			}
			else if(data.buildState == 1110)
			{
				console.log("□□□□□□□□□□ 1110 □□□□□□□□□□");
				LandInfos[current_place].totallpenalty    = LandInfos[current_place].hotelToll;
				LandInfos[current_place].possibleBuilding = LandInfos[current_place].LandMarkPrice;
				users[idx].current_money = users[idx].current_money - LandInfos[current_place].hotelPrice;
				object.totallpenalty = LandInfos[current_place].hotelToll											// [3] 현재 통행세
			}
			else if(data.buildState == 1111)
			{
				console.log("□□□□□□□□□□ 1111 □□□□□□□□□□");
				LandInfos[current_place].totallpenalty    = LandInfos[current_place].LandMarkToll;
				LandInfos[current_place].possibleBuilding = 0;
				users[idx].current_money = users[idx].current_money - LandInfos[current_place].LandMarkPrice;
				object.totallpenalty = LandInfos[current_place].LandMarkToll										// [3] 현재 통행세
			}
			
			// 3) 빌딩 상태 변경
			LandInfos[current_place].buildState = data.buildState;

			// 4) 사용자 MyLandInfos에서 기존 의 정보 제거
			removeLandInMyLandInfos(idx,current_place);

			// 5) 사용자 MYLandInfos에서 새로 갱신된 정보를 추가 한다.
			users[idx].MyLandInfos.push(LandInfos[current_place]);
			// users[idx].MyLandInfos.push(land);

			/* 필요 정보 
			data.buildState;		
			   필요 정보 */

			
						
		}
		return object;

	}
	
	// 4 지을돈이 없을때							-> 확인
	else if(status == 4)
	{
		// 누가 돈이 없어서 건물을 못올립니다.
		object.status = 444 ;																			// [0] 현재 상태
		object.current_place = users[idx].current_place;												// [1] 현재 땅번호

		return object;	
	}

	// 5 ★파산										-> 사용자 파산처리 ( 모두에게 다 알리기 )
	else if(status == 5)
	{
		users[idx].bankrupt=1;

		// 누가 파산하였습니다.
		object.status = 5 ;																				// [0] 현재 상태
		object.current_place = users[idx].current_place;												// [1] 현재 땅번호
		object.bankrupt = 1;
		

		return object;
	}

	// 6 ★도시를 인수할꺼냐? 말꺼냐?					-> ★도시인수처리 (샀다/안샀다) -> ( 도시 원 주인에게 알리기)
	else if(status == 6)
	{
			/* 필요 정보 
			data.rebuy=0;		
			   필요 정보 */

		if(data.rebuy==1)
		{
		object.status = 6 ;																				// [0] 현재 상태
		object.current_place = users[idx].current_place;												// [1] 현재 땅번호
		object.buildState = LandInfos[current_place].buildState											// [2] 현재 빌딩상태
		object.rebuy=data.rebuy																			// [3] 샀냐 안샀냐?
		

			// 1) 옛날 소유주 추출
			var oldowner=LandInfos[current_place].owner;
			object.oldowner=users[LandInfos[current_place].owner].user_name;											// [4] 이전 소유주

			// 2) 옛날 소유주 땅에서 현재 땅 번호 땅 삭제
			removeLandInMyLandInfos(oldowner,current_place);

			// 3) LandInfos에서 owner변경
			LandInfos[current_place].owner=idx;
			object.owner=users[idx].user_name;																			// [5] 현 소유주
 
			// 4) 새 소유주 MyLandInfos에 현재 땅 정보 추가
			users[idx].MyLandInfos.push(LandInfos[current_place]);

			// 5) 새 소유주 의 돈이 인수금액 만큼 까임
			users[idx].current_money = users[idx].current_money - (LandInfos[current_place].totallpenalty * 1.5);

			// 6) 옛날 소유주에게 돈 추가
			users[oldowner].current_money = users[oldowner].current_money + (LandInfos[current_place].totallpenalty * 1.5);



		}
		else if(data.rebuy==2) // 인수하고 빌딩도 건설시
		{
		object.status = 6 ;																							// [0] 현재 상태
		object.current_place = users[idx].current_place;															// [1] 현재 땅번호
		object.rebuy=data.rebuy																						// [3] 샀냐 안샀냐?
		

			// 1) 옛날 소유주 추출
			var oldowner=LandInfos[current_place].owner;
			object.oldowner=users[LandInfos[current_place].owner].user_name;											// [4] 이전 소유주

			// 2) 옛날 소유주 땅에서 현재 땅 번호 땅 삭제
			removeLandInMyLandInfos(oldowner,current_place);

			// 3) LandInfos에서 owner변경
			LandInfos[current_place].owner=idx;
			object.owner=users[idx].user_name;																			// [5] 현 소유주
 
			// 6) 새 소유주 의 돈이 인수금액 만큼 까임
			users[idx].current_money = users[idx].current_money - (LandInfos[current_place].totallpenalty * 1.5);

			// 7) 옛날 소유주에게 돈 추가
			users[oldowner].current_money = users[oldowner].current_money + (LandInfos[current_place].totallpenalty * 1.5);

			if(data.buildState == 1100)
			{
				console.log("□□□□□□□□□□ 1100 □□□□□□□□□□");
				LandInfos[current_place].totallpenalty	  = LandInfos[current_place].buildingToll;
				LandInfos[current_place].possibleBuilding = LandInfos[current_place].hotelPrice;
				users[idx].current_money = users[idx].current_money - LandInfos[current_place].buildingPrice;			// [6] 현 소유주 보유금액 변경

			}
			else if(data.buildState == 1110)
			{
				console.log("□□□□□□□□□□ 1110 □□□□□□□□□□");
				LandInfos[current_place].totallpenalty    = LandInfos[current_place].hotelToll;
				LandInfos[current_place].possibleBuilding = LandInfos[current_place].LandMarkPrice;
				users[idx].current_money = users[idx].current_money - LandInfos[current_place].hotelPrice;				// [6] 현 소유주 보유금액 변경
			}
			else if(data.buildState == 1111)
			{
				console.log("□□□□□□□□□□ 1111 □□□□□□□□□□");
				LandInfos[current_place].totallpenalty    = LandInfos[current_place].LandMarkToll;
				LandInfos[current_place].possibleBuilding = 0;
				users[idx].current_money = users[idx].current_money - LandInfos[current_place].LandMarkPrice;			// [6] 현 소유주 보유금액 변경
			}
			
			// 4) 빌딩 상태 변경
			LandInfos[current_place].buildState = data.buildState;

			object.buildState = LandInfos[current_place].buildState;														// [2] 현재 빌딩상태 오브젝트에 추가

			// 5) 새 소유주 MyLandInfos에 현재 땅 정보 추가
			users[idx].MyLandInfos.push(LandInfos[current_place]);


		}
		else		// 건물 안사고 벌금만 낸다.
		{
			object.status = 7 ;																				// [0] 현재 상태
			object.current_place = users[idx].current_place;												// [1] 현재 땅번호
			object.buildState = LandInfos[current_place].buildState											// [2] 현재 빌딩상태
			object.owner=users[LandInfos[current_place].owner].user_name;									// [4] 땅 소유주
			object.totallpenalty = LandInfos[current_place].totallpenalty									// [5] 벌금

		}
		return object;
		

	}

	// 7 ★벌금만 내고 꺼져라							-> ★확인  -> ( 벌금 받는 사람에게 알리기 )
	else if(status == 7)
	{
		object.status = 7 ;																				// [0] 현재 상태
		object.current_place = users[idx].current_place;												// [1] 현재 땅번호
		object.buildState = LandInfos[current_place].buildState											// [2] 현재 빌딩상태
		object.owner=users[LandInfos[current_place].owner].user_name;									// [4] 땅 소유주
		object.totallpenalty = LandInfos[current_place].totallpenalty									// [5] 벌금
		
		return object;
	}

	// 8 ★무인도에 고립되다							-> ★확인  
	else if(status == 8)
	{
		object.status = 8 ;																				// [0] 현재 상태
		object.current_place = users[idx].current_place;												// [1] 현재 땅번호

		return object;
	}


	// 10 ★사회복지기금 접수							-> ★확인  -> ( 모두에게 다 알리기 )
	else if(status == 10)
	{
		object.status = 10 ;																				// [0] 현재 상태
		object.current_place = users[idx].current_place;												// [1] 현재 땅번호
		object.SocialMoney = SocialMoney;																// [2] 접수된 사회복지기금

		return object;
	}

	// 11 ★사회복지기금 회수							-> ★확인  -> ( 모두에게 다 알리기 )
	else if(status == 11)
	{
		object.status = 11 ;																			// [0] 현재 상태
		object.current_place = users[idx].current_place;												// [1] 현재 땅번호
		object.SocialMoney = SocialMoney;																// [2] 접수된 사회복지기금

		return object;
	}

	// 12 스타트 지점								-> 확인  
	else if(status == 12)
	{
		object.status = 444 ;																			// [0] 현재 상태
		object.current_place = users[idx].current_place;												// [1] 현재 땅번호

		return object;

	}

	// 13 무료주차장								-> 확인  
	else if(status == 13)
	{
		object.status = 444 ;																			// [0] 현재 상태
		object.current_place = users[idx].current_place;												// [1] 현재 땅번호

		return object;
	}

	// 14 ★사회복지기금으로 파산								-> 확인  
	else if(status == 14)
	{
		object.status = 5 ;																			// [0] 현재 상태
		object.current_place = users[idx].current_place;												// [1] 현재 땅번호

		return object;
	}

	else
	{
		object.status = 444; // 땅을 살수 있는데 안사고, 건물을 올릴수 있는데 안올리고, 인수할수 있는데 안 인수하고,등등등
		return object;
	}
	
}


function broadcast_result(object){
	var object2=JSON.stringify(object);
	console.log('broadcast_result');
	for (idx in users) {

		 if(users[idx].bankrupt==0 && users[idx].user_name != object.user_name){ 
			
			io.sockets.sockets[users[idx].id].emit('broadcast_result',object2);
		}

	}//for
	var real_count=RealUsersLengh();
	console.log(real_count);
	real_count=real_count;
	if(real_count==1)
	{
		please_wait();
	}
}

function isWiner(){
	var count =0;

	for (idx in users) {
		if(users[idx].bankrupt==0){
			count++;
		}
	}

	if(count==1){ 

		for (idx in users) {
			if(users[idx].bankrupt==0){
				var object=users[idx];
				//broadcast_monitor('youwin',JSON.stringify(object));
				console.log("winner is : " +  users[idx].user_name );
				io.sockets.sockets[users[idx].id].emit('youwin',object);
				send_to_arduino('R'); // 초기화
			}
		}		

		return 1;
	}
	
	return 0;
};

function dice_result(saveObject)
{
console.dir('-------------dice_result-------------');
console.dir('-------------dice_result-------------');
console.dir('-------------dice_result-------------');
console.dir('');
	console.dir(saveObject);
console.dir('');
console.dir('-------------dice_result-------------');
console.dir('-------------dice_result-------------');
console.dir('-------------dice_result-------------');

	var object=JSON.stringify(saveObject);
	io.sockets.sockets[saveObject.id].emit('dice_result',object);
}

function broadcastProcessing(saveObject)
{
	var object=saveObject;
	broadcast_monitor('broad_cast',JSON.stringify(object));


	console.log("----------------------broadCast OBject-----------------------------");
		console.log("----------------------broadCast OBject-----------------------------");
			console.log("----------------------broadCast OBject-----------------------------");
				console.log("----------------------broadCast OBject-----------------------------");
					console.log("----------------------broadCast OBject-----------------------------");
						console.log("----------------------broadCast OBject-----------------------------");

	console.log("----------------------broadCast OBject-----------------------------");
	console.dir(object);

	broadcast_result(object);
	
}


function buildStateToLED(buildState)
{
	if(buildState == 1000)
	{
		return 1;
	}
	else if(buildState == 1100)
	{
		return 2;
	}
	else if(buildState == 1110)
	{
		return 3;
	}
}

function user_idx_to_char(idx)
{
	if(idx==0)
	{
		return 'A';
	}
	else if(idx==1)
	{
		return 'B';
	}
	else if(idx==2)
	{
		return 'C';
	}
}

var tcpGuests = [];
var chatGuests = [];
var users = [];
var botSeq = 0;
var isGameStart=0;
var my_dice_value_count_of_users=0;
var turn=0;
var saveObject; // 추가 
var isArduinoProcessing=0;



///////////////////////////////////////// SOCKET.IO ////////////////////////////////////////////////////
///////////////////////////////////////// SOCKET.IO ////////////////////////////////////////////////////
///////////////////////////////////////// SOCKET.IO ////////////////////////////////////////////////////
///////////////////////////////////////// SOCKET.IO ////////////////////////////////////////////////////
///////////////////////////////////////// SOCKET.IO ////////////////////////////////////////////////////
///////////////////////////////////////// SOCKET.IO ////////////////////////////////////////////////////
///////////////////////////////////////// SOCKET.IO ////////////////////////////////////////////////////
///////////////////////////////////////// SOCKET.IO ////////////////////////////////////////////////////
///////////////////////////////////////// SOCKET.IO ////////////////////////////////////////////////////
///////////////////////////////////////// SOCKET.IO ////////////////////////////////////////////////////
///////////////////////////////////////// SOCKET.IO ////////////////////////////////////////////////////
///////////////////////////////////////// SOCKET.IO ////////////////////////////////////////////////////


// socket.io, I choose you
// simplest chat application evar
var io = io.listen(server)
  , buffer = [];
	io.set('log level',2); 
io.on('connection', function(client){

client.on('send_myinfo',function(data){	
		console.log("monitors.length" + monitors.length);		
		if(isGameStart==0){ // game이시작 하지 않으면 처리 하라.
				my_dice_value_count_of_users=0;

				client.set('isBot',data.isBot);
					client.get('isBot',function(error,data){
				});


				if(data.isBot!=999 && data.isBot!=777){


					addUser(client.id,data.isBot,data.user_name);

					var idx;
					idx = getMatchId(client.id);
					users[idx].weight = idx ;
				

					var object = users[idx];
					var object2=JSON.stringify(object);
					client.emit('connection_success',object2);

				}else{// AI를 위한 처리 connection_success 를 위한 처리

						var user = new UserInfo();
						user.id=client.id;
						user.weight = data.isBot; // 이걸로 안드로이드 방에 못들어오게 함.
						var object = user;
						var object2=JSON.stringify(object);
						client.emit('connection_success',object2); //

				}


		}else{// 게임이 시작중이면 구라로 emit 함.

			var user = new UserInfo();
			user.id=client.id;
			user.weight = 999; // 이걸로 안드로이드 방에 못들어오게 함.
			var object = user;
			var object2=JSON.stringify(object);
			client.emit('connection_success',object2);

		}

		if(data.isBot==777)
		{
			monitors.push(client.id);
			console.log("monitors.length" + monitors.length);
		}


  });



client.on('join_room', function(data){

		user_list(); // emit user_list	

});



 client.on('add_ai', function(data){

	var AI_ID;
	for (idx in io.sockets.sockets) {
		io.sockets.sockets[idx].get('isBot',function(error,data){
			if(data==999){
				var botname="AI" + ((botSeq++));
				addUser(idx,1,botname);
				user_list();
			}
		});
	}

	user_list(); // emit user_list

  });

  client.on('remove_ai',function(data){

	removeUser(data.bot_name);
		user_list();
  });


  client.on('game_start_init',function(data){
	//send_to_arduino('1R');
	isGameStart=1;///////////////////////////////////////////////////// IS GAME START 1 ////////////////////////////////////////////////////////////////////
	LandInfoInit();
	for (idx in users) {
		io.sockets.sockets[users[idx].id].emit('game_start')
	}
  });


  client.on('ready', function(data){
	my_dice_value_count_of_users=0; ////////////////////////////////// ACK 받는 유저의 수 0 으로 초기화 ////////////////////////////////////////////////////
	for (idx in users) {
		var object = createDefaultObject(idx)
		object2=JSON.stringify(object)
		io.sockets.sockets[users[idx].id].emit('decide_first', object2)
	}
  });


  client.on('my_dice_value',function(data){

	my_dice_value_count_of_users++;
	addDiceValueToWeight(data.user_name,data.dice_value_sum);

	if(my_dice_value_count_of_users==RealUsersLengh())
	  {
		my_dice_value_count_of_users=0;
		SortUsers();
		decide_order();
	  }
  });

  client.on('please_go', function(data){
	my_dice_value_count_of_users++;

	if(my_dice_value_count_of_users==RealUsersLengh())
	  {
		my_dice_value_count_of_users=0;
		please_wait();
	  }
  });

  client.on('ok_wait',function(data){
	my_dice_value_count_of_users++;
	var RealUsersLengh_count=RealUsersLengh();

	if(my_dice_value_count_of_users==RealUsersLengh())
	  {
		my_dice_value_count_of_users=0;
		turn=isTurn(turn);
		

		console.log('---------------');
		console.dir(users);
		console.log('---------------');

		var current_turn=turn%users.length;
		users[current_turn].dice_processing=1; ///// ★★★★★★★★★★

		var object={};
		object.user = users[current_turn];
		object.weight=users[current_turn].weight;
		if(users[current_turn].isBot==1)
		{
			object.LandInfos=LandInfos;
			object.users=users
			object.myIndex = current_turn;
		}
		result = JSON.stringify(object);

		console.dir(object);

		console.dir(result);

		// ■ 웹에 턴 알림
		broadcast_monitor('turn',result);
		io.sockets.sockets[users[current_turn].id].emit('turn',result);
		

	  }		
  });

  client.on('dice', function(data){
	if(data.dice_value1 != data.dice_value2){
		turn++;
	}
	
	console.log('dice')
	console.log('dice')
	console.log('dice')
	console.log('dice')
	console.dir(data);
	console.log('dice')
	console.log('dice')
	console.log('dice')
	console.log('dice')

	// ★ 주사위 처리
	var object=DiceProcess(data);
	console.log('diceProcess End');
	// ★ SaveObject에 안드로이드로 부터 받은 주사위 객체 저장
	saveObject=object;	

	// ■ 웹에 주사위값 알림
	broadcast_monitor('dice',JSON.stringify(object));

	// ★ 아두이노 에게 전송
	var idx = data.weight;
	var h=LandInfos[users[idx].current_place].arduinoPosition; //도시
	var arduinoString="";
	idx=(idx*1)+1;//////////////////////////////////////////////////////////////////////////////%%%%%%%%%%%%%%%%%%  변경해야함
	arduinoString=arduinoString+idx+'M'+h;
	
	console.log('arduinoString : '+arduinoString);



	send_to_arduino(arduinoString);
	
});

  client.on('select_result', function(data){

	
	// ★ 갱신연산
	var object=select_result_process(data);
	
	// ★ 웹으로 결과 값 전달 

	// ★ SaveObject에 안드로이드로 부터 받은 주사위 객체 저장
	saveObject=object;

		if( object.status==444 )
		{
			console.log(object.status);
			users[((turn-1)*1)%users.length].dice_processing=0; ///// ★★★★★★★★★★
			please_wait();		
			console.log('  object.status ==  444 Not Move Arduino ' );
		}
		//        벌금꺼               무인도              복지기금접수         복지기금회수		 스타트지점
		else if( object.status==7 ||object.status==8 || object.status== 10 || object.status==11 || object.status==12)
		{
			console.log(' broad Cast 1');
			broadcastProcessing(saveObject);
		}
		//        신축
		else if(object.status==0 && object.buildState==0000)
		{
			broadcastProcessing(saveObject);
			console.log(' broad Cast 1');
		}
		
		else
		{		
			console.log(' broad Cast 3');

			// ★ 아두이노 에게 전송
			var idx = object.weight;
				idx = (idx*1)+1;/////////////////////////////////////////////////////////////////$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
			var current_place = object.current_place;
			var led_idx=buildStateToLED(object.buildState)
			var h=LandInfos[users[(idx*1)-1].current_place].arduinoPosition; //도시////////////////////////////$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

			if(object.status==0 && object.buildState==1000)
			{
				console.log(' broad Cast 4');
				var arduinoString="";
				arduinoString=arduinoString+idx+'L'+h+led_idx;
				send_to_arduino(arduinoString);				
			}
			else if(object.status==3) // 신축,업그레이드
			{
				console.log(' broad Cast 3');
				var arduinoString="";
				arduinoString=arduinoString+idx+'L'+h+led_idx;
				send_to_arduino(arduinoString);
			}
			else if(object.status==5){ // 파산
				
				console.log(' broad Cast 5');
				var arduinoString="";
				var c_idx=idx-1;
				var char_user_idx = user_idx_to_char(c_idx);
				send_to_arduino(char_user_idx);
			}
			else if(object.status==6){ // 소유주 변경

				console.log(' broad Cast 6');
				var arduinoString="";
				for(i=1; i<=led_idx; i++)
				{
				arduinoString=arduinoString+idx+'L'+h+i;
				}
				send_to_arduino(arduinoString);
			}
		}
  });

  client.on('broadcast_ok', function(data){

	console.log(" broadcast_ok ");

	my_dice_value_count_of_users++;

	//console.log(" my_dice_value_count_of_users " + my_dice_value_count_of_users + " uwer_name = " + data.user_name);
	
	var RealUsersLengh_count=RealUsersLengh();
	if(my_dice_value_count_of_users==RealUsersLengh_count-1)
	  {
		my_dice_value_count_of_users=0;

		users[((turn-1)*1)%users.length].dice_processing=0; ///// ★★★★★★★★★★
		please_wait();
	  }
  });

  

 client.on('disconnect', function(){
    var idx;
	var count=0;
	user_idx=getMatchId(client.id)

			if(typeof user_idx != "undefined"){ // Bot 이나 다른 그외의 DisConnect는 허락 안함.

				// 0 사용자 수 검출

	
				// 1 대기방
				if(isGameStart==0) 
				{
					
					console.log("");
					console.log("-----------disconnect user-----------------------");
					console.log("");
					console.log(" idx       = " + user_idx );
					console.log(" client_id =" + client.id);
					users.splice(user_idx,1);  // 삭제
					console.log("");
					console.log("-----------disconnect user-----------------------");
					console.log("");

					console.log("");
					console.log("-----------disconnect weight update--------------");
					for (idx in users) {
						if(users[idx].isBot==0 && users[idx].bankrupt==0){
							count++;
						}
						users[idx].weight=idx;
						console.log(" idx                 = " + idx );
						console.log("users[idx].id        = " + users[idx].id);
						console.log("users[idx].user_name = " + users[idx].user_name);
					}
					console.log("-----------disconnect weight update--------------");
					console.log("");
					
					// 사용자 정보 갱신
					if(count!=0){ // 사용자가 있다면
						user_list();
					}
					console.log("count=" + count);
				}



				// 2 게임중
				else	
				{
					users[user_idx].bankrupt=1; // 파산으로 플래그값 변경
					console.log("-----------disconnect user2-----------------------");
					console.log("users[user_idx].bankrupt" +users[user_idx].bankrupt);
					console.log('user_name =   ' + users[user_idx].user_name);
					console.log('users[user_idx].dice_processing =   ' + users[user_idx].dice_processing);
					// 주사위 프로세싱 중이였다면, 강제로 Please_Wait 발생
					for (idx in users) {
						if(users[idx].isBot==0 && users[idx].bankrupt==0){
							count++;
							console.log("disconnect2 count=="+count);
						}
					}
					
					if(users[user_idx].dice_processing == 1 ) 
					{
						please_wait();
					}



				

					//console.log("users[user_idx].dice_processing" + users[user_idx].dice_processing);
					//console.log("user_idx" + user_idx );
					//console.log("count=" + count);
					console.log("-----------disconnect user2-----------------------");
				}


				




				// 3 초기화
				if(count==0){ 
					broadcast_monitor('all_clear',0);
					send_to_arduino('R');
					isArduinoProcessing=0;
					my_dice_value_count_of_users=0;
					users=[];
					isGameStart=0;
					console.log('%%%%%%%%%%%%%%% All Clear %%%%%%%%%%%%%%%%%%%%');
					botSeq=0;
					turn=0;
					LandInfos = [];
					send_to_arduino('R');
				}


			
			}//if(typeof idx != "undefined"){
			// 모니터 삭제
			else
			{
				removeGetMatchMonitorId(client.id);
			}
	


  });

  client.on('test', function(data){
	tests.push(data);
	client.emit('response_test',tests);
  });

  client.on('error', function(err) {
	console.dir(err);
 });

  client.on('send_to_arduino', function(send_data){ 
	console.log("     [4] Send to arduino    : "+send_data);
	
    send_to_arduino(send_data)
  });

});


















//////////////////////////////////// 아두이노 통신 관련 함수 ////////////////////////////////////
function send_to_arduino(send_data){
	

	if(typeof(ARDUINO)!="undefined")
	{
		isArduinoProcessing=1;
		for(i=0; i<=3; i++){
			ARDUINO.write(send_data);
		}
		console.log('send_to_arduino : ' + send_data);
	}
	else
	{
		console.log('     [Error] Arduino is undefined     ');

	}

}



//tcp socket server
var tcpServer = net.createServer(function (tcp) {
	console.log("     [2] TCP Server Start    ");
});

tcpServer.on('connection',function(tcp){
	console.log("     [3] Arduino Connect    ");
		for(idx in io.sockets.sockets)
		{
			io.sockets.sockets[idx].emit('conn');
		}
	

	ARDUINO=tcp;
	
	tcp.on('data',function(data){

		if(isArduinoProcessing==1 && isGameStart==1)
		{
			console.log("     [5] Recive From Arduino  :  "+data.toString('ascii',0,data.length));
			var recvData=data.toString('ascii',0,data.length);
				recvData=recvData.split('');
			// 주사위 값으로 말 이동 후 라면 -> dice_result
			if(recvData[0]=='M')
			{
				isArduinoProcessing=0;
				dice_result(saveObject);
			}
			// select_result 후라면  -> broadcast
			else if(recvData[0]=='L')
			{
				isArduinoProcessing=0;
				broadcastProcessing(saveObject);
			}
		}
	});

	tcp.on('error', function(err){
		console.log('     [Error] Arduino Reconnect     ');
		console.log(err);
	});
	tcp.on('close',function(data){
		console.log('     [Error] Arduino Disconnect     ');
	});	

});
tcpServer.listen(9002);