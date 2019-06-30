var server = require('../index');
var chai = require('chai');
var chaiHttp = require('chai-http');



chai.use(chaiHttp);
chai.should();

describe('Loading Express', () => {

  it('Main page status', function(done) {
    chai.request(server)
      .get('/')
      .end((err, resp) => {
        resp.should.have.status(200);
        server.close();
        done();
      })

  });

})
