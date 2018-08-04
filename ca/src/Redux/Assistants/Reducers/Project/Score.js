import { handleActions } from 'redux-actions'

const initialState = {
  scores: [
	{
		"professor_name": "葉榮美",
		"student": {
			"id": "0616001",
			"name": "蔡承人",
			"score": 32
		}
	},
	{
		"professor_name": "陳舒善",
		"student": {
			"id": "0616002",
			"name": "韓冠宇",
			"score": 32
		}
	},
	{
		"professor_name": "何志成",
		"student": {
			"id": "0616003",
			"name": "李淑慧",
			"score": 54
		}
	},
	{
		"professor_name": "王珍霞",
		"student": {
			"id": "0616004",
			"name": "謝郁婷",
			"score": 12
		}
	},
	{
		"professor_name": "鄧景宜",
		"student": {
			"id": "0616005",
			"name": "家慧汝",
			"score": 52
		}
	},
	{
		"professor_name": "沈佳穎",
		"student": {
			"id": "0616006",
			"name": "陳雅全",
			"score": 56
		}
	},
	{
		"professor_name": "鄭士",
		"student": {
			"id": "0616007",
			"name": "劉思賢",
			"score": 8
		}
	},
	{
		"professor_name": "羅維銘",
		"student": {
			"id": "0616008",
			"name": "蔡柔鈺",
			"score": 30
		}
	},
	{
		"professor_name": "曹雅玲",
		"student": {
			"id": "0616009",
			"name": "姚淑婷",
			"score": 44
		}
	},
	{
		"professor_name": "林孟麟",
		"student": {
			"id": "0616010",
			"name": "陳宏菁",
			"score": 94
		}
	},
	{
		"professor_name": "宋人昇",
		"student": {
			"id": "0616011",
			"name": "林秀吟",
			"score": 44
		}
	},
	{
		"professor_name": "章俊賢",
		"student": {
			"id": "0616012",
			"name": "林宜凡",
			"score": 39
		}
	},
	{
		"professor_name": "謝文華",
		"student": {
			"id": "0616013",
			"name": "鄭季元",
			"score": 65
		}
	},
	{
		"professor_name": "謝峻容",
		"student": {
			"id": "0616014",
			"name": "洪翠雯",
			"score": 19
		}
	},
	{
		"professor_name": "李姵君",
		"student": {
			"id": "0616015",
			"name": "陳建全",
			"score": 51
		}
	},
	{
		"professor_name": "林興誠",
		"student": {
			"id": "0616016",
			"name": "童秀芬",
			"score": 91
		}
	},
	{
		"professor_name": "連昕萍",
		"student": {
			"id": "0616017",
			"name": "李雅婷",
			"score": 1
		}
	},
	{
		"professor_name": "郭佩玲",
		"student": {
			"id": "0616018",
			"name": "何士賢",
			"score": 5
		}
	},
	{
		"professor_name": "林盈君",
		"student": {
			"id": "0616019",
			"name": "劉伊婷",
			"score": 89
		}
	},
	{
		"professor_name": "黃婉成",
		"student": {
			"id": "0616020",
			"name": "賴旺瑜",
			"score": 34
		}
	},
	{
		"professor_name": "陳宜士",
		"student": {
			"id": "0616021",
			"name": "李家杰",
			"score": 25
		}
	},
	{
		"professor_name": "黃靖南",
		"student": {
			"id": "0616022",
			"name": "丁昕政",
			"score": 58
		}
	},
	{
		"professor_name": "游家綺",
		"student": {
			"id": "0616023",
			"name": "許育來",
			"score": 20
		}
	},
	{
		"professor_name": "王建志",
		"student": {
			"id": "0616024",
			"name": "李彥翔",
			"score": 51
		}
	},
	{
		"professor_name": "邱莉雯",
		"student": {
			"id": "0616025",
			"name": "李裕翔",
			"score": 38
		}
	},
	{
		"professor_name": "姚儒嬌",
		"student": {
			"id": "0616026",
			"name": "袁昭玉",
			"score": 65
		}
	},
	{
		"professor_name": "李漢義",
		"student": {
			"id": "0616027",
			"name": "林奕勇",
			"score": 30
		}
	},
	{
		"professor_name": "劉永吟",
		"student": {
			"id": "0616028",
			"name": "謝欣穎",
			"score": 7
		}
	},
	{
		"professor_name": "陳彥富",
		"student": {
			"id": "0616029",
			"name": "張馨峰",
			"score": 20
		}
	},
	{
		"professor_name": "陳睿燕",
		"student": {
			"id": "0616030",
			"name": "吳江芳",
			"score": 10
		}
	},
	{
		"professor_name": "段美君",
		"student": {
			"id": "0616031",
			"name": "吳佳臻",
			"score": 51
		}
	},
	{
		"professor_name": "郭鈞雄",
		"student": {
			"id": "0616032",
			"name": "宋得法",
			"score": 18
		}
	},
	{
		"professor_name": "陳家銘",
		"student": {
			"id": "0616033",
			"name": "鄧志文",
			"score": 43
		}
	},
	{
		"professor_name": "許宇亮",
		"student": {
			"id": "0616034",
			"name": "林秋軒",
			"score": 71
		}
	},
	{
		"professor_name": "黃慈文",
		"student": {
			"id": "0616035",
			"name": "林平慈",
			"score": 97
		}
	},
	{
		"professor_name": "韓紹興",
		"student": {
			"id": "0616036",
			"name": "涂佩君",
			"score": 61
		}
	},
	{
		"professor_name": "阮俊明",
		"student": {
			"id": "0616037",
			"name": "曹耀皓",
			"score": 26
		}
	},
	{
		"professor_name": "陳于庭",
		"student": {
			"id": "0616038",
			"name": "陳旺啟",
			"score": 5
		}
	},
	{
		"professor_name": "葉韋志",
		"student": {
			"id": "0616039",
			"name": "黃淑淳",
			"score": 57
		}
	},
	{
		"professor_name": "林怡文",
		"student": {
			"id": "0616040",
			"name": "林憲善",
			"score": 70
		}
	},
	{
		"professor_name": "張雅慧",
		"student": {
			"id": "0616041",
			"name": "顏志豪",
			"score": 65
		}
	},
	{
		"professor_name": "林舜文",
		"student": {
			"id": "0616042",
			"name": "謝志銘",
			"score": 0
		}
	},
	{
		"professor_name": "黃上明",
		"student": {
			"id": "0616043",
			"name": "林惠宣",
			"score": 75
		}
	},
	{
		"professor_name": "吳淑玲",
		"student": {
			"id": "0616044",
			"name": "賴卓念",
			"score": 29
		}
	},
	{
		"professor_name": "白善雅",
		"student": {
			"id": "0616045",
			"name": "林彥博",
			"score": 86
		}
	},
	{
		"professor_name": "陳威義",
		"student": {
			"id": "0616046",
			"name": "朱瓊夫",
			"score": 93
		}
	},
	{
		"professor_name": "鄭珮緯",
		"student": {
			"id": "0616047",
			"name": "陳惠岳",
			"score": 87
		}
	},
	{
		"professor_name": "謝健豪",
		"student": {
			"id": "0616048",
			"name": "李鈺雯",
			"score": 87
		}
	},
	{
		"professor_name": "吳佩禾",
		"student": {
			"id": "0616049",
			"name": "劉賢冰",
			"score": 64
		}
	},
	{
		"professor_name": "朱綠邦",
		"student": {
			"id": "0616050",
			"name": "葉佳茜",
			"score": 75
		}
	},
	{
		"professor_name": "吳宜靜",
		"student": {
			"id": "0616051",
			"name": "楊佳玲",
			"score": 88
		}
	},
	{
		"professor_name": "黃珮郁",
		"student": {
			"id": "0616052",
			"name": "戴誠",
			"score": 89
		}
	},
	{
		"professor_name": "王郁翔",
		"student": {
			"id": "0616053",
			"name": "趙俊彥",
			"score": 100
		}
	},
	{
		"professor_name": "陳慧芷",
		"student": {
			"id": "0616054",
			"name": "陳玟桂",
			"score": 7
		}
	},
	{
		"professor_name": "林世順",
		"student": {
			"id": "0616055",
			"name": "尤建宏",
			"score": 40
		}
	},
	{
		"professor_name": "金威菁",
		"student": {
			"id": "0616056",
			"name": "張毓璇",
			"score": 37
		}
	},
	{
		"professor_name": "鐘世昌",
		"student": {
			"id": "0616057",
			"name": "黃旻真",
			"score": 38
		}
	},
	{
		"professor_name": "曾明珠",
		"student": {
			"id": "0616058",
			"name": "李宛東",
			"score": 36
		}
	},
	{
		"professor_name": "葉怡桂",
		"student": {
			"id": "0616059",
			"name": "陳詩涵",
			"score": 44
		}
	},
	{
		"professor_name": "謝依輝",
		"student": {
			"id": "0616060",
			"name": "吳建啟",
			"score": 24
		}
	},
	{
		"professor_name": "楊思潔",
		"student": {
			"id": "0616061",
			"name": "張文龍",
			"score": 46
		}
	},
	{
		"professor_name": "蔡孟傑",
		"student": {
			"id": "0616062",
			"name": "林文欣",
			"score": 95
		}
	},
	{
		"professor_name": "蔡晉蓮",
		"student": {
			"id": "0616063",
			"name": "黃佳穎",
			"score": 43
		}
	},
	{
		"professor_name": "郭俊瑋",
		"student": {
			"id": "0616064",
			"name": "李怡均",
			"score": 89
		}
	},
	{
		"professor_name": "謝軒蓮",
		"student": {
			"id": "0616065",
			"name": "吳卓奇",
			"score": 32
		}
	},
	{
		"professor_name": "林真裕",
		"student": {
			"id": "0616066",
			"name": "賴金梅",
			"score": 5
		}
	},
	{
		"professor_name": "陳昇龍",
		"student": {
			"id": "0616067",
			"name": "張博玟",
			"score": 15
		}
	},
	{
		"professor_name": "侯馥秋",
		"student": {
			"id": "0616068",
			"name": "梁明哲",
			"score": 58
		}
	},
	{
		"professor_name": "岑琦能",
		"student": {
			"id": "0616069",
			"name": "郎玉芳",
			"score": 77
		}
	},
	{
		"professor_name": "邱建豪",
		"student": {
			"id": "0616070",
			"name": "林曉堯",
			"score": 72
		}
	},
	{
		"professor_name": "吳政宜",
		"student": {
			"id": "0616071",
			"name": "黃婉君",
			"score": 95
		}
	},
	{
		"professor_name": "陳韋卿",
		"student": {
			"id": "0616072",
			"name": "溫毅茹",
			"score": 8
		}
	},
	{
		"professor_name": "王潔卿",
		"student": {
			"id": "0616073",
			"name": "陳馨儀",
			"score": 38
		}
	},
	{
		"professor_name": "張凱念",
		"student": {
			"id": "0616074",
			"name": "林秋靖",
			"score": 69
		}
	},
	{
		"professor_name": "王曉云",
		"student": {
			"id": "0616075",
			"name": "簡志銘",
			"score": 37
		}
	},
	{
		"professor_name": "陳家瑜",
		"student": {
			"id": "0616076",
			"name": "詹志文",
			"score": 24
		}
	},
	{
		"professor_name": "丁志平",
		"student": {
			"id": "0616077",
			"name": "黃育萱",
			"score": 27
		}
	},
	{
		"professor_name": "蔡慧敏",
		"student": {
			"id": "0616078",
			"name": "潘詩涵",
			"score": 90
		}
	},
	{
		"professor_name": "錢佩珊",
		"student": {
			"id": "0616079",
			"name": "杜怡君",
			"score": 77
		}
	},
	{
		"professor_name": "梁佩怡",
		"student": {
			"id": "0616080",
			"name": "張振木",
			"score": 92
		}
	},
	{
		"professor_name": "程淑華",
		"student": {
			"id": "0616081",
			"name": "周鈺婷",
			"score": 31
		}
	},
	{
		"professor_name": "張雅夫",
		"student": {
			"id": "0616082",
			"name": "林恒淳",
			"score": 30
		}
	},
	{
		"professor_name": "林芷妃",
		"student": {
			"id": "0616083",
			"name": "張宗政",
			"score": 80
		}
	},
	{
		"professor_name": "洪馨文",
		"student": {
			"id": "0616084",
			"name": "吳秀琴",
			"score": 30
		}
	},
	{
		"professor_name": "鄭耀中",
		"student": {
			"id": "0616085",
			"name": "奚映威",
			"score": 37
		}
	},
	{
		"professor_name": "黃淑華",
		"student": {
			"id": "0616086",
			"name": "沈靜瑜",
			"score": 86
		}
	},
	{
		"professor_name": "劉欣怡",
		"student": {
			"id": "0616087",
			"name": "林素貞",
			"score": 33
		}
	},
	{
		"professor_name": "蔡石凌",
		"student": {
			"id": "0616088",
			"name": "張沛江",
			"score": 76
		}
	},
	{
		"professor_name": "廖珮弘",
		"student": {
			"id": "0616089",
			"name": "林欣映",
			"score": 21
		}
	},
	{
		"professor_name": "馮星綠",
		"student": {
			"id": "0616090",
			"name": "王左蓁",
			"score": 77
		}
	},
	{
		"professor_name": "林哲娥",
		"student": {
			"id": "0616091",
			"name": "王盈君",
			"score": 100
		}
	},
	{
		"professor_name": "陳嘉恩",
		"student": {
			"id": "0616092",
			"name": "黃雅昌",
			"score": 68
		}
	},
	{
		"professor_name": "黃恒娥",
		"student": {
			"id": "0616093",
			"name": "吳艾憲",
			"score": 37
		}
	},
	{
		"professor_name": "李俊芝",
		"student": {
			"id": "0616094",
			"name": "鍾明玲",
			"score": 8
		}
	},
	{
		"professor_name": "辛佳靜",
		"student": {
			"id": "0616095",
			"name": "陳宗珊",
			"score": 22
		}
	},
	{
		"professor_name": "陳怡玫",
		"student": {
			"id": "0616096",
			"name": "方介岑",
			"score": 69
		}
	},
	{
		"professor_name": "黃千靖",
		"student": {
			"id": "0616097",
			"name": "王春蘭",
			"score": 81
		}
	},
	{
		"professor_name": "陳冠龍",
		"student": {
			"id": "0616098",
			"name": "張冠廷",
			"score": 38
		}
	},
	{
		"professor_name": "張慧娟",
		"student": {
			"id": "0616099",
			"name": "王冠勳",
			"score": 94
		}
	},
	{
		"professor_name": "楊美珠",
		"student": {
			"id": "0616100",
			"name": "曹均妍",
			"score": 57
		}
	}
]
,
  first_second: 1,
  academic_year: 106,
  semestor: 2,
  sort_by: 'id',
  desend: true,
  page: 0
}

export default handleActions({
  SCORE_SET_SEMESTOR: (state, action) => ({ ...state,
    semestor: action.payload
  }),
  SCORE_SET_ACADEMIC_YEAR: (state, action) => ({ ...state,
    academic_year: action.payload
  }),
  SCORE_SET_FIRST_SECOND: (state, action) => ({ ...state,
    first_second: action.payload
  }),
  SCORE_SET_SORT_BY: (state, action) => ({ ...state,
    sort_by: action.payload,
    desend: true
  }),
  SCORE_TOGGLE_DESEND: (state) => ({ ...state,
    desend: !state.desend
  }),
  SCORE_TO_GIVEN_PAGE: (state, action) => ({ ...state,
    page: action.payload
  }),
  STORE_SCORE: (state, action) => ({ ...state,
    scores: action.payload
  })
}, initialState)
