import { request } from "@/utils/index";
import type { Bill } from "@/views/bill/index";
interface AddBillRequest {
  amount: number; // 金额
  type_id: number; // 账单类型 ID
  type_name: string; // 账单类型名
  date: number; // 账单日期,时间戳
  pay_type: number; // 支出/收入
  remark?: string;
}

interface GetBillListRequest {
  date: number;
  page: number;
  page_size?: number;
  type_id?: number;
}

interface GetBillListResponse {
  totalExpense: number; // 总支出
  totalIncome: number; // 总收入
  totalPage: number; // 总页数
  list: Bill[];
}

// 添加账单
export function addBill(params: AddBillRequest) {
  return request({
    url: "/bill/add",
    method: "post",
    data: params,
  });
}

// 获取账单列表
export function getBillList(params: GetBillListRequest) {
  return request<GetBillListResponse>({
    url: `/bill/list?date=${params.date}&page=${params.page}&page_size=${params.page_size}&type_id=${params.type_id}`,
    method: "get",
  });
}

// 获取账单详情
export function getBillDetail(id: number) {
  return request<AddBillRequest>({
    url: `/bill/detail?id=${id}`,
    method: "get",
  });
}
