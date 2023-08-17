function findItem(arr, value) {
  return arr.find((item) => item.value === value) || {};
}
function downloadBlobFromURL(url, filename) {
  // 创建一个 XMLHttpRequest 对象
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "blob";

  xhr.onload = function () {
    if (xhr.status === 200) {
      // 将响应数据转换为 Blob
      const blob = xhr.response;

      // 创建一个下载链接
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename || url.split("/").slice(-1); // 设置文件名
      link.click();

      // 释放链接对象
      window.URL.revokeObjectURL(link.href);
    }
  };

  xhr.send();
}

/*
* UPDATE images
SET url_json = (
  SELECT JSON_ARRAYAGG(JSON_UNQUOTE(SUBSTRING_INDEX(url, '/', -1)))
  FROM JSON_TABLE(url_json, '$[*]' COLUMNS (
    url VARCHAR(255) PATH '$'
  ))
);
*
* */
