export interface BillType {
  id: number; // type 的 id, 0 代表全部
  name: string;
  type?: 1 | 2; // type 的类型, 1 位支出，2 为收入
}

// 单日账单单条记录
export interface BillItem {
  id?: number;
  pay_type?: 1 | 2;
  amount?: string; // 消费金额
  date?: string; // 消费时间，时间戳
  type_id?: number; // 消费类型
  type_name?: string; // 消费名称
  remark?: string; // 备注
}
// 单日账单
export interface Bill {
  date: string;
  bills: BillItem[];
}
