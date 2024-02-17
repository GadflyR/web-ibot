// 为所有具有特定类的按钮添加点击事件
document.querySelectorAll('.sendDataButton').forEach(button => {
    button.addEventListener('click', function() {
      const valueToSend = this.getAttribute('data-value'); // 获取按钮的data-value属性
      sendData(valueToSend);
    });
  });
  
  function sendData(value) {
    const endpoint = 'http://192.168.1.164:5000/SelectDifficulty'; // 替换为您的后端端点
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: value }) // 发送的数据
    };
  
    // 使用fetch API发送数据
    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log('Response from server:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }