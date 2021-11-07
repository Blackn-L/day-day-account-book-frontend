import { request } from "@/utils/index";
interface AddBillRequest {
  amount: number; // 金额
  type_id: number; // 类型 ID
  date: number; // 账单日期,时间戳
  pay_type: number; // 支出/收入
  remark?: string;
}

// 添加账单
export function addBill(params: AddBillRequest) {
  return request({
    url: "/bill/add",
    method: "post",
    data: params,
  });
}
