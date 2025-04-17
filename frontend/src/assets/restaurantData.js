/* export const restaurantData = [
  {
    title: "Breakfast",
    time: "7:00 AM - 11:00 AM",
    items: [
      {
        name: "Gourmet Eggs Benedict",
        desc: "Poached eggs on toasted English muffins topped with velvety hollandaise and smoked salmon.",
        price: "$28",
        img: "https://static.vecteezy.com/system/resources/previews/048/799/454/large_2x/gourmet-eggs-benedict-on-toasted-muffins-with-ham-and-arugula-photo.jpg",
      },
      {
        name: "Savory Spinach & Feta Omelette",
        desc: "A fluffy omelette filled with fresh spinach, creamy feta cheese, and a hint of herbs, served with artisan toast.",
        price: "$20",
        img: "https://stylishcuisine.com/wp-content/uploads/EGG-LOAF.jpeg",
      },
      {
        name: "Cinnamon Apple Pancakes",
        desc: "Fluffy pancakes infused with cinnamon and topped with caramelized apples.",
        price: "$22",
        img: "https://fullforlife.com/wp-content/uploads/2022/01/apple-pancakes.jpg",
      },
      {
        name: "Smoked Salmon Bagel",
        desc: "Freshly baked bagel topped with cream cheese, smoked salmon, capers, and red onion.",
        price: "$30",
        img: "https://visscherseafood.com/wp-content/uploads/2024/02/Recept-3.jpg",
      },
      {
        name: "Signature Smoothie Bowl",
        desc: "A blend of tropical fruits, topped with granola, nuts, and edible flowers.",
        price: "$18",
        img: "https://lovelilbucks.com/cdn/shop/articles/smoothie_bowl_copy_2_1024x1024.jpg?v=1645051077",
      },
      {
        name: "Croissant with Almond Fillings",
        desc: "Flaky croissant filled with almond cream and topped with powdered sugar.",
        price: "$15",
        img: "https://images.squarespace-cdn.com/content/v1/65c3e29954a54703b46fe0ae/1724841881133-G5KS0KKEJVEGWQ00MIOR/IMG_7478.jpg",
      },
      {
        name: "Berry Parfait",
        desc: "Layers of yogurt, granola, and fresh mixed berries, served in a glass.",
        price: "$12",
        img: "https://www.allrecipes.com/thmb/ms9w-YNZTsJqsvkfbypSofESHlc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ALR-23182-vanilla-berry-parfaits-4x3-887572c396d64ebebe3ddbe96f909578.jpg",
      },
      {
        name: "Savory Oatmeal Bowl",
        desc: "Warm oatmeal topped with poached egg, sautéed spinach, and feta cheese.",
        price: "$20",
        img: "https://www.collegeinn.com/sites/default/files/savory-oatmeal.jpg",
      },
    ],
    drinks: [
      {
        name: "Freshly Squeezed Orange Juice",
        desc: "Refreshing and vibrant orange juice made from fresh, ripe oranges.",
        price: "$10",
        img: "https://media.zummocorp.com/Blog/zumo-conservar-mejor-1691236200TR9OP.webp",
      },
      {
        name: "Coffee",
        desc: "Rich, freshly brewed coffee with a choice of regular or decaf.",
        price: "$5",
        img: "https://nuthouseandcountrymarket.com/wp-content/uploads/2019/11/https-cdn.cnn_.com-cnnnext-dam-assets-150929101049-black-coffee-stock.jpg",
      },
      {
        name: "Herbal Tea Selection",
        desc: "A variety of herbal teas including chamomile, peppermint, and green tea.",
        price: "$6",
        img: "https://static.toiimg.com/photo/69385334.cms",
      },
      {
        name: "Citrus Mojito",
        desc: "A refreshing mix of mint, lime, and soda water, with a citrus twist.",
        price: "$8",
        img: "https://www.cleanprogram.com/cdn/shop/articles/mojito_mocktail.jpg?v=1718201093",
      },
    ],
  },
  {
    title: "Lunch",
    time: "12:00 PM - 3:00 PM",
    items: [
      {
        name: "Mediterranean Grilled Chicken Salad",
        desc: "Herb-marinated chicken served over mixed greens with olives, feta, and a lemon vinaigrette.",
        price: "$34",
        img: "https://nothing-n-particular.b-cdn.net/wp-content/uploads/2025/01/jran73_Classic_Mediterranean_Chicken_shot_with_LUMIC_DC-ZS80D_i_9f77248a-c551-4775-839b-7524a1a7f96d.png",
      },
      {
        name: "Lobster Roll",
        desc: "Warm buttered lobster in a toasted brioche roll, served with homemade potato chips.",
        price: "$45",
        img: "https://images.getrecipekit.com/20240716202141-istock-487499556-modified-4d7aae9d-1556-4e2e-b0dd-e9cffb4557ec.jpg?aspect_ratio=1:1&quality=90&",
      },
      {
        name: "Wagyu Beef Burger",
        desc: "Juicy Wagyu beef patty with aged cheddar, lettuce, and truffle aioli on a brioche bun.",
        price: "$48",
        img: "https://www.burgerfi.com/wp-content/uploads/2025/02/delicious-beef-burger-scaled.webp",
      },
      {
        name: "Wild Mushroom Risotto",
        desc: "Creamy Arborio rice cooked with wild mushrooms and finished with parmesan.",
        price: "$36",
        img: "https://www.northcoastseafoods.com/cdn/shop/articles/Seared_Scallop_Risotto_2_square.jpg?v=1648669604",
      },
      {
        name: "Seafood Paella",
        desc: "A vibrant mix of saffron-infused rice, seafood, and vegetables, served in a traditional pan.",
        price: "$52",
        img: "https://www.pccmarkets.com/wp-content/uploads/2023/07/pcc-paella-valenciana-mixta-chicken-and-seafood-paella-flo.jpg",
      },
      {
        name: "Roasted Beet Salad",
        desc: "Roasted beets, goat cheese, and walnuts on mixed greens with a balsamic reduction.",
        price: "$28",
        img: "https://theneffkitchen.com.au/wp-content/uploads/2019/03/NEFF_Featured_Beetroot_salad.gif",
      },
      {
        name: "Grilled Chicken Pasta Primavera",
        desc: "A mixture of seasonal vegetables sautéed with pasta in a light olive oil sauce.",
        price: "$32",
        img: "https://eatwheat.org/wp-content/uploads/2022/07/Web-5-1-1200x750.png",
      },
      {
        name: "Grilled Vegetable Wrap",
        desc: "Grilled seasonal vegetables wrapped in a spinach tortilla with hummus.",
        price: "$24",
        img: "https://s.lightorangebean.com/media/20240914163050/Vibrant-Beet-Veggie-Wrap_-done.png",
      },
    ],
    drinks: [
      {
        name: "Iced Tea",
        desc: "Refreshing iced tea served with lemon and mint.",
        price: "$8",
        img: "https://www.simplyrecipes.com/thmb/StjxYqNXM0CgmU6ZYFXDOEH6Rvk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Iced-Tea-Tip-LEAD-OPTION-03-e78d1c8b7124413d92370d567a102ff1.jpg",
      },
      {
        name: "Craft Beer Selection",
        desc: "A rotating selection of local craft beers on tap.",
        price: "$10",
        img: "https://display.blogto.com/articles/20150525-thecraft2048-13.jpg?w=2048&cmd=resize_then_crop&height=1365&quality=70",
      },
      {
        name: "Sparkling Water",
        desc: "Chilled sparkling water served with a slice of lemon.",
        price: "$6",
        img: "https://cdn-cf1.nws.ai/platform/posters/70b10fc8-cdaf-11ee-bd33-181073a1f892/d29775c86273-.jpg",
      },
      {
        name: "Mango Smoothie",
        desc: "A creamy and refreshing blend of ripe mangoes and yogurt.",
        price: "$7",
        img: "https://elavegan.com/wp-content/uploads/2023/07/tropical-mango-pineapple-smoothie-in-2-glasses-with-straws.jpg",
      },
    ],
  },
  {
    title: "Dinner",
    time: "6:00 PM - 10:00 PM",
    items: [
      {
        name: "Filet Mignon",
        desc: "Prime cut of grilled beef tenderloin served with a red wine reduction and seasonal vegetables.",
        price: "$75",
        img: "https://www.unileverfoodsolutions.us/dam/global-ufs/mcos/NAM/calcmenu/recipes/US-recipes/red-meats-&-red-meat-dishes/filet-mignon-with-garlic-and-rosemary-sauce/main-header.jpg",
      },
      {
        name: "Pan-Seared Sea Bass",
        desc: "Delicate sea bass served with a lemon beurre blanc and sautéed asparagus.",
        price: "$68",
        img: "https://images.squarespace-cdn.com/content/v1/600fafdbb0af6b440eec8ead/1611902001112-EWCS1BOLZPUN5URTEHXM/IMG_20200919_195136_479.jpg",
      },
      {
        name: "Duck Confit",
        desc: "Slow-cooked duck leg served with garlic mashed potatoes and braised red cabbage.",
        price: "$55",
        img: "https://www.christmas.co.uk/wp-content/smush-webp/2023/09/how-to-buy-and-cook-a-duck-for-christmas-dinner-christmas.co_.uk-2-1440x950.jpg.webp",
      },
      {
        name: "Herb-Crusted Rack of Lamb",
        desc: "Roasted rack of lamb coated in herbs and Dijon, served with rosemary-infused potatoes.",
        price: "$85",
        img: "https://turbokitchen.co.uk/wp-content/uploads/2024/05/herb-crusted-rack-of-lamb-with-red-wine-reduction.png",
      },
      {
        name: "Vegetable Tart",
        desc: "A flaky pastry filled with seasonal vegetables and goat cheese, accompanied by a salad.",
        price: "$40",
        img: "https://www.eczemalife.com/cdn/shop/articles/SPIRAL_vegetable_tart_skin_friend_katie_1200x1200.jpg?v=1549931863",
      },
      {
        name: "Seafood Fettuccine",
        desc: "Fettuccine pasta tossed with shrimp, scallops, and a creamy garlic sauce.",
        price: "$60",
        img: "https://img.freepik.com/premium-photo/seafood-spaghetti_1269412-551.jpg",
      },
      {
        name: "Risotto with Truffles",
        desc: "Creamy risotto finished with black truffles and parmesan cheese.",
        price: "$52",
        img: "https://img.freepik.com/premium-photo/risotto-with-pecorino-black-pepper-yummy-delicious-lasagnarisotto-image_1020697-558622.jpg?ga=GA1.1.986336031.1724243976&semt=ais_hybrid&w=740",
      },
      {
        name: "Beef Wellington",
        desc: "Tender beef fillet coated with pâté and duxelles, wrapped in puff pastry.",
        price: "$95",
        img: "https://img.freepik.com/premium-photo/beef-wellington-savory-pastryencased-steak-with-thyme-gravy_620829-8299.jpg?ga=GA1.1.986336031.1724243976&semt=ais_hybrid&w=740",
      },
      {
        name: "Chocolate Lava Cake",
        desc: "A rich chocolate cake with a gooey molten center, served with vanilla ice cream.",
        price: "$15",
        img: "https://img.freepik.com/premium-photo/close-up-dessert-table_1048944-5136379.jpg?ga=GA1.1.986336031.1724243976&semt=ais_hybrid&w=740",
      },
      {
        name: "Passion Fruit Panna Cotta",
        desc: "A creamy, luscious panna cotta infused with the vibrant taste of passion fruit, finished with a citrus glaze.",
        price: "$16",
        img: "https://img.freepik.com/premium-photo/passion-fruit-mousse-dark-background_1048944-20195742.jpg?ga=GA1.1.986336031.1724243976&semt=ais_hybrid&w=740",
      },
      {
        name: "Pistachio Macaron with Raspberry Coulis",
        desc: "A delicate pistachio-flavored macaron, complemented by a tangy raspberry coulis.",
        price: "$14",
        img: "https://nomemadegf.com/wp-content/uploads/2020/03/DSC01933-2-1024x890.jpg",
      },
      {
        name: "Crème Brûlée with Fresh Berries",
        desc: "A silky smooth vanilla custard topped with a crisp, caramelized sugar layer and fresh seasonal berries.",
        price: "$18",
        img: "https://img.freepik.com/premium-photo/curd-cheese-with-red-cherry-jam-orange-juice-cup-coffee-table-breakfast-concept_185094-8379.jpg?ga=GA1.1.986336031.1724243976&semt=ais_hybrid&w=740",
      },
    ],

    drinks: [
      {
        name: "Red Wine Selection",
        desc: "A curated selection of fine red wines from around the world.",
        price: "$12 per glass",
        img: "https://img.freepik.com/premium-photo/global-selection-wines-shines-wooden-counter-generative-ia_209190-8987.jpg?ga=GA1.1.986336031.1724243976&semt=ais_hybrid&w=740",
      },
      {
        name: "Classic Martini",
        desc: "A classic cocktail made with gin and dry vermouth, garnished with an olive.",
        price: "$14",
        img: "https://img.freepik.com/premium-photo/classic-lemon-drop-martini_1148901-5875.jpg?ga=GA1.1.986336031.1724243976&semt=ais_hybrid&w=740",
      },
      {
        name: "Signature Cocktail",
        desc: "A house special crafted cocktail uniquely designed by our mixologist.",
        price: "$18",
        img: "https://img.freepik.com/premium-photo/ricotta-dessert-with-peach_72772-18680.jpg?ga=GA1.1.986336031.1724243976&semt=ais_hybrid&w=740",
      },
      {
        name: "Moscato",
        desc: "A sweet, fruity sparkling wine that pairs beautifully with desserts.",
        price: "$10 per glass",
        img: "https://quadywinery.com/wp-content/uploads/2023/08/dsc06640.jpg",
      },
    ],
  },
];
 */