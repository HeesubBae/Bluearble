//var memory = require('memory/memory.js');
var io = require('socket.io/node_modules/socket.io-client');
var AI = io.connect('http://192.168.67.141:9001'); // io.connect auto-detects host

var SOCKETID="";
var botInfo;
var passed_turn = 0;
var g_attitude = 0;			//1. agressive   -1. defensive
const totalmoney = 1000;
botInfo={};

var tenChance = [];

function selectionSort()
{
   var minIndex = 0;
   for(var i=0;i<tenChance.length-1;i++)
   {
      minIndex = i;
      for(var j=i;j<tenChance.length;j++)
      {
         if(tenChance[minIndex].score>tenChance[j].score)
         {
            minIndex = j;
         }
      }
      if(minIndex != i)
      {
        var temp=tenChance[i];
		tenChance[i]=tenChance[minIndex]
		tenChance[minIndex]=temp;
      }
   }
}

function analyzeLand(data)
{
	var score = 10;
	var myIndex = data.myIndex;
	var current_money = data.user.current_money;
	var destination = 0;
	var landInfos = data.LandInfos;
	var current_place = data.user.current_place;

	var dice1;
	var dice2;

	dice1 = Math.floor((Math.random() * 6) + 1);
	dice2 = Math.floor((Math.random() * 6) + 1);
	destination = (dice1 + dice2 + current_place)%24;
	var landInfo = landInfos[destination];
	var owner = landInfo.owner;
	var isAttract = landInfo.isAttract;
	if(owner == 444)	//��ȸ��������
	{
		score = score - 3;
	}
	else if(owner == 666)	//���ε�
	{
		if(g_attitude > 0)
		{
			score = score - 4;
		}
		else
		{
			score = score + 4;
		}
	}
	else if(owner == -1)	//��
	{	
		if(isAttract == 0)
		{
		var landPrice = landInfo.landPrice;
		score = score + (10-Math.floor((landPrice/current_money)*10));
		}
		else
		{
			score = score + 10;
		}
	}
	else if(myIndex == owner)	//����
	{
		var possibleBuilding = landInfo.possibleBuilding;
		if(g_attitude > 0)
		{
		score = score + (10-Math.floor((possibleBuilding/current_money)*10));
		}
		else
		{
		score = score + Math.floor((possibleBuilding/current_money)*10);
		}
	}
	else if(myIndex != owner && owner<3) // ����
	{
		if(data.users[owner].isBot == 0) //���� ���� �ƴҶ�
		{
			if(isAttract == 1)			//�������� ������ ����ȵ�
			{
				score = score -10;
			}
			else						//�� �� �ݾ��� ���� �ۼ�Ʈ��ŭ ���� ����
			{
				score = score - Math.floor((possibleBuilding/current_money)*10);
			}
		}
		else							//���� ���� ��
		{
			if(current_money >=(data.users[owner].current_money*2)) //���� ������ ������ �ݹۿ� ���� ��
			{
				score = score + 3;
			}
			else													//�ƴҶ�
			{
				score = score - Math.floor((possibleBuilding/current_money)*10);
			}
		}
	}
	
	//console.log("socroe is what  " + score);
	var result = {};
	result.score = score;
	result.dice1 = dice1;
	result.dice2 = dice2;
	return result
}
function Cheating(data)
{
	var LuckyorUnlucky = data.LuckyorUnlucky;
	var result = {};
	var sumdiceValue;
	
	for(var i=0;i<10;i++) //���� ������ �׶� ������ �������� �迭�� ����
		{
			var result = analyzeLand(data);
			tenChance.push(result);
		}
		selectionSort();						//������
		
	if(LuckyorUnlucky == 1) //ġ���� �����ϰ�
	{
		result = tenChance[tenChance.length-1]; //���� ������ �������� ����� ����
	}	
	else if(LuckyorUnlucky == 2)				// �����´�� ����.
	{
		var dice1;
		var dice2;

		dice1 = Math.floor((Math.random() * 6) + 1);
		dice2 = Math.floor((Math.random() * 6) + 1);
		sumdiceValue = dice1 + dice2;
		result.dice1 = dice1;
		result.dice2 = dice2;
		result.sumdiceValue = sumdiceValue;
	}
	else										
	{
		result = tenChance[0];			//mistake ��̸� ���� �־��� ���� ����� ����
	}
	return result
}

function ChangeAttitude(data)
{
	var current_moeny = data.user.current_money;
	var my_lands = data.user.MyLandInfos.length;
	console.log("0curmoney is  " +current_moeny);
	var users = data.users;
	var otherLand = 0;
	var attitude = 0;
	for(idx in users) //�ٸ� �������� �� ������ ����
	{
		otherLand = otherLand + users[idx].MyLandInfos.length;
	}
	attitude +=current_moeny > totalmoney*0.7 ? 2:-2;	//���� 70% �̻��϶� ȣ���� �����϶� �����
	console.log("1attitude is   " + attitude);
	attitude +=passed_turn < 25 ? 1:-1;					//������ �Ĺ��� �� ȣ���� �ʹ��϶� �����
	console.log("1attitude is   " + attitude);
	attitude +=otherLand < 18 ? 1:-1;					//�ٸ� �������� ��κ��� ���� ������ ���� ������ ȣ���� �ƴҶ� �����
	console.log("1attitude is   " + attitude);
	attitude +=my_lands < 10 ? 1:-1;					//���� ���� 10�����Ϸ� ���� �� ȣ���� �̻��� �� �����
	return attitude
}




AI.on('connect', function () {
	var object = {'user_name':'AI','isBot':999};
	JSON.stringify(object);
	//LandInfoInit();
	AI.emit('send_myinfo',object);
	console.log('AI connect');
});


AI.on('connection_success',function(data){

	var obj=JSON.parse(data);	
	botInfo.id = obj.id;
	botInfo.isBot   = 1;
});



AI.on('decide_first', function(data){

	var obj = JSON.parse(data);
	botInfo.user_name= obj.user_name;
	var dice1;
	var dice2;

	dice1 = Math.floor((Math.random() * 6) + 1);
	dice2 = Math.floor((Math.random() * 6) + 1);

	botInfo.dice_value1 = dice1;
	botInfo.dice_value2 = dice2;
	botInfo.dice_value_sum = dice1 + dice2;
	JSON.stringify(botInfo);

	AI.emit('my_dice_value',botInfo);
});

AI.on('decide_order',function(data)
{
	AI.emit('please_go');
});

AI.on('please_wait',function(data)
{
	AI.emit('ok_wait');
});


AI.on('turn',function(data)
{
	passed_turn = passed_turn + 1;
	var innerConflict = 0;
	
	var obj = JSON.parse(data);
	botInfo.user_name= obj.user.user_name;
	g_attitude = ChangeAttitude(obj);
	botInfo.weight = obj.weight;
	// --ġ���� ���� ������ �������� ����
	innerConflict= Math.floor((Math.random() * 10) + 1);
	if(innerConflict<=6)
	{
		obj.LuckyorUnlucky = 1;
		var result = Cheating(obj);
	}
	else if(innerConflict<=9)
	{
		obj.LuckyorUnlucky = 2;
		var result = Cheating(obj);
	}
	else
	{
		obj.LuckyorUnlucky = 3;
		var result = Cheating(obj);
	}
	botInfo.dice_value1 = result.dice1;
	botInfo.dice_value2 = result.dice2;
	botInfo.dice_value_sum = result.dice1 + result.dice2;
	JSON.stringify(botInfo);
	tenChance = [];
	AI.emit('dice',botInfo);
});


AI.on('dice_result',function(data) //AI
{
	console.dir(data);
	//var obj = data;
	var obj = JSON.parse(data);
	var status = obj.status;		
	var current_money = obj.current_money;
	botInfo.user_name= obj.user_name;
	botInfo.status = status;
	
	console.log("2status  " + status);
	// 0 �� �쵷 ���� ��							-> ����ó�� (���/�Ȼ��)
	if(status == 0)	
	{
		var possibleBuilding = obj.possibleBuilding;
		console.log("3attitude is   " + g_attitude + "possibleBuilding   " + possibleBuilding);
		if(g_attitude > 0)							//ȣ���� �µ��� ��
		{
			if(current_money*0.7>possibleBuilding)//���絷�� 70�ۼ�Ʈ �����ϰ�� ������ ����
			{
			botInfo.buildState = 1000;
			}
			else
			botInfo.buildState = 0000;
		}
		else										//����� �µ��� ��
		{
			if(current_money/4>possibleBuilding)	//���絷�� 4����1 �����ϰ�� ������ ����
			{
			botInfo.buildState = 1000;
			}
			else
			botInfo.buildState = 0000;
		}
	}

	// 1 �� �쵷 ���� ��							-> Ȯ��
	else if(status == 1)
	{
	}

	// 2 �����ǹ��� ���� ������ �϶�				-> Ȯ��
	else if(status == 2)
	{
	}
	// 3 �����ǹ��� ������							-> ����ó�� (��� �첨��?)
	else if(status == 3)
	{
		var buildState = obj.buildState;
		var possibleBuilding = obj.possibleBuilding;
		console.log("4attitude is   " + g_attitude + "possibleBuilding   " + possibleBuilding);
		if(g_attitude > 0)						  //ȣ���� �µ��� ��
		{
			if(current_money*0.7>possibleBuilding)//���絷�� 70�ۼ�Ʈ �����ϰ�� ������ ����
			{
				console.log("I'll buy it!  " + g_attitude);
				botInfo.isbuilding = 1;
				if(buildState == 1000)
				{
					botInfo.buildState = 1100;
				}
				else if(buildState == 1100)
				{
					botInfo.buildState = 1110;
				}
				else if(buildState == 1110)
				{
					botInfo.buildState = 1110;
				}
			}
			else
			{
				botInfo.isbuilding = 0;
				botInfo.buildState = buildState;
			}
		}
		else									//����� �µ��� ��
		{
			if(current_money/4>possibleBuilding)//���絷�� 4����1 �����ϰ�� ������ ����
			{
				botInfo.isbuilding = 1;
				console.log("I'll buy it!  " + g_attitude);
				if(buildState == 1000)
				{
					botInfo.buildState = 1100;
				}
				else if(buildState == 1100)
				{
					botInfo.buildState = 1110;
				}
				else if(buildState == 1110)
				{
					botInfo.buildState = 1110;
				}
			}
			else
			{
				botInfo.isbuilding = 0;
				botInfo.buildState = buildState;
			}
		}
	}
	// 4 �������� ������							-> Ȯ��
	else if(status == 4)
	{
	}
	// 5 �Ļ�										-> ����� �Ļ�ó�� ( ��ο��� �� �˸��� )
	else if(status == 5)
	{
	}
	// 6 ���ø� �μ��Ҳ���? ������?					-> �ڵ����μ�ó�� (���/�Ȼ��) -> ( ���� �� ���ο��� �˸���)
	else if(status == 6)
	{
		var rebuyPrice = obj.rebuyPrice;
		console.log("5attitude is   " + g_attitude + "rebuyPrice   " + rebuyPrice);
		if(g_attitude > 0)					//ȣ���� �µ��� ��
		{
			if(current_money*0.7>rebuyPrice)//���絷�� 70�ۼ�Ʈ �����ϰ�� ������ ����
			{
			botInfo.rebuy = 1;
			console.log("6I'll buy it!  " + g_attitude);
			}
			else
			botInfo.rebuy = 0;
		}
		else								//����� �µ��� ��
		{
			if(current_money/4>rebuyPrice)	//���絷�� 4����1 �����ϰ�� ������ ����
			{
			botInfo.rebuy = 1;
			console.log("6I'll buy it!  " + g_attitude);
			}
			else
			botInfo.rebuy = 0;
		}
	}

	// 7 ���ݸ� ���� ������							-> ��Ȯ��  -> ( ���� �޴� ������� �˸��� )
	else if(status == 7)
	{
	}
	// 8 ���ε��� ���Ǵ�							-> ��Ȯ��  
	else if(status == 8)
	{
	}
	// 10 ��ȸ������� ����							-> ��Ȯ��  -> ( ��ο��� �� �˸��� )
	else if(status == 10)
	{
	}
	// 11 ��ȸ������� ȸ��							-> ��Ȯ��  -> ( ��ο��� �� �˸��� )
	else if(status == 11)
	{
	}
	// 12 ��ŸƮ ����								-> Ȯ��  
	else if(status == 12)
	{
	}
	// 13 ����������								-> Ȯ��  
	else if(status == 11)
	{
	}
	JSON.stringify(botInfo);
	AI.emit('select_result',botInfo);
});

AI.on('broadcast_result',function(data) //AI
{
	AI.emit('broadcast_ok');
});
