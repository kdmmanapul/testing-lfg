//=============================================================================
// QABS Skillbar
//=============================================================================

var Imported = Imported || {};

if (!Imported.QABS || !QPlus.versionCheck(Imported.QABS, '1.4.0')) {
  alert('Error: QABS+Skillbar requires QABS 1.4.0 or newer to work.');
  throw new Error('Error: QABS+Skillbar requires QABS 1.4.0 or newer to work.');
}

Imported.QABS_Skillbar = '2.0.1';

//=============================================================================
/*:
 * @plugindesc <QABSSkillbar>
 * QABS Addon: Adds a mmo like skillbar
 * @version 2.0.1
 * @author Quxios  | Version 2.0.1
 * @site https://quxios.github.io/
 * @updateurl https://quxios.github.io/data/pluginsMin.json
 * 
 * @requires QABS
 *
 * @param Show Unassigned Keys
 * @desc Shows Keys even if they have nothing assigned to them
 * @type boolean
 * @on Show
 * @off Hide
 * @default false
 *
 * @param Default visibility
 * @desc Is the skillbar visible by default
 * @type boolean
 * @on Visible
 * @off Hidden
 * @default true
 *
 * @help
 * ============================================================================
 * ## About
 * ============================================================================
 * This is an addon to QABS plugin. This plugin adds a mmo like skillbar to QABS.
 * 
 * ============================================================================
 * ## How to use
 * ============================================================================
 * Install this plugin somewhere below QABS.
 * 
 * ============================================================================
 * ## Toggling hud
 * ============================================================================
 * To turn on the skillbar use the plugin command:
 * ~~~
 * QABS skillbar show
 * ~~~
 * 
 * To hide the skillbar, use:
 * ~~~
 * QABS skillbar hide
 * ~~~
 * ============================================================================
 * ## Links
 * ============================================================================
 * Formated Help:
 *
 *  https://quxios.github.io/#/plugins/QABS+Skillbar
 *
 * RPGMakerWebs:
 *
 *  http://forums.rpgmakerweb.com/index.php?threads/qplugins.73023/
 *
 * Terms of use:
 *
 *  https://github.com/quxios/QMV-Master-Demo/blob/master/readme.md
 *
 * Like my plugins? Support me on Patreon!
 *
 *  https://www.patreon.com/quxios
 *
 * @tags QABS-Addon, hud
 */
//=============================================================================

function QABSSkillbar() {
  throw new Error('This is a static class');
}

function Sprite_Skillbar() {
  this.initialize.apply(this, arguments);
}

function Sprite_SkillButton() {
  this.initialize.apply(this, arguments);
}

function Sprite_SkillInfo() {
  this.initialize.apply(this, arguments);
}

//=============================================================================
// QABS Skillbar

(function() {
  QABSSkillbar.over = false;
    QABSSkillbar.requestRefresh = false;
    QABSSkillbar.requestIconUpdate = false;

  var _PARAMS = QPlus.getParams('<QABSSkillbar>', true);

  var _SHOW_UNASSIGNED = _PARAMS['Show Unassigned Keys'];
  var _VISIBLE = _PARAMS['Default visibility'];

  //-----------------------------------------------------------------------------
  // Game_Interpreter

  var Alias_Game_Interpreter_qABSCommand = Game_Interpreter.prototype.qABSCommand;
  Game_Interpreter.prototype.qABSCommand = function(args) {
    var cmd = args[0].toLowerCase();
    if (cmd === 'skillbar') {
      var val = args[1].toLowerCase();
      if (val === 'show') {
        $gameSystem.showSkillbar();
      } else if (val === 'hide') {
        $gameSystem.hideSkillbar();
      }
      return;
    }
    Alias_Game_Interpreter_qABSCommand.call(this, args);
  };

  //-----------------------------------------------------------------------------
  // Game_System

  var Alias_Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    Alias_Game_System_initialize.call(this);
      this._showSkillbar = _VISIBLE;
      this._fadeSkillbar = false;
  };

  Game_System.prototype.showSkillbar = function() {
    this._showSkillbar = true;
  };

  Game_System.prototype.hideSkillbar = function() {
    this._showSkillbar = false;
  };

  var Alias_Game_System_resetABSKeys = Game_System.prototype.resetABSKeys;
  Game_System.prototype.resetABSKeys = function() {
    Alias_Game_System_resetABSKeys.call(this);
    QABSSkillbar.requestRefresh = true;
  };

  //-----------------------------------------------------------------------------
  // Game_Actor

  var Alias_Game_Actor_learnSkill = Game_Actor.prototype.learnSkill;
  Game_Actor.prototype.learnSkill = function(skillId) {
    Alias_Game_Actor_learnSkill.call(this, skillId);
    QABSSkillbar.requestRefresh = true;
  };

  var Alias_Game_Actor_forgetSkill = Game_Actor.prototype.forgetSkill;
  Game_Actor.prototype.forgetSkill = function(skillId) {
    Alias_Game_Actor_forgetSkill.call(this, skillId);
      QABSSkillbar.requestRefresh = true;
  };

  var Alias_Game_Actor_changeClass = Game_Actor.prototype.changeClass;
  Game_Actor.prototype.changeClass = function(classId, keepExp) {
    Alias_Game_Actor_changeClass.call(this, classId, keepExp);
    QABSSkillbar.requestRefresh = true;
  };

  //-----------------------------------------------------------------------------
  // Game_Player

  var Alias_Game_Player_canClick = Game_Player.prototype.canClick;
  Game_Player.prototype.canClick = function() {
    if (QABSSkillbar.over) return false;
    return Alias_Game_Player_canClick.call(this);
  };

  //-----------------------------------------------------------------------------
  // Sprite_Skillbar

  Sprite_Skillbar.prototype = Object.create(Sprite_Base.prototype);
  Sprite_Skillbar.prototype.constructor = Sprite_Skillbar;

    Sprite_Skillbar.prototype.initialize = function () {
        Sprite_Base.prototype.initialize.call(this);
        this.x = (Graphics.width) / 2 - 128;
        this.y = Graphics.height - 119;
        this._over = 0;
        this._actorId = $gameParty.leader()._actorId;
		this.requestPositionUpdate = true;
		this.animTrigger = false;
        this.createKeys();
        this.createHuds();
    };

    Sprite_Skillbar.prototype.createKeys = function () {
        this._buttons = [];
        for (var key = 6; key < 11; key++) {
            var button = new Sprite_SkillButton(key);
            if (this._buttons.length !== 0) {
                button.prev = this._buttons[this._buttons.length - 1]
            }
            if (key != 6) {
                button.scale._x = 0.75;
                button.scale._y = 0.75;
            }
            this._buttons.push(button);
            this.addChild(button);
        }

        //var key = 6;
        //var button = new Sprite_SkillButton(key);
        //if (this._buttons.length !== 0) {
        //    button.prev = this._buttons[this._buttons.length - 1]
        //}
        //this._buttons.push(button);
        //this.addChild(button);
    };

    Sprite_Skillbar.prototype.createHuds = function () {
        //��ų ������â �����
        var skillTextFrame = ImageManager.loadBitmap('img/actorhud/', 'skillTextFrame', 0, true);
        this._spriteIconTextFrame = new Sprite(skillTextFrame);
        this._spriteIconTextFrame.x = 118
        this._spriteIconTextFrame.y = 30
        this._spriteIconTextFrame.visible = false;
        this.addChild(this._spriteIconTextFrame)
        //��ų �Ӽ� ������ �����
        var elementFire = ImageManager.loadBitmap('img/actorhud/', 'skillFrameElement_fire', 0, true);
        var elementIce = ImageManager.loadBitmap('img/actorhud/', 'skillFrameElement_ice', 0, true);
        var elementWind = ImageManager.loadBitmap('img/actorhud/', 'skillFrameElement_wind', 0, true);
        var elementThunder = ImageManager.loadBitmap('img/actorhud/', 'skillFrameElement_thunder', 0, true);
        var elementWhite = ImageManager.loadBitmap('img/actorhud/', 'skillFrameElement_white', 0, true);
        var elementDark = ImageManager.loadBitmap('img/actorhud/', 'skillFrameElement_dark', 0, true);
        this._skillFrameElement = new Sprite();
        this._skillFrameElement.elements = [];
        this._skillFrameElement.elements.push(elementFire)
        this._skillFrameElement.elements.push(elementIce);
        this._skillFrameElement.elements.push(elementWind);
        this._skillFrameElement.elements.push(elementThunder);
        this._skillFrameElement.elements.push(elementWhite);
        this._skillFrameElement.elements.push(elementDark);
        this._skillFrameElement.blendMode = 1;
        this._skillFrameElement.x = 118
        this._skillFrameElement.y = 30
        this.addChild(this._skillFrameElement)
        //��ų ���� �Ҹ� ǥ��
        this._spriteIconText = new Sprite();
        this._spriteIconText.bitmap = new Bitmap(40, 40);
        this._spriteIconText.bitmap.textColor = '#f9d730'
        this._spriteIconText.bitmap.fontSize = 16;
        this._spriteIconText.bitmap.outlineWidth = 2;
        this._spriteIconText.bitmap.outlineColor = "rgba(0,0,0,0.9)";
        this._spriteIconText.bitmap.smooth = true;
        this._spriteIconText.x = 108
        this._spriteIconText.y = 18;
        this._spriteIconText.visible = false;
        this.addChild(this._spriteIconText)
        //��ų���ý���
        var skillSlotImage = ImageManager.loadBitmap('img/actorhud/', 'skillSlot', 0, true);
        this.skillSlot = new Sprite(skillSlotImage);
        this.skillSlot._anchor.x = 0.5;
        this.skillSlot._anchor.y = 0.5;
        this.skillSlot.visible = false;
		this.addChild(this.skillSlot)
		//���⽽��
		// var weaponSlotImageA = ImageManager.loadBitmap('img/actorhud/', 'weaponSlotA', 0, true);
		// var weaponSlotImageB = ImageManager.loadBitmap('img/actorhud/', 'weaponSlotB', 0, true);
		// this._weaponSlotImage = new Sprite();
		// this._weaponSlotImage.types = [];
		// this._weaponSlotImage.types.push(weaponSlotImageA)
		// this._weaponSlotImage.types.push(weaponSlotImageB)
		// this._weaponSlotImage.x = 522;
		// this._weaponSlotImage.y = 36;
		// this._weaponSlotImage.bitmap = this._weaponSlotImage.types[0];
		// this.addChild(this._weaponSlotImage);
		// //���� ������
		// var weaponIcon = ImageManager.loadSystem('IconSet');
		// this._weaponIcon = new Sprite_Icon(0)
		// this._weaponIcon._iconIndex = 0;
		// this._weaponIcon.setBitmap();
		// this._weaponIcon.x = 532;
		// this._weaponIcon.y = 46;
		// this._weaponIcon.scale.x = 1.3;
		// this._weaponIcon.scale.y = 1.3;
    //     this.addChild(this._weaponIcon);
        //���� ������
        // this._weaponDurText = new Sprite();
        // this._weaponDurText.bitmap = new Bitmap(200, 40);
        // this._weaponDurText.bitmap.textColor = '#ffffff'
        // this._weaponDurText.bitmap.fontSize = 16;
        // this._weaponDurText.bitmap.outlineWidth = 2;
        // this._weaponDurText.bitmap.outlineColor = "rgba(0,0,0,0.9)";
        // this._weaponDurText.bitmap.smooth = true;
        // this._weaponDurText.x = 518;
        // this._weaponDurText.y = 4;
        // this._weaponDurText._lastDur = 0;
        // this._weaponDurText.visible = false;
        // this.addChild(this._weaponDurText)

	

        QABSSkillbar.requestRefresh = true
       //this.refreshHuds();
    };

    Sprite_Skillbar.prototype.update = function () {
        if (!$gameSystem._showSkillbar) {
            QABSSkillbar.over = false;
            this.visible = false;
            return;
        }
        this.visible = true;
        if ($gameSystem._fadeSkillbar) {
            if (this.opacity > 100) this.opacity -= 10;
        } else this.opacity += 10;
        //if ($gameSystem._updateSkillSlot) {
        //    this.skillSlot.x = $gameSystem._updateSkillSlot[0];
        //    this.skillSlot.y = $gameSystem._updateSkillSlot[1];
        //    this.skillSlot.visible = true;
        //    $gameSystem._updateSkillSlot = false; 
        //    console.log(this.skillSlot.x)
        //}
        QABSSkillbar.over = false;
        if (this._actorId !== $gameParty.leader()._actorId) {
            this._actorId = $gameParty.leader()._actorId;
            QABSSkillbar.requestRefresh = true;
        }
        Sprite_Base.prototype.update.call(this);
        if (QABSSkillbar.requestRefresh) {
            this.refreshHuds();
            QABSSkillbar.requestRefresh = false;
        };//hud ������Ʈ �߰�
        if (this.requestPositionUpdate) {
            var width = 0;
            this.requestPositionUpdate = false;
            this.skillSlot.visible = false;
            for (var i = 0; i < this._buttons.length; i++) {
                this._buttons[i].updatePosition();
                if (this._buttons[i].visible) width += 36;
                if (this._buttons[i]._skillId > 0 && this._buttons[i]._skillId == $gameSystem.absKeys()[6].skillId) {
                    this.skillSlot.x = this._buttons[i].x + 15;
                    this.skillSlot.y = this._buttons[i].y + 15;
                    this.skillSlot.visible = true;
                }
            }
            //this.x = (Graphics.width - width) / 2;
        }
        if (QABSSkillbar.requestIconUpdate) {
            for (var i = 0; i < this._buttons.length; i++) {
                if ($gamePlayer.canUseSkill(this._buttons[i]._skillId)) {
                    if (this._buttons[i]._spriteIcon.alpha < 1) this._buttons[i]._iconAnimationTimer = 15;
                    this._buttons[i]._spriteIcon.alpha = 1
                } else this._buttons[i]._spriteIcon.alpha = 0.5;
                var key = Number(this._buttons[i]._key) - 1;
                if (key == 5) {
                    var cd = $gamePlayer._skillCooldowns[this._buttons[i]._skillId]
                    if ($gamePlayer._skillCooldowns[this._buttons[i]._skillId] > 0) {
                        var cd = $gamePlayer._skillCooldowns[this._buttons[i]._skillId]
                        var TxtCd = Math.ceil(cd / 60);
                            this._buttons[i]._spriteCooldownTxt.visible = true;
                            this._buttons[i]._spriteCooldownTxt.bitmap.clear();
                            if (TxtCd > 15) this._buttons[i]._spriteCooldownTxt.bitmap.textColor = '#ff0000';
                            else if (TxtCd > 5) this._buttons[i]._spriteCooldownTxt.bitmap.textColor = '#ff6969';
                            else this._buttons[i]._spriteCooldownTxt.bitmap.textColor = '#ffffff';
                            this._buttons[i]._spriteCooldownTxt.bitmap.drawText(Math.ceil(cd / 60), 0, -2, 40, 40, 'center');
                            this._buttons[i]._spriteCooldownTxt.cd = TxtCd;
                        
                    } else {
                        this._buttons[i]._spriteCooldown.visible = false;
                        this._buttons[i]._spriteCooldown.height = 0;
                        this._buttons[i]._spriteCooldownTxt.visible = false;
                        this._buttons[i]._spriteCooldownTxt.bitmap.clear();
                    }
                }
            }
            QABSSkillbar.requestIconUpdate = false;
        }
		this.skillSlot.rotation += 0.05

        // var weapon = $gameParty.leader().weapons().length > 0 ? $gameParty.leader().weapons()[0] : null;
        // if (weapon) {
        //     if (Math.floor(weapon.durability) != this._weaponDurText._lastDur) {
        //         this._weaponDurText.bitmap.clear();
        //         this._weaponDurText.bitmap.drawText(Math.floor(weapon.durability) + '/' + weapon.durMax, 13, 13, 50, 14, "center");
        //         if (weapon.durability < 25) {
        //             var redTone = this._weaponIcon._colorTone[0];
        //             var speed = 14 - weapon.durability / 2;
        //             if (weapon.durability <= 0 && redTone < 180) this._weaponIcon.setColorTone([180, 0, 0, 0]);
        //             else if (weapon.durability > 0) {
        //                 if (redTone > 130 && this.animTrigger == false) this.animTrigger = true;
        //                 else if (redTone < 3 && this.animTrigger == true) this.animTrigger = false;
        //                 if (this.animTrigger) {
        //                     if (redTone - speed >= 1) this._weaponIcon.setColorTone([redTone - speed, 0, 0, 0]);
        //                     else this._weaponIcon.setColorTone([1, 0, 0, 0]);
        //                 } else this._weaponIcon.setColorTone([redTone + speed, 0, 0, 0])
        //             }
        //         }
        //     }
        // }

    };

    Sprite_Skillbar.prototype.refreshHuds = function () {
        this._spriteIconTextFrame.visible = true;

        var weapon = $gameParty.leader().weapons()
		// this._weaponSlotImage.bitmap = this._weaponSlotImage.types[$gamePlayer._currentWeaponId]; 
		// this._weaponIcon._iconIndex = weapon.length > 0 ? weapon[0].iconIndex : 0
		// this._weaponIcon.x = 532 + $gamePlayer._currentWeaponId * 9;
		// this._weaponIcon.y = 46 + $gamePlayer._currentWeaponId * 7;
    //     this._weaponIcon.setBitmap();
    //     this._weaponIcon.setColorTone([0, 0, 0, 0])

        // this._weaponDurText.bitmap.clear();
        // if (weapon.length > 0) {
        //     this._weaponDurText._lastDur = Math.floor(weapon[0].durability);
        //     this._weaponDurText.x = 518 + $gamePlayer._currentWeaponId * 8;
        //     this._weaponDurText.y = 4 + $gamePlayer._currentWeaponId * 6;
        //     if (weapon[0].qmeta.Durability) this._weaponDurText.bitmap.drawText(Math.floor(weapon[0].durability) + '/' + weapon[0].durMax, 13, 13, 50, 14, "center");
        // }
        // this._weaponDurText.visible = true;


        var skill = $dataSkills[$gameSystem.absKeys()[6].skillId]
        if (!skill) return;
        //6�� ��ų�̶�� ���� �ڽ�Ʈ ǥ��
		this._skillFrameElement.bitmap = this._skillFrameElement.elements[skill.stypeId - 2];

        this._spriteIconText.bitmap.clear();
        this._spriteIconText.bitmap.drawText(skill.mpCost, 13, 13, 14, 14, "center");
		this._spriteIconText.visible = true;
    };

  //-----------------------------------------------------------------------------
  // Sprite_SkillButton

  Sprite_SkillButton.prototype = Object.create(Sprite_Button.prototype);
  Sprite_SkillButton.prototype.constructor = Sprite_SkillButton;

  Sprite_SkillButton.prototype.initialize = function(key) {
    Sprite_Button.prototype.initialize.call(this);
    this._key = key;
    this._skillId = 0;
    this._skill = null;
    this._skillSettings = null;
    this._preferGamePad = false;
      this._count = 0;
      this._iconAnimationTimer = 0;
    this.width = 40;
      this.height = 40;
      this.visible = false;
    this.setup();
  };

  Sprite_SkillButton.prototype.setSkillId = function(id) {
    this._skillId = id;
    this._skill = $dataSkills[id] || null;
    this._skillSettings = this._skill ? QABS.getSkillSettings(this._skill) : null;
  };

  Sprite_SkillButton.prototype.setup = function() {
    //this.createFrame();
    this.createIcon();
    this.createOverlayFrame();
      //this.createHover();
    //this.createInput();
    //this.createInfo();
    this.refresh();
  };

  Sprite_SkillButton.prototype.createFrame = function() {
    // Black bg for the button
    this._spriteFrame = new Sprite();
    this._spriteFrame.bitmap = new Bitmap(34, 34);
    //this._spriteFrame.bitmap.fillAll('#000000');
    //this._spriteFrame.alpha = 0.3;
    this.addChild(this._spriteFrame);
  };

  Sprite_SkillButton.prototype.createIcon = function() {
      this._spriteIcon = new Sprite_Icon(0);
      this._spriteIcon._anchor.x = 0.5;
      this._spriteIcon._anchor.y = 0.5;
      this._spriteIcon.x += 3 + 17
      this._spriteIcon.y += 3 + 17;
      //if (this._key != 6) {
      //    this._spriteIcon.bitmap.smooth = true // ��Ʈ �����°� ���� (����ȵ�)
      //}
      this.addChild(this._spriteIcon);
  };

  Sprite_SkillButton.prototype.createOverlayFrame = function() {
    // Black bg used for cooldown
    this._spriteCooldown = new Sprite();
    this._spriteCooldown.bitmap = new Bitmap(40, 40);
      this._spriteCooldown.bitmap.FillCircle(10,10,20,20,'#000000');
    this._spriteCooldown.alpha = 0.7;
      this._spriteCooldown.height = 0;
      this._spriteCooldown.pivot.x = 0.5;
      this._spriteCooldown.pivot.y = 0.5;
      this._spriteCooldown.rotation = Math.PI;
      this._spriteCooldown.x += 40;
      this._spriteCooldown.y += 40;
    this._spriteCooldown.visible = false;
      this.addChild(this._spriteCooldown);
      this._spriteCooldownTxt = new Sprite();
      this._spriteCooldownTxt.bitmap = new Bitmap(40, 40);
      this._spriteCooldownTxt.visible = false;
      this._spriteCooldownTxt.cd = 0;
      this.addChild(this._spriteCooldownTxt);
  };

  Sprite_SkillButton.prototype.createHover = function() {
    //// sprite when hovering over button
    //this._spriteHoverFrame = new Sprite();
    //this._spriteHoverFrame.bitmap = new Bitmap(34, 34);
    //var color1 = 'rgba(255, 255, 255, 0.9)';
    //var color2 = 'rgba(255, 255, 255, 0)';
    //this._spriteHoverFrame.bitmap.gradientFillRect(0, 0, 8, 34, color1, color2);
    //this._spriteHoverFrame.bitmap.gradientFillRect(26, 0, 8, 34, color2, color1);
    //this._spriteHoverFrame.bitmap.gradientFillRect(0, 0, 34, 8, color1, color2, true);
    //this._spriteHoverFrame.bitmap.gradientFillRect(0, 26, 34, 8, color2, color1, true);
    //this._spriteHoverFrame.visible = false;
    //this.addChild(this._spriteHoverFrame);
  };


  Sprite_SkillButton.prototype.createInput = function() {
    this._spriteInput = new Sprite();
    this._spriteInput.bitmap = new Bitmap(34, 34);
    this._spriteInput.bitmap.fontSize = 14;
    this.addChild(this._spriteInput);
  };

  Sprite_SkillButton.prototype.createInfo = function() {
    this._spriteInfo = new Sprite_SkillInfo();
    this._spriteInfo.visible = false;
    this.addChild(this._spriteInfo);
  };

  /*Sprite_SkillButton.prototype.callClickHandler = function() {
    if (!this._skillId) {
      return;
    }
    $gamePlayer.useSkill(this._skillId);
  };*/

    Sprite_SkillButton.prototype.update = function () {
        Sprite_Button.prototype.update.call(this);
        if (!_SHOW_UNASSIGNED) {
            this.updateVisiblity();
        }
        if (!this.visible) {
            return;
        }
        if (this.needsRefresh()) {
            this.refresh();
        }
        if (this._iconAnimationTimer > 0) {
            this.updateIconAnimation();
        }
        //if (Imported.QInput && this._preferGamePad !== Input.preferGamepad()) {
        //    this._preferGamePad = Input.preferGamepad();
        //    //this.refreshInput();
        //}
        /*if (this.isButtonTouched()) {
          this.updateHover();
        } else {
          this.updateOff();
        }*/
        //if (!this.isButtonTouched()) {
        //    this.updateOff();
        //}
        this.updateCooldown();
    };

  Sprite_SkillButton.prototype.updateVisiblity = function() {
    var id = $gameSystem.absKeys()[this._key].skillId;
    var oldVisible = this.visible;
    this.visible = !!id;
    if (oldVisible !== this.visible) {
      this.parent.requestPositionUpdate = true;
      }
  };

    Sprite_SkillButton.prototype.updatePosition = function () {
    var key = Number(this._key) - 1;
      if (key == 5) {
          this.x = 108;
      } else if (key == 6) {
          this.x = 108 - 36;
          this.y = -14;
      } else if (key == 7) {
          this.x = 108 - 11;
          this.y = -34;
      } else if (key == 8) {
          this.x = 108 + 21;
          this.y = -34;
      } else if (key == 9) {
          this.x = 108 + 46;
          this.y = -14;
        }
  };

  Sprite_SkillButton.prototype.updateHover = function() {
    //QABSSkillbar.over = true;
    //this._count++;
    //var twoAmp = 1;
    //var count = this._count * 0.02;
    //var newAlpha = 0.9 - Math.abs(count % twoAmp - (twoAmp / 2));
    //this._spriteHoverFrame.alpha = newAlpha;
    //this._spriteHoverFrame.visible = true;
    //this._spriteInfo.visible = true;
  };

  Sprite_SkillButton.prototype.updateOff = function() {
    //this._count = 0;
    //this._spriteHoverFrame.visible = false;
    //this._spriteInfo.visible = false;
  };

    Sprite_SkillButton.prototype.updateCooldown = function () {
        if (!this._skillId) {
            return;
        }
        if ($gamePlayer._skillCooldowns[this._skillId] != undefined) {
            var cd = $gamePlayer._skillCooldowns[this._skillId];
            if (cd > 0) {
                //���� : ����ð� ���� ����
                var newH = cd / (this._skillSettings.cooldown * (1 - $gamePlayer.battler().cds / 100));
                this._spriteCooldown.visible = true;
                this._spriteCooldown.height = 40 * newH;
                if (this._spriteIcon.alpha > 0.5) this._spriteIcon.alpha = 0.5
                var TxtCd = Math.ceil(cd / 60);;
                if (TxtCd != this._spriteCooldownTxt.cd) {
                    this._spriteCooldownTxt.visible = true;
                    this._spriteCooldownTxt.bitmap.clear();
                    if (TxtCd > 15) this._spriteCooldownTxt.bitmap.textColor = '#ff0000';
                    else if (TxtCd > 5) this._spriteCooldownTxt.bitmap.textColor = '#ff6969';
                    else this._spriteCooldownTxt.bitmap.textColor = '#ffffff';
                    this._spriteCooldownTxt.bitmap.drawText(Math.ceil(cd / 60), 0, -2, 40, 40, 'center');
                    this._spriteCooldownTxt.cd = TxtCd;
                }
            } else {
                this._spriteCooldown.visible = false;
                this._spriteCooldown.height = 0;
                this._iconAnimationTimer = 15;
                if (this._spriteIcon.alpha < 1) {
                    if ($gamePlayer.canUseSkill(this._skillId)) {
                        this._spriteIcon.alpha = 1;
                    }
                }
                this._spriteCooldownTxt.visible = false;
                this._spriteCooldownTxt.bitmap.clear();
            }
        }
    };
    

  Sprite_SkillButton.prototype.needsRefresh = function() {
    if (QABSSkillbar.requestRefresh) {
      return this._skillId !== $gameSystem.absKeys()[this._key];
    }
    return false;
  };

  Sprite_SkillButton.prototype.refresh = function() {
    var absKey = $gameSystem.absKeys()[this._key];
    this.setSkillId(absKey.skillId);

      if (absKey.skillId > 0 && this._key > 6 && absKey.skillId == $gameSystem.absKeys()[6].skillId) {
          if (this.parent) this.parent.requestPositionUpdate = true;
          this._iconAnimationTimer = 15;
      }
      this.refreshIcon();
    //this.refreshInput();
    //this.refreshInfo();
  };

  Sprite_SkillButton.prototype.refreshIcon = function() {
    this._spriteIcon._iconIndex = this._skill ? this._skill.iconIndex : 0;
      this._spriteIcon.setBitmap();
    if (!this._skill || (!$gameParty.leader().isLearnedSkill(this._skill.id) &&
        !$gameParty.leader().addedSkills().contains(this._skill.id)) ||
        !$gamePlayer.canUseSkill(this._skill.id)) {
        this._spriteIcon.alpha = 0.5;
    } else this._spriteIcon.alpha = 1;
    };

    Sprite_SkillButton.prototype.updateIconAnimation = function () {
        this._spriteIcon._iconIndex = this._skill ? this._skill.iconIndex : 0;
        this._spriteIcon.scale.x = 1 + this._iconAnimationTimer / 50;
        this._spriteIcon.scale.y = 1 + this._iconAnimationTimer / 50;
        this._iconAnimationTimer--;
    };

  Sprite_SkillButton.prototype.refreshInput = function() {
    var absKey = $gameSystem.absKeys()[this._key];
    var input = absKey.input[0] || '';
    if (Imported.QInput) {
      var inputs = absKey.input;
      for (var i = 0; i < inputs.length; i++) {
        var isGamepad = /^\$/.test(inputs[i]);
        if (Input.preferGamepad() && isGamepad) {
          input = inputs[i];
          break;
        } else if (!Input.preferGamepad() && !isGamepad) {
          input = inputs[i];
          break;
        }
      }
    }
    input = input.replace('#', '');
    input = input.replace('$', '');
    input = input.replace('mouse', 'M');
    this._spriteInput.bitmap.clear();
    this._spriteInput.bitmap.drawText(input, 0, 8, 34, 34, 'center');
  };

  Sprite_SkillButton.prototype.refreshInfo = function() {
    this._spriteInfo.set(this._skillId);
  };

  //-----------------------------------------------------------------------------
  // Sprite_SkillInfo

  Sprite_SkillInfo.prototype = Object.create(Sprite_Base.prototype);
  Sprite_SkillInfo.prototype.constructor = Sprite_SkillInfo;

  Sprite_SkillInfo.prototype.initialize = function(skillId) {
    Sprite_Base.prototype.initialize.call(this);
    this.width = 200;
    this.height = 250;
    this.y = -this.height;
    this._skillId = skillId;
    this._skill = $dataSkills[skillId];
    //this.drawInfo();
  };

  Sprite_SkillInfo.prototype.set = function(skillId) {
    if (this._skillId === skillId) return;
    this._skillId = skillId;
    this._skill = $dataSkills[skillId];
    //this.drawInfo();
  };

  Sprite_SkillInfo.prototype.createBackground = function() {
    this.bitmap = new Bitmap(this.width, this.height);
    this.bitmap.fillAll('rgba(0, 0, 0, 0.5)');
  };

  Sprite_SkillInfo.prototype.drawInfo = function() {
    this.createBackground();
    if (!this._skill) return;
    this._realHeight = 4;
    // Draw the details
    this.drawName(0, 0);
    //this.drawIcon(2, 12);
      this.drawAbsSettings(0, 32);
      //this.drawLine(this._realHeight + 2);
    this.drawDescription(4, this._realHeight);
    this.drawData(4, this._realHeight);
    // Resize to fit height
    this.height = this._realHeight + 4;
    this.y = -this.height;
  };

  Sprite_SkillInfo.prototype.drawName = function(x, y) {
    this.bitmap.fontSize = 32;
      this.bitmap.textColor = '#ffffa0';
    this.bitmap.drawText(this._skill.name, x, y, this.width, 36, 'center');
    this._realHeight = Math.max(y + 28, this._realHeight);
  };

  Sprite_SkillInfo.prototype.drawIcon = function(x, y) {
    var iconIndex = this._skill.iconIndex;
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    this.bitmap.blt(bitmap, sx, sy, pw, ph, x, y);
    this._realHeight = Math.max(y + 32, this._realHeight);
  };

  Sprite_SkillInfo.prototype.drawAbsSettings = function(x, y) {
    var abs = QABS.getSkillSettings(this._skill);
    var w = this.width - x; // 4 is padding
    this.bitmap.fontSize = 22;
    var cooldown = abs.cooldown / 60;
    var range = abs.range;
    var mpCost = this._skill.mpCost;
    var tpCost = this._skill.tpCost;
    var i = 0;
    var l = 22; // line height
    if (cooldown !== 0) {
      this.bitmap.textColor = '#ffffa0';
      var w2 = this.bitmap.measureTextWidth(TextManager.param(6));
        this.bitmap.drawText(TextManager.param(6) + ' :', x + 4, y + l * i, w, l, 'left');
      //this.bitmap.textColor = '#ffffff';
        this.bitmap.drawText(cooldown, x + w2 + 18, y + l * i, w, l, 'left'); 
      i++;
    }
    if (range !== 0) {
      this.bitmap.textColor = '#ffffa0';
      var w2 = this.bitmap.measureTextWidth(range);
      this.bitmap.drawText('Range: ', x - w2 + 4, y + l * i, w, l, 'left');
     // this.bitmap.textColor = '#ffffff';
      this.bitmap.drawText(range, x, y + l * i, w, l, 'left');
      i++;
    }
      if (mpCost !== 0) {
          this.bitmap.textColor = '#337fc5';
        var w2 = this.bitmap.measureTextWidth(TextManager.param(7));
        this.bitmap.drawText(TextManager.param(7) + ' :', x + 4, y + l * i, w, l, 'left');
     // this.bitmap.textColor = '#ffffff';
        var iconIndex = 16 * 5 + 10
        var bitmap = ImageManager.loadSystem('IconSet');
        var pw = Window_Base._iconWidth;
        var ph = Window_Base._iconHeight;
        var sx = iconIndex % 16 * pw;
        var sy = Math.floor(iconIndex / 16) * ph;
        //for (var j = 0; j < mpCost; j++) {
            this.bitmap.blt(bitmap, sx, sy, pw, ph, x + w2 + 18, y + l * i);
      // }
        this.bitmap.drawText('* '+ mpCost, x + w2 + 40, y + l * i, w, l, 'left');
      i++;
    }
    if (tpCost !== 0) {
      this.bitmap.textColor = '#ffffa0';
        var w2 = this.bitmap.measureTextWidth(TextManager.param(8));
        this.bitmap.drawText(TextManager.param(8) + ' :', x + 4, y + l * i, w, l, 'left');
        //this.bitmap.textColor = '#03197f';
        this.bitmap.drawText(tpCost, x + w2 + 12, y + l * i, w, l, 'left');
      i++;
    }
    this._realHeight = Math.max(y + (i * l), this._realHeight);
  };

  Sprite_SkillInfo.prototype.drawDescription = function(x, y) {
    this.bitmap.fontSize = 14;
    this.bitmap.textColor = '#ffffa0';
    //this.bitmap.drawText('Desc:', x, y, this.width, 18, 'left');
    var desc = this._skill.description;
    var settings = {
      fontName: 'GameFont',
      fontSize: 14,
      fill: '#ffffff',
      stroke: 'rgba(0, 0, 0, 0.5)',
      strokeThickness: 4,
      wordWrap: true,
      wordWrapWidth: this.width - 4,
      lineHeight: 18
    }
    this._desc = new PIXI.Text(desc, settings);
    this._desc.x = x;
    this._desc.y = y - 1;
    this.addChild(this._desc);
    this._realHeight = Math.max(y + this._desc.height, this._realHeight);
  };

  Sprite_SkillInfo.prototype.drawLine = function(y) {
    this.bitmap.fillRect(2, y, this.width - 4, 2, 'rgba(255, 255, 255, 0.8)');
    this._realHeight = Math.max(y + 4, this._realHeight);
  };

  Sprite_SkillInfo.prototype.drawData = function(x, y) {
    var w = this.width - x - 4; // 4 is padding
    this.bitmap.fontSize = 18;
    var formula = this._skill.damage.formula;
    formula = formula.replace(/b.(\w+)/g, '0');
    var a = $gamePlayer.actor();
    var v = $gameVariables._data;
   // var dmg = eval(formula);
    var i = 0;
    var l = 18; // line height
    if (dmg !== 0 && this._skill.damage.type !== 0) {
      this.bitmap.textColor = '#ffffa0';
      var title;
      if (this._skill.damage.type === 1) {
        title = 'Damage: ';
      } else if (this._skill.damage.type === 2) {
        title = 'MP Damage: ';
      } else if (this._skill.damage.type === 3) {
        title = 'Recover: ';
      } else if (this._skill.damage.type === 4) {
        title = 'MP Recover: ';
      }
      this.bitmap.drawText(title, x, y + l * i, w, l, 'left');
      this.bitmap.textColor = '#ffffff';
      var w2 = this.bitmap.measureTextWidth(title);
      this.bitmap.drawText(dmg, x + w2, y + l * i, w, l, 'left');
      i++;
    }
    // Write the effects:
    this._realHeight = Math.max(y + (i * l), this._realHeight);
  };

  //-----------------------------------------------------------------------------
  // Scene_Map

    var Alias_Scene_Map_createSpriteset = Scene_Map.prototype.createSpriteset;
    Scene_Map.prototype.createSpriteset = function() {
        Alias_Scene_Map_createSpriteset.call(this);
    this.createABSKeys();
  };

  Scene_Map.prototype.createABSKeys = function() {
    this._absSkillBar = new Sprite_Skillbar();
    this.addChild(this._absSkillBar);
  };
})();
