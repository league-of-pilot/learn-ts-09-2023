function timing() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const value = descriptor.value
    descriptor.value = async function (...args: any[]) {
      //   const start = performance.now()
      //   const result = value.apply(this, args)
      //   const end = performance.now()
      //   console.log(`Execution time: ${end - start}`)
      //   return result
      console.time("time run")
      const out = await value.apply(this, args)
      //   console.timeLog("time run")
      console.timeEnd("time run")
      return out
    }
  }
}

export { timing }
