export interface Cart {
  items: Array<Item>;
}

export interface Item {
  image: string;
  title: string;
  category: string;
  description: string;
  price: number;
  quantity: 1;
  id: number;
}
