export const categories = [
	{
		name: 'Пиццы'
	},
	{
		name: 'Завтрак'
	},
	{
		name: 'Закуски'
	},
	{
		name: 'Коктейли'
	},
	{
		name: 'Напитки'
	}
]

export const _ingredients = [
	{
		name: 'Сырный бортик',
		price: 179,
		imageUrl: 'cheese_cort.png'
	},
	{
		name: 'Сливочная моцарелла',
		price: 79,
		imageUrl: 'mocarella.png'
	},
	{
		name: 'Сыры чеддер и пармезан',
		price: 79,
		imageUrl: 'chedder_parmesan.png'
	},
	{
		name: 'Острый перец халапеньо',
		price: 59,
		imageUrl: 'halapenio.png'
	},
	{
		name: 'Нежный цыпленок',
		price: 79,
		imageUrl: 'chicken.png'
	},
	{
		name: 'Шампиньоны',
		price: 59,
		imageUrl: 'shampiniony.png'
	},
	{
		name: 'Ветчина',
		price: 79,
		imageUrl: 'vetchina.png'
	},
	{
		name: 'Пикантная пепперони',
		price: 79,
		imageUrl: 'pekantnaya_peperonni.png'
	},
	{
		name: 'Острая чоризо',
		price: 79,
		imageUrl: 'spicy_chorizo.png'
	},
	{
		name: 'Маринованные огурчики',
		price: 59,
		imageUrl: 'cucumber.png'
	},
	{
		name: 'Свежие томаты',
		price: 59,
		imageUrl: 'tomat.png'
	},
	{
		name: 'Красный лук',
		price: 59,
		imageUrl: 'onion.png'
	},
	{
		name: 'Сочные ананасы',
		price: 59,
		imageUrl: 'ananas.png'
	},
	{
		name: 'Итальянские травы',
		price: 39,
		imageUrl: 'grass.png'
	},
	{
		name: 'Сладкий перец',
		price: 59,
		imageUrl: 'pepper.png'
	},
	{
		name: 'Кубики брынзы',
		price: 79,
		imageUrl: 'brinza.png'
	},
	{
		name: 'Митболы',
		price: 79,
		imageUrl: 'meatball.png'
	}
].map((obj, index) => ({ id: index + 1, ...obj }))

export const products = [
	{
		name: 'Омлет с ветчиной и грибами',
		imageUrl: 'omlet_vetchina.webp',
		categoryId: 2
	},
	{
		name: 'Омлет с пепперони',
		imageUrl: 'omlet_pepperoni.webp',
		categoryId: 2
	},
	{
		name: 'Кофе Латте',
		imageUrl: 'latte.webp',
		categoryId: 2
	},
	{
		name: 'Дэнвич ветчина и сыр',
		imageUrl: 'denvich.webp',
		categoryId: 3
	},
	{
		name: 'Куриные наггетсы',
		imageUrl: 'nuggets.webp',
		categoryId: 3
	},
	{
		name: 'Картофель из печи с соусом 🌱',
		imageUrl: 'free.webp',
		categoryId: 3
	},
	{
		name: 'Додстер',
		imageUrl: 'dodster.webp',
		categoryId: 3
	},
	{
		name: 'Острый Додстер 🌶️🌶️',
		imageUrl: 'spicy_dodster.webp',
		categoryId: 3
	},
	{
		name: 'Банановый молочный коктейль',
		imageUrl: 'banana_kokteil.webp',
		categoryId: 4
	},
	{
		name: 'Карамельное яблоко молочный коктейль',
		imageUrl: 'apple_kokteil.webp',
		categoryId: 4
	},
	{
		name: 'Молочный коктейль с печеньем Орео',
		imageUrl: 'oreo_kokteil.webp',
		categoryId: 4
	},
	{
		name: 'Классический молочный коктейль 👶',
		imageUrl: 'classic_kokteil.webp',
		categoryId: 4
	},
	{
		name: 'Ирландский Капучино',
		imageUrl: 'irland_kapuchino.webp',
		categoryId: 5
	},
	{
		name: 'Кофе Карамельный капучино',
		imageUrl: 'karamel_kapuchino.webp',
		categoryId: 5
	},
	{
		name: 'Кофе Кокосовый латте',
		imageUrl: 'coconut_latte.webp',
		categoryId: 5
	},
	{
		name: 'Кофе Американо',
		imageUrl: 'americano.webp',
		categoryId: 5
	},
	{
		name: 'Кофе Латте',
		imageUrl: 'classic_latte.webp',
		categoryId: 5
	}
]
