import { Ceo } from './Ceo'
import { Employee } from './Empeloyee'

interface EmployeeDict {
  id?: Employee | Ceo
}

export class Company {
  private employeeDict: EmployeeDict
  private ceo: Ceo
  constructor() {
    this.employeeDict = {}
  }

  addEmployee(id: string, name: string, managerId: string) {
    if (this.employeeDict[managerId] || (this.ceo && this.ceo.id && managerId === this.ceo.id)) {
      if (id === this.ceo.id)
        throw new Error('Id already exists.')
      if (this.employeeDict[id] !== undefined)
        throw new Error('Employee already exists.')
      const employee = new Employee(id, name, managerId)
      this.employeeDict[id] = employee
    } else {
      throw new Error('Manager does not exist.')
    }
    return
  }

  addCeo(id: string, name: string) {
    if (this.ceo) {
      throw new Error('CEO already exists.')
    }
    const ceo = new Ceo(id, name)
    this.ceo = ceo
    this.employeeDict[id] = ceo
    return
  }

  getCeo() {
    return this.ceo
  }

  getEmployee(id: string) {
    if (this.employeeDict)
      return this.employeeDict[id]
    return
  }

  printHierarchy() {
    if (Object.keys(this.employeeDict).length === 0){
      console.log('No employee is registered yet.')
      return
    }
    this.traverseHierarchy(this.employeeDict, this.ceo.id)
  }

  private traverseHierarchy(employeeDict: EmployeeDict, eid: string, level = 0) {
    (Object as any).filter = (obj, predicate) => Object.fromEntries(Object.entries(obj).filter(predicate));
    console.log(Array(level).fill('\t').join('') + this.employeeDict[eid].name)
    const children = (Object as any).filter(employeeDict, ([id, employee]) => employee.managerId === eid)
    const grandChildren = (Object as any).filter(employeeDict, ([id, employee]) => employee.managerId !== eid)
    Object.values(children).forEach(element => {
      this.traverseHierarchy(grandChildren, (element as Employee).id, level + 1)
    });
    return
  }
}
