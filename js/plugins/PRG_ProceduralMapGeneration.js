//================================================================
//PRG_Procedural Map Generation
/*
 * 
 * @plugindesc <PRG_Procedural Map Generation>
 * @version 0.01
 * 
 */

var Imported = Imported || {};
Imported.PRG_ProceduralMapGeneration = true;

Alias_Game_Map_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function () {
    Alias_Game_Map_initialize.call(this);
}

Game_Map.prototype.PRGMapGenerate = function (scale, maxRooms) {
    //커먼이벤트로 함수 불러오면 던전 생성 알고리즘 시작. maxRooms는 7가지 고정방을 뺀 나머지 방의 최대갯수.
    //방의 종류는 시작, 골, 상자, 상점, 이벤트, 보스 6가지.나머지는 몹방 or 함정방
    //맵의 크기는 5x5 ~12x12까지. 
    //방의 위치 : 5x5 기준 상자 2, 상점 3, 이벤트 4, 보스 5
    //
    //


    $gameSystem._prgMinimapEnable = false;

    var roomIds = /<roomIds>([\s\S]*)<\/roomIds>/i.exec($dataMap.note);
    if (roomIds && roomIds[1].trim() !== "") {
        roomIds = roomIds[1].trim().split('\n');
    }
    var mapData = {
        start: null,
        goal: null,
        shop: null,
		chest: null,
		chest2: null,
		event: null,
		event2: null,
		enemys: [],
		enemys2: []
    };

    this.getDataAndGenerate(roomIds, scale, maxRooms, function () {
        for (var i = 0; i < roomIds.length; i++) {
            var roomName = roomIds[i].split(':')[0];
            var mapIdOrigin = roomIds[i].split(':')[1];

            var variableName = '$Map%1'.format(mapIdOrigin.padZero(3));
            if (window[variableName] === undefined || window[variableName] === null) return;

            var passData = /<pass>([\s\S]*)<\/pass>/i.exec(window[variableName].note);
            var passStruct = {
                t: {x:0,y:0},
                b: { x: 0, y: 0 },
                l: { x: 0, y: 0 },
                r: { x: 0, y: 0 }
            }
            if (passData && passData[1].trim() !== "") {
                passData = passData[1].trim().split('\n');
                for (var j = 0; j < passData.length; j++) {
                    var dir = passData[j].split(':')[0];
                    if (dir == 't') {
                        passStruct[passData[j].split(':')[0]].x = parseInt(passData[j].split(':')[1]);
                        passStruct[passData[j].split(':')[0]].y = 2;
                    }
                    else if (dir == 'b') {
                        passStruct[passData[j].split(':')[0]].x = parseInt(passData[j].split(':')[1]);
                        passStruct[passData[j].split(':')[0]].y = window[variableName].height -3;
                    }
                    else if (dir == 'l') {
                        passStruct[passData[j].split(':')[0]].x = 2;
                        passStruct[passData[j].split(':')[0]].y = parseInt(passData[j].split(':')[1]);
                    }
                    else if (dir == 'r') {
                        passStruct[passData[j].split(':')[0]].x = window[variableName].width - 3;
                        passStruct[passData[j].split(':')[0]].y = parseInt(passData[j].split(':')[1]);
                    }
                }
            }
            var roomData = {
                mapId: mapIdOrigin,
				pass: passStruct,
				isUsed: false
            }

            if (roomName.substring(0, 5) == 'enemy') {
				if (!mapData[roomName]) {
					if (mapData.enemys.length < 10) {
						mapData.enemys.push(roomData);
					} else mapData.enemys2.push(roomData);
                }
            }
            mapData[roomName] = roomData;
        }


        //var mapData = JsonEx.makeDeepCopy(data);
        if (mapData) {
            $gameMap.makePRGMap(scale, mapData, maxRooms);
        }
        //만든후에는 맵 데이터를 지운다

        for (var i = 0; i < roomIds.length; i++) {
            var mapId = roomIds[i].split(':')[1];
            var variableName = '$Map%1'.format(mapId.padZero(3));
            window[variableName] = undefined;
        }
    });
}

Game_Map.prototype.getDataAndGenerate = function (roomIds, scale, maxRooms, callback) {
    for (var i = 0; i < roomIds.length; i++) {
        var mapId = roomIds[i].split(':')[1];

        var variableName = '$Map%1'.format(mapId.padZero(3));
        var filename = 'data/Map%1.json'.format(mapId.padZero(3));

        var onLoad = function (xhr, filePath, name) {
            /*if (xhr.status < 400) {
                window[name] = JSON.parse(xhr.responseText); // 스크립트 에러의 주범. 0번째 토큰이 깨져있어서 출력이 안되었던 것. 왜 깨졌을까 - 알만툴 버그때문. 파일이 깨졌을 때 나는 오류
                DataManager.onLoad(window[name]);

                callback();
            }*/
            if (xhr.status < 400) try {
                window[name] = JSON.parse(xhr.responseText); // 스크립트 에러의 주범. 0번째 토큰이 깨져있어서 출력이 안되었던 것. 왜 깨졌을까 - 알만툴 버그때문. 파일이 깨졌을 때 나는 오류
                DataManager.onLoad(window[name]);

                callback();
            } catch (error) {
                return { xhr: xhr, name: name };
            }
        };
        if (window[variableName] === undefined || window[variableName] === null) {
            MVCommons.ajaxLoadFileAsync(filename, undefined, onLoad);
        } else {
            callback();
        }
    }
};

Game_Map.prototype.makePRGMap = function (scale, mapData, maxRooms) {
    this._prgMapGenerator = new PRG_MapGenerator(scale, maxRooms);
    this._prgMapGenerator.setup(scale, mapData);
}

Game_Map.prototype.currentRoom = function () {
    var crntCoord = this._prgMapGenerator._currentCoord;
    return this._prgMapGenerator._roomCoords[crntCoord.x][crntCoord.y];
}

Game_Map.prototype.proceedNextRoom = function () {
    var room = this.currentRoom();
    var player = $gamePlayer;
    if (player.y < 2) { //t
        var pass = this.currentRoom().t.pass;
        player.reserveTransfer(Number(room.t.id), pass.b.x, pass.b.y, null, 0);
        this._prgMapGenerator._currentCoord.y++;
        this._prgMapGenerator._lastPassSwitch = 104;
    }
    else if (player.x < 2) { //l
        var pass = this.currentRoom().l.pass;
        player.reserveTransfer(Number(room.l.id), pass.r.x, pass.r.y, null, 0);
        this._prgMapGenerator._currentCoord.x--;
        this._prgMapGenerator._lastPassSwitch = 103;
    }
    else if (player.x > $gameMap.width() - 3) { //r
        var pass = this.currentRoom().r.pass;
        player.reserveTransfer(Number(room.r.id), pass.l.x, pass.l.y, null, 0);
        this._prgMapGenerator._currentCoord.x++;
        this._prgMapGenerator._lastPassSwitch = 102;
    }
    else if (player.y > $gameMap.height() - 3) { //b
        var pass = this.currentRoom().b.pass;
        player.reserveTransfer(Number(room.b.id), pass.t.x, pass.t.y, null, 0);
        this._prgMapGenerator._currentCoord.y--;
        this._prgMapGenerator._lastPassSwitch = 101;
    }

    if (this.currentRoom().explored == 'clear') {
        for (var i = 101; i < 105; i++) $gameSwitches._data[i] = false;
        var room = $gameMap.currentRoom();
        if (room.t) $gameSwitches._data[101] = true;
        if (room.l) $gameSwitches._data[102] = true;
        if (room.r) $gameSwitches._data[103] = true;
        if (room.b) $gameSwitches._data[104] = true;
    } else {
        for (var i = 101; i < 105; i++) {
            $gameSwitches._data[i] = false;
        }
    }

    this.currentRoom().explored = 'clear';
    if (this.currentRoom().t && !this.currentRoom().t.explored) {
        this.currentRoom().t.explored = 'watched';
    }
    if (this.currentRoom().b && !this.currentRoom().b.explored) {
        this.currentRoom().b.explored = 'watched';
    }
    if (this.currentRoom().l && !this.currentRoom().l.explored) {
        this.currentRoom().l.explored = 'watched';
    }
    if (this.currentRoom().r && !this.currentRoom().r.explored) {
        this.currentRoom().r.explored = 'watched';
    }
}

//-----------------------------
//PRG_MapGenerator
//-----------------------------

function PRG_MapGenerator(scale, maxRooms) {
    this.initialize(scale, maxRooms);
}

PRG_MapGenerator.prototype.initialize = function (scale, maxRooms) {
    this._scale = scale || 5;
    this._rooms = []; // rooms는 n x n 배열
    this._roomCoords = new Array(this._scale);
    for (var i = 0; i < this._scale; i++) {
        this._roomCoords[i] = new Array(this._scale);
    }
    this._startRoom = null;
    this._bossRoom = null;
    this._goalRoom = null;
	this._chestRoom = null;
	this._chestRoom2 = null;
	this._eventRoom = null;
	this._eventRoom2 = null;
    this._shopRoom = null;
    this._passToStart = [];
    this._currentCoord = { x: 0, y: 0 };
    this._currentEnemyRooms = 0;
    this._lastEnemyRoomNumber = 9;
    this._currentTrapTurn = Math.floor(Math.random() * maxRooms - 3) + 3;
    this._lastPassSwitch = null;
    this._maxRooms = maxRooms;
    this._minimapOffsetX = 0;
	this._minimapOffsetY = 0;
}

PRG_MapGenerator.prototype.setup = function (scale, mapData) {
    this._mapData = mapData;

    //dist 큰순서대로 해야함. 맵사이즈 5기준 dist 5는 2개, 4는 4개, 3은 6개
    //최소 에너미 방 갯수는 10개
    this.makeStartRoom();
    //console.log("make chest rare dist 5") //예정

    var turn = 0;
    turn = scale - Math.floor(Math.random() * 3);
    if (turn < 5) turn = 5;
    this._bossRoom = this.makeRoomAndPass(turn, 'boss');

    turn = Math.ceil(scale / 2) + Math.floor(Math.random() * (scale / 2 - 1))
	this._eventRoom = this.makeRoomAndPass(turn, 'event');
	if (this._maxRooms > 5) {
		turn = Math.ceil(scale / 2) + Math.floor(Math.random() * (scale / 2 - 1))
		this._eventRoom2 = this.makeRoomAndPass(turn, 'event2')
	}
    
    turn = Math.ceil(scale / 2) + Math.floor(Math.random() * (scale / 2 - 2))
	if (this._maxRooms > 5 && this._maxRooms < 17) this._shopRoom = this.makeRoomAndPass(turn, 'shop');

    turn = Math.floor(scale / 3) + Math.floor(Math.random() * (scale / 4)) + 1;
	this._chestRoom = this.makeRoomAndPass(turn, 'chest');
    if (this._maxRooms > 8 && $gameVariables._data[3] != 1) {
		turn = Math.floor(scale / 3) + Math.floor(Math.random() * (scale / 4)) + 1;
		this._chestRoom2 = this.makeRoomAndPass(turn - 1, 'chest2');
	}

	var makePassesSuccess = this.makePassesToRoom();
	if (!makePassesSuccess) {
		$gameMap.PRGMapGenerate(scale, this._maxRooms);
		return;
	}
    this.makeGoalRoom();

    if (!this._goalRoom) {
        $gameMap.PRGMapGenerate(scale, this._maxRooms);
        return false;
    }


    //시작방 주면 방 탐험
    this._startRoom.explored = 'clear';
    if (this._startRoom.t && !this._startRoom.t.explored) {
        this._startRoom.t.explored = 'watched';
    }
    if (this._startRoom.b && !this._startRoom.b.explored) {
        this._startRoom.b.explored = 'watched';
    }
    if (this._startRoom.l && !this._startRoom.l.explored) {
        this._startRoom.l.explored = 'watched';
    }
    if (this._startRoom.r && !this._startRoom.r.explored) {
        this._startRoom.r.explored = 'watched';
    }

    //미니맵의 x,y offset 구하기
    var rmin = scale;
    var lmin = scale;
    var bmin = scale;
    var tmin = scale;
    var temp = 0;

    //rmin
    for (var i = 0; i < scale; i++) {
        for (var j = scale - 1; j > -1; j--) {
            if (!this._roomCoords[j][i]) {
                temp++;
            } else break;
        }
        if (temp < rmin) rmin = temp;
        temp = 0;
    }

    //lmin
    for (var i = 0; i < scale; i++) {
        for (var j = 0; j < scale; j++) {
            if (!this._roomCoords[j][i]) {
                temp++;
            } else break;
        }
        if (temp < lmin) lmin = temp;
        temp = 0;
    }

    //bmin
    for (var i = 0; i < scale; i++) {
        for (var j = scale-1; j > -1; j--) {
            if (!this._roomCoords[i][j]) {
                temp++;
            } else break;
        }
        if (temp < bmin) bmin = temp;
        temp = 0;
    }

    //tmin
    for (var i = 0; i < scale; i++) {
        for (var j = 0; j < scale; j++) {
            if (!this._roomCoords[i][j]) {
                temp++;
            } else break;
        }
        if (temp < tmin) tmin = temp;
        temp = 0;
    }

    this._minimapOffsetX = (rmin - lmin) / 2;
    this._minimapOffsetY = (bmin - tmin) / 2;

	//컨텐츠 생성
	PRG.setupContents();

    this.printMap();
    $gameSystem._prgMapGenerated = true;

}



PRG_MapGenerator.prototype.makeStartRoom = function () {
    var x = Math.floor(Math.random() * (this._scale -2) + 1);
    var y = Math.floor(Math.random() * (this._scale -2)+1);
    while (x == Math.floor(this._scale / 2) || y == Math.floor(this._scale / 2)) {
        var x = Math.floor(Math.random() * (this._scale -2)+1);
        var y = Math.floor(Math.random() * (this._scale -2)+1);
    }
    this._currentCoord.x = x;
    this._currentCoord.y = y;
    this._startRoom = this.makeRoom(x, y, 'start')
}

PRG_MapGenerator.prototype.makeRoomAndPass = function (dist, name) {
    var x = Math.floor(Math.random() * (this._scale));
    var y = Math.floor(Math.random() * (this._scale));
    var count = 0;
    while (true) {//this.distToStart(x, y) < dist || this._roomCoords[x][y] != null) {  
        if (count > 2000) {
            dist--;
            count = 0;
            if (dist < 1) {
                break;
            }
        }
        var x = Math.floor(Math.random() * (this._scale));
        var y = Math.floor(Math.random() * (this._scale));
        var distToStart = this.distToStart(x, y);
        count++;
        if (distToStart < dist || distToStart > dist + 1) continue;
        if (this._roomCoords[x][y] != null) continue;
        if (x < this._scale-1 && this._roomCoords[x + 1][y] != null) continue;
        if (x > 0 && this._roomCoords[x - 1][y] != null) continue;
        if (y < this._scale-1 && this._roomCoords[x][y + 1] != null) continue;
        if (y > 0 && this._roomCoords[x][y - 1] != null) continue;
        break;
    }
    var room = this.makeRoom(x, y, name);
    this.makePassToStart(room)
    return room;
}

PRG_MapGenerator.prototype.makeGoalRoom = function () {
    var x = this._bossRoom.x;
    var y = this._bossRoom.y;
    if (this._bossRoom.x < 4 && !this._roomCoords[this._bossRoom.x + 1][this._bossRoom.y]) { //r
        var currentRoom = this._roomCoords[x][y];
        x = this._bossRoom.x + 1;
        y = this._bossRoom.y;
        this._goalRoom = this.makeRoom(x, y, 'goal')
        var targetRoom = this._roomCoords[x][y];
        currentRoom['r'] = targetRoom;
        targetRoom['l'] = currentRoom;
    } else if (this._bossRoom.x > 0 && !this._roomCoords[this._bossRoom.x - 1][this._bossRoom.y]) {//l
        var currentRoom = this._roomCoords[x][y];
        x = this._bossRoom.x - 1;
        y = this._bossRoom.y;
        this._goalRoom = this.makeRoom(x, y, 'goal')
        var targetRoom = this._roomCoords[x][y];
        currentRoom['l'] = targetRoom;
        targetRoom['r'] = currentRoom;
    } else if (this._bossRoom.y < 4 && !this._roomCoords[this._bossRoom.x][this._bossRoom.y + 1]) {//t
        var currentRoom = this._roomCoords[x][y];
        x = this._bossRoom.x;
        y = this._bossRoom.y + 1;
        this._goalRoom = this.makeRoom(x, y, 'goal')
        var targetRoom = this._roomCoords[x][y];
        currentRoom['t'] = targetRoom;
        targetRoom['b'] = currentRoom;
    } else if (this._bossRoom.y > 0 && !this._roomCoords[this._bossRoom.x][this._bossRoom.y - 1]) {//b
        var currentRoom = this._roomCoords[x][y];
        x = this._bossRoom.x;
        y = this._bossRoom.y - 1;
        this._goalRoom = this.makeRoom(x, y, 'goal')
        var targetRoom = this._roomCoords[x][y];
        currentRoom['b'] = targetRoom;
        targetRoom['t'] = currentRoom;
    }
}

PRG_MapGenerator.prototype.makeRoom = function (x, y, name) {
	var mapData = null;
	if (name == 'enemy') {
        this._currentEnemyRooms++;
        /*if (this._currentEnemyRooms == this._currentTrapTurn) {
            //여기에 트랩룸 제작 만들것. 트랩룸 번호는 게임 셋팅중 변수 109번에 지정된다. 해당 맵의 데이터를 불러오는것도 맨 윗줄에 추가해야함
        } else */if (this._currentEnemyRooms > 10) {
			//var count = 0;
			//while (true) {
			//    if (count > 1000) {
			//        console.log("error : no mapData in enemyroom.", this._mapData.enemys2)
			//    }
			//    var rand = Math.floor(Math.random() * (this._mapData.enemys.length - 1));
			//    if (rand != this._lastEnemyRoomNumber) {
			//        mapData = this._mapData.enemys[rand];
			//        this._lastEnemyRoomNumber = rand;
			//        break;
			//    }
			//    count++;
			//}
			if (this._currentEnemyRooms <= 20 && this._mapData.enemys2.length > 0) mapData = this._mapData.enemys2[this._currentEnemyRooms - 11]
			else {
				var rand = Math.floor(Math.random() * (this._mapData.enemys.length - 1));
				if (rand != this._lastEnemyRoomNumber) {
					mapData = this._mapData.enemys[rand];
					this._lastEnemyRoomNumber = rand;
				}
			}
		} else {
			if (this._currentEnemyRooms < 6) {
				var count = 0;
				while (count < 2000) {
					var randNum = Math.floor(Math.random() * 5);
					mapData = this._mapData.enemys[randNum];
					if (!mapData.isUsed) {
						mapData.isUsed = true;
						break;
					} else count++;
				}
			} else {
				var count = 0;
				while (count < 2000) {
					var randNum = Math.floor(Math.random() * 5 + 5);
					mapData = this._mapData.enemys[randNum];
					if (!mapData.isUsed) {
						mapData.isUsed = true;
						break;
					} else count++;
				}
			}
		}
    } else mapData = this._mapData[name];
    var room = {
        x: x,   
        y: y,
        t: null,
        b: null,
        l: null,
        r: null,
        name: name,
        id: mapData.mapId,
        pass: mapData.pass,
        explored: false
    }
    this._roomCoords[x][y] = room;
    this._rooms.push(room);
    return room;
}

PRG_MapGenerator.prototype.makePassToStart = function (room) {
    var x_axis = room.x - this._startRoom.x;
    var y_axis = room.y - this._startRoom.y;
    var pass = [];
    var temp = null;

    while (y_axis != 0) {
        if (y_axis > 0) {
            pass.push('t');
            y_axis--;
        } else if (y_axis < 0) {
            pass.push('b');
            y_axis++;
        }
    }
    while (x_axis != 0) {
        if (x_axis > 0) {
            pass.push('r');
            x_axis--;
        } else if (x_axis < 0) {
            pass.push('l');
            x_axis++;
        }
    }
    //shuffle pass
    if (room.name != 'goal' && room.name != 'event')
    for (var i = 0; i < pass.length; i++) {
        var rand = Math.floor(Math.random() * pass.length);
        if (i != rand) {
            temp = pass[i];
            pass[i] = pass[rand];
            pass[rand] = temp;
        }
    }
    //passToStart에서 일치하는 부분이 있는지 검사 후, 겹치는데까지 일치하게 순서 변경(모든 경로중 가장 일치가 많은 길로 선택)
    var originalPass = pass;
    var comparePass = null;
    var resultPass = null;
    var index = 0;
    var lastIndex = 0;
    var compareIndex = null;
    for (var i = 0; i < this._passToStart.length; i++) {
        originalPass = pass;
        comparePass = this._passToStart[i];
        index = 0;
        for (var j = 0; j < comparePass.length - 1; j++) {
            compareIndex = originalPass.indexOf(comparePass[j], index)
            if (compareIndex != -1 && compareIndex >= index) {
                temp = originalPass[index];
                originalPass[index] = originalPass[compareIndex];
                originalPass[compareIndex] = temp;
                index++;
            } else break;
        }
        if (index > lastIndex) {
            resultPass = originalPass;
            lastIndex = index;
        }
        //originalPass가 초기화가 안됐음. 
    }
    if(resultPass) pass = resultPass;
    this._passToStart.push(pass)
}

PRG_MapGenerator.prototype.makePassesToRoom = function () {
    var mainRoomsNum = this._maxRooms > 8 ? 7 : this._maxRooms > 5 ? 6 : 5
    //중요 중요 중요 만약 추후에 체스트or이벤트방을 추가로 늘린다면 여기서 mainRoomsNum의 값을 this._rooms.length로 바꿔야 할 수 있음.
	for (var i = 0; i < this._passToStart.length; i++) {
		if (this._rooms.length - mainRoomsNum > this._maxRooms - 1) return false;
        var pass = this._passToStart[i];
        var currentX = this._startRoom.x;
        var currentY = this._startRoom.y;
        var currentRoom = this._roomCoords[currentX][currentY];
        var targetRoom = null;
        var nonNearEnemy = null;
        var temp = null;
        for (var j = 0; j < pass.length; j++) {
            currentRoom = this._roomCoords[currentX][currentY];
            if (pass[j] == 't') {
                currentY++;
                //방 만들고
                //시작점 위 뚫고
                //새로만들 방 아래쪽 뚫고
                //여기 바꾸면 안돼 make에서 참조하고 있어
                if (this.isEmpty(currentX, currentY)) {
                    nonNearEnemy = this.nonNearEnemy(currentX, currentY, pass, j, pass[j]);
                    if (nonNearEnemy) {
                        temp = pass[j];
                        pass[j] = pass[nonNearEnemy];
                        pass[nonNearEnemy] = temp;
                        j--;
                        currentY--;
                        continue;
                    }
                    this.makeRoom(currentX, currentY, 'enemy');
                }
                var targetRoom = this._roomCoords[currentX][currentY];
                var currentNote = this._mapData[currentRoom.name];
                var targetNote = this._mapData[targetRoom.name];
                currentRoom['t'] = targetRoom;//[targetRoom, targetNote.mapId, targetNote.pass.t[0], targetNote.pass.t[1]];
                targetRoom['b'] = currentRoom;//[currentRoom, currentNote.mapId, currentNote.pass.b[0], currentNote.pass.b[1]];
            }
            if (pass[j] == 'b') {
                currentY--;
                if (this.isEmpty(currentX, currentY)) {
                    nonNearEnemy = this.nonNearEnemy(currentX, currentY, pass, j, pass[j]);
                    if (nonNearEnemy) {
                        temp = pass[j];
                        pass[j] = pass[nonNearEnemy];
                        pass[nonNearEnemy] = temp;
                        j--;
                        currentY++;
                        continue;
                    }
                    this.makeRoom(currentX, currentY, 'enemy');
                }
                var targetRoom = this._roomCoords[currentX][currentY];
                currentRoom['b'] = targetRoom;
                targetRoom['t'] = currentRoom;
            }
            if (pass[j] == 'l') {
                currentX--;
                if (this.isEmpty(currentX, currentY)) {
                    nonNearEnemy = this.nonNearEnemy(currentX, currentY, pass, j, pass[j]);
                    if (nonNearEnemy) {
                        temp = pass[j];
                        pass[j] = pass[nonNearEnemy];
                        pass[nonNearEnemy] = temp;
                        j--;
                        currentX++;
                        continue;
                    }
                    this.makeRoom(currentX, currentY, 'enemy');
                }
                var targetRoom = this._roomCoords[currentX][currentY];
                currentRoom['l'] = targetRoom;
                targetRoom['r'] = currentRoom;
            }
            if (pass[j] == 'r') {
                currentX++;
                if (this.isEmpty(currentX, currentY)) {
                    nonNearEnemy = this.nonNearEnemy(currentX, currentY, pass, j, pass[j]);
                    if (nonNearEnemy) {
                        temp = pass[j];
                        pass[j] = pass[nonNearEnemy];
                        pass[nonNearEnemy] = temp;
                        j--;
                        currentX--;
                        continue;
                    }
                    this.makeRoom(currentX, currentY, 'enemy');
                }
                    var targetRoom = this._roomCoords[currentX][currentY];
                    currentRoom['r'] = targetRoom;
                    targetRoom['l'] = currentRoom;
            }
        }
	}
	if (this._rooms.length - mainRoomsNum < this._maxRooms - 3) return false;
	return true;
}

PRG_MapGenerator.prototype.isEmpty = function (x, y) {
    return !this._roomCoords[x][y];
}

PRG_MapGenerator.prototype.nonNearEnemy = function (currentX, currentY, pass, index, lastPass) {
    var nearEnemy = false;
    if (lastPass != 'b' && currentY < this._scale-1 && this._roomCoords[currentX ][currentY + 1] != null && this._roomCoords[currentX ][currentY + 1].name == 'enemy') nearEnemy = true; //t
    else if (lastPass != 'r' && currentX > 0 && this._roomCoords[currentX - 1][currentY] != null && this._roomCoords[currentX - 1][currentY].name == 'enemy') nearEnemy = true; //l
    else if (lastPass != 'l' && currentX < this._scale - 1 && this._roomCoords[currentX + 1][currentY] != null && this._roomCoords[currentX + 1][currentY].name == 'enemy') nearEnemy = true; //r
    else if (lastPass != 't' && currentY > 0 && this._roomCoords[currentX ][currentY-1] != null && this._roomCoords[currentX][currentY - 1].name == 'enemy') nearEnemy = true; //b

    if (!nearEnemy) return null;
    else {
        if (lastPass == 't') currentY--;
        else if (lastPass == 'l') currentX++;
        else if (lastPass == 'r') currentX--;
        else if (lastPass == 'b') currentY++;
        for (var j = index + 1; j < pass.length; j++) {
            lastPass = pass[j];
            if (lastPass == 't') currentY++;
            else if (lastPass == 'l') currentX--;
            else if (lastPass == 'r') currentX++;
            else if (lastPass == 'b') currentY--;

            nearEnemy = false;
            if (lastPass != 'b' && currentY < this._scale - 1 && this._roomCoords[currentX][currentY + 1] != null && this._roomCoords[currentX][currentY + 1].name == 'enemy') nearEnemy = true; //t
            else if (lastPass != 'r' && currentX > 0 && this._roomCoords[currentX - 1][currentY] != null && this._roomCoords[currentX - 1][currentY].name == 'enemy') nearEnemy = true; //l
            else if (lastPass != 'l' && currentX < this._scale - 1 && this._roomCoords[currentX + 1][currentY] != null && this._roomCoords[currentX + 1][currentY].name == 'enemy') nearEnemy = true; //r
            else if (lastPass != 't' && currentY > 0 && this._roomCoords[currentX][currentY - 1] != null && this._roomCoords[currentX][currentY - 1].name == 'enemy') nearEnemy = true; //b
            if (!nearEnemy) {
                return j;
            }

            if (lastPass == 't') currentY--;
            else if (lastPass == 'l') currentX++;
            else if (lastPass == 'r') currentX--;
            else if (lastPass == 'b') currentY++;
        }
    }

    return null;
}

PRG_MapGenerator.prototype.distToStart = function (x, y) {
    var startX = this._startRoom.x;
    var startY = this._startRoom.y;
    return Math.abs(startX - x) + Math.abs(startY - y);
}

PRG_MapGenerator.prototype.printMap = function () {
    var startRoom = this._startRoom;
    var map = new Array(Math.pow(this._scale, 2));
    map.fill(" ")
    var startPoint = this._scale * (this._scale - startRoom.y - 1) + startRoom.x;
    var bossPoint = this._scale * (this._scale - this._bossRoom.y - 1) + this._bossRoom.x;
    var goalPoint = this._scale * (this._scale - this._goalRoom.y - 1) + this._goalRoom.x;
    var shopPoint = this._shopRoom != null ? this._scale * (this._scale - this._shopRoom.y - 1) + this._shopRoom.x : null;
	var eventPoint = this._scale * (this._scale - this._eventRoom.y - 1) + this._eventRoom.x;
	var eventPoint2 = this._eventRoom2 != null ? this._scale * (this._scale - this._eventRoom2.y - 1) + this._eventRoom2.x : null;
	var chestPoint = this._scale * (this._scale - this._chestRoom.y - 1) + this._chestRoom.x;
	var chestPoint2 = this._chestRoom2 != null ? this._scale * (this._scale - this._chestRoom2.y - 1) + this._chestRoom2.x : null;
    map[startPoint] = 's';
    map[bossPoint] = 'b';
    map[goalPoint] = 'g';
    map[shopPoint] = '$';
    map[eventPoint] = '*';
	if (eventPoint2) map[eventPoint2] = '*';
	map[chestPoint] = 'c';
	if (chestPoint2) map[chestPoint2] = 'c';;

    for (var i = 0; i < this._passToStart.length; i++) {
        var pass = this._passToStart[i];
        var currentPoint = startPoint;
        for (var j = 0; j < pass.length; j++) {
            if (pass[j] == 't') {
                if (map[currentPoint - this._scale] == ' ') map[currentPoint - this._scale] = 'p'
                currentPoint -= this._scale;
            }
            if (pass[j] == 'b') {
                if (map[currentPoint + this._scale] == ' ') map[currentPoint + this._scale] = 'p'
                currentPoint += this._scale;
            }
            if (pass[j] == 'l') {
                if (map[currentPoint - 1] == ' ') map[currentPoint - 1] = 'p'
                currentPoint -= 1;
            }
            if (pass[j] == 'r') {
                if (map[currentPoint + 1] == ' ') map[currentPoint + 1] = 'p'
                currentPoint += 1;
            }
        }
    }
    


    var display = "s : start, g : goal, c : chest, $ : shop, * : event, b : boss \n\n";
    for (var i = 0; i < map.length; i++) {
        display += map[i];
        if (i % this._scale == this._scale-1) display += "\r\n"
    }
}

