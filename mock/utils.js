const successCallback = tableListDataSource => ({
  code: 0,
  message: "操作成功",
  systemDate: new Date().getTime(),
  data: { ...tableListDataSource, total: tableListDataSource.list.length }
});

module.exports = {
  successCallback
};
