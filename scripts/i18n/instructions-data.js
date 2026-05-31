/**
 * Multi-language instruction data for DE, FR, ZH, PT, JA.
 *
 * Provides equipment setup cues, posture/grip/laterality cues,
 * breathing cues, muscle names, and pattern translations for each language.
 */

// ─────────────────────────────────────────────────────────────
// EQUIPMENT SETUP
// ─────────────────────────────────────────────────────────────

const EQUIP_SETUP = {
	de: {
		barbell: "Lade die Langhantel mit angemessenem Gewicht. Greife die Stange fest und stelle die Füße schulterbreit auf.",
		dumbbell: "Wähle das passende Kurzhantel-Gewicht. Greife fest zu und positioniere dich mit stabiler Basis.",
		cable: "Befestige den passenden Griff, stelle die Umlenkrolle auf die richtige Höhe und wähle das Arbeitsgewicht.",
		machine: "Stelle Sitz, Polster und Bewegungsumfang passend für deinen Körper ein. Wähle das Gewicht.",
		lever: "Stelle Sitz, Polster und Bewegungsumfang passend für deinen Körper ein. Wähle das Gewicht.",
		smith: "Stelle die Stangenhöhe an der Smith-Maschine ein und lade das passende Gewicht. Positioniere dich unter der Stange.",
		"ez-bar": "Lade die SZ-Stange und greife sie am gewinkelten Abschnitt, der für deine Handgelenke bequem ist.",
		kettlebell: "Wähle das passende Kettlebell-Gewicht. Greife den Griff fest mit neutralem Handgelenk.",
		band: "Befestige das Widerstandsband am richtigen Ankerpunkt und stelle sicher, dass Grundspannung vorhanden ist.",
		sled: "Belade den Schlitten mit angemessenem Gewicht und greife die Griffe fest.",
		bodyweight: "Positioniere deinen Körper mit korrekter Ausrichtung — Ohren über Schultern, Schultern über Hüften.",
		other: "Bereite dein Equipment vor und nimm eine stabile Ausgangsposition mit guter Haltung ein.",
	},
	fr: {
		barbell: "Charge la barre avec un poids approprié. Saisis-la fermement et place tes pieds à largeur d'épaules.",
		dumbbell: "Choisis le bon poids d'haltères. Saisis fermement et place-toi avec une base stable.",
		cable: "Fixe la poignée appropriée, règle la hauteur de la poulie et sélectionne ton poids de travail.",
		machine: "Ajuste le siège, les coussins et l'amplitude de mouvement à ton corps. Sélectionne la charge.",
		lever: "Ajuste le siège, les coussins et l'amplitude de mouvement à ton corps. Sélectionne la charge.",
		smith: "Règle la hauteur de la barre au Smith et charge le poids approprié. Place-toi sous la barre.",
		"ez-bar": "Charge la barre EZ et saisis-la à la partie coudée qui convient à tes poignets.",
		kettlebell: "Choisis le bon poids de kettlebell. Saisis la poignée fermement avec le poignet neutre.",
		band: "Fixe l'élastique au bon point d'ancrage et assure-toi qu'il y a une tension initiale.",
		sled: "Charge le traîneau avec un poids approprié et saisis les poignées fermement.",
		bodyweight: "Place ton corps avec un bon alignement — oreilles au-dessus des épaules, épaules au-dessus des hanches.",
		other: "Prépare ton matériel et adopte une position de départ stable avec une bonne posture.",
	},
	zh: {
		barbell: "给杠铃装上合适的重量。双手紧握杠铃，双脚与肩同宽站立。",
		dumbbell: "选择合适重量的哑铃。紧握哑铃，以稳定的姿势站好。",
		cable: "安装合适的把手，调整滑轮高度，选择工作重量。",
		machine: "调整座椅、垫板和运动范围以适合你的身体。选择负荷。",
		lever: "调整座椅、垫板和运动范围以适合你的身体。选择负荷。",
		smith: "在史密斯机上设置杠铃高度并装上合适的重量。将身体置于杠铃下方。",
		"ez-bar": "给曲杆装上合适的重量，握住让手腕舒适的弯曲部分。",
		kettlebell: "选择合适重量的壶铃。紧握壶铃把手，保持手腕中立。",
		band: "将弹力带固定在正确的锚点，确保有初始张力。",
		sled: "给雪橇装上合适的重量，紧握把手。",
		bodyweight: "以正确的身体排列就位——耳朵在肩膀上方，肩膀在髋部上方。",
		other: "准备好器材，以良好的姿势采取稳定的起始位置。",
	},
	pt: {
		barbell: "Carregue a barra com o peso adequado. Segure com firmeza e posicione os pés na largura dos ombros.",
		dumbbell: "Escolha o peso adequado do halter. Segure com firmeza e posicione-se com uma base estável.",
		cable: "Coloque a pegada adequada, ajuste a altura da polia e selecione o peso de trabalho.",
		machine: "Ajuste o assento, almofadas e amplitude de movimento ao seu corpo. Selecione a carga.",
		lever: "Ajuste o assento, almofadas e amplitude de movimento ao seu corpo. Selecione a carga.",
		smith: "Ajuste a altura da barra no Smith e carregue o peso adequado. Posicione-se sob a barra.",
		"ez-bar": "Carregue a barra W e segure-a na parte angular que for confortável para seus punhos.",
		kettlebell: "Escolha o peso adequado do kettlebell. Segure a alça com firmeza e punho neutro.",
		band: "Fixe a faixa elástica no ponto de ancoragem correto e certifique-se de que há tensão inicial.",
		sled: "Carregue o trenó com peso adequado e segure as alças com firmeza.",
		bodyweight: "Posicione seu corpo com alinhamento correto — orelhas sobre ombros, ombros sobre quadris.",
		other: "Prepare seu equipamento e adote uma posição inicial estável com boa postura.",
	},
	ja: {
		barbell: "バーベルに適切な重量をセットします。バーをしっかり握り、足を肩幅に開いて立ちます。",
		dumbbell: "適切な重量のダンベルを選びます。しっかり握り、安定した姿勢をとります。",
		cable: "適切なアタッチメントを取り付け、プーリーの高さを設定し、重量を選択します。",
		machine: "シート、パッド、可動域を自分の体に合わせて調整します。負荷を選択します。",
		lever: "シート、パッド、可動域を自分の体に合わせて調整します。負荷を選択します。",
		smith: "スミスマシンのバーの高さを設定し、適切な重量をセットします。バーの下にポジションを取ります。",
		"ez-bar": "EZバーに重量をセットし、手首が楽な角度の部分を握ります。",
		kettlebell: "適切な重量のケトルベルを選びます。ハンドルをしっかり握り、手首をニュートラルに保ちます。",
		band: "レジスタンスバンドを正しいアンカーポイントに固定し、初期テンションがあることを確認します。",
		sled: "スレッドに適切な重量をセットし、ハンドルをしっかり握ります。",
		bodyweight: "正しいアライメントで体を配置します——耳は肩の上、肩は腰の上。",
		other: "器具を準備し、良い姿勢で安定したスタートポジションをとります。",
	},
};

// ─────────────────────────────────────────────────────────────
// POSTURE CUES
// ─────────────────────────────────────────────────────────────

const POSTURE_CUES = {
	de: {
		seated: "Sitze aufrecht mit geradem Rücken und den Füßen flach auf dem Boden.",
		kneeling: "Knie mit den Hüften direkt über den Knien, Oberkörper aufrecht.",
		incline: "Stelle die Bank auf die angegebene Neigung ein und drücke deinen Rücken fest gegen das Polster.",
		decline: "Stelle die Bank auf Negativ-Neigung ein und fixiere deine Füße unter den Polstern.",
		lying: "Lege dich mit flachem Rücken auf die Fläche, Rumpf angespannt.",
	},
	fr: {
		seated: "Assieds-toi droit, dos plat et pieds à plat au sol.",
		kneeling: "À genoux, hanches empilées au-dessus des genoux, torse droit.",
		incline: "Règle le banc à l'inclinaison indiquée et presse fermement ton dos contre le dossier.",
		decline: "Règle le banc en décliné et bloque tes pieds sous les coussins.",
		lying: "Allonge-toi avec le dos à plat contre la surface, gainage engagé.",
	},
	zh: {
		seated: "挺直坐好，背部挺直，双脚平放在地面。",
		kneeling: "跪姿，髋部直接在膝盖上方，躯干挺直。",
		incline: "将凳子调整到指定的倾斜角度，背部紧贴靠垫。",
		decline: "将凳子调整到下斜角度，双脚固定在脚垫下。",
		lying: "仰卧，背部平贴在表面上，核心收紧。",
	},
	pt: {
		seated: "Sente-se ereto com as costas retas e os pés apoiados no chão.",
		kneeling: "Ajoelhe-se com os quadris diretamente sobre os joelhos, tronco ereto.",
		incline: "Ajuste o banco na inclinação indicada e pressione as costas firmemente contra o encosto.",
		decline: "Ajuste o banco em declínio e prenda os pés sob as almofadas.",
		lying: "Deite-se com as costas retas contra a superfície, core ativado.",
	},
	ja: {
		seated: "背筋を伸ばして座り、足を床に平らに置きます。",
		kneeling: "膝を立て、腰を膝の真上に位置させ、上体を直立に保ちます。",
		incline: "ベンチを指定の角度に設定し、背中をパッドにしっかり押し付けます。",
		decline: "ベンチをデクラインに設定し、足をパッドの下に固定します。",
		lying: "背中を平らに表面に付けて横になり、コアを引き締めます。",
	},
};

// ─────────────────────────────────────────────────────────────
// GRIP CUES
// ─────────────────────────────────────────────────────────────

const GRIP_CUES = {
	de: {
		close: "Verwende einen engen Griff, Hände etwa 15 cm auseinander, um den Fokus nach innen zu verlagern.",
		wide: "Verwende einen weiten Griff, Hände deutlich über Schulterbreite, für mehr Dehnung und äußere Betonung.",
		reverse: "Verwende einen Untergriff (supiniert), um den Zugwinkel und die Muskelbetonung zu verändern.",
		neutral: "Verwende einen Neutralgriff (Handflächen zueinander), der gelenkschonender ist und den Fokus verlagert.",
	},
	fr: {
		close: "Utilise une prise serrée, mains à environ 15 cm d'écart, pour accentuer la partie interne.",
		wide: "Prends une prise large, mains bien au-delà de la largeur des épaules, pour plus d'étirement et d'accent externe.",
		reverse: "Utilise une prise supination pour changer l'angle de traction et l'accent musculaire.",
		neutral: "Utilise une prise neutre (paumes face à face), plus douce pour les articulations et changeant l'accent.",
	},
	zh: {
		close: "使用窄握，双手间距约15厘米，将重点转向内侧。",
		wide: "使用宽握，双手远超肩宽，增加拉伸和外侧刺激。",
		reverse: "使用反握（旋后握），改变拉力角度和肌肉刺激重点。",
		neutral: "使用对握（掌心相对），对关节更友好，并改变刺激重点。",
	},
	pt: {
		close: "Use pegada fechada, mãos a cerca de 15 cm de distância, para enfatizar a parte interna.",
		wide: "Use pegada aberta, mãos bem além da largura dos ombros, para maior alongamento e ênfase externa.",
		reverse: "Use pegada supinada para mudar o ângulo de tração e a ênfase muscular.",
		neutral: "Use pegada neutra (palmas voltadas uma para a outra), mais confortável para as articulações.",
	},
	ja: {
		close: "ナローグリップを使い、手の間隔を約15cmにして内側への刺激を高めます。",
		wide: "ワイドグリップを使い、肩幅よりかなり広く握って、ストレッチと外側への刺激を高めます。",
		reverse: "アンダーハンド（スピネイテッド）グリップを使い、引く角度と筋肉への刺激を変えます。",
		neutral: "ニュートラルグリップ（手のひらを向かい合わせ）を使い、関節に優しく刺激を変えます。",
	},
};

// ─────────────────────────────────────────────────────────────
// LATERALITY CUES
// ─────────────────────────────────────────────────────────────

const LATERALITY_CUES = {
	de: {
		unilateral: "Arbeite eine Seite nach der anderen. Alle Wiederholungen auf einer Seite abschließen, dann wechseln. Die schwächere Seite gibt die Wiederholungszahl vor.",
		alternating: "Wechsle jede Wiederholung die Seite ab. Schließe eine komplette Wiederholung ab, bevor du die andere Seite beginnst.",
	},
	fr: {
		unilateral: "Travaille un côté à la fois. Complète toutes les reps d'un côté avant de changer. Aligne-toi sur le côté le plus faible.",
		alternating: "Alterne les côtés à chaque rep. Termine une rep complète avant de passer à l'autre côté.",
	},
	zh: {
		unilateral: "一次训练一侧。完成一侧所有次数后再换边。以较弱一侧的次数为准。",
		alternating: "每次交替两侧。完成一侧完整的一次后再做另一侧。",
	},
	pt: {
		unilateral: "Trabalhe um lado de cada vez. Complete todas as repetições de um lado antes de trocar. Iguale as repetições ao lado mais fraco.",
		alternating: "Alterne os lados a cada repetição. Complete uma rep inteira antes de passar para o outro lado.",
	},
	ja: {
		unilateral: "片側ずつトレーニングします。片側のレップを全て完了してから反対側に移ります。弱い側のレップ数に合わせます。",
		alternating: "各レップで左右を交互に行います。片側の完全なレップを終えてから反対側を始めます。",
	},
};

// ─────────────────────────────────────────────────────────────
// BREATHING CUES
// ─────────────────────────────────────────────────────────────

const BREATHING = {
	de: {
		strength: "Atmung: Ausatmen in der Anstrengungsphase, Einatmen beim Zurückführen. Bei schweren Grundübungen einen tiefen Bauchatem nehmen und durch den schwersten Teil halten.",
		stretching: "Atme tief und gleichmäßig während der gesamten Haltephase. Halte niemals die Luft an beim Dehnen.",
		plyometrics: "Atmung: Scharf ausatmen beim Sprung oder explosiven Einsatz. Einatmen während der Ladephase.",
		cardio: "Atme rhythmisch — durch die Nase ein und durch den Mund aus, angepasst an dein Tempo.",
	},
	fr: {
		strength: "Respiration : expire pendant l'effort, inspire au retour. Pour les mouvements lourds composés, prends une grande inspiration abdominale et maintiens pendant la phase la plus dure.",
		stretching: "Respire profondément et régulièrement tout au long du maintien. Ne retiens jamais ta respiration pendant les étirements.",
		plyometrics: "Respiration : expire fortement lors du saut ou de l'effort explosif. Inspire pendant la phase de chargement.",
		cardio: "Respire de manière rythmique — inspire par le nez et expire par la bouche, en suivant ton rythme.",
	},
	zh: {
		strength: "呼吸：发力时呼气，回程时吸气。进行大重量复合动作时，深吸一口气到腹部，在最难的部分保持住。",
		stretching: "在整个保持阶段深呼吸，保持均匀。拉伸时绝不要憋气。",
		plyometrics: "呼吸：跳跃或爆发性发力时用力呼气。在蓄力阶段吸气。",
		cardio: "有节奏地呼吸——用鼻子吸气，用嘴呼气，配合你的节奏。",
	},
	pt: {
		strength: "Respiração: expire durante o esforço, inspire no retorno. Em movimentos compostos pesados, faça uma grande inspiração abdominal e mantenha durante a parte mais difícil.",
		stretching: "Respire profunda e constantemente durante toda a manutenção. Nunca prenda a respiração durante alongamentos.",
		plyometrics: "Respiração: expire de forma explosiva no salto ou esforço. Inspire durante a fase de carga.",
		cardio: "Respire ritmicamente — inspire pelo nariz e expire pela boca, seguindo seu ritmo.",
	},
	ja: {
		strength: "呼吸：力を入れる局面で息を吐き、戻す局面で吸います。高重量のコンパウンド種目では、腹式で大きく息を吸い込み、最もきつい部分で保持します。",
		stretching: "ホールド中は深く安定した呼吸を続けてください。ストレッチ中は決して息を止めないでください。",
		plyometrics: "呼吸：ジャンプや爆発的な動作で鋭く息を吐きます。力を溜める局面で吸います。",
		cardio: "リズミカルに呼吸します——鼻から吸い、口から吐き、ペースに合わせます。",
	},
};

// ─────────────────────────────────────────────────────────────
// MUSCLE NAMES (for fallback instructions)
// ─────────────────────────────────────────────────────────────

const MUSCLE_NAMES = {
	de: {
		abductors: "die Abduktoren",
		abs: "die Bauchmuskeln",
		adductors: "die Adduktoren",
		biceps: "den Bizeps",
		calves: "die Waden",
		cardio: "das Herz-Kreislauf-System",
		delts: "die Schultern",
		forearms: "die Unterarme",
		glutes: "die Gesäßmuskulatur",
		hamstrings: "die Beinbeuger",
		lats: "den Latissimus",
		"levator-scapulae": "den Schulterblattheber",
		pectorals: "die Brustmuskeln",
		quads: "den Quadrizeps",
		"serratus-anterior": "den Serratus anterior",
		spine: "den unteren Rücken",
		traps: "den Trapezius",
		triceps: "den Trizeps",
		"upper-back": "den oberen Rücken",
	},
	fr: {
		abductors: "les abducteurs",
		abs: "les abdominaux",
		adductors: "les adducteurs",
		biceps: "les biceps",
		calves: "les mollets",
		cardio: "le système cardiovasculaire",
		delts: "les épaules",
		forearms: "les avant-bras",
		glutes: "les fessiers",
		hamstrings: "les ischio-jambiers",
		lats: "les dorsaux",
		"levator-scapulae": "l'élévateur de la scapula",
		pectorals: "les pectoraux",
		quads: "les quadriceps",
		"serratus-anterior": "le dentelé antérieur",
		spine: "les lombaires",
		traps: "les trapèzes",
		triceps: "les triceps",
		"upper-back": "le haut du dos",
	},
	zh: {
		abductors: "外展肌",
		abs: "核心肌群",
		adductors: "内收肌",
		biceps: "二头肌",
		calves: "小腿肌",
		cardio: "心血管系统",
		delts: "三角肌",
		forearms: "前臂",
		glutes: "臀肌",
		hamstrings: "腘绳肌",
		lats: "背阔肌",
		"levator-scapulae": "肩胛提肌",
		pectorals: "胸肌",
		quads: "股四头肌",
		"serratus-anterior": "前锯肌",
		spine: "下背部",
		traps: "斜方肌",
		triceps: "三头肌",
		"upper-back": "上背部",
	},
	pt: {
		abductors: "os abdutores",
		abs: "o core",
		adductors: "os adutores",
		biceps: "os bíceps",
		calves: "as panturrilhas",
		cardio: "o sistema cardiovascular",
		delts: "os ombros",
		forearms: "os antebraços",
		glutes: "os glúteos",
		hamstrings: "os posteriores de coxa",
		lats: "os dorsais",
		"levator-scapulae": "o elevador da escápula",
		pectorals: "o peitoral",
		quads: "os quadríceps",
		"serratus-anterior": "o serrátil anterior",
		spine: "a lombar",
		traps: "os trapézios",
		triceps: "os tríceps",
		"upper-back": "a parte superior das costas",
	},
	ja: {
		abductors: "外転筋",
		abs: "体幹",
		adductors: "内転筋",
		biceps: "上腕二頭筋",
		calves: "ふくらはぎ",
		cardio: "心肺機能",
		delts: "肩",
		forearms: "前腕",
		glutes: "臀筋",
		hamstrings: "ハムストリング",
		lats: "広背筋",
		"levator-scapulae": "肩甲挙筋",
		pectorals: "大胸筋",
		quads: "大腿四頭筋",
		"serratus-anterior": "前鋸筋",
		spine: "脊柱起立筋",
		traps: "僧帽筋",
		triceps: "上腕三頭筋",
		"upper-back": "上背部",
	},
};

// ─────────────────────────────────────────────────────────────
// EQUIPMENT ADAPTATION (bar → dumbbell/kettlebell/band)
// ─────────────────────────────────────────────────────────────

const EQUIP_ADAPT = {
	de: {
		dumbbell: [
			[/\bdie Stange\b/gi, "die Kurzhanteln"],
			[/\bDie Stange\b/g, "Die Kurzhanteln"],
			[/\bder Stange\b/gi, "der Kurzhanteln"],
			[/\b[Ss]tange\b(?! EZ)/g, (m) => m[0] === "S" ? "Gewicht" : "gewicht"],
		],
		kettlebell: [
			[/\bdie Stange\b/gi, "die Kettlebell"],
			[/\bDie Stange\b/g, "Die Kettlebell"],
			[/\bder Stange\b/gi, "der Kettlebell"],
			[/\b[Ss]tange\b(?! EZ)/g, (m) => m[0] === "S" ? "Gewicht" : "gewicht"],
		],
		band: [
			[/\bdie Stange\b/gi, "den Griff"],
			[/\bDie Stange\b/g, "Den Griff"],
			[/\bder Stange\b/gi, "des Griffs"],
			[/\b[Ss]tange\b(?! EZ)/g, (m) => m[0] === "S" ? "Griff" : "griff"],
		],
	},
	fr: {
		dumbbell: [
			[/\bla barre\b/gi, "les haltères"],
			[/\bLa barre\b/g, "Les haltères"],
			[/\bde la barre\b/gi, "des haltères"],
			[/\b[Bb]arre\b(?! EZ)/g, (m) => m[0] === "B" ? "Poids" : "poids"],
		],
		kettlebell: [
			[/\bla barre\b/gi, "le kettlebell"],
			[/\bLa barre\b/g, "Le kettlebell"],
			[/\bde la barre\b/gi, "du kettlebell"],
			[/\b[Bb]arre\b(?! EZ)/g, (m) => m[0] === "B" ? "Poids" : "poids"],
		],
		band: [
			[/\bla barre\b/gi, "la poignée"],
			[/\bLa barre\b/g, "La poignée"],
			[/\bde la barre\b/gi, "de la poignée"],
			[/\b[Bb]arre\b(?! EZ)/g, (m) => m[0] === "B" ? "Poignée" : "poignée"],
		],
	},
	// ZH, PT, JA don't need bar-substitution since their patterns don't reference "bar"
};

// ─────────────────────────────────────────────────────────────
// FALLBACK INSTRUCTIONS
// ─────────────────────────────────────────────────────────────

function buildFallbackStepsMulti(lang, muscle, category) {
	const muscleName = MUSCLE_NAMES[lang]?.[muscle] || muscle;

	const templates = {
		de: {
			stretching: [
				`Bewege deinen Körper langsam in die Dehnposition für ${muscleName}.`,
				"Halte 20 bis 40 Sekunden und atme tief — entspanne dich mit jeder Ausatmung etwas mehr.",
				"Kehre langsam in die Ausgangsposition zurück und wiederhole bei Bedarf.",
			],
			cardio: [
				"Halte ein gleichmäßiges Tempo, angepasst an dein Fitnesslevel.",
				"Halte deinen Rumpf aktiv und eine aufrechte Haltung während der gesamten Übung.",
				"Setze die Übung für die geplante Zeit oder Wiederholungen mit sauberer Technik fort.",
			],
			plyometrics: [
				"Führe eine kurze Beugung aus, um Spannung in den Beinen aufzubauen.",
				"Führe die Bewegung explosiv mit maximaler Absicht aus.",
				"Lande weich, indem du mit Beinen und Rumpf abfederst. Starte die nächste Wiederholung erst wenn du stabil stehst.",
			],
			strength: [
				`Aktiviere ${muscleName} bevor du die Bewegung startest. Spüre die Geist-Muskel-Verbindung.`,
				"Führe die Bewegung mit voller Kontrolle aus und beherrsche sowohl die konzentrische als auch die exzentrische Phase.",
				"Kehre kontrolliert in die Ausgangsposition zurück — die exzentrische Phase baut genauso viel Muskel auf wie der Aufstieg.",
			],
		},
		fr: {
			stretching: [
				`Amène ton corps lentement dans la position d'étirement pour ${muscleName}.`,
				"Maintiens 20 à 40 secondes en respirant profondément — relâche-toi un peu plus à chaque expiration.",
				"Reviens lentement à la position de départ et répète si souhaité.",
			],
			cardio: [
				"Maintiens un rythme régulier adapté à ton niveau de forme.",
				"Engage ton gainage et garde une posture droite tout au long de l'exercice.",
				"Continue pendant le temps ou les répétitions prévues avec une technique propre.",
			],
			plyometrics: [
				"Effectue une brève flexion pour accumuler de la tension dans les jambes.",
				"Exécute le mouvement de manière explosive avec une intention maximale.",
				"Atterris en souplesse en absorbant avec les jambes et le gainage. Enchaîne la rep suivante une fois stable.",
			],
			strength: [
				`Active ${muscleName} avant d'initier le mouvement. Ressens la connexion esprit-muscle.`,
				"Effectue le mouvement avec un contrôle total, maîtrisant les phases concentrique et excentrique.",
				"Reviens à la position de départ en contrôlant la descente — la phase excentrique construit autant de muscle que la montée.",
			],
		},
		zh: {
			stretching: [
				`慢慢将身体移动到${muscleName}的拉伸位置。`,
				"保持20到40秒，深呼吸——每次呼气时放松更多。",
				"慢慢回到起始位置，如需要可重复。",
			],
			cardio: [
				"保持适合你体能水平的稳定节奏。",
				"收紧核心，在整个练习过程中保持挺直的姿势。",
				"以干净的技术继续计划的时间或次数。",
			],
			plyometrics: [
				"做一个短暂的屈膝蓄力。",
				"以最大意图爆发性地执行动作。",
				"柔软着地，用腿和核心缓冲。稳定后再进行下一次。",
			],
			strength: [
				`在开始动作前激活${muscleName}。感受意念-肌肉连接。`,
				"以完全控制执行动作，掌控向心和离心两个阶段。",
				"控制下降回到起始位置——离心阶段和向心阶段一样能增长肌肉。",
			],
		},
		pt: {
			stretching: [
				`Leve o corpo lentamente à posição de alongamento para ${muscleName}.`,
				"Mantenha de 20 a 40 segundos respirando profundamente — relaxe mais a cada expiração.",
				"Volte lentamente à posição inicial e repita se desejar.",
			],
			cardio: [
				"Mantenha um ritmo constante adaptado ao seu nível de condicionamento.",
				"Ative o core e mantenha uma postura ereta durante todo o exercício.",
				"Continue pelo tempo ou repetições planejadas com técnica limpa.",
			],
			plyometrics: [
				"Realize uma breve flexão para acumular tensão nas pernas.",
				"Execute o movimento de forma explosiva com máxima intenção.",
				"Aterrisse suavemente amortecendo com pernas e core. Encadeie a próxima repetição quando estiver estável.",
			],
			strength: [
				`Ative ${muscleName} antes de iniciar o movimento. Sinta a conexão mente-músculo.`,
				"Realize o movimento com controle total, dominando as fases concêntrica e excêntrica.",
				"Volte à posição inicial controlando a descida — a fase excêntrica constrói tanto músculo quanto a subida.",
			],
		},
		ja: {
			stretching: [
				`${muscleName}のストレッチポジションにゆっくりと体を移動させます。`,
				"20〜40秒間保持し、深く呼吸します——息を吐くたびに少しずつリラックスします。",
				"ゆっくりとスタートポジションに戻り、必要に応じて繰り返します。",
			],
			cardio: [
				"自分のフィットネスレベルに合った安定したペースを維持します。",
				"コアを引き締め、エクササイズ全体を通して正しい姿勢を保ちます。",
				"計画した時間またはレップ数を正しいフォームで続けます。",
			],
			plyometrics: [
				"脚にテンションを溜めるため、短く膝を曲げます。",
				"最大の意図を持って爆発的に動作を実行します。",
				"脚とコアで衝撃を吸収し、柔らかく着地します。安定してから次のレップに移ります。",
			],
			strength: [
				`動作を開始する前に${muscleName}を活性化させます。マインド-マッスルコネクションを感じてください。`,
				"コンセントリックとエキセントリックの両方のフェーズを完全にコントロールして動作を行います。",
				"下降をコントロールしながらスタートポジションに戻ります——エキセントリックフェーズは挙上と同じだけ筋肉を成長させます。",
			],
		},
	};

	const langTemplates = templates[lang];
	if (!langTemplates) return null;
	return langTemplates[category] || langTemplates.strength;
}

// ─────────────────────────────────────────────────────────────
// LATERALITY ADAPTATION (plural → singular for unilateral exercises)
// ─────────────────────────────────────────────────────────────

const LATERALITY_ADAPT = {
	de: {
		oneArm: [
			// Specific compound phrases (must come before general rules)
			[/\bsie sind festgenagelt\b/gi, "er ist festgenagelt"],
			[/\bstell dir vor, sie sind festgenagelt\b/gi, "stell dir vor, er ist festgenagelt"],
			[/\bsie sind feste Punkte im Raum\b/gi, "er ist ein fester Punkt im Raum"],
			[/\bNur die Unterarme bewegen sich wie Türscharniere\b/g, "Nur der Unterarm bewegt sich wie ein Türscharnier"],
			[/\bNur die Unterarme bewegen sich\b/g, "Nur der Unterarm bewegt sich"],
			[/\bdie Kurzhanteln\b/gi, "die Kurzhantel"],
			[/\bDie Kurzhanteln\b/g, "Die Kurzhantel"],
			[/\bder Kurzhanteln\b/gi, "der Kurzhantel"],
			[/\bwie Seile\b/gi, "wie ein Seil"],
			[/\bwie Stahlstangen\b/gi, "wie eine Stahlstange"],
			[/\bwie Stahlstäbe\b/gi, "wie eine Stahlstange"],
			[/\bdeine Hände sind nur Haken\b/gi, "deine Hand ist nur ein Haken"],
			// General body-part plurals
			[/\bdie Ellbogen zeigen\b/gi, "der Ellbogen zeigt"],
			[/\bdie Ellbogen an den Seiten\b/gi, "den Ellbogen an der Seite"],
			[/\bFixiere die Ellbogen an den Seiten\b/g, "Fixiere den Ellbogen an der Seite"],
			[/\bdie Ellbogen\b/gi, "den Ellbogen"],
			[/\bDie Ellbogen\b/g, "Der Ellbogen"],
			[/\bdie Unterarme\b/gi, "den Unterarm"],
			[/\bDie Unterarme\b/g, "Der Unterarm"],
			[/\bdie Handgelenke\b/gi, "das Handgelenk"],
			[/\bDie Handgelenke\b/g, "Das Handgelenk"],
			[/\bdeine Hände\b/gi, "deine Hand"],
			[/\bDeine Hände\b/g, "Deine Hand"],
			[/\bdie Arme\b/gi, "den Arm"],
			[/\bDie Arme\b/g, "Der Arm"],
			[/\bdeine Arme\b/gi, "deinen Arm"],
			[/\bDeine Arme\b/g, "Deinen Arm"],
			[/\bden Seiten\b/gi, "der Seite"],
			[/\bden Ohren\b/gi, "dem Ohr"],
		],
		oneLeg: [
			[/\bdie Beine\b/gi, "das Bein"],
			[/\bDie Beine\b/g, "Das Bein"],
			[/\bdeine Beine\b/gi, "dein Bein"],
			[/\bdie Knie\b/gi, "das Knie"],
			[/\bDie Knie\b/g, "Das Knie"],
			[/\bdie Fersen\b/gi, "die Ferse"],
			[/\bDie Fersen\b/g, "Die Ferse"],
			[/\bdie Waden\b/gi, "die Wade"],
			[/\bDie Waden\b/g, "Die Wade"],
			[/\bdie Beinbeuger\b/gi, "den Beinbeuger"],
			[/\bDie Beinbeuger\b/g, "Den Beinbeuger"],
			[/\bbeide Knie\b/gi, "das Knie"],
		],
	},
	fr: {
		oneArm: [
			// Specific compound phrases (must come before general rules)
			[/\bils sont cloués\b/gi, "il est cloué"],
			[/\bqu'ils sont cloués en place\b/gi, "qu'il est cloué en place"],
			[/\bce sont des points fixes dans l'espace\b/gi, "c'est un point fixe dans l'espace"],
			[/\bSeuls les avant-bras bougent comme des charnières\b/g, "Seul l'avant-bras bouge comme une charnière"],
			[/\bdes piliers de béton qui ne bougent pas\b/gi, "un pilier de béton qui ne bouge pas"],
			[/\bSeuls les avant-bras bougent\b/g, "Seul l'avant-bras bouge"],
			[/\bseuls les avant-bras bougent\b/g, "seul l'avant-bras bouge"],
			[/\bcomme des cordes\b/gi, "comme une corde"],
			[/\btes mains sont juste des crochets\b/gi, "ta main est juste un crochet"],
			[/\bcomme des tiges d'acier\b/gi, "comme une tige d'acier"],
			[/\bles haltères\b/gi, "l'haltère"],
			[/\bLes haltères\b/g, "L'haltère"],
			[/\bdes haltères\b/gi, "de l'haltère"],
			[/\bdroits comme\b/gi, "droit comme"],
			// General body-part plurals
			[/\bles coudes\b/gi, "le coude"],
			[/\bLes coudes\b/g, "Le coude"],
			[/\btes coudes\b/gi, "ton coude"],
			[/\bTes coudes\b/g, "Ton coude"],
			[/\bles avant-bras\b/gi, "l'avant-bras"],
			[/\bLes avant-bras\b/g, "L'avant-bras"],
			[/\bles poignets\b/gi, "le poignet"],
			[/\bLes poignets\b/g, "Le poignet"],
			[/\bles biceps\b/gi, "le biceps"],
			[/\bLes biceps\b/g, "Le biceps"],
			[/\bles triceps\b/gi, "le triceps"],
			[/\bLes triceps\b/g, "Le triceps"],
			[/\bles bras\b/gi, "le bras"],
			[/\bLes bras\b/g, "Le bras"],
			[/\btes bras\b/gi, "ton bras"],
			[/\bTes bras\b/g, "Ton bras"],
			[/\bles mains\b/gi, "la main"],
			[/\bLes mains\b/g, "La main"],
			[/\baux côtés\b/gi, "au côté"],
			[/\bdes oreilles\b/gi, "de l'oreille"],
		],
		oneLeg: [
			[/\bles jambes\b/gi, "la jambe"],
			[/\bLes jambes\b/g, "La jambe"],
			[/\btes jambes\b/gi, "ta jambe"],
			[/\bles genoux\b/gi, "le genou"],
			[/\bLes genoux\b/g, "Le genou"],
			[/\bles talons\b/gi, "le talon"],
			[/\bLes talons\b/g, "Le talon"],
			[/\bles mollets\b/gi, "le mollet"],
			[/\bLes mollets\b/g, "Le mollet"],
			[/\bles ischio-jambiers\b/gi, "l'ischio-jambier"],
			[/\bLes ischio-jambiers\b/g, "L'ischio-jambier"],
			[/\bles deux genoux\b/gi, "le genou"],
		],
	},
	zh: {
		oneArm: [
			// Chinese doesn't have grammatical number, but explicit dual/both markers should change
			[/\b双手\b/g, "单手"],
			[/\b双肘\b/g, "肘部"],
			[/\b双臂\b/g, "手臂"],
			[/\b两只手\b/g, "一只手"],
			[/\b两个哑铃\b/g, "哑铃"],
			[/两侧/g, "一侧"],
			[/双手紧握/g, "单手紧握"],
			[/双手/g, "单手"],
		],
		oneLeg: [
			[/\b双腿\b/g, "单腿"],
			[/\b双脚\b/g, "脚"],
			[/\b双膝\b/g, "膝盖"],
			[/两条腿/g, "一条腿"],
			[/两只脚/g, "一只脚"],
		],
	},
	pt: {
		oneArm: [
			// Specific compound phrases (adjective agreement)
			[/\bimagine que estão pregados\b/gi, "imagine que está pregado"],
			[/\bos braços pendurados retos como cordas presas\b/gi, "o braço pendurado reto como uma corda presa"],
			[/\bsuas mãos são apenas ganchos\b/gi, "sua mão é apenas um gancho"],
			[/\bcomo cordas\b/gi, "como uma corda"],
			[/\bcomo hastes de aço\b/gi, "como uma haste de aço"],
			[/\bos halteres\b/gi, "o halter"],
			[/\bOs halteres\b/g, "O halter"],
			[/\bdos braços\b/gi, "do braço"],
			// General body-part plurals
			[/\bos cotovelos\b/gi, "o cotovelo"],
			[/\bOs cotovelos\b/g, "O cotovelo"],
			[/\bseus cotovelos\b/gi, "seu cotovelo"],
			[/\bos antebraços\b/gi, "o antebraço"],
			[/\bOs antebraços\b/g, "O antebraço"],
			[/\bos pulsos\b/gi, "o pulso"],
			[/\bOs pulsos\b/g, "O pulso"],
			[/\bos bíceps\b/gi, "o bíceps"],
			[/\bOs bíceps\b/g, "O bíceps"],
			[/\bos tríceps\b/gi, "o tríceps"],
			[/\bOs tríceps\b/g, "O tríceps"],
			[/\bos braços\b/gi, "o braço"],
			[/\bOs braços\b/g, "O braço"],
			[/\bseus braços\b/gi, "seu braço"],
			[/\bas mãos\b/gi, "a mão"],
			[/\bAs mãos\b/g, "A mão"],
			[/\baos lados\b/gi, "ao lado"],
			[/\bdas orelhas\b/gi, "da orelha"],
		],
		oneLeg: [
			[/\bas pernas\b/gi, "a perna"],
			[/\bAs pernas\b/g, "A perna"],
			[/\bsuas pernas\b/gi, "sua perna"],
			[/\bos joelhos\b/gi, "o joelho"],
			[/\bOs joelhos\b/g, "O joelho"],
			[/\bos calcanhares\b/gi, "o calcanhar"],
			[/\bOs calcanhares\b/g, "O calcanhar"],
			[/\bas panturrilhas\b/gi, "a panturrilha"],
			[/\bAs panturrilhas\b/g, "A panturrilha"],
			[/\bos posteriores\b/gi, "o posterior"],
			[/\bOs posteriores\b/g, "O posterior"],
			[/\bambos os joelhos\b/gi, "o joelho"],
		],
	},
	ja: {
		oneArm: [
			// Japanese doesn't have grammatical number but explicit dual markers should change
			[/両腕/g, "腕"],
			[/両肘/g, "肘"],
			[/両手/g, "片手"],
			[/両方の手/g, "片手"],
			[/両方の腕/g, "腕"],
			[/ダンベルを/g, "ダンベルを"],
		],
		oneLeg: [
			[/両脚/g, "片脚"],
			[/両足/g, "片足"],
			[/両膝/g, "膝"],
			[/両方の脚/g, "片脚"],
			[/両方の足/g, "片足"],
		],
	},
};

module.exports = {
	EQUIP_SETUP,
	POSTURE_CUES,
	GRIP_CUES,
	LATERALITY_CUES,
	BREATHING,
	MUSCLE_NAMES,
	EQUIP_ADAPT,
	LATERALITY_ADAPT,
	buildFallbackStepsMulti,
};
