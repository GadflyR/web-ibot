  // 检查浏览器是否支持SpeechRecognition API
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (window.SpeechRecognition) {
    let recognition = new SpeechRecognition();
    recognition.lang = 'zh-CN', 'en-US'; // 设置语言
    recognition.interimResults = true; // 设置为返回临时结果
    // recognition.continuous = true; // 连续识别如果需要可以开启
  
    let timeoutID; // 用于存储定时器ID
    let finalTranscript = ''; // 用于存储最终识别的文本
  
    recognition.onresult = function(event) {
      finalTranscript = ''; // 新的录音结果，清空之前的文本
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        finalTranscript += event.results[i][0].transcript;
      }
      let dialogueBox = document.getElementById('dialogue-box');
      dialogueBox.textContent = '我: ' + finalTranscript; // 更新对话框文本
    };
  
    recognition.onend = function() {
      clearTimeout(timeoutID); // 清除定时器
      if (finalTranscript) {
        SendMessageService(finalTranscript); // 发送文本到后端服务器
      } else {
        startRecognition(); // 如果没有文本则直接重新开始识别
      }
    };
  
    function SendMessageService(text) {
      const endpoint = 'http://192.168.1.164:5000/SendMessageService'; // Flask服务器地址
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: text }) // 将文本数据转换为JSON字符串
      };
  
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(data => {
          let resultBox = document.getElementById('resultBox'); // 确保你有一个ID为resultBox的元素来显示结果
          resultBox.textContent = data.answer; // 将服务器返回的答案显示在文本框中
          // 假设data.voice是音频文件的URL
          if (data.voice) {
            let audioSrc = data.voice + "?t=" + new Date().getTime(); // 添加时间戳
  			let audio = new Audio(audioSrc);
            audio.play().catch(e => console.error("播放音频失败:", e));
          }
          startRecognition(); // 处理完后重新开始语音识别
        })
        .catch(error => {
          console.error('Error:', error);
          startRecognition(); // 出错后重新开始语音识别
        });
    }
  
    recognition.onerror = function(event) {
      console.error('语音识别错误:', event.error);
      startRecognition(); // 出错后重新开始语音识别
    };
  
    function startRecognition() {
      finalTranscript = ''; // 清空之前的文本
      recognition.start(); // 重新开始语音识别
    }
  
    // 开始语音识别
    startRecognition();
  } else {
    alert('您的浏览器不支持语音识别功能。');
  }