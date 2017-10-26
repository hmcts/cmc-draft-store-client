export class Secrets {

  readonly primary: string
  readonly secondary?: string

  constructor (primary: string, secondary?: string) {
    this.primary = primary
    this.secondary = secondary
  }

  asHeader (): string {
    return this.secondary ? `${this.primary},${this.secondary}` : this.primary
  }
}
