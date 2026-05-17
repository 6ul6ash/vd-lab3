export type BuildingCategory = "residential" | "commercial" | "industrial";
 
export interface Building {
  id: number;
  name: string;
  category: BuildingCategory;
  cssClass: string;
  level: number;
}
 