import { Moment } from 'moment'

export class Draft<T> {
  constructor (public id: number = undefined,
               public type: string,
               public document: T,
               public created: Moment,
               public updated: Moment) {
  }
}
