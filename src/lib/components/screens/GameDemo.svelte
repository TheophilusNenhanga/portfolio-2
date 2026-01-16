<script lang="ts">
	type Clothing = {
		sprite: string;
		defence: number;
		for: 'head' | 'chest' | 'legs';
		id: number;
	};

	type Avatar = {
		head: Clothing | null;
		chest: Clothing | null;
		legs: Clothing | null;

		health: number;
		defence: number;
		attack: number;
	};

	type Enemy = {
		sprite: string;
		health: number;
		defence: number;
		attack: number;
	};

	type Powerup = {
		sprite: string;
		effectTo: 'health' | 'defence' | 'attack';
		value: number;
		rarity: 'common' | 'uncommon' | 'rare';
		name: string;
	};

	let avatar = $state<Avatar>({
		head: null,
		chest: null,
		legs: null,
		health: 100,
		defence: 0,
		attack: 20
	});

	let mode = $state<'pre-encounter' | 'encounter' | 'post-encounter'>('pre-encounter');
	let win = $state<boolean>(false);

	const powerups = [
		{
			sprite:
				'https://cdn-media.glamira.com/media/product/newgeneration/view/1/sku/21193gisu1-round/diamond/diamond-zirconia_AAAAA/stone2/diamond-zirconia_AAAAA/stone3/diamond-zirconia_AAAAA/alloycolour/yellow.jpg',
			effectTo: 'health',
			value: 0.1,
			rarity: 'common',
			name: 'Ring of health'
		},
		{
			sprite:
				'https://static.diamondsfactory.com/image/product_v2/clrn07097/rf0122902/showcase/front/yy/di/0001.jpg',
			effectTo: 'defence',
			value: 0.1,
			rarity: 'common',
			name: 'Ring of defence'
		},
		{
			sprite:
				'https://ion.bluenile.com/sets/Jewelry/Photoshoot/Bluenile/BrioPackshot/Custom/BNS01xBNH01/BNS01xBNH01_RND/BNS01xBNH01_M1_RND_DIM_wht_0100CT_W_W/BNS01xBNH01_M1_RND_DIM_wht_0100CT_W_W.001.jpg',
			effectTo: 'attack',
			value: 0.1,
			rarity: 'common',
			name: 'Ring of attack'
		},
		{
			sprite:
				'https://media.tiffany.com/is/image/Tiffany/EcomItemL2/tiffany-1837circle-pendant-73130344_1062483_ED.jpg',
			effectTo: 'health',
			value: 0.2,
			rarity: 'uncommon',
			name: 'Amulet of health'
		},
		{
			sprite: 'https://spencediamonds.com/assets/29885-A.png',
			effectTo: 'defence',
			value: 0.2,
			rarity: 'uncommon',
			name: 'Amulet of defence'
		},
		{
			sprite:
				'https://cdn-media.glamira.com/media/product/newgeneration/view/1/sku/men-yarden/diamond/browndiamond_AAA/alloycolour/yellow.jpg',
			effectTo: 'attack',
			value: 0.3,
			rarity: 'rare',
			name: 'Amulet of attack'
		},
		{
			sprite:
				'https://media.debeers.com/i/debeers/E103343_70?fmt=auto&fmt.webp.qlt=65&fmt.jp2.qlt=40&fmt.jpeg.qlt=65&$new-plp-grid-desktop-1-1-3000-poi$',
			effectTo: 'health',
			value: 0.2,
			rarity: 'uncommon',
			name: 'Earring of health'
		},
		{
			sprite:
				'https://pilgrim.ca/cdn/shop/products/262312063_33fe1723-cc6f-4992-842b-f49006127b4e-208182_x1100.jpg?v=1689598133',
			effectTo: 'defence',
			value: 0.3,
			rarity: 'rare',
			name: 'Earring of defence'
		},
		{
			sprite:
				'https://asset.swarovski.com/images/$size_1450/t_swa103/b_rgb:ffffff,c_scale,dpr_1.0,f_auto,w_375/5646733_png_var2/una-drop-earrings--round-cut--white--gold-tone-plated-swarovski-5646733.png',
			effectTo: 'attack',
			value: 0.1,
			rarity: 'common',
			name: 'Earring of attack'
		}
	];

	const extraClothes: Clothing[] = [
		{
			sprite: 'https://www.girlswithgems.com/cdn/shop/files/kaftan.webp?v=1764809003&width=1000',
			for: 'chest',
			defence: 20,
			id: 3546789
		},
		{
			sprite: 'https://1861.ca/cdn/shop/files/anastriana-red-ES-1.jpg?v=1712840574&width=2048',
			for: 'chest',
			defence: 15,
			id: 23
		},
		{
			sprite:
				'https://img.drz.lazcdn.com/static/pk/p/501d0945ad08dab999771da67efae2ac.jpg_720x720q80.jpg',
			for: 'legs',
			defence: 10,
			id: 12349
		},
		{
			sprite: 'https://i.ebayimg.com/images/g/zNQAAOSwBY5eAPI0/s-l1200.jpg',
			for: 'legs',
			defence: 5,
			id: 1234569
		},
		{
			sprite: 'https://cdn.shoplightspeed.com/shops/636822/files/66362863/900x500x1/image.jpg',
			for: 'head',
			defence: 12,
			id: 12567
		},
		{
			sprite:
				'https://static.e-stradivarius.net/assets/public/aaae/1d2b/881a40f2b266/211c7cf2a7a4/03839903001-a2/03839903001-a2.jpg?ts=1753342539968&w=1300&f=auto',
			for: 'head',
			defence: 12,
			id: 17
		}
	];

	let encounterPowerups = $state<Array<Powerup>>([]);
	let rewardClothes = $state<Array<Clothing>>([]);

	function newInventory(): Array<Clothing> {
		return [
			{
				sprite: 'https://www.midi-france.info/medievalwarfare/pics/nasalhelm.jpg',
				defence: 4,
				for: 'head',
				id: 1
			},
			{
				sprite:
					'https://grommetsleathercraft.com/wp-content/uploads/2021/06/il_fullxfull.1375806771_7vxz-scaled.jpg',
				defence: 16,
				for: 'chest',
				id: 2
			},
			{
				sprite: 'https://m.media-amazon.com/images/I/61-nCO2WiqL.jpg',
				defence: 10,
				for: 'legs',
				id: 3
			},
			{
				sprite: 'https://www.midi-france.info/medievalwarfare/pics/greathelm.jpg',
				defence: 8,
				for: 'head',
				id: 4
			},
			{
				sprite: 'https://www.the-larp-store.com/images/product/medium/10263_1_.jpg',
				defence: 15,
				for: 'chest',
				id: 5
			},
			{
				sprite:
					'https://burgschneider.com/cdn/shop/files/Wasserzeichen-2769.Bckba0.jpg?v=1767496878',
				defence: 12,
				for: 'legs',
				id: 6
			}
		];
	}

	let inventory = $state<Array<Clothing>>(newInventory());

	function recalculateStats() {
		let totalDefence = 0;
		if (avatar.head) {
			totalDefence += avatar.head.defence;
		}
		if (avatar.chest) {
			totalDefence += avatar.chest.defence;
		}
		if (avatar.legs) {
			totalDefence += avatar.legs.defence;
		}
		avatar.defence = totalDefence;
	}

	function pickReward(item: Clothing) {
		inventory.push(item);
		resetGame();
	}

	function unequipItem(item: Clothing) {
		if (item.for === 'head') {
			avatar.head = null;
		} else if (item.for === 'chest') {
			avatar.chest = null;
		} else if (item.for === 'legs') {
			avatar.legs = null;
		}
		recalculateStats();
	}

	function equipItem(item: Clothing) {
		if (item.for === 'head') {
			if (avatar.head) {
				unequipItem(avatar.head);
			}
			avatar.head = item;
		} else if (item.for === 'chest') {
			if (avatar.chest) {
				unequipItem(avatar.chest);
			}
			avatar.chest = item;
		} else if (item.for === 'legs') {
			if (avatar.legs) {
				unequipItem(avatar.legs);
			}
			avatar.legs = item;
		}
		recalculateStats();
	}

	let endMsg = $state('');
	let rollDieVid = $state(false);
	let yourMultiplier = $state(1);
	let enemyMultiplier = $state(1);
	let yourDie = $state(0);
	let enemyDie = $state(0);
	let yourDamage = $state(0);
	let enemyDamage = $state(0);

	let enemy = $state<Enemy>({
		sprite:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK3KPjPwcINGG6hMNDOANfvmTgIAQ1vrOTnw&s',
		defence: 15,
		attack: 20,
		health: 100
	});

	let turnNumber = $state(0);

	function resetGame(): void {
		if (!win) {
			inventory = newInventory();
		}
		endMsg = '';
		rollDieVid = false;
		yourMultiplier = 1;
		enemyMultiplier = 1;
		yourDie = 0;
		enemyDie = 0;
		yourDamage = 0;
		enemyDamage = 0;
		enemy.health = 100;

		avatar.health = 100;
		avatar.defence = 0;
		avatar.head = null;
		avatar.chest = null;
		avatar.legs = null;

		turnNumber = 0;
		mode = 'pre-encounter';
	}

	function pickRewards() {
		rewardClothes = [];
		let nonOwnedItems = extraClothes.filter((item) => !inventory.includes(item));
		nonOwnedItems = nonOwnedItems.sort(() => Math.random() - 0.5);
		for (let i = 0; i < Math.min(3, nonOwnedItems.length); i++) {
			rewardClothes.push(nonOwnedItems[i]);
		}
	}

	async function attack(avatar: Avatar, target: Enemy) {
		rollDieVid = true;
		await new Promise((resolve) => setTimeout(resolve, 1000));
		rollDieVid = false;

		yourDie = Math.ceil(Math.random() * 6);
		enemyDie = Math.ceil(Math.random() * 6);

		yourMultiplier = 1 + yourDie / 10;
		enemyMultiplier = 1 + enemyDie / 10;

		yourDamage = ((100 - target.defence) / 100) * (avatar.attack * yourMultiplier);
		enemyDamage = ((100 - avatar.defence) / 100) * (target.attack * enemyMultiplier);

		yourDamage = Math.floor(yourDamage);
		enemyDamage = Math.floor(enemyDamage);

		target.health -= yourDamage;
		if (target.health <= 0) {
			target.health = 0;
			endMsg = 'You defeated the enemy!';
			win = true;
			mode = 'post-encounter';
			pickRewards();
		}

		avatar.health -= enemyDamage;
		if (avatar.health <= 0) {
			avatar.health = 0;
			endMsg = 'You were defeated!';
			win = false;
			mode = 'post-encounter';
		}
		turnNumber++;
	}
</script>

{#snippet player()}
	<section class="flex flex-col gap-2">
		<h3 class="text-xl font-bold">Player</h3>
		<div class="flex flex-col">
			<p>Head</p>
			{#if avatar.head}
				<img class="h-12 w-12" src={avatar.head.sprite} alt="Head" />
			{:else}
				<p>No armour equipped here</p>
			{/if}
		</div>
		<div class="flex flex-col">
			<p>Chest</p>
			{#if avatar.chest}
				<img class="h-12 w-12" src={avatar.chest.sprite} alt="Chest" />
			{:else}
				<p>No armour equipped here</p>
			{/if}
		</div>
		<div class="flex flex-col">
			<p>Legs</p>
			{#if avatar.legs}
				<img class="h-12 w-12" src={avatar.legs.sprite} alt="Legs" />
			{:else}
				<p>No armour equipped here</p>
			{/if}
		</div>

		<div class="w-fit border border-black p-2">
			<h2>Your Stats</h2>
			<div>
				<p class="font-bold">health: {avatar.health}</p>
				<p class="font-bold">defence: {avatar.defence}</p>
				<p class="font-bold">attack: {avatar.attack}</p>
			</div>
		</div>
	</section>
{/snippet}

{#snippet enemyMarkup()}
	<section class="flex flex-col">
		<div class="flex flex-col">
			<h3 class="text-xl font-bold">Enemy</h3>
			<img class="h-24 w-24" src={enemy.sprite} alt="enemy sprite" />
			<div class="w-fit border border-black p-2">
				<h2>Enemy Stats</h2>
				<div>
					<p class="font-bold">health: {enemy.health}</p>
					<p class="font-bold">defence: {enemy.defence}</p>
					<p class="font-bold">attack: {enemy.attack}</p>
				</div>
			</div>
		</div>
	</section>
{/snippet}

<div class="relative m-4 flex flex-col space-y-4">
	<div class="absolute top-0 right-0">
		<p class="font-serif text-5xl font-extrabold text-muted-foreground">{mode}</p>
	</div>
	{#if mode === 'pre-encounter'}
		{@render player()}

		<div class="flex flex-col gap-2">
			<h2 class="text-2xl font-semibold">Clothes Inventory</h2>
			<div class="flex flex-col gap-2">
				<p>Head armour</p>
				<div class="flex gap-2">
					{#each inventory.filter((item) => item.for === 'head') as item, index (index)}
						<button
							onclick={() => equipItem(item)}
							class="w-fit cursor-pointer border border-black p-2 hover:shadow-md active:scale-90"
						>
							<img class="h-12 w-12" src={item.sprite} alt={item.for} />
							<p>defence: {item.defence}</p>
						</button>
					{/each}
				</div>
			</div>
			<div class="flex flex-col gap-2">
				<p>Chest armour</p>
				<div class="flex gap-2">
					{#each inventory.filter((item) => item.for === 'chest') as item, index (index)}
						<button
							onclick={() => equipItem(item)}
							class="w-fit cursor-pointer border border-black p-2 hover:shadow-md active:scale-90"
						>
							<img class="h-12 w-12" src={item.sprite} alt={item.for} />
							<p>defence: {item.defence}</p>
						</button>
					{/each}
				</div>
			</div>
			<div class="flex flex-col gap-2">
				<p>Legs armour</p>
				<div class="flex gap-2">
					{#each inventory.filter((item) => item.for === 'legs') as item, index (index)}
						<button
							onclick={() => equipItem(item)}
							class="w-fit cursor-pointer border border-black p-2 hover:shadow-md active:scale-90"
						>
							<img class="h-12 w-12" src={item.sprite} alt={item.for} />
							<p>defence: {item.defence}</p>
						</button>
					{/each}
				</div>
			</div>
			<button
				onclick={() => (mode = 'encounter')}
				class="mt-2 ml-2 w-fit cursor-pointer border border-black px-3 py-1 hover:shadow active:scale-90"
				>Ready to battle with style!</button
			>
		</div>
	{:else if mode === 'encounter'}
		<div class="flex flex-col space-y-6">
			<div class="flex gap-6 border">
				{@render player()}
				{@render enemyMarkup()}
			</div>

			<div class="flex flex-col gap-4">
				<p>Turn: {turnNumber}</p>
				<button
					onclick={() => attack(avatar, enemy)}
					class=" w-fit cursor-pointer border border-black px-3 py-1 hover:shadow-md active:scale-90"
					>Attack</button
				>
				{#if rollDieVid === true}
					<div class="flex flex-col items-center justify-center">
						<p>Rolling die...</p>
						<img
							src="https://i.pinimg.com/originals/75/09/82/750982c4ccc4737e643207f54c40170a.gif"
							alt="Rolling die"
							class="h-24 w-24"
						/>
					</div>
				{/if}

				<div class="flex flex-col gap-4">
					<div>
						<p>Your roll: {yourDie}</p>
						<p>Enemy roll: {enemyDie}</p>
					</div>

					<div>
						<p>Your multiplier: {yourMultiplier}</p>
						<p>Enemy multiplier: {enemyMultiplier}</p>
					</div>
					<div>
						<p>Your damage: {yourDamage}</p>
						<p>Enemy damage: {enemyDamage}</p>
					</div>

					<div class="flex flex-col text-muted-foreground">
						<p>Damage formula:</p>
						<p>((100 - target.defence) / 100) * (avatar.attack * yourMultiplier)</p>
					</div>
				</div>
			</div>
		</div>
	{:else if mode === 'post-encounter'}
		<div class="flex flex-col gap-4">
			{#if win}
				<p>{endMsg}</p>

				<div>
					<div>
						{#if rewardClothes.length !== 0}
							<h3 class="text-xl font-bold">Pick a Reward</h3>
							{#each rewardClothes as reward (reward.id)}
								<button
									onclick={() => {
										pickReward(reward);
									}}
									class=" w-fit cursor-pointer border border-black px-3 py-1 hover:shadow-md active:scale-90"
								>
									<img src={reward.sprite} alt="a piece of clothing" class="h-24 w-24" />
								</button>
							{/each}
						{:else}
							<p>No rewards available</p>
						{/if}
					</div>
				</div>
			{:else}
				<p>{endMsg}</p>
			{/if}

			<button
				onclick={() => {
					resetGame();
				}}
				class=" w-fit cursor-pointer border border-black px-3 py-1 hover:shadow-md active:scale-90"
				>Play Again</button
			>
		</div>
	{/if}
</div>
