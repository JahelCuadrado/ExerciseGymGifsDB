/**
 * Simplified Chinese (中文简体) translation module for exercise slugs.
 *
 * Chinese exercise names typically follow:
 *   [EQUIPMENT] [POSTURE] [GRIP] [MOVEMENT]
 *
 * Examples:
 *   barbell-bench-press            -> 杠铃卧推
 *   cable-seated-close-grip-row    -> 绳索坐姿窄握划船
 *   dumbbell-standing-curl         -> 哑铃站姿弯举
 */

const STOP_WORDS = new Set(["a", "the", "an", "v", "male", "female", "pov", "side-pov", "back-pov", "front-pov", "version", "of", "and", "to", "in", "from", "into", "both", "on", "with", "for", "at", "by", "its", "all", "between", "can", "get", "plus", "self", "pro"]);

// ─────────────────────────────────────────────────────────────
// MOVEMENTS
// ─────────────────────────────────────────────────────────────
const MOVEMENTS = [
	// Bench press
	["close-grip-bench-press", "窄握卧推"],
	["incline-bench-press", "上斜卧推"],
	["decline-bench-press", "下斜卧推"],
	["bench-press", "卧推"],
	["chest-press", "推胸"],
	["floor-press", "地板卧推"],
	// Overhead press
	["overhead-press", "过头推举"],
	["military-press", "军事推举"],
	["shoulder-press", "肩部推举"],
	["push-press", "借力推举"],
	["arnold-press", "阿诺德推举"],
	["behind-neck-press", "颈后推举"],
	// Triceps
	["skull-crusher", "仰卧臂屈伸"],
	["skull-crushers", "仰卧臂屈伸"],
	["skullcrusher", "仰卧臂屈伸"],
	["close-grip-to-skull-press", "窄握至头顶推举"],
	["lying-triceps-extension", "仰卧臂屈伸"],
	["overhead-triceps-extension", "过头臂屈伸"],
	["triceps-extension", "臂屈伸"],
	["triceps-pushdown", "三头肌下压"],
	["triceps-kickback", "三头肌回踢"],
	// Squats
	["front-squat", "前蹲"],
	["back-squat", "深蹲"],
	["goblet-squat", "高脚杯深蹲"],
	["sissy-squat", "辅助式深蹲"],
	["split-squat", "分腿蹲"],
	["squat", "深蹲"],
	// Deadlifts
	["sumo-deadlift", "相扑硬拉"],
	["romanian-deadlift", "罗马尼亚硬拉"],
	["stiff-leg-deadlift", "直腿硬拉"],
	["deadlift", "硬拉"],
	["rack-pull", "架上拉"],
	// Rows
	["bent-over-row", "俯身划船"],
	["upright-row", "直立划船"],
	["cable-row", "绳索划船"],
	["t-bar-row", "T杠划船"],
	["pendlay-row", "彭德莱划船"],
	["one-arm-row", "单臂划船"],
	["row", "划船"],
	// Pull-ups / Chin-ups
	["pull-up", "引体向上"],
	["pull-ups", "引体向上"],
	["chin-up", "反握引体向上"],
	["chin-ups", "反握引体向上"],
	["muscle-up", "双力臂"],
	["lat-pulldown", "高位下拉"],
	["pulldown", "下拉"],
	// Curls
	["hammer-curl", "锤式弯举"],
	["hammer-curls", "锤式弯举"],
	["preacher-curl", "牧师凳弯举"],
	["concentration-curl", "集中弯举"],
	["spider-curl", "蜘蛛弯举"],
	["drag-curl", "拖曳弯举"],
	["reverse-curl", "反握弯举"],
	["zottman-curl", "佐特曼弯举"],
	["wrist-curl", "腕弯举"],
	["biceps-curl", "二头弯举"],
	["bicep-curl", "二头弯举"],
	["curl", "弯举"],
	// Flyes
	["chest-fly", "飞鸟"],
	["reverse-fly", "反向飞鸟"],
	["fly", "飞鸟"],
	["flye", "飞鸟"],
	// Raises
	["lateral-raise", "侧平举"],
	["front-raise", "前平举"],
	["rear-delt-raise", "俯身侧平举"],
	["calf-raise", "提踵"],
	["leg-raise", "举腿"],
	["raise", "举"],
	// Dips
	["chest-dip", "胸部臂屈伸"],
	["triceps-dip", "三头臂屈伸"],
	["dip", "臂屈伸"],
	["dips", "臂屈伸"],
	// Push-ups
	["push-up", "俯卧撑"],
	["push-ups", "俯卧撑"],
	// Lunges
	["walking-lunge", "行走弓步"],
	["reverse-lunge", "反向弓步"],
	["lunge", "弓步"],
	["lunges", "弓步"],
	// Hip thrust / bridge
	["hip-thrust", "臀推"],
	["glute-bridge", "臀桥"],
	// Plank
	["side-plank", "侧平板支撑"],
	["plank", "平板支撑"],
	// Crunch / Sit-up
	["russian-twist", "俄罗斯转体"],
	["bicycle-crunch", "自行车卷腹"],
	["crunch", "卷腹"],
	["sit-up", "仰卧起坐"],
	["v-up", "V字起坐"],
	// Leg work
	["leg-press", "腿举"],
	["leg-extension", "腿屈伸"],
	["leg-curl", "腿弯举"],
	["hip-abduction", "髋外展"],
	["hip-adduction", "髋内收"],
	["step-up", "上踏步"],
	// Olympic
	["clean-and-press", "翻举推举"],
	["power-clean", "力量翻举"],
	["hang-clean", "悬垂翻举"],
	["clean", "翻举"],
	["snatch", "抓举"],
	["thruster", "推举深蹲"],
	// Back
	["hyperextension", "山羊挺身"],
	["back-extension", "背部伸展"],
	["good-morning", "早安式体前屈"],
	["pullover", "仰卧上拉"],
	["face-pull", "面拉"],
	["shrug", "耸肩"],
	// Cardio / plyo
	["burpee", "波比跳"],
	["mountain-climber", "登山者"],
	["box-jump", "跳箱"],
	["jump-rope", "跳绳"],
	["jumping-jack", "开合跳"],
	["high-knee", "高抬腿"],
	// Kettlebell specifics
	["kettlebell-swing", "壶铃摆荡"],
	["turkish-get-up", "土耳其起立"],
	["windmill", "风车"],
	// Stretches
	["stretch", "拉伸"],
	["stretching", "拉伸"],
	// Generic
	["press", "推举"],
	["extension", "伸展"],
	["raises", "举"],
];

// ─────────────────────────────────────────────────────────────
// VARIANTS
// ─────────────────────────────────────────────────────────────
const VARIANTS = {
	hammer: "锤式",
	preacher: "牧师凳",
	concentration: "集中",
	spider: "蜘蛛",
	drag: "拖曳",
	reverse: "反向",
	zottman: "佐特曼",
	incline: "上斜",
	decline: "下斜",
	overhead: "过头",
	arnold: "阿诺德",
	bradford: "布拉德福德",
	scott: "斯科特",
	cuban: "古巴式",
	pendlay: "彭德莱",
	hindu: "印度式",
	sumo: "相扑",
	bulgarian: "保加利亚",
	romanian: "罗马尼亚",
	goblet: "高脚杯",
	pistol: "手枪式",
	sissy: "辅助式",
	superman: "超人",
	russian: "俄罗斯",
	nordic: "北欧式",
	french: "法式",
};

// ─────────────────────────────────────────────────────────────
// EQUIPMENT
// ─────────────────────────────────────────────────────────────
const EQUIPMENT = {
	barbell: "杠铃",
	dumbbell: "哑铃",
	dumbbells: "哑铃",
	cable: "绳索",
	cables: "绳索",
	machine: "器械",
	smith: "史密斯机",
	"ez-bar": "曲杆",
	"ez-barbell": "曲杆",
	kettlebell: "壶铃",
	kettlebells: "壶铃",
	lever: "固定器械",
	bodyweight: "自重",
	band: "弹力带",
	bands: "弹力带",
	"resistance-band": "弹力带",
	rope: "绳索",
	"v-bar": "V形把手",
	"straight-bar": "直杆",
	"medicine-ball": "药球",
	"exercise-ball": "瑜伽球",
	"stability-ball": "瑜伽球",
	"swiss-ball": "瑜伽球",
	"bosu-ball": "波速球",
	sled: "雪橇",
	landmine: "地雷管",
	"trap-bar": "六角杠",
};

// ─────────────────────────────────────────────────────────────
// POSTURE
// ─────────────────────────────────────────────────────────────
const POSTURE = {
	standing: "站姿",
	seated: "坐姿",
	sitting: "坐姿",
	lying: "仰卧",
	"side-lying": "侧卧",
	kneeling: "跪姿",
	prone: "俯卧",
	supine: "仰卧",
	incline: "上斜",
	decline: "下斜",
	flat: "平板",
	side: "侧面",
	hanging: "悬挂",
};

// ─────────────────────────────────────────────────────────────
// GRIPS
// ─────────────────────────────────────────────────────────────
const GRIPS = {
	"close-grip": "窄握",
	"wide-grip": "宽握",
	"narrow-grip": "窄握",
	"medium-grip": "中等握距",
	"reverse-grip": "反握",
	"neutral-grip": "对握",
	"hammer-grip": "锤式握",
	"underhand-grip": "反握",
	"overhand-grip": "正握",
	"supinated-grip": "反握",
	"pronated-grip": "正握",
	"mixed-grip": "正反握",
};

// ─────────────────────────────────────────────────────────────
// MODIFIERS
// ─────────────────────────────────────────────────────────────
const MODIFIERS = {
	"one-arm": "单臂",
	"two-arm": "双臂",
	"single-arm": "单臂",
	"single-leg": "单腿",
	"one-leg": "单腿",
	alternating: "交替",
	alternate: "交替",
	weighted: "负重",
	assisted: "辅助",
	"bent-over": "俯身",
	"bent-knee": "屈膝",
	"straight-leg": "直腿",
	"straight-arm": "直臂",
	"stiff-leg": "直腿",
	"legs-up": "抬腿",
	"feet-elevated": "脚部抬高",
	twisting: "转体",
	"cross-body": "交叉",
	"full-range": "全程",
	"with-rope": "绳索",
	suspended: "悬挂",
	wide: "宽距",
	narrow: "窄距",
	high: "高位",
	low: "低位",
	front: "前",
	rear: "后",
};

// ─────────────────────────────────────────────────────────────
// EXTRA WORDS
// ─────────────────────────────────────────────────────────────
const EXTRA_WORDS = {
	chest: "胸",
	back: "背",
	shoulder: "肩",
	shoulders: "肩部",
	arm: "臂",
	arms: "臂",
	leg: "腿",
	legs: "腿",
	hip: "髋",
	hips: "髋部",
	knee: "膝",
	ankle: "踝",
	wrist: "腕",
	elbow: "肘",
	neck: "颈",
	spine: "脊柱",
	core: "核心",
	abs: "腹肌",
	glute: "臀",
	glutes: "臀部",
	quad: "股四头肌",
	quads: "股四头肌",
	hamstring: "腘绳肌",
	hamstrings: "腘绳肌",
	calf: "小腿",
	calves: "小腿",
	biceps: "二头肌",
	triceps: "三头肌",
	forearm: "前臂",
	forearms: "前臂",
	lats: "背阔肌",
	traps: "斜方肌",
	delts: "三角肌",
	ball: "球",
	bench: "凳",
	floor: "地面",
	wall: "墙",
	box: "箱",
	step: "台阶",
	bar: "杠",
	grip: "握",
	roller: "滚轮",
	wheel: "轮",
	kick: "踢",
	twist: "转体",
	rotation: "旋转",
	push: "推",
	pull: "拉",
	hold: "保持",
	squat: "深蹲",
	deadlift: "硬拉",
	skull: "头部",
	to: "",
	close: "窄",
	lying: "仰卧",
	straight: "直",

	// ─── MISSING TOKENS FIX ───
	bridge: "桥式",
	hack: "哈克",
	curls: "弯举",
	face: "面部",
	ring: "吊环",
	rings: "吊环",
	split: "分腿",
	dips: "臂屈伸",
	jefferson: "杰斐逊",
	bradford: "布拉德福德",
	arnold: "阿诺德",
	scott: "斯科特",
	zottman: "佐特曼",
	sissy: "辅助式",
	bosu: "波速球",
	rocky: "洛基",
	pendlay: "彭德莱",
	l: "L",
	t: "T",
	w: "W",
	y: "Y",

	// ─── AUTO-GENERATED TRANSLATIONS ───
	hand: "手",
	hands: "双手",
	legged: "腿",
	knees: "膝",
	toe: "脚趾",
	heel: "脚跟",
	head: "头",
	chin: "下巴",
	feet: "脚",
	ankles: "踝",
	finger: "手指",
	palm: "掌",
	palms: "双掌",
	butt: "臀",
	groin: "腹股沟",
	gluteus: "臀",
	pec: "胸",
	pectoralis: "胸肌",
	delt: "三角肌",
	deltoid: "三角肌",
	bicep: "二头肌",
	tricep: "三头肌",
	lat: "背阔肌",
	trap: "斜方肌",
	oblique: "腹斜肌",
	ham: "腘绳肌",
	femoral: "股",
	femoris: "股",
	rectus: "直肌",
	tibialis: "胫骨前肌",
	peroneals: "腓骨肌",
	piriformis: "梨状肌",
	abductor: "外展肌",
	adductor: "内收肌",
	abduction: "外展",
	adduction: "内收",
	flexor: "屈肌",
	retractor: "后缩",
	scapula: "肩胛骨",
	scapular: "肩胛",
	posterior: "后",
	forward: "向前",
	backward: "向后",
	lateral: "侧",
	behind: "背后",
	above: "上方",
	across: "交叉",
	inner: "内侧",
	outer: "外侧",
	inside: "内",
	outside: "外",
	upper: "上",
	lower: "下",
	middle: "中",
	left: "左",
	vertical: "垂直",
	horizontal: "水平",
	parallel: "平行",
	diagonal: "对角",
	upright: "直立",
	upward: "向上",
	jump: "跳",
	jumps: "跳",
	run: "跑",
	walk: "走",
	walking: "行走",
	climb: "攀爬",
	crawl: "爬行",
	throw: "投掷",
	catch: "接",
	touch: "触",
	lift: "举",
	lifting: "举",
	drive: "驱动",
	slide: "滑动",
	sprint: "冲刺",
	sprints: "冲刺",
	carry: "负重行走",
	drag: "拖",
	hops: "跳跃",
	march: "踏步",
	squeeze: "挤压",
	raise: "举",
	raises: "举",
	raised: "抬起",
	rotate: "旋转",
	rotational: "旋转",
	rotary: "旋转",
	flexion: "屈曲",
	extension: "伸展",
	bend: "弯曲",
	bends: "弯曲",
	bent: "屈",
	pass: "传递",
	circles: "绕环",
	circular: "环形",
	kicks: "踢",
	drop: "下落",
	flip: "翻转",
	tilt: "倾斜",
	reach: "伸展",
	release: "释放",
	tap: "轻触",
	planche: "俄式挺身",
	isometric: "等长",
	plyo: "增强式",
	dynamic: "动态",
	ballistic: "爆发式",
	negative: "离心",
	smith: "史密斯",
	kettlebell: "壶铃",
	ez: "曲杆",
	medicine: "药球",
	stability: "稳定球",
	resistance: "弹力",
	towel: "毛巾",
	bars: "双杠",
	attachment: "配件",
	pad: "垫",
	platform: "平台",
	cage: "深蹲架",
	board: "板",
	tire: "轮胎",
	strap: "带",
	straps: "带",
	ropes: "绳索",
	handle: "把手",
	pulley: "滑轮",
	landmine: "地雷架",
	pin: "插销",
	stirrups: "脚蹬",
	trainer: "训练器",
	treadmill: "跑步机",
	elliptical: "椭圆机",
	ergometer: "测功仪",
	stepmill: "登梯机",
	staircase: "阶梯",
	gripper: "握力器",
	iron: "铁",
	one: "单",
	two: "双",
	single: "单侧",
	double: "双",
	half: "半",
	full: "全",
	deep: "深",
	wide: "宽",
	narrow: "窄",
	short: "短",
	high: "高",
	low: "低",
	quick: "快速",
	slow: "慢",
	reverse: "反向",
	reversed: "反向",
	revers: "反向",
	inverted: "倒立",
	inverse: "反",
	modified: "改良",
	advanced: "高级",
	basic: "基础",
	extended: "伸展",
	elevated: "抬高",
	supported: "辅助",
	support: "支撑",
	fixed: "固定",
	stationary: "静止",
	cross: "交叉",
	crossover: "交叉",
	crossovers: "交叉",
	over: "过",
	down: "下",
	up: "上",
	ups: "上",
	out: "外",
	off: "离",
	sit: "坐",
	anti: "抗",
	russian: "俄罗斯",
	military: "军事",
	hammer: "锤式",
	spider: "蜘蛛",
	preacher: "牧师凳",
	concentration: "集中",
	sumo: "相扑",
	hindu: "印度",
	turkish: "土耳其",
	korean: "韩式",
	cossack: "哥萨克",
	zercher: "泽奇",
	gironda: "吉隆达",
	janda: "扬达",
	thibaudeau: "蒂博多",
	donkey: "驴式",
	pushdown: "下压",
	kickback: "后踢",
	kickbacks: "后踢",
	hyperextension: "背伸展",
	rollout: "滚轮",
	rollerout: "滚轮",
	blaster: "强化",
	windmill: "风车",
	superman: "超人",
	inchworm: "毛毛虫",
	lunge: "弓步",
	pike: "屈体",
	tuck: "团身",
	flag: "旗帜",
	handstand: "倒立",
	elevator: "电梯式",
	sphinx: "狮身人面",
	cocoons: "茧式",
	bike: "自行车",
	cycle: "骑行",
	air: "空中",
	exercise: "练习",
	motion: "运动",
	stance: "站姿",
	position: "位置",
	pose: "姿势",
	stretch: "拉伸",
	angle: "角度",
	angled: "斜",
	power: "力量",
	speed: "速度",
	hang: "悬挂",
	dead: "死",
	bug: "虫",
	star: "星形",
	frog: "蛙式",
	cat: "猫式",
	dog: "狗式",
	cobra: "眼镜蛇",
	bear: "熊",
	gorilla: "大猩猩",
	crab: "螃蟹",
	butterfly: "蝴蝶",
	swimmer: "游泳",
	skater: "滑冰",
	archer: "弓箭手",
	jerk: "挺举",
	against: "对抗",
	through: "穿过",
	around: "绕",
	apart: "分开",
	chair: "椅子",
	ground: "地面",
	figure: "数字",
	reps: "次数",
	jack: "开合跳",
	slam: "砸",
	ab: "腹",
	abdominal: "腹部",
	astride: "跨",
	balance: "平衡",
	battling: "战绳",
	benches: "凳",
	big: "大",
	body: "身体",
	bottoms: "底",
	bowling: "保龄球",
	boxing: "拳击",
	breeding: "开合",
	cambered: "弯曲",
	captains: "船长椅",
	caster: "滚轮",
	clap: "击掌",
	clasped: "合掌",
	clock: "时钟",
	closer: "靠近",
	contralateral: "对侧",
	crunches: "卷腹",
	crusher: "碎颅",
	curtsey: "屈膝礼",
	degrees: "度",
	depresor: "下压",
	depth: "深度",
	diamond: "钻石",
	equipment: "器械",
	external: "外旋",
	facing: "面向",
	fallout: "滚轮伸展",
	farmers: "农夫",
	flutter: "交替",
	flyes: "飞鸟",
	forth: "前",
	fours: "四肢",
	frankenstein: "弗兰肯斯坦",
	gravity: "重力",
	greatest: "最大",
	gripless: "无握",
	guillotine: "断头台",
	hook: "钩",
	hug: "拥抱",
	hyght: "海特",
	hyper: "超",
	impossible: "不可能",
	intermediate: "中级",
	internal: "内旋",
	jackknife: "折叠",
	jm: "JM",
	judo: "柔道",
	kayak: "划船",
	keens: "膝",
	kipping: "蝶式",
	knife: "刀",
	lean: "倾斜",
	machine: "器械",
	major: "大",
	maltese: "马耳他",
	monster: "怪物",
	multiple: "多重",
	neutral: "中立",
	olympic: "奥林匹克",
	otis: "奥蒂斯",
	outstretched: "伸展",
	overhand: "正握",
	pallof: "帕洛夫",
	peacher: "牧师",
	pelvic: "骨盆",
	pirate: "海盗",
	pistol: "手枪式",
	point: "点",
	potty: "蹲式",
	presses: "推举",
	prisoner: "囚徒",
	pronate: "旋前",
	pronated: "旋前",
	pronation: "旋前",
	pulldown: "下拉",
	pyramid: "金字塔",
	quarter: "四分之一",
	range: "幅度",
	reclining: "斜躺",
	renegade: "叛逆",
	response: "反应",
	rocking: "摇摆",
	rocky: "洛基",
	rollerer: "滚筒",
	round: "圆",
	row: "划船",
	runners: "跑步者",
	saw: "锯",
	scissor: "剪刀",
	seesaw: "跷跷板",
	semi: "半",
	sequence: "序列",
	side: "侧",
	sitted: "坐姿",
	ski: "滑雪",
	skier: "滑雪者",
	skin: "表皮",
	skullcrusher: "仰卧臂屈伸",
	sledge: "雪橇",
	slingers: "投石",
	spell: "拼写",
	squad: "小队",
	squats: "深蹲",
	squatting: "蹲",
	stabilization: "稳定",
	stalder: "施塔尔德",
	stepbox: "踏板",
	sternum: "胸骨",
	stork: "鹳",
	straddle: "跨",
	stride: "跨步",
	style: "式",
	supinated: "旋后",
	supination: "旋后",
	supper: "上",
	svend: "斯文德",
	sz: "曲杆",
	tate: "泰特",
	tennis: "网球",
	three: "三",
	thrusts: "推力",
	touchers: "触碰",
	twin: "双",
	twisted: "扭转",
	twists: "扭转",
	under: "下",
	underhand: "反握",
	unilateral: "单侧",
	variation: "变体",
	waiter: "侍者",
	wind: "风",
	wipers: "雨刷",
	world: "世界",
	yoga: "瑜伽",
	curl: "弯举",
	press: "推举",
	swing: "摆动",
};

// ─────────────────────────────────────────────────────────────
// TOKENIZER
// ─────────────────────────────────────────────────────────────

function tokenize(slug) {
	const multiWordKeys = [
		...MOVEMENTS.map(([k]) => k),
		...Object.keys(EQUIPMENT).filter(k => k.includes("-")),
		...Object.keys(GRIPS).filter(k => k.includes("-")),
		...Object.keys(MODIFIERS).filter(k => k.includes("-")),
		...Object.keys(POSTURE).filter(k => k.includes("-")),
	].sort((a, b) => b.length - a.length);
	let remaining = slug;
	const tokens = [];

	while (remaining.length > 0) {
		let matched = false;
		for (const key of multiWordKeys) {
			if (remaining === key || remaining.startsWith(key + "-")) {
				tokens.push(key);
				remaining = remaining.slice(key.length);
				if (remaining.startsWith("-")) remaining = remaining.slice(1);
				matched = true;
				break;
			}
		}
		if (!matched) {
			const dashIdx = remaining.indexOf("-");
			if (dashIdx === -1) {
				tokens.push(remaining);
				remaining = "";
			} else {
				tokens.push(remaining.slice(0, dashIdx));
				remaining = remaining.slice(dashIdx + 1);
			}
		}
	}
	return tokens;
}

// ─────────────────────────────────────────────────────────────
// COMPOSITION (Chinese: modifiers BEFORE movement, no commas)
// ─────────────────────────────────────────────────────────────

function translateSlug(slug) {
	const tokens = tokenize(slug);
	const used = new Array(tokens.length).fill(false);

	let movement = null;
	for (const [key, value] of MOVEMENTS) {
		const idx = tokens.indexOf(key);
		if (idx !== -1) {
			movement = value;
			used[idx] = true;
			break;
		}
	}

	const variants = [];
	tokens.forEach((tok, i) => {
		if (used[i]) return;
		if (VARIANTS[tok]) {
			variants.push(VARIANTS[tok]);
			used[i] = true;
		}
	});

	const equipment = [];
	const hasSmith = tokens.includes("smith");
	tokens.forEach((tok, i) => {
		if (used[i]) return;
		if (hasSmith && tok === "machine") {
			used[i] = true;
			return;
		}
		if (EQUIPMENT[tok]) {
			equipment.push(EQUIPMENT[tok]);
			used[i] = true;
		}
	});

	const postures = [];
	tokens.forEach((tok, i) => {
		if (used[i]) return;
		if (POSTURE[tok]) {
			postures.push(POSTURE[tok]);
			used[i] = true;
		}
	});

	const grips = [];
	tokens.forEach((tok, i) => {
		if (used[i]) return;
		if (GRIPS[tok]) {
			grips.push(GRIPS[tok]);
			used[i] = true;
		}
	});

	const modifiers = [];
	tokens.forEach((tok, i) => {
		if (used[i]) return;
		if (MODIFIERS[tok]) {
			modifiers.push(MODIFIERS[tok]);
			used[i] = true;
		}
	});

	const leftover = [];
	tokens.forEach((tok, i) => {
		if (used[i]) return;
		if (STOP_WORDS.has(tok)) return;
		if (/^\d+$/.test(tok)) return;
		const movMatch = MOVEMENTS.find(([key]) => key === tok);
		leftover.push(movMatch ? movMatch[1] : (EXTRA_WORDS[tok] || tok));
	});

	// Chinese composition: EQUIPMENT + POSTURE + GRIP + MODIFIERS + VARIANT + MOVEMENT
	// All concatenated without spaces (Chinese doesn't use spaces)
	const parts = [];
	if (equipment.length) parts.push(...equipment);
	if (postures.length) parts.push(...postures);
	if (grips.length) parts.push(...grips);
	if (modifiers.length) parts.push(...modifiers);
	if (variants.length) parts.push(...variants);
	if (movement) {
		parts.push(movement);
	} else if (leftover.length) {
		parts.push(...leftover);
	}

	// If no leftover was consumed and there are leftovers, append them
	if (movement && leftover.length) {
		parts.push(...leftover);
	}

	let result = parts.join("");
	if (!result) result = slug;

	return result;
}

module.exports = { translateSlug };
