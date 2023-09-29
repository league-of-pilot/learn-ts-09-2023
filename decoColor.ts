export function ColouredHouse(colour: string = "Blue") {
  console.info("Deco colour is", colour)

  return function ClassDecorator<C extends new (...args: any[]) => any>(
    target: C,
    ctx: ClassDecoratorContext
  ) {
    const className = ctx.name?.toString()
    console.info("ClassName is", className)

    return class extends target {
      colour = colour
    }
  }
}
