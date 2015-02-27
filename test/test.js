var expect = require('chai').expect,
    namedparam = require('../index'),
    verify = namedparam.verify,
    mandatory = namedparam.mandatory;

describe('verify optional parameters', function() {
    it('uses defaults', function() {
        var contract = {
            'key1': 'val1',
            'key2': 'val2'
        };
        var parameter = {};
        var res = verify(contract, parameter);
        expect(res).to.have.property('key1').to.equal('val1');
        expect(res).to.have.property('key2').to.equal('val2');
    });

    it('use value if provided: string', function() {
        var contract = {
            'key1': 'val1',
            'key2': 'default'
        };
        var parameter = {
            'key2': 'val2'
        };
        var res = verify(contract, parameter);
        expect(res).to.have.property('key1').to.equal('val1');
        expect(res).to.have.property('key2').to.equal('val2');
    });

    it('use value if provided: numeric', function() {
        var contract = {
            'key1': 'val1',
            'key2': 0
        };
        var parameter = {
            'key2': 1
        };
        var res = verify(contract, parameter);
        expect(res).to.have.property('key1').to.equal('val1');
        expect(res).to.have.property('key2').to.equal(1);
    });

    it('use value if provided: boolean', function() {
        var contract = {
            'key1': 'val1',
            'key2': true
        };
        var parameter = {
            'key2': false
        };
        var res = verify(contract, parameter);
        expect(res).to.have.property('key1').to.equal('val1');
        expect(res).to.have.property('key2').to.equal(false);
    });

    it('use value if provided: function', function() {
        var contract = {
            'key1': 'val1',
            'key2': function(){return "default";}
        };
        var parameter = {
            'key2': function(){return "impl";}
        };
        var res = verify(contract, parameter);
        expect(res).to.have.property('key1').to.equal('val1');
        expect(res).to.have.property('key2').to.be.a('function');
        expect(res.key2()).to.equal('impl');
    });

    it('wrong type throws exception: boolean', function() {
        var contract = {
            'key1': true
        };
        var parameter = {
            'key1': 'true'
        };
        expect(verify.bind(null, contract, parameter)).to.throw('boolean type expected');
    });
});

describe('verify mandatory parameters', function() {
    it('missing parameter throws exception', function() {
        var contract = {
            'key1': mandatory.STRING
        };
        var parameter = {};
        expect(verify.bind(null, contract, parameter)).to.throw('Mandatory parameter missing');
    });

    it('mandatoryEnum should be unique values', function() {
        var contract = {
            'key1': 0
        };
        var parameter = {
            'key1': 1
        };
        var res = verify(contract, parameter);
        expect(res).to.have.property('key1').to.equal(1);
    });

    it('mandatory string value, throw if not string', function() {
        fail('not impl');
    });
});