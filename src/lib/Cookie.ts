export default class Cookie {
  static async getFromServer(key: string): Promise<string | undefined> {
    if(typeof window !== 'undefined') {
      throw new Error("Cannot get cookie from server")
    }

    const cookieStore = await import('next/headers')
    const cookie = cookieStore?.cookies().get(key)
    return cookie?.value
  }

  static async getFromClient(key: string): Promise<string | undefined> {
    if(typeof window === 'undefined') {
      throw new Error("Cannot get cookie from client")
    }

    const Cookies = await import('js-cookie').then(c => c.default)
    return Cookies.get(key)
  }

  static get(key: string) {
    return typeof window === 'undefined'
      ? this.getFromServer(key)
      : this.getFromClient(key)
  }

  static async setFromServer(key: string, value: string, options?: any) {
    if(typeof window !== 'undefined') {
      throw new Error("Cannot set cookie from server")
    }

    const cookieStore = await import('next/headers')
    cookieStore?.cookies().set(key, value, options)
  }

  static async setFromClient(key: string, value: string, options?: any) {
    if(typeof window === 'undefined') {
      throw new Error("Cannot set cookie from client")
    }

    const Cookies = await import('js-cookie').then(c => c.default)
    Cookies.set(key, value, options)
  }

  static set(key: string, value: string, options?: any) {
    return typeof window === 'undefined'
      ? this.setFromServer(key, value, options)
      : this.setFromClient(key, value, options)
  }
}