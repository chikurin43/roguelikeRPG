const CONFIG = {
  player: { maxHp: 300, hp: 300, atk: 10, def: 5, maxMp: 100, mp: 100 },
  maxEnemies: 5,
  despawnTurns: 15,
  elementNames: {
    physical: "物理",
    fire: "炎",
    ice: "氷",
    lightning: "雷",
  },
};

const rewardStats = ["hp", "atk", "def"];
const enemyElements = ["physical", "fire", "ice", "lightning"];
const STATUS_NAMES = { bleed: "出血", burn: "炎上", shock: "感電", freeze: "凍結" };

const PLAYER_SKILLS = [
  { id: "laceration", name: "裂傷斬り", kind: "active", mpCost: 12 },
  { id: "pursuit-stance", name: "追撃の構え", kind: "passive" },
  { id: "bone-break", name: "骨砕き", kind: "active", mpCost: 18 },
  { id: "counter-stance", name: "反撃態勢", kind: "active", mpCost: 10 },
  { id: "vital-read", name: "急所見抜き", kind: "passive" },
  { id: "bleed-spread", name: "流血拡大", kind: "passive" },
  { id: "piercing-thrust", name: "貫通突き", kind: "active", mpCost: 14 },
  { id: "blood-feast", name: "血祭り", kind: "passive" },
  { id: "fire-bolt", name: "ファイアボルト", kind: "active", mpCost: 14 },
  { id: "inferno-follow", name: "業火", kind: "active", mpCost: 24 },
  { id: "fuel-drop", name: "燃料投下", kind: "active", mpCost: 16 },
  { id: "wildfire", name: "延焼", kind: "active", mpCost: 18 },
  { id: "ashenize", name: "灰化", kind: "active", mpCost: 16 },
  { id: "self-ignite", name: "自己発火", kind: "active", mpCost: 20 },
  { id: "searing-focus", name: "灼熱集中", kind: "active", mpCost: 22 },
  { id: "ice-lance", name: "アイスランス", kind: "active", mpCost: 14 },
  { id: "frost-bind", name: "霜縛り", kind: "active", mpCost: 16 },
  { id: "cooling-barrier", name: "冷却障壁", kind: "active", mpCost: 18 },
  { id: "absolute-zero", name: "絶対零度", kind: "active", mpCost: 20 },
  { id: "ice-crush", name: "氷砕き", kind: "active", mpCost: 20 },
  { id: "calm-mind", name: "冷静沈着", kind: "passive" },
  { id: "cold-resist", name: "寒冷耐性", kind: "passive" },
  { id: "thunder", name: "サンダー", kind: "active", mpCost: 14 },
  { id: "overcurrent", name: "過電流", kind: "passive" },
  { id: "chain-lightning", name: "チェインライトニング", kind: "active", mpCost: 22 },
  { id: "neural-disrupt", name: "神経攪乱", kind: "active", mpCost: 16 },
  { id: "charged-weapon", name: "帯電武装", kind: "active", mpCost: 18 },
  { id: "discharge", name: "放電", kind: "active", mpCost: 20 },
  { id: "thunder-resonance", name: "雷鳴共鳴", kind: "passive" },
  { id: "status-compress", name: "状態圧縮", kind: "active", mpCost: 16 },
  { id: "status-amp", name: "異常増幅", kind: "active", mpCost: 12 },
  { id: "status-convert", name: "異常変換", kind: "active", mpCost: 14 },
  { id: "corrosion", name: "腐食", kind: "active", mpCost: 14 },
  { id: "resist-break", name: "異常耐性破壊", kind: "active", mpCost: 16 },
  { id: "infection-burst", name: "感染爆発", kind: "passive" },
  { id: "focus", name: "集中", kind: "active", mpCost: 0 },
  { id: "mana-siphon", name: "魔力吸収", kind: "passive" },
  { id: "overcast", name: "過剰詠唱", kind: "active", mpCost: 10 },
  { id: "mana-save", name: "魔力節約", kind: "passive" },
  { id: "mana-reflux", name: "魔力逆流", kind: "passive" },
  { id: "iron-wall", name: "鉄壁", kind: "active", mpCost: 16 },
  { id: "fire-ice-guard", name: "氷炎耐性", kind: "passive" },
  { id: "lightning-evasion", name: "雷避け", kind: "passive" },
  { id: "hemostasis", name: "血止め", kind: "active", mpCost: 18 },
  { id: "self-repair", name: "自己修復", kind: "passive" },
  { id: "element-invert", name: "属性反転", kind: "active", mpCost: 14 },
  { id: "resonance-break", name: "共鳴破壊", kind: "active", mpCost: 14 },
  { id: "time-bomb", name: "時限爆弾", kind: "active", mpCost: 20 },
  { id: "adaptive-evo", name: "適応進化", kind: "passive" },
  { id: "doom-design", name: "終焉設計", kind: "active", mpCost: 30 },
];

const SKILL_DESCRIPTIONS = {
  "laceration": "物理ダメージを与え、出血を付与する。",
  "pursuit-stance": "出血中の敵への与ダメージが増加する。",
  "bone-break": "防御無視攻撃。凍結中の敵にはさらに高威力。",
  "counter-stance": "次に被弾した際、確率で反撃する。",
  "vital-read": "感電中の敵へ高確率でクリティカル補正。",
  "bleed-spread": "出血ダメージがターン経過で徐々に増加する。",
  "piercing-thrust": "敵DEFの影響を半減して攻撃。",
  "blood-feast": "敵撃破時にHP回復。出血中の敵なら回復増加。",
  "fire-bolt": "炎ダメージと炎上付与。",
  "inferno-follow": "炎上中の敵全体へ追撃。",
  "fuel-drop": "炎上ダメージをその場で即時発動。",
  "wildfire": "炎上を他の敵へ伝播。",
  "ashenize": "炎上中の敵のDEFを低下。",
  "self-ignite": "ATK上昇と引き換えに自身へ微炎上。",
  "searing-focus": "凍結中の敵に大ダメージを与え凍結を解除。",
  "ice-lance": "氷ダメージと凍結付与。",
  "frost-bind": "凍結中の敵のATKを低下。",
  "cooling-barrier": "次の被ダメージを軽減する障壁を展開。",
  "absolute-zero": "低HPの敵ほど高確率で凍結。",
  "ice-crush": "凍結中の敵に高威力の氷攻撃。",
  "calm-mind": "MP自然回復量が+5される。",
  "cold-resist": "凍結を無効化する。",
  "thunder": "雷ダメージと感電付与。",
  "overcurrent": "感電中の敵へのダメージが増加。",
  "chain-lightning": "感電中の敵へ連鎖攻撃。",
  "neural-disrupt": "感電付与+敵行動率低下。",
  "charged-weapon": "通常攻撃に雷属性を付与。",
  "discharge": "感電を消費し範囲雷ダメージ。",
  "thunder-resonance": "感電敵が多いほど与ダメージ上昇。",
  "status-compress": "敵の状態異常ターンを延長。",
  "status-amp": "次回付与する状態異常効果を2倍。",
  "status-convert": "炎上と出血を相互変換。",
  "corrosion": "敵の状態異常数に応じてDEF低下。",
  "resist-break": "敵の耐性効果を一時無効化。",
  "infection-burst": "状態異常中の敵を倒すと周囲へ拡散。",
  "focus": "攻撃せずMPを20回復。",
  "mana-siphon": "状態異常中の敵攻撃時にMP回復。",
  "overcast": "次スキルの威力とMP消費が2倍。",
  "mana-save": "確率でMP消費を0にする。",
  "mana-reflux": "MP不足時にHPを支払ってスキルを使用。",
  "iron-wall": "次に受けるダメージを大幅軽減。",
  "fire-ice-guard": "炎・氷属性ダメージを軽減。",
  "lightning-evasion": "感電中に被弾した際、確率で回避。",
  "hemostasis": "出血解除+HP回復。",
  "self-repair": "MP非消費ターンにHP自動回復。",
  "element-invert": "敵属性を別属性に変更。",
  "resonance-break": "敵の固有スキルを1ターン封印。",
  "time-bomb": "数ターン後に状態異常を一斉起爆。",
  "adaptive-evo": "受けた属性ダメージへの耐性を獲得。",
  "doom-design": "状態異常3種以上の敵へ即死級ダメージ。"
};

const enemyAttack = (game, enemy, mult, element, label, bonus = 0) => {
  const damage = game.calculateDamage(enemy.atk * mult + bonus, game.player.def, game.player, "enemy", element, enemy);
  game.hitPlayer(damage, enemy, label);
  return damage;
};

const enemyApplyDebuff = (game, type, duration, value, label) => {
  game.applyDebuff(type, duration, value);
  if (label) game.log(label);
};

const ENEMY_SKILLS = [
  { id: "claw-rip", name: "裂爪", description: "物理ダメージ＋出血", effect: (g, e) => { enemyAttack(g, e, 1.1, "physical", "敵スキル:裂爪"); g.applyStatus(g.player, "bleed", 3, 0.03, false); } },
  { id: "blood-curse", name: "血の呪い", description: "出血中のプレイヤーの回復量低下", effect: (g) => { if (g.hasStatus(g.player, "bleed")) enemyApplyDebuff(g, "healMultiplier", 3, 0.6, "血の呪い: 回復量低下"); } },
  { id: "combo-instinct", name: "連撃本能", description: "出血中の相手に連続攻撃", effect: (g, e) => { const hits = g.hasStatus(g.player, "bleed") ? 2 : 1; for (let i = 0; i < hits; i += 1) enemyAttack(g, e, 0.9, "physical", "敵スキル:連撃本能"); } },
  { id: "flesh-sunder", name: "肉削ぎ", description: "最大HP割合ダメ", effect: (g, e) => { const damage = Math.max(5, Math.round(g.player.maxHp * 0.08)); g.player.hp = Math.max(0, g.player.hp - damage); g.log(`${e.id}の肉削ぎ: ${damage}ダメージ`); } },
  { id: "predation", name: "捕食", description: "出血中の相手を攻撃するとHP回復", effect: (g, e) => { const damage = enemyAttack(g, e, 1.0, "physical", "敵スキル:捕食"); if (g.hasStatus(g.player, "bleed")) { const heal = Math.round(damage * 0.5); e.hp = Math.min(e.maxHp, e.hp + heal); g.log(`${e.id}は捕食でHP+${heal}`); } } },
  { id: "vital-pierce", name: "急所穿ち", description: "感電中の相手に被ダメ増加", effect: (g) => { if (g.hasStatus(g.player, "shock")) enemyApplyDebuff(g, "damageTaken", 2, 1.2, "急所穿ち: 被ダメ増加"); } },
  { id: "armor-break", name: "破甲打", description: "DEFを一時的に低下", effect: (g) => enemyApplyDebuff(g, "defDown", 3, 1.5, "破甲打: DEF低下") },
  { id: "execution-instinct", name: "処刑衝動", description: "HPが低い相手への与ダメ上昇", effect: (g, e) => { const mult = g.player.hp / g.player.maxHp < 0.4 ? 1.6 : 1.0; enemyAttack(g, e, mult, "physical", "敵スキル:処刑衝動"); } },
  { id: "fireball", name: "火炎弾", description: "炎ダメージ＋炎上", effect: (g, e) => { enemyAttack(g, e, 1.05, "fire", "敵スキル:火炎弾"); g.applyStatus(g.player, "burn", 3, 8, false); } },
  { id: "spreading-fury", name: "燃え広がる怒り", description: "炎上数に応じてATK上昇", effect: (g, e) => { e.temp.spreadingFury = 3; g.log(`${e.id}は燃え広がる怒りを纏った`); } },
  { id: "incinerate", name: "焼却", description: "炎上中の相手のDEF低下", effect: (g) => { if (g.hasStatus(g.player, "burn")) enemyApplyDebuff(g, "defDown", 2, 1.0, "焼却: DEF低下"); } },
  { id: "self-destruct-core", name: "自爆炉心", description: "死亡時に炎ダメ＋炎上", effect: (g, e) => g.log(`${e.id}の炉心が不穏に輝く…`) },
  { id: "overheat", name: "過熱", description: "炎上中に行動回数増加", effect: (g, e) => { if (g.hasStatus(e, "burn")) { e.temp.extraAction = 1; g.log(`${e.id}は過熱で加速した`); } } },
  { id: "ash-barrier", name: "灰の障壁", description: "炎上中、被ダメ軽減", effect: (g, e) => { e.temp.ashBarrier = 3; g.log(`${e.id}は灰の障壁を展開`); } },
  { id: "burn-transfer", name: "燃焼転移", description: "受けた炎上をプレイヤーに移す", effect: (g, e) => { if (g.hasStatus(e, "burn")) { g.removeStatus(e, "burn"); g.applyStatus(g.player, "burn", 3, 8, false); g.log("燃焼転移が発動"); } } },
  { id: "ice-fang", name: "氷牙", description: "氷ダメージ＋凍結", effect: (g, e) => { enemyAttack(g, e, 1.05, "ice", "敵スキル:氷牙"); g.applyStatus(g.player, "freeze", 2, 0.2, false); } },
  { id: "chill-gaze", name: "冷却視線", description: "プレイヤーの与ダメ低下", effect: (g) => enemyApplyDebuff(g, "damageDealt", 3, 0.8, "冷却視線: 与ダメ低下") },
  { id: "frost-cage", name: "霜の檻", description: "凍結中の相手はMP回復不可", effect: (g) => { if (g.hasStatus(g.player, "freeze")) enemyApplyDebuff(g, "mpRegenBlock", 2, 1, "霜の檻: MP回復不可"); } },
  { id: "ice-armor", name: "氷結装甲", description: "凍結中、DEF大幅上昇", effect: (g, e) => g.log(`${e.id}は氷結装甲を纏う`) },
  { id: "frostbite", name: "凍傷", description: "凍結解除時に追加ダメ", effect: (g, e) => g.log(`${e.id}の凍傷が忍び寄る`) },
  { id: "subzero-thought", name: "氷点下思考", description: "プレイヤーのスキル発動率低下", effect: (g) => enemyApplyDebuff(g, "skillFail", 3, 0.2, "氷点下思考: 発動率低下") },
  { id: "cold-domination", name: "冷気支配", description: "炎上効果減少", effect: (g, e) => g.log(`${e.id}の冷気が戦場を支配`) },
  { id: "discharge-strike", name: "放電打撃", description: "雷ダメージ＋感電", effect: (g, e) => { enemyAttack(g, e, 1.05, "lightning", "敵スキル:放電打撃"); g.applyStatus(g.player, "shock", 3, 0.15, false); } },
  { id: "overvoltage", name: "過電圧", description: "感電中の相手の被ダメ増加", effect: (g) => { if (g.hasStatus(g.player, "shock")) enemyApplyDebuff(g, "damageTaken", 2, 1.2, "過電圧: 被ダメ増加"); } },
  { id: "nerve-block", name: "神経遮断", description: "感電中、スキルが失敗する確率", effect: (g) => { if (g.hasStatus(g.player, "shock")) enemyApplyDebuff(g, "skillFail", 2, 0.3, "神経遮断: スキル失敗率上昇"); } },
  { id: "electromagnetic-accel", name: "電磁加速", description: "感電中の敵がいるほど行動速度UP", effect: (g, e) => { e.temp.electroAccel = 2; g.log(`${e.id}は電磁加速を開始`); } },
  { id: "shock-chain", name: "感電連鎖", description: "感電を他者へ伝播", effect: (g) => { if (g.hasStatus(g.player, "shock")) { const target = g.enemies.find((en) => !g.hasStatus(en, "shock")); if (target) g.applyStatus(target, "shock", 2, 0.1, false); } else { g.applyStatus(g.player, "shock", 2, 0.1, false); } } },
  { id: "thunder-reflect", name: "雷鳴反射", description: "雷ダメージを受けると反射", effect: (g, e) => g.log(`${e.id}は雷鳴反射を帯びている`) },
  { id: "potential-reversal", name: "電位逆転", description: "プレイヤーのバフを感電に変換", effect: (g) => { g.player.temp.overcast = false; g.player.temp.ironWall = false; g.player.temp.barrier = 0; g.applyStatus(g.player, "shock", 2, 0.15, false); g.log("電位逆転でバフが崩れた"); } },
  { id: "abnormal-resistance", name: "異常耐性", description: "付与された状態異常の効果半減", effect: (g, e) => g.log(`${e.id}は異常耐性を持つ`) },
  { id: "abnormal-proliferation", name: "異常増殖", description: "状態異常が増えるごとにATK上昇", effect: (g, e) => g.log(`${e.id}の異常増殖が進行`) },
  { id: "abnormal-reversal", name: "異常反転", description: "受けた状態異常をプレイヤーへ返す", effect: (g, e) => g.log(`${e.id}は異常反転を構える`) },
  { id: "corrosive-erosion", name: "腐食侵食", description: "状態異常中の相手のDEFを毎ターン削る", effect: (g, e) => g.log(`${e.id}の腐食侵食が発動中`) },
  { id: "abnormal-implode", name: "異常爆縮", description: "状態異常を消費して即時大ダメ", effect: (g, e) => { const count = g.player.statuses.length; if (count) { g.player.statuses = []; const damage = 10 + count * 12; g.player.hp = Math.max(0, g.player.hp - damage); g.log(`${e.id}の異常爆縮: ${damage}ダメージ`); } } },
  { id: "adaptive-evolution", name: "適応進化", description: "同じ状態異常を2回受けると無効化", effect: (g, e) => g.log(`${e.id}は適応進化している`) },
  { id: "mana-drain", name: "魔力吸収", description: "攻撃命中時、MP吸収", effect: (g, e) => { enemyAttack(g, e, 1.0, "physical", "敵スキル:魔力吸収"); g.player.mp = Math.max(0, g.player.mp - 10); g.log("MPが吸収された"); } },
  { id: "chant-disrupt", name: "詠唱妨害", description: "MP消費量増加", effect: (g) => enemyApplyDebuff(g, "mpCostUp", 3, 0.5, "詠唱妨害: MP消費増加") },
  { id: "mana-seal", name: "魔力封鎖", description: "一定ターン、MP回復不可", effect: (g) => enemyApplyDebuff(g, "mpRegenBlock", 3, 1, "魔力封鎖: MP回復不可") },
  { id: "overload", name: "過負荷", description: "MPが多いほど被ダメ増加", effect: (g, e) => g.log(`${e.id}は過負荷を狙う`) },
  { id: "depletion-hunt", name: "枯渇誘導", description: "MP0の相手に与ダメ増加", effect: (g, e) => g.log(`${e.id}は枯渇誘導を狙う`) },
  { id: "regen-factor", name: "再生因子", description: "状態異常がない間HP回復", effect: (g, e) => g.log(`${e.id}は再生因子を持つ`) },
  { id: "element-shell", name: "属性殻", description: "自身の属性ダメ軽減", effect: (g, e) => g.log(`${e.id}は属性殻を纏う`) },
  { id: "counter-shell", name: "反撃殻", description: "被ダメ時、同属性で反撃", effect: (g, e) => g.log(`${e.id}の反撃殻が光る`) },
  { id: "tenacity", name: "執念", description: "HP0でも1ターン行動", effect: (g, e) => g.log(`${e.id}の執念が燃える`) },
  { id: "rampage", name: "暴走", description: "HP低下時、全ステ上昇", effect: (g, e) => g.log(`${e.id}は暴走の兆し`) },
  { id: "attribute-pollution", name: "属性汚染", description: "プレイヤー攻撃属性を一時変更", effect: (g) => { const elements = ["physical", "fire", "ice", "lightning"]; const element = elements[Math.floor(Math.random() * elements.length)]; g.player.temp.attackElementOverride = { element, duration: 3 }; g.log(`属性汚染で攻撃属性が${CONFIG.elementNames[element]}に変化`); } },
  { id: "skill-break", name: "スキル破壊", description: "使用されたスキルを封印", effect: (g, e) => { if (g.player.lastSkillId) { const skill = PLAYER_SKILLS.find((s) => s.id === g.player.lastSkillId); g.player.sealedSkills[g.player.lastSkillId] = 3; g.log(`${e.id}は${skill ? skill.name : g.player.lastSkillId}を封印した`); } } },
  { id: "timed-collapse", name: "時限崩壊", description: "数ターン後に状態異常一斉付与", effect: (g, e) => { g.player.temp.collapseTimer = 3; g.log(`${e.id}は時限崩壊を仕掛けた`); } },
  { id: "resonance-jam", name: "共鳴阻害", description: "状態異常の相互効果を無効化", effect: (g, e) => { g.player.temp.disableSynergy = 3; g.log(`${e.id}は共鳴阻害を発動`); } },
  { id: "doom-mimic", name: "終焉模倣", description: "直前スキルをコピー", effect: (g, e) => {
      if (!g.player.lastSkillId) return;
      const skill = PLAYER_SKILLS.find((s) => s.id === g.player.lastSkillId);
      if (!skill) return;
      const element = skill.id.includes("fire") ? "fire" : skill.id.includes("ice") ? "ice" : skill.id.includes("thunder") ? "lightning" : "physical";
      enemyAttack(g, e, 1.1, element, `敵スキル:終焉模倣(${skill.name})`);
      if (element === "fire") g.applyStatus(g.player, "burn", 2, 6, false);
      if (element === "ice") g.applyStatus(g.player, "freeze", 2, 0.15, false);
      if (element === "lightning") g.applyStatus(g.player, "shock", 2, 0.12, false);
      if (skill.id.includes("laceration") || skill.id.includes("bleed")) g.applyStatus(g.player, "bleed", 2, 0.02, false);
    } },
];

class Game {
  constructor() {
    this.player = {
      ...CONFIG.player,
      skills: [],
      kills: 0,
      statuses: [],
      debuffs: [],
      sealedSkills: {},
      lastSkillId: null,
      temp: {},
      passiveResist: { physical: 0, fire: 0, ice: 0, lightning: 0 },
    };

    this.turn = 1;
    this.enemyLevel = 1;
    this.enemies = [];
    this.selectedEnemyId = null;

    this.playerStatsEl = document.getElementById("playerStats");
    this.enemyListEl = document.getElementById("enemyList");
    this.logEl = document.getElementById("log");
    this.activeSkillButtonsEl = document.getElementById("activeSkillButtons");
    this.statusArea = document.getElementById("statusArea");
    this.passiveSkillsEl = document.getElementById("passiveSkills");
    this.basicAttackBtn = document.getElementById("basicAttackBtn");

    this.wireEvents();
    this.bootstrapEnemies();
    this.render();
    this.log("ゲーム開始。敵を選んで攻撃してください。");
  }

  hasSkill(id) {
    return this.player.skills.some((s) => s.id === id);
  }

  hasEnemySkill(id) {
    return this.enemies.some((enemy) => enemy.enemySkill.id === id);
  }

  applyDebuff(type, duration, value) {
    this.player.debuffs.push({ type, duration, value });
  }

  getDebuffMultiplier(type, fallback = 1) {
    const debuffs = this.player.debuffs.filter((d) => d.type === type);
    if (!debuffs.length) return fallback;
    return debuffs.reduce((mult, debuff) => mult * debuff.value, fallback);
  }

  getDebuffValue(type) {
    return this.player.debuffs.filter((d) => d.type === type).reduce((sum, debuff) => sum + debuff.value, 0);
  }

  isSkillSealed(skillId) {
    return Boolean(this.player.sealedSkills[skillId]);
  }

  healPlayer(amount, source) {
    const multiplier = this.getDebuffMultiplier("healMultiplier", 1);
    const heal = Math.max(0, Math.round(amount * multiplier));
    this.player.hp = Math.min(this.player.maxHp, this.player.hp + heal);
    this.log(`${source}でHP+${heal}`);
  }

  wireEvents() {
    this.basicAttackBtn.addEventListener("click", () => this.playerAction("basic"));
  }

  bootstrapEnemies() {
    for (let i = 0; i < CONFIG.maxEnemies; i += 1) this.spawnEnemy();
    this.selectedEnemyId = this.enemies[0]?.id ?? null;
  }

  spawnEnemy() {
    if (this.enemies.length >= CONFIG.maxEnemies) return;
    const level = this.enemyLevel;
    const [a, b, c] = this.randomWeightTriplet();
    const scale = 1 + (level * (level - 1)) / 6;
    const element = enemyElements[Math.floor(Math.random() * enemyElements.length)];

    const enemy = {
      id: `E${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      level,
      maxHp: Math.round(10 * scale * a),
      hp: Math.round(10 * scale * a),
      atk: Math.max(1, Math.round(scale * b)),
      def: Math.round(0.5 * scale * c * 10) / 10,
      rewardStat: rewardStats[Math.floor(Math.random() * rewardStats.length)],
      element,
      enemySkill: ENEMY_SKILLS[Math.floor(Math.random() * ENEMY_SKILLS.length)],
      statuses: [],
      turnsSinceDamaged: 0,
      temp: { skillBlocked: false, actionPenalty: 0 },
    };

    this.enemies.push(enemy);
    this.enemyLevel += 1;
    this.log(`Lv${enemy.level} ${CONFIG.elementNames[element]}属性の敵が出現。`);
  }

  randomWeightTriplet() {
    for (let tries = 0; tries < 4000; tries += 1) {
      const a = 0.5 + Math.random();
      const b = 0.5 + Math.random();
      const c = 3 - a - b;
      if (c >= 0.5 && c <= 1.5) return [a, b, c];
    }
    return [1, 1, 1];
  }

  getSelectedEnemy() {
    return this.enemies.find((e) => e.id === this.selectedEnemyId);
  }

  playerAction(mode, chosenSkillId = null) {
    if (this.player.hp <= 0) return;
    const target = this.getSelectedEnemy();
    if (!target) return this.log("攻撃対象がいません。");

    this.log(`--- ターン ${this.turn} ---`);
    this.applyTurnStatuses("player");
    if (this.player.hp <= 0) return this.checkGameOver();

    let mpSpent = false;

    if (mode === "basic") {
      const damage = this.calculateDamage(this.player.atk, target.def, target, "player", "physical", target);
      const overrideElement = this.player.temp.attackElementOverride?.element;
      const baseElement = this.hasSkill("charged-weapon") ? "lightning" : "physical";
      const element = overrideElement || baseElement;
      this.hitTarget(target, damage, "プレイヤー", element, "通常攻撃");
      if (this.hasSkill("charged-weapon")) this.applyStatus(target, "shock", 2, 0.1, true);
      if (this.hasSkill("mana-siphon") && target.statuses.length) this.restoreMp(5, "魔力吸収");
    } else {
      const selectedId = chosenSkillId;
      const selected = PLAYER_SKILLS.find((s) => s.id === selectedId && s.kind === "active");
      if (!selected || !this.hasSkill(selected.id)) return this.log("使用可能なアクティブスキルがありません。");
      if (this.isSkillSealed(selected.id)) {
        this.log(`${selected.name} は封印されていて使用できない。`);
      } else if (Math.random() < this.getDebuffValue("skillFail")) {
        this.log(`${selected.name} の発動に失敗した。`);
      } else {
        const cost = this.computeSkillCost(selected.mpCost);
        if (cost > 0 && this.player.mp < cost) {
          if (!this.hasSkill("mana-reflux")) return this.log(`MP不足で ${selected.name} を使えない。`);
          const hpCost = Math.max(1, Math.ceil((cost - this.player.mp) * 1.5));
          this.player.mp = 0;
          this.player.hp = Math.max(0, this.player.hp - hpCost);
          this.log(`魔力逆流でHPを${hpCost}消費して ${selected.name} を発動。`);
        } else {
          this.player.mp -= cost;
        }
        mpSpent = cost > 0;
        this.usePlayerSkill(selected, target);
        this.player.lastSkillId = selected.id;
      }
    }

    this.cleanupDeadEnemies();
    this.enemyTurn();
    this.applyTurnStatuses("enemies");
    this.despawnUnattackedEnemies();

    const mpRegen = 10 + (this.hasSkill("calm-mind") ? 5 : 0);
    if (!mpSpent) {
      if (this.getDebuffValue("mpRegenBlock") > 0) {
        this.log("MP回復が封じられている。");
      } else {
        this.restoreMp(mpRegen, "自然回復");
      }
    }
    if (!mpSpent && this.hasSkill("self-repair")) {
      const heal = Math.max(2, Math.round(this.player.maxHp * 0.02));
      this.healPlayer(heal, "自己修復");
    }

    this.player.temp = { ...this.player.temp, overcast: false, statusAmp: false, ironWall: false, counter: false };
    this.turn += 1;
    this.render();
    this.checkGameOver();
  }

  computeSkillCost(baseCost) {
    let cost = baseCost;
    if (this.getDebuffValue("mpCostUp") > 0) {
      cost = Math.round(cost * (1 + this.getDebuffValue("mpCostUp")));
    }
    if (this.hasSkill("overcast") && this.player.temp.overcast) cost *= 2;
    if (this.hasSkill("mana-save") && Math.random() < 0.25) {
      this.log("魔力節約が発動しMP消費0。");
      return 0;
    }
    return cost;
  }

  usePlayerSkill(skill, target) {
    const overcastMul = this.player.temp.overcast ? 2 : 1;
    const amp = this.player.temp.statusAmp ? 2 : 1;

    const damageTo = (enemy, power, element = "physical", defFactor = 1) => {
      const damage = this.calculateDamage(this.player.atk * power * overcastMul, enemy.def * defFactor, enemy, "player", element, enemy);
      this.hitTarget(enemy, damage, "プレイヤー", element, `スキル:${skill.name}`);
      return damage;
    };

    const apply = (enemy, type, duration, value) => this.applyStatus(enemy, type, duration, value * amp, true);

    switch (skill.id) {
      case "laceration": damageTo(target, 1.2); apply(target, "bleed", 4, 0.03); break;
      case "bone-break": damageTo(target, this.hasStatus(target, "freeze") ? 2.2 : 1.5, "physical", 0); break;
      case "counter-stance": this.player.temp.counter = true; this.log("反撃態勢: 次に被弾時、確率反撃"); break;
      case "piercing-thrust": damageTo(target, 1.35, "physical", 0.5); break;
      case "fire-bolt": damageTo(target, 1.3, "fire"); apply(target, "burn", 4, 10); break;
      case "inferno-follow": this.enemies.filter((e) => this.hasStatus(e, "burn")).forEach((e) => damageTo(e, 1.0, "fire")); break;
      case "fuel-drop": if (this.hasStatus(target, "burn")) this.dealStatusDamage(target, Math.round(this.getStatusValue(target, "burn")), "燃料投下"); break;
      case "wildfire": this.enemies.filter((e) => e !== target && this.hasStatus(target, "burn")).forEach((e) => apply(e, "burn", 3, 7)); break;
      case "ashenize": if (this.hasStatus(target, "burn")) { target.def = Math.max(0, Math.round((target.def - 2) * 10) / 10); this.log(`${target.id}のDEF低下`); } break;
      case "self-ignite": this.player.atk += 4; apply(this.player, "burn", 3, 3); this.log("自己発火でATK上昇"); break;
      case "searing-focus": if (this.hasStatus(target, "freeze")) { damageTo(target, 2.8, "fire"); this.removeStatus(target, "freeze"); } else damageTo(target, 1.5, "fire"); break;
      case "ice-lance": damageTo(target, 1.25, "ice"); apply(target, "freeze", 3, 0.2); break;
      case "frost-bind": if (this.hasStatus(target, "freeze")) { target.atk = Math.max(1, target.atk - 2); this.log(`${target.id}のATK低下`); } break;
      case "cooling-barrier": this.player.temp.barrier = 0.4; this.log("冷却障壁展開"); break;
      case "absolute-zero": if (target.hp / target.maxHp <= 0.35 || Math.random() < 0.35) apply(target, "freeze", 3, 0.35); break;
      case "ice-crush": damageTo(target, this.hasStatus(target, "freeze") ? 2.5 : 1.2, "ice"); break;
      case "thunder": damageTo(target, 1.25, "lightning"); apply(target, "shock", 3, 0.15); break;
      case "chain-lightning": this.enemies.filter((e) => this.hasStatus(e, "shock")).forEach((e) => damageTo(e, 1.0, "lightning")); break;
      case "neural-disrupt": apply(target, "shock", 2, 0.1); target.temp.actionPenalty = 0.4; this.log(`${target.id}の行動率低下`); break;
      case "charged-weapon": this.log("帯電武装を起動（通常攻撃に雷追加）"); break;
      case "discharge": {
        const shocked = this.enemies.filter((e) => this.hasStatus(e, "shock"));
        shocked.forEach((e) => { damageTo(e, 1.4, "lightning"); this.removeStatus(e, "shock"); });
        break;
      }
      case "status-compress": this.enemies.forEach((e) => e.statuses.forEach((s) => { s.duration += 1; })); this.log("敵状態異常を延長"); break;
      case "status-amp": this.player.temp.statusAmp = true; this.log("次回状態異常効果2倍"); break;
      case "status-convert":
        if (this.hasStatus(target, "burn")) { this.removeStatus(target, "burn"); apply(target, "bleed", 3, 0.03); }
        else if (this.hasStatus(target, "bleed")) { this.removeStatus(target, "bleed"); apply(target, "burn", 3, 8); }
        break;
      case "corrosion": {
        const n = target.statuses.length;
        target.def = Math.max(0, Math.round((target.def - n) * 10) / 10);
        this.log(`腐食で${target.id} DEF-${n}`);
        break;
      }
      case "resist-break": target.temp.noResist = true; this.log(`${target.id}の耐性を無効化`); break;
      case "focus": this.restoreMp(20 * overcastMul, "集中"); break;
      case "overcast": this.player.temp.overcast = true; this.log("過剰詠唱: 次スキル威力&コスト2倍"); break;
      case "iron-wall": this.player.temp.ironWall = true; this.log("鉄壁: 次の被ダメ大幅軽減"); break;
      case "hemostasis": this.removeStatus(this.player, "bleed"); this.healPlayer(30, "血止め"); break;
      case "element-invert": {
        const options = enemyElements.filter((el) => el !== target.element);
        target.element = options[Math.floor(Math.random() * options.length)];
        this.log(`${target.id}の属性を変更`);
        break;
      }
      case "resonance-break": target.temp.skillBlocked = true; this.log(`${target.id}の固有スキルを無効化`); break;
      case "time-bomb": target.temp.timeBomb = { turn: 3 }; this.log(`${target.id}に時限爆弾を設置`); break;
      case "doom-design": {
        const kinds = new Set(target.statuses.map((s) => s.type));
        if (kinds.size >= 3) this.hitTarget(target, Math.round(target.maxHp * 0.9), "プレイヤー", "physical", "終焉設計");
        else this.log("状態異常が足りない");
        break;
      }
      default:
        this.log("このスキルはパッシブです。");
    }

    this.player.temp.statusAmp = false;
  }

  enemyTurn() {
    if (!this.enemies.length) return this.spawnEnemy();
    const attacker = this.enemies[Math.floor(Math.random() * this.enemies.length)];
    const skipChance = attacker.temp.actionPenalty || 0;
    if (Math.random() < skipChance) return this.log(`${attacker.id}は神経攪乱で行動失敗`);

    const useSkill = !attacker.temp.skillBlocked && Math.random() < 0.35;
    if (useSkill) return attacker.enemySkill.effect(this, attacker);

    let attackMult = 1;
    if (attacker.enemySkill.id === "execution-instinct" && this.player.hp / this.player.maxHp < 0.4) attackMult *= 1.4;
    if (attacker.enemySkill.id === "overload" && this.player.mp / this.player.maxMp > 0.6) attackMult *= 1.25;
    if (attacker.enemySkill.id === "depletion-hunt" && this.player.mp === 0) attackMult *= 1.3;
    if (attacker.enemySkill.id === "rampage" && attacker.hp / attacker.maxHp < 0.35) attackMult *= 1.2;
    if (attacker.enemySkill.id === "abnormal-proliferation") attackMult *= 1 + this.player.statuses.length * 0.05;
    if (attacker.temp.spreadingFury) {
      const burningCount = this.enemies.filter((e) => this.hasStatus(e, "burn")).length + (this.hasStatus(this.player, "burn") ? 1 : 0);
      attackMult *= 1 + burningCount * 0.05;
    }
    const damage = this.calculateDamage(attacker.atk * attackMult, this.player.def, this.player, "enemy", attacker.element);
    this.hitPlayer(damage, attacker, "通常攻撃");

    if (attacker.temp.extraAction) {
      attacker.temp.extraAction = 0;
      const extraDamage = this.calculateDamage(attacker.atk * 0.8, this.player.def, this.player, "enemy", attacker.element);
      this.hitPlayer(extraDamage, attacker, "過熱追撃");
    }
    if (attacker.temp.electroAccel && this.enemies.some((e) => this.hasStatus(e, "shock"))) {
      const accelDamage = this.calculateDamage(attacker.atk * 0.75, this.player.def, this.player, "enemy", attacker.element);
      this.hitPlayer(accelDamage, attacker, "電磁加速追撃");
    }
  }

  calculateDamage(rawAtk, targetDef, defender, attackerType, element = "physical", explicitTarget = null) {
    const attackerFreezePenalty = attackerType === "player" ? this.getFreezePenalty(this.player) : 1;
    let adjustedDef = targetDef;
    if (attackerType === "enemy" && this.getDebuffValue("defDown") > 0) {
      adjustedDef = Math.max(0, adjustedDef - this.getDebuffValue("defDown"));
    }
    if (attackerType === "player") {
      const target = explicitTarget || defender;
      if (target.enemySkill.id === "ice-armor" && this.hasStatus(target, "freeze")) {
        adjustedDef += 4;
      }
    }
    const base = Math.max(1, rawAtk * attackerFreezePenalty - adjustedDef);

    let dmg = base * this.getShockMultiplier(defender);
    if (attackerType === "player") {
      const target = explicitTarget || defender;
      if (this.getDebuffMultiplier("damageDealt", 1) !== 1) dmg *= this.getDebuffMultiplier("damageDealt", 1);
      if (!this.player.temp.disableSynergy) {
        if (this.hasSkill("pursuit-stance") && this.hasStatus(target, "bleed")) dmg *= 1.35;
        if (this.hasSkill("vital-read") && this.hasStatus(target, "shock") && Math.random() < 0.45) dmg *= 1.8;
        if (this.hasSkill("overcurrent") && this.hasStatus(target, "shock")) dmg *= 1.2;
        if (this.hasSkill("thunder-resonance")) {
          const shockedCount = this.enemies.filter((e) => this.hasStatus(e, "shock")).length;
          dmg *= 1 + shockedCount * 0.08;
        }
      }
      if (target.enemySkill.id === "element-shell" && element === target.element) dmg *= 0.75;
      if (target.enemySkill.id === "ash-barrier" && (this.hasStatus(target, "burn") || target.temp.ashBarrier > 0)) dmg *= 0.8;
      if (target.enemySkill.id === "rampage" && target.hp / target.maxHp < 0.35) dmg *= 0.8;
    } else {
      if (this.player.temp.barrier) dmg *= 1 - this.player.temp.barrier;
      if (this.player.temp.ironWall) dmg *= 0.25;
      if (this.hasSkill("fire-ice-guard") && ["fire", "ice"].includes(element)) dmg *= 0.75;
      if (this.hasSkill("adaptive-evo")) dmg *= 1 - (this.player.passiveResist[element] || 0);
      if (this.getDebuffMultiplier("damageTaken", 1) !== 1) dmg *= this.getDebuffMultiplier("damageTaken", 1);
    }

    return Math.max(1, Math.round(dmg));
  }

  hitTarget(target, damage, sourceName, element, actionLabel) {
    target.hp = Math.max(0, target.hp - damage);
    target.turnsSinceDamaged = 0;
    this.log(`${sourceName}の${actionLabel} (${CONFIG.elementNames[element]}): ${damage}ダメージ -> ${target.id}`);
    if (target.enemySkill.id === "counter-shell") {
      const counterDamage = Math.max(1, Math.round(damage * 0.3));
      this.player.hp = Math.max(0, this.player.hp - counterDamage);
      this.log(`${target.id}の反撃殻: ${counterDamage}ダメージ反射`);
    }
    if (target.enemySkill.id === "thunder-reflect" && element === "lightning") {
      const reflect = Math.max(1, Math.round(damage * 0.25));
      this.player.hp = Math.max(0, this.player.hp - reflect);
      this.log(`${target.id}の雷鳴反射: ${reflect}ダメージ`);
    }
  }

  hitPlayer(damage, attacker, actionLabel) {
    this.player.hp = Math.max(0, this.player.hp - damage);
    this.log(`${attacker.id}の${actionLabel} (${CONFIG.elementNames[attacker.element]}): プレイヤーに${damage}ダメージ`);

    if (this.hasSkill("counter-stance") && this.player.temp.counter && Math.random() < 0.45) {
      const counter = Math.round(this.player.atk * 1.2);
      attacker.hp = Math.max(0, attacker.hp - counter);
      this.log(`反撃態勢発動: ${attacker.id}へ${counter}反撃`);
    }
    if (this.hasSkill("adaptive-evo")) this.player.passiveResist[attacker.element] = Math.min(0.35, (this.player.passiveResist[attacker.element] || 0) + 0.03);
    if (this.hasSkill("lightning-evasion") && this.hasStatus(this.player, "shock") && Math.random() < 0.25) {
      this.healPlayer(damage, "雷避け");
    }
  }

  getShockMultiplier(entity) {
    return 1 + entity.statuses.filter((s) => s.type === "shock").reduce((sum, s) => sum + s.value, 0);
  }

  getFreezePenalty(entity) {
    return Math.max(0.35, 1 - entity.statuses.filter((s) => s.type === "freeze").reduce((sum, s) => sum + s.value, 0));
  }

  applyStatus(target, type, duration, value, isPlayerSource) {
    if (target === this.player && type === "freeze" && this.hasSkill("cold-resist")) return this.log("寒冷耐性で凍結無効");
    if (target !== this.player) {
      if (target.enemySkill.id === "abnormal-resistance") {
        duration = Math.max(1, Math.ceil(duration * 0.5));
        value *= 0.5;
      }
      if (target.enemySkill.id === "adaptive-evolution") {
        target.temp.statusCounts ??= {};
        target.temp.statusCounts[type] = (target.temp.statusCounts[type] || 0) + 1;
        if (target.temp.statusCounts[type] >= 2) {
          this.log(`${target.id}は${STATUS_NAMES[type]}に適応した。`);
          return;
        }
      }
      if (target.enemySkill.id === "abnormal-reversal" && isPlayerSource) {
        this.applyStatus(this.player, type, duration, value, false);
      }
    }
    target.statuses.push({ type, duration, value });
    const owner = target === this.player ? "プレイヤー" : target.id;
    this.log(`${owner}に状態異常 ${STATUS_NAMES[type]} を付与 (${duration}T)`);
    if (isPlayerSource && this.hasSkill("resist-break") && target.temp.noResist) target.temp.noResist = false;
  }

  hasStatus(entity, type) {
    return entity.statuses.some((s) => s.type === type);
  }

  getStatusValue(entity, type) {
    return entity.statuses.filter((s) => s.type === type).reduce((sum, s) => sum + s.value, 0);
  }

  removeStatus(entity, type) {
    entity.statuses = entity.statuses.filter((s) => s.type !== type);
  }

  applyTurnStatuses(side) {
    const targets = side === "player" ? [this.player] : this.enemies;
    targets.forEach((entity) => {
      entity.statuses.forEach((status) => {
        if (status.type === "bleed") {
          if (this.hasSkill("bleed-spread") && entity !== this.player) status.value += 0.005;
          this.dealStatusDamage(entity, Math.max(1, Math.round((entity.maxHp || this.player.maxHp) * status.value)), "出血");
        }
        if (status.type === "burn") {
          let burnDamage = Math.max(1, Math.round(status.value));
          if (this.hasEnemySkill("cold-domination")) burnDamage = Math.max(1, Math.round(burnDamage * 0.6));
          this.dealStatusDamage(entity, burnDamage, "炎上");
        }
        status.duration -= 1;
        if (entity === this.player && status.type === "freeze" && status.duration <= 0 && this.hasEnemySkill("frostbite")) {
          this.dealStatusDamage(entity, 12, "凍傷");
        }
      });

      if (entity === this.player) {
        this.player.debuffs.forEach((debuff) => {
          debuff.duration -= 1;
        });
        this.player.debuffs = this.player.debuffs.filter((debuff) => debuff.duration > 0);
        Object.keys(this.player.sealedSkills).forEach((skillId) => {
          this.player.sealedSkills[skillId] -= 1;
          if (this.player.sealedSkills[skillId] <= 0) delete this.player.sealedSkills[skillId];
        });
        if (this.player.temp.attackElementOverride) {
          this.player.temp.attackElementOverride.duration -= 1;
          if (this.player.temp.attackElementOverride.duration <= 0) this.player.temp.attackElementOverride = null;
        }
        if (this.player.temp.disableSynergy) {
          this.player.temp.disableSynergy -= 1;
        }
        if (this.player.temp.collapseTimer) {
          this.player.temp.collapseTimer -= 1;
          if (this.player.temp.collapseTimer <= 0) {
            this.applyStatus(this.player, "bleed", 3, 0.03, false);
            this.applyStatus(this.player, "burn", 3, 8, false);
            this.applyStatus(this.player, "shock", 3, 0.15, false);
            this.applyStatus(this.player, "freeze", 2, 0.2, false);
            this.player.temp.collapseTimer = null;
          }
        }
      }

      if (entity === this.player && this.hasEnemySkill("corrosive-erosion") && entity.statuses.length) {
        this.player.def = Math.max(0, Math.round((this.player.def - 0.2) * 10) / 10);
        this.log("腐食侵食でDEF低下");
      }

      if (entity !== this.player && entity.temp.timeBomb) {
        entity.temp.timeBomb.turn -= 1;
        if (entity.temp.timeBomb.turn <= 0) {
          ["bleed", "burn", "shock", "freeze"].forEach((t) => { if (this.hasStatus(entity, t)) this.dealStatusDamage(entity, 12, "時限爆弾"); });
          delete entity.temp.timeBomb;
        }
      }

      entity.statuses = entity.statuses.filter((s) => s.duration > 0);
      if (entity.temp) {
        entity.temp.actionPenalty = 0;
        entity.temp.skillBlocked = false;
        if (entity.temp.spreadingFury) entity.temp.spreadingFury -= 1;
        if (entity.temp.ashBarrier) entity.temp.ashBarrier -= 1;
        if (entity.temp.electroAccel) entity.temp.electroAccel -= 1;
      }
      if (entity !== this.player && entity.enemySkill.id === "regen-factor" && entity.statuses.length === 0) {
        const heal = Math.max(2, Math.round(entity.maxHp * 0.04));
        entity.hp = Math.min(entity.maxHp, entity.hp + heal);
        this.log(`${entity.id}の再生因子でHP+${heal}`);
      }
    });

    if (side === "player") this.player.temp.barrier = 0;
    this.cleanupDeadEnemies();
  }

  dealStatusDamage(entity, damage, label) {
    if (entity === this.player) {
      this.player.hp = Math.max(0, this.player.hp - damage);
      return this.log(`プレイヤーは${label}で${damage}ダメージ`);
    }
    entity.hp = Math.max(0, entity.hp - damage);
    entity.turnsSinceDamaged = 0;
    this.log(`${entity.id}は${label}で${damage}ダメージ`);
  }

  restoreMp(amount, src) {
    this.player.mp = Math.min(this.player.maxMp, this.player.mp + amount);
    this.log(`${src}: MP+${amount}`);
  }

  cleanupDeadEnemies() {
    this.enemies.forEach((enemy) => {
      if (enemy.hp <= 0 && enemy.enemySkill.id === "tenacity" && !enemy.temp.tenacityUsed) {
        enemy.hp = 1;
        enemy.temp.tenacityUsed = true;
        this.log(`${enemy.id}の執念で踏みとどまった！`);
      }
    });
    const dead = this.enemies.filter((e) => e.hp <= 0);
    dead.forEach((enemy) => {
      if (enemy.enemySkill.id === "self-destruct-core") {
        const damage = Math.max(8, Math.round(enemy.level * 3));
        this.player.hp = Math.max(0, this.player.hp - damage);
        this.applyStatus(this.player, "burn", 3, 8, false);
        this.log(`${enemy.id}の自爆炉心でプレイヤーに${damage}ダメージ`);
      }
      this.player.kills += 1;
      this.applyReward(enemy);
      this.grantSkill(enemy);
      if (this.hasSkill("blood-feast")) {
        const heal = this.hasStatus(enemy, "bleed") ? 24 : 12;
        this.healPlayer(heal, "血祭り");
      }
      if (this.hasSkill("infection-burst") && enemy.statuses.length) {
        this.enemies.filter((e) => e.id !== enemy.id).forEach((e) => {
          enemy.statuses.slice(0, 2).forEach((s) => this.applyStatus(e, s.type, 2, s.value, true));
        });
      }
      this.log(`${enemy.id} を撃破！`);
    });

    this.enemies = this.enemies.filter((e) => e.hp > 0);
    while (this.enemies.length < CONFIG.maxEnemies) this.spawnEnemy();
    if (!this.enemies.find((e) => e.id === this.selectedEnemyId)) this.selectedEnemyId = this.enemies[0]?.id ?? null;
  }

  applyReward(enemy) {
    const level = enemy.level;
    if (enemy.rewardStat === "hp") {
      const gain = 10 * level;
      this.player.maxHp += gain;
      this.player.hp += gain;
      this.log(`報酬: 最大HP +${gain}`);
    }
    if (enemy.rewardStat === "atk") {
      const gain = level;
      this.player.atk += gain;
      this.log(`報酬: ATK +${gain}`);
    }
    if (enemy.rewardStat === "def") {
      const gain = Math.round(0.5 * level * 10) / 10;
      this.player.def = Math.round((this.player.def + gain) * 10) / 10;
      this.log(`報酬: DEF +${gain}`);
    }
  }

  grantSkill(enemy) {
    const notOwned = PLAYER_SKILLS.filter((s) => !this.hasSkill(s.id));
    if (!notOwned.length) return this.log(`${enemy.id}から新スキル獲得なし。`);
    const gained = notOwned[Math.floor(Math.random() * notOwned.length)];
    if (gained.kind === "active") {
      const activeSkills = this.player.skills.filter((s) => s.kind === "active");
      if (activeSkills.length >= 6) {
        const gainedDesc = SKILL_DESCRIPTIONS[gained.id] || "説明なし";
        const replace = window.confirm(`${gained.name} を獲得しました。${gainedDesc}\nアクティブスキルは6つまでです。入れ替えますか？`);
        if (!replace) {
          this.log(`${gained.name} を見送りました。`);
          return;
        }
        const options = activeSkills.map((s, idx) => `${idx + 1}:${s.name}`).join(" / ");
        const input = window.prompt(`入れ替えるスキル番号を選んでください (${options})`);
        const index = Number.parseInt(input ?? "", 10) - 1;
        if (Number.isNaN(index) || index < 0 || index >= activeSkills.length) {
          this.log("入れ替えに失敗したため獲得を見送りました。");
          return;
        }
        const toReplace = activeSkills[index];
        this.player.skills = this.player.skills.filter((s) => s.id !== toReplace.id);
        this.player.skills.push(gained);
        this.log(`${enemy.id}からスキル獲得: ${gained.name} (MP:${gained.mpCost}) / ${toReplace.name} を入れ替え`);
        return;
      }
    }
    this.player.skills.push(gained);
    this.log(`${enemy.id}からスキル獲得: ${gained.name}${gained.kind === "active" ? ` (MP:${gained.mpCost})` : " [パッシブ]"}`);
  }

  despawnUnattackedEnemies() {
    const vanished = [];
    this.enemies.forEach((enemy) => {
      enemy.turnsSinceDamaged += 1;
      if (enemy.turnsSinceDamaged >= CONFIG.despawnTurns) vanished.push(enemy);
    });
    if (!vanished.length) return;
    this.enemies = this.enemies.filter((enemy) => !vanished.includes(enemy));
    vanished.forEach((enemy) => this.log(`${enemy.id} は15ターン攻撃されず消滅。`));
    while (this.enemies.length < CONFIG.maxEnemies) this.spawnEnemy();
    if (!this.enemies.find((e) => e.id === this.selectedEnemyId)) this.selectedEnemyId = this.enemies[0]?.id ?? null;
  }

  checkGameOver() {
    if (this.player.hp > 0) return;
    this.log(`ゲームオーバー。撃破数: ${this.player.kills}`);
    this.basicAttackBtn.disabled = true;
  }

  render() {
    this.playerStatsEl.innerHTML = `<div class="stats-grid"><p>ターン: ${this.turn}</p><p>撃破数: ${this.player.kills}</p><p>HP: ${this.player.hp} / ${this.player.maxHp}</p><p>MP: ${this.player.mp} / ${this.player.maxMp}</p><p>ATK: ${this.player.atk}</p><p>DEF: ${this.player.def}</p><p>取得スキル: ${this.player.skills.length}/50</p></div>`;
    const st = this.player.statuses.map((s) => `${STATUS_NAMES[s.type]}(${s.duration})`).join(" / ");
    this.statusArea.innerHTML = `<p>状態異常: ${st || "なし"}</p>`;

    if (this.passiveSkillsEl) {
      const passives = this.player.skills.filter((s) => s.kind === "passive");
      const listItems = passives.length
        ? passives.map((skill) => `<li><strong>${skill.name}</strong> - ${SKILL_DESCRIPTIONS[skill.id] || "説明なし"}</li>`).join("")
        : "<li>未取得</li>";
      this.passiveSkillsEl.innerHTML = `<h3>パッシブスキル</h3><ul>${listItems}</ul>`;
    }

    this.enemyListEl.innerHTML = "";
    this.enemies.forEach((enemy) => {
      const card = document.createElement("article");
      card.className = `enemy-card ${enemy.element} ${enemy.id === this.selectedEnemyId ? "selected" : ""}`;
      const statuses = enemy.statuses.map((s) => `${STATUS_NAMES[s.type]}(${s.duration})`).join(" / ") || "なし";
      card.innerHTML = `<p><strong>${enemy.id}</strong> Lv${enemy.level} (${CONFIG.elementNames[enemy.element]})</p><p>HP: ${enemy.hp} / ${enemy.maxHp}</p><p>ATK: ${enemy.atk} | DEF: ${enemy.def}</p><p>報酬: ${enemy.rewardStat.toUpperCase()}</p><p>固有スキル: ${enemy.enemySkill.name}</p><p class="enemy-skill-desc">${enemy.enemySkill.description}</p><p>状態異常: ${statuses}</p><p>消滅まで: ${CONFIG.despawnTurns - enemy.turnsSinceDamaged}T</p>`;
      card.addEventListener("click", () => {
        this.selectedEnemyId = enemy.id;
        this.render();
      });
      this.enemyListEl.appendChild(card);
    });

    const activeSkills = this.player.skills.filter((s) => s.kind === "active");
    this.renderSkillButtons(activeSkills);
  }

  log(message) {
    const p = document.createElement("p");
    p.textContent = message;
    this.logEl.prepend(p);
    while (this.logEl.childElementCount > 220) this.logEl.lastElementChild.remove();
  }

  renderSkillButtons(activeSkills) {
    if (!this.activeSkillButtonsEl) return;
    this.activeSkillButtonsEl.innerHTML = "";
    const buttons = activeSkills.slice(0, 6);
    buttons.forEach((skill) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "skill-button";
      const desc = SKILL_DESCRIPTIONS[skill.id] || "説明なし";
      button.innerHTML = `<strong>${skill.name}</strong><span>MP:${skill.mpCost} / ${desc}</span>`;
      button.addEventListener("click", () => this.playerAction("skill", skill.id));
      this.activeSkillButtonsEl.appendChild(button);
    });
    for (let i = buttons.length; i < 6; i += 1) {
      const empty = document.createElement("div");
      empty.className = "skill-button";
      empty.innerHTML = "<strong>空きスロット</strong><span>撃破でスキルを獲得</span>";
      this.activeSkillButtonsEl.appendChild(empty);
    }
  }
}

new Game();
