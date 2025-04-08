/* export default const hotelRooms = [
    {
        "title": "Luxury Room",
        "images": [
            "https://www.home-designing.com/wp-content/uploads/2018/10/luxury-bedroom-arched-interior-1024x1365.jpg",
            "https://landing.engotheme.com/html/skyline/demo/images/Product/img-2.jpg",
            "https://landing.engotheme.com/html/skyline/demo/images/Product/img-3.jpg"
        ],
        descOverview: "Elegant and spacious room with premium furnishings, balcony view, and complimentary services.",
        price: 300,
        rate: 4.8,
        calendar: {
            "available": true,
            "nextAvailableDate": "2025-04-10"
        },
        "packages": [
            "Free breakfast",
            "Spa access",
            "Airport pickup",
            "Late checkout"
        ]
    },
    {
        "title": "Family Room",
        "images": [
            "https://www.home-designing.com/wp-content/uploads/2018/10/luxury-bedroom-arched-interior-1024x1365.jpg",
            "https://landing.engotheme.com/html/skyline/demo/images/Product/img-2.jpg",
            "https://landing.engotheme.com/html/skyline/demo/images/Product/img-3.jpg"
        ],
        "descOverview": "Perfect for families, this room features extra beds, a cozy seating area, and kid-friendly amenities.",
        "price": 250,
        "rate": 4.6,
        "calendar": {
            "available": false,
            "nextAvailableDate": "2025-04-12"
        },
        "packages": [
            "Free breakfast for 4",
            "Kids play zone access",
            "Complimentary snacks",
            "Free laundry"
        ]
    },
    {
        "title": "Delux Room",
        "images": [
            "https://www.home-designing.com/wp-content/uploads/2018/10/luxury-bedroom-arched-interior-1024x1365.jpg",
            "https://landing.engotheme.com/html/skyline/demo/images/Product/img-2.jpg",
            "https://landing.engotheme.com/html/skyline/demo/images/Product/img-3.jpg"
        ],
        "descOverview": "Stylish and comfortable, our delux rooms offer a mix of luxury and affordability for business or leisure.",
        "price": 200,
        "rate": 4.5,
        "calendar": {
            "available": true,
            "nextAvailableDate": "2025-04-08"
        },
        "packages": [
            "Breakfast included",
            "Workstation desk",
            "Welcome drink"
        ]
    },
    {
        "title": "Single Room",
        "images": [
            "https://www.home-designing.com/wp-content/uploads/2018/10/luxury-bedroom-arched-interior-1024x1365.jpg",
            "https://landing.engotheme.com/html/skyline/demo/images/Product/img-2.jpg",
            "https://landing.engotheme.com/html/skyline/demo/images/Product/img-3.jpg"
        ],
        "descOverview": "Compact and well-equipped for solo travelers, with a single bed and all basic amenities.",
        "price": 100,
        "rate": 4.2,
        "calendar": {
            "available": true,
            "nextAvailableDate": "2025-04-07"
        },
        "packages": [
            "Free Wi-Fi",
            "In-room coffee",
            "Daily housekeeping"
        ]
    },
    {
        "title": "Double Room",
        "images": [
            "https://www.home-designing.com/wp-content/uploads/2018/10/luxury-bedroom-arched-interior-1024x1365.jpg",
            "https://landing.engotheme.com/html/skyline/demo/images/Product/img-2.jpg",
            "https://landing.engotheme.com/html/skyline/demo/images/Product/img-3.jpg"
        ],
        "descOverview": "Comfortable room with double bedding, suited for couples or friends traveling together.",
        "price": 150,
        "rate": 4.4,
        "calendar": {
            "available": true,
            "nextAvailableDate": "2025-04-09"
        },
        "packages": [
            "Queen-size bed",
            "Free mini-bar",
            "Room service included"
        ]
    },
    {
        "title": "Presidential Room",
        "images": [
            "https://www.home-designing.com/wp-content/uploads/2018/10/luxury-bedroom-arched-interior-1024x1365.jpg",
            "https://landing.engotheme.com/html/skyline/demo/images/Product/img-2.jpg",
            "https://landing.engotheme.com/html/skyline/demo/images/Product/img-3.jpg"
        ],
        "descOverview": "Top-tier luxury experience with private lounge, hot tub, panoramic views, and exclusive services.",
        "price": 600,
        "rate": 5.0,
        "calendar": {
            "available": false,
            "nextAvailableDate": "2025-04-15"
        },
        "packages": [
            "Personal butler",
            "Private lounge access",
            "Complimentary champagne",
            "All-inclusive meals"
        ]
    }
] */



const hotelRooms = [
    //Luxury Suite
    {
        title: "Luxury Suite",
        slug: "luxury-suite",

        images: [
            "https://cf.bstatic.com/xdata/images/hotel/max1024x768/527909886.jpg?k=88d65c2b43b40702e8656c8b22d479763ab50c7d06cb33ee4f3938992a629ed2&o=&hp=1",
            "https://cf.bstatic.com/xdata/images/hotel/max1024x768/527909732.jpg?k=94f53009886f69cc105c54fa0c22c346d8649d6f45c60d63e9a29fd0c44b4267&o=&hp=1",
            "https://www.tiefenbrunner1810.at/wp-content/uploads/2022/06/rectangle-9.jpg",
            "https://www.jagdhof-roehrnbach.de/imageservice/bilder/preise/zimmer/luxury-suite/jhr21_0269-badTypAluxury-rgb2500[b2500].jpg",
            "https://www.venicecollection.com/palazzo-veneziano/wp-content/uploads/sites/2/2017/08/Luxury-Spa-Suite-08-1600x800.jpg"
        ],
        descOverview: "Spacious top-tier suite featuring modern décor, panoramic views, personalized services, and a private lounge.",
        price: 280,
        rate: 4.8,
        calendar: {
            available: true,
            nextAvailableDate: "2025-04-10"
        },
        packages: ["Free breakfast", "Pool access", "Daily housekeeping", "Welcome drink"]
    },

    //Deluxe Room
    {
        title: "Deluxe Room",
        slug: "deluxe-room", // <- Add this

        images: [
            "https://image-tc.galaxy.tf/wijpeg-551y6w2jnapgebw1tws6kt5fo/deluxe-room76-1-standard_wide.jpg?crop=0%2C101%2C1920%2C1080",
            "https://storage.kempinski.com/cdn-cgi/image/w=1920,f=auto,g=auto,fit=scale-down/ki-cms-prod/images/9/8/9/4/1794989-1-eng-GB/ee970625a496-75519960_4K.jpg",
            "https://www.kempinski.com/var/site/storage/images/8/6/9/0/130968-1-eng-GB/9f171ef531d3-73666722_4K.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEUo9ew1Mjkb4Y91Cbukb9quIthaWMpIYxXw&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShdfiQf7NxkZuDYl_khuNYOcgG6Z5rCndFFmmNpCdL3fSmWv0iO0D5avf26GB8MYChWI4&usqp=CAU"
        ],
        descOverview: "Comfortable and well-appointed room with elegant design, city view, and essential amenities for a relaxing stay.",
        price: 230,
        rate: 4.9,
        calendar: {
            available: true,
            nextAvailableDate: "2025-04-10"
        },
        packages: ["Free breakfast", "Pool access", "Daily housekeeping", "Welcome drink"]
    },
    //Single Room
    {
        title: "Single Room",
        slug: "single-room", // <- Add this

        images: [
            "https://ywcavan.org/sites/default/files/styles/scale_width_1440/public/assets/room/room_image/Single-bed-room-YWCA_Hotel_Vancouver.jpg?itok=ha3Io79Z",
            "https://pix10.agoda.net/property/6950067/0/35a6d1a3cbcc0fd3c48c72afc4d561e5.jpeg?ce=0&s=414x232",
            "https://ywcavan.org/sites/default/files/styles/square_bg_480/public/assets/room/hero_image/DSC05168-Edit.jpg?itok=BJVIC9B_",
            "https://www.londonhousehotels.com/wp-content/uploads/2017/11/2.-1-Single-Room-MAIN.jpg",
            "https://webbox.imgix.net/images/xtvupivtnwaeexge/5921a47a-f58a-4e30-b497-05904ebc67c4.jpg?auto=format,compress&fit=crop&crop=entropy"
        ],
        descOverview: "Cozy and efficient space perfect for solo travelers, offering a serene environment and all the essentials.",
        price: 160,
        rate: 4.9,
        calendar: {
            available: true,
            nextAvailableDate: "2025-04-10"
        },
        packages: ["Complimentary Wi-Fi", "Work desk", "Free bottled water", "Laundry service"]
    },
    //Family Suite
    {
        title: "Family Suite",
        slug: "family-suite", // <- Add this

        images: [
            "https://www.royallancaster.com/wp-content/uploads/2018/05/Studio-Family-Suite-1_v2-min.jpg",
            "https://www.royallancaster.com/wp-content/uploads/2017/04/spires-thumb.jpg",
            "https://www.royallancaster.com/wp-content/uploads/2017/04/DSC4964.jpg",
            "https://www.royallancaster.com/wp-content/uploads/2019/06/WH1_7135.jpg",
            "https://file.videopolis.com/F/1/9f986204-f610-43e0-99ee-701c6521b5e2/100908.12654.london.royal-lancaster-london.room.park-suite-AiXAufb8-55777-1280x720.jpeg"
        ],
        descOverview: "A spacious suite ideal for families, featuring multiple beds, a living area, and kid-friendly amenities.",
        price: 350,
        rate: 4.9,
        calendar: {
            available: true,
            nextAvailableDate: "2025-04-10"
        },
        packages: ["Kids stay free", "Free breakfast", "Entertainment system", "Cribs on request"]
    },
    //Double Room
    {
        title: "Double Room",
        slug: "double-room", // <- Add this

        images: [
            "https://landing.engotheme.com/html/skyline/demo/images/Product/Another-3.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFUiDJtGtIWXIQ0zWG_s8-Ouz0g9EcIuOPOQ&s",
            "https://www.ajulresort.com/uploads/images/1280/356_R9635.jpg",
            "https://webbox.imgix.net/images/owvecfmxulwbfvxm/cfca3e26-3e33-4a69-8404-8e578394e12b.jpg?auto=format,compress&fit=crop&crop=entropy",
            "https://www.hotelanabel.com/assets/cache/uploads/habitaciones/doble-standard/447x447/television-silla-camas-individuales-matrimonio-habitacion-doble-standard-hotel-anabel-lloret-de-mar-costa-brava-cataluna-espana-1738771256.jpg"
        ],
        descOverview: "A well-designed room with double occupancy in mind, offering comfort and convenience for two guests.",
        price: 190,
        rate: 4.9,
        calendar: {
            available: true,
            nextAvailableDate: "2025-04-10"
        },
        packages: ["Queen bed", "Room service", "Mini fridge", "Balcony access"]
    },
    //Presidential Room
    {
        title: "Presidential Room",
        slug: "presidential-room", // <- Add this

        images: [
            "https://akm-img-a-in.tosshub.com/indiatoday/images/bodyeditor/202209/Suite_smell_of_success_5-x489.jpg?IcH4OrXsPGm72xtv9ZpBk5tgRr8QKZsw?size=750:*",
            "https://img.etimg.com/thumb/msid-64734932,width-640,height-480,imgsize-379180,resizemode-4/suite-yourself.jpg",
            "https://www.theleela.com/prod/content/assets/styles/tl_1920_735/public/aio-banner/dekstop/presidential-suite-leela-chennai-hotel.jpg.webp?VersionId=AYVKxJtUIe439oMP_yb.7VoJM4VXuG.q&itok=ypoYoB1k",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-tB2aBRx9WQhGSPAsf3gN5AOqtOk5tbzAYg&s",
            "https://img.etimg.com/thumb/msid-64734926,width-640,height-480,imgsize-436980,resizemode-4/cost-of-staying-at-presidential-suite.jpg"

        ],
        descOverview: "The pinnacle of luxury with exclusive services, opulent interiors, and a private office and meeting area.",
        price: 800,
        rate: 5,
        calendar: {
            available: true,
            nextAvailableDate: "2025-04-10"
        },
        packages: ["Dedicated concierge", "Private chef", "Helipad access", "Luxury bath products"]
    },
];

export default hotelRooms;

