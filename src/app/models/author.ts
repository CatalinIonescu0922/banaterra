// In author.ts
export interface Author {
  id: number; // Assuming ID is a number
  name: string;
  des: string;
  b_date: Date | string;  // Use Date or string depending on your format requirements
  d_date: Date | string;
  quotes: string[];       // Array of quotes associated with the author
}
