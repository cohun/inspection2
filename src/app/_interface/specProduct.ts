export interface SpecProduct {
  fid: string;
  id: string;
  user: string;
  site: string;
  operationStart: string;
  inspections: [string];
  maintenance: [string];
  repair: [string];
}
