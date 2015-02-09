var expect = require('chai').expect,
    namedparam = require('../index'),
    verify = namedparam.verify;

describe('#verify', function() {
  it('uses defaults', function() {
    var res = verify({'key1':'val1', 'key2':'val2'},{});
    expect(res).to.have.property('key1').to.equal('val1');
    expect(res).to.have.property('key2').to.equal('val2');
  });

  it('use value if provided', function() {
    var res = verify({'key1':'val1', 'key2':'default'},{'key2':'val2'});
    expect(res).to.have.property('key1').to.equal('val1');
    expect(res).to.have.property('key2').to.equal('val2');
  });

});