const http = require('http')

http.createServer( function( req, res ) {

  const user = { name: 'yoo', email: 'a.b@a.com'}
  console.log(req.httpVersion)
  res.write(JSON.stringify({ user }))
  res.end()

}).listen(8899)
