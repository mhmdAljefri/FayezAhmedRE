import db from "./index"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */

const COUNTRIES = [
  {
    name: "تركيا",
    nameEN: "turkey",
    rooms: [
      "0 + 1",
      "1 + 1",
      "2 + 1",
      "3 + 1",
      "4 + 1",
      "5 + 1",
      "3 + 2",
      "4 + 2",
      "5 + 2",
      "6 + 2",
    ],
    image: "https://res.cloudinary.com/dco7dcmbq/image/upload/v1606724914/istanbul_r7phsu.jpg",
    isTurkey: true,
  },
  {
    name: "قطر",
    nameEN: "qatar",
    isTurkey: false,
    image:
      "https://res.cloudinary.com/dco7dcmbq/image/upload/v1606724974/http_3A_2F_2Fcom.ft.imagepublish.upp-prod-us.s3.amazonaws_zof7jm.jpg",
    rooms: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  },
]
const seed = async () => {
  for (let i = 0; i < COUNTRIES.length; i++) {
    const { name, nameEN, image, rooms, isTurkey } = COUNTRIES[i]
    await db.country.create({
      data: {
        isTurkey,
        nameEN,
        name,
        image,
        rooms,
      },
    })
  }
}

export default seed
