import { timing } from "./perfDeco"

const delay = <T>(time: number, data: T): Promise<T> =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(data)
    }, time)
  )

class Users {
  @timing()
  async getUsers() {
    return await delay(200, [])
  }
  async getUser(id: number) {
    return await delay(50, {
      id: `user:${id}`,
    })
  }
}

const bsTsMethod = async () => {
  const users = new Users()

  const user = await users.getUser(22)
  console.log(`Got ${JSON.stringify(user)}`)

  await users.getUser(42)
  await users.getUsers()

  //   const temp = new ExampleClass()
  // decoHouse()
}

export { Users, bsTsMethod }
