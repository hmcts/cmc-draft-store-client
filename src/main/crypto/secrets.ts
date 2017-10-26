export class Secrets {

  constructor (
    public readonly primary: string,
    public readonly secondary?: string
  ) { }

  asHeader (): string {
    return this.secondary ? `${this.primary},${this.secondary}` : this.primary
  }
}
