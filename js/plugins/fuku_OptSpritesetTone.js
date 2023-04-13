// Copyright (c) 2018 fuku
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//

// 最新版は↓から
// http://www5f.biglobe.ne.jp/~fuku-labo/library/etc/

/*:
 * @plugindesc スプライトセット色変換効率化
 * @author fuku
 *
 * @help スプライトセットで常時動作している色変換フィルターを
 * 必要な時だけ動作するよう変更します。
 * 
 */
var Fuku_Plugins=(Fuku_Plugins||{});
Fuku_Plugins.OptSpritesetTone={version:1};

(function(){
'use strict';

var ssb_createWebGLToneChanger=Spriteset_Base.prototype.createWebGLToneChanger;
Spriteset_Base.prototype.createWebGLToneChanger=function(){
	ssb_createWebGLToneChanger.call(this);
	this._toneFilter.enabled=false;
};

var ssb_updateWebGLToneChanger=Spriteset_Base.prototype.updateWebGLToneChanger;
Spriteset_Base.prototype.updateWebGLToneChanger=function(){
	ssb_updateWebGLToneChanger.call(this);
	var tone=this._tone;
	this._toneFilter.enabled=((tone[0]||tone[1]||tone[2]||tone[3])?true:false);
};

})();
