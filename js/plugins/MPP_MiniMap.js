// ================================================ =============================
// MPP_MiniMap.js
// ================================================ =============================
// Copyright (c) 2019 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// ================================================ =============================

/*:
    *@plugindesc[ver.3.2] 미니 맵을 화면에 표시합니다.
 *@author 목성 펭귄
    *@help[] 안은 표기하지 않아도 작동합니다.
 *플러그인 명령:
 *MiniMap n # 미니 맵보기
    *ChangeMinimap mapId # 지정된 맵 ID를 미니 맵으로 변경
        *SetMinimapZoom zoom # 미니 맵의 배율 만 변경
            *SetMinimapFrame n # 미니 맵에 프레임 이미지를 표시
                *  
 *Marking n mapId Ev id Cir rc # 이벤트를 중심으로 원형 마킹
    *Marking n mapId Pos xy Cir rc # 좌표를 중심으로 원형의 마킹을 표시
        *Marking n mapId Pos xy Rec whc # 사각형의 마킹을 표시
            *Marking n mapId Ev id Ico m # 이벤트의 위치에 마커 아이콘을 표시
                *Marking n mapId Pos xy Ico m # 좌표(x, y)에 마커 아이콘을 표시
                    *DeleteMarking n # 마킹 번호 n을 삭제
                        *  
 *HighlightMarking n[bool]# 마킹 번호 n을 강조
    *HighlightEvMarker id[bool]# 이벤트 마커 아이콘을 강조 표시
        *
 *맵 메모:
 *<Minimap : name> #이 맵의 미니 맵 이미지의 파일 이름
 *<MinimapZoom : n> #이 맵의 미니 맵 배율
    *
    *이벤트 메모 :
 *<Marker : n> #이 이벤트 마커 아이콘 번호
    *
    *================================================= ===============
    *▼ 플러그인 명령 자세한
    *--------------------------------
    *〇 플러그인 명령 일반
    *지정하는 값은 변수를 사용할 수 있습니다.
    *v [n]를 사용하여 n 번째 변수의 값을 참조합니다.
    *
    *※ 표시 번호
    *표시 번호는 임의의 숫자를 지정하십시오.
    *사진의 번호와 같은 동일한 번호를 사용 덮어 쓰게됩니다.
    *
    *※ 색상 번호
    *색상 번호는 플러그인 파라미터 [Marking Colors]에서 설정 한 색상의 번호를
    *지정하십시오.
    *
    *--------------------------------
    *〇 MiniMap n
    *n : 호출 데이터 번호
    *
    *미니 맵의 표시 위치 나 표시 내용을 변경합니다.
    *플러그인 파라미터 [Minimap Data]에서 미리 설정 해둔 데이터를
    *호출합니다.
    *0을 지정하면 비 표시됩니다.
    *
    *--------------------------------
    *〇 ChangeMinimap mapId
    *mapId : 표시하는 맵 ID
    *
    *미니 맵을 지정된 맵의 것으로 전환합니다.
    *mapId에 0을 지정하면 현재 플레이어가있는 맵입니다.
    *
    *현재의 맵과는 다른 맵을 표시 한 경우 표시는 표시되지만,
    *이벤트 마커 아이콘이 표시되지 않습니다.
    *차량의 마커 아이콘이 표시됩니다.
    *
    *--------------------------------
    *〇 SetMinimapFrame n
    *n : 프레임 이미지의 번호
    *
    *미니 맵에 이미지를 겹쳐서 표시하는 기능입니다.
    *미니 맵의 크기에 맞게 크기를 변경하는 기능은 없습니다.
    *사용하는 이미지는 img / pictures 폴더에 넣어주세요.
    *
    *여기에서 사용하는 이미지는 플러그인 파라미터 [Frame Images로 설정하고
    *그 번호를 지정하여 이미지를 표시 할 수 있습니다.
    *0을 지정하면 비 표시됩니다.
    *
    *--------------------------------
    *〇 Marking n mapId Ev id Cir r c1
    *n : 마킹 번호 (임의의 숫자)
    *mapId : 마킹 맵 ID (0에서 현재 맵)
    *id : 이벤트 ID
    *r : 반지름 (타일)
    *c : 색상 번호
    *
    *지정된 이벤트를 중심으로 한 원형의 표시를 미니 맵에 표시합니다.
    *Ev와 Cir 변경할 필요가 없습니다.
    *
    *예 : Marking 1 0 Ev 5 Cir 3 1
    *마킹 번호 : 1
    *맵 ID : 현재 맵
    *이벤트 ID : 5
    *반경 : 3 타일
    *색상 번호 : 1
    *
    *--------------------------------
    *〇 Marking n mapId Pos xy Cir rc
    *n : 마킹 번호 (임의의 숫자)
    *mapId : 마킹 맵 ID (0에서 현재 맵)
    *x, y : 중심 좌표 (x, y)
    *r : 반지름 (타일)
    *c : 색상 번호
    *
    *지정된 좌표 (x, y)를 중심으로 한 원형의 표시를 미니 맵에 표시합니다.
    *Pos와 Cir 변경할 필요가 없습니다.
    *
    *예 : Marking 1 0 Pos 13 9 Cir 3 1
    *마킹 번호 : 1
    *맵 ID : 현재 맵
    *중심 좌표 : X 13, Y 9
    *반경 : 3 타일
    *색상 번호 : 1
    *
    *--------------------------------
    *〇 Marking n mapId Pos xy Rec whc
    *n : 마킹 번호 (임의의 숫자)
    *mapId : 마킹 맵 ID (0에서 현재 맵)
    *x, y, w, h : 표시하는 좌표 (x, y)와 크기 (폭, 높이)
    *c : 색상 번호
    *
    *지정된 사각형 (x, y, w, h)의 표시를 미니 맵에 표시합니다.
    *Pos와 Rec 변경할 필요가 없습니다.
    *
    *--------------------------------
    *〇 Marking n mapId Ev id Ico m
    *n : 마킹 번호 (임의의 숫자)
    *mapId : 마킹 맵 ID (0에서 현재 맵)
    *id : 이벤트 ID
    *m : 마커 아이콘 번호
    *
    *미니 맵에서 지정된 이벤트의 위치에 마커 아이콘을 표시합니다.
    *Ev와 Ico 변경할 필요가 없습니다.
    *
    *마커 아이콘 번호에 대해서는 후술.
    *
    *예 : Marking 1 0 Ev 5 Ico 4
    *마킹 번호 : 1
    *맵 ID : 현재 맵
    *이벤트 ID : 5
    *아이콘 번호 : 4
    *
    *--------------------------------
    *〇 Marking n mapId Pos xy Ico m
    *n : 마킹 번호 (임의의 숫자)
    *mapId : 마킹 맵 ID (0에서 현재 맵)
    *x, y : 표시하는 좌표 (x, y)
    *m : 마커 아이콘 번호
    *
    *미니 맵에서 지정한 좌표 (x, y)에 마커 아이콘을 표시합니다.
    *Pos와 Ico 변경할 필요가 없습니다
    *
    *마커 아이콘 번호에 대해서는 후술.
    *
    *--------------------------------
    *〇 HighlightMarking n [bool]
    *n : 마킹 번호
    *bool : 강조 표시할지 여부 (true / false / 미 설정은 true)
    *
    *미니 맵의 표시 범위에 들어 있지 않더라도, 미니 맵의 구석에 마커 아이콘
    *표시되도록합니다.
    *강조 표시 할 수있는 마커 아이콘뿐입니다.
    *
    *bool에 true를 넣으면 강조되어 false를 넣으면 강조 표시가 해제됩니다.
    *구성되지 않은 경우는 true입니다.
    *
    *--------------------------------
    *〇 HighlightEvMarker id [bool]
    *id : 이벤트 ID
    *bool : 강조 표시할지 여부 (true / false / 미 설정은 true)
    *
    *저두 요.
    *현재 맵 이벤트에만 대응하고 있습니다.
    *
    *이벤트 명령의 위치 이동으로 맵을 전환
    *강조 유효 플래그는 리셋됩니다.
    *
    *
    *================================================= ===============
    *▼ 맵의 참고 자세한
    *--------------------------------
 *〇 <Minimap : name>
    *이 맵의 미니 맵 이미지를 지정한 파일 이름의 이미지로합니다.
    *구성되지 않은 경우 자동으로 생성됩니다.
    *
    *미니 맵 이미지는 img / system 폴더에 넣어주세요.
    *
    *
    *================================================= ===============
    *▼ 이벤트의 참고 자세한
    *--------------------------------
 *〇 <Marker : n>
    *이 이벤트의 위치에 마커 아이콘을 표시합니다.
    *n으로 표시 아이콘 번호를 지정합니다.
    *
    *마커 아이콘 번호에 대해서는 후술.
    *
    *이 마커 아이콘은 다음 조건 중 어느 하나라도 충족하는 경우
    *표시되지 않습니다.
    *이벤트의 출현 조건이 충족되지 않은 경우
    **이벤트 일시 지우기에 의해 삭제되는 경우
    *· 투명화가 ON으로되어있는 경우
    *
    *
    *================================================= ===============
    *▼ 플러그인 파라미터 상세
    *--------------------------------
    *〇 범위 지정에 대해
    *플러그인 파라미터 [Map IDs] [Wall Region IDs] [Floor Region IDs]는
    *범위 지정을 사용할 수 있습니다.
    *
    *nm로 표기하여 n에서 m까지의 숫자를 지정할 수 있습니다.
    *(예 : 1-4,8,10-12 => 1,2,3,4,8,10,11,12)
    *
    *--------------------------------
    *〇 Minimap Z
    *미니 맵의 Z 좌표를 설정할 수 있습니다.
    *
    *0 : 캐릭터와 날씨 화면의 색조 변경 위에 그림 아래
    *1 : 그림 위에 타이머 아래
    *2 : 타이머 위에 화면 암전 아래
    *3 : 화면의 플래시 위에
    *4 : 전체 스프라이트 위에
    *
    *--------------------------------
    *〇 Player Highlight?
    *플레이어의 마커 아이콘을 강조 표시할지 여부를 설정합니다.
    *[강조 표시 한 마커 아이콘의 확대 비율]은 적용되지 않습니다.
    *
    *기본적으로 플레이어가 미니 맵의 밖으로 나갈 수는 없지만,
    *화면의 스크롤과 옵션 2를 사용하는 경우에 효과가 있습니다.
    *
    *--------------------------------
    *〇 Vehicle Highlight?
    *차량의 마커 아이콘을 강조 표시할지 여부를 설정합니다.
    *[강조 표시 한 마커 아이콘의 확대 비율]은 적용되지 않습니다.
    *
    *--------------------------------
    *〇 Plugin Commands / Map Metadata / Event Metadata
    *
    *플러그인 명령 이름이나 메모 란에 사용하는 명령 이름을 변경할 수 있습니다.
    *명령을 줄이거 나 일본어 화 등이 가능합니다.
    *
    *플러그인 명령에만 명령 이름을 변경해도
    *기본 명령을 사용할 수 있습니다.
    *
    *
    *================================================= ===============
    *▼ 기타
    *--------------------------------
    *〇 마커 아이콘
    *마커 아이콘을 표시하려면 마커 아이콘 이미지가 필요합니다.
    *MinimapMarkerSet라는 이미지 파일을 img / system 폴더에
    *넣어주세요.
    *
    *마커 아이콘 이미지는 가로로 8 개 늘어 놓은 것을 1 블록과,
    *그 블록을 필요한만큼 세로로 길게 한 것입니다.
    *이미지의 폭을 8로 나눈 것이 마커 아이콘 1 개의 폭과 높이입니다.
    *
    *샘플 이미지 (자유 자재)는 다운로드 페이지에 있습니다.
    *
    *마커 아이콘 번호는 일반 아이콘과 같고,
    *가장 왼쪽을 0으로 오른쪽으로 1,2,3 ...입니다.
    *
    *--------------------------------
    *〇 이벤트 명령 [타일 세트 변경
    *본 플러그인은 이벤트 명령의 타일 세트의 변경은 지원하지 않습니다.
    *맵 이미지는 장면 전환시 생성되는 중간에 변경 될 수는 없습니다.
    *
    *================================
    *제작 : 목성 펭귄
    *URL : http://woodpenguin.blog.fc2.com/
    *
    *@param === Basic ===
    *@default === 기본 설정 ===
    *
    *@param Map IDs
    *@desc 미니 맵을 표시하는 맵 ID의 배열
    *(범위 지정 가능)
    *@default 1-5
    *@parent === Basic ===
    *
    *@param Minimap Data
 *@type struct <MinimapData>]
    *@desc 미니 맵 표시 위치의 배열
 *@default [ "{\"x \ "\"32 \ ", \"y \ "\"32 \ ", \"width \ "\"160 \ ", \"height \ "\" 128 \ ", \"type \ "\"1 \ ", \"opacity \ "\"192 \ ", \"zoom \ "\"1.0 \ "}", "{\"x \ ": \ "0 \", \ "y \"\ "0 \", \ "width \"\ "816 \", \ "height \"\ "624 \", \ "type \"\ " 0 \ ", \"opacity \ "\"192 \ ", \"zoom \ "\"1.0 \ "}", "{\"x \ "\"32 \ ", \"y \ ": \ "32 \", \ "width \"\ "160 \", \ "height \"\ "128 \", \ "type \"\ "0 \", \ "opacity \"\ " 192 \ ", \"zoom \ "\"1.0 \ "}"]
        *@parent === Basic ===
        *
        *@param Default Data Index
        *@type number
        *@desc 미니 맵 표시 위치의 기본값
        *@default 1
        *@parent === Basic ===
        *
        *@param Minimap Z
        *@type number
        *@max 4
        *@desc 미니 맵의 Z 좌표 (자세한 내용은 도움말 참조)
        *@default 0
        *@parent === Basic ===
        *
        *@param Frame Images
        *@type file []
        *@desc 프레임 이미지
        *@default []
        *@require 1
        *@dir img / pictures /
        *@parent === Basic ===
        *
        *@param Default Frame Index
        *@type number
        *@desc 프레임 이미지 번호의 기본값
        *@default 0
        *@parent === Basic ===
        *
        *
        *@param === Advanced ===
        *@default === 섬세한 설정 ===
        *
        *@param Update Count
        *@type number
        *@desc 업데이트 빈도
        *@default 80
        *@parent === Advanced ===
        *
        *@param Blink Duration
        *@type number
        *@desc 점멸 시간
        *(0 깜박임 없음)
        *@default 80
        *@parent === Advanced ===
        *
        *@param Scroll Map Link?
        *@type boolean
        *@desc 맵 스크롤을 실행했을 때, 미니 맵을 스크롤 할 것인지
        *@default false
        *@parent === Advanced ===
        *
        *
        *@param === Marker ===
        *@default === 마커 / 마킹 ===
        *
        *@param Player Marker _v3
 *@type struct <Marker>
            *@desc 플레이어 마커 아이콘
 *@default {"Icon Index": "1", "oy": "0.5", "turn?": "false"}
            *@parent === Marker ===
            *
            *@param Vehicle On Marker _v3
 *@type struct <Marker>
                *@desc 차량 탑승시 마커 아이콘
 *@default {"Icon Index": "7", "oy": "0.5", "turn?": "true"}
                *@parent === Marker ===
                *
                *@param Player Highlight?
                *@type boolean
                *@desc 플레이어 마커 아이콘을 강조 표시할지 여부
                *@default true
                *@parent === Marker ===
                *
                *@param Vehicle Off Markers _v3
 *@type struct <Vehicle>
                    *@desc 비 탑승시 차량의 마커 아이콘 번호
 *@default {"boat": "2", "ship": "2", "airship": "2"}
                    *@parent === Marker ===
                    *
                    *@param Marking Colors
                    *@type string []
                    *@desc 마킹 색상 번호의 배열
                    *@default [ "255,255,255,1.0", "32,160,214,1.0", "32,160,214,1.0", "255,120,76,1.0", "102,204,64,1.0", "153,204,255,1.0", "204,192,255,1.0" "255,255,160,1.0", "128,128,128,1.0"]
                    *@parent === Marker ===
                    *
                    *@param Highlight Marker Blink?
                    *@type boolean
                    *@desc 강조 표시 한 마커 아이콘을 점멸시키는 여부
                    *@default false
                    *@parent === Marker ===
                    *
                    *@param Highlight Marker Scale
                    *@desc 강조 표시 한 마커 아이콘의 확대 비율
                    *@default 1.5
                    *@parent === Marker ===
                    *
                    *
                    *@param === Auto Generate ===
                    *@default ===지도의 자동 생성 ===
                    *
                    *@param Tile Size
                    *@type number
                    *@desc 1 타일 크기
                    *@default 4
                    *@parent === Auto Generate ===
                    *
                    *@param Blur Intensity
                    *@type number
                    *@desc 흐리게 처리 강도
                    *@default 2
                    *@parent === Auto Generate ===
                    *
                    *
                    *@param ▽ Field Type ▽
                    *@default ▽ 모드 : 필드 유형 ▽
                    *@parent === Auto Generate ===
                    *
                    *@param noAria Color
                    *@desc 숲의 색깔
                    *@default 192,192,192,0.0
                    *@parent ▽ Field Type ▽
                    *
                    *@param Forest Color
                    *@desc 숲의 색깔
                    *@default 192,192,192,1.0
                    *@parent ▽ Field Type ▽
                    *
                    *@param Snow Color
                    *@desc 숲의 색깔
                    *@default 192,192,192,1.0
                    *@parent ▽ Field Type ▽
                    * 
                    *@param Land Color
                    *@desc 육지 색상
                    *@default 224,224,224,1.0
                    *@parent ▽ Field Type ▽
                    *
                    *@param Shallow Color
                    *@desc 물가 (통행 가능) 색상
                    *@default 160,160,160,0.75
                    *@parent ▽ Area Type ▽
                    *
                    *@param Hill Color
                    *@desc 언덕 색상
                    *@default 160,160,160,1.0
                    *@parent ▽ Field Type ▽
                    *
                    *@param Wall Color
                    *@desc 통행 불가 타일 색상
                    *@default 160,160,160,1.0
                    *@parent ▽ Field Type ▽
                    *
                    *@param Roof Color
                    *@desc 통행 불가 타일 색상
                    *@default 160,160,160,1.0
                    *@parent ▽ Field Type ▽
                    *
                    *
                    *@param Floor Color
                    *@desc 통행 가능 타일 색상
                    *@default 224,224,224,1.0
                    *@parent ▽ Area Type ▽
                    *
                    *@param Wall Region IDs
                    *@desc 통행 불가로 표시하는 지역 ID의 배열
                    *(범위 지정 가능)
                    *@default 63
                    *@parent ▽ Area Type ▽
                    *
                    *@param Floor Region IDs
                    *@desc 통행 가능으로 표시하는 지역 ID의 배열
                    *(범위 지정 가능)
                    *@default
                    *@parent ▽ Area Type ▽
                    *
                    *@param Dir4 Wall Width
                    *@type number
                    *@desc 통행 (4 방향) 벽의 폭
                    *@default 2
                    *@parent ▽ Area Type ▽
                    *
                    *
                    *@param === Command ===
                    *@default === 명령 관련 ===
                    *
                    *@param Plugin Commands
 *@type struct <Plugin>
                        *@desc 플러그인 명령어
 *@default {"MiniMap": "MiniMap", "ChangeMinimap": "ChangeMinimap", "SetMinimapZoom": "SetMinimapZoom", "SetMinimapFrame": "SetMinimapFrame", "Marking": "Marking", "DeleteMarking": "DeleteMarking ""HighlightMarking ":"HighlightMarking ","HighlightEvMarker ":"HighlightEvMarker "}
                        *@parent === Command ===
                        *
                        *@param Map Metadata
 *@type struct <MapMeta>
                            *@desc 맵 메모 란 데이터 이름
 *@default {"MiniMap": "MiniMap", "MinimapZoom": "MinimapZoom"}
                            *@parent === Command ===
                            *
                            *@param Event Metadata
 *@type struct <EventMeta>
                                *@desc 이벤트 메모 란 데이터 이름
 *@default {"Marker": "Marker"}
                                *@parent === Command ===
                                *
                                *
                                *@requiredAssets img / system / MinimapMarkerSet
                                *
                                *@noteParam Minimap
                                *@noteRequire 1
                                *@noteDir img / system /
                                *@noteType file
                                *@noteData maps
                                *
                                */

                               /*~ struct ~ MinimapData :
                                *@param x
                                *@type number
                                *@desc X 좌표
                                *@default 32
                                *
                                *@param y
                                *@type number
                                *@desc Y 좌표
                                *@default 32
                                *
                                *@param width
                                *@type number
                                *@min 1
                                *@desc 폭
                                *@default 160
                                *
                                *@param height
                                *@type number
                                *@min 1
                                *@desc 높이
                                *@default 128
                                *
                                *@param type
                                *@type number
                                *@max 2
                                *@desc 표시 유형
                                *0 : 전체 1 : 주변 (루프 적용) 2 : 주변 (루프 없음)
                                *@default 1
                                *
                                *@param opacity
                                *@type number
                                *@max 255
                                *@desc 불투명도
                                *@default 192
                                *
                                *@param zoom
                                *@desc 확대율
                                *@default 1.0
                                *
                                */

                               /*~ struct ~ Marker :
                                *@param Icon Index
                                *@type number
                                *@desc 아이콘 번호
                                *@default 1
                                *
                                *@param oy
                                *@desc Y 축의 원점 좌표
                                *@default 0.5
                                *
                                *@param turn?
                                *@type boolean
                                *@desc 방향에 맞게 이미지를 회전 여부
                                *@default false
                                *
                                */

                               /*~ struct ~ Vehicle :
                                *@param boat
                                *@type number
                                *@desc 소형선
                                *@default 2
                                *
                                *@param ship
                                *@type number
                                *@desc 대형 선박
                                *@default 2
                                *
                                *@param airship
                                *@type number
                                *@desc 비행선
                                *@default 2
                                *
                                */

                               /*~ struct ~ Plugin :
                                *@param MiniMap
                                *@desc 미니 맵보기
                                *@default MiniMap
                                *
                                *@param ChangeMinimap
                                *@desc 지정된 맵 ID를 미니 맵으로 변경
                                *@default ChangeMinimap
                                *
                                *@param SetMinimapZoom
                                *@desc 미니 맵의 배율 만 변경
                                *@default SetMinimapZoom
                                *
                                *@param SetMinimapFrame
                                *@desc 미니 맵에 프레임 이미지를 표시
                                *@default SetMinimapFrame
                                *
                                *
                                *@param Marking
                                *@desc 마킹을 표시
                                *@default Marking
                                *
                                *@param DeleteMarking
                                *@desc 마킹 번호 n을 삭제
                                *@default DeleteMarking
                                *
                                *
                                *@param HighlightMarking
                                *@desc 마킹 번호 n을 강조
                                *@default HighlightMarking
                                *
                                *@param HighlightEvMarker
                                *@desc 이벤트 마커 아이콘을 강조 표시
                                *@default HighlightEvMarker
                                *
                                */

                               /*~ struct ~ MapMeta :
                                *@param MiniMap
                                *@desc이 맵의 미니 맵 이미지의 파일 이름
                                *@default MiniMap
                                *
                                *@param MinimapZoom
                                *@desc이 맵의 미니 맵 배율
                                *@default MinimapZoom
                                *
                                */

                               /* ~ struct ~ EventMeta :
                                * @param Marker
                                * @desc 미니 맵에 표시하는이 이벤트의 마커 번호
                                * @default Marker
                                */

var $dataMinimap = null;
var $gameMinimap = null;

function Game_MiniMap() {
    this.initialize.apply(this, arguments);
}

function Sprite_MiniMap() {
    this.initialize.apply(this, arguments);
}

function MppSprite_Loop() {
    this.initialize.apply(this, arguments);
}

(function() {

var MPPlugin = {};

(function() {
    
    var parameters = PluginManager.parameters('MPP_MiniMap');
    
    function convertParam(name) {
        var param = parameters[name];
        var result = [];
        if (param) {
            var data = param.split(',');
            for (var i = 0; i < data.length; i++) {
                if (/(\d+)\s*-\s*(\d+)/.test(data[i])) {
                    for (var n = Number(RegExp.$1); n <= Number(RegExp.$2); n++) {
                        result.push(n);
                    }
                } else {
                    result.push(Number(data[i]));
                }
            }
        }
        return result;
    };
    function reviverParse(key, value) {
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    }
    function reviverEval(key, value) {
        try {
            return eval(value);
        } catch (e) {
            return value;
        }
    }

    MPPlugin.MapIDs = convertParam('Map IDs');
    var minimapData = JSON.parse(parameters['Minimap Data'] || '[]');
    for (var i = 0; i < minimapData.length; i++) {
        minimapData[i] = JSON.parse(minimapData[i], reviverEval);
    }
    MPPlugin.MinimapData = minimapData;
    MPPlugin.DefaultDataIndex = Number(parameters['Default Data Index'] || 0);
    MPPlugin.MinimapZ = Number(parameters['Minimap Z'] || 0);
    MPPlugin.FrameImages = JSON.parse(parameters['Frame Images'] || '[]');
    MPPlugin.DefaultFrameIndex = Number(parameters['Default Frame Index'] || 0);
    
    MPPlugin.UpdateCount = Math.max(Number(parameters['Update Count'] || 80), 1);
    MPPlugin.BlinkDuration = Number(parameters['Blink Duration'] || 80);
    MPPlugin.ScrollMapLink = !!eval(parameters['Scroll Map Link?']);

    MPPlugin.PlayerMarker = JSON.parse(parameters['Player Marker _v3'], reviverEval);
    MPPlugin.VehicleOnMarker = JSON.parse(parameters['Vehicle On Marker _v3'], reviverEval);
    MPPlugin.PlayerHighlight = !!eval(parameters['Player Highlight?']);
    MPPlugin.VehicleOffMarkers = JSON.parse(parameters['Vehicle Off Markers _v3'], reviverEval);
    
    MPPlugin.TileSize = Math.max(Number(parameters['Tile Size']), 1);
    MPPlugin.BlurIntensity = Number(parameters['Blur Intensity'] || 2);

    function convertColor(rgba) {
        return 'rgba(' + rgba + ')';
    }
    MPPlugin.colors = {};
    MPPlugin.colors.noAria = convertColor(parameters['noAria Color']);
    MPPlugin.colors.Forest = convertColor(parameters['Forest Color']);
    MPPlugin.colors.Land = convertColor(parameters['Land Color']);
    MPPlugin.colors.Snow = convertColor(parameters['Snow Color']);
    MPPlugin.colors.Shallow = convertColor(parameters['Shallow Color']);
    MPPlugin.colors.Hill = convertColor(parameters['Hill Color']);
    MPPlugin.colors.Wall = convertColor(parameters['Wall Color']);
    MPPlugin.colors.Roof = convertColor(parameters['Roof Color']);

    MPPlugin.colors.Ford = convertColor(parameters['Ford Color']);
    MPPlugin.colors.Sea = convertColor(parameters['Sea Color']);
    MPPlugin.colors.River = convertColor(parameters['River Color']);
    MPPlugin.colors.Floor = convertColor(parameters['Floor Color']);
    MPPlugin.WallRegionIDs = convertParam('Wall Region IDs');
    MPPlugin.FloorRegionIDs = convertParam('Floor Region IDs');
    MPPlugin.Dir4WallWidth = Number(parameters['Dir4 Wall Width']);

    MPPlugin.mColors = JSON.parse(parameters['Marking Colors'] || "[]");
    MPPlugin.mColors = MPPlugin.mColors.map(convertColor);
    MPPlugin.mColors.unshift('rgba(0,0,0,0)');
    MPPlugin.HighlightMarkerBlink = !!eval(parameters['Highlight Marker Blink?']);
    MPPlugin.HighlightMarkerScale = Number(parameters['Highlight Marker Scale'] || 1.5);
    
    MPPlugin.PluginCommands = JSON.parse(parameters['Plugin Commands']);
    MPPlugin.MapMetadata = JSON.parse(parameters['Map Metadata']);
    MPPlugin.EventMetadata = JSON.parse(parameters['Event Metadata']);

})();

var Alias = {};

//-----------------------------------------------------------------------------
// MiniMap

var MiniMap = {
    image:null,
    createMinimap:function() {
        var name = MPPlugin.MapMetadata.Minimap || "Minimap";
        if ($dataMinimap.meta[name]) {
            MiniMap.image = ImageManager.loadSystem($dataMinimap.meta[name]);
            return;
        }
        var flags = $gameMinimap.tilesetFlags();
        var width = $gameMinimap.width();
        var height = $gameMinimap.height();
        var data = $gameMinimap.data();
        var overworld = $gameMinimap.isOverworld();
        var size = MPPlugin.TileSize;
        var colors = MPPlugin.colors;
        var wallIds = MPPlugin.WallRegionIDs;
        var floorIds = MPPlugin.FloorRegionIDs;
        var dir4W = MPPlugin.Dir4WallWidth;
        var image = new Bitmap(width * size, height * size);
        var tileId, color, wallDir;
        if ($dataMap == null) return;
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {/*
                wallDir = 0;
                if (overworld) {
                    tileId = data[(0 * height + y) * width + x] || 0;
                    var index0 = Math.floor((tileId - 2048) / 48);
                    tileId = data[(1 * height + y) * width + x] || 0;
                    var index1 = Math.floor((tileId - 2048) / 48);
                    if (index0 < 16) {
                        color = (index1 === 1 ? colors.Sea : colors.Ford);
                    } else {
                        switch (index1) {
                        case 20: case 21: case 28: case 36: case 44:
                            color = colors.Forest;
                            break;
                        case 22: case 30: case 38: case 46:
                            color = colors.Hill;
                            break;
                        case 23: case 31: case 39: case 47:
                            color = colors.Mountain;
                            break;
                        default:
                            color = colors.Land;
                        }
                    }
                } else {
                    tileId = data[(5 * height + y) * width + x] || 0;
                    if (wallIds.contains(tileId)) {
                        color = colors.Wall;
                    } else if (floorIds.contains(tileId)) {
                        color = colors.Floor;
                    } else {
                        color = colors.Wall;*/
                for (var z = 3; z >= 0; z--) {
                    tileId = data[(z * height + y) * width + x] || 0;/*
                            var flag = flags[tileId];
                            if ((flag & 0x10) !== 0) continue;
                            var index = Math.floor((tileId - 2048) / 48);
                            if (index >= 0 && index < 16) {
                                color = ((flag & 0x0f) === 0x0f ? colors.River : colors.Shallow);
                            } else if ((flag & 0x20) !== 0) {
                                color = colors.Ladder;
                            } else if ((flag & 0x40) !== 0) {
                                color = colors.Bush;
                            } else if ((flag & 0x80) !== 0) {
                                color = colors.Counter;
                            } else if ((flag & 0x0f) === 0x0f) {
                                color = colors.Wall;
                            } else {
                                color = colors.Floor;
                                wallDir = flag & 0x0f;
                            }
                            break;
                        }
                    }
                }*/
                    tiles = $gameMap.layeredTiles(x, y)[z];
                    var flag = $gameMap.tilesetFlags()[tiles] >> 12;
                    switch (flag) {
                        case 1:
                            color = colors.Forest;
                            break;
                        case 2:
                            color = colors.Land;
                            break;
                        case 3:
                            color = colors.Snow;
                            break;
                        case 4:
                            color = colors.Shallow;
                            break;
                        case 5:
                            color = colors.Hill;
                            break;
                        case 6:
                            color = colors.Forest;
                            break;
                        case 7:
                            color = colors.Roof;
                            break;
                        case 8:
                            color = colors.Sea;
                            break;
                        case 9:
                            color = colors.Prohibit;
                            break;
                        default:
                            color = colors.noAria;
                            break;
                    }
                    break;
                }
                image.fillRect(x * size, y * size, size, size, color);
                if (wallDir > 0 && dir4W > 0) {
                    color = colors.Wall;
                    if ((flag & 0x01) === 0x01) {
                        image.fillRect(x * size, (y + 1) * size - dir4W, size, dir4W, color);
                    }
                    if ((flag & 0x02) === 0x02) {
                        image.fillRect(x * size, y * size, dir4W, size, color);
                    }
                    if ((flag & 0x04) === 0x04) {
                        image.fillRect((x + 1) * size - dir4W, y * size, dir4W, size, color);
                    }
                    if ((flag & 0x08) === 0x08) {
                        image.fillRect(x * size, y * size, size, dir4W, color);
                    }
                }
            }
        }
        image.mpBlur();
        MiniMap.image = image;
    }
};

//-----------------------------------------------------------------------------
// Math

Math.hypot = Math.hypot || function() {
  var y = 0;
  var length = arguments.length;

  for (var i = 0; i < length; i++) {
    if (arguments[i] === Infinity || arguments[i] === -Infinity) {
      return Infinity;
    }
    y += arguments[i] * arguments[i];
  }
  return Math.sqrt(y);
};

//-----------------------------------------------------------------------------
// Bitmap

Bitmap.prototype.mpBlur = function() {
    var w = this.width;
    var h = this.height;
    var canvas = this._canvas;
    var context = this._context;
    var tempCanvas = document.createElement('canvas');
    var tempContext = tempCanvas.getContext('2d');
    tempCanvas.width = w + 2;
    tempCanvas.height = h + 2;
    context.save();
    for (var i = 0; i < MPPlugin.BlurIntensity; i++) {
        tempContext.clearRect(0, 0, w + 2, h + 2);
        tempContext.drawImage(canvas, 0, 0, w, h, 1, 1, w, h);
        tempContext.drawImage(canvas, 0, 0, w, 1, 1, 0, w, 1);
        tempContext.drawImage(canvas, 0, h - 1, w, 1, 0, h + 1, w, 1);
        tempContext.drawImage(tempCanvas, 1, 0, 1, h + 2, 0, 0, 1, h + 2);
        tempContext.drawImage(tempCanvas, w, 0, 1, h + 2, w + 1, 0, 1, h + 2);
        context.clearRect(0, 0, w, h);
        context.globalCompositeOperation = 'lighter';
        context.globalAlpha = 1 / 9;
        for (var n = 0; n < 9; n++) {
            var x = n % 3;
            var y = Math.floor(n / 3);
            context.drawImage(tempCanvas, x, y, w, h, 0, 0, w, h);
        }
    }
    context.restore();
    this._setDirty();
};

//-----------------------------------------------------------------------------
// DataManager

DataManager.loadMinimapData = function(mapId) {
    if (mapId === $gameMap.mapId()) {
        $dataMinimap = $dataMap;
    } else if (mapId > 0) {
        var filename = 'Map%1.json'.format(mapId.padZero(3));
        this.loadDataFile('$dataMinimap', filename);
    }
};

//125
Alias.DaMa_onLoad = DataManager.onLoad;
DataManager.onLoad = function(object) {
    if (object === $dataMinimap) {
        this.extractMetadata(object);
        var array = object.events;
        if (Array.isArray(array)) {
            for (var i = 0; i < array.length; i++) {
                var data = array[i];
                if (data && data.note !== undefined) {
                    this.extractMetadata(data);
                }
            }
        }
    } else {
        Alias.DaMa_onLoad.call(this, object);
    }
};

//195
Alias.DaMa_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    Alias.DaMa_createGameObjects.call(this);
    $gameMinimap       = new Game_MiniMap();
};

//425
Alias.DaMa_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    var contents = Alias.DaMa_makeSaveContents.call(this);
    contents.minimap      = $gameMinimap;
    return contents;
};

//441
Alias.DaMa_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    Alias.DaMa_extractSaveContents.call(this, contents);
    $gameMinimap       = contents.minimap || new Game_MiniMap();
    $gameMinimap.requestCreate = true;
};

//-----------------------------------------------------------------------------
// Game_Temp

//10
Alias.GaTe_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    Alias.GaTe_initialize.call(this);
    this.gameMinimapLoaded = false;
};

//-----------------------------------------------------------------------------
// Game_Map

//37
Alias.GaMa_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    Alias.GaMa_setup.call(this, mapId);
    if (MPPlugin.MapIDs.contains(mapId)) {
        $gameMinimap.setup(mapId);
    } else {
        $gameMinimap.clear();
    }
};

//-----------------------------------------------------------------------------
// Game_MiniMap

Game_MiniMap.prototype.initialize = function() {
    this.mapId = 0;
    $dataMinimap = null;
    this.tileset = null;
    this._dataIndex = MPPlugin.DefaultDataIndex;
    var data = MPPlugin.MinimapData[this.dataIndex];
    this.zoom = data ? data.zoom || 1 : 1;
    this.requestFrame = false;
    this.requestMarker = false;
    this.requestHighlight = false;
    this._dataLoaded = false;
    this._markingData = [];
    this._frameIndex = MPPlugin.DefaultFrameIndex;
    this.requestCreate = false;
    this._x = 0;
    this._y = 0;
    this._tileX = 1;
    this._tileY = 1;
    this._lastBaseX = 0;
    this._lastBaseY = 0;
};

Game_MiniMap.prototype.setup = function(mapId) {
    if (this.mapId !== mapId) {
        this.mapId = mapId;
        this.create();
    }
};

Game_MiniMap.prototype.clear = function() {
    this.mapId = 0;
    $dataMinimap = null;
    MiniMap.image = null;
    this.requestFrame = true;
    this.requestMarker = true;
    this.requestHighlight = true;
    this._dataLoaded = false;
    $gameTemp.gameMinimapLoaded = false;
};

Game_MiniMap.prototype.create = function() {
    $dataMinimap = null;
    MiniMap.image = null;
    DataManager.loadMinimapData(this.mapId);
    this.requestFrame = true;
    this.requestMarker = true;
    this.requestHighlight = true;
    this._dataLoaded = false;
    $gameTemp.gameMinimapLoaded = false;
};

Game_MiniMap.prototype.tilesetFlags = function() {
    return this.tileset ? this.tileset.flags : [];
};

Game_MiniMap.prototype.x = function() {
    return this._x;
};

Game_MiniMap.prototype.y = function() {
    return this._y;
};

Game_MiniMap.prototype.width = function() {
    return $dataMinimap.width;
};

Game_MiniMap.prototype.height = function() {
    return $dataMinimap.height;
};

Game_MiniMap.prototype.data = function() {
    return $dataMinimap.data;
};

Game_MiniMap.prototype.isLoopHorizontal = function() {
    return this.type() !== 2 &&
            ($dataMinimap.scrollType === 2 || $dataMinimap.scrollType === 3);
};

Game_MiniMap.prototype.isLoopVertical = function() {
    return this.type() !== 2 &&
            ($dataMinimap.scrollType === 1 || $dataMinimap.scrollType === 3);
};

Game_MiniMap.prototype.isOverworld = function() {
    return this.tileset && this.tileset.mode === 0;
};

Game_MiniMap.prototype.isOnCurrentMap = function() {
    return this.mapId === $gameMap.mapId();
};

Game_MiniMap.prototype.centerX = function() {
    return this._tileX / 2;
};

Game_MiniMap.prototype.centerY = function() {
    return this._tileY / 2;
};

Game_MiniMap.prototype.adjustX = function(x) {
    if (this.isLoopHorizontal() && x < this._x - 
            (this.width() - this._tileX) / 2) {
        return x - this._x + this.width();
    } else {
        return x - this._x;
    }
};

Game_MiniMap.prototype.adjustY = function(y) {
    if (this.isLoopVertical() && y < this._y -
            (this.height() - this._tileY) / 2) {
        return y - this._y + this.height();
    } else {
        return y - this._y;
    }
};

Game_MiniMap.prototype.posData = function() {
    return this._dataIndex > 0 ? MPPlugin.MinimapData[this._dataIndex - 1] : null;
};

Game_MiniMap.prototype.rectX = function() {
    var data = this.posData();
    return data ? data.x : 0;
};

Game_MiniMap.prototype.rectY = function() {
    var data = this.posData();
    return data ? data.y : 0;
};

Game_MiniMap.prototype.rectWidth = function() {
    var data = this.posData();
    return data ? data.width : 0;
};

Game_MiniMap.prototype.rectHeight = function() {
    var data = this.posData();
    return data ? data.height : 0;
};

Game_MiniMap.prototype.type = function() {
    var data = this.posData();
    return data ? data.type : 0;
};

Game_MiniMap.prototype.opacity = function() {
    var data = this.posData();
    return data ? data.opacity : 0;
};

Game_MiniMap.prototype.frameName = function() {
    return this._frameIndex > 0 ? MPPlugin.FrameImages[this._frameIndex - 1] || "" : "";
};

Game_MiniMap.prototype.setDataIndex = function(index) {
    if (this._dataIndex !== index) {
        this._dataIndex = index;
        var data = this.posData();
        this.zoom = data ? data.zoom || 1 : 1;
        this.requestFrame = true;
    }
};

Game_MiniMap.prototype.setupScale = function(tileX, tileY) {
    this._tileX = tileX;
    this._tileY = tileY;
    this.setCenter();
};

Game_MiniMap.prototype.setCenter = function() {
    this._lastBaseX = this.baseX();
    this._lastBaseY = this.baseY();
    this.setMinimapPos(this._lastBaseX - this.centerX(), this._lastBaseY - this.centerY());
};

Game_MiniMap.prototype.baseX = function() {
    if (this.type() === 0 || !this.isOnCurrentMap()) {
        return this.width() / 2;
    } else if (MPPlugin.ScrollMapLink) {
        return $gameMap.displayX() + $gamePlayer.centerX() + 0.5;
    } else {
        return $gamePlayer._realX + 0.5;
    }
};

Game_MiniMap.prototype.baseY = function() {
    if (this.type() === 0 || !this.isOnCurrentMap()) {
        return this.height() / 2;
    } else if (MPPlugin.ScrollMapLink) {
        return $gameMap.displayY() + $gamePlayer.centerY() + 0.5;
    } else {
        return $gamePlayer._realY + 0.5;
    }
};

Game_MiniMap.prototype.setMinimapPos = function(x, y) {
    if (this.isLoopHorizontal()) {
        this._x = x.mod(this.width());
    } else {
        this._x = x.clamp(0, this.width() - this._tileX);
    }
    if (this.isLoopVertical()) {
        this._y = y.mod(this.height());
    } else {
        this._y = y.clamp(0, this.height() - this._tileY);
    }
};

Game_MiniMap.prototype.scrollDown = function(distance) {
    if (this.isLoopVertical()) {
        this._y += distance;
        this._y %= this.height();
    } else if (this.height() > this._tileY) {
        this._y = Math.min(this._y + distance, this.height() - this._tileY);
    }
};

Game_MiniMap.prototype.scrollLeft = function(distance) {
    if (this.isLoopHorizontal()) {
        this._x += this.width() - distance;
        this._x %= this.width();
    } else if (this.width() >= this._tileX) {
        this._x = Math.max(this._x - distance, 0);
    }
};

Game_MiniMap.prototype.scrollRight = function(distance) {
    if (this.isLoopHorizontal()) {
        this._x += distance;
        this._x %= this.width();
    } else if (this.width() >= this._tileX) {
        this._x = Math.min(this._x + distance, this.width() - this._tileX);
    }
};

Game_MiniMap.prototype.scrollUp = function(distance) {
    if (this.isLoopVertical()) {
        this._y += this.height() - distance;
        this._y %= this.height();
    } else if (this.height() >= this._tileY) {
        this._y = Math.max(this._y - distance, 0);
    }
};

Game_MiniMap.prototype.isEnabled = function() {
    return this.isReady() && this._dataIndex > 0 &&
        this.zoom > 0 && this.rectWidth() > 0 && this.rectHeight() > 0 && PRG.minimapEnable
        && !$gameMessage.isBusy();
};

Game_MiniMap.prototype.isReady = function() {
    if (!this._dataLoaded && !!$dataMinimap) {
        this.onMinimapLoaded();
        this._dataLoaded = true;
    }
    return !!$dataMinimap;
};

Game_MiniMap.prototype.onMinimapLoaded = function() {
    this.tileset = $dataTilesets[$dataMinimap.tilesetId];
    var name = MPPlugin.MapMetadata.MinimapZoom || "MinimapZoom";
    if ($dataMinimap.meta[name]) {
        this.zoom = Number($dataMinimap.meta[name]);
    }
    setTimeout(MiniMap.createMinimap, 1);
};

Game_MiniMap.prototype.allEvents = function() {
    if (this.isOnCurrentMap()) {
        return $gameMap.events().concat($gameMap.vehicles());
    } else {
        return $gameMap.vehicles();
    }
};

Game_MiniMap.prototype.markingData = function() {
    return this._markingData.filter(function(data, index) {
        if (index === 10) {
        }
        return data && data.mapId === this.mapId;
    }, this);
};

Game_MiniMap.prototype.setMarking = function(id, param) {
    this._markingData[id] = param;
    this.requestMarker = true;
    this.requestHighlight = true;
};

Game_MiniMap.prototype.removeMarking = function(id) {
    this._markingData[id] = null;
    this.requestMarker = true;
    this.requestHighlight = true;
};

Game_MiniMap.prototype.update = function() {
    if ($gameTemp.gameMinimapLoaded && this.mapId > 0 && this.type() !== 0) {
        this.updateScroll();
    }
};

Game_MiniMap.prototype.updateScroll = function() {
    var x1 = this.adjustX(this._lastBaseX);
    var y1 = this.adjustY(this._lastBaseY);
    var x2 = this.adjustX(this.baseX());
    var y2 = this.adjustY(this.baseY());
    if (y2 > y1 && y2 > this.centerY()) {
        this.scrollDown(y2 - y1);
    }
    if (x2 < x1 && x2 < this.centerX()) {
        this.scrollLeft(x1 - x2);
    }
    if (x2 > x1 && x2 > this.centerX()) {
        this.scrollRight(x2 - x1);
    }
    if (y2 < y1 && y2 < this.centerY()) {
        this.scrollUp(y1 - y2);
    }
    this._lastBaseX = this.baseX();
    this._lastBaseY = this.baseY();
};

Game_MiniMap.prototype.highlightMarking = function(id, bool) {
    var param = this._markingData[id];
    if (param && param.dType === 'Ico') {
        param.highlight = bool;
        this.requestHighlight = true;
    }
};

//-----------------------------------------------------------------------------
// Game_Player

Game_Player.prototype.minimapX = function() {
    return $gameMinimap.adjustX(this._realX + 0.5);
};

Game_Player.prototype.minimapY = function() {
    return $gameMinimap.adjustY(this._realY + 0.5);
};

//-----------------------------------------------------------------------------
// Game_Vehicle

Game_Vehicle.prototype.marker = function() {
    if (!this._driving && this._mapId === $gameMinimap.mapId) {
        return MPPlugin.VehicleOffMarkers[this._type] || 0;
    } else {
        return 0;
    }
};

//-----------------------------------------------------------------------------
// Game_Event

//14
    Alias.GaEv_initialize = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function(mapId, eventId) {
    Alias.GaEv_initialize.call(this, mapId, eventId);
    var name = MPPlugin.EventMetadata.Marker || "Marker";
    if (this._comments != undefined) {
        var marker = /<Marker[=|:](.*?)>/i.exec(this.comments(true)) || 0;
        if (marker) {
            marker = marker[1].replace(/(\s*)/g, "").split(',');
            this._markerX = 0;
            this._markerY = 0;
			if (marker.length == 3) {
				if ($gameMap._prgMapGenerator) {
					var coordX = $gameMap._prgMapGenerator._currentCoord.x;
					var coordY = $gameMap._prgMapGenerator._currentCoord.y;
					if (coordX == undefined) return;
					if (marker[0] == 'r') coordX++;
					else if (marker[0] == 'l') coordX--;
					else if (marker[0] == 't') coordY++;
					else if (marker[0] == 'b') coordY--;
					var nextRoom = $gameMap._prgMapGenerator._roomCoords[coordX][coordY]
					if (!nextRoom) return;
					if (nextRoom.name == 'enemy') {
						if (nextRoom.explored == 'clear') this._marker = 3;
						else this._marker = 4;
					} else if (nextRoom.name == 'boss') this._marker = 5;
					else this._marker = 2;
					this._markerX = Number(marker[1]);
					this._markerY = Number(marker[2]);
				} else this._marker = Number(marker[0])
			} else {
				this._marker = Number(marker[0]);
                this._markerX = 0;
                this._markerY = 0;
				return;
			}
				
        }
        
    }
};

Game_Event.prototype.marker = function() {
    return (this._pageIndex >= 0 && !this.isTransparent() ? this._marker : 0);
};

//-----------------------------------------------------------------------------
// Game_Interpreter

//1722
Alias.GaIn_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Alias.GaIn_pluginCommand.call(this, command, args);
    var args2 = args.map(function(arg) {
        return arg.replace(/v\[(\d+)\]/g, function() {
            return $gameVariables.value(parseInt(arguments[1]));
        });
    });
    switch (command) {
        case MPPlugin.PluginCommands.MiniMap:
        case 'MiniMap':
            $gameMinimap.setDataIndex(eval(args2[0] || 0));
            break;
        case MPPlugin.PluginCommands.ChangeMinimap:
        case 'ChangeMinimap':
            var mapId = eval(args2[0]) || $gameMap.mapId();
            $gameMinimap.setup(mapId);
            break;
        case MPPlugin.PluginCommands.SetMinimapFrame:
        case 'SetMinimapFrame':
            $gameMinimap._frameIndex = eval(args2[0]);
            break;
        case MPPlugin.PluginCommands.SetMinimapZoom:
        case 'SetMinimapZoom':
            var zoom = eval(args2[0]);
            if (zoom > 0) {
                $gameMinimap.zoom = zoom;
                $gameMinimap.requestFrame = true;
            }
            break;
        case MPPlugin.PluginCommands.Marking:
        case 'Marking':
            var id = eval(args2.shift());
            var param = {};
            param.mapId = eval(args2.shift()) || $gameMinimap.mapId;
            param.pType = args2.shift();
            if (param.pType === 'Ev') {
                param.id = eval(args2.shift() || 0);
            } else if (param.pType === 'Pos') {
                param.x = eval(args2.shift() || 0);
                param.y = eval(args2.shift() || 0);
            }
            param.dType = args2.shift();
            if (param.dType === 'Cir') {
                param.r = eval(args2.shift() || 0);
                param.c = eval(args2.shift() || 0);
            } else if (param.dType === 'Rec') {
                param.w = eval(args2.shift() || 0);
                param.h = eval(args2.shift() || 0);
                param.c = eval(args2.shift() || 0);
            } else if (param.dType === 'Ico') {
                param.m = eval(args2.shift() || 0);
            }
            $gameMinimap.setMarking(id, param);
            break;
        case MPPlugin.PluginCommands.DeleteMarking:
        case 'DeleteMarking':
            $gameMinimap.removeMarking(eval(args2[0]));
            break;
        case MPPlugin.PluginCommands.HighlightMarking:
        case 'HighlightMarking':
            var id = eval(args2[0] || 0);
            var bool = !!eval(args2[1] || 'true');
            $gameMinimap.highlightMarking(id, bool);
            break;
        case MPPlugin.PluginCommands.HighlightEvMarker:
        case 'HighlightEvMarker':
            var event = this.character(eval(args2[0] || 0));
            if (event && event !== $gamePlayer) {
                event.markerHighlight = !!eval(args2[1] || 'true');
                $gameMinimap.requestHighlight = true;
            }
            break;
    }
};

//-----------------------------------------------------------------------------
// Sprite_Loop

MppSprite_Loop.prototype = Object.create(Sprite.prototype);
MppSprite_Loop.prototype.constructor = MppSprite_Loop;

MppSprite_Loop.prototype.initialize = function(bitmap) {
    Sprite.prototype.initialize.call(this, bitmap);
    for (var i = 0; i < 4; i++) {
        this.addChild(new Sprite(bitmap));
    }
};

MppSprite_Loop.prototype._refresh = function() {
    var frameX = Math.floor(this._frame.x);
    var frameY = Math.floor(this._frame.y);
    var frameW = Math.floor(this._frame.width);
    var frameH = Math.floor(this._frame.height);
    var bitmapW = this._bitmap ? this._bitmap.width : 0;
    var bitmapH = this._bitmap ? this._bitmap.height : 0;
    var realX1 = frameX.clamp(0, bitmapW);
    var realY1 = frameY.clamp(0, bitmapH);
    var realW1 = (frameW - realX1 + frameX).clamp(0, bitmapW - realX1);
    var realH1 = (frameH - realY1 + frameY).clamp(0, bitmapH - realY1);
    var realX2 = 0;
    var realY2 = 0;
    var realW2 = (frameW - realW1).clamp(0, frameW);
    var realH2 = (frameH - realH1).clamp(0, frameH);
    var x1 = Math.floor(-frameW * this.anchor.x);
    var y1 = Math.floor(-frameH * this.anchor.y);
    var x2 = x1 + realW1;
    var y2 = y1 + realH1;
    var sprite = this.children[0];
    sprite.bitmap = this._bitmap;
    sprite.move(x1, y1);
    sprite.setFrame(realX1, realY1, realW1, realH1);
    sprite = this.children[1];
    sprite.bitmap = this._bitmap;
    sprite.move(x2, y1);
    sprite.setFrame(realX2, realY1, realW2, realH1);
    sprite = this.children[2];
    sprite.bitmap = this._bitmap;
    sprite.move(x1, y2);
    sprite.setFrame(realX1, realY2, realW1, realH2);
    sprite = this.children[3];
    sprite.bitmap = this._bitmap;
    sprite.move(x2, y2);
    sprite.setFrame(realX2, realY2, realW2, realH2);
};

//-----------------------------------------------------------------------------
// Sprite_MiniMap

Sprite_MiniMap.prototype = Object.create(Sprite.prototype);
Sprite_MiniMap.prototype.constructor = Sprite_MiniMap;

Sprite_MiniMap.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this._updateCount = 0;
    this._d = MPPlugin.UpdateCount;
    this._blinkDuration = MPPlugin.BlinkDuration;
    this._markerSet = ImageManager.loadSystem('MinimapMarkerSet');
    this._markerSet.smooth = true;
    this._markerSize = Math.floor(this._markerSet.width / 8);
    this._playerMarker = 0;
    this._realRect = new Rectangle();
    this._tileWidth = 1;
    this._tileHeight = 1;
    this.createFrameSprite();
    this.createMiniMapSprite();
    this.createMarkerSprite();
    this.createPlayerSprite();
    this._highlightSprites = [];
    this.visible = false;
    this.show = true;
    $gameTemp.gameMinimapLoaded = false;
    $gameMinimap.requestHighlight = true;
};

Sprite_MiniMap.prototype.createMiniMapSprite = function() {
    this._miniMapSprite = new MppSprite_Loop();
    this._miniMapSprite.anchor.x = 0.5;
    this._miniMapSprite.anchor.y = 0.5;
    this.addChild(this._miniMapSprite);
};

Sprite_MiniMap.prototype.createMarkerSprite = function() {
    this._markerSprite = new MppSprite_Loop();
    this._markerSprite.anchor.x = 0.5;
    this._markerSprite.anchor.y = 0.5;
    this.addChild(this._markerSprite);
};

Sprite_MiniMap.prototype.createPlayerSprite = function() {
    this._playerSprite = new Sprite();
    this._playerSprite.bitmap = this._markerSet;
    this._playerSprite.anchor.x = 0.5;
    this.addChild(this._playerSprite);
    this._playerMarker = MPPlugin.PlayerMarker;
    this.refreshPlayer();
};

Sprite_MiniMap.prototype.createFrameSprite = function() {
    this._frameSprite = new Sprite();
    this._frameName = $gameMinimap.frameName();
    this._frameSprite.bitmap = ImageManager.loadPicture(this._frameName);
    this._frameSprite.anchor.x = 0.5;
    this._frameSprite.anchor.y = 0.5;
    this.addChild(this._frameSprite);
};

Sprite_MiniMap.prototype.isReady = function() {
    if (!$gameTemp.gameMinimapLoaded && MiniMap.image && MiniMap.image.isReady()) {
        this.onMinimapLoaded();
        $gameTemp.gameMinimapLoaded = true;
    }
    return $gameTemp.gameMinimapLoaded;
};

Sprite_MiniMap.prototype.onMinimapLoaded = function() {
    this._baseBitmap = MiniMap.image;
    this._miniMapSprite.bitmap = this._baseBitmap;
    this.refreshFrame();
};

Sprite_MiniMap.prototype.update = function() {
    Sprite.prototype.update.call(this);
    $gameMinimap.update();
    var visible = $gameMinimap.isEnabled() && this.isReady() && this.show;
    if (!visible) {
        if (this.opacity > 0) this.opacity -= 15;
        else this.visible = false;
        return;
    }
    else {
        this.visible = true;
        if (this.opacity < 220) {
            this.opacity += 15;
        }
    }
    if ($gameMinimap.requestFrame) {
        this.refreshFrame();
        $gameMinimap.requestFrame = false;
    }
    this._updateCount++;
    this._blinkDuration--;
    this.updateAllParts();
};

Sprite_MiniMap.prototype.refreshFrame = function() {
    var bw = this._baseBitmap.width;
    var bh = this._baseBitmap.height;
    var realRect = this._realRect;
    var rw = $gameMinimap.rectWidth();
    var rh = $gameMinimap.rectHeight();
    if ($gameMinimap.type() === 0) {
        $gameMinimap.zoom = Math.min(rw / bw, rh / bh);
    }
    var zoom = $gameMinimap.zoom;
    realRect.width = Math.round(Math.min(rw, bw * zoom));
    realRect.height = Math.round(Math.min(rh, bh * zoom));
    realRect.x = $gameMinimap.rectX() + Math.floor((rw - realRect.width) / 2);
    realRect.y = $gameMinimap.rectY() + Math.floor((rh - realRect.height) / 2);
    this._tileWidth = bw / $gameMinimap.width();
    this._tileHeight = bh / $gameMinimap.height();
    var tileX = realRect.width / (this._tileWidth * zoom);
    var tileY = realRect.height / (this._tileHeight * zoom);
    $gameMinimap.setupScale(tileX, tileY);
    
    this.x = realRect.x + realRect.width / 2;
    this.y = realRect.y + realRect.height / 2;
    this._miniMapSprite.scale.x = zoom;
    this._miniMapSprite.scale.y = zoom;
    //this._miniMapSprite.opacity = $gameMinimap.opacity(); 투명도 조절 끔
    var width = Math.floor(bw * zoom);
    var height = Math.floor(bh * zoom);
    this._markerSprite.bitmap = new Bitmap(width, height);
    this.redrawAllMarker();
};

Sprite_MiniMap.prototype.updateAllParts = function() {
    this.updatePlayer();
    this.updateMiniMap();
    this.updateMarker();
    this.updateMinimapFrame();
    this.updateHighlight();
};

Sprite_MiniMap.prototype.updatePlayer = function() {
    var sprite = this._playerSprite;
    sprite.visible = $gameMinimap.isOnCurrentMap();
    if (!sprite.visible) return;
    this.updatePlayerMarker();
    if (this._playerMarker['turn?']) {
        switch ($gamePlayer.direction()) {
        case 2:
            sprite.rotation = 180 * Math.PI / 180;
            break;
        case 4:
            sprite.rotation = 270 * Math.PI / 180;
            break;
        case 6:
            sprite.rotation = 90 * Math.PI / 180;
            break;
        case 8:
            sprite.rotation = 0 * Math.PI / 180;
            break;
        }
    } else {
        sprite.rotation = 0;
    }
    var rect = this._realRect;
    var zoom = $gameMinimap.zoom;
    var mx = $gamePlayer.minimapX();
    var my = $gamePlayer.minimapY();
    var hw = Math.floor(rect.width / 2);
    var hh = Math.floor(rect.height / 2);
    var px = Math.floor(mx * this._tileWidth * zoom - hw);
    var py = Math.floor(my * this._tileHeight * zoom - hh);
    if (MPPlugin.PlayerHighlight) {
        px = px.clamp(-hw, hw - 1);
        py = py.clamp(-hh, hh - 1);
    }
    sprite.x = px;
    sprite.y = py;
    sprite.visible = (px >= -hw && px < hw && py >= -hh && py < hh);
};

Sprite_MiniMap.prototype.updatePlayerMarker = function() {
    var marker;
    if ($gamePlayer.isInVehicle() &&
            !$gamePlayer._vehicleGettingOn && !$gamePlayer._vehicleGettingOff) {
        marker = MPPlugin.VehicleOnMarker;
    } else {
        marker = MPPlugin.PlayerMarker;
    }
    if (this._playerMarker !== marker) {
        this._playerMarker = marker;
        this.refreshPlayer();
    }
};

Sprite_MiniMap.prototype.refreshPlayer = function() {
    var marker = this._playerMarker;
    var index = marker['Icon Index'];
    var size = this._markerSize;
    var x = index % 8 * size;
    var y = Math.floor(index / 8) * size;
    this._playerSprite.anchor.y = marker.oy;
    this._playerSprite.setFrame(x, y, size, size);
};

Sprite_MiniMap.prototype.updateMiniMap = function() {
    var rect = this._realRect;
    var zoom = $gameMinimap.zoom;
    var x = $gameMinimap.x() * this._tileWidth;
    var y = $gameMinimap.y() * this._tileHeight;
    var w = Math.ceil(rect.width / zoom);
    var h = Math.ceil(rect.height / zoom);
    this._miniMapSprite.setFrame(x, y, w, h);
};

Sprite_MiniMap.prototype.updateMarker = function() {
    if ($gameMinimap.requestMarker || this._updateCount >= MPPlugin.UpdateCount) {
        this.redrawAllMarker();
        $gameMinimap.requestMarker = false;
        if ($gameSwitches._data[50] == true) {
            this._updateCount = MPPlugin.UpdateCount - 4;
            this._d = 0;
        } else {
            this._d = MPPlugin.UpdateCount;
            this._updateCount = 0;
        }
    }
    if (this._d > 0) {
        if (this._blinkDuration < 0) {
            this._blinkDuration = this._d - 1;
        }
        this._markerSprite.opacity = 320 * (this._d - this._updateCount) / this._d;
    } else {
        this._markerSprite.opacity = 255;
    }
    var rect = this._realRect;
    var zoom = $gameMinimap.zoom;
    var x = $gameMinimap.x() * this._tileWidth * zoom;
    var y = $gameMinimap.y() * this._tileHeight * zoom;
    this._markerSprite.setFrame(x, y, rect.width, rect.height);
};

Sprite_MiniMap.prototype.redrawAllMarker = function() {
    var bitmap = this._markerSprite.bitmap;
    var markerSet = this._markerSet;
    var size = this._markerSize;
    bitmap.clear();
    var bw = bitmap.width;
    var bh = bitmap.height;
    var xRate = bw / $gameMinimap.width();
    var yRate = bh / $gameMinimap.height();
    var horizontal = $gameMinimap.isLoopHorizontal();
    var vertical = $gameMinimap.isLoopVertical();
    var colors = MPPlugin.mColors;
    
    function drawMarker(x, y, marker) {
        var dx = (x + 0.5) * xRate - size / 2;
        var dy = (y + 0.5) * yRate - size / 2;
        var mx = marker % 8 * size;
        var my = Math.floor(marker / 8) * size;
        bitmap.blt(markerSet, mx, my, size, size, dx, dy);
    }
    function drawCircle(x, y, r, c) {
        var color = colors[c];
        var dx1 = (x + 0.5) * xRate;
        var dy1 = (y + 0.5) * yRate;
        var dx2 = dx1 + (dx1 < bw / 2 ? bw : -bw);
        var dy2 = dy1 + (dy1 < bh / 2 ? bh : -bh);
        r *= xRate;
        bitmap.drawCircle(dx1, dy1, r, color);
        if (horizontal) {
            bitmap.drawCircle(dx2, dy1, r, color);
        }
        if (vertical) {
            bitmap.drawCircle(dx1, dy2, r, color);
        }
        if (horizontal && vertical) {
            bitmap.drawCircle(dx2, dy2, r, color);
        }
    }
    function drawRect(x, y, w, h, c) {
        var color = colors[c];
        var dx1 = x * xRate;
        var dy1 = y * yRate;
        var dx2 = dx1 + (dx1 < bw / 2 ? bw : -bw);
        var dy2 = dy1 + (dy1 < bh / 2 ? bh : -bh);
        w *= xRate;
        h *= yRate;
        bitmap.fillRect(dx1, dy1, w, h, color);
        if (horizontal) {
            bitmap.fillRect(dx2, dy1, w, h, color);
        }
        if (vertical) {
            bitmap.fillRect(dx1, dy2, w, h, color);
        }
        if (horizontal && vertical) {
            bitmap.fillRect(dx2, dy2, w, h, color);
        }
    }
    var data = $gameMinimap.markingData();
    for (var i = 0; i < data.length; i++) {
        var param = data[i];
        if (param.highlight) continue;
        var x, y;
        if (param.pType === 'Ev') {
            var event = $gameMap.event(param.id);
            if (event) {
                x = event.x;
                y = event.y;
            } else {
                continue;
            }
        } else {
            x = param.x;
            y = param.y;
        }
        if (param.dType === 'Cir') {
            drawCircle(x, y, param.r, param.c);
        } else if (param.dType === 'Rec') {
            drawRect(x, y, param.w, param.h, param.c);
        } else if (param.dType === 'Ico') {
            drawMarker(x, y, param.m);
        }
    }
    var allEvents = $gameMinimap.allEvents();
    for (var i = 0; i < allEvents.length; i++) {
        var event = allEvents[i];
        var marker = event.marker();
        if (!event.markerHighlight && marker > 0) {
            drawMarker(event.x + event._markerX, event.y + event._markerY, marker);
        }
    }
};

Sprite_MiniMap.prototype.updateMinimapFrame = function() {
    if (this._frameName !== $gameMinimap.frameName()) {
        this._frameName = $gameMinimap.frameName();
        this._frameSprite.bitmap = ImageManager.loadPicture(this._frameName);
    }
};

Sprite_MiniMap.prototype.updateHighlight = function() {
    var sprites = this._highlightSprites;
    if ($gameMinimap.requestHighlight) {
        var data = $gameMinimap.markingData().filter(function(param) {
            return param.highlight;
        });
        var allEvents = $gameMinimap.allEvents().filter(function(event) {
            return event.markerHighlight && event.marker() > 0;
        });;
        var max = data.length + allEvents.length;
        var sprite;
        while (sprites.length > max) {
            sprite = sprites.shift();
            this.removeChild(sprite);
        }
        var bitmap = this._markerSet;
        var size = this._markerSize;
        var dataMax = data.length;
        for (var i = 0; i < dataMax; i++) {
            var param = data[i];
            sprite = sprites[i];
            if (!sprite) {
                sprite = new Sprite_HighlightMarker(bitmap, size);
                this.addChild(sprite);
                sprites[i] = sprite;
            }
            sprite.setParam(param);
            sprite.setIcon(param.m);
        }
        for (var i = 0; i < allEvents.length; i++) {
            var event = allEvents[i];
            sprite = sprites[dataMax + i];
            if (!sprite) {
                sprite = new Sprite_HighlightMarker(bitmap, size);
                this.addChild(sprite);
                sprites[dataMax + i] = sprite;
            }
            sprite.setEvent(event.eventId());
            sprite.setIcon(event.marker());
        }
        $gameMinimap.requestHighlight = false;
    }
    var zoom = $gameMinimap.zoom;
    var hw = this._realRect.width / 2;
    var hh = this._realRect.height / 2;
    var xRate = this._tileWidth * zoom;
    var yRate = this._tileHeight * zoom;
    var type = 1;
    for (var i = 0; i < sprites.length; i++) {
        var sprite = sprites[i];
        var x = sprite.minimapX() * xRate - hw;
        var y = sprite.minimapY() * yRate - hh;
        if (type === 0) {
            if (x < -hw) {
                y *= -hw / x;
                x = -hw;
            } else if (x > hw) {
                y *= hw / x;
                x = hw;
            }
            if (y < -hh) {
                x *= -hh / y;
                y = -hh;
            } else if (y > hh) {
                x *= hh / y;
                y = hh;
            }
        } else {
            x = x.clamp(-hw, hw);
            y = y.clamp(-hh, hh);
        }
        sprite.x = x;
        sprite.y = y;
        if (MPPlugin.HighlightMarkerBlink && MPPlugin.BlinkDuration > 0) {
            var d = MPPlugin.BlinkDuration;
            sprite.opacity = 320 * (d - this._updateCount) / d;
        }
    }
};

Sprite_MiniMap.prototype.hide = function() {
    this.show = false;
};

//-----------------------------------------------------------------------------
// Sprite_HighlightMarker

function Sprite_HighlightMarker() {
    this.initialize.apply(this, arguments);
}

Sprite_HighlightMarker.prototype = Object.create(Sprite.prototype);
Sprite_HighlightMarker.prototype.constructor = Sprite_HighlightMarker;

Sprite_HighlightMarker.prototype.initialize = function(bitmap, size) {
    Sprite.prototype.initialize.call(this, bitmap);
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.scale.x = MPPlugin.HighlightMarkerScale;
    this.scale.y = MPPlugin.HighlightMarkerScale;
    this._size = size;
    this._type = null;
    this._eventId = 0;
    this._mapX = 0;
    this._mapY = 0;
    this._marker = 0;
    this.setIcon(0);
};

Sprite_HighlightMarker.prototype.setParam = function(param) {
    this._type = param.pType;
    if (this._type === 'Ev') {
        this._eventId = param.id;
    } else if (this._type === 'Pos') {
        this._mapX = param.x;
        this._mapY = param.y;
    }
};

Sprite_HighlightMarker.prototype.setPos = function(x, y) {
    this._type = 'Pos';
    this._mapX = x;
    this._mapY = y;
};

Sprite_HighlightMarker.prototype.setEvent = function(eventId) {
    this._type = 'Ev';
    this._eventId = eventId;
};

Sprite_HighlightMarker.prototype.setIcon = function(marker) {
    this._marker = marker;
    this.refreshFrame();
};

Sprite_HighlightMarker.prototype.minimapX = function() {
    var x = 0;
    if (this._type === 'Ev') {
        if ($gameMinimap.isOnCurrentMap()) {
            var event = $gameMap.event(this._eventId);
            if (event) x = event._realX + 0.5;
        }
    } else if (this._type === 'Pos') {
        x = this._mapX + 0.5;
    }
    return $gameMinimap.adjustX(x);
};

Sprite_HighlightMarker.prototype.minimapY = function() {
    var y = 0;
    if (this._type === 'Ev') {
        if ($gameMinimap.isOnCurrentMap()) {
            var event = $gameMap.event(this._eventId);
            if (event) y = event._realY + 0.5;
        }
    } else if (this._type === 'Pos') {
        y = this._mapY + 0.5;
    }
    return $gameMinimap.adjustY(y);
};

Sprite_HighlightMarker.prototype.refreshFrame = function() {
    var marker = this._marker;
    var size = this._size;
    var x = marker % 8 * size;
    var y = Math.floor(marker / 8) * size;
    this.setFrame(x, y, size, size);
};

//-----------------------------------------------------------------------------
// Spriteset_Map

Spriteset_Map.prototype.addMinimap = function(minimap, z) {
    var index = -1;
    if (z === 0) {
        index = this.children.indexOf(this._pictureContainer);
    } else if (z === 1) {
        index = this.children.indexOf(this._timerSprite);
    } else if (z === 2) {
        index = this.children.indexOf(this._flashSprite);
    } else if (z === 3) {
        index = this.children.indexOf(this._fadeSprite) + 1;
    }
    if (index >= 0) {
        this.addChildAt(minimap, index);
    }
};

//-----------------------------------------------------------------------------
// Scene_Map

//36
Alias.ScMa_onMapLoaded = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
    Alias.ScMa_onMapLoaded.call(this);
    if ($gameMinimap.requestCreate) {
        $gameMinimap.create();
        $gameMinimap.requestCreate = false;
    }
};

//107
Alias.ScMa_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
    this._miniMap.hide();
    Alias.ScMa_terminate.call(this);
};

//195
Alias.ScMa_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function() {
    Alias.ScMa_createDisplayObjects.apply(this, arguments);
    this.createMinimap();
};

Scene_Map.prototype.createMinimap = function() {
    this._miniMap = new Sprite_MiniMap();
    //if (MPPlugin.MinimapZ < 4) {
        this._spriteset.addMinimap(this._miniMap, MPPlugin.MinimapZ);
   // } else {
        var index = this.children.indexOf(this._mapNameWindow);
        this.addChildAt(this._miniMap, index);
    //}
};

//251
Alias.ScMa_callMenu = Scene_Map.prototype.callMenu;
Scene_Map.prototype.callMenu = function() {
    Alias.ScMa_callMenu.call(this);
    this._miniMap.hide();
};

//288
Alias.ScMa_launchBattle = Scene_Map.prototype.launchBattle;
Scene_Map.prototype.launchBattle = function() {
    Alias.ScMa_launchBattle.call(this);
    this._miniMap.hide();
};

//-----------------------------------------------------------------------------
// Scene_Boot

//29
Alias.ScBo_loadSystemImages = Scene_Boot.loadSystemImages;
Scene_Boot.loadSystemImages = function() {
    Alias.ScBo_loadSystemImages.call(this);
    ImageManager.reserveSystem('MinimapMarkerSet');
};


})();
