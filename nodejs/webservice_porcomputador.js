var request = require('request')
var cheerio = require('cheerio')
var http = require('http')
var url = require('url')

function getFirstTable(htmlSource) {
  var $ = cheerio.load(htmlSource)

  var table = $("table:nth-child(1)")
    //var table2 = $("table:nth-child(2)")
    //table2.remove()
  return table.html()
}

//para acceder: localhost:9999/?opcion=calcular&limite=10,&Pesos=3,1,2,3,&Valores=4,5,6,
console.log('Escuchando...  curl "http://localhost:9999/?opcion=calcular&limite=30,&Pesos=3,1,2,3,&Valores=4,5,6,"')
http.createServer(function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  var url_parts = url.parse(req.url, true)
  var query = url_parts.query
  console.log(query) //{Object}
  if (query.opcion === 'calcular') {
    var postData = {
      'limite': query.limite, //Peso límite
      'Pesos': query.Pesos, //#artículos, 3 valores de pesos
      'Valores': query.Valores //3 valores de valores
    }
    request.post({
      url: 'http://porcomputador.com/Perl/mochila2.php', //?limite=10&Pesos=3,1,2,3&Valores=4,5,6
      form: postData
    }, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        //console.log(body)
        var tabla = getFirstTable(body)
        res.end(tabla + '\n')
      } else {
        console.log('Error :', error)
      }
    })
  } else {
    res.end('\n')
  }
}).listen(9999)
