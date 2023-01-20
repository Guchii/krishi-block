interface Land {
  area: number;
  unit: 'sq.ft' | 'sq.km';
  address: string;
  onSale: boolean;
  image: string;
  verified: boolean;
  pid: string;
  survey: string;
  document: string;
  owner: string;
  id: number;
}

interface User {
  id: number;
  address: string;
  name: string;
  adhar: number;
  pan: string;
  document: string;
  verified: boolean;
}

type usertype = '1' | '2' | '3' | '4' | undefined;

interface LinkItemInterface {
  href: string;
  name: string;
  description?: string;
}

interface Window {
  ethereum: any;
}
