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

const ENEMY_SKILLS = [
  { id: "enemy-slash", name: "乱撃", effect: (g, e) => g.hitPlayer(g.calculateDamage(e.atk * 1.3, g.player.def, g.player, "enemy"), e, "敵スキル:乱撃") },
  { id: "enemy-ember", name: "焦熱", effect: (g, e) => { g.hitPlayer(g.calculateDamage(e.atk * 1.2 + 5, g.player.def, g.player, "enemy"), e, "敵スキル:焦熱"); g.applyStatus(g.player, "burn", 3, 8, false); } },
  { id: "enemy-frost", name: "凍気", effect: (g, e) => { g.hitPlayer(g.calculateDamage(e.atk * 1.1, g.player.def, g.player, "enemy"), e, "敵スキル:凍気"); g.applyStatus(g.player, "freeze", 2, 0.15, false); } },
  { id: "enemy-shock", name: "雷撃", effect: (g, e) => { g.hitPlayer(g.calculateDamage(e.atk * 1.15, g.player.def, g.player, "enemy"), e, "敵スキル:雷撃"); g.applyStatus(g.player, "shock", 2, 0.15, false); } },
];

class Game {
  constructor() {
    this.player = {
      ...CONFIG.player,
      skills: [],
      kills: 0,
      statuses: [],
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
    this.basicAttackBtn = document.getElementById("basicAttackBtn");

    this.wireEvents();
    this.bootstrapEnemies();
    this.render();
    this.log("ゲーム開始。敵を選んで攻撃してください。");
  }

  hasSkill(id) {
    return this.player.skills.some((s) => s.id === id);
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
      maxHp: Math.round(5 * scale * a),
      hp: Math.round(5 * scale * a),
      atk: Math.max(0.5, Math.round(0.5 * scale * b)),
      def: Math.round(0.25 * scale * c * 10) / 10,
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
      this.hitTarget(target, damage, "プレイヤー", this.hasSkill("charged-weapon") ? "lightning" : "physical", "通常攻撃");
      if (this.hasSkill("charged-weapon")) this.applyStatus(target, "shock", 2, 0.1, true);
      if (this.hasSkill("mana-siphon") && target.statuses.length) this.restoreMp(5, "魔力吸収");
    } else {
      const selectedId = chosenSkillId;
      const selected = PLAYER_SKILLS.find((s) => s.id === selectedId && s.kind === "active");
      if (!selected || !this.hasSkill(selected.id)) return this.log("使用可能なアクティブスキルがありません。");
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
    }

    this.cleanupDeadEnemies();
    this.enemyTurn();
    this.applyTurnStatuses("enemies");
    this.despawnUnattackedEnemies();

    const mpRegen = 10 + (this.hasSkill("calm-mind") ? 5 : 0);
    if (!mpSpent) this.restoreMp(mpRegen, "自然回復");
    if (!mpSpent && this.hasSkill("self-repair")) {
      const heal = Math.max(2, Math.round(this.player.maxHp * 0.02));
      this.player.hp = Math.min(this.player.maxHp, this.player.hp + heal);
      this.log(`自己修復でHP+${heal}`);
    }

    this.player.temp = { ...this.player.temp, overcast: false, statusAmp: false, ironWall: false, counter: false };
    this.turn += 1;
    this.render();
    this.checkGameOver();
  }

  computeSkillCost(baseCost) {
    let cost = baseCost;
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
      case "hemostasis": this.removeStatus(this.player, "bleed"); this.player.hp = Math.min(this.player.maxHp, this.player.hp + 30); this.log("血止めで回復"); break;
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

    const damage = this.calculateDamage(attacker.atk, this.player.def, this.player, "enemy", attacker.element);
    this.hitPlayer(damage, attacker, "通常攻撃");
  }

  calculateDamage(rawAtk, targetDef, defender, attackerType, element = "physical", explicitTarget = null) {
    const attackerFreezePenalty = attackerType === "player" ? this.getFreezePenalty(this.player) : 1;
    const base = Math.max(1, rawAtk * attackerFreezePenalty - targetDef);

    let dmg = base * this.getShockMultiplier(defender);
    if (attackerType === "player") {
      const target = explicitTarget || defender;
      if (this.hasSkill("pursuit-stance") && this.hasStatus(target, "bleed")) dmg *= 1.35;
      if (this.hasSkill("vital-read") && this.hasStatus(target, "shock") && Math.random() < 0.45) dmg *= 1.8;
      if (this.hasSkill("overcurrent") && this.hasStatus(target, "shock")) dmg *= 1.2;
      if (this.hasSkill("thunder-resonance")) {
        const shockedCount = this.enemies.filter((e) => this.hasStatus(e, "shock")).length;
        dmg *= 1 + shockedCount * 0.08;
      }
    } else {
      if (this.player.temp.barrier) dmg *= 1 - this.player.temp.barrier;
      if (this.player.temp.ironWall) dmg *= 0.25;
      if (this.hasSkill("fire-ice-guard") && ["fire", "ice"].includes(element)) dmg *= 0.75;
      if (this.hasSkill("adaptive-evo")) dmg *= 1 - (this.player.passiveResist[element] || 0);
    }

    return Math.max(1, Math.round(dmg));
  }

  hitTarget(target, damage, sourceName, element, actionLabel) {
    target.hp = Math.max(0, target.hp - damage);
    target.turnsSinceDamaged = 0;
    this.log(`${sourceName}の${actionLabel} (${CONFIG.elementNames[element]}): ${damage}ダメージ -> ${target.id}`);
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
      this.player.hp = Math.min(this.player.maxHp, this.player.hp + damage);
      this.log("雷避け発動: ダメージを回避");
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
        if (status.type === "burn") this.dealStatusDamage(entity, Math.max(1, Math.round(status.value)), "炎上");
        status.duration -= 1;
      });

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
    const dead = this.enemies.filter((e) => e.hp <= 0);
    dead.forEach((enemy) => {
      this.player.kills += 1;
      this.applyReward(enemy);
      this.grantSkill(enemy);
      if (this.hasSkill("blood-feast")) {
        const heal = this.hasStatus(enemy, "bleed") ? 24 : 12;
        this.player.hp = Math.min(this.player.maxHp, this.player.hp + heal);
        this.log(`血祭りでHP+${heal}`);
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
        const replace = window.confirm(`${gained.name} を獲得しました。アクティブスキルは6つまでです。入れ替えますか？`);
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

    this.enemyListEl.innerHTML = "";
    this.enemies.forEach((enemy) => {
      const card = document.createElement("article");
      card.className = `enemy-card ${enemy.element} ${enemy.id === this.selectedEnemyId ? "selected" : ""}`;
      const statuses = enemy.statuses.map((s) => `${STATUS_NAMES[s.type]}(${s.duration})`).join(" / ") || "なし";
      card.innerHTML = `<p><strong>${enemy.id}</strong> Lv${enemy.level} (${CONFIG.elementNames[enemy.element]})</p><p>HP: ${enemy.hp} / ${enemy.maxHp}</p><p>ATK: ${enemy.atk} | DEF: ${enemy.def}</p><p>報酬: ${enemy.rewardStat.toUpperCase()}</p><p>固有スキル: ${enemy.enemySkill.name}</p><p>状態異常: ${statuses}</p><p>消滅まで: ${CONFIG.despawnTurns - enemy.turnsSinceDamaged}T</p>`;
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
