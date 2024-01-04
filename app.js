document.addEventListener("DOMContentLoaded", function () {
  // Kết nối MQTT
  var serverUrl = "wss://8b48e8b807d7405d9cc0013a12fd326b.s1.eu.hivemq.cloud:8884/mqtt";
  var clientId = "client" + Math.random().toString(16).substr(2, 8);

  var client = mqtt.connect(serverUrl, {
    clientId: clientId,
    username: "viettelxoay", // Thêm thông tin xác thực nếu cần thiết
    password: "Pbl123456789@", // Thêm thông tin xác thực nếu cần thiết
  });

  // Lấy các vị trí cần điền dữ liệu
  var nhiet = document.getElementById("nhiet");
  var pH = document.getElementById("pH");
  var TDS = document.getElementById("TDS");
  var NTU = document.getElementById("NTU");

  // Kiểm tra xem các vị trí đã tìm thấy trong DOM chưa
  if (nhiet && pH && TDS && NTU) {
    // Subcribe vào các topic
    client.on("connect", function () {
      console.log("Connected to shiftr.io broker");
      client.subscribe("nhiet");
      client.subscribe("pH");
      client.subscribe("TDS");
      client.subscribe("NTU");
    });

    // Lấy tin nhắn từ các topic và cập nhật dữ liệu tương ứng
    client.on("message", function (topic, message) {
      if (topic === "nhiet") {
        nhiet.innerHTML = message.toString();
      } else if (topic === "pH") {
        pH.innerHTML = message.toString();
      } else if (topic === "TDS") {
        TDS.innerHTML = message.toString();
      } else if (topic === "NTU") {
        NTU.innerHTML = message.toString();
      }
    });
  } else {
    console.error("One or more elements not found in the DOM.");
  }
});
