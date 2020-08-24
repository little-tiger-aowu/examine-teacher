import request from '@/utils/request';

// 登陆
export function login(data) {
  return request({
    url: '/authorize/referee',
    method: 'POST',
    data
  });
}
// 获取评审列表
export function viewIllnessList() {
    return request({
      url: '/referees/view_illness',
      method: 'GET',
    });
  }

  // 提交审核结果
export function submitEvaluate(data) {
  return request({
    url: '/referees/submit_evaluate',
    method: 'POST',
    data
  });
}