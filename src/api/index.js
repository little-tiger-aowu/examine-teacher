import request from '@/utils/request';
// import requestJson from '@/utils/requestJson';

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

// 保存审核结果
export function saveEvaluate(data) {
    return request({
        url: '/referees/save_evaluate',
        method: 'POST',
        data
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

// 获取全部案例
export function illnessCases(params) {
    return request({
        url: 'illness_cases/page',
        method: 'GET',
        params: params
    });
}

// 打标签
export function tag(params) {
    return request({
        url: 'illness_cases/tag',
        method: 'POST',
        data: params
    });
}

// 获取评审列表
export function refereesPage() {
    return request({
        url: '/referees/page',
        method: 'GET'
    });
}

// 获取评审列表
export function refereesChoose(data) {
    return request({
        url: '/referees/choose',
        method: 'POST',
        data
    });
}
