/*:
 * @plugindesc Adds a combo counter for each damage done via QABS.
 * @author CursorBot
 *
 * @help This plugin does not provide plugin commands.
 */

(function() {
    var Game_Battler_initialize = Game_Battler.prototype.initialize;
    Game_Battler.prototype.initialize = function() {
        Game_Battler_initialize.call(this);
        this.comboCount = 0;
    };

    var Game_Battler_executeDamage = Game_Battler.prototype.executeDamage;
    Game_Battler.prototype.executeDamage = function(damage) {
        Game_Battler_executeDamage.call(this, damage);
        this.comboCount++;
        if (this._comboSprite) {
            this._comboSprite.bitmap.clear();
            this._comboSprite.bitmap.drawText("Combo: " + this.comboCount, 0, 0, 160, 40, 'center');
        }
    };

    var Sprite_Battler_initialize = Sprite_Battler.prototype.initialize;
    Sprite_Battler.prototype.initialize = function(battler) {
        Sprite_Battler_initialize.call(this, battler);
        this._comboSprite = new Sprite();
        this._comboSprite.bitmap = new Bitmap(160, 40);
        this.addChild(this._comboSprite);
        battler._comboSprite = this._comboSprite;
    };
})();