export class Customer {
  constructor(
    public cno: number,
    public phno: number,
    public name: string,
    public tickets: Array<string>
  ) {}

  addTicket = ():void=>{}
}
