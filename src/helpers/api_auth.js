// require('./api.ai.min')
var config = {
  server: 'wss://api-ws.api.ai:4435/api/ws/query',
  serverVersion: '20150910', // omit 'version' field to bind it to '20150910' or use 'null' to remove it from query
  token: '7fc1f9ca1c4049e5adac262091e4405b', // Use Client access token there (see agent keys).
  sessionId: Date.now(),
  onInit: function() {
    console.log("> ON INIT use config");
  }
};
var apiAi = new window.ApiAi(config);
export default apiAi;