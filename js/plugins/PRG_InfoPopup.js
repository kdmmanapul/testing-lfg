/*:
 * info popup
 * version 0.01
 * 
 * @plugindesc (v0.01) popup info when user gain items, skills, or states
 * 
 * @param X-Axis
 * @desc Set info window X Axis
 * @default 480
 * 
 * @param Y-Axis
 * @desc set info window Y Axis
 * @default 300
 * 
 * @param Duration
 * @desc Definite tempo to fade out
 * @default 200
 * 
 * @help
 * ----------------------------------------------
 * nope
 * 
 * ----------------------------------------------
 * 
 */
var Imported = Imported || {};
Imported.PRG_InfoPopup = true;

function Sprite_InfoPopup() {
    this.initialize.apply(this, arguments);
}

var _alias_game_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function () {
    _alias_game_temp_initialize.call(this);
    this._infoPopup = [];
};

(function () {
    var params = PluginManager.parameters('PRG_InfoPopup');
    params.x_Axis = Number(params['X-Axis'] || 400);
    params.y_Axis = Number(params['Y-Axis'] || 200);
    params.duration = Number(params['Duration'] || 200);

    Sprite_InfoPopup.prototype = Object.create(Sprite_Base.prototype);
    Sprite_InfoPopup.prototype.constructor = Sprite_InfoPopup;

    Sprite_InfoPopup.prototype.initialize = function () {
        Sprite_Base.prototype.initialize.call(this);
        this.x = params.x_Axis;
        this.y = params.y_Axis;
        this._popupTimer = -1;
        this.opacity = 0;
        this.loadImg();
        this.create_layout();
        this.create_icon();
        this.create_text();
    };

    Sprite_InfoPopup.prototype.loadImg = function () {
        //this._layout_img = ImageManager.loadSystem("Treasure");
        this._icon_img = ImageManager.loadSystem("IconSet");
    }

    Sprite_InfoPopup.prototype.update = function () {
        Sprite_Base.prototype.update.call(this);
        if ($gameTemp._infoPopup.length > 0 && this._popupTimer < 0) {
            this.visible = true;
            this._item = $gameTemp._infoPopup[0]
            $gameTemp._infoPopup.shift();
            this._desc = '';
            if (DataManager.isSkill(this._item)) {
                var level = this._item.id % 5;
                if (level == 0) level = 5;
                this._desc = level == 1 ? this._item.description : $dataSkills[this._item.id].message2.split('\\n')[level - 2];
                if (!this._desc) this._desc = '';
            } else if (this._item.message1) {
                this._desc = this._item.message1
            } else this._desc = this._item.description
                this._popupTimer = this._desc ? params.duration + this._desc.length * 2 : params.duration;
            this.refresh();
            this._popupTimer--;
        } else if (this._popupTimer > -1) {
            if (this._popupTimer > params.duration + this._desc.length * 2 - 20) {
                this.opacity += 13;
                this.y += 2.5;
            } else if (this._popupTimer < 20) {
                this.opacity -= 13;
                this.y -= 2.5;
                if (this._popupTimer == 0) {
                    this.y = params.y_Axis;
                    this.opacity = 0;
                    this.visible = false;
                };
            }
            this._popupTimer--;
        }

    }

    Sprite_InfoPopup.prototype.create_layout = function () {
        this._layout = new Sprite();
        this._layout.bitmap = ImageManager.loadSystem("Treasure")
        this._layout._anchor.x = 0.5
        this._layout.x = 0;
        this._layout.y = 0;
        this.addChild(this._layout);
    }

    Sprite_InfoPopup.prototype.create_icon = function () {
        this._icon = new Sprite(this._icon_img);
        this._icon._anchor.x = 0.5
        this._icon.x = 0;
        this._icon.y = 12;
        this.addChild(this._icon);

    }

    Sprite_InfoPopup.prototype.create_text = function () {
        this._text = new Sprite(new Bitmap(368, 140));
        this._text._anchor.x = 0.5
        this._text.x = 0;
        this._text.y = 10;
        this._text.bitmap.fontSize = 14;
        this.addChild(this._text);
    }


    Sprite_InfoPopup.prototype.refresh = function () {
        if (!this._item) { return };
        this.refresh_layout();
        this.refresh_icon();
        this.refresh_name();
        this.refresh_description();
    };

    Sprite_InfoPopup.prototype.refresh_layout = function () {
        //var pw = this._layout.bitmap.width;
        //var ph = this._layout.bitmap.height / 4;

        //var sx = 0;
        //var sy = this._item.rarity > 0 ? (this._item.rarity - 1) * ph : 0;

        //this._layout.setFrame(sx, sy, pw, ph);
        //if (DataManager.isItem(this._item) || DataManager.isSkill(this._item)) {
        //    if (this._item.description.indexOf('\n') != -1) {
        //        this._layout.y = this._text.bitmap.fontSize + 7;
        //    } else this._layout.y = 0;
        ///*} else if (DataManager.isSkill(this._item)) {
        //    this._layout.y = 0;//this._text.bitmap.fontSize + 7;*/
        //} else if (this._item.message1) {
        //    this._layout.y = 0;
        //    if (this._item.message2.length > 0) {
        //        this._layout.y += this._text.bitmap.fontSize + 7;
        //    }
        //    if (this._item.message3.length > 0) {
        //        this._layout.y += this._text.bitmap.fontSize + 7;
        //    }
        //}
        this._layout.y = 0;
    };

    Sprite_InfoPopup.prototype.refresh_icon = function () {
        var spaceCount = (this._item.name.match(/[ a-z.0-9]/gi) || []).length;
        this._icon.x = -10 -this._item.name.length * 10 + (spaceCount) * 5;
        var iconIndex = this._item.iconIndex
        var sx = iconIndex % 16 * 32;
        var sy = Math.floor(iconIndex / 16) * 32;
        this._icon.setFrame(sx, sy, 32, 32);
    };

    Sprite_InfoPopup.prototype.refresh_name = function () {
        var height = 32;
        if (this._item.message1) {
            if (!this._item.message2) {
                if (!this._item.message4) {
                    height += 4;
                }
            }
        }
        this._text.bitmap.clear();
        var text = String(this._item.name);
        this._text.bitmap.textColor = this.rarityTextColor(this._item.rarity);
        this._text.bitmap.fontSize = 20;
        //this._text.bitmap.textColor = this.textColor(this.fontColor());
        this._text.bitmap.drawText(text, 10, 0, 368, height, "center");
        this._text.bitmap.textColor = '#ffffff'
        this._text.bitmap.fontSize = 14;
    };

    Sprite_InfoPopup.prototype.rarityTextColor = function (rarity) {
        switch (rarity) {
            case 2:
                return '#66cc40'
            case 3:
                return '#8080ff'
            case 4:
                return '#ff3810'
            default:
                return '#ffffff'
        }
    };

    Sprite_InfoPopup.prototype.refresh_description = function () {
        this._text.bitmap.fontSize = 16;
        if (DataManager.isItem(this._item)) {
            var text = String(this._item.description);
            this._text.bitmap.drawTextInfo(text, 0, 30, 368, 80, 'center');
        } else if (DataManager.isSkill(this._item)) {
            var level = this._item.id % 5;
            if (level == 0) level = 5;
            if (level == 1) {
                var text = String(this._item.description);
                this._text.bitmap.drawTextInfo(text, 0, 34, 368, 80, 'center');
                //this._text.bitmap.drawTextInfo(textSplit2, 0, 5, 300, 112, "center");
            }else if (this._item.message2.length > 0) {
                var text = $dataSkills[this._item.id].message2.split('\\n')[level - 2];
                this._text.bitmap.drawTextInfo(text, 0, 40, 368, 80, 'center');
            }
        } else if (this._item.message1) {
            var height = 80;
            if (!this._item.message2) {
                if (!this._item.message4) {
                    height += 22;
                } else height += 10;
            }
            this._text.bitmap.drawText(this._item.message1, 0, 0, 368, height, "center");
            height += 28;
            if (this._item.message2 && this._item.message2.length > 0) {
                this._text.bitmap.drawText(this._item.message2, 0, 5, 368, height, "center");
                height += 28;
            }
            if (this._item.message3 && this._item.message3.length > 0) {
                this._text.bitmap.drawText(this._item.message3, 0, 5, 368, height, "center");
                height += 28;
            }
            if (this._item.message4 && this._item.message4.length > 0) {
                height += 10;
                this._text.bitmap.textColor = '#ffffa0';
                this._text.bitmap.drawText(this._item.message4, 0, 5, 368, height, "center");
            }
        }
    };
    //=====

    var Alias_Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function () {
        Alias_Scene_Map_createAllWindows.call(this);
        this.createInfoPopup();
    };

    Scene_Map.prototype.createInfoPopup = function () {
        this._infoPopup = new Sprite_InfoPopup();
        this.addChild(this._infoPopup);
    };
})();
