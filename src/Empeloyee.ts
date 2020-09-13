import { Person } from './Person'

export class Employee extends Person {
  managerId: string
  constructor(id:string, name: string, managerId: string){
    super(id, name)
    this.managerId = managerId
  }
}
