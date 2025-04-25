# Install

## Finns redan installerat, vi behöver köra npm install

npm install react-router-dom axios react-cookie js-cookie

# Routes

src/
├── api/ # API service
├── components/ # Components
├── contexts/ # Context providers
├── hooks/ # Custom hooks
├── pages/ # Page components
├── utils/ # Utility functions
└── App.jsx # Main

# Backend config

spring.application.name=security
spring.data.mongodb.auto-index-creation=true
spring.data.mongodb.host=localhost
spring.data.mongodb.port=27017
spring.data.mongodb.database=auth

jwt.secret=hfaiehfisehfosndfejndfeswljrfeowfnjehwbewios4ngvhtrwglp4rkledf
jwt.expirationMs=36000000

# Fonts

```css
font-family: "Manrope", sans-serif;
font-optical-sizing: auto;
font-style: normal;

font-family: "Anton SC", sans-serif;
font-style: normal;
```

# .env.local

VITE_API_URL=http://localhost:8080

# JSON data

```json
[
  {
    "name": "Silver Ribbed Off-Shoulder Dress",
    "price": 89.99,
    "image": "https://media-hosting.imagekit.io/abf799f7c15846ce/ovayo-ntlabati-f_WTk4JqwiM-unsplash.jpg?Expires=1840039041&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=vcmGqxDOLihqnUan12FP~hwBq~RLscLF0hRyHuvekxc-zPJ2OS5A003Y02XFgC6~-ynwDw0JvOsmKBlFuw0YEOyh8n46AalztZDv-H2unP~D2Yi0xUZf7JsMCw34aND8Y5WA18H~dCVGnCOOznJpN9S8hZIm4fmg23pxUPQzh4LkcRRAiMc~AjRZ5M4SNAONS0ksFfbLviOXkbZ9SWwEZ2egtDX243BZy6JX9Bkaadg2gH6Ck5sDoVBkJ1Ct6eta~rcxSHTU0JCYl35wmrLyko7uWY9juDM-~rg1KBCMLJLxkLk4QUGv7uNzW1BFX4WDI1E7NQX8KM9pvU5lkEEbdA__",
    "description": "Elegant silver ribbed form-fitting dress featuring an off-shoulder design, long sleeves, and a sophisticated silhouette. Perfect for special occasions or formal events. The shimmering fabric adds a touch of glamour while maintaining a modern urban aesthetic."
  },
  {
    "name": "Black Leather Lace-Up Set",
    "price": 129.99,
    "image": "https://media-hosting.imagekit.io/f7cc86e167a345c7/dom-hill-JqZlSnI2ctA-unsplash.jpg?Expires=1840038987&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=g2dKI8RziZm00pUfNNsMUjjL1rqapJKMhBE0UtXHfPccAYkfh3OgFrt2Tl29qPW2aO-a3NoSzGS6Ee7Cq7SODGYwxobu7RXgZYJLUXIXjZmyxT8ZvVN7YEVRqKCof4B5Z~pbmX8xN7X5B5lgfXFXclUtRMICZwM4kH-3OPXbznx~8YAuPutzfH5zFfK0sQRP4fJfu8YYL74MG4OKLgvGFgWqhnSq1929kkObI8AzkYCtjTdmAYIvvs5aINJyemtGF5cWlu~wCARL43UNGEnOX1zEhUEgnGei06sXq9DCJ3R71uT6zMUOOA1VLunhkHUhrz-4ZiY4WqPibJLeg~iz-A__",
    "description": "Edgy black leather ensemble featuring lace-up details and fishnet elements. This bold streetwear look includes a black crop top with mesh sleeves and statement leather pants with cutout design. Completed with platform combat boots for the ultimate urban fashion statement."
  },
  {
    "name": "Yellow Cropped Hoodie Sweatsuit",
    "price": 74.95,
    "image": "https://media-hosting.imagekit.io/5ae5210957f74d8f/dom-hill-nimElTcTNyY-unsplash.jpg?Expires=1840043342&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=UlWi3DCtY25H~Y2pER0~FJ~abLhKXeJjR2p6IS2SAql64aFUf4ycAE8su5Y~R~mCK9Urh~5jRbecg0N2UkzT1yKUNxfwyQpnu8V79pBWukVDSB4dmgTPQMWMmH4WkykFSAC0iXzNorrpjPvE3I4oBFWltk6MAGSVee2RPiQmd66S8zh2HmxMh2Cw0RGH~AF76MIPhhs3VR-9FgQjkxI2DdCjgE8198s5O~xw73PMMrEThwwV7LOVSnGedIf0X4ESXIEG1IMtIDrh7wmOZcHBpzTnxGw02gfVS1zRhSO7NEg446Nk~vZGZ~uERH~YyJy3YIuewp07hAIrkYze7zkY-A__",
    "description": "Vibrant yellow two-piece sweatsuit featuring a cropped hoodie and matching jogger sweatpants. This comfortable yet fashionable athleisure set is perfect for casual outings or relaxed weekends. The bright color and clean lines create a striking urban look, paired with white ankle boots for style contrast."
  }
]
```
