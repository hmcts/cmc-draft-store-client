import { Moment } from 'moment'

export class Draft<T> {
  constructor (public id: number,
               public type: string,
               public document: T,
               public created: Moment,
               public updated: Moment) {
  }
}
