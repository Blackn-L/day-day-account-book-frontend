export interface BillType {
    id: number; // type 的 id, 0 代表全部
    name: string;
    type?: 1 | 2; // type 的类型, 1 位支出，2 为收入
  }