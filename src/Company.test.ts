import {Company} from './Company'
import { Ceo } from './Ceo';
import { Employee } from './Empeloyee';
import { assert } from 'console';

test('Throw an error when trying to add an employee with non existing manager', () => {
  const c = new Company()
  expect(() => {
    c.addEmployee('10','Mike','1')
  }).toThrow('Manager does not exist.')
});

test('Throw an error when trying to add an employee which already exists', () => {
  const c = new Company()
  expect(() => {
    c.addCeo('1','Bianca')
    c.addEmployee('10','Mike','1')
    c.addEmployee('10','Mike','1')
  }).toThrow('Employee already exists.')
});

test('Throw an error when trying to add an employee with the same Id as CEO', () => {
  const c = new Company()
  expect(() => {
    c.addCeo('1','Bianca')
    c.addEmployee('1','Mike','1')
  }).toThrow('Id already exists.')
});


test('Add an Employee', () => {
  const c = new Company()
  c.addCeo('1','Bianca')
  c.addEmployee('10', 'Mason', '1')
  const e:Employee = new Employee('10', 'Mason', '1')
  expect(c.getEmployee('10')).toEqual(e)
});

test('Throw an error when trying to add CEO when it already exists', () => {
  const c = new Company()
  expect(() => {
    c.addCeo('1','Mike')
    c.addCeo('2','Mason')
  }).toThrow('CEO already exists.')
});

test('Add a CEO', () => {
  const c = new Company()
  c.addCeo('1','Bianca')
  const ceo:Ceo = new Ceo('1', 'Bianca')
  expect(c.getCeo()).toEqual(ceo)
});

test('get an Employee that does not exist', () => {
  const c = new Company()
  expect(c.getEmployee('100')).toBe(undefined)
});

test('print the company hierarchy', () => {
  const c = new Company()
  c.addCeo('1', 'Mason')
  c.addEmployee('2', 'Billy', '1')
  c.addEmployee('3', 'Nick', '1')
  c.addEmployee('4', 'Freskia', '2')
  c.addEmployee('5', 'Ina', '2')
  c.addEmployee('6', 'Shy', '3')
  c.addEmployee('7', 'Nula', '3')
  c.printHierarchy()
  assert(true)
});
