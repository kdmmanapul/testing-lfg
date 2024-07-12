//================================================================
//PRG
/*
 * 
 * @plugindesc <PRG>
 * @version 0.01
 * 
 */

var Imported = Imported || {};
Imported.PRG = true;

var PRG = PRG || {}; //PRG main object

(function () {
    //미니맵 컨트롤
    PRG.minimapEnable = false;
	if (!PRG._selectSkillMode) PRG._selectSkillMode = [];
	PRG._maryGoods = [];
	PRG._meryAbilityGoods = [];
	PRG._meryGoods = [];

	PRG._currentEventTurns = [];
	PRG._enableEvents = [];
	PRG._events = [];

    /*한등급 높은지 검사. 
     * 아이템 타입 검사
     * 아이템 레어도 검사
     * 열었을 때 한등급 검사를 시행, 없다면 바로 열리고 드랍 시행, 높다면 - 이펙트 연출 후 드랍 시행
     */
	PRG.recipeGroups = {
		canes: {
			0: [1001, 1002, 1003],
			1: [1005, 1006, 1007],
			2: [1009, 1010, 1011, 1012],
			3: [1013, 1014, 1015],
			6: [1001, 1002, 1003, 1005, 1006, 1007, 1009, 1010, 1011, 1012, 1013, 1014, 1015]
		},
		bows: {
			0: [1017, 1018, 1019],
			1: [1021, 1022, 1023],
			2: [1025, 1026, 1027, 1028],
			3: [1029, 1030, 1031],
			6: [1017, 1018, 1019, 1021, 1022, 1023, 1025, 1026, 1027, 1028, 1029, 1030, 1031]
		},
		swords: {
			0: [1033, 1034, 1035],
			1: [1037, 1038, 1039],
			2: [1041, 1042, 1043, 1044],
			3: [1045, 1046, 1047],
			6: [1033, 1034, 1035, 1037, 1038, 1039, 1041, 1042, 1043, 1044, 1045, 1046, 1047]
		},
		hammers: {
			0: [1049, 1050, 1051],
			1: [1053, 1054, 1055],
			2: [1057, 1058, 1059, 1060],
			3: [1061, 1062, 1063],
			6: [1049, 1050, 1051, 1053, 1054, 1055, 1057, 1058, 1059, 1060, 1061, 1062, 1063]
        },
		weapons: {
			0: [1001, 1002, 1003, 1017, 1018, 1019, 1033, 1034, 1035],
			1: [1005, 1006, 1007, 1021, 1022, 1023, 1037, 1038, 1039],
			2: [1009, 1010, 1011, 1012, 1025, 1026, 1027, 1028, 1041, 1042, 1043, 1044],
			3: [1013, 1014, 1015, 1029, 1030, 1031, 1045, 1046, 1047],
		},
		hats: {
			0: [2001, 2002],
			1: [2004, 2005, 2006, 2007],
			2: [2009, 2010, 2011],
			3: [2013, 2014, 2015],
			6: [2001, 2002, 2004, 2005, 2006, 2007, 2009, 2010, 2011, 2013, 2014, 2015]
		},
		clothes: {
			0: [2017, 2018, 2019, 2020],
			1: [2022, 2023, 2024, 2025],
			2: [2026, 2027, 2028],
			3: [2030, 2031, 2032],
			6: [2017, 2018, 2019, 2020, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2030, 2031, 2032]
		},
		shoes: {
			0: [2033, 2034, 2035],
			1: [2037, 2038, 2039, 2040],
			2: [2042, 2043, 2044],
			3: [2046, 2047, 2048],
			6: [2033, 2034, 2035, 2037, 2038, 2039, 2040, 2042, 2043, 2044, 2046, 2047, 2048]
		},
		armors: {
			0: [2001, 2002, 2017, 2018, 2019, 2020, 2033, 2034, 2035],
			1: [2004, 2005, 2006, 2007, 2022, 2023, 2024, 2025, 2037, 2038, 2039, 2040],
			2: [2009, 2010, 2011, 2026, 2027, 2028, 2042, 2043, 2044],
			3: [2013, 2014, 2015, 2030, 2031, 2032, 2046, 2047, 2048],
		},
		cardsA: [3117, 3118, 3119, 3120, 3121, 3122, 3145, 3171],
		cardsB: [3117, 3118, 3119, 3120, 3121, 3122, 3145, 3171],
		enchants: [3106,3107,3157],
		jellies: [3102, 3103, 3104, 3105, 3165],
		potions: [3138,3139,3140,3141,3170,3182]
	}
    PRG.data = {
        weapon: {
            0: [1, 2, 3, 17, 18, 19,33,34,35],
            1: [5,6,7, 21, 22, 23,37,38],
            2: [9,10, 11,12,25,26,27,28,41,42,43, 44],
            3: [13,14,15,29, 30,31,45,46,47]
        },
        armor: {
            0: [1,2,17,18,19,20,33,34,35],
            1: [4,5,6,7,22,23,24,25, 37,38,39,40],
            2: [9,10,11, 26, 27,28, 42,43,44],
            3: [13,14,15,30,31,32,46,47,48]
		},
		accessory: {
			0: [49,50,51,52,65,66,67,68],
			1: [53,54,55,56, 69,70,71,72],
			2: [57,58,59,60, 73,74,75,76],
			3: [61,62,63, 77,78, 79]
		},
		item: {
			0: [101, 106, 107, 109, 110, 111, 111, 112, 113, 113, 113, 114, 115, 116, 127, 128, 130],
			1: [134, 135, 136, 137, 143, 150, 151, 152, 153],
			2: [166, 167, 168, 169,176],
			3: [181, 183]
		},
		shopItem: {
			0: [101, 111, 113, 130, [109, 110, 111]],
			1: [111, 113, 114, 115, 130, 134, 135, 136, 143, 150, 151, 157],
			2: [111, 113, 114, 166, 167, 172, 173],
			3: [111, 113, 114, 166, 167, 168, 169, 186, 187]
		},
		magic: { //다른 데이터들과 다르게 중복 가능하게 나와야 함
			0: [101, 106, 111, 116, 121, 126, 131, 136, 141, 146, 151, 271, 276, 281, 286, 291],
			1: [156, 161, 166, 171, 176, 251, 256, 181, 186, 266, 296, 301],
			2: [201, 206, 261, 211, 216, 221, 226, 306],
			3: [201, 206, 261, 211, 216, 221, 226]
		},
		levelupMagic: {
			0: [101, 106, 111, 116, 121, 126, 131, 136, 141, 146, 151, 271, 276, 281, 286, 291],
			1: [156, 161, 166, 171, 176, 251, 256, 181, 186, 266, 296, 301],
			2: [201, 206, 261, 211, 216, 221, 226, 306],
			3: [201, 206, 261, 211, 216, 221, 226]
		},
        abil: { // 다른 데이터와 다르게 소모됨. refresh가 필요
            0: [101, 102, 103, 104, 105, 106, 107, 110, 111, 112, 113, 114, 115, 116, 117, 119, 120, 122],
            1: [133, 134, 135, 136, 137, 138, 139, 141, 142, 143, 144, 145, 146, 147, 148, 152, 155, 157, 158, 159],
            2: [165, 166, 167, 168, 169, 170, 171, 178, 179, 183, 185, 187, 188, 189, 190, 191, 192],
            3: [197, 198, 199, 200, 201, 202, 204, 205, 207, 208, 209, 210, 211, 212, 213, 215, 216]
        },
		enchant: {
			0: {
				0: [401, 402, 403],
				1: [404, 405, 488],
				2: [406, 408, 409, 487, 489, 490],
				3: [407],
				4: [411, 412],
				5: [413, 414, 417],
				6: [415, 416, 418, 491, 492, 493],
				7: [419, 495]
			},
			1: {
				0: [422],
				1: [421, 496],
				2: [423,424, 426, 497],
				3: [425],
				4: [431,432],
				5: [433],
				6: [434, 435,436],
				7: [437]
			},
			2: {
				0: [442],
				1: [446,447,448, 498, 499],
				2: [443, 500],
				3: [444],
				4: [452],
				5: [451],
				6: [453, 454],
				7: [455]
			},
			3: {
				0: [461, 462],
				1: [463, 482, 483],
				2: [464, 465, 467, 484],
				3: [466],
				4: [471, 472],
				5: [473],
				6: [474, 475],
				7: [476]
			},
			4: {
				0: [462],
				1: []
			}
		},
		upgrade: {
			1: {
				0: [301, 302, 303, 304, 305, 306, 311, 312, 313, 314, 321, 322, 323, 324],
				1: [311, 312, 313, 314, 321, 322, 323, 324],
				2: [321, 322, 323, 324]
			},
			2: {
				0: [331, 332, 333, 334, 335, 336, 341, 342, 343, 344, 345],
				1: [341, 342, 343, 344, 345, 351, 352, 353, 354, 355],
				2: [351, 352, 353, 354, 355]
			},
			3: {
				0: [361, 362, 363, 364, 365, 371, 372, 373, 374, 375],
				1: [371, 372, 373, 374, 375, 381, 382, 383, 384],
				2: [381, 382, 383, 384]
			},
			4: {
				0: [501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512],
				1: [514, 515, 516, 517, 518, 519, 520, 521, 522, 523, 524, 525, 526, 527, 528],
				2: [531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545],
				3: [571, 572, 573, 574, 575, 576, 577, 578, 579, 580, 581, 582]
			}, 
			5: {
				0: [501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512],
				1: [514, 515, 516, 517, 518, 519, 520, 521, 522, 523, 524, 525, 526, 527, 528],
				2: [551, 552, 553, 554, 555, 556],
				3: [591, 592, 593, 594, 595, 596]
			}
		},
		combineRecipe: [
			{ reqItems: [3101, 3103], resultItem: [3138, 1] }, 
			{ reqItems: [3101, 3102], resultItem: [3139, 1] }, 
			{ reqItems: [3101, 3104], resultItem: [3140, 1] }, 
			{ reqItems: [3101, 3113], resultItem: [3144, 1] }, 
			{ reqItems: [3101, 3165], resultItem: [3170, 1] }, 
			{ reqItems: [3101, 3135], resultItem: [3142, 1] }, 
			{ reqItems: [3104, 3165], resultItem: [3102, 1] }, 
			{ reqItems: [PRG.recipeGroups.jellies, PRG.recipeGroups.jellies], resultItem: [PRG.recipeGroups.jellies, 1] }, 
			{ reqItems: [PRG.recipeGroups.jellies, 3116], resultItem: [3130, 1] }, 
			{ reqItems: [PRG.recipeGroups.jellies, 3109], resultItem: [3153, 1] }, 
			{ reqItems: [PRG.recipeGroups.jellies, 3134], resultItem: [3153, 1] }, 
			{ reqItems: [PRG.recipeGroups.jellies, 3130], resultItem: [3137, 1] }, 
			{ reqItems: [PRG.recipeGroups.jellies, 3152], resultItem: [3156, 1] }, 
			{ reqItems: [3106, 3107], resultItem: [3157, 1] }, 
			{ reqItems: [3109, 3109], resultItem: [3134, 1] }, 
			{ reqItems: [3109, 3113], resultItem: [3114, 1] }, 
			{ reqItems: [3109, 3110], resultItem: [3134, 1] }, 
			{ reqItems: [3109, 3117], resultItem: [3151, 1] }, 
			{ reqItems: [3109, 3118], resultItem: [3146, 1] }, 
			{ reqItems: [3109, 3119], resultItem: [3147, 1] }, 
			{ reqItems: [3109, 3120], resultItem: [3148, 1] }, 
			{ reqItems: [3109, 3121], resultItem: [3149, 1] }, 
			{ reqItems: [3109, 3122], resultItem: [3151, 1] }, 
			{ reqItems: [3109, 3145], resultItem: [3177, 1] }, 
			{ reqItems: [3109, 3171], resultItem: [3177, 1] }, 
			{ reqItems: [3109, PRG.recipeGroups.jellies], resultItem: [3153, 1] }, 
			{ reqItems: [3110, 3110], resultItem: [3112, 1] }, 
			{ reqItems: [3110, 3111], resultItem: [3115, 1] }, 
			{ reqItems: [3110, 3113], resultItem: [PRG.recipeGroups.cardsA, 1] }, 
			{ reqItems: [3110, PRG.recipeGroups.cardsA], resultItem: [3113, 1] }, 
			{ reqItems: [3110, 3114], resultItem: [3113, 1] },
			{ reqItems: [3110, 3114], resultItem: [3113, 1] },
			{ reqItems: [3110, 3106], resultItem: [3113, 1] },
			{ reqItems: [3110, 3107], resultItem: [3113, 1] },
			{ reqItems: [3110, 3143], resultItem: [3113, 1] },
			{ reqItems: [3110, 3146], resultItem: [3113, 1] },
			{ reqItems: [3110, 3147], resultItem: [3113, 1] },
			{ reqItems: [3110, 3148], resultItem: [3113, 1] },
			{ reqItems: [3110, 3149], resultItem: [3113, 1] },
			{ reqItems: [3110, 3151], resultItem: [PRG.recipeGroups.cardsB, 1] },
			{ reqItems: [3110, 3157], resultItem: [3113, 1] }, 
			{ reqItems: [3110, 3177], resultItem: [3137, 1] }, 
			{ reqItems: [3110, 3115], resultItem: [3111, 1] }, 
			{ reqItems: [3110, 3127], resultItem: [3155, 1] }, 
			{ reqItems: [3110, 3130], resultItem: [3116, 1] }, 
			{ reqItems: [3110, 3134], resultItem: [3109, 1] }, 
			{ reqItems: [3110, 3136], resultItem: [3128, 1] }, 
			{ reqItems: [3110, 3137], resultItem: [3130, 1] }, 
			{ reqItems: [3110, 3138], resultItem: [3101, 1] }, 
			{ reqItems: [3110, 3139], resultItem: [3101, 1] }, 
			{ reqItems: [3110, 3140], resultItem: [3101, 1] }, 
			{ reqItems: [3110, 3141], resultItem: [3101, 1] }, 
			{ reqItems: [3110, 3142], resultItem: [3101, 1] }, 
			{ reqItems: [3110, 3144], resultItem: [3101, 1] }, 
			{ reqItems: [3110, 3170], resultItem: [3101, 1] }, 
			{ reqItems: [3110, 3152], resultItem: [3130, 1] }, 
			{ reqItems: [3110, 3153], resultItem: [3109, 1] }, 
			{ reqItems: [3110, 3152], resultItem: [3130, 1] }, 
			{ reqItems: [3110, 3154], resultItem: [3153, 1] }, 
			{ reqItems: [3110, 3155], resultItem: [3127, 1] }, 
			{ reqItems: [3110, 3156], resultItem: [3152, 1] }, 
			{ reqItems: [3110, 3158], resultItem: [3116, 1] }, 
			{ reqItems: [3110, 3161], resultItem: [3128, 1] }, 
			{ reqItems: [3110, 3162], resultItem: [3138, 1] }, 
			{ reqItems: [3110, 3163], resultItem: [3142, 1] }, 
			{ reqItems: [3110, 3164], resultItem: [3135, 1] }, 
			{ reqItems: [3110, 3166], resultItem: [3137, 1] }, 
			{ reqItems: [3110, 3167], resultItem: [3134, 1] }, 
			{ reqItems: [3110, 3172], resultItem: [3135, 1] }, 
			{ reqItems: [3110, 3173], resultItem: [3136, 1] }, 
			{ reqItems: [3110, 3178], resultItem: [3153, 1] }, 
			{ reqItems: [3110, 3179], resultItem: [3155, 1] }, 
			{ reqItems: [3110, 3180], resultItem: [3156, 1] }, 
			{ reqItems: [3110, 3182], resultItem: [3170, 1] }, 
			{ reqItems: [3110, 3183], resultItem: [3168, 1] }, 
			{ reqItems: [3110, 3184], resultItem: [3168, 1] }, 
			{ reqItems: [3110, 3185], resultItem: [3177, 1] }, 
			{ reqItems: [3110, 3186], resultItem: [3177, 1] }, 
			{ reqItems: [3110, 3187], resultItem: [3177, 1] }, 
			{ reqItems: [3111, 3111], resultItem: [3115, 1] }, 
			{ reqItems: [3111, 3127], resultItem: [3155, 1] }, 
			{ reqItems: [3111, 3134], resultItem: [3167, 1] }, 
			{ reqItems: [3113, 3113], resultItem: [PRG.recipeGroups.cardsA, 1] }, 
			{ reqItems: [3113, 3128], resultItem: [PRG.recipeGroups.enchants, 1] }, 
			{ reqItems: [3113, 3130], resultItem: [3152, 1] }, 
			{ reqItems: [3113, 3134], resultItem: [3114, 1] }, 
			{ reqItems: [3113, 3135], resultItem: [PRG.recipeGroups.enchants, 1] }, 
			{ reqItems: [3113, PRG.recipeGroups.cardsA], resultItem: [3151, 1] }, 
			{ reqItems: [3114, 3114], resultItem: [3143, 1] }, 
			{ reqItems: [3114, 3118], resultItem: [3146, 1] }, 
			{ reqItems: [3114, 3119], resultItem: [3147, 1] }, 
			{ reqItems: [3114, 3120], resultItem: [3148, 1] }, 
			{ reqItems: [3114, 3121], resultItem: [3149, 1] }, 
			{ reqItems: [3114, 3117], resultItem: [3151, 1] }, 
			{ reqItems: [3114, 3122], resultItem: [3151, 1] }, 
			{ reqItems: [3115, 3116], resultItem: [3158, 1] }, 
			{ reqItems: [3115, 3128], resultItem: [3161, 1] }, 
			{ reqItems: [3158, 3128], resultItem: [3161, 1] }, 
			{ reqItems: [3116, 3116], resultItem: [3127, 1] }, 
			{ reqItems: [PRG.recipeGroups.cardsA, PRG.recipeGroups.cardsA], resultItem: [PRG.recipeGroups.cardsA, 1] }, 
			{ reqItems: [3127, 3127], resultItem: [3172, 1] }, 
			{ reqItems: [3127, 3127], resultItem: [3136, 1] }, 
			{ reqItems: [3127, 3135], resultItem: [3172, 1] }, 
			{ reqItems: [3127, 3168], resultItem: [3183, 1] }, 
			{ reqItems: [3127, 3136], resultItem: [3173, 1] }, 
			{ reqItems: [3128, 3130], resultItem: [3137, 1] }, 
			{ reqItems: [3128, 3137], resultItem: [3166, 1] }, 
			{ reqItems: [3130, 3130], resultItem: [3137, 1] }, 
			{ reqItems: [3134, PRG.recipeGroups.hats[0]], resultItem: [PRG.recipeGroups.clothes[0], 1] },
			{ reqItems: [3134, PRG.recipeGroups.hats[1]], resultItem: [PRG.recipeGroups.clothes[1], 1] },
			{ reqItems: [3134, PRG.recipeGroups.hats[2]], resultItem: [PRG.recipeGroups.clothes[2], 1] },
			{ reqItems: [3134, PRG.recipeGroups.hats[3]], resultItem: [PRG.recipeGroups.clothes[3], 1] },
			{ reqItems: [3134, PRG.recipeGroups.clothes[0]], resultItem: [PRG.recipeGroups.shoes[0], 1] },
			{ reqItems: [3134, PRG.recipeGroups.clothes[1]], resultItem: [PRG.recipeGroups.shoes[1], 1] },
			{ reqItems: [3134, PRG.recipeGroups.clothes[2]], resultItem: [PRG.recipeGroups.shoes[2], 1] },
			{ reqItems: [3134, PRG.recipeGroups.clothes[3]], resultItem: [PRG.recipeGroups.shoes[3], 1] },
			{ reqItems: [3134, PRG.recipeGroups.shoes[0]], resultItem: [PRG.recipeGroups.hats[0], 1] },
			{ reqItems: [3134, PRG.recipeGroups.shoes[1]], resultItem: [PRG.recipeGroups.hats[1], 1] },
			{ reqItems: [3134, PRG.recipeGroups.shoes[2]], resultItem: [PRG.recipeGroups.hats[2], 1] },
			{ reqItems: [3134, PRG.recipeGroups.shoes[3]], resultItem: [PRG.recipeGroups.hats[3], 1] },
			{ reqItems: [3166, PRG.recipeGroups.canes[6]], resultItem: [PRG.recipeGroups.canes[2], 1] },
			{ reqItems: [3166, PRG.recipeGroups.bows[6]], resultItem: [PRG.recipeGroups.bows[2], 1] },
			{ reqItems: [3166, PRG.recipeGroups.swords[6]], resultItem: [PRG.recipeGroups.swords[2], 1] },
			{ reqItems: [3166, PRG.recipeGroups.hammers[6]], resultItem: [PRG.recipeGroups.hammers[2], 1] },
			{ reqItems: [3167, PRG.recipeGroups.hats[6]], resultItem: [PRG.recipeGroups.hats[2], 1] },
			{ reqItems: [3167, PRG.recipeGroups.clothes[6]], resultItem: [PRG.recipeGroups.clothes[2], 1] },
			{ reqItems: [3167, PRG.recipeGroups.shoes[6]], resultItem: [PRG.recipeGroups.shoes[2], 1] },
			{ reqItems: [3186, PRG.recipeGroups.canes[6]], resultItem: [PRG.recipeGroups.canes[3], 1] },
			{ reqItems: [3186, PRG.recipeGroups.bows[6]], resultItem: [PRG.recipeGroups.bows[3], 1] },
			{ reqItems: [3186, PRG.recipeGroups.swords[6]], resultItem: [PRG.recipeGroups.swords[3], 1] },
			{ reqItems: [3186, PRG.recipeGroups.hammers[6]], resultItem: [PRG.recipeGroups.hammers[3], 1] },
			{ reqItems: [3187, PRG.recipeGroups.hats[6]], resultItem: [PRG.recipeGroups.hats[3], 1] },
			{ reqItems: [3187, PRG.recipeGroups.clothes[6]], resultItem: [PRG.recipeGroups.clothes[3], 1] },
			{ reqItems: [3187, PRG.recipeGroups.shoes[6]], resultItem: [PRG.recipeGroups.shoes[3], 1] },
			{ reqItems: [3135, 3152], resultItem: [3164, 1] }, 
			{ reqItems: [3137, 3152], resultItem: [3164, 1] }, 
			{ reqItems: [3137, 3168], resultItem: [3184, 1] }, 
			{ reqItems: [3137, 3151], resultItem: [3177, 1] }, 
			{ reqItems: [3138, 3152], resultItem: [3162, 1] }, 
			{ reqItems: [3139, 3170], resultItem: [3182, 1] }, 
			{ reqItems: [3140, 3170], resultItem: [3177, 1] }, 
			{ reqItems: [3142, 3152], resultItem: [3163, 1] }, 
			{ reqItems: [3145, 3171], resultItem: [3184, 1] }, 
			{ reqItems: [3152, 3153], resultItem: [3178, 1] }, 
			{ reqItems: [3153, 3155], resultItem: [3179, 1] }, 
			{ reqItems: [3154, 3156], resultItem: [3180, 1] }, 
			{ reqItems: [3166, 3166], resultItem: [3186, 1] }, 
			{ reqItems: [3166, 3169], resultItem: [3186, 1] }, 
			{ reqItems: [3167, 3167], resultItem: [3187, 1] }, 
			{ reqItems: [3167, 3169], resultItem: [3187, 1] }, 
			{ reqItems: [3169, 3177], resultItem: [3185, 1] }, 
			{ reqItems: [PRG.recipeGroups.potions, PRG.recipeGroups.potions], resultItem: [PRG.recipeGroups.potions, 1] }, 
			{ reqItems: [PRG.recipeGroups.enchants, PRG.recipeGroups.enchants], resultItem: [PRG.recipeGroups.enchants, 1] }, 
			{ reqItems: [3131, 3131], resultItem: [PRG.recipeGroups.potions, 1] }, 
			{ reqItems: [3115, 3168], resultItem: [3161, 1] },

			{ reqItems: [3177, 3104], resultItem: [3165, 1] },
			{ reqItems: [3177, 3140], resultItem: [3170, 1] },
			{ reqItems: [3177, 3156], resultItem: [3180, 1] },
			{ reqItems: [3177, 3135], resultItem: [3167, 1] },
			{ reqItems: [3177, 3151], resultItem: [3177, 1] },
			{ reqItems: [3177, 3137], resultItem: [3166, 1] }
		],
		lucidEnemys: {
			0: [101, 102, 103, 106, 107, 113],
			1: [104, 109, 110, 111, 115, 116],
			2: [105, 112, 114, 117, 118]
		},
		eventCooldowns:[2, 3, 2, 3, 2, 3, 3, 3, 4, 5, 5, 6, 18]
	}

	PRG.InitEventTurns = function () {
		this._currentEventTurns = [0, 0, 1, 0, 2, 9, 9, 9, 9, 9, 9, 9, 18] //[0, 0, 1, 0, 2, 3, 3, 3, 4, 5, 5, 6, 18]
	}

	PRG.refreshLevelupMagic = function () {
		PRG.data.levelupMagic = {
			0: [101, 106, 111, 116, 121, 126, 131, 136, 141, 146, 151, 271, 276, 281, 286, 291],
			1: [156, 161, 166, 171, 176, 251, 256, 181, 186, 266, 296, 301],
			2: [201, 206, 261, 211, 216, 221, 226, 306],
			3: [201, 206, 261, 211, 216, 221, 226]
		}
	}

	PRG.refreshAllAbility = function () {
		PRG.data.abil = {
			0: [101, 102, 103, 104, 105, 106, 107, 110, 111, 112, 113, 114, 115, 116, 117, 119, 120, 122],
			1: [133, 134, 135, 136, 137, 138, 139, 141, 142, 143, 144, 145, 146, 147, 148, 152, 155, 157, 158, 159],
			2: [165, 166, 167, 168, 169, 170, 171, 178, 179, 183, 185, 187, 188, 189, 190, 191, 192],
			3: [197, 198, 199, 200, 201, 202, 204, 205, 207, 208, 209, 210, 211, 212, 213, 215, 216]
			//0: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115],
			// 1: [133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148],
			// 2: [165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182],
			// 3: [197, 198, 199, 200, 201, 202, 203, 204, 205, 206]
		}
	}

	PRG.getAbilityId = function (rarity) {
			var abilityList = PRG.data.abil[rarity - 1];

		if (abilityList.length < 1) {
			for (var i = 0; i < 3; i++) {
				rarity++;
				abilityList = PRG.data.abil[rarity - 1];
				if (abilityList.length > 0) break;
			}
		}
		var index = Math.floor(Math.random() * abilityList.length);
		var randomAbilityId = abilityList.splice(index, 1)[0];
			return randomAbilityId;
    }

    PRG.getWeaponId = function (rarity) {
        var weaponList = PRG.data.weapon[rarity-1];
        var randomWeaponId = weaponList[Math.floor(Math.random() * weaponList.length)];
        return randomWeaponId;
	}

	PRG.getArmorId = function (rarity) {
		var armorList = PRG.data.armor[rarity - 1];
		var randomArmorId = armorList[Math.floor(Math.random() * armorList.length)];
		return randomArmorId;
	}

	PRG.getAccessoryId = function (rarity) {
		var armorList = PRG.data.accessory[rarity - 1];
		var randomArmorId = armorList[Math.floor(Math.random() * armorList.length)];
		return randomArmorId;
	}

    PRG.getMagicId = function (rarity) {
        var magicList = PRG.data.magic[rarity - 1];
        var randomMagicId = magicList[Math.floor(Math.random() * magicList.length)];
        return randomMagicId;
    }

	PRG.getItemId = function (rarity) {
		var itemList = PRG.data.item[rarity - 1];
		var randomItemId = itemList[Math.floor(Math.random() * itemList.length)];
		return randomItemId;
	}

	PRG.getNewSkillId = function (rarity) {
		var magicList = PRG.data.magic[rarity - 1];
		var randomMagicId = magicList[Math.floor(Math.random() * magicList.length)];
		return randomMagicId;
	}

	PRG.upgradeAccessory = function (acc, bonus) { // 레어도따라 보너스 커먼 : 0.1, 언커먼 : 0.07, 레어 : 0.03
		var upgradeItem;
		var upgradeItemList = PRG.data.upgrade[acc.atypeId];
		var upgradeLevel;
		var upgradeRarity = 0;
		var rarityRate = { 0: [0.6, 0.4, 0, 0], 1: [0.6, 0.4, 0, 0], 2: [0.5, 0.35, 0.15, 0], 3: [0.25, 0.38, 0.27, 0.1], 4: [0, 0.45, 0.35, 0.2] };
		var rarityRand = 0;
		var success = false;
		bonus = bonus ? bonus : 0;
		bonus += $gameVariables._data[166] ? $gameVariables._data[166] / 100 : 0;
		if (acc.rarity < 2) bonus += 0.1;
		else if (acc.rarity < 3) bonus += 0.07;
		else if (acc.rarity < 4) bonus += 0.03;
		if (acc.boostCount > 5) {
			if (Math.random() + bonus + $gamePlayer.battler().luc / 180 > 0.65) {
				success = true;
				TickerManager.show(acc.name + '에 눈부신 푸른 빛이 스며듭니다', '#adadff')
			}
		} else if (acc.boostCount > 2) {
			if (Math.random() + bonus + $gamePlayer.battler().luc / 180 > 0.4) {
				success = true;
				TickerManager.show(acc.name + '에 강렬한 푸른 빛이 스며듭니다', '#adadff')
			}
		} else {
			success = true;
			TickerManager.show(acc.name + '에 푸른 빛이 스며듭니다', '#adadff')
		}
		if (success) {
			if (acc.boostCount == 2) upgradeLevel = 0;
			else if (acc.boostCount == 5) upgradeLevel = 1;
			else if (acc.boostCount == 8) upgradeLevel = 2;
			else upgradeLevel = -1;
			if (upgradeLevel > -1) {
				rarityRand = Math.random();
				if (rarityRand + upgradeLevel * 0.02 > rarityRate[acc.rarity][0] + rarityRate[acc.rarity][1] + rarityRate[acc.rarity][2]) upgradeRarity = 3;
				else if (rarityRand + upgradeLevel * 0.02 > rarityRate[acc.rarity][0] + rarityRate[acc.rarity][1]) upgradeRarity = 2;
				else if (rarityRand + upgradeLevel * 0.02 >= rarityRate[acc.rarity][0]) upgradeRarity = 1;
				else upgradeRarity = 0;
				if (upgradeLevel == 2 && $gameVariables._data[165] && !acc.hasRare) {
					if (Math.random() > 0.7) upgradeRarity = 3;
					else upgradeRarity = 2;
				}

				upgradeItem = $dataItems[upgradeItemList[upgradeRarity][Math.floor(Math.random() * upgradeItemList[upgradeRarity].length)]];
				while (acc.passiveStates.contains(upgradeItem.id)) {
					upgradeItem = $dataItems[upgradeItemList[upgradeRarity][Math.floor(Math.random() * upgradeItemList[upgradeRarity].length)]];
				}
				ItemManager.applyAugmentEffects(acc, upgradeItem, upgradeLevel + 1, 1);
				if (upgradeRarity > 1) acc.hasRare = true;
			}
			upgradeItem = $dataItems[393];
			ItemManager.applyIUSEffects(acc, upgradeItem);
			$gamePlayer.requestAnimation(23);
			return true;
		} else {
			$gamePlayer.requestAnimation(24);
			TickerManager.show('아무일도 일어나지 않았습니다', '#ffadad')
		}
		return false;
	}

	PRG.upgradeWeapon = function (weapon, bonus) {
		var upgradeItem;
		var upgradeItemList = PRG.data.upgrade[weapon.wtypeId];
		var upgradeLevel;
		var success = false;
		bonus = bonus ? bonus : 0;
		bonus += $gameVariables._data[166] ? $gameVariables._data[166] / 100 : 0;
		if (weapon.boostCount > 5) {
			if (Math.random() + bonus + $gamePlayer.battler().luc / 180 > 0.6) {
				success = true;
				if (weapon.boostCount == 8) {
					weapon._requireEffect = 'upgrade4';
					var sound = {
						name: 'se_upgrade4',
						volume: 90,
						pitch: 100,
						pan: 0
					};
					AudioManager.playSe(sound);
				}
				else weapon._requireEffect = "upgrade3";
				PKD_MI.refreshInventory();
				if (weapon.boostCount < 9) ItemManager.durMaxChange(weapon, 20);
				if (weapon.boostCount < 9) ItemManager.durabilityChange(weapon, 20)
				TickerManager.show(weapon.name + '에 눈부신 푸른 빛이 스며듭니다', '#adadff')
			}
		} else if (weapon.boostCount > 2) {
			if (Math.random() + bonus + $gamePlayer.battler().luc / 180 > 0.4) {
				success = true;
				if (weapon.boostCount == 5) {
					weapon._requireEffect = 'upgrade4';
					var sound = {
						name: 'se_upgrade4',
						volume: 90,
						pitch: 100,
						pan: 0
					};
					AudioManager.playSe(sound);
				}
				else weapon._requireEffect = "upgrade2";
				PKD_MI.refreshInventory();
				ItemManager.durMaxChange(weapon, 10);
				ItemManager.durabilityChange(weapon, 10)
				TickerManager.show(weapon.name + '에 강렬한 푸른 빛이 스며듭니다', '#adadff')
			}
		} else {
			success = true;
			if (weapon.boostCount == 2) {
				weapon._requireEffect = 'upgrade4';
				var sound = {
					name: 'se_upgrade4',
					volume: 90,
					pitch: 100,
					pan: 0
				};
				AudioManager.playSe(sound);
			}
			else weapon._requireEffect = "upgrade1";
			PKD_MI.refreshInventory();
			ItemManager.durMaxChange(weapon, 5);
			ItemManager.durabilityChange(weapon, 5)
			TickerManager.show(weapon.name + '에 푸른 빛이 스며듭니다', '#adadff')
		}
		if (success) {
			if (weapon.boostCount == 2) upgradeLevel = 0;
			else if (weapon.boostCount == 5) upgradeLevel = 1;
			else if (weapon.boostCount == 8) upgradeLevel = 2;
			else upgradeLevel = -1;
			if (upgradeLevel > -1) {
				upgradeItem = $dataItems[upgradeItemList[upgradeLevel][Math.floor(Math.random() * upgradeItemList[upgradeLevel].length)]];
				while (weapon.passiveStates.contains(upgradeItem.id)) {
					upgradeItem = $dataItems[upgradeItemList[upgradeLevel][Math.floor(Math.random() * upgradeItemList[upgradeLevel].length)]];
				}
				ItemManager.applyAugmentEffects(weapon, upgradeItem, upgradeLevel + 2, 1);
				TickerManager.show(weapon.name + '에 특수한 능력이 부여됩니다', '#adadff')

				if (upgradeLevel == 2) {
					if (!$gameSwitches._data[211]) {
						$gameSwitches._data[211] = true;
						$gameTemp._isAchievementAdded = true;
						OrangeGreenworks.activateAchievement('211')
					}
				}

			} else {
				if (Math.random() > 0.5) {
					upgradeItem = $dataItems[391];
					ItemManager.applyIUSEffects(weapon, upgradeItem);
					TickerManager.show(weapon.name + '의 공격력이 1증가했습니다', '#adadff')
				} else {
					upgradeItem = $dataItems[392];
					ItemManager.applyIUSEffects(weapon, upgradeItem);
					TickerManager.show(weapon.name + '의 마법력이 1증가했습니다', '#adadff')
                }
			}
			$gamePlayer.requestAnimation(23);
			return true;
		} else {
			if (bonus <= 0) {
				if (weapon.boostCount > 5) ItemManager.durMaxChange(weapon, -10);
				else ItemManager.durMaxChange(weapon, -5);
			}
			weapon._requireEffect = "fail";
			PKD_MI.refreshInventory();
			$gamePlayer.requestAnimation(24);
			TickerManager.show(weapon.name + '에 담긴 빛이 점점 흐려집니다', '#ffadad')
		}
		return false;
	}

	PRG.wEnchant = function (item, pre, sub) {
		// 일반 40%, 언커먼 30%, 레어 20%, 유니크 10%
		var effectItems = [];
		var effectItemList = PRG.data.enchant[0];
		var rarity = 0;
		var rarityRand = Math.random();
		if (rarityRand > 0.9) rarity = 3;
		else if (rarityRand > 0.7) rarity = 2;
		else if (rarityRand > 0.4) rarity = 1;
		effectItems.push(effectItemList[rarity][Math.floor(Math.random() * effectItemList[rarity].length)]);
		rarityRand = Math.random();
		if (rarityRand > 0.9) rarity = 3;
		else if (rarityRand > 0.7) rarity = 2;
		else if (rarityRand > 0.4) rarity = 1;
		else rarity = 0;
		effectItems.push(effectItemList[rarity + 4][Math.floor(Math.random() * effectItemList[rarity + 4].length)]);

		item._requireEffect = 'itemEnchant';
		PKD_MI.refreshInventory();
		TickerManager.show(item.name + '에 신비한 기운이 깃듭니다', '#adadff');
		if (pre && effectItems[0]) ItemManager.applyAugmentEffects(item, $dataItems[effectItems[0]], 0, 1);
		if (sub && effectItems[1]) ItemManager.applyAugmentEffects(item, $dataItems[effectItems[1]], 1, 1);
	}

	PRG.wUndefinedEnchant = function (item) {
		// 일반 30%, 언커먼 30%, 레어 25%, 유니크 15%, 접두는 45%확률로만, 접미는 80%확률로만 나옴 0강50% 1강30% 2강20%
		var prefix = undefined;
		var suffix = undefined;
		var effectItemList = PRG.data.enchant[0];
		var rarity = 0;
		var rarityRand = Math.random();
		var upgradeRand = Math.random();
		if (Math.random() > 0.65) {
			if (rarityRand > 0.85) rarity = 3;
			else if (rarityRand > 0.6) rarity = 2;
			else if (rarityRand > 0.3) rarity = 1;
			prefix = effectItemList[rarity][Math.floor(Math.random() * effectItemList[rarity].length)];
		}
		if (Math.random() > 0.5) {
			rarityRand = Math.random();
			if (rarityRand > 0.85) rarity = 3;
			else if (rarityRand > 0.6) rarity = 2;
			else if (rarityRand > 0.3) rarity = 1;
			else rarity = 0;
			suffix = effectItemList[rarity + 4][Math.floor(Math.random() * effectItemList[rarity + 4].length)];
		}
		if (prefix) ItemManager.applyAugmentEffects(item, $dataItems[prefix], 0, 0);
		if (suffix) ItemManager.applyAugmentEffects(item, $dataItems[suffix], 1, 0);
		if (upgradeRand > 0.8) { // 20%확률로 3~6강 층수에따라
			PRG.chestWeaponUpgrade(item);
			PRG.chestWeaponUpgrade(item);
			PRG.chestWeaponUpgrade(item);
			if ($gameVariables._data[104] > 3) PRG.chestWeaponUpgrade(item);
			if ($gameVariables._data[104] > 3) PRG.chestWeaponUpgrade(item);
			if ($gameVariables._data[104] > 3) PRG.chestWeaponUpgrade(item);
			if ($gameVariables._data[104] > 6) PRG.chestWeaponUpgrade(item);
			if ($gameVariables._data[104] > 6) PRG.chestWeaponUpgrade(item);
			if ($gameVariables._data[104] > 6) PRG.chestWeaponUpgrade(item);
		} else if (upgradeRand > 0.6) { // 40%확률로 2~3강
			PRG.chestWeaponUpgrade(item);
			PRG.chestWeaponUpgrade(item);
			if (Math.random() > 0.6) PRG.chestWeaponUpgrade(item);
			if ($gameVariables._data[104] > 3) PRG.chestWeaponUpgrade(item);
			if ($gameVariables._data[104] > 6) PRG.chestWeaponUpgrade(item);
		} else if (upgradeRand > 0.2) { // 80%확률로 1~2강
			if (Math.random() > 0.6) PRG.chestWeaponUpgrade(item);
			if (Math.random() > 0.6) PRG.chestWeaponUpgrade(item);
		}
		if (item.boostCount < $gameVariables._data[161]) {
			for (var i = item.boostCount; i < $gameVariables._data[161]; i++) PRG.chestWeaponUpgrade(item);
		}
		QABSManager.startPopup('QABS-ITEM', {
			x: $gamePlayer.cx(),
			y: $gamePlayer.cy(),
			string: '\\I[' + item.iconIndex + ']' + item.name
		});
	}

	PRG.chestWeaponUpgrade = function (weapon) {
		var upgradeItem;
		var upgradeItemList = PRG.data.upgrade[weapon.wtypeId];
		var upgradeLevel;
		var success = false;
		if (weapon.boostCount > 5) {
			if (Math.random() + $gamePlayer.battler().luc / 180 > 0.6) {
				success = true;
			}
		} else if (weapon.boostCount > 2) {
			if (Math.random() + $gamePlayer.battler().luc / 180 > 0.4) {
				success = true;
			}
		} else {
			success = true;
		}
		if (success) {
			if (weapon.boostCount == 2) upgradeLevel = 0;
			else if (weapon.boostCount == 5) upgradeLevel = 1;
			else if (weapon.boostCount == 8) upgradeLevel = 2;
			else upgradeLevel = -1;
			if (upgradeLevel > -1) {
				upgradeItem = $dataItems[upgradeItemList[upgradeLevel][Math.floor(Math.random() * upgradeItemList[upgradeLevel].length)]];
				while (weapon.passiveStates.contains(upgradeItem.id)) {
					upgradeItem = $dataItems[upgradeItemList[upgradeLevel][Math.floor(Math.random() * upgradeItemList[upgradeLevel].length)]];
				}
				ItemManager.applyAugmentEffects(weapon, upgradeItem, upgradeLevel + 2, 1);
			} else {
				upgradeItem = Math.random() > 0.5 ? $dataItems[391] : $dataItems[392];
				ItemManager.applyIUSEffects(weapon, upgradeItem);
			}
		}
	}

	PRG.chestAccessoryUpgrade = function (acc) {
		var upgradeItem;
		var upgradeItemList = PRG.data.upgrade[acc.atypeId];
		var upgradeLevel;
		var upgradeRarity = 0;
		var rarityRate = { 0: [1, 0, 0, 0], 1: [1, 0, 0, 0], 2: [0.5, 0.5, 0, 0], 3: [0.3, 0.3, 0.4, 0], 4: [0.1, 0.3, 0.3, 0.2] };
		var rarityRand = 0;
		var success = false;
		var bonus = 0;
		if (acc.rarity < 2) bonus += 0.1;
		else if (acc.rarity < 3) bonus += 0.07;
		else if (acc.rarity < 4) bonus += 0.03;
		if (acc.boostCount > 5) {
			if (Math.random() + bonus + $gamePlayer.battler().luc / 180 > 0.65) {
				success = true;
			}
		} else if (acc.boostCount > 2) {
			if (Math.random() + bonus + $gamePlayer.battler().luc / 180 > 0.45) {
				success = true;
			}
		} else {
			success = true;
		}
		if (success) {
			if (acc.boostCount == 2) upgradeLevel = 0;
			else if (acc.boostCount == 5) upgradeLevel = 1;
			else if (acc.boostCount == 8) upgradeLevel = 2;
			else upgradeLevel = -1;
			if (upgradeLevel > -1) {
				rarityRand = Math.random();
				if (acc.rarity > 3) {
					upgradeRarity
				}
				if (rarityRand + upgradeLevel * 0.02 > rarityRate[acc.rarity][0] + rarityRate[acc.rarity][1] + rarityRate[acc.rarity][2]) upgradeRarity = 3;
				else if (rarityRand + upgradeLevel * 0.02 > rarityRate[acc.rarity][0] + rarityRate[acc.rarity][1]) upgradeRarity = 2;
				else if (rarityRand + upgradeLevel * 0.02 > rarityRate[acc.rarity][0]) upgradeRarity = 1;
				else upgradeRarity = 0;
				upgradeItem = $dataItems[upgradeItemList[upgradeRarity][Math.floor(Math.random() * upgradeItemList[upgradeRarity].length)]];
				while (acc.passiveStates.contains(upgradeItem.id)) {
					upgradeItem = $dataItems[upgradeItemList[upgradeRarity][Math.floor(Math.random() * upgradeItemList[upgradeRarity].length)]];
				}
				ItemManager.applyAugmentEffects(acc, upgradeItem, upgradeLevel + 1, 1);
			}
			upgradeItem = $dataItems[393];
			ItemManager.applyIUSEffects(acc, upgradeItem);
			return true;
		}
		return false;
	}

	PRG.wUndefinedEnchant2 = function (item) {
		// 일반 30%, 언커먼 30%, 레어 25%, 유니크 15%, 접두는 45%확률로만, 접미는 80%확률로만 나옴 0강50% 1강30% 2강20%
		var prefix = undefined;
		var suffix = undefined;
		var effectItemList = PRG.data.enchant[0];
		var rarity = 0;
		var rarityRand = Math.random();
		if (Math.random() > 0.65) {
			if (rarityRand > 0.85) rarity = 3;
			else if (rarityRand > 0.6) rarity = 2;
			else if (rarityRand > 0.3) rarity = 1;
			prefix = effectItemList[rarity][Math.floor(Math.random() * effectItemList[rarity].length)];
		}
		if (Math.random() > 0.5) {
			rarityRand = Math.random();
			if (rarityRand > 0.85) rarity = 3;
			else if (rarityRand > 0.6) rarity = 2;
			else if (rarityRand > 0.3) rarity = 1;
			else rarity = 0;
			suffix = effectItemList[rarity + 4][Math.floor(Math.random() * effectItemList[rarity + 4].length)];
		}
		if (prefix) ItemManager.applyAugmentEffects(item, $dataItems[prefix], 0, 0);
		if (suffix) ItemManager.applyAugmentEffects(item, $dataItems[suffix], 1, 0);
		QABSManager.startPopup('QABS-ITEM', {
			x: $gamePlayer.cx(),
			y: $gamePlayer.cy(),
			string: '\\I[' + item.iconIndex + ']' + item.name
		});
	}

	PRG.aUndefinedEnchant = function (item) {
		var prefix = undefined;
		var suffix = undefined;
		var effectItemList = PRG.data.enchant[item.atypeId];
		var rarity = 0;
		var rarityRand = Math.random();
		var upgradeRand = Math.random();
		if (item.atypeId >= 4) { // 악세 강화 안함
			//if (upgradeRand > 0.6) { // 40%확률로 3~6강 층수에따라
			//	PRG.chestAccessoryUpgrade(item);
			//	PRG.chestAccessoryUpgrade(item);
			//	PRG.chestAccessoryUpgrade(item);
			//	if ($gameVariables._data[104] > 3) PRG.chestAccessoryUpgrade(item);
			//	if ($gameVariables._data[104] > 3) PRG.chestAccessoryUpgrade(item);
			//	if ($gameVariables._data[104] > 3) PRG.chestAccessoryUpgrade(item);
			//	if ($gameVariables._data[104] > 6) PRG.chestAccessoryUpgrade(item);
			//	if ($gameVariables._data[104] > 6) PRG.chestAccessoryUpgrade(item);
			//	if ($gameVariables._data[104] > 6) PRG.chestAccessoryUpgrade(item);
			//} else if (upgradeRand > 0.4) { // 20%확률로 2~3강
			//	PRG.chestAccessoryUpgrade(item);
			//	PRG.chestAccessoryUpgrade(item);
			//	if (Math.random() > 0.6) PRG.chestAccessoryUpgrade(item);
			//	if ($gameVariables._data[104] > 3) PRG.chestAccessoryUpgrade(item);
			//	if ($gameVariables._data[104] > 6) PRG.chestAccessoryUpgrade(item);
			//} else if (upgradeRand > 0.2) { // 40%확률로 0~2강
			//	PRG.chestAccessoryUpgrade(item);
			//	if (Math.random() > 0.6) PRG.chestAccessoryUpgrade(item);
			//}
		} else {
			if (Math.random() > 0.65) {
				if (rarityRand > 0.9) rarity = 3;
				else if (rarityRand > 0.7) rarity = 2;
				else if (rarityRand > 0.4) rarity = 1;
				prefix = effectItemList[rarity][Math.floor(Math.random() * effectItemList[rarity].length)];
			}
			if (Math.random() > 0.5) {
				rarityRand = Math.random();
				if (rarityRand > 0.9) rarity = 3;
				else if (rarityRand > 0.7) rarity = 2;
				else if (rarityRand > 0.4) rarity = 1;
				else rarity = 0;
				suffix = effectItemList[rarity + 4][Math.floor(Math.random() * effectItemList[rarity + 4].length)];
			}
			if (prefix) ItemManager.applyAugmentEffects(item, $dataItems[prefix], 0, 0);
			if (suffix) ItemManager.applyAugmentEffects(item, $dataItems[suffix], 1, 0);
		}
		QABSManager.startPopup('QABS-ITEM', {
			x: $gamePlayer.cx(),
			y: $gamePlayer.cy(),
			string: '\\I[' + item.iconIndex + ']' + item.name
		});
	}

	PRG.aEnchant = function (item, pre, sub) {
		var effectItems = [];
		var effectItemList = PRG.data.enchant[item.atypeId];
		var rarity = 0;
		var rarityRand = Math.random();
		if (rarityRand > 0.9) rarity = 3;
		else if (rarityRand > 0.7) rarity = 2;
		else if (rarityRand > 0.4) rarity = 1;
		effectItems.push(effectItemList[rarity][Math.floor(Math.random() * effectItemList[rarity].length)]);
		rarityRand = Math.random();
		if (rarityRand > 0.9) rarity = 3;
		else if (rarityRand > 0.7) rarity = 2;
		else if (rarityRand > 0.4) rarity = 1;
		else rarity = 0;
		effectItems.push(effectItemList[rarity + 4][Math.floor(Math.random() * effectItemList[rarity + 4].length)]);
		
		item._requireEffect = 'itemEnchant';
		PKD_MI.refreshInventory();
		TickerManager.show(item.name + '에 신비한 기운이 깃듭니다', '#adadff');
		if (pre && effectItems[0]) ItemManager.applyAugmentEffects(item, $dataItems[effectItems[0]], 0, 1);
		if (sub && effectItems[1]) ItemManager.applyAugmentEffects(item, $dataItems[effectItems[1]], 1, 1);
	}

	PRG.getCombinedItem = function (item1, item2) {
		var itemType1 = String(item1).substr(0, 1);
		var itemType2 = String(item2).substr(0, 1);
		var req1, req2;
		var combineRecipe = null;
		var price = 0;
		if (item1 == 3184 || item2 == 3184) {
			//현자의 돌일 경우 이레귤러 처리
			if (item1 == 3184) {
				var target = item2;
				var targetType = itemType2;
			} else {
				var target = item1;
				var targetType = itemType1;
			}
			var item, rarity;
			var result = [];
			if (targetType == 1) {
				item = $dataWeapons[target - 1000];
			} else if (targetType == 2) {
				item = $dataArmors[target - 2000];
			} else {
				item = $dataItems[target - 3000];
			}
			combineRecipe = { resultItem: [target, 1] };
			return combineRecipe;
		} else if (item1 == 3112 || item2 == 3112) {
			//가위일 경우 이레귤러 처리
			//조합템이 무기일 경우 주괴류, 방어구일 경우 실류, 아이템일 경우 개별분기
			//포션류일 경우 젤리, 카드일 경우 종이, 코인일 경우 핵심아이템 or 금괴, 인챈트일 경우 종이, 마나의 돌일 경우 숫돌, 플래티넘열쇠의 경우 블록체인, 스크롤의 경우 카드, 종이일 경우 종이학, 그 외에는 본 아이템
			//취소 전부 다 상점가로 분해해서 골드로 돌려줌
			if (item1 == 3112) {
				var target = item2;
				var targetType = itemType2;
			} else {
				var target = item1;
				var targetType = itemType1;
			}
			var item, rarity;
			var result = [];
			if (targetType == 1) {
				item = $dataWeapons[target - 1000];
			} else if (targetType == 2) {
				item = $dataArmors[target - 2000];
			} else {
				item = $dataItems[target - 3000];
			}
				combineRecipe = { resultItem: [3131, 1] };
				return combineRecipe;
		} else if (item1 == 3131 && item2 == 3131) {
			//현자의가루 아이템. 25%확률로 커먼, 40%확률로 언커먼, 30%확률로 레어, 5%확률로 유니크 -> 확률 바꿔야됨. 40%확률로 커먼, 35%확률로 언커먼, 20%확률로 레어, 5%확률로 유니크
			var list = {
				0: [3101, 3102, 3103, 3104, 3105, 3106, 3107, 3108, 3109, 3110, 3111, 3112, 3113, 3114, 3115, 3116, 3117, 3118, 3119, 3120, 3121, 3122, 3123, 3127, 3128, 3130],
				1: [3134, 3135, 3136, 3137, 3138, 3139, 3140, 3141, 3142, 3143, 3144, 3145],
				2: [3165, 3166, 3167, 3168, 3169, 3170, 3171, 3172, 3173],
				3: [3181, 3182, 3183, 3184, 3185]
			}
			var rarity = 0;
			var rarityRand = Math.random();
			var res = null;
			if (rarityRand > 0.95) rarity = 3; // 60%, 25%, 12%, 3%
			else if (rarityRand > 0.75) rarity = 2;
			else if (rarityRand > 0.40) rarity = 1;
			res = list[rarity][Math.floor(Math.random() * list[rarity].length)];

				combineRecipe = { resultItem: [res, 1] };
				return combineRecipe;
		} else if (itemType1 == 3 && itemType2 == 3) { //아이템1 == 아이템일 경우
				combineRecipe = PRG.data.combineRecipe.find(function (element) {
					req1 = element.reqItems[0].length > 1 ? element.reqItems[0] : [element.reqItems[0]]
					req2 = element.reqItems[1].length > 1 ? element.reqItems[1] : [element.reqItems[1]]
					for (var i = 0; i < req1.length; i++) {
						if (req1.indexOf(item1) > -1) {
							for (var j = 0; j < req2.length; j++) {
								if (req2.indexOf(item2) > -1) {
									return true;
								}
							}
						} else if (req1.indexOf(item2) > -1) {
							for (var j = 0; j < req2.length; j++) {
								if (req2.indexOf(item1) > -1) {
									return true;
								}
							}
						}
					}
				});
				return combineRecipe;
		} else if (itemType1 == 2 && itemType2 == 2) {// 아이템1 == 방어구일 경우
			item1 = $dataArmors[item1 - 2000];
			item2 = $dataArmors[item2 - 2000];
				var rarity1 = item1.rarity -1 < 0 ? 0 :item1.rarity - 1;
				var rarity2 = item2.rarity -1 < 0 ? 0 :item2.rarity - 1;
				var averageRarity = Math.floor((rarity1 + rarity2) / 2);
			var upperRarity = rarity1 > rarity2 ? rarity1 : rarity2;
			var group;
			if (item1.atypeId == item2.atypeId) {
				if (rarity1 == rarity2 && averageRarity < 3) averageRarity += 1
				else averageRarity = upperRarity;
				if (item1.atypeId == 1) group = PRG.recipeGroups.hats[averageRarity];
				else if (item1.atypeId == 2) group = PRG.recipeGroups.clothes[averageRarity];
				else if (item1.atypeId == 3) group = PRG.recipeGroups.shoes[averageRarity];
				else {
					if (Math.random() > 0.7) group = PRG.recipeGroups.hats[averageRarity];
					else if (Math.random() > 0.4) group = PRG.recipeGroups.clothes[averageRarity];
					else group = PRG.recipeGroups.shoes[averageRarity];
                }
			} else group = PRG.recipeGroups.armors[averageRarity];
			combineRecipe = { resultItem: [group[Math.floor(Math.random() * group.length)], 1] };
			if ($gameVariables._data[163] && Math.random() > 0.8) combineRecipe._verified = false;
			else combineRecipe._verified = true;
			return combineRecipe;
		} else if (itemType1 == 1 && itemType2 == 1) { // 아이템1 == 무기일 경우
			item1 = $dataWeapons[item1 - 1000];
			item2 = $dataWeapons[item2 - 1000];
			var rarity1 = item1.rarity - 1 < 0 ? 0 : item1.rarity - 1;
			var rarity2 = item2.rarity - 1 < 0 ? 0 : item2.rarity - 1;
			var averageRarity = Math.floor((rarity1 + rarity2) / 2);
			var upperRarity = rarity1 > rarity2 ? rarity1 : rarity2;
				var group;
			if (item1.wtypeId == item2.wtypeId) {
				if (rarity1 == rarity2 && averageRarity < 3) averageRarity += 1
				else averageRarity = upperRarity;
					if (item1.wtypeId == 1) group = PRG.recipeGroups.canes[averageRarity];
					else if (item1.wtypeId == 2) group = PRG.recipeGroups.bows[averageRarity];
					else if (item1.wtypeId == 3) group = PRG.recipeGroups.swords[averageRarity];
			} else group = PRG.recipeGroups.weapons[averageRarity];
			combineRecipe = { resultItem: [group[Math.floor(Math.random() * group.length)], 1] };
			if ($gameVariables._data[163] && Math.random() > 0.8) combineRecipe._verified = false;
			else combineRecipe._verified = true;
			return combineRecipe;
		} else {
			combineRecipe = PRG.data.combineRecipe.find(function (element) {
				req1 = element.reqItems[0].length > 1 ? element.reqItems[0] : [element.reqItems[0]]
				req2 = element.reqItems[1].length > 1 ? element.reqItems[1] : [element.reqItems[1]]
				for (var i = 0; i < req1.length; i++) {
					if (req1.indexOf(item1) > -1) {
						for (var j = 0; j < req2.length; j++) {
							if (req2.indexOf(item2) > -1) {
								return true;
							}
						}
					} else if (req1.indexOf(item2) > -1) {
						for (var j = 0; j < req2.length; j++) {
							if (req2.indexOf(item1) > -1) {
								return true;
							}
						}
					}
				}
			});
			return combineRecipe;
		}
	}

	PRG.reqItemFilled = function (item) {

		if(element.reqItems[0].length > 1) {
			if (item1 && element.reqItems[0].indexOf(item1) > -1) {
				reqFilled1 = true;
				item1 = null;
			} else if (item2 && element.reqItems[0].indexOf(item1) > -1) {
				reqFilled1 = true;
				item2 = null;
			}
		}
	}

	PRG.getLucidEnemyId = function (level) {
		return PRG.data.lucidEnemys[level][Math.floor(Math.random() * PRG.data.lucidEnemys[level].length)];
	}

    PRG.getShopItem = function (index) {
        //언커먼 20퍼, 레어 8퍼, 전설 2퍼. 확률업시 최대 언커먼 60퍼, 레어 24퍼, 전설 6퍼
        var itemNum = 0;
        var rarity = 0;
        var rarityRand = Math.random();
        var uncommon = 1 - 0.40 * $gamePlayer.battler().srr * (1 + $gamePlayer.battler().luc / 60);
        var rare = 1 - 0.15 * $gamePlayer.battler().srr * (1 + $gamePlayer.battler().luc / 60);
        var legend = 1 - 0.02 * $gamePlayer.battler().srr * (1+$gamePlayer.battler().luc/60);
        if (rarityRand > legend) rarity = 3;
        else if (rarityRand > rare) rarity = 2;
        else if (rarityRand > uncommon) rarity = 1;
        switch (index) {
            case 1:
                itemList = PRG.data.weapon[rarity];
                itemNum = itemList[Math.floor(Math.random() * itemList.length)];
                break;
            case 2:
                itemList = PRG.data.armor[rarity]
                itemNum = itemList[Math.floor(Math.random() * itemList.length)];
                break;
            case 3:
                itemList = PRG.data.shopItem[rarity]
				itemNum = itemList[Math.floor(Math.random() * itemList.length)];
				if (itemNum.length > 0) itemNum = itemNum[Math.floor(Math.random() * itemNum.length)];
				break;
			case 4:
				itemList = [11, 11, 12];
				itemNum = itemList[Math.floor(Math.random() * itemList.length)];
				break;
			default:
				itemList = PRG.data.shopItem[rarity]
				itemNum = itemList[Math.floor(Math.random() * itemList.length)];
                break;
        }
		return itemNum;
    }

// PRG_SelectSkill //
	PRG.pushSelectSkillMode = function (mode) {
		this._selectSkillMode.push(mode);
	}

	PRG.getLevelupSkills = function (num) {
		var skills = [];
		var skill;
		var rarity = 0;
		var rarityRand = null;
		var index;
		var uncommon = 1 - 0.4 * $gamePlayer.battler().level / 6 * (1 + $gamePlayer.battler().luc / 60);
		var rare = 1 - 0.2 * $gamePlayer.battler().level / 6 * (1 + $gamePlayer.battler().luc / 60);
		var legend = 1 - 0.07 * $gamePlayer.battler().level / 6 * (1 + $gamePlayer.battler().luc / 60);

		if ($gameVariables._data[1] == 14) skills = [156,166,176]
		else for (var i = 0; i < num; i++) {
			var playerLearnedSkill = [];
			var playerNotMasteredSkills = [];
			var playerSkills = $gamePlayer.battler().skills();
			for (var j = 0; j < playerSkills.length; j++) {
				if (playerSkills[j].id < 100 || playerSkills[j].id > 350) continue;
				if (!playerSkills[j].qmeta.LevelUpTo) playerLearnedSkill.push(playerSkills[j].id - (playerSkills[j].id - 1)%5);
				else {
					playerLearnedSkill.push(playerSkills[j].id - (playerSkills[j].id - 1) % 5);
					playerNotMasteredSkills.push(playerSkills[j].id+1);
                }
			}
			if (i == num - 1 && playerNotMasteredSkills.length > 0) // 마지막스킬은 배운것중에서
			{
				if (Math.random() > 0.3 / playerNotMasteredSkills.length) { // 스킬갯수에따라 70%, 80%확률로 배운것중에서
					skills.push(playerNotMasteredSkills[Math.floor(playerNotMasteredSkills.length * Math.random())])
					continue;
				}
            }
			rarityRand = Math.random();
			if (rarityRand > legend) rarity = 2;
			else if (rarityRand > rare) rarity = 2;
			else if (rarityRand > uncommon) rarity = 1;
			else rarity = 0;
			if ($gamePlayer.battler().level == 2) rarity = 0;

			skill = this.data.levelupMagic[rarity];
			skill.forEach(function (skillId) {
				if (playerLearnedSkill.contains(skillId)) skill.splice(skill.indexOf(skillId), 1);
			});

			index = Math.floor(Math.random() * skill.length);
			var skill = skill.splice(index, 1)[0];

			if (skill) skills.push(skill)
		}
		this.refreshLevelupMagic();
		return skills;
	}

	PRG.getRelics = function (num, rarity) {
		var relics = [];
		var index, randomAbilityId;
		var abilityList = PRG.data.abil[rarity - 1];
		for (var i = 0; i < num; i++) {
			if (abilityList.length < 1) {
				for (var i = 0; i < 3; i++) {
					rarity++;
					abilityList = PRG.data.abil[rarity - 1];
					if (abilityList.length > 0) break;
				}
			}
			index = Math.floor(Math.random() * abilityList.length);
			randomAbilityId = abilityList.splice(index, 1)[0];
			relics.push(randomAbilityId);
		}
		return relics;
	}

	PRG.getWeaponSelection = function(num, rarity) {
		num = num || 3; // Default to 3 weapons if not specified
		rarity = rarity || 1; // Default to rarity 1 if not specified
	
		var weapons = [];
		var weaponList = this.data.weapon[rarity - 1];
	
		// If we don't have enough weapons of the specified rarity, look for higher rarities
		while (weapons.length < num && rarity <= 4) {
			weaponList = this.data.weapon[rarity - 1];
			
			while (weapons.length < num && weaponList.length > 0) {
				var index = Math.floor(Math.random() * weaponList.length);
				var weaponId = weaponList.splice(index, 1)[0];
				if (weaponId > 16) {  // Only add weapons with ID > 16
					weapons.push(weaponId);
				}
			}
	
			rarity++;
		}
	
		return weapons;
	};

    /* 상자 아이템 여기서 뽑아쓸것
    switch (type) {
        case 'weapon':
            item = $dataWeapons[data.weapon[rarity][Math.floor(Math.random() * data.weapon[rarity].length)]];
            item.type = 1;
            $gameMap.copyChestItemFrom(1, 44, item, this.x, this.y, false);
            break;
        case 'armor':
            item = $dataArmors[data.armor[rarity][Math.floor(Math.random() * data.armor[rarity].length)]];
            item.type = 2;
            $gameMap.copyChestItemFrom(1, 45, item, this.x, this.y, false);
            break;
        case 'magic':
            item = $dataItems[data.magic[rarity][Math.floor(Math.random() * data.magic[rarity].length)]];
            item.type = 0;
            $gameMap.copyChestItemFrom(1, 43, item, this.x, this.y, false);
            break;
        case 'stat':
            item = $dataItems[data.stat[rarity][Math.floor(Math.random() * data.stat[rarity].length)]];
            item.type = 0;
            $gameMap.copyChestItemFrom(1, 43, item, this.x, this.y, false);
            break;
        default:
            item = $dataItems[data.stat[rarity][Math.floor(Math.random() * data.stat[rarity].length)]];
            item.type = 0;
            $gameMap.copyChestItemFrom(1, 43, item, this.x, this.y, false);
            break;
    } */

	// PRG Set up Event Contents ie; Shop Contents, Chest Contents
	PRG.setupContents = function () {
		//make event contents
		var min = 0;
		var rand = null;
		var floor = $gameVariables.value(104);

		PRG._enableEvents = [];
		PRG._events = [];

		if (floor == 1 || PRG._currentEventTurns.length == 0) {
			PRG.InitEventTurns();
		}

		min = Math.min.apply(null, PRG._currentEventTurns);
		for (var i = 0; i < PRG._currentEventTurns.length; i++) {
			PRG._currentEventTurns[i]--;
			if (PRG._currentEventTurns[i] < min) PRG._enableEvents.push(i);
			; //로그라이크맵에서 행해지는 모든턴1씩 빼기
		}
		if (min < 0 || PRG._enableEvents.length < 2) {
			while (min < 0 || PRG._enableEvents.length < 2) {
				min++;
				for (var i = 0; i < PRG._currentEventTurns.length; i++) {
					if (PRG._currentEventTurns[i] < min && PRG._enableEvents.indexOf(i) < 0) PRG._enableEvents.push(i);
					; //로그라이크맵에서 행해지는 모든턴1씩 빼기
				}
			}
		}
		// 시작맵에서 행해지는 event_process

		var rand = Math.random();
		if (rand > 0.7) rand = Math.random();

		var event = PRG._enableEvents[Math.floor(PRG._enableEvents.length * rand)];

			PRG._events.push(event)
			PRG._enableEvents.splice(PRG._enableEvents.indexOf(event), 1);
			PRG._currentEventTurns[event] = PRG.data.eventCooldowns[event] + 1;

		var rand = Math.random();
		if (rand > 0.7) rand = Math.random();

		var event = PRG._enableEvents[Math.floor(PRG._enableEvents.length * rand)];

			PRG._events.push(event)
			PRG._enableEvents.splice(PRG._enableEvents.indexOf(event), 1);
			PRG._currentEventTurns[event] = PRG.data.eventCooldowns[event] + 1;


		//make mary shop contents
		//item(0) 21~29 : usable item
		//item(0) 51~59 : skill book
		//weapon(1) 1~3
		//armor(2) 17~23

		/*
		 상점은 최소 3개, 최대 5개로 이루어져 있다.
		 1층~2층은 3개
		 3층~6층은 4개
		 7~9층은 5개
		 무기1개, 방어구1개, 아이템 1개. 아이템은 하트와 열쇠 포함
		 4개 이상일 경우 랜덤1개. 아이템 40%, 방어구 35%, 무기 25%
		  
		 */


		PRG._maryGoods = [];
		var goodsNum = $gameVariables._data[104] > 6 ? 6 : 5;
		if ($gameVariables._data[108] < goodsNum) goodsNum = $gameVariables._data[108];
		var goodsIds = [];
		var id = null;
		var item = [];



		var index = 0;
		var type = null;
		var dupCheck = null;
		while (index < goodsNum) {
			if (index == 0) {
				if (Math.random() > 0.2) type = 4;
				else type = 3;
			} else if (index <= 2) {
				type = 2;
			} else if (index <= 4) {
				type = 3;
			} else {
				if (Math.random() > 0.9) type = 1;
				else if (Math.random() > 0.6) type = 2;
				else type = 3;
			}
			//if (type > 2) type = 2; // 데모버전에서 방어구만 나오게
			id = PRG.getShopItem(type);
			item = [type, id];

			dupCheck = goodsIds.filter(function (item) {
				if (item[0] == type && item[1] == id) return true;
			})
			
			if (dupCheck.length <= 0) {
				goodsIds.push(item);
				index++;
			}
		}


		for (var i = 0; i < goodsNum; i++) {
			item = goodsIds[Math.floor(Math.random() * goodsIds.length)];
			goodsIds.splice(goodsIds.indexOf(item), 1);
			PRG._maryGoods.push([item[0],item[1], 0, 0])
		}
	}

	// PRG Random Map Generator
	PRG.randomMap = async function (direction, biome) {
		var map = () => {
			if (direction == 'camp') {
				console.log(direction == 'camp', direction)
				switch(biome) {
					case 'forest':
						return 8;
					case 'dessert':
						return 67;
					case 'tundra':
						return 85;
					case 'underwater':
						return 103;
					case 'volcano':
						return 121;
					case 'void':
						return 139;
					case 'swamp':
						return 157;
				}
			} else {
				if ($gameVariables.value(321) == 50) {
					$gamePlayer.reserveTransfer(221, 16, 24, null, 0);
				} else {
					// var random = Math.floor(Math.random() * (61-51) + 51);
					var array = [175, 176, 177, 180, 181, 182, 183, 185, 186, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232]
					var random = array[array.length * Math.random() | 0]
					if(random == $gameMap.mapId()) {
						// return Math.floor(Math.random() * (23-14) + 14);
						return map();
					} else {
						return random;
					}
					
				}
			}
		}
		const mapId = map();
		// const mapForest = [
		// 	// Camp
		// 	{
		// 		mapNumber: 49,
		// 		mapCampX: 8,
		// 		mapCampY: 9,
		// 	},
		// 	// Battle Zones
		// 	{
		// 		mapNumber: 51,
		// 		mapTopX: 9,
		// 		mapTopY: 2,
		// 		mapLeftX: 2,
		// 		mapLeftY: 5,
		// 		mapRightX: 14,
		// 		mapRightY: 5,
		// 		mapDownX: 9,
		// 		mapDownY: 9,
		// 	},
		// 	{
		// 		mapNumber: 52,
		// 		mapTopX: 9,
		// 		mapTopY: 2,
		// 		mapLeftX: 2,
		// 		mapLeftY: 5,
		// 		mapRightX: 14,
		// 		mapRightY: 5,
		// 		mapDownX: 9,
		// 		mapDownY: 9,
		// 	},
		// 	{
		// 		mapNumber: 53,
		// 		mapTopX: 9,
		// 		mapTopY: 2,
		// 		mapLeftX: 2,
		// 		mapLeftY: 5,
		// 		mapRightX: 14,
		// 		mapRightY: 5,
		// 		mapDownX: 9,
		// 		mapDownY: 9,
		// 	},
		// 	{
		// 		mapNumber: 54,
		// 		mapTopX: 9,
		// 		mapTopY: 2,
		// 		mapLeftX: 2,
		// 		mapLeftY: 5,
		// 		mapRightX: 14,
		// 		mapRightY: 5,
		// 		mapDownX: 9,
		// 		mapDownY: 9,
		// 	},
		// 	{
		// 		mapNumber: 55,
		// 		mapTopX: 9,
		// 		mapTopY: 2,
		// 		mapLeftX: 2,
		// 		mapLeftY: 5,
		// 		mapRightX: 14,
		// 		mapRightY: 5,
		// 		mapDownX: 9,
		// 		mapDownY: 9,
		// 	},
		// 	{
		// 		mapNumber: 56,
		// 		mapTopX: 9,
		// 		mapTopY: 2,
		// 		mapLeftX: 2,
		// 		mapLeftY: 5,
		// 		mapRightX: 14,
		// 		mapRightY: 5,
		// 		mapDownX: 9,
		// 		mapDownY: 9,
		// 	},
		// 	{
		// 		mapNumber: 57,
		// 		mapTopX: 9,
		// 		mapTopY: 2,
		// 		mapLeftX: 2,
		// 		mapLeftY: 5,
		// 		mapRightX: 14,
		// 		mapRightY: 5,
		// 		mapDownX: 9,
		// 		mapDownY: 9,
		// 	},
		// 	{
		// 		mapNumber: 58,
		// 		mapTopX: 9,
		// 		mapTopY: 2,
		// 		mapLeftX: 2,
		// 		mapLeftY: 5,
		// 		mapRightX: 14,
		// 		mapRightY: 5,
		// 		mapDownX: 9,
		// 		mapDownY: 9,
		// 	},
		// 	{
		// 		mapNumber: 59,
		// 		mapTopX: 9,
		// 		mapTopY: 2,
		// 		mapLeftX: 2,
		// 		mapLeftY: 5,
		// 		mapRightX: 14,
		// 		mapRightY: 5,
		// 		mapDownX: 9,
		// 		mapDownY: 9,
		// 	},
		// 	{
		// 		mapNumber: 60,
		// 		mapTopX: 9,
		// 		mapTopY: 2,
		// 		mapLeftX: 2,
		// 		mapLeftY: 5,
		// 		mapRightX: 14,
		// 		mapRightY: 5,
		// 		mapDownX: 9,
		// 		mapDownY: 9,
		// 	},
		// ]

		const mapForest = [
			// Battle Zones
			{
				mapNumber: 175,
				mapSpawnX: 22,
				mapSpawnY: 3
			},
			{
				mapNumber: 176,
				mapSpawnX: 24,
				mapSpawnY: 4
			},
			{
				mapNumber: 177,
				mapSpawnX: 18,
				mapSpawnY: 2
			},
			{
				mapNumber: 180,
				mapSpawnX: 10,
				mapSpawnY: 2
			},
			{
				mapNumber: 181,
				mapSpawnX: 10,
				mapSpawnY: 23
			},
			{
				mapNumber: 182,
				mapSpawnX: 14,
				mapSpawnY: 19
			},
			{
				mapNumber: 183,
				mapSpawnX: 12,
				mapSpawnY: 22
			},
			{
				mapNumber: 185,
				mapSpawnX: 12,
				mapSpawnY: 22
			},
			{
				mapNumber: 186,
				mapSpawnX: 13,
				mapSpawnY: 22
			},
			{
				mapNumber: 222,
				mapSpawnX: 15,
				mapSpawnY: 23
			},
			{
				mapNumber: 223,
				mapSpawnX: 8,
				mapSpawnY: 21
			},
			{
				mapNumber: 224,
				mapSpawnX: 21,
				mapSpawnY: 14
			},
			{
				mapNumber: 225,
				mapSpawnX: 8,
				mapSpawnY: 22
			},
			{
				mapNumber: 226,
				mapSpawnX: 4,
				mapSpawnY: 18
			},
			{
				mapNumber: 227,
				mapSpawnX: 23,
				mapSpawnY: 14
			},
			{
				mapNumber: 228,
				mapSpawnX: 17,
				mapSpawnY: 4
			},
			{
				mapNumber: 229,
				mapSpawnX: 14,
				mapSpawnY: 22
			},
			{
				mapNumber: 230,
				mapSpawnX: 22,
				mapSpawnY: 12
			},
			{
				mapNumber: 231,
				mapSpawnX: 2,
				mapSpawnY: 13
			},
			{
				mapNumber: 232,
				mapSpawnX: 14,
				mapSpawnY: 21
			},
		]

		var mapSpawn = [];
		if (biome) {
			switch(biome) {
				case 'forest':
					mapSpawn = mapForest.find(({ mapNumber }) => mapNumber == mapId);
					break;
				case 'dessert':
					mapSpawn = mapDessert.find(({ mapNumber }) => mapNumber == mapId);
					break;
				case 'tundra':
					mapSpawn = mapTundra.find(({ mapNumber }) => mapNumber == mapId);
					break;
				case 'underwater':
					mapSpawn = mapUnderWater.find(({ mapNumber }) => mapNumber == mapId);
					break;
				case 'volcano':
					mapSpawn = mapVolcano.find(({ mapNumber }) => mapNumber == mapId);
					break;
				case 'void':
					mapSpawn = mapVoid.find(({ mapNumber }) => mapNumber == mapId);
					break;
				case 'swamp':
					mapSpawn = mapSwamp.find(({ mapNumber }) => mapNumber == mapId);
					break;
			}
		}

		if (direction) {
			switch (direction) {
				case 'top':
					xMap = mapSpawn.mapDownX;
					yMap = mapSpawn.mapDownY;
					break;
				case 'right':
					xMap = mapSpawn.mapRightX;
					yMap = mapSpawn.mapRightY;
					break;
				case 'left':
					xMap = mapSpawn.mapLeftX;
					yMap = mapSpawn.mapLeftY;
					break;
				case 'down':
					xMap = mapSpawn.mapTopX;
					yMap = mapSpawn.mapTopY;
					break;
				case 'camp':
					xMap = mapSpawn.mapCampX;
					yMap = mapSpawn.mapCampY;
				case 'stage':
					xMap = mapSpawn.mapSpawnX;
					yMap = mapSpawn.mapSpawnY;
			}
		}

		console.log(mapId, xMap, yMap, 'map x y')
		console.log($gameMap._mapId, 'current map')
		$gameSelfSwitches.clear();
		$gameSystem.clearCustomEvents($gameMap._mapId)
		$gameVariables.setValue(321, $gameVariables.value(321) + 5);
		$gameVariables.setValue(325, 0);
		$gameVariables.setValue(323, 0);
		return $gamePlayer.reserveTransfer(mapId, xMap, yMap, null, 0);
	}
})();

// *******************  CIRCLE/OVAL SHAPE ***********************************
	// from http://scienceprimer.com/draw-oval-html5-canvas
	Bitmap.prototype.FillCircle = function(centerX, centerY, xradius, yradius, color1) {
		centerX = centerX + 10;
		centerY = centerY + 10;

	    var context = this._context;
	    context.save();
	    context.fillStyle = color1;
	   	context.beginPath();
	   	var rotation = 0;
	   	var start_angle = 0;
	   	var end_angle = 2 * Math.PI;
		for (var i = start_angle * Math.PI; i < end_angle * Math.PI; i += 0.01 ) {
    		xPos = centerX - (yradius * Math.sin(i)) * Math.sin(rotation * Math.PI) + (xradius * Math.cos(i)) * Math.cos(rotation * Math.PI);
    		yPos = centerY + (xradius * Math.cos(i)) * Math.sin(rotation * Math.PI) + (yradius * Math.sin(i)) * Math.cos(rotation * Math.PI);

    		if (i == 0) {
        		context.moveTo(xPos, yPos);
    		} else {
        		context.lineTo(xPos, yPos);
    		}
		}
		context.fill();
		context.closePath();
	    context.restore();
	    this._setDirty();
	};
	
	// These are global variables so they can be used by other plugins
 
	var Terrax_tint_speed = 60;
	var Terrax_tint_target = '#000000';

	var Terrax_ABS_skill_x = [];
	var Terrax_ABS_skill_y = [];
	var Terrax_ABS_skill = [];

	var Terrax_ABS_blast_x = [];
	var Terrax_ABS_blast_y = [];
	var Terrax_ABS_blast = [];
	var Terrax_ABS_blast_duration = [];
	var Terrax_ABS_blast_fade = [];
	var Terrax_ABS_blast_grow = [];
	var Terrax_ABS_blast_mapid = [];

	// EFFECTS AND QUASI ABS SUPPORT


						// SKILLS/MISSLES (effects without duration)

						for (var i = 0; i < Terrax_ABS_skill_x.length; i++) {
							var settings = Terrax_ABS_skill[i];
							if (settings) {
								if (settings != 'undefined') {
									var setstring = settings.toString();
									var lightset = setstring.split(",");
									//Graphics.Debug('Test',setstring+" "+lightset[0]+" "+lightset[1]);

									var px = Terrax_ABS_skill_x[i];
									var py = Terrax_ABS_skill_y[i];
									var x1 = px - (dx * pw);
									var y1 = py - (dy * ph);

									this._maskBitmap.radialgradientFillRect(x1, y1, 0, lightset[0], lightset[1], '#000000', false);
								}
							}
						}

						// clear arrays after draw
						Terrax_ABS_skill_x = [];
						Terrax_ABS_skill_y = [];
						Terrax_ABS_skill = [];

						// BLASTS (effect with duration)



						for (var i = 0; i < Terrax_ABS_blast_x.length; i++) {
							var settings = Terrax_ABS_blast[i];
							if (settings) {
								if (settings != 'undefined') {
									var setstring = settings.toString();

									// Settings : Lightset[]
									// 0. Radius
									// 1. Color
									// 2. Time in Frames
									// 3. Keyword (optional)   FADEIN FADEOUT FADEBOTH GROW SHRINK GROWSHRINK BIO
									// 4. Fade/Grow Speed in frames

									var lightset = setstring.split(",");

									if (Number(lightset[2]) > 0 && Terrax_ABS_blast_duration[i] == -1) {
										Terrax_ABS_blast_duration[i] = lightset[2]
									}

									var fcolor = lightset[1];
									var fradius = lightset[0];

									if (setstring.length > 2) {  // SPECIALS  FADE/GROW ETC.

										if (lightset[3] == 'FADEIN' || lightset[3] == 'FADEINOUT' || lightset[3] == 'BIO') {

											var fadelength = Number(lightset[4]);   // number of frames to fade in

											if (Terrax_ABS_blast_fade[i] == -1) {
												Terrax_ABS_blast_fade[i] = 0;
											}
											if (Terrax_ABS_blast_fade[i] < fadelength) {
												Terrax_ABS_blast_fade[i] = Terrax_ABS_blast_fade[i] + 1;

												var startcolor = "#000000";
												var targetcolor = lightset[1];
												var fadecount = Terrax_ABS_blast_fade[i];

												var r = hexToRgb(startcolor).r;
												var g = hexToRgb(startcolor).g;
												var b = hexToRgb(startcolor).b;

												var r2 = hexToRgb(targetcolor).r;
												var g2 = hexToRgb(targetcolor).g;
												var b2 = hexToRgb(targetcolor).b;

												var stepR = (r2 - r) / (fadelength);
												var stepG = (g2 - g) / (fadelength);
												var stepB = (b2 - b) / (fadelength);

												var r3 = Math.floor(r + (stepR * fadecount));
												var g3 = Math.floor(g + (stepG * fadecount));
												var b3 = Math.floor(b + (stepB * fadecount));
												if (r3 < 0) {
													r3 = 0
												}
												if (g3 < 0) {
													g3 = 0
												}
												if (b3 < 0) {
													b3 = 0
												}
												if (r3 > 255) {
													r3 = 255
												}
												if (g3 > 255) {
													g3 = 255
												}
												if (b3 > 255) {
													b3 = 255
												}
												fcolor = "#" + ((1 << 24) + (r3 << 16) + (g3 << 8) + b3).toString(16).slice(1);
												//Graphics.Debug('FADEIN COLOR', fcolor + " " + r + " " + r2 + " " + stepR + " " + r3);

												if (Terrax_ABS_blast_fade[i] == fadelength) {
													Terrax_ABS_blast_fade[i] = 100000;  // for fadeinout
												}
											}
										}

										if (lightset[3] == 'FADEOUT') {
											var fadelength = Number(lightset[4]);   // number of frames to fade out
											if (Terrax_ABS_blast_fade[i] == -1 && Terrax_ABS_blast_duration[i] < fadelength) {
												// start fading when blastduration equals fadelength
												Terrax_ABS_blast_fade[i] = 0;
											}
											if (Terrax_ABS_blast_fade[i] < fadelength && Terrax_ABS_blast_fade[i] >= 0) {
												Terrax_ABS_blast_fade[i] = Terrax_ABS_blast_fade[i] + 1;
												//Graphics.Debug('FADEOUT',Terrax_ABS_blast_fade[i]);
												var startcolor = lightset[1];
												var targetcolor = "#000000";
												var fadecount = Terrax_ABS_blast_fade[i];

												var r = hexToRgb(startcolor).r;
												var g = hexToRgb(startcolor).g;
												var b = hexToRgb(startcolor).b;

												var r2 = hexToRgb(targetcolor).r;
												var g2 = hexToRgb(targetcolor).g;
												var b2 = hexToRgb(targetcolor).b;

												var stepR = (r2 - r) / (fadelength);
												var stepG = (g2 - g) / (fadelength);
												var stepB = (b2 - b) / (fadelength);

												var r3 = Math.floor(r + (stepR * fadecount));
												var g3 = Math.floor(g + (stepG * fadecount));
												var b3 = Math.floor(b + (stepB * fadecount));
												if (r3 < 0) {
													r3 = 0
												}
												if (g3 < 0) {
													g3 = 0
												}
												if (b3 < 0) {
													b3 = 0
												}
												if (r3 > 255) {
													r3 = 255
												}
												if (g3 > 255) {
													g3 = 255
												}
												if (b3 > 255) {
													b3 = 255
												}
												fcolor = "#" + ((1 << 24) + (r3 << 16) + (g3 << 8) + b3).toString(16).slice(1);
												//Graphics.Debug('FADEIN COLOR', fcolor + " " + r + " " + r2 + " " + stepR + " " + r3);
											}
										}

										if (lightset[3] == 'FADEINOUT' || lightset[3] == 'BIO') {
											// fadeout only, fadein is handled by fadein
											var fadelength = Number(lightset[4]);   // number of frames to fade out
											if (Terrax_ABS_blast_fade[i] == 100000 && Terrax_ABS_blast_duration[i] < fadelength) {
												// start fading when blastduration equals fadelength
												Terrax_ABS_blast_fade[i] = 100001;
											}
											if (Terrax_ABS_blast_fade[i] - 100000 < fadelength && Terrax_ABS_blast_fade[i] > 100000) {
												Terrax_ABS_blast_fade[i] = Terrax_ABS_blast_fade[i] + 1;
												//Graphics.Debug('FADEOUT',Terrax_ABS_blast_fade[i]);
												var startcolor = lightset[1];
												var targetcolor = "#000000";
												var fadecount = Terrax_ABS_blast_fade[i] - 100000;

												var r = hexToRgb(startcolor).r;
												var g = hexToRgb(startcolor).g;
												var b = hexToRgb(startcolor).b;

												var r2 = hexToRgb(targetcolor).r;
												var g2 = hexToRgb(targetcolor).g;
												var b2 = hexToRgb(targetcolor).b;

												var stepR = (r2 - r) / (fadelength);
												var stepG = (g2 - g) / (fadelength);
												var stepB = (b2 - b) / (fadelength);

												var r3 = Math.floor(r + (stepR * fadecount));
												var g3 = Math.floor(g + (stepG * fadecount));
												var b3 = Math.floor(b + (stepB * fadecount));
												if (r3 < 0) {
													r3 = 0
												}
												if (g3 < 0) {
													g3 = 0
												}
												if (b3 < 0) {
													b3 = 0
												}
												if (r3 > 255) {
													r3 = 255
												}
												if (g3 > 255) {
													g3 = 255
												}
												if (b3 > 255) {
													b3 = 255
												}
												fcolor = "#" + ((1 << 24) + (r3 << 16) + (g3 << 8) + b3).toString(16).slice(1);
												//Graphics.Debug('FADEIN COLOR', fcolor + " " + r + " " + r2 + " " + stepR + " " + r3);
											}

										}

										if (lightset[3] == 'GROW' || lightset[3] == 'GROWSHRINK' || lightset[3] == 'BIO') {

											var growlength = Number(lightset[4]);   // number of frames to grow

											if (Terrax_ABS_blast_grow[i] == -1) {
												Terrax_ABS_blast_grow[i] = 0;
											}
											if (Terrax_ABS_blast_grow[i] < growlength) {

												if (lightset[3] == 'BIO') {
													Terrax_ABS_blast_grow[i] = Terrax_ABS_blast_grow[i] + 0.5;
												} else {
													Terrax_ABS_blast_grow[i] = Terrax_ABS_blast_grow[i] + 1;
												}

												var startradius = 0;
												var targetradius = lightset[0];
												var radiuscount = Terrax_ABS_blast_grow[i];

												var step = (targetradius - startradius) / (growlength);

												fradius = Math.floor(step * radiuscount);

											}
											if (Terrax_ABS_blast_grow[i] == growlength) {
												Terrax_ABS_blast_grow[i] = 100000;
											}
										}

										if (lightset[3] == 'SHRINK') {

											var shrinklength = Number(lightset[4]);   // number of frames to shrink

											if (Terrax_ABS_blast_grow[i] == -1 && Terrax_ABS_blast_duration[i] < shrinklength) {
												Terrax_ABS_blast_grow[i] = 0;
											}
											if (Terrax_ABS_blast_grow[i] < shrinklength && Terrax_ABS_blast_grow[i] >= 0) {
												Terrax_ABS_blast_grow[i] = Terrax_ABS_blast_grow[i] + 1;

												var startradius = lightset[0];
												var targetradius = 0;
												var radiuscount = Terrax_ABS_blast_grow[i];

												var step = (startradius - targetradius ) / (shrinklength);
												fradius = Number(lightset[0]) - Math.floor(step * radiuscount);

											}

										}

										if (lightset[3] == 'GROWSHRINK') {
											// GROW is handled in grow
											var shrinklength = Number(lightset[4]);   // number of frames to shrink

											//Graphics.Debug('GROWSHRINK',Terrax_ABS_blast_grow[i]);

											if (Terrax_ABS_blast_grow[i] == 100000 && Terrax_ABS_blast_duration[i] < shrinklength) {
												Terrax_ABS_blast_grow[i] = 100001;
											}
											if (Terrax_ABS_blast_grow[i] - 100000 < shrinklength && Terrax_ABS_blast_grow[i] > 100000) {
												Terrax_ABS_blast_grow[i] = Terrax_ABS_blast_grow[i] + 1;

												var startradius = lightset[0];
												var targetradius = 0;
												var radiuscount = Terrax_ABS_blast_grow[i] - 100000;

												var step = (startradius - targetradius ) / (shrinklength);
												fradius = Number(lightset[0]) - Math.floor(step * radiuscount);

											}
										}

									}


									if (Terrax_ABS_blast_duration[i] > 0) {
										Terrax_ABS_blast_duration[i]--;
										//Graphics.Debug('Test',i+" "+lightset[0]+" "+lightset[1]+" "+Terrax_ABS_blast_duration[i]);
										if (Terrax_ABS_blast_mapid[i] == $gameMap.mapId()) {
											var px = Terrax_ABS_blast_x[i];
											var py = Terrax_ABS_blast_y[i];

											var x1 = px - (dx * pw);
											var y1 = py - (dy * ph);

											// paralaxloop does something weird with coordinates.. recalc needed

											if ($dataMap.scrollType === 2 || $dataMap.scrollType === 3) {
												if (dx - 10 > px / pw) {
													var lxjump = $gameMap.width() - (dx - px / pw);
													x1 = (lxjump * pw);
												}
											}
											if ($dataMap.scrollType === 1 || $dataMap.scrollType === 3) {
												if (dy - 10 > py / ph) {
													var lyjump = $gameMap.height() - (dy - py / ph);
													y1 = (lyjump * ph);
												}
											}
											x1 = x1 + (pw / 2);
											y1 = y1 + (ph / 2);

											//Graphics.Debug('Test',dy+" "+py+" "+y1+" "+$gameMap.height()+" "+lyjump);
											this._maskBitmap.radialgradientFillRect(x1, y1, 0, fradius, fcolor, '#000000', false);
										}
									} else {
										Terrax_ABS_blast[i] = "DELETE";
									}
								}
							}
						}

						// remove all expired items (not done in previous loop because it cases flickering)
						for (var i = 0; i < Terrax_ABS_blast_x.length; i++) {
							var settings = Terrax_ABS_blast[i];
							if (settings) {
								if (settings != 'undefined') {
									var setstring = settings.toString();
									if (setstring == "DELETE") {
										Terrax_ABS_blast_x.splice(i, 1);
										Terrax_ABS_blast_y.splice(i, 1);
										Terrax_ABS_blast.splice(i, 1);
										Terrax_ABS_blast_duration.splice(i, 1);
										Terrax_ABS_blast_mapid.splice(i, 1);
										Terrax_ABS_blast_fade.splice(i, 1);
										Terrax_ABS_blast_grow.splice(i, 1);
									}
								}
							}
						}