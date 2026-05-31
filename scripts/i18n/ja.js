/**
 * Japanese (日本語) translation module for exercise slugs.
 *
 * Japanese uses katakana for borrowed fitness terms and kanji for native words.
 * Composition: [EQUIPMENT] [POSTURE] [GRIP] [MODIFIERS] [MOVEMENT]
 * Similar to Chinese - modifiers precede the movement noun.
 *
 * Examples:
 *   barbell-bench-press            -> バーベル・ベンチプレス
 *   cable-seated-close-grip-row    -> ケーブル・シーテッド・ナローグリップ・ロウ
 *   dumbbell-standing-curl         -> ダンベル・スタンディング・カール
 */

const STOP_WORDS = new Set(["a", "the", "an", "v", "male", "female", "pov", "side-pov", "back-pov", "front-pov", "version", "of", "and", "to", "in", "from", "into", "both", "on", "with", "for", "at", "by", "its", "all", "between", "can", "get", "plus", "self", "pro"]);

// ─────────────────────────────────────────────────────────────
// MOVEMENTS
// ─────────────────────────────────────────────────────────────
const MOVEMENTS = [
	// Bench press
	["close-grip-bench-press", "ナローグリップ・ベンチプレス"],
	["incline-bench-press", "インクライン・ベンチプレス"],
	["decline-bench-press", "デクライン・ベンチプレス"],
	["bench-press", "ベンチプレス"],
	["chest-press", "チェストプレス"],
	["floor-press", "フロアプレス"],
	// Overhead press
	["overhead-press", "オーバーヘッドプレス"],
	["military-press", "ミリタリープレス"],
	["shoulder-press", "ショルダープレス"],
	["push-press", "プッシュプレス"],
	["arnold-press", "アーノルドプレス"],
	["behind-neck-press", "ビハインドネックプレス"],
	// Triceps
	["skull-crusher", "スカルクラッシャー"],
	["skull-crushers", "スカルクラッシャー"],
	["lying-triceps-extension", "ライイング・トライセプスエクステンション"],
	["overhead-triceps-extension", "オーバーヘッド・トライセプスエクステンション"],
	["triceps-extension", "トライセプスエクステンション"],
	["triceps-pushdown", "トライセプス・プッシュダウン"],
	["triceps-kickback", "トライセプス・キックバック"],
	// Squats
	["front-squat", "フロントスクワット"],
	["back-squat", "バックスクワット"],
	["goblet-squat", "ゴブレットスクワット"],
	["sissy-squat", "シシースクワット"],
	["split-squat", "スプリットスクワット"],
	["squat", "スクワット"],
	// Deadlifts
	["sumo-deadlift", "スモーデッドリフト"],
	["romanian-deadlift", "ルーマニアンデッドリフト"],
	["stiff-leg-deadlift", "スティッフレッグデッドリフト"],
	["deadlift", "デッドリフト"],
	["rack-pull", "ラックプル"],
	// Rows
	["bent-over-row", "ベントオーバーロウ"],
	["upright-row", "アップライトロウ"],
	["cable-row", "ケーブルロウ"],
	["t-bar-row", "Tバーロウ"],
	["pendlay-row", "ペンドレーロウ"],
	["one-arm-row", "ワンアームロウ"],
	["row", "ロウ"],
	// Pull-ups / Chin-ups
	["pull-up", "懸垂"],
	["pull-ups", "懸垂"],
	["chin-up", "チンアップ"],
	["chin-ups", "チンアップ"],
	["muscle-up", "マッスルアップ"],
	["lat-pulldown", "ラットプルダウン"],
	["pulldown", "プルダウン"],
	// Curls
	["hammer-curl", "ハンマーカール"],
	["hammer-curls", "ハンマーカール"],
	["preacher-curl", "プリーチャーカール"],
	["concentration-curl", "コンセントレーションカール"],
	["spider-curl", "スパイダーカール"],
	["drag-curl", "ドラッグカール"],
	["reverse-curl", "リバースカール"],
	["zottman-curl", "ゾットマンカール"],
	["wrist-curl", "リストカール"],
	["biceps-curl", "バイセプスカール"],
	["bicep-curl", "バイセプスカール"],
	["curl", "カール"],
	// Flyes
	["chest-fly", "チェストフライ"],
	["reverse-fly", "リバースフライ"],
	["fly", "フライ"],
	["flye", "フライ"],
	// Raises
	["lateral-raise", "サイドレイズ"],
	["front-raise", "フロントレイズ"],
	["rear-delt-raise", "リアレイズ"],
	["calf-raise", "カーフレイズ"],
	["leg-raise", "レッグレイズ"],
	["raise", "レイズ"],
	// Dips
	["chest-dip", "チェストディップ"],
	["triceps-dip", "トライセプスディップ"],
	["dip", "ディップ"],
	["dips", "ディップス"],
	// Push-ups
	["push-up", "腕立て伏せ"],
	["push-ups", "腕立て伏せ"],
	// Lunges
	["walking-lunge", "ウォーキングランジ"],
	["reverse-lunge", "リバースランジ"],
	["lunge", "ランジ"],
	["lunges", "ランジ"],
	// Hip thrust / bridge
	["hip-thrust", "ヒップスラスト"],
	["glute-bridge", "グルートブリッジ"],
	// Plank
	["side-plank", "サイドプランク"],
	["plank", "プランク"],
	// Crunch / Sit-up
	["russian-twist", "ロシアンツイスト"],
	["bicycle-crunch", "バイシクルクランチ"],
	["crunch", "クランチ"],
	["sit-up", "シットアップ"],
	["v-up", "Vアップ"],
	// Leg work
	["leg-press", "レッグプレス"],
	["leg-extension", "レッグエクステンション"],
	["leg-curl", "レッグカール"],
	["hip-abduction", "ヒップアブダクション"],
	["hip-adduction", "ヒップアダクション"],
	["step-up", "ステップアップ"],
	// Olympic
	["clean-and-press", "クリーン&プレス"],
	["power-clean", "パワークリーン"],
	["hang-clean", "ハングクリーン"],
	["clean", "クリーン"],
	["snatch", "スナッチ"],
	["thruster", "スラスター"],
	// Back
	["hyperextension", "バックエクステンション"],
	["back-extension", "バックエクステンション"],
	["good-morning", "グッドモーニング"],
	["pullover", "プルオーバー"],
	["face-pull", "フェイスプル"],
	["shrug", "シュラッグ"],
	// Cardio / plyo
	["burpee", "バーピー"],
	["mountain-climber", "マウンテンクライマー"],
	["box-jump", "ボックスジャンプ"],
	["jump-rope", "縄跳び"],
	["jumping-jack", "ジャンピングジャック"],
	["high-knee", "ハイニー"],
	// Kettlebell specifics
	["kettlebell-swing", "ケトルベルスイング"],
	["turkish-get-up", "ターキッシュゲットアップ"],
	["windmill", "ウィンドミル"],
	// Stretches
	["stretch", "ストレッチ"],
	["stretching", "ストレッチ"],
	// Generic
	["press", "プレス"],
	["extension", "エクステンション"],
	["raises", "レイズ"],
];

// ─────────────────────────────────────────────────────────────
// VARIANTS
// ─────────────────────────────────────────────────────────────
const VARIANTS = {
	hammer: "ハンマー",
	preacher: "プリーチャー",
	concentration: "コンセントレーション",
	spider: "スパイダー",
	drag: "ドラッグ",
	reverse: "リバース",
	zottman: "ゾットマン",
	incline: "インクライン",
	decline: "デクライン",
	overhead: "オーバーヘッド",
	arnold: "アーノルド",
	bradford: "ブラッドフォード",
	scott: "スコット",
	cuban: "キューバン",
	pendlay: "ペンドレー",
	hindu: "ヒンドゥー",
	sumo: "スモー",
	bulgarian: "ブルガリアン",
	romanian: "ルーマニアン",
	goblet: "ゴブレット",
	pistol: "ピストル",
	sissy: "シシー",
	superman: "スーパーマン",
	russian: "ロシアン",
	nordic: "ノルディック",
	french: "フレンチ",
};

// ─────────────────────────────────────────────────────────────
// EQUIPMENT
// ─────────────────────────────────────────────────────────────
const EQUIPMENT = {
	barbell: "バーベル",
	dumbbell: "ダンベル",
	dumbbells: "ダンベル",
	cable: "ケーブル",
	cables: "ケーブル",
	machine: "マシン",
	smith: "スミスマシン",
	"ez-bar": "EZバー",
	"ez-barbell": "EZバー",
	kettlebell: "ケトルベル",
	kettlebells: "ケトルベル",
	lever: "マシン",
	bodyweight: "自重",
	band: "バンド",
	bands: "バンド",
	"resistance-band": "レジスタンスバンド",
	rope: "ロープ",
	"v-bar": "Vバー",
	"straight-bar": "ストレートバー",
	"medicine-ball": "メディシンボール",
	"exercise-ball": "バランスボール",
	"stability-ball": "バランスボール",
	"swiss-ball": "バランスボール",
	"bosu-ball": "BOSUボール",
	sled: "スレッド",
	landmine: "ランドマイン",
	"trap-bar": "トラップバー",
};

// ─────────────────────────────────────────────────────────────
// POSTURE
// ─────────────────────────────────────────────────────────────
const POSTURE = {
	standing: "スタンディング",
	seated: "シーテッド",
	sitting: "シーテッド",
	lying: "ライイング",
	"side-lying": "サイドライイング",
	kneeling: "ニーリング",
	prone: "うつ伏せ",
	supine: "仰向け",
	incline: "インクライン",
	decline: "デクライン",
	flat: "フラット",
	side: "サイド",
	hanging: "ハンギング",
};

// ─────────────────────────────────────────────────────────────
// GRIPS
// ─────────────────────────────────────────────────────────────
const GRIPS = {
	"close-grip": "ナローグリップ",
	"wide-grip": "ワイドグリップ",
	"narrow-grip": "ナローグリップ",
	"medium-grip": "ミディアムグリップ",
	"reverse-grip": "リバースグリップ",
	"neutral-grip": "ニュートラルグリップ",
	"hammer-grip": "ハンマーグリップ",
	"underhand-grip": "アンダーハンドグリップ",
	"overhand-grip": "オーバーハンドグリップ",
	"supinated-grip": "スピネイテッドグリップ",
	"pronated-grip": "プロネイテッドグリップ",
	"mixed-grip": "オルタネイトグリップ",
};

// ─────────────────────────────────────────────────────────────
// MODIFIERS
// ─────────────────────────────────────────────────────────────
const MODIFIERS = {
	"one-arm": "ワンアーム",
	"two-arm": "ツーアーム",
	"single-arm": "ワンアーム",
	"single-leg": "ワンレッグ",
	"one-leg": "ワンレッグ",
	alternating: "オルタネイト",
	alternate: "オルタネイト",
	weighted: "加重",
	assisted: "アシスト",
	"bent-over": "ベントオーバー",
	"bent-knee": "膝曲げ",
	"straight-leg": "ストレートレッグ",
	"straight-arm": "ストレートアーム",
	"stiff-leg": "スティッフレッグ",
	"legs-up": "レッグアップ",
	"feet-elevated": "足上げ",
	twisting: "ツイスト",
	"cross-body": "クロスボディ",
	"full-range": "フルレンジ",
	"with-rope": "ロープ",
	suspended: "サスペンション",
	wide: "ワイド",
	narrow: "ナロー",
	high: "ハイ",
	low: "ロー",
	front: "フロント",
	rear: "リア",
};

// ─────────────────────────────────────────────────────────────
// EXTRA WORDS
// ─────────────────────────────────────────────────────────────
const EXTRA_WORDS = {
	chest: "チェスト",
	back: "バック",
	shoulder: "ショルダー",
	shoulders: "ショルダー",
	arm: "アーム",
	arms: "アーム",
	leg: "レッグ",
	legs: "レッグ",
	hip: "ヒップ",
	hips: "ヒップ",
	knee: "ニー",
	ankle: "アンクル",
	wrist: "リスト",
	elbow: "エルボー",
	neck: "ネック",
	spine: "スパイン",
	core: "コア",
	abs: "アブ",
	glute: "グルート",
	glutes: "グルート",
	quad: "クワッド",
	quads: "クワッド",
	hamstring: "ハムストリング",
	hamstrings: "ハムストリング",
	calf: "カーフ",
	calves: "カーフ",
	biceps: "バイセプス",
	triceps: "トライセプス",
	forearm: "前腕",
	forearms: "前腕",
	lats: "ラット",
	traps: "トラップ",
	delts: "デルト",
	ball: "ボール",
	bench: "ベンチ",
	floor: "フロア",
	wall: "ウォール",
	box: "ボックス",
	step: "ステップ",
	rope: "ロープ",
	bar: "バー",
	grip: "グリップ",
	roller: "ローラー",
	wheel: "ホイール",
	kick: "キック",
	twist: "ツイスト",
	rotation: "ローテーション",
	push: "プッシュ",
	pull: "プル",
	hold: "ホールド",
	squat: "スクワット",
	deadlift: "デッドリフト",

	// ─── MISSING TOKENS FIX ───
	bridge: "ブリッジ",
	hack: "ハック",
	curls: "カール",
	face: "フェイス",
	ring: "リング",
	rings: "リング",
	split: "スプリット",
	dips: "ディップス",
	jefferson: "ジェファーソン",
	bradford: "ブラッドフォード",
	arnold: "アーノルド",
	scott: "スコット",
	zottman: "ゾットマン",
	sissy: "シシー",
	bosu: "BOSU",
	rocky: "ロッキー",
	pendlay: "ペンドレー",
	l: "L",
	t: "T",
	w: "W",
	y: "Y",
	clean: "クリーン",
	pullover: "プルオーバー",

	// ─── AUTO-GENERATED TRANSLATIONS ───
	hand: "ハンド",
	hands: "ハンド",
	legged: "レッグ",
	knees: "ニー",
	toe: "トゥ",
	heel: "ヒール",
	head: "ヘッド",
	chin: "チン",
	feet: "フィート",
	ankles: "アンクル",
	finger: "フィンガー",
	palm: "パーム",
	palms: "パーム",
	butt: "ヒップ",
	groin: "股関節",
	gluteus: "グルート",
	pec: "大胸筋",
	pectoralis: "大胸筋",
	delt: "デルト",
	deltoid: "デルト",
	bicep: "バイセプス",
	tricep: "トライセプス",
	lat: "ラット",
	trap: "トラップ",
	oblique: "オブリーク",
	ham: "ハムストリング",
	femoral: "大腿",
	femoris: "大腿",
	rectus: "レクタス",
	tibialis: "前脛骨筋",
	peroneals: "腓骨筋",
	piriformis: "梨状筋",
	abductor: "外転筋",
	adductor: "内転筋",
	abduction: "外転",
	adduction: "内転",
	flexor: "屈筋",
	retractor: "リトラクター",
	scapula: "肩甲骨",
	scapular: "肩甲",
	posterior: "リア",
	forward: "フォワード",
	backward: "バックワード",
	lateral: "ラテラル",
	behind: "ビハインド",
	above: "上",
	across: "クロス",
	inner: "インナー",
	outer: "アウター",
	inside: "内側",
	outside: "外側",
	upper: "アッパー",
	lower: "ロワー",
	middle: "ミドル",
	left: "左",
	vertical: "バーティカル",
	horizontal: "ホリゾンタル",
	parallel: "パラレル",
	diagonal: "ダイアゴナル",
	upright: "アップライト",
	upward: "上向き",
	jump: "ジャンプ",
	jumps: "ジャンプ",
	run: "ラン",
	walk: "ウォーク",
	walking: "ウォーキング",
	climb: "クライム",
	crawl: "クロール",
	throw: "スロー",
	catch: "キャッチ",
	touch: "タッチ",
	lift: "リフト",
	lifting: "リフティング",
	drive: "ドライブ",
	slide: "スライド",
	sprint: "スプリント",
	sprints: "スプリント",
	carry: "キャリー",
	drag: "ドラッグ",
	hops: "ホップ",
	march: "マーチ",
	squeeze: "スクイーズ",
	raise: "レイズ",
	raises: "レイズ",
	raised: "レイズド",
	rotate: "ローテーション",
	rotational: "回旋",
	rotary: "ロータリー",
	flexion: "フレクション",
	extension: "エクステンション",
	bend: "ベンド",
	bends: "ベンド",
	bent: "ベント",
	pass: "パス",
	circles: "サークル",
	circular: "サーキュラー",
	kicks: "キック",
	drop: "ドロップ",
	flip: "フリップ",
	tilt: "ティルト",
	reach: "リーチ",
	release: "リリース",
	tap: "タップ",
	planche: "プランシェ",
	isometric: "アイソメトリック",
	plyo: "プライオ",
	dynamic: "ダイナミック",
	ballistic: "バリスティック",
	negative: "ネガティブ",
	smith: "スミス",
	kettlebell: "ケトルベル",
	ez: "EZバー",
	medicine: "メディシン",
	stability: "スタビリティ",
	resistance: "レジスタンス",
	towel: "タオル",
	bars: "バー",
	attachment: "アタッチメント",
	pad: "パッド",
	platform: "プラットフォーム",
	cage: "ケージ",
	board: "ボード",
	tire: "タイヤ",
	strap: "ストラップ",
	straps: "ストラップ",
	ropes: "ロープ",
	handle: "ハンドル",
	pulley: "プーリー",
	landmine: "ランドマイン",
	pin: "ピン",
	stirrups: "スターラップ",
	trainer: "トレーナー",
	treadmill: "トレッドミル",
	elliptical: "エリプティカル",
	ergometer: "エルゴメーター",
	stepmill: "ステップミル",
	staircase: "ステアケース",
	gripper: "グリッパー",
	iron: "アイアン",
	one: "ワン",
	two: "ツー",
	single: "シングル",
	double: "ダブル",
	half: "ハーフ",
	full: "フル",
	deep: "ディープ",
	wide: "ワイド",
	narrow: "ナロー",
	short: "ショート",
	high: "ハイ",
	low: "ロー",
	quick: "クイック",
	slow: "スロー",
	reverse: "リバース",
	reversed: "リバース",
	revers: "リバース",
	inverted: "インバーテッド",
	inverse: "インバース",
	modified: "モディファイド",
	advanced: "アドバンスド",
	basic: "ベーシック",
	extended: "エクステンデッド",
	elevated: "エレベーテッド",
	supported: "サポーテッド",
	support: "サポート",
	fixed: "固定",
	stationary: "ステーショナリー",
	cross: "クロス",
	crossover: "クロスオーバー",
	crossovers: "クロスオーバー",
	over: "オーバー",
	down: "ダウン",
	up: "アップ",
	ups: "アップ",
	out: "アウト",
	off: "オフ",
	sit: "シット",
	anti: "アンチ",
	russian: "ロシアン",
	military: "ミリタリー",
	hammer: "ハンマー",
	spider: "スパイダー",
	preacher: "プリーチャー",
	concentration: "コンセントレーション",
	sumo: "スモウ",
	hindu: "ヒンドゥー",
	turkish: "ターキッシュ",
	korean: "コリアン",
	cossack: "コサック",
	zercher: "ゼルチャー",
	gironda: "ジロンダ",
	janda: "ヤンダ",
	thibaudeau: "ティボドー",
	donkey: "ドンキー",
	pushdown: "プッシュダウン",
	kickback: "キックバック",
	kickbacks: "キックバック",
	hyperextension: "ハイパーエクステンション",
	rollout: "ロールアウト",
	rollerout: "ロールアウト",
	blaster: "ブラスター",
	windmill: "ウィンドミル",
	superman: "スーパーマン",
	inchworm: "インチワーム",
	lunge: "ランジ",
	pike: "パイク",
	tuck: "タック",
	flag: "フラッグ",
	handstand: "ハンドスタンド",
	elevator: "エレベーター",
	sphinx: "スフィンクス",
	cocoons: "コクーン",
	bike: "バイク",
	cycle: "サイクル",
	air: "エアー",
	exercise: "エクササイズ",
	motion: "モーション",
	stance: "スタンス",
	position: "ポジション",
	pose: "ポーズ",
	stretch: "ストレッチ",
	straight: "ストレート",
	angle: "アングル",
	angled: "アングルド",
	power: "パワー",
	speed: "スピード",
	hang: "ハング",
	dead: "デッド",
	bug: "バグ",
	star: "スター",
	frog: "フロッグ",
	cat: "キャット",
	dog: "ドッグ",
	cobra: "コブラ",
	bear: "ベアー",
	gorilla: "ゴリラ",
	crab: "クラブ",
	butterfly: "バタフライ",
	swimmer: "スイマー",
	skater: "スケーター",
	archer: "アーチャー",
	jerk: "ジャーク",
	against: "アゲインスト",
	through: "スルー",
	around: "アラウンド",
	apart: "アパート",
	chair: "チェア",
	ground: "グラウンド",
	figure: "フィギュア",
	reps: "レップ",
	jack: "ジャック",
	slam: "スラム",
	ab: "アブ",
	abdominal: "腹筋",
	astride: "またがり",
	balance: "バランス",
	battling: "バトル",
	benches: "ベンチ",
	big: "ビッグ",
	body: "ボディ",
	bottoms: "ボトム",
	bowling: "ボウリング",
	boxing: "ボクシング",
	breeding: "ブリーディング",
	cambered: "キャンバー",
	captains: "キャプテン",
	caster: "キャスター",
	clap: "クラップ",
	clasped: "クラスプ",
	clock: "クロック",
	closer: "クローサー",
	contralateral: "対側",
	crunches: "クランチ",
	crusher: "クラッシャー",
	curtsey: "カーテシー",
	degrees: "度",
	depresor: "デプレッサー",
	depth: "デプス",
	diamond: "ダイヤモンド",
	equipment: "器具",
	external: "エクスターナル",
	facing: "フェイシング",
	fallout: "フォールアウト",
	farmers: "ファーマーズ",
	flutter: "フラッター",
	flyes: "フライ",
	forth: "フォース",
	fours: "フォア",
	frankenstein: "フランケンシュタイン",
	gravity: "グラビティ",
	greatest: "グレーテスト",
	gripless: "グリップレス",
	guillotine: "ギロチン",
	hook: "フック",
	hug: "ハグ",
	hyght: "ハイト",
	hyper: "ハイパー",
	impossible: "インポッシブル",
	intermediate: "中級",
	internal: "インターナル",
	jackknife: "ジャックナイフ",
	jm: "JM",
	judo: "柔道",
	kayak: "カヤック",
	keens: "ニー",
	kipping: "キッピング",
	knife: "ナイフ",
	lean: "リーン",
	lying: "ライイング",
	machine: "マシン",
	major: "メジャー",
	maltese: "マルティーズ",
	monster: "モンスター",
	multiple: "マルチ",
	neutral: "ニュートラル",
	olympic: "オリンピック",
	otis: "オーティス",
	outstretched: "伸ばした",
	overhand: "オーバーハンド",
	pallof: "パロフ",
	peacher: "プリーチャー",
	pelvic: "骨盤",
	pirate: "パイレーツ",
	pistol: "ピストル",
	point: "ポイント",
	potty: "ポッティ",
	presses: "プレス",
	prisoner: "プリズナー",
	pronate: "プロネート",
	pronated: "プロネーテッド",
	pronation: "プロネーション",
	pulldown: "プルダウン",
	pyramid: "ピラミッド",
	quarter: "クォーター",
	range: "レンジ",
	reclining: "リクライニング",
	renegade: "レネゲード",
	response: "レスポンス",
	rocking: "ロッキング",
	rocky: "ロッキー",
	rollerer: "ローラー",
	round: "ラウンド",
	row: "ロウ",
	runners: "ランナー",
	saw: "ソー",
	scissor: "シザー",
	seesaw: "シーソー",
	semi: "セミ",
	sequence: "シーケンス",
	side: "サイド",
	sitted: "座位",
	ski: "スキー",
	skier: "スキーヤー",
	skin: "スキン",
	skull: "スカル",
	skullcrusher: "スカルクラッシャー",
	sledge: "スレッジ",
	slingers: "スリンガー",
	spell: "スペル",
	squad: "スクワッド",
	squats: "スクワット",
	squatting: "スクワッティング",
	stabilization: "スタビライゼーション",
	stalder: "シュタルダー",
	stepbox: "ステップボックス",
	sternum: "胸骨",
	stork: "コウノトリ",
	straddle: "ストラドル",
	stride: "ストライド",
	style: "スタイル",
	supinated: "スピネーテッド",
	supination: "スピネーション",
	supper: "サパー",
	svend: "スベンド",
	sz: "EZ",
	tate: "テイト",
	tennis: "テニス",
	three: "スリー",
	thrusts: "スラスト",
	touchers: "タッチャー",
	twin: "ツイン",
	twisted: "ツイスト",
	twists: "ツイスト",
	under: "アンダー",
	underhand: "アンダーハンド",
	unilateral: "ユニラテラル",
	variation: "バリエーション",
	waiter: "ウェイター",
	wind: "ウインド",
	wipers: "ワイパー",
	world: "ワールド",
	yoga: "ヨガ",
	curl: "カール",
	press: "プレス",
	swing: "スイング",
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
// COMPOSITION (Japanese: uses ・ (nakaguro) as separator)
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

	// Japanese composition: EQUIPMENT・POSTURE・GRIP・MODIFIERS・VARIANT・MOVEMENT
	// Uses nakaguro (・) as word separator (standard in Japanese fitness)
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

	if (movement && leftover.length) {
		parts.push(...leftover);
	}

	// Deduplicate parts
	const seen = new Set();
	const deduped = [];
	for (const p of parts) {
		if (!p || seen.has(p)) continue;
		seen.add(p);
		deduped.push(p);
	}

	let result = deduped.join("・");
	if (!result) result = slug;

	return result;
}

module.exports = { translateSlug };
