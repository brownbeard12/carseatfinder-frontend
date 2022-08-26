require('dotenv').config()
const { Collection } = require('faunadb')
const faunadb = require('faunadb')
const q = faunadb.query

//Setup Fauna
const secret = process.env.FAUNADB_SECRET
let endpoint = process.env.FAUNADB_ENDPOINT

if (typeof secret === 'undefined' || secret === '') {
  console.error('key not set')
  process.exit(1)
}

if (!endpoint) endpoint = 'https://db.us.fauna.com'

let mg, domain, port, scheme
if ((mg = endpoint.match(/^(https?):\/\/([^:]+)(:(\d+))?/))) {
  scheme = mg[1] || 'https'
  domain = mg[2] || 'db.us.fauna.com'
  port = mg[4] || 443
}

const client = new faunadb.Client({
  secret: secret,
  domain: domain,
  port: port,
  scheme: scheme,
})

function getProducts() {
  return client.query(q.Paginate(
      q.Documents(q.Collection("car_seats")),
      {size: 1000}
  ))
    .then((response) => {
      const linkRefs = response.data;
      const getAllLinksDataQuery = linkRefs.map((ref) => {
        return q.Get(ref)
      })

      return client.query(getAllLinksDataQuery).then(ret => {
        return ret
      })
    }).catch(error => {
      return error
    })
}

module.exports = async function() {
  const data = await getProducts()

  return data
  
}