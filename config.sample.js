config = {
  mongodb_server_url: 'mongodb://127.0.0.1:27017/ptpush',
  server_http_port: 3000,
  server_https_port: 3001,
  enable_https: true,
  private_key_path: './cert/private.pem',
  certificate_path: './cert/file.crt'
}

module.exports = config;
