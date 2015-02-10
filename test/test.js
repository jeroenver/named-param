var expect = require('chai').expect,
    namedparam = require('../index'),
    verify = namedparam.verify,
    mandatory = namedparam.mandatory;

describe('verify optional parameters', function() {
    it('uses defaults', function() {
        var res = verify({
            'key1': 'val1',
            'key2': 'val2'
        }, {});
        expect(res).to.have.property('key1').to.equal('val1');
        expect(res).to.have.property('key2').to.equal('val2');
    });

    it('use value if provided', function() {
        var res = verify({
            'key1': 'val1',
            'key2': 'default'
        }, {
            'key2': 'val2'
        });
        expect(res).to.have.property('key1').to.equal('val1');
        expect(res).to.have.property('key2').to.equal('val2');
    });

    it('wrong type throws exception: boolean', function() {
        expect(verify.bind(null, {
            'key1': true
        }, {
            'key1': 'true'
        })).to.throw('boolean type expected');
    });
});

describe('verify mandatory parameters', function() {
    it('missing parameter throws exception', function() {
        expect(verify.bind(null, {
            'key1': mandatory.STRING
        }, {})).to.throw('Mandatory parameter missing');
    });
});