let proxyObj={}

proxyObj['/']={
  //websocket
  ws:false,

  target:'http://localhost:8081',

  changeOrigin:true,

  pathRewrite:{
    '^/':'/'
  }
}



module.exports={
  //vue项目服务和端口配置
  devServer:{
    host:'localhost',
    port:8080,
    proxy:proxyObj
  }
}