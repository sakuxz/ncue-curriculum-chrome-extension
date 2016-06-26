onload = function() {
  document.querySelector('.go-btn').addEventListener('click', function(event) {
    chrome.tabs.create({
      active: true,
      url: 'http://webap0.ncue.edu.tw/deanv2/other/ob010'
    });
  });
};
