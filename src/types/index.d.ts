type Employee = {
  name: string;
  age: number;
};

declare global {
  var myObj: Employee;
}
export {};
