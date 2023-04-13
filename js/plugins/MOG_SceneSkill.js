//=============================================================================
// MOG_SceneSkill.js
//=============================================================================

/*:
 * @plugindesc (v1.0) Modifica a cena de habilidades.
 * @author Moghunter
 *
 * @param List Width
 * @desc Definição da largura da janela de lista de habilidades.
 * @default 370
 *
 * @param List Height
 * @desc Definição da altura da janela de lista de habilidades.
 * @default 370
 *
 * @param List X-Axis
 * @desc Definição X-Axis da janela da lista de habilidades.
 * @default 0
 *
 * @param List Y-Axis
 * @desc Definição Y-Axis da janela da lista de habilidades.
 * @default 126
 *
 * @param List Layout X-Axis
 * @desc Definição X-Axis do layout
 * @default -33
 *
 * @param List Layout Y-Axis
 * @desc Definição Y-Axis do layout.
 * @default -56
 *
 * @param Type Width
 * @desc Definição da largura da janela de tipos de habilidades.
 * @default 210
 *
 * @param Type Height
 * @desc Definição da altura da janela de tipos de habilidades.
 * @default 180
 *
 * @param Type X-Axis
 * @desc Definição X-Axis da janela de tipos de habilidades.
 * @default 0
 *
 * @param Type Y-Axis
 * @desc Definição Y-Axis da janela de tipos de habilidades.
 * @default 200
 *
 * @param Type Layout X-Axis
 * @desc Definição X-Axis do layout.
 * @default 0
 *
 * @param Type Layout Y-Axis
 * @desc Definição Y-Axis do layout.
 * @default -10
 *
 * @param Help X-Axis
 * @desc Definição X-Axis da janela de ajuda.
 * @default 0
 *
 * @param Help Y-Axis
 * @desc Definição Y-Axis da janela de ajuda.
 * @default 516
 *
 * @param SW X-Axis
 * @desc Definição X-Axis da janela do status do personagem.
 * @default 260
 *
 * @param SW Y-Axis
 * @desc Definição Y-Axis da janela do status do personagem.
 * @default 0
 *
 * @param SW Face X-Axis
 * @desc Definição X-Axis da face do personagem.
 * @default 10
 *
 * @param SW Face Y-Axis
 * @desc Definição Y-Axis da face do personagem.
 * @default 15
 *
 * @param SW Par X-Axis
 * @desc Definição X-Axis do parâmetros do personagem.
 * @default 0
 *
 * @param SW Par X-Axis
 * @desc Definição Y-Axis do parâmetros do personagem.
 * @default 0
 *
 * @param SW Par FontSize
 * @desc Definição do tamanho da fonte.
 * @default 22
 *
 * @param SW HP Meter X-Axis
 * @desc Definição X-Axis do medidor de HP.
 * @default 88
 *
 * @param SW HP Meter Y-Axis
 * @desc Definição Y-Axis do medidor de HP.
 * @default 38
 *
 * @param SW MP Meter X-Axis
 * @desc Definição X-Axis do medidor de MP.
 * @default 187
 *
 * @param SW MP Meter Y-Axis
 * @desc Definição Y-Axis do medidor de MP.
 * @default 38
 *
 * @param SW States X-Axis
 * @desc Definição X-Axis das condições
 * @default 214
 *
 * @param SW States Y-Axis
 * @desc Definição Y-Axis das condições.
 * @default 51
 *
 * @param Actor Windows X-Axis
 * @desc Definição X-Axis da janela do personagem.
 * @default 600
 *
 * @param Actor Windows Y-Axis
 * @desc Definição Y-Axis da janela do personagem .
 * @default 200
 *
 * @param Party Window X-Axis
 * @desc Definição X-Axis da janela do grupo.
 * @default 10
 *
 * @param Party Window Y-Axis
 * @desc Definição Y-Axis da janela do grupo.
 * @default 240
 *
 * @help  
 * =============================================================================
 * +++ MOG - Scene Skill (v1.0) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Modifica a cena de habilidades.
 *
 * =============================================================================
 * UTILIZAÇÃO
 * =============================================================================
 * As imagens do sistema deverão ser gravados na pasta.
 *
 * /img/menus/skill/
 *
 * =============================================================================
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_SceneSkill = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_SceneSkill');
  
	Moghunter.scSkill_ItemWindowWidth = Number(Moghunter.parameters['List Width'] || 370);
	Moghunter.scSkill_ItemWindowHeight = Number(Moghunter.parameters['List Height'] || 370);
	Moghunter.scSkill_ItemWindowX = Number(Moghunter.parameters['List X-Axis'] || 0);
	Moghunter.scSkill_ItemWindowY = Number(Moghunter.parameters['List Y-Axis'] || 126);  
	Moghunter.scSkill_WlayoutX = Number(Moghunter.parameters['List Layout X-Axis'] || -33);
	Moghunter.scSkill_WlayoutY = Number(Moghunter.parameters['List Layout Y-Axis'] || -56);	
	Moghunter.scSkill_TypeWindowWidth = Number(Moghunter.parameters['Type Width'] || 210);
	Moghunter.scSkill_TypeWindowHeight = Number(Moghunter.parameters['Type Height'] || 180);
	Moghunter.scSkill_TypeWindowX = Number(Moghunter.parameters['Type X-Axis'] || 0);
	Moghunter.scSkill_TypeWindowY = Number(Moghunter.parameters['Type Y-Axis'] || 200);  	
	Moghunter.scSkill_TlayoutX = Number(Moghunter.parameters['Type Layout X-Axis'] || 0);
	Moghunter.scSkill_TlayoutY = Number(Moghunter.parameters['Type Layout Y-Axis'] || -10);	
	Moghunter.scSkill_HelpWindowX = Number(Moghunter.parameters['Help X-Axis'] || 0);
	Moghunter.scSkill_HelpWindowY = Number(Moghunter.parameters['Help Y-Axis'] || 516);						
    Moghunter.scSkill_AS_X = Number(Moghunter.parameters['SW X-Axis'] || 260);					
	Moghunter.scSkill_AS_Y = Number(Moghunter.parameters['SW Y-Axis'] || 0);					
    Moghunter.scSkill_AS_FaceX = Number(Moghunter.parameters['SW Face X-Axis'] || 10);					
	Moghunter.scSkill_AS_FaceY = Number(Moghunter.parameters['SW Face Y-Axis'] || 15);
	Moghunter.scSkill_AS_ParX = Number(Moghunter.parameters['SW Par X-Axis'] || 0);		
	Moghunter.scSkill_AS_ParY = Number(Moghunter.parameters['SW Par X-Axis'] || 0);	
	Moghunter.scSkill_AS_ParFontSize = Number(Moghunter.parameters['SW Par FontSize'] || 22);	 					
	Moghunter.scSkill_AS_MeterHPX = Number(Moghunter.parameters['SW HP Meter X-Axis'] || 88);		
	Moghunter.scSkill_AS_MeterHPY = Number(Moghunter.parameters['SW HP Meter Y-Axis'] || 38);	
	Moghunter.scSkill_AS_MeterMPX = Number(Moghunter.parameters['SW MP Meter X-Axis'] || 187);		
	Moghunter.scSkill_AS_MeterMPY = Number(Moghunter.parameters['SW MP Meter Y-Axis'] || 38);	
	Moghunter.scSkill_AS_StatesX = Number(Moghunter.parameters['SW States X-Axis'] || 214);		
	Moghunter.scSkill_AS_StatesY = Number(Moghunter.parameters['SW States Y-Axis'] || 51);								
	Moghunter.scSkill_ActorWinX = Number(Moghunter.parameters['Actor Windows X-Axis'] || 600);
	Moghunter.scSkill_ActorWinY = Number(Moghunter.parameters['Actor Windows Y-Axis'] || 200); 				
    Moghunter.scSkill_PartyX = Number(Moghunter.parameters['Party Window X-Axis'] || 10); 
    Moghunter.scSkill_PartyY = Number(Moghunter.parameters['Party Window Y-Axis'] || 240);
	
//=============================================================================
// ** ImageManager
//=============================================================================

//==============================
// * Skill
//==============================
ImageManager.loadMenusskill = function(filename) {
    return this.loadBitmap('img/menus/skill/', filename, 0, true);
};

//=============================================================================
// ** Scene Skill
//=============================================================================

//==============================
// * creaate
//==============================
//변경 : 크리에이트 퀵슬롯 추가
Scene_Skill.prototype.create = function() {
    Scene_ItemBase.prototype.create.call(this);
    //this.createHelpWindow();
    //this.createSkillTypeWindow();
    //this.createStatusWindow();
    this.createItemWindow();
    //this.createActorWindow();
    //this.refreshActor();
    this.createMessageWindow();
};

var _mog_scnSkill_create = Scene_Skill.prototype.create;
Scene_Skill.prototype.create = function() {
    _mog_scnSkill_create.call(this);
	this.loadBitmaps();
	//this._statusWindow.visible = false;
    //this._helpWindow.opacity = 0;
	//this._helpWindow.x = Moghunter.scSkill_HelpWindowX;
	//this._helpWindow.y = Moghunter.scSkill_HelpWindowY;	
	//this._skillTypeWindow.width	 = Moghunter.scSkill_TypeWindowWidth;
	//this._skillTypeWindow.height = Moghunter.scSkill_TypeWindowHeight;
	//this._skillTypeWindow.x = Moghunter.scSkill_TypeWindowX;
	//this._skillTypeWindow.y = Moghunter.scSkill_TypeWindowY;
	//this._skillTypeOrg = [this._skillTypeWindow.x,this._skillTypeWindow.y];
	//this._skillTypeWindow.x = this._skillTypeOrg[0] - 200;
	//this._skillTypeWindow.contentsOpacity = 0;
	//this._skillTypeIndex = this._skillTypeWindow._index;
	this._wani = [-1,1,null];
};

//==============================
// * create Background
//==============================
var _mog_scSkill_createBackground = Scene_Skill.prototype.createBackground;
Scene_Skill.prototype.createBackground = function() {
	_mog_scSkill_createBackground.call(this);
	this._field = new Sprite();
	this.addChild(this._field);	
};

//==============================
// * create Item Window
//==============================
Scene_Skill.prototype.createItemWindow = function() {
	var ww = Moghunter.scSkill_ItemWindowWidth;
	var wh = Moghunter.scSkill_ItemWindowHeight;
	var wx = Moghunter.scSkill_ItemWindowX + ((Graphics.boxWidth / 2) - (ww / 2))-140;
    var wy = Moghunter.scSkill_ItemWindowY;
    this._itemWindow = new Window_SkillListM(wx, wy, ww, wh);
    //this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    //this._skillTypeWindow.setSkillWindow(this._itemWindow);
    this.addWindow(this._itemWindow);
    this._itemPosOrg = [this._itemWindow.x, this._itemWindow.y];
    this._itemWindow.activate();
    //this._itemWindow.selectLast();
};

Scene_Skill.prototype.createMessageWindow = function () {
    var ww = 280
    var wh = 400
    var wx = Moghunter.scSkill_ItemWindowX + ((Graphics.boxWidth / 2) - (ww / 2)) + 144;
    var wy = Moghunter.scSkill_ItemWindowY;
    this._messageWindow = new Window_SkillMessage(wx, wy, ww, wh);
    //this._skillTypeWindow.setSkillWindow(this._itemWindow);
    this._messageWindow.setBackgroundType(2);
    this._messageWindow.activate();
    //this._itemWindow.selectLast();
    this._messageWindow.icon = new Sprite();
    this._messageWindow.icon.bitmap = new Bitmap(32, 32);
    this._messageWindow.icon.x = 16;
    this._messageWindow.icon.y = 54;
    this._messageWindow.icon.scale.x = 2;
    this._messageWindow.icon.scale.y = 2;
    this._messageWindow._iconBitmap = ImageManager.loadSystem('IconSet');
    this._messageWindow.addChild(this._messageWindow.icon)
    this._messageWindow.lastItem = null;
    this.addWindow(this._messageWindow);
};

//변경 : 크리에이트 퀵윈도우 추가
Scene_Skill.prototype.createQuickWindow = function() {
    var wx = 12;	//this._statusWindow.width;
    var wy = 428;	//this._commandWindow.y + this._commandWindow.height;
    var ww = 300;	//Graphics.boxWidth - this._statusWindow.width;
    //var wh = 34;	//this._statusWindow.height - this._commandWindow.height;
    this._quickWindow = new Window_QuickSlot(wx, wy, ww);
    this._quickWindow.setActor(this.actor());
    this._quickWindow.setHelpWindow(this._helpWindow);
    this._quickWindow.setHandler('slot1',       this.commandSlot1.bind(this));
    this._quickWindow.setHandler('slot2',       this.commandSlot2.bind(this));
    this._quickWindow.setHandler('slot3',       this.commandSlot3.bind(this));
    this._quickWindow.setHandler('slot4',       this.commandSlot4.bind(this));
    this._quickWindow.setHandler('cancel',   this.onQuickCancel.bind(this));
    //this.activateQuickWindow();
    this._quickWindow.refresh;
    this.addWindow(this._quickWindow);
};

Scene_Skill.prototype.commandSlot1 = function () {
    $gameSystem.changeABSOverrideSkill(7, this.item().id)
    this._quickWindow.refresh();
    this.activateQuickWindow();
}

Scene_Skill.prototype.commandSlot2 = function () {
    $gameSystem.changeABSOverrideSkill(8, this.item().id)
    this._quickWindow.refresh();
    this.activateQuickWindow();
}

Scene_Skill.prototype.commandSlot3 = function () {
    $gameSystem.changeABSOverrideSkill(9, this.item().id)
    this._quickWindow.refresh();
    this.activateQuickWindow();
}

Scene_Skill.prototype.commandSlot4 = function () {
    $gameSystem.changeABSOverrideSkill(10, this.item().id)
    this._quickWindow.refresh();
    this.activateQuickWindow();
}

Scene_Skill.prototype.onQuickCancel = function() {
    this.hideSubWindow(this._quickWindow);
};

//변경 : 아이템 ok 덮어쓰기
Scene_Skill.prototype.onItemOk = function () {
    if (!this.item()) return false;
    this.actor().setLastMenuSkill(this.item());
    this.createQuickWindow();//this.activateQuickWindow();
    this.determineSkill();
};

//변경 : 스킬 determineItem에서 skill 하나 더 만듬
Scene_ItemBase.prototype.determineSkill = function() {
    var action = new Game_Action(this.user());
    var item = this.item();
    action.setItemObject(item);
    //actorWindow가 진짜 창 띄우기 이걸 quickWindow.equipForItem(this.item())으로 만들기
    this.showSubWindow(this._quickWindow);
    this._quickWindow.x = 300;
    //this._actorWindow.selectForItem(this.item());
    
};

Scene_Skill.prototype.slotEquip = function(slot) {
    for (var i = 0; i < 5; i++) {
        if ($gameParty._shortCut[i] == this.item().id) {
            //$gameSystem.changeABSOverrideSkill(i, null);
			$gameParty._shortCut[i] = $gameParty._shortCut[slot - 6];
    	}
    }
    //$gameSystem.absKeys()[i].skillId = this.item().id;
    //$gameSystem.changeABSOverrideSkill(slot, this.item().id);
    $gameParty._shortCut[slot - 6] = this.item().id;
}

//변경 : 
Scene_ItemBase.prototype.activateQuickWindow = function() {
    //this._quickWindow.refresh();
    this._quickWindow.activate();
};

//==============================
// * update Skill Type Window
//==============================
Scene_Skill.prototype.updateSkillTypeWindow = function() {
	if (SceneManager.isSceneChanging()) {return};
	  if (this._skillTypeWindow.active) {
		  this._skillTypeWindow.contentsOpacity += 10;
		  if (this._skillTypeWindow.x < this._skillTypeOrg[0]) {
			  this._skillTypeWindow.x += 10;
			  if (this._skillTypeWindow.x > this._skillTypeOrg[0]) {
				  this._skillTypeWindow.x = this._skillTypeOrg[0]
			  };
		  };
	  } else {
		  this._skillTypeWindow.contentsOpacity -= 10;
		  if (this._skillTypeWindow.x > this._skillTypeOrg[0] - 200) {
			  this._skillTypeWindow.x -= 10;
			  if (this._skillTypeWindow.x < this._skillTypeOrg[0] - 200) {
				  this._skillTypeWindow.x = this._skillTypeOrg[0] - 200;
			  };
		  };		  
	  };
};

//==============================
// * loadBitmaps
//==============================
Scene_Skill.prototype.loadBitmaps = function() {
	this._layImg = (ImageManager.loadMenusskill("Layout"));
	this._layItemImg = (ImageManager.loadMenusskill("ListLayout"));
	this._layTypeImg = (ImageManager.loadMenusskill("TypeLayout"));
};

//==============================
// * create Sprites
//==============================
//변경 : 퀵슬롯 레이아웃 추가
Scene_Skill.prototype.createSprites = function() {
	this.createLayout();
	this.createItemLayout();
    this.createTypeLayout();
    this.createMessageLayout();
	//this.createPartyData();
	//this.createActorData();
};

//==============================
// * create Actor Data
//==============================
Scene_Skill.prototype.createActorData = function() {
	this._ActorStatusWindow = new ActorStatusSkill(this.actor());
	this._ActorStatusWindow.x = Moghunter.scSkill_AS_X;
	this._ActorStatusWindow.y = Moghunter.scSkill_AS_Y;
	this._ActorOrg = [this._ActorStatusWindow.x,this._ActorStatusWindow.y];
	this._ActorStatusWindow.y = this._ActorOrg[1] - 100;
	this._ActorStatusWindow.opacity = 0;
	this._field.addChild(this._ActorStatusWindow);
};

//==============================
// * update Actor Status Window
//==============================
Scene_Skill.prototype.updateActorStatusWindow = function() {
	if (this._ActorStatusWindow.y < this._ActorOrg[1]) {this._ActorStatusWindow.y += 5
	    if (this._ActorStatusWindow.y > this._ActorOrg[1]) {this._ActorStatusWindow.y = this._ActorOrg[1]};
	};
	this._ActorStatusWindow.opacity += 10;
};

//==============================
// * create Sprites
//==============================
Scene_Skill.prototype.createLayout = function() {
	this._layout = new Sprite(this._layImg);
    this._field.addChild(this._layout);
};

//==============================
// * create Item Layout
//==============================
Scene_Skill.prototype.createItemLayout = function() {
	this._layoutItem = new Sprite(this._layItemImg);
	this._layoutItem.opacity = 0;
	this._field.addChild(this._layoutItem);
};

Scene_Skill.prototype.createMessageLayout = function () {
    this._layoutMessage = new Sprite(this._layItemImg);
    this._layoutMessage.opacity = 250;
    this._field.addChild(this._layoutMessage);
};

//==============================
// * create Type Layout
//==============================
Scene_Skill.prototype.createTypeLayout = function() {
	this._layoutType = new Sprite(this._layTypeImg);
	this._layoutType.opacity = 0;
	this._field.addChild(this._layoutType);
};

//==============================
// * update Type Layout
//==============================
Scene_Skill.prototype.updateTypeLayout = function() {
	this._layoutType.x = this._skillTypeWindow.x + Moghunter.scSkill_TlayoutX;
	this._layoutType.y = this._skillTypeWindow.y + Moghunter.scSkill_TlayoutY;
	this._layoutType.opacity = this._skillTypeWindow.contentsOpacity;

};

//==============================
// * update Item Layout
//==============================
Scene_Skill.prototype.updateItemLayout = function() {
	this._layoutItem.x = this._itemWindow.x + Moghunter.scSkill_WlayoutX;
	this._layoutItem.y = this._itemWindow.y + Moghunter.scSkill_WlayoutY;
	this._layoutItem.opacity = this._itemWindow.contentsOpacity;

};

Scene_Skill.prototype.updateMessageLayout = function () {/*
 * //300, 400
    this._layoutMessage.x = 400
    this._layoutMessage.y = this._itemWindow.y + Moghunter.scSkill_WlayoutY;
    this._layoutMessage.opacity = this._itemWindow.contentsOpacity;


   // this.changeTextColor(this.mpCostColor());
    this.drawText('message Test', 200+300, 300, 600, 'left');

    this._layoutMessage.opacity = 250;*/
    if (!this.item()) return;
    if (this.item() != this._messageWindow.lastItem) {
        this._messageWindow.contents.clear();
        this._messageWindow.icon.bitmap.clear();
        var item = this.item();
        this._messageWindow.contents.fontSize = 32;
        this._messageWindow.contents.textColor = '#ffffff';
        this._messageWindow.contents._smooth = true
        this._messageWindow.contents.outlineWidth = 4;
        this._messageWindow.contents.outlineColor = "rgba(0,0,0,0.8)";
        this._messageWindow.drawText(item.name, 0, 0, 242, 'center');
        //drawIconZoom
        var iconIndex = item.iconIndex;
        var zoom = 2;
        var pw = 32;
        var ph = 32;
        var sx = iconIndex % 16 * pw;
        var sy = Math.floor(iconIndex / 16) * ph;
        var zoomValue = pw * zoom;
        this._messageWindow.icon.bitmap.blt(this._messageWindow._iconBitmap, sx, sy, pw, ph, 0, 0, 32, 32);
        //drawcontents
        this._messageWindow.contents.fontSize = 16;
        this._messageWindow.contents.outlineWidth = 3;
        switch (item.rarity) {
            case 1:
                this._messageWindow.contents.textColor = '#ffffff';
				this._messageWindow.drawText('Common', 72, 38, 260, 'left');
                break;
            case 2:
                this._messageWindow.contents.textColor = '#ffffff';
				this._messageWindow.drawText('Uncommon', 72, 38, 260, 'left');
                break;
            case 3:
                this._messageWindow.contents.textColor = '#ffffff';
				this._messageWindow.drawText('Rare', 72, 38, 260, 'left');
                break;
            case 4:
                this._messageWindow.contents.textColor = '#ffffff';
				this._messageWindow.drawText('Unique', 72, 38, 260, 'left');
                break;
            default:
				this._messageWindow.drawText('Common', 72, 38, 260, 'left');
                break;
        }
        switch (item.stypeId) {
            case 1:
                this._messageWindow.contents.textColor = '#ffffff';
				this._messageWindow.drawText('Physical', 2, 38, 240, 'right');
                break;
            case 2:
                this._messageWindow.contents.textColor = '#ff0000';
				this._messageWindow.drawText('Fire', 2, 38, 240, 'right');
                break;
            case 3:
                this._messageWindow.contents.textColor = '#0000ff';
				this._messageWindow.drawText('Ice', 2, 38, 240, 'right');
                break;
            case 4:
                this._messageWindow.contents.textColor = '#00ff00';
				this._messageWindow.drawText('Wind', 2, 38, 240, 'right');
				break;
			case 5:
				this._messageWindow.contents.textColor = '#ffff00';
				this._messageWindow.drawText('Lightning', 2, 38, 240, 'right');
				break;
			case 6:
				this._messageWindow.contents.textColor = '#faffaf';
				this._messageWindow.drawText('Light', 2, 38, 240, 'right');
				break;
			case 7:
				this._messageWindow.contents.textColor = '#2f2f2f';
				this._messageWindow.drawText('Darkness', 2, 38, 240, 'right');
				break;
            default:
                this._messageWindow.contents.textColor = '#ffffff';
				this._messageWindow.drawText('No attribute', 2, 38, 240, 'right');
                break;
        }
        this._messageWindow.contents.textColor = '#ffffff';
		this._messageWindow.drawText('Cooldown ' + Math.floor(QPlus.stringToObj(item.qmeta.absSettings).cooldown / 60) +'초', 72, 64, 240, 'left');

        this._messageWindow.contents.fontSize = 24;
        this._messageWindow.contents.textColor = '#ff8f4b'; 
        this._messageWindow.drawText(item.message1, 2, 98, 240, 'left');

		var desc = item.description;
		//desc = desc.replace('\n', '')
        this._messageWindow.contents.fontSize = 16;
		this._messageWindow.contents.textColor = '#ffffff';
        this._messageWindow.drawTextSkill(desc, 2, 128);
        //if (desc.length > 16) this._messageWindow.drawTextEx2(desc.substr(16, 16), 2, 148);
        //if (desc.length > 32) this._messageWindow.drawTextEx2(desc.substr(32, 16), 2, 168);
        //if (desc.length > 48) this._messageWindow.drawTextEx2(desc.substr(48, 16), 2, 188);
        //if (desc.length > 64) this._messageWindow.drawTextEx2('error : description overflow', 2, 128, 240, 'left');

        this._messageWindow.contents.fontSize = 24;
		this._messageWindow.drawText('Special effect', 2, 232, 240, 'left');

        var levelEffect = item.message2.split('\\n');
        this._messageWindow.contents.fontSize = 16;
        this._messageWindow.contents.textColor = '#ffe719';
        var skillLv = (item.id - 1) % 5 + 1;
        for (var i = 0; i < skillLv - 1; i++) {
            if (i == levelEffect.length) this._messageWindow.drawText('Lv.Max: ' + levelEffect[i], 4, 264 + 20 * i, 240, 'left');
            else this._messageWindow.drawText('Lv.' + (i + 2) + ': ' + levelEffect[i], 4, 264 + 20 * i, 240, 'left');
        }
        this._messageWindow.contents.textColor = '#979fa8';
        if (skillLv <= levelEffect.length+1) {
            for (var i = skillLv; i < levelEffect.length + 1; i++) {
                if (i == levelEffect.length) {
                    if ($gameSwitches._data[1000 + item.id + i - skillLv + 1]) this._messageWindow.drawText('Lv.Max: ' + levelEffect[i - 1], 4, 264 + 20 * (i - 1), 240, 'left');
                    else {
                        this._messageWindow.drawText('Lv.Max: ?', 4, 264 + 20 * (i - 1), 240, 'left');
                        break;
                    }
                }else if ($gameSwitches._data[1000 + item.id + i - skillLv+1]) this._messageWindow.drawText('Lv.' + (i+1) + ': ' + levelEffect[i-1], 4, 264 + 20 * (i-1), 240, 'left');
                else {
                    this._messageWindow.drawText('Lv.' + (i+1) + ': ?', 4, 264 + 20 * (i-1), 240, 'left');
                    break;
                }
            }
        }
        //this._messageWindow.drawIcon(897, 0, 28);
        /*this.bitmap.fontSize = 32;
        this.bitmap.textColor = '#ffffa0';
        this.bitmap.drawText('message Test', 0, 0, 200, this.width, 36, 'center');*/

        this._messageWindow.lastItem = this.item();
    }

};
//==============================
// * update Default Window
//==============================
//변경 : 퀵윈도우 추가
Scene_Skill.prototype.updateDefaultWindow = function() {
    //this._helpWindow.opacity = 0;
	//this._statusWindow.opacity = 0;
	//this._skillTypeWindow.opacity = 0;
};

//==============================
// * refresh Type Index
//==============================
Scene_Skill.prototype.refreshTypeIndex = function() {
    this._skillTypeIndex = this._skillTypeWindow._index;
	this._wani = [1,1,null];
	this._itemWindow.contentsOpacity = 0;
	this._itemWindow.x = this._itemPosOrg[0] - 50;
};

//==============================
// * update Commands
//==============================
Scene_Skill.prototype.updateCommands = function() {
	if (this._wani[0] != 0) {return};
 //   if (this._itemWindow.active) {
	//	 if (Input.isTriggered('right')) {this._wani = [1,0,null]; SoundManager.playCursor()};
 //        if (Input.isTriggered('left')) {this._wani = [-1,0,null]; SoundManager.playCursor()};
	//} else {
	//	 if (this._skillTypeIndex != this._skillTypeWindow._index) {this.refreshTypeIndex()};
	//};
};

Scene_Skill.prototype.onItemCancel = function () {
    this._itemWindow.deselect();
    this.popScene();
};

//==============================
// * addCatIndex
//==============================
Scene_Skill.prototype.addCatIndex = function(value) {
      this._skillTypeWindow._index += value;
	 if (this._skillTypeWindow._index >= this._skillTypeWindow.maxItems()) {this._skillTypeWindow._index = 0};
	 if (this._skillTypeWindow._index < 0) {this._skillTypeWindow._index = this._skillTypeWindow.maxItems() - 1};
	 if (this._wani[2] != null) { this._skillTypeWindow._index = this._wani[2]}
	 this._skillTypeWindow.update();
	 this._itemWindow.select(0);
	 //this._itemWindow.updateHelp();
	 this._skillTypeWindow.contentsOpacity = 0;
	 this._skillTypeWindow.opacity = 0;
};

//==============================
// * addCatIndex
//==============================
Scene_Skill.prototype.updateItemWindow = function() {
    if (this._wani[0] != 0) {
		if (this._wani[0] === 1){
			this.waniSlideRight();
		} else {
			this.waniSlideLeft();
		};
	};
	if (this._wani[0] === 0) {
	    if (this._itemWindow.active) {
            this._itemWindow.contentsOpacity += 15;
    	} else {
		    if (this._itemWindow.contentsOpacity > 160) {
				this._itemWindow.contentsOpacity -= 15;
			};
	    };
	};
};

//==============================
// * wani Slide Right
//==============================
Scene_Skill.prototype.waniSlideRight = function() {
	if (this._wani[1] === 0 ) {
	    this._itemWindow.x += 5
		this._itemWindow.contentsOpacity -= 25;
		if (this._itemWindow.contentsOpacity <= 0) {
			this._wani[1] = 1;
			this._itemWindow.x = this._itemPosOrg[0] - 50;
			this.addCatIndex(this._wani[0])
		};
	} else {
	    this._itemWindow.x += 5
		this._itemWindow.contentsOpacity += 25;	
		if (this._itemWindow.x >= this._itemPosOrg[0]) {
			this._itemWindow.x = this._itemPosOrg[0];
			this._itemWindow.contentsOpacity = 255;
			this._wani = [0,0,null];
		};
		if (this._skillTypeWindow.active && this._itemWindow.contentsOpacity > 160) {this._itemWindow.contentsOpacity = 160}
	};
};

//==============================
// * wani Slide Left
//==============================
Scene_Skill.prototype.waniSlideLeft = function() {
	if (this._wani[1] === 0 ) {
	    this._itemWindow.x -= 5
		this._itemWindow.contentsOpacity -= 25;
		if (this._itemWindow.contentsOpacity <= 0) {
			this._wani[1] = 1;
			this._itemWindow.x = this._itemPosOrg[0] + 50;
			this.addCatIndex(this._wani[0])
		};
	} else {
	    this._itemWindow.x -= 5
		this._itemWindow.contentsOpacity += 25;	
		if (this._itemWindow.x <= this._itemPosOrg[0]) {
			this._itemWindow.x = this._itemPosOrg[0];
			this._itemWindow.contentsOpacity = 255;
            this._wani = [0,0,null];
		};
	};
};

//==============================
// * checkTouchOn Sprites
//==============================
Scene_Skill.prototype.checkTouchOnSprites = function() {
    if (this._actorWindow.active) {
	  	 var touch = false;
	     for (var i = 0; i < this._partyWindow.length; i++) {
		       if (this.isOnSprite2(this._partyWindow[i])) {this.setTouchParty(i);touch = true};
		 };
		 if (!this._actorWindow._cursorAll) {
			for (var i = 0; i < this._partyArrow.length; i++) {
				if (this.isOnSprite( this._partyArrow[i])) {this.setTouchArrow(i);touch = true};
			};
		 };
		 if (!touch) {
			 if (this.isOnSprite3(this._itemWindow)) {this.setTouchCancelPartyWindow()};
		 };
	 } else if (this._skillTypeWindow.active) {
		    if (this.isOnSprite3(this._itemWindow)) {this.setTouchOnWindow()};
	 } else if (this._itemWindow.active && !this.isOnSprite3(this._itemWindow)) {		
			 this._itemWindow.active = false;
		     this._skillTypeWindow.active = true;
	 };
};

//==============================
// * setTouchCancelPartyWindow
//==============================
Scene_Skill.prototype.setTouchCancelPartyWindow = function() {
	  this._itemWindow.active = true;
	  this._actorWindow.active = false;
	  this._actorWindow._cursorAll = false;
};

//==============================
// * Set Touch On Window
//==============================
Scene_Skill.prototype.setTouchOnWindow = function() {
	  //this._skillTypeWindow.active = false;
	  this._itemWindow.active = true;
	  this._itemWindow.select(0);
};


//==============================
// * Set Touch Party
//==============================
Scene_Skill.prototype.setTouchParty = function(index) {
	var pIndex = this._actorWindow._index
      this._actorWindow._index = index;
	  this._actorWindow.processOk();
      this._actorWindow._index = pIndex;
};

//==============================
// * Set Touch Arrow
//==============================
Scene_Skill.prototype.setTouchArrow = function(index) {
   if (index === 0) {
	    this.addIndexActorWindow(1);  
   } else {
	   this.addIndexActorWindow(-1);
   };
};

//==============================
// * Set Touch Type
//==============================
Scene_Skill.prototype.setTouchType = function(index) {
   this._wani = [1,0,index];
    SoundManager.playCursor();
};

//==============================
// * add Index Actor Window
//==============================
Scene_Skill.prototype.addIndexActorWindow = function(value) {
    this._actorWindow._index += value;
	if (this._actorWindow._index >= $gameParty.members().length) {this._actorWindow._index = 0};
	if (this._actorWindow._index < 0) {this._actorWindow._index = $gameParty.members().length - 1};
	SoundManager.playCursor();
};

//==============================
// * on Sprite
//==============================
Scene_Skill.prototype.isOnSprite = function(sprite) {
	 var cw = sprite.bitmap.width / 2;
	 var ch = sprite.bitmap.height / 2;
	 if (sprite.visible === false) {return false};
	 if (sprite.opacity === 0) {return false};
	 if (TouchInput.x < sprite.x - cw) {return false};
	 if (TouchInput.x > sprite.x + cw) {return false};
	 if (TouchInput.y < sprite.y - ch) {return false};
	 if (TouchInput.y > sprite.y + ch) {return false};
	 return true;	
};

//==============================
// * on Sprite
//==============================
Scene_Skill.prototype.isOnSprite2 = function(sprite) {
	 var cw = sprite.bitmap.width;
	 var ch = sprite.bitmap.height;
	 if (sprite.visible === false) {return false};
	 if (sprite.opacity === 0) {return false};
	 if (TouchInput.x < sprite.x ) {return false};
	 if (TouchInput.x > sprite.x + cw) {return false};
	 if (TouchInput.y < sprite.y ) {return false};
	 if (TouchInput.y > sprite.y + ch) {return false};
	 return true;	
};

//==============================
// * on Sprite
//==============================
Scene_Skill.prototype.isOnSprite3 = function(sprite) {
	 var cw = sprite.width;
	 var ch = sprite.height;
	 if (sprite.visible === false) {return false};
	 if (sprite.contentsOpacity === 0) {return false};
	 if (TouchInput.x < sprite.x ) {return false};
	 if (TouchInput.x > sprite.x + cw) {return false};
	 if (TouchInput.y < sprite.y ) {return false};
	 if (TouchInput.y > sprite.y + ch) {return false};
	 return true;	
};

//==============================
// * update Touch Screen
//==============================
Scene_Skill.prototype.updateTouchScreen = function() {
    if (TouchInput.isTriggered()) {this.checkTouchOnSprites()};
};


//==============================
// * update Actor Status
//==============================
Scene_Skill.prototype.updateActorStatus = function() {
	if (this._actorStatusIndex != this._actorWindow._index) {this.refreshStatusActor()};
	this._actorWindow.visible = false;
	this._actorWindow.x = -this._actorWindow.width;
	if (this._actorDataWindow) {this.updateActorDataWindow()};
};

//==============================
// * update Actor Data Window
//==============================
Scene_Skill.prototype.updateActorDataWindow = function() {
	if (this._actorWindow.active) {
	    var nx = Moghunter.scItem_ActorWinX;
	    var ny = Moghunter.scItem_ActorWinY;
		 this._actorDataWindow.opacity += 15;
    } else { 
	    var nx = Moghunter.scItem_ActorWinX + 100;
	    var ny = Moghunter.scItem_ActorWinY;	
		this._actorDataWindow.opacity -= 15;
    };
    this._actorDataWindow.x = this.commandMoveTo(this._actorDataWindow.x,nx,20);
	this._actorDataWindow.y = this.commandMoveTo(this._actorDataWindow.y,ny,20);
	this.updatePartyWindow();
};

//==============================
// * Command Move To
//==============================
Scene_Skill.prototype.commandMoveTo = function(value,real_value,speed) {
	if (value == real_value) {return value};
	var dnspeed = 3 + (Math.abs(value - real_value) / speed);
	if (value > real_value) {value -= dnspeed;
	    if (value < real_value) {value = real_value};}
    else if (value < real_value) {value  += dnspeed;
    	if (value  > real_value) {value  = real_value};		
    };
	return Math.floor(value);
};	

//==============================
// * refresh Status Actor
//==============================
Scene_Skill.prototype.refreshStatusActor = function() {
	this._actorStatusIndex = this._actorWindow._index;
	this._actorStatus = $gameParty.members()[this._actorWindow._index];
	if (this._actorStatus && !this._actorDataWindow) {this.createActorDataWindow()
	} else {
	   if (this._actorStatus) {
		   this._actorDataWindow.setActor(this._actorStatus)
	       this._actorDataWindow.x = Moghunter.scItem_ActorWinX + 100;
		   this._actorDataWindow.y = Moghunter.scItem_ActorWinY;	
	       this._actorDataWindow.opacity = 0;		   
	  };	
	};
};

//==============================
// * create Actor Data Window
//==============================
Scene_Skill.prototype.createActorDataWindow = function() {
	this._actorDataWindow = new ActorDataWindow();
	this._actorDataWindow.x = Moghunter.scSkill_ActorWinX + 100;
	this._actorDataWindow.y = Moghunter.scSkill_ActorWinY;	
	this._actorDataWindow.opacity = 0;
	this._actorDataWindow.setActor(this._actorStatus);
	this.addChild(this._actorDataWindow);
};

//==============================
// * create Party Data
//==============================
Scene_Skill.prototype.createPartyData = function() {
    this._partyWindow = [];
	this._partyPos = [];
	this._partyAni = [];
	this._partyPos[0] = [Moghunter.scSkill_PartyX,Moghunter.scSkill_PartyY];
	this._partyPos[1] = [Moghunter.scSkill_PartyX - 290,Moghunter.scSkill_PartyY];
	this._partyPos[2] = [Moghunter.scSkill_PartyX - 20,Moghunter.scSkill_PartyY - 100];
	this._partyPos[3] = [Moghunter.scSkill_PartyX - 20,Moghunter.scSkill_PartyY + 100];
	for (var i = 0; i < $gameParty.members().length; i++) {
		this._partyWindow[i] = new PartyWindowData($gameParty.members()[i]);
		this._partyWindow[i].opacity = 0;
		this._partyAni[i] = [0,0];
		this.addChild(this._partyWindow[i]);
	};
	this.createPartyArrow();
	this.createAllMembersScope();
};

//==============================
// * refresh Part Data
//==============================
Scene_Skill.prototype.refreshPartyData = function() {
	for (var i = 0; i < this._partyWindow.length; i++) {
		this._partyWindow[i].refresh();
	};
	this._actorDataWindow.refresh();
	this._ActorStatusWindow.refresh();
};

//==============================
// * On Actor Change
//==============================
var _mog_scskillM_onActorChange = Scene_Skill.prototype.onActorChange;
Scene_Skill.prototype.onActorChange = function() {
	_mog_scskillM_onActorChange.call(this);
	this._ActorStatusWindow._actor = this.actor();
	this._ActorStatusWindow.refresh();
	this._ActorStatusWindow.y = this._ActorOrg[1] - 100;
	this._ActorStatusWindow.opacity = 0;
	this._skillTypeWindow.x = this._skillTypeOrg[0] - 200;
	this._wani = [1,1,null];
	this._itemWindow.contentsOpacity = 0;
	this._itemWindow.x = this._itemPosOrg[0] - 50;	
};


//==============================
// * update Party Window
//==============================
Scene_Skill.prototype.updatePartyWindow = function() {
	 for (var i = 0; i < this._partyWindow.length; i++) {
		 if (this._actorWindow.active) {
			 var c = this._actorWindow._index;
			 var n = this._actorWindow._index + 1;
			 var p = this._actorWindow._index - 1;
			 if (n >= $gameParty.members().length) {n = 0};
			 if (p < 0) {p = $gameParty.members().length - 1};
			 if (i === c) {
		         var nx = this._partyPos[0][0];
			     var ny = this._partyPos[0][1];
				 this._partyWindow[i].opacity += 25;
				 this.updateSlidePartyWin(i);	
			 } else {
				 this._partyAni[i] = [0,0];
				 if (p === i) {
					 var nx = this._partyPos[2][0];
					 var ny = this._partyPos[2][1];
				 } else if (n === i) {
					 var nx = this._partyPos[3][0];
					 var ny = this._partyPos[3][1];					 
				 } else {
					 var nx = this._partyPos[1][0];
					 var ny = this._partyPos[1][1];				 
				 };
				 if (this._partyWindow[i].opacity > 160) {
					 this._partyWindow[i].opacity -= 15;
					 if (this._partyWindow[i].opacity < 160) {
						 this._partyWindow[i].opacity = 160;
					 };
			     } else if (this._partyWindow[i].opacity < 160) {
					 this._partyWindow[i].opacity += 15;
					 if (this._partyWindow[i].opacity > 160) {
						 this._partyWindow[i].opacity = 160;
					 };					 
				 };
			 };
		 } else {
		     var nx = this._partyPos[1][0];
			 var ny = this._partyPos[1][1];
			 this._partyAni[i] = [0,0];
			 this._partyWindow[i].opacity -= 25;
		 };
		 nx += this._partyAni[i][0];
		 this._partyWindow[i].x = this.commandMoveTo(this._partyWindow[i].x,nx,20);
		 this._partyWindow[i].y = this.commandMoveTo(this._partyWindow[i].y,ny,20);
	 };
	 this.updatePartyArrow();
     this.updateAllMembersSprite();
};

//==============================
// * update Slide Party Win
//==============================
Scene_Skill.prototype.updateSlidePartyWin = function(i) {
	this._partyAni[i][1]++;
	if (this._partyAni[i][1] < 30) {
		this._partyAni[i][0] += 0.2;
	} else if (this._partyAni[i][1] < 60) {
	    this._partyAni[i][0] -= 0.2;
	} else {
		this._partyAni[i] = [0,0];
	};
};

//==============================
// * update Party Arrow
//==============================
Scene_Skill.prototype.updatePartyArrow = function() {
	for (var i = 0; i < this._partyArrow.length; i++) {
		 if (this._actorWindow.active) {
			 this.updateSlidePartyArrow();
			 var cw = this._partyWindow[0].width / 2;
			 var ch = this._partyWindow[0].height;
		     if (i === 0) {
				 var nx = this._partyPos[2][0] + cw;
				 var ny = this._partyPos[2][1] - this._partyArrow[i].height;	
				  ny += this._partyArrowAni[0];				 
			 } else {
				 var nx = this._partyPos[3][0] + cw;
				 var ny = this._partyPos[3][1] + ch + this._partyArrow[i].height;	
				  ny += -this._partyArrowAni[0];
			 };
			 this._partyArrow[i].opacity += 15;
	     } else {
		     var nx = this._partyPos[1][0];
			 var ny = this._partyPos[1][1];
			 this._partyArrow[i].opacity -= 15;		
	     };
		 this._partyArrow[i].x = this.commandMoveTo(this._partyArrow[i].x,nx,20);
		 this._partyArrow[i].y = this.commandMoveTo(this._partyArrow[i].y,ny,20);			 
	};
};

//==============================
// * update Slide Party Arrow
//==============================
Scene_Skill.prototype.updateSlidePartyArrow = function() {
	this._partyArrowAni[1]++;
	if (this._partyArrowAni[1] < 50) {
		this._partyArrowAni[0] += 0.14;
	} else if (this._partyArrowAni[1] < 100) {
	    this._partyArrowAni[0] -= 0.14;
	} else {
		this._partyArrowAni = [0,0];
	};
};

//==============================
// * create Party Arrow
//==============================
Scene_Skill.prototype.createPartyArrow = function() {
	this._partyArrow = [];
	this._partyArrowAni = [0,0];
	for (var i = 0; i < 2; i++) {
        this._partyArrow[i] = new Sprite(ImageManager.loadMenusActor("Arrow"));
		this._partyArrow[i].anchor.x = 0.5;
		this._partyArrow[i].anchor.y = 0.5;
		if ($gameParty.members().length < 4) {this._partyArrow[i].visible = false};
		if (i === 1) {this._partyArrow[i].scale.y = -1.00};
		this._partyArrow[i].opacity = 0;
		this.addChild(this._partyArrow[i]);
	};	
};

//==============================
// * create All Members Scope
//==============================
Scene_Skill.prototype.createAllMembersScope = function() {
     this._almSprite = new Sprite(ImageManager.loadMenusActor("AllMembers"));
	 this._almSprite.anchor.x = 0.5;
	 this._almSprite.anchor.y = 0.5;
	 this._almSprite.visible = false;
     this.addChild(this._almSprite);
};

//==============================
// * updateAllMembers Sprite
//==============================
Scene_Skill.prototype.updateAllMembersSprite = function() {
	 this._almSprite.x = this._partyPos[0][0] + (this._partyWindow[0].width / 2);
	 this._almSprite.y = this._partyPos[0][1] + (this._partyWindow[0].height / 2);
	 this._almSprite.visible = this._actorWindow._cursorAll;
};

//==============================
// * on Actor Cancel
//==============================
var _mog_scSkill_onActorCancel = Scene_Skill.prototype.onActorCancel;
Scene_Skill.prototype.onActorCancel = function() {
    _mog_scSkill_onActorCancel.call(this);
	this._actorWindow._cursorAll = false;
};

//==============================
// * refresh Actor WD
//==============================
Scene_Skill.prototype.refreshActorWD = function() {
	 $gameTemp._refreshScActorWd = false;
	for (var i = 0; i < this._partyWindow.length; i++) {
		this._partyWindow[i].refresh();
	};
	this._actorDataWindow.refresh();
	this._ActorStatusWindow.refresh();
};	

Scene_Skill.prototype.refreshActor = function() {
    var actor = this.actor();
    //this._skillTypeWindow.setActor(actor);
    //this._statusWindow.setActor(actor);
    this._itemWindow.setActor(actor);
    //this._quickWindow.setActor(actor);
};
//==============================
// * process OK
//==============================
var _mog_scSkill_wmact_useItem = Scene_Skill.prototype.useItem;
Scene_Skill.prototype.useItem = function() {
    _mog_scSkill_wmact_useItem.call(this);
	//this.refreshActorWD()
};

//==============================
// * update
//==============================
var _mog_scnSkill_update = Scene_Skill.prototype.update;
Scene_Skill.prototype.update = function() {
    _mog_scnSkill_update.call(this);
	//this.updateDefaultWindow();
	if (!this._layout) {
		if (this._layImg.isReady()) {this.createSprites()};
		return
	};
	
	// #V Shortcut for Close Skill Scene
    if (Input.isTriggered('#v')) {
        if (SceneManager._scene instanceof Scene_Skill) {
            SceneManager.pop();
        } else {
            SceneManager.push(Scene_Skill);
        }
    }
    //this.updateItemWindow();
	//this.updateCommands();
	//this.updateTouchScreen();
	//if (this._skillTypeWindow) {this.updateSkillTypeWindow()};
	//if (this._ActorStatusWindow) {this.updateActorStatusWindow()};
	//if (this._actorWindow) {this.updateActorStatus()};
    if (this._layoutItem) { this.updateItemLayout() };
    if (this._layoutMessage) { this.updateMessageLayout() };
	//if (this._layoutType) {this.updateTypeLayout()};
};


//=============================================================================
// * Window Skill Message
//=============================================================================
function Window_SkillMessage() {
    this.initialize.apply(this, arguments);
}

Window_SkillMessage.prototype = Object.create(Window_Base.prototype)
Window_SkillMessage.prototype.constructor = Window_SkillMessage;

Window_SkillMessage.prototype.initialize = function (x,y,width,height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height)
    this._text = '';
}

Window_SkillMessage.prototype.setText = function (text) {
    if (this._text !== text) {
        this._text = text;
        this.refresh();
    }
};

Window_SkillMessage.prototype.clear = function () {
    this.setText('');
}

Window_SkillMessage.prototype.refresh = function () {
    this.contents.clear();
    this.drawTextEx(this._text, this.textPadding(), 0);
};


//=============================================================================
// * Window Skill List M
//=============================================================================
function Window_SkillListM() {
    this.initialize.apply(this, arguments);
}

Window_SkillListM.prototype = Object.create(Window_Selectable.prototype);
Window_SkillListM.prototype.constructor = Window_SkillListM;

//==============================
// * Initialize
//==============================
Window_SkillListM.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._actor = null;
    this._stypeId = 0;
    this._data = [];
    this.setBackgroundType(2);
};

//==============================
// * set Actor
//==============================
Window_SkillListM.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
        this.resetScroll();
    }
};

//==============================
// * setStypeID
//==============================
Window_SkillListM.prototype.setStypeId = function(stypeId) {
    if (this._stypeId !== stypeId) {
        this._stypeId = stypeId;
        this.refresh();
        this.resetScroll();
    };
};

//==============================
// * max Cols
//==============================
Window_SkillListM.prototype.maxCols = function() {
    return 1;
};


//==============================
// * spacing
//==============================
Window_SkillListM.prototype.spacing = function() {
    return 48;
};

//==============================
// * maxItems
//==============================
Window_SkillListM.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

//==============================
// * Item
//==============================
Window_SkillListM.prototype.item = function() {
    return this._data && this.index() >= 0 ? this._data[this.index()] : null;
};

//==============================
// * Is Current Item Enabled
//==============================
Window_SkillListM.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this._data[this.index()]);
};

//==============================
// * Includes
//==============================
Window_SkillListM.prototype.includes = function (item) {
    return item && item.occasion == 2;
};

//==============================
// * Is Item Enabled
//==============================
Window_SkillListM.prototype.isEnabled = function(item) {
    return this._actor;
};

//==============================
// * make Item List
//==============================
Window_SkillListM.prototype.makeItemList = function() {
    if (this._actor) {
        this._data = this._actor.skills().filter(function(item) {
            return this.includes(item);
        }, this);
    } else {
        this._data = [];
    }
};

//==============================
// * Select Last
//==============================
Window_SkillListM.prototype.selectLast = function() {
    var skill;
    if ($gameParty.inBattle()) {
        skill = this._actor.lastBattleSkill();
    } else {
        skill = this._actor.lastMenuSkill();
    }
    var index = this._data.indexOf(skill);
    this.select(index >= 0 ? index : 0);
};

//==============================
// * Draw Item
//==============================
Window_SkillListM.prototype.drawItem = function(index) {
    var skill = this._data[index];
    if (skill) {
        var costWidth = this.costWidth();
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();
        this.changePaintOpacity(this.isEnabled(skill));
        this.drawItemName(skill, rect.x, rect.y, rect.width - costWidth);
        this.drawSkillCost(skill, rect.x, rect.y, rect.width);
        this.drawSkillMessage(skill, rect.x, rect.y, rect.width)
        this.changePaintOpacity(1);
    }
};

//==============================
// * cost Width
//==============================
Window_SkillListM.prototype.costWidth = function() {
    return this.textWidth('000');
};

//==============================
// * draw Skill Cost
//==============================
Window_SkillListM.prototype.drawSkillCost = function(skill, x, y, width) {
    if (this._actor.skillTpCost(skill) > 0) {
        this.changeTextColor(this.tpCostColor());
        this.drawText(this._actor.skillTpCost(skill), x, y, width, 'right');
    } else if (this._actor.skillMpCost(skill) > 0) {
        this.changeTextColor(this.mpCostColor());
        this.drawText(this._actor.skillMpCost(skill), x, y, width, 'right');
    }
};

Window_SkillListM.prototype.drawSkillMessage = function (skill, x, y, width) {
    this.changeTextColor(this.mpCostColor());
    this.drawText(skill.message2, x+300, y, width, 'left');
};

//==============================
// * update Help
//==============================
Window_SkillListM.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
};

//==============================
// * Refresh
//==============================
Window_SkillListM.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_SkillListM.prototype.processOk = function () {
    if (!this.item()) return;
    if (this.isCurrentItemEnabled()) {
        this.playOkSound();
        this.updateInputData();
        this.deactivate();
        this.callOkHandler();
    } else {
        this.playBuzzerSound();
    }
};

//변경 : 이 아래로 퀵슬롯 추가
//=============================================================================
//* Window Quick Slot
//=============================================================================
function Window_QuickSlot() {
this.initialize.apply(this, arguments);
}

//변경 : Window_QuickSlot.prototype = Object.create(Window_HorzCommand.prototype);
Window_QuickSlot.prototype = Object.create(Window_HorzCommand.prototype);
Window_QuickSlot.prototype.constructor = Window_QuickSlot;
//==============================
//* Initialize
//==============================
//변경 : 

Window_QuickSlot.prototype.initialize = function(x, y, width) {
	this._windowWidth = width;
    Window_HorzCommand.prototype.initialize.call(this, x, y);
	this._actor = null;
	this._data = [];
};
//==============================
//* set Actor
//==============================
Window_QuickSlot.prototype.setActor = function(actor) {
if (this._actor !== actor) {
   this._actor = actor;
   this.refresh();
   this.resetScroll();
}
};

//==============================
//* setStypeID
//==============================

//==============================
//* max Cols
//==============================
//변경 : 
Window_QuickSlot.prototype.maxCols = function() {
return 4;
};

//변경 : 
Window_QuickSlot.prototype.windowWidth = function() {
return this._windowWidth;
};

//변경 : 
Window_QuickSlot.prototype.makeCommandList = function() {
	this.addCommand('1',   'slot1');
	this.addCommand('2',   'slot2');
	this.addCommand('3',   'slot3');
	this.addCommand('4',   'slot4');
};

//==============================
//* spacing
//==============================

//==============================
//* maxItems
//==============================
/*Window_QuickSlot.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};*/
//==============================
//* Item
//==============================
/*Window_QuickSlot.prototype.item = function() {
    return this._data && this.index() >= 0 ? this._data[this.index()] : null;
};*/
//==============================
//* Is Current Item Enabled
//==============================
/*Window_QuickSlot.prototype.isEnabled = function(item) {
    return this._actor && this._actor.canUse(item);
};*/
//==============================
//* Includes
//==============================

//==============================
//* Is Item Enabled
//==============================

//==============================
//* make Item List
//==============================
/*Window_QuickSlot.prototype.makeItemList = function() {
	if(this._actor) {
		this._data = QuasiABS.quickSlot[this._actor.actorId()];
		console.log(this._data);
	}
};*/
/*
//==============================
//* Select Last
//==============================
Window_SkillListM.prototype.selectLast = function() {
var skill;
if ($gameParty.inBattle()) {
   skill = this._actor.lastBattleSkill();
} else {
   skill = this._actor.lastMenuSkill();
}
var index = this._data.indexOf(skill);
this.select(index >= 0 ? index : 0);
};*/

//==============================
//* Draw Item
//==============================

Window_QuickSlot.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    var commandName = this.commandName(index);
    var icon = null;
    if (this._actor) {
        var skillidx = $gameSystem.absKeys()[index + 7].skillId;
    	if (skillidx){
    		icon = $dataSkills[skillidx].iconIndex;
            this.drawIcon(icon, rect.x-4, rect.y+2);
            rect.x += 30;
            rect.width -= 30;
        }/* else if ( commandIcon[commandName] ) {
            this.drawIcon(commandIcon[commandName], rect.x-4, rect.y+2);
            rect.x += 30;
            rect.width -= 30;
        }
    */
    }
    if(icon) {
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
    }
	/*
	if(this._data) {
	var skill = this._data[index];
	if (skill) {
		
		var rect = new Rectangle();
		rect.width = this.textPadding();
		rect.heithg = this.textPadding();
		this.changePaintOpacity(this.isEnabled(skill));
		//this.drawSkillCost(skill, rect.x, rect.y, rect.width);
		this.changePaintOpacity(1);
		
	};}
	*/
};

//==============================
//* cost Width
//==============================
/*Window_SkillListM.prototype.costWidth = function() {
return this.textWidth('000');
};*/

//==============================
//* draw Skill Cost
//==============================
/*Window_SkillListM.prototype.drawSkillCost = function(skill, x, y, width) {
if (this._actor.skillTpCost(skill) > 0) {
   this.changeTextColor(this.tpCostColor());
   this.drawText(this._actor.skillTpCost(skill), x, y, width, 'right');
} else if (this._actor.skillMpCost(skill) > 0) {
   this.changeTextColor(this.mpCostColor());
   this.drawText(this._actor.skillMpCost(skill), x, y, width, 'right');
}
};*/

//==============================
//* update Help
//==============================
/*Window_QuickSlot.prototype.updateHelp = function() {
	this.setHelpWindowItem(this.item());
};*/

//==============================
//* Refresh
//==============================
/*Window_QuickSlot.prototype.refresh = function() {
 	
    this.clearCommandList();
    this.makeCommandList();
    this.createContents();
    /*
	this.makeItemList();
	this.createContents();
	this.drawAllItems();
	*/
//};

//==============================
// * update
//==============================

//=============================================================================
// * Party Window Data
//=============================================================================
function ActorStatusSkill() {
    this.initialize.apply(this, arguments);
};

ActorStatusSkill.prototype = Object.create(Sprite.prototype);
ActorStatusSkill.prototype.constructor = ActorStatusSkill;

//==============================
// * Initialize
//==============================
ActorStatusSkill.prototype.initialize = function(actor) {
    Sprite.prototype.initialize.call(this);	
	this.loadBitmaps();
    this._actor = actor;	
};

//==============================
// * Refresh
//==============================
ActorStatusSkill.prototype.loadBitmaps = function() {
    this._layImg = ImageManager.loadMenusskill("LayoutActor");
	this._hpMeterImg = ImageManager.loadMenusskill("HPMeter");
	this._mpMeterImg = ImageManager.loadMenusskill("MPMeter");
};

//==============================
// * create Sprites
//==============================
ActorStatusSkill.prototype.createSprites = function() {
	this.bitmap = this._layImg;
 	this.createPar();
	this.createHPMeter();
	this.createMPMeter();
	this.createStates();
	this.createFace();
	this.refresh()
};

//==============================
// * Refresh
//==============================
ActorStatusSkill.prototype.refresh = function() {
    this.refreshPar();
	this.refreshHPMeter();
	this.refreshMPMeter();
	this.refresh_states();
	this.refreshFace();
};

//==============================
// * Refresh Face
//==============================
ActorStatusSkill.prototype.refreshFace = function() {
     this._face.bitmap = ImageManager.loadMenusFaces2("Actor_" + this._actor._actorId);
};

//==============================
// * create Face
//==============================
ActorStatusSkill.prototype.createFace = function() {
     this._face = new Sprite();
	 this._face.x = Moghunter.scSkill_AS_FaceX;
	 this._face.y = Moghunter.scSkill_AS_FaceY;
	 this.addChild(this._face);
};

//==============================
// * create Parameters
//==============================
ActorStatusSkill.prototype.createPar = function() {
     this._par = new Sprite(new Bitmap(Graphics.boxWidth,Graphics.boxHeight));
	 this._par.bitmap.fontSize = Moghunter.scSkill_AS_ParFontSize;
	 this._par.x = Moghunter.scSkill_AS_ParX;
	 this._par.y = Moghunter.scSkill_AS_ParY;
	 this.addChild(this._par);
};

//==============================
// * refresh Par
//==============================
ActorStatusSkill.prototype.refreshPar = function() {
     this._par.bitmap.clear();
	 this._par.bitmap.drawText(this._actor.hp,100,10,80,32,"right"); 
	 this._par.bitmap.drawText(this._actor.mp,195,10,80,32,"right"); 
	 this._par.bitmap.drawText(this._actor.name(),90,50,120,32,"left");
};

//==============================
// * createHP Meter
//==============================
ActorStatusSkill.prototype.createHPMeter = function() {
    this._hpMeter = new Sprite(this._hpMeterImg);
	this._hpMeter.x = Moghunter.scSkill_AS_MeterHPX;
	this._hpMeter.y = Moghunter.scSkill_AS_MeterHPY;
	this.addChild(this._hpMeter);
};

//==============================
// * refreshHP Meter
//==============================
ActorStatusSkill.prototype.refreshHPMeter = function() {
	var cw = this._hpMeterImg.width;
	var ch = this._hpMeterImg.height;
	var wid = cw * this._actor.hp / this._actor.mhp;
	this._hpMeter.setFrame(0,0,wid,cw);
};

//==============================
// * createHP Meter
//==============================
ActorStatusSkill.prototype.createMPMeter = function() {
    this._mpMeter = new Sprite(this._mpMeterImg);
	this._mpMeter.x = Moghunter.scSkill_AS_MeterMPX;
	this._mpMeter.y = Moghunter.scSkill_AS_MeterMPY;
	this.addChild(this._mpMeter);
};

//==============================
// * refreshMP Meter
//==============================
ActorStatusSkill.prototype.refreshMPMeter = function() {
	var cw = this._mpMeterImg.width;
	var ch = this._mpMeterImg.height;
	var wid = cw * this._actor.mp / this._actor.mmp;
	this._mpMeter.setFrame(0,0,wid,cw);
};

//==============================
// * Create States
//==============================
ActorStatusSkill.prototype.createStates = function() {
	this._states_data = [0,0,0];
	this._state_icon = new Sprite(ImageManager.loadSystem("IconSet"));
	this._state_icon.x = Moghunter.scSkill_AS_StatesX;
	this._state_icon.y = Moghunter.scSkill_AS_StatesY;
	this._state_icon.visible = false;
	this.addChild(this._state_icon);
	this.refresh_states();	
};
	
//==============================
// * Create States
//==============================
ActorStatusSkill.prototype.refresh_states = function() {
	this._states_data[0] = 0;
	this._states_data[2] = 0;
	this._state_icon.visible = false;
	if (this._actor.allIcons().length == 0) {this._states_data[1] = 0;return};
       if (this._actor.allIcons()[this._states_data[1]]) {	
		this._states_data[0] = this._actor.allIcons()[this._states_data[1]];
		this._state_icon.visible = true;
		var sx = this._states_data[0] % 16 * 32;
		var sy = Math.floor(this._states_data[0] / 16) * 32;
		this._state_icon.setFrame(sx, sy, 32, 32);
	   };
	this._states_data[1] += 1;
	if (this._states_data[1] >= this._actor.allIcons().length) {
		this._states_data[1] = 0
	};
};

//==============================
// * Update States
//==============================
ActorStatusSkill.prototype.update_states = function() {
	this._states_data[2] += 1;
	if (this.need_refresh_states()) {this.refresh_states();};
};	
	
//==============================
// * Need Refresh States
//==============================
ActorStatusSkill.prototype.need_refresh_states = function() {
	if (this._states_data[2] > 60) {return true};
	return false;
};		
	
//==============================
// * Update
//==============================
ActorStatusSkill.prototype.update = function() {
    Sprite.prototype.update.call(this);	
    if (!this._par && this._layImg.isReady()) {this.createSprites()};
	if (this._state_icon) {this.update_states()};
};
