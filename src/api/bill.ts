import { request } from "@/utils/index";
import type { Bill, BillItem } from "@/views/bill/index";

interface GetBillListRequest {
  date: number;
  page: number;
  page_size?: number;
  type_id?: number;
}

interface GetBillListResponse {
  total_expense: number; // 总支出
  total_income: number; // 总收入
  total_page: number; // 总页数
  list: Bill[];
}

interface TypesItem {
  total_amount: number;
  type_name: string;
  type_id: number;
}
export interface GetBillMonthDataResponse {
  expense_list: TypesItem[] | [];
  income_list: TypesItem[] | [];
  total_expense: number;
  total_income: number;
}

// 添加账单
export function addBill(params: BillItem) {
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
  return request<Bill[]>({
    url: `/bill/detail?id=${id}`,
    method: "get",
  });
}

// 更新账单
export function updateBill(params: BillItem) {
  return request({
    url: "/bill/update",
    method: "put",
    data: params,
  });
}

// 删除账单
export function deleteBill(id: number) {
  return request({
    url: `/bill/delete?id=${id}`,
    method: "delete",
  });
}

// 获取账单当月统计数据
export function getMonthBillData(date: number) {
  return request<GetBillMonthDataResponse>({
    url: `/bill/date?date=${date}`,
    method: "get",
  });
}
