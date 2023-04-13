//================================================================
//PRG_Procedural Map Generation
/*
 * 
 * @plugindesc <PRG_Procedural Map Generation>
 * @version 0.01
 * 
 */

var Imported = Imported || {};
Imported.PRG_Minimap = true;

function PRG_Minimap() {
    this.initialize.apply(this);
}

PRG_Minimap.prototype = Object.create(Sprite.prototype);
PRG_Minimap.prototype.constructure = PRG_Minimap;

PRG_Minimap.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this.minimap = new Sprite(new Bitmap(30, 28));
    this.setup();
    this._scale = null;
    this.x = 250; //750
    this.y = 100; //10
    this.opacity = 255;
    this.fToggle = null
    this.enable = false;

    this._isCreated = false;
}

PRG_Minimap.prototype.setup = function () {
}

PRG_Minimap.prototype.createBackSprite = function () {
    var backSprite = new Sprite();
    backSprite.bitmap = ImageManager.loadPicture('minimap_backSpriteL');

    this.addChild(backSprite)
    //this.minimap.addChild(this.minimap.bitmap)
}

PRG_Minimap.prototype.createCellSprites = function () {
    this.cells = new Array(this._scale);

    var currentX = $gameMap._prgMapGenerator._currentCoord.x  || 0;
    var currentY = $gameMap._prgMapGenerator._currentCoord.y  || 0;
    var offsetX = Math.floor((this._scale - $gameMap._prgMapGenerator._maxWidth) / 2);
    var offsetY = Math.floor((this._scale - $gameMap._prgMapGenerator._maxHeight) / 2);

    for (var i = 0; i < this.cells.length; i++) {
        this.cells[i] = new Array(this._scale);
    }
    for (i = 0; i < this._scale; i++) {
        for (j = 0; j < this._scale; j++) {
            if (this._roomCoords[i][j]) {
                this.cells[i][j] = new Sprite();
                this.cells[i][j].x = 30 * (i + $gameMap._prgMapGenerator._minimapOffsetX + 5 - this._scale / 2) + 68;//30 * (i - currentX + 2) + 25;
                this.cells[i][j].y = 30 * (- j - $gameMap._prgMapGenerator._minimapOffsetY + 4 + this._scale / 2) + 8;//30 * (this._scale - j - 1 - currentY) + 25;
                if (this._roomCoords[i][j].explored == 'clear') {
                    this.cells[i][j].bitmap = ImageManager.loadPicture('minimap_cell_on');
                    this.cells[i][j].bitmap = ImageManager.loadPicture('minimap_cellIcon_' + this._roomCoords[i][j].name)
                    this.addChild(this.cells[i][j]);
                } else if (this._roomCoords[i][j].explored == 'watched') {
                    this.cells[i][j].bitmap = ImageManager.loadPicture('minimap_cell_off');
                    this.addChild(this.cells[i][j]);
                } else {
                    this.cells[i][j].bitmap = ImageManager.loadPicture('minimap_cell_off');
                    this.cells[i][j].renderable = false;
                    this.addChild(this.cells[i][j]);
                }
            }
        }
        
        var b = new Bitmap(50, 50)
        this.bitmap = new Bitmap(600, 600);
        this.bitmap.x = 500;
        this.bitmap.y = 0
        var a = new Sprite();
        a.bitmap = new Bitmap(600, 600);

    }

    //현재셀 반짝이스프라이트 생성
    this.currentCell = new Sprite();
    this.currentCell.bitmap = new Bitmap(30, 30)
    this.currentCell.bitmap.fillRect(0, 0, 30, 30, 'rgba(255, 255, 255, 0.7)');
    this.addChild(this.currentCell);
}

PRG_Minimap.prototype.update = function () {
    Sprite.prototype.update.call(this);
    if ($gameSwitches._data[50] == false) {
        if ($gameMap.isEventRunning() || $gameMessage.isBusy() || $gameSwitches._data[10]) {
            this.enable = false;
        } else {
            if (Input.preferGamepad()) {
                if (Input.isTriggered('$SELECT')) {
                    if (this.enable == false) {
                        this.enable = true;
                        if (this._isCreated) {
                            this.currentCorrd = { x: $gameMap.currentRoom().x, y: $gameMap.currentRoom().y };
                            this.currentCell.x = 30 * (this.currentCorrd.x + $gameMap._prgMapGenerator._minimapOffsetX) + 68 + 30 * (10 - this._scale) / 2;//30 * (i - currentX + 2) + 25;
                            this.currentCell.y = 30 * (this._scale - this.currentCorrd.y - 1 - $gameMap._prgMapGenerator._minimapOffsetY) + 8 + 30 * (10 - this._scale) / 2;//30 * (this._scale - j - 1 - currentY) + 25;
                        }
                    }
                    else this.enable = false;
                } else if (this.enable == true) {
                    if (TouchInput.isCancelled() || Input.isTriggered('$B')) this.enable = false;
                }
            } else {
                if (Input.isTriggered('tab')) {
                    if (this.enable == false) this.enable = true;
                    else this.enable = false;
                } else if (this.enable == true) {
                    if (TouchInput.isCancelled() || Input.isTriggered('#esc')) this.enable = false;
                }
            }
        }
    } else this.enable = false;
    if ($gameSystem._prgMinimapEnable && this.enable) { // 로그라이크맵일때만 업데이트 실행
        $gameSystem._prgMapOpened = true;
        if (this.opacity < 220) {
            this.opacity += 10;
        }
        this._scale = $gameMap._prgMapGenerator._scale;
        this._roomCoords = $gameMap._prgMapGenerator._roomCoords;
        var crntCoord = { x: $gameMap.currentRoom().x, y: $gameMap.currentRoom().y };
        if (!this._isCreated) { //첫 생성
            this.createBackSprite();
            this.createCellSprites();
            //x,y셀 보이도록 만드는 함수
            //this.cells[crntCoord.x][crntCoord.y].bitmap = ImageManager.loadPicture('minimap_cell_on');
            this.cells[crntCoord.x][crntCoord.y].renderable = true;

            //x,y셀 주변패스 검사해서 보이도록 만드는 함수
            var room = $gameMap._prgMapGenerator._roomCoords[crntCoord.x][crntCoord.y];
            if (room.t) {
                this.cells[room.t.x][room.t.y].renderable = true;
            }
            if (room.b) {
                this.cells[room.b.x][room.b.y].renderable = true;
            }
            if (room.l) {
                this.cells[room.l.x][room.l.y].renderable = true;
            }
            if (room.r) {
                this.cells[room.r.x][room.r.y].renderable = true;
            }

            this.currentCorrd = crntCoord;
            this.currentCell.x = 30 * (crntCoord.x + $gameMap._prgMapGenerator._minimapOffsetX) + 68 + 30 * (10 - this._scale) / 2;//30 * (i - currentX + 2) + 25;
            this.currentCell.y = 30 * (this._scale - crntCoord.y - 1 - $gameMap._prgMapGenerator._minimapOffsetY) + 8 + 30 * (10 - this._scale) / 2;//30 * (this._scale - j - 1 - currentY) + 25;

            this._isCreated = true;
        }

        if (Input.preferGamepad()) {
            var crn = this._roomCoords[this.currentCorrd.x][this.currentCorrd.y];
            if (Input.isTriggered('$UP')) {
                if (crn.t && crn.t.explored) {
                    this.currentCorrd.y++;
                    this.currentCell.y -= 30;
                }
            } else if (Input.isTriggered('$LEFT')) {
                if (crn.l && crn.l.explored) {
                    this.currentCorrd.x--;
                    this.currentCell.x -= 30;
                }
            } else if (Input.isTriggered('$RIGHT')) {
                if (crn.r && crn.r.explored) {
                    this.currentCorrd.x++;
                    this.currentCell.x += 30;
                }
            } else if (Input.isTriggered('$DOWN')) {
                if (crn.b && crn.b.explored) {
                    this.currentCorrd.y--;
                    this.currentCell.y += 30;
                }
            } else if (Input.isTriggered('$A')) {
                $gameMap.minimapTouchTransfer(this.currentCorrd.x, this.currentCorrd.y)
            }
        }


        if (this.fToggle) {
            if (this.currentCell.opacity > 130) {
                this.currentCell.opacity -= 6;
            } else this.fToggle = false;
        } else {
            if (this.currentCell.opacity < 220) {
                this.currentCell.opacity += 6;
            } else this.fToggle = true;
        }
    } else if (this.opacity > 0) {
        this.opacity -= 10;
        $gameSystem._prgMapOpened = false;
    }

};


Game_Map.prototype.minimapTouchTransfer = function (x, y) {
    var room = this._prgMapGenerator._roomCoords[x][y] || this.currentRoom();
    if (room != this.currentRoom() && room.explored == 'clear') {
        var pass = room.pass;
        var currentX = this._prgMapGenerator._currentCoord.x;
        var currentY = this._prgMapGenerator._currentCoord.y;

        if (x > currentX) { //오른쪽으로 이동이므로, 왼쪽방이 clear라면 왼쪽좌표로 이동
            if (room.l && room.l.explored == 'clear') $gamePlayer.reserveTransfer(Number(room.id), pass.l.x, pass.l.y, null, 0);
            else if (room.t && room.t.explored == 'clear') $gamePlayer.reserveTransfer(Number(room.id), pass.t.x, pass.t.y, null, 0);
			else if (room.b && room.b.explored == 'clear') $gamePlayer.reserveTransfer(Number(room.id), pass.b.x, pass.b.y, null, 0);
			else if (room.r && room.r.explored == 'clear') $gamePlayer.reserveTransfer(Number(room.id), pass.r.x, pass.r.y, null, 0);
        } else if (x < currentX) {//왼쪽 이동이므로, 오른쪽방이
            if (room.r && room.r.explored == 'clear') $gamePlayer.reserveTransfer(Number(room.id), pass.r.x, pass.r.y, null, 0);
            else if (room.t && room.t.explored == 'clear') $gamePlayer.reserveTransfer(Number(room.id), pass.t.x, pass.t.y, null, 0);
			else if (room.b && room.b.explored == 'clear') $gamePlayer.reserveTransfer(Number(room.id), pass.b.x, pass.b.y, null, 0);
			else if (room.l && room.l.explored == 'clear') $gamePlayer.reserveTransfer(Number(room.id), pass.l.x, pass.l.y, null, 0);
        } else if (y > currentY) {//위로 이동이므로, ㅍ아래방이 clear라면 아래좌표로
            if (room.b && room.b.explored == 'clear') $gamePlayer.reserveTransfer(Number(room.id), pass.b.x, pass.b.y, null, 0);
            else if (room.l && room.l.explored == 'clear') $gamePlayer.reserveTransfer(Number(room.id), pass.l.x, pass.l.y, null, 0);
			else if (room.r && room.r.explored == 'clear') $gamePlayer.reserveTransfer(Number(room.id), pass.r.x, pass.r.y, null, 0);
			else if (room.t && room.t.explored == 'clear') $gamePlayer.reserveTransfer(Number(room.id), pass.t.x, pass.t.y, null, 0);
        } else if (y < currentY) {
            if (room.t && room.t.explored == 'clear') $gamePlayer.reserveTransfer(Number(room.id), pass.t.x, pass.t.y, null, 0);
            else if (room.l && room.l.explored == 'clear') $gamePlayer.reserveTransfer(Number(room.id), pass.l.x, pass.l.y, null, 0);
			else if (room.r && room.r.explored == 'clear') $gamePlayer.reserveTransfer(Number(room.id), pass.r.x, pass.r.y, null, 0);
			else if (room.b && room.b.explored == 'clear') $gamePlayer.reserveTransfer(Number(room.id), pass.b.x, pass.b.y, null, 0); 
        }
        $gameMap._prgMapGenerator._currentCoord.x = x;
        $gameMap._prgMapGenerator._currentCoord.y = y;

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
        if (room.t && !room.t.explored) {
            room.t.explored = 'watched';
        }
        if (room.b && !room.b.explored) {
            room.b.explored = 'watched';
        }
        if (room.l && !room.l.explored) {
            room.l.explored = 'watched';
        }
        if (room.r && !room.r.explored) {
            room.r.explored = 'watched';
        }
    }
}

Scene_Map.prototype.createPRGMinimap = function () {

    this._prgMinimap = new PRG_Minimap();

    this.addChild(this._prgMinimap);
}


var Alias_Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function () {
    Alias_Scene_Map_createAllWindows.call(this);
    this.createPRGMinimap();
}

var Alias_Scene_Map_ProcessMapTouch = Scene_Map.prototype.processMapTouch;
Scene_Map.prototype.processMapTouch = function () {
    if (!this.checkMinimapTouch()) {
        Alias_Scene_Map_ProcessMapTouch.call(this);
    }
};

Scene_Map.prototype.checkMinimapTouch = function () {
    if (TouchInput.isTriggered()) {
        var minimap = this._prgMinimap;
        if (minimap.enable != true) return false;
        if (minimap && $gameSystem._prgMinimapEnable) {
            var bitmap = minimap.minimap
            var width = bitmap.width;
            var height = bitmap.height;

            var x = minimap.x + 218 - 30 * ((minimap._scale / 2) + $gameMap._prgMapGenerator._minimapOffsetX);
            var y = minimap.y + 158 - 30 * ((minimap._scale / 2) - $gameMap._prgMapGenerator._minimapOffsetY);
            if (TouchInput.x > x && TouchInput.x < x + 30*minimap._scale &&
                TouchInput.y > y && TouchInput.y < y + 30*minimap._scale) {

                x = Math.floor((TouchInput.x - x) / 30 - 2*$gameMap._prgMapGenerator._minimapOffsetX);
                y = Math.floor((30 * minimap._scale - (TouchInput.y - y)) / 30 - 2*$gameMap._prgMapGenerator._minimapOffsetY);

                if (x < 0 || y < 0 || x > minimap._scale - 1 || y > minimap._scale - 1) return false;
                $gameMap.minimapTouchTransfer(x,y)
                var room = $gameMap._prgMapGenerator._roomCoords[x][y] || $gameMap.currentRoom();
                if (room != $gameMap.currentRoom() && room.explored == 'clear') {
                    var pass = room.pass;
                    if (x > $gameMap._prgMapGenerator._currentCoord.x) {
                        if (room.l && room.l.explored == 'clear') $gamePlayer.reserveTransfer(Number(room.id), pass.l.x, pass.l.y, null, 0);//오른쪽으로 이동이므로, 왼쪽방이 clear라면 왼쪽좌표로 이동
                        //else 

                    } else if (x < $gameMap._prgMapGenerator._currentCoord.x && room.r && room.r.explored == 'clear') {
                        $gamePlayer.reserveTransfer(Number(room.id), pass.r.x, pass.r.y, null, 0);//왼쪽 이동이므로, 오른쪽방이
                    } else if (y > $gameMap._prgMapGenerator._currentCoord.y && room.b && room.b.explored == 'clear') {
                        $gamePlayer.reserveTransfer(Number(room.id), pass.b.x, pass.b.y, null, 0);//위로 이동이므로, ㅍ아래방이 clear라면 아래좌표로
                    }else if (y < $gameMap._prgMapGenerator._currentCoord.y && room.t && room.t.explored == 'clear') {
                        $gamePlayer.reserveTransfer(Number(room.id), pass.t.x, pass.t.y, null, 0);//
                    } 
                    $gameMap._prgMapGenerator._currentCoord.x = x;
                    $gameMap._prgMapGenerator._currentCoord.y = y;

                    room.explored = 'clear';
                    if (room.t && !room.t.explored) {
                        room.t.explored = 'watched';
                    }
                    if (room.b && !room.b.explored) {
                        room.b.explored = 'watched';
                    }
                    if (room.l && !room.l.explored) {
                        room.l.explored = 'watched';
                    }
                    if (room.r && !room.r.explored) {
                        room.r.explored = 'watched';
                    }
                }
                this._touchCount = 0;
                return true;
            }
        }
    }
    return false;

};