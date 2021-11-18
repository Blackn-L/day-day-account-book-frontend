/**  账单类型 */
export interface BillType {
  /**  type 的 id, 0 代表全部 */
  id: number;
  name: string;
  /**  type 的类型, 1 位支出，2 为收入 */
  type?: 1 | 2;
}
/**  单日账单单条记录 */
export interface BillItem {
  id?: number;
  pay_type?: 1 | 2;
  /** 消费金额 */
  amount?: string;
  /** 消费时间，时间戳 */
  date?: string;
  /** 消费类型 */
  type_id?: number;
  /** 消费类型名称 */
  type_name?: string;
  remark?: string;
}
/**  单日账单全部记录 */
export interface Bill {
  date: string;
  bills: BillItem[];
}

