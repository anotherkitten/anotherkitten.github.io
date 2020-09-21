export class Page {
  id: number;
  cost: number;
  name: string;
  desc: string;
  route: string;
  unlocked: boolean;

  constructor(id, cost, name, desc, route) {
    this.id = id;
    this.cost = cost;
    this.name = name;
    this.desc = desc;
    this.route = route;
    this.unlocked = false;
  }
}