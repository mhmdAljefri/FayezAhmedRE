import prisma from "db"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */

const seed = async () => {
  const rooms = await prisma.roomWithPrice.findMany({})
  console.log(rooms.length)

  rooms.forEach(async (room) => {
    console.log(typeof room.priceQatar, typeof room.roomPrice)
    await prisma.roomWithPrice.update({
      where: { id: room.id },
      data: {
        roomPrice: parseInt(room.priceQatar || "0", 10),
      },
    })
  })
}

export default seed
