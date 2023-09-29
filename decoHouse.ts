const { ColouredHouse } = require("./decoColor")

@ColouredHouse()
class Largehouse {
  constructor(
    private adress: string,
    private floors = 3,
    private colour?: string
  ) {}

  toString(): string {
    return `This is a Largehouse with ${this.floors} Floors @ ${this.adress} being ${this.colour}`
  }
}

@ColouredHouse("Green")
class SmallHouse {
  constructor(
    private adress: string,
    private floors = 1,
    private colour?: string
  ) {}

  toString(): string {
    return `This is a SmallHouse with ${this.floors} Floors @ ${this.adress} being ${this.colour}`
  }
}

const decoHouse = () => {
  const firstHouse = new SmallHouse("5331 Rexford Court, Montgomery AL 36116")
  const secondHouse = new Largehouse("8642 Yule Street, Arvada CO 80007")
  console.info(firstHouse.toString())
  console.info(secondHouse.toString())
}

export { decoHouse }
