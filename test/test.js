var should = require('chai').should(),
    scapegoat = require('../index'),
    verify = scapegoat.verify;

describe('#verify', function() {
  it('uses defaults', function() {
    verify({'key1':'val1', 'key2':'val2'},{}).should.equal({'key1':'val1', 'key2':'val2'});
  });

  it('use value if provided', function() {
    verify({'key1':'val1', 'key2':'default'},{'key2':'val2'}).should.equal({'key1':'val1', 'key2':'val2'});
  });

});