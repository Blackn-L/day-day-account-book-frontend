// 校验用户名是否复合要求
const useCheckUername = (username: string) => {
  // 数字、字母、下划线至少包含两种，长度为 4-20
  const reg = /(?!^\d+$)(?!^[A-Za-z]+$)(?!^_+$)^\w{4,20}$/g;
  return reg.test(username);
};
const useCheckPassword = (password: string) => {
  // 数字、字母、下划线至少包含两种，长度为 8-20
  const reg = /(?!^\d+$)(?!^[A-Za-z]+$)(?!^_+$)^\w{8,20}$/g;
  return reg.test(password);
};

export default {
  useCheckUername,
  useCheckPassword,
};
