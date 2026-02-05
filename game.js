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

const skillPool = [
  {
    id: "power-strike",
    name: "パワーストライク",
    mpCost: 20,
    description: "威力2倍で攻撃し、低確率で出血を付与",
    use: ({ game, target }) => {
      const damage = game.calculateDamage(game.player.atk * 2, target.def, target, "player");
      game.hitTarget(target, damage, "プレイヤー", target.element, "スキル:パワーストライク");
      if (Math.random() < 0.35) {
        game.applyStatus(target, "bleed", 4, 0.03);
      }
    },
  },
  {
    id: "flame-burst",
    name: "フレイムバースト",
    mpCost: 25,
    description: "炎ダメージ+炎上付与",
    use: ({ game, target }) => {
      const damage = game.calculateDamage(game.player.atk * 1.4 + 8, target.def, target, "player");
      game.hitTarget(target, damage, "プレイヤー", "fire", "スキル:フレイムバースト");
      game.applyStatus(target, "burn", 4, 10);
    },
  },
  {
    id: "ice-bind",
    name: "アイスバインド",
    mpCost: 20,
    description: "氷ダメージ+凍結付与",
    use: ({ game, target }) => {
      const damage = game.calculateDamage(game.player.atk * 1.25 + 6, target.def, target, "player");
      game.hitTarget(target, damage, "プレイヤー", "ice", "スキル:アイスバインド");
      game.applyStatus(target, "freeze", 3, 0.2);
    },
  },
  {
    id: "thunder-spear",
    name: "サンダースピア",
    mpCost: 25,
    description: "雷ダメージ+感電付与",
    use: ({ game, target }) => {
      const damage = game.calculateDamage(game.player.atk * 1.3 + 10, target.def, target, "player");
      game.hitTarget(target, damage, "プレイヤー", "lightning", "スキル:サンダースピア");
      game.applyStatus(target, "shock", 3, 0.15);
    },
  },
];

class Game {
  constructor() {
    this.player = {
      ...CONFIG.player,
      skills: [],
      kills: 0,
      statuses: [],
    };

    this.turn = 1;
    this.enemyLevel = 1;
    this.enemies = [];
    this.selectedEnemyId = null;

    this.playerStatsEl = document.getElementById("playerStats");
    this.enemyListEl = document.getElementById("enemyList");
    this.logEl = document.getElementById("log");
    this.skillSelect = document.getElementById("skillSelect");
    this.statusArea = document.getElementById("statusArea");
    this.basicAttackBtn = document.getElementById("basicAttackBtn");
    this.useSkillBtn = document.getElementById("useSkillBtn");

    this.wireEvents();
    this.bootstrapEnemies();
    this.render();
    this.log("ゲーム開始。敵を選んで攻撃してください。");
  }

  wireEvents() {
    this.basicAttackBtn.addEventListener("click", () => this.playerAction("basic"));
    this.useSkillBtn.addEventListener("click", () => this.playerAction("skill"));
  }

  bootstrapEnemies() {
    for (let i = 0; i < CONFIG.maxEnemies; i += 1) this.spawnEnemy();
    this.selectedEnemyId = this.enemies[0]?.id ?? null;
  }

  spawnEnemy() {
    if (this.enemies.length >= CONFIG.maxEnemies) return;
    const level = this.enemyLevel;
    const [a, b, c] = this.randomWeightTriplet();
    const element = enemyElements[Math.floor(Math.random() * enemyElements.length)];
    const rewardStat = rewardStats[Math.floor(Math.random() * rewardStats.length)];
    const skill = skillPool[Math.floor(Math.random() * skillPool.length)];

    const enemy = {
      id: `E${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      level,
      maxHp: Math.round(10 * level * a),
      hp: Math.round(10 * level * a),
      atk: Math.max(1, Math.round(level * b)),
      def: Math.round(0.5 * level * c * 10) / 10,
      a,
      b,
      c,
      rewardStat,
      element,
      skill,
      statuses: [],
      turnsSinceDamaged: 0,
    };

    this.enemies.push(enemy);
    this.enemyLevel += 1;
    this.log(`Lv${enemy.level} ${CONFIG.elementNames[element]}属性の敵が出現。`);
  }

  randomWeightTriplet() {
    let tries = 0;
    while (tries < 4000) {
      const a = 0.5 + Math.random();
      const b = 0.5 + Math.random();
      const c = 3 - a - b;
      if (c >= 0.5 && c <= 1.5) return [a, b, c];
      tries += 1;
    }
    return [1, 1, 1];
  }

  playerAction(mode) {
    if (this.player.hp <= 0) return;
    const target = this.enemies.find((e) => e.id === this.selectedEnemyId);
    if (!target) {
      this.log("攻撃対象がいません。");
      return;
    }

    this.log(`--- ターン ${this.turn} ---`);
    this.applyTurnStatuses("player");
    let mpSpent = false;

    if (mode === "basic") {
      const damage = this.calculateDamage(this.player.atk, target.def, target, "player");
      this.hitTarget(target, damage, "プレイヤー", target.element, "通常攻撃");
    } else {
      const selectedSkillId = this.skillSelect.value;
      const skill = this.player.skills.find((s) => s.id === selectedSkillId);
      if (!skill) {
        this.log("使用可能なスキルがありません。");
        return;
      }
      if (this.player.mp < skill.mpCost) {
        this.log(`MP不足で ${skill.name} を使えない。`);
      } else {
        this.player.mp -= skill.mpCost;
        mpSpent = true;
        skill.use({ game: this, target });
      }
    }

    this.cleanupDeadEnemies();
    this.enemyTurn();
    this.applyTurnStatuses("enemies");
    this.despawnUnattackedEnemies();

    if (!mpSpent) {
      this.player.mp = Math.min(this.player.maxMp, this.player.mp + 10);
      this.log("MPが10回復。");
    }

    this.turn += 1;
    this.render();
    this.checkGameOver();
  }

  enemyTurn() {
    if (this.enemies.length === 0) {
      this.spawnEnemy();
      return;
    }

    const attacker = this.enemies[Math.floor(Math.random() * this.enemies.length)];
    const useSkill = Math.random() < 0.35;

    if (useSkill) {
      this.enemyUseSkill(attacker);
      return;
    }

    const damage = this.calculateDamage(attacker.atk, this.player.def, this.player, "enemy");
    this.hitPlayer(damage, attacker, "通常攻撃");
  }

  enemyUseSkill(attacker) {
    const skill = attacker.skill;
    const scaledPower = attacker.atk * (1.15 + attacker.level * 0.02);
    const damage = this.calculateDamage(scaledPower, this.player.def, this.player, "enemy");

    this.hitPlayer(damage, attacker, `敵スキル:${skill.name}`);

    if (skill.id === "flame-burst") this.applyStatus(this.player, "burn", 3, 8);
    if (skill.id === "ice-bind") this.applyStatus(this.player, "freeze", 2, 0.15);
    if (skill.id === "thunder-spear") this.applyStatus(this.player, "shock", 2, 0.15);
    if (skill.id === "power-strike" && Math.random() < 0.3) this.applyStatus(this.player, "bleed", 3, 0.02);
  }

  calculateDamage(rawAtk, targetDef, defender, attackerType) {
    const freezeMultiplier = attackerType === "player" ? this.getFreezePenalty(this.player) : this.getFreezePenalty(defender);
    const adjustedAtk = rawAtk * freezeMultiplier;

    const base = Math.max(1, adjustedAtk - targetDef);
    const shockMultiplier = this.getShockMultiplier(defender);
    return Math.max(1, Math.round(base * shockMultiplier));
  }

  getShockMultiplier(entity) {
    const shock = entity.statuses.filter((s) => s.type === "shock");
    const extra = shock.reduce((sum, s) => sum + s.value, 0);
    return 1 + extra;
  }

  getFreezePenalty(entity) {
    const freeze = entity.statuses.filter((s) => s.type === "freeze");
    const penalty = freeze.reduce((sum, s) => sum + s.value, 0);
    return Math.max(0.35, 1 - penalty);
  }

  hitTarget(target, damage, sourceName, element, actionLabel) {
    target.hp = Math.max(0, target.hp - damage);
    target.turnsSinceDamaged = 0;
    this.log(`${sourceName}の${actionLabel} (${CONFIG.elementNames[element]}): ${damage}ダメージ -> ${target.id}`);
  }

  hitPlayer(damage, attacker, actionLabel) {
    this.player.hp = Math.max(0, this.player.hp - damage);
    this.log(`${attacker.id}の${actionLabel} (${CONFIG.elementNames[attacker.element]}): プレイヤーに${damage}ダメージ`);
  }

  applyStatus(target, type, duration, value) {
    target.statuses.push({ type, duration, value });
    const owner = target === this.player ? "プレイヤー" : target.id;
    this.log(`${owner}に状態異常 ${this.statusToText(type)} を付与 (${duration}T)`);
  }

  applyTurnStatuses(side) {
    const targets = side === "player" ? [this.player] : this.enemies;
    targets.forEach((entity) => {
      entity.statuses.forEach((status) => {
        if (status.type === "bleed") {
          const maxHp = entity.maxHp ?? this.player.maxHp;
          const damage = Math.max(1, Math.round(maxHp * status.value));
          this.dealStatusDamage(entity, damage, "出血");
        }
        if (status.type === "burn") {
          const damage = Math.max(1, Math.round(status.value));
          this.dealStatusDamage(entity, damage, "炎上");
        }
        status.duration -= 1;
      });
      entity.statuses = entity.statuses.filter((s) => s.duration > 0);
    });
    this.cleanupDeadEnemies();
  }

  dealStatusDamage(entity, damage, label) {
    if (entity === this.player) {
      this.player.hp = Math.max(0, this.player.hp - damage);
      this.log(`プレイヤーは${label}で${damage}ダメージ`);
      return;
    }

    entity.hp = Math.max(0, entity.hp - damage);
    entity.turnsSinceDamaged = 0;
    this.log(`${entity.id}は${label}で${damage}ダメージ`);
  }

  cleanupDeadEnemies() {
    const dead = this.enemies.filter((e) => e.hp <= 0);
    dead.forEach((enemy) => {
      this.player.kills += 1;
      this.applyReward(enemy);
      this.grantSkill(enemy);
      this.log(`${enemy.id} を撃破！`);
    });

    this.enemies = this.enemies.filter((e) => e.hp > 0);
    while (this.enemies.length < CONFIG.maxEnemies) this.spawnEnemy();

    if (!this.enemies.find((e) => e.id === this.selectedEnemyId)) {
      this.selectedEnemyId = this.enemies[0]?.id ?? null;
    }
  }

  applyReward(enemy) {
    const scale = 1 + (enemy.level * (enemy.level - 1)) / 6;
    if (enemy.rewardStat === "hp") {
      const gain = Math.round(10 * scale);
      this.player.maxHp += gain;
      this.player.hp += gain;
      this.log(`報酬: 最大HP +${gain}`);
    }
    if (enemy.rewardStat === "atk") {
      const gain = Math.round(scale);
      this.player.atk += gain;
      this.log(`報酬: ATK +${gain}`);
    }
    if (enemy.rewardStat === "def") {
      const gain = Math.round(0.5 * scale * 10) / 10;
      this.player.def = Math.round((this.player.def + gain) * 10) / 10;
      this.log(`報酬: DEF +${gain}`);
    }
  }

  grantSkill(enemy) {
    const notOwned = skillPool.filter((s) => !this.player.skills.some((ps) => ps.id === s.id));
    if (notOwned.length === 0) {
      this.log(`${enemy.id}から新スキル獲得なし。`);
      return;
    }
    const gained = notOwned[Math.floor(Math.random() * notOwned.length)];
    this.player.skills.push(gained);
    this.log(`${enemy.id}からスキル獲得: ${gained.name} (消費MP:${gained.mpCost})`);
  }

  despawnUnattackedEnemies() {
    const vanished = [];
    this.enemies.forEach((enemy) => {
      enemy.turnsSinceDamaged += 1;
      if (enemy.turnsSinceDamaged >= CONFIG.despawnTurns) vanished.push(enemy);
    });

    if (vanished.length === 0) return;

    this.enemies = this.enemies.filter((enemy) => !vanished.includes(enemy));
    vanished.forEach((enemy) => this.log(`${enemy.id} は15ターン攻撃されず消滅。`));
    while (this.enemies.length < CONFIG.maxEnemies) this.spawnEnemy();
    if (!this.enemies.find((e) => e.id === this.selectedEnemyId)) this.selectedEnemyId = this.enemies[0]?.id ?? null;
  }

  checkGameOver() {
    if (this.player.hp > 0) return;
    this.log(`ゲームオーバー。撃破数: ${this.player.kills}`);
    this.basicAttackBtn.disabled = true;
    this.useSkillBtn.disabled = true;
  }

  statusToText(type) {
    return (
      {
        bleed: "出血",
        burn: "炎上",
        shock: "感電",
        freeze: "凍結",
      }[type] ?? type
    );
  }

  render() {
    this.renderPlayer();
    this.renderEnemies();
    this.renderSkills();
  }

  renderPlayer() {
    this.playerStatsEl.innerHTML = `
      <p>ターン: ${this.turn}</p>
      <p>撃破数: ${this.player.kills}</p>
      <p>HP: ${this.player.hp} / ${this.player.maxHp}</p>
      <p>MP: ${this.player.mp} / ${this.player.maxMp}</p>
      <p>ATK: ${this.player.atk}</p>
      <p>DEF: ${this.player.def}</p>
    `;

    const statuses = this.player.statuses.map((s) => `${this.statusToText(s.type)}(${s.duration})`).join(" / ");
    this.statusArea.innerHTML = `<p>状態異常: ${statuses || "なし"}</p>`;
  }

  renderEnemies() {
    this.enemyListEl.innerHTML = "";
    this.enemies.forEach((enemy) => {
      const card = document.createElement("article");
      card.className = `enemy-card ${enemy.element} ${enemy.id === this.selectedEnemyId ? "selected" : ""}`;
      const statuses = enemy.statuses.map((s) => `${this.statusToText(s.type)}(${s.duration})`).join(" / ") || "なし";
      card.innerHTML = `
        <p><strong>${enemy.id}</strong> Lv${enemy.level} (${CONFIG.elementNames[enemy.element]})</p>
        <p>HP: ${enemy.hp} / ${enemy.maxHp}</p>
        <p>ATK: ${enemy.atk} | DEF: ${enemy.def}</p>
        <p>報酬: ${enemy.rewardStat.toUpperCase()}</p>
        <p>固有スキル: ${enemy.skill.name}</p>
        <p>状態異常: ${statuses}</p>
        <p>消滅まで: ${CONFIG.despawnTurns - enemy.turnsSinceDamaged}T</p>
      `;
      card.addEventListener("click", () => {
        this.selectedEnemyId = enemy.id;
        this.renderEnemies();
      });
      this.enemyListEl.appendChild(card);
    });
  }

  renderSkills() {
    this.skillSelect.innerHTML = "";
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = this.player.skills.length ? "スキルを選択" : "スキル未所持";
    this.skillSelect.appendChild(placeholder);

    this.player.skills.forEach((skill) => {
      const opt = document.createElement("option");
      opt.value = skill.id;
      opt.textContent = `${skill.name} (MP:${skill.mpCost})`;
      this.skillSelect.appendChild(opt);
    });
  }

  log(message) {
    const p = document.createElement("p");
    p.textContent = message;
    this.logEl.prepend(p);
    while (this.logEl.childElementCount > 200) this.logEl.lastElementChild.remove();
  }
}

new Game();
