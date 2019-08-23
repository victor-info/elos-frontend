export class Tools {
 
    id: number;
    link: string;
    title: string;
    description: boolean;
 
    constructor(values: Object = {}) {
      //Constructor initialization
      Object.assign(this, values);
  }
 
}