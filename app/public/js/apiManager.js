import site from '../../../config/site.config.json';

// if (process.env.NODE_ENV === 'development') {
//     require('../../../mock/todoList')
// }
const postApi = (path, mock) => {
    const host = '';
    const token = site.token ? '?token=' + localStorage.getItem('token') : '';
    return host + path + (mock ? '.mock' : '') + token;
};

export default {
    todoList: postApi('/api/todoList', true),
    uploadPic: postApi('/common/upload'),
}