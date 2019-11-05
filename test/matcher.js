const assert = require("assert");
const isDateOneDayOld  = require("../src/matcher.js");


describe('#isDataOneDayOld()', function () {
    it('should return false if last date in array is not older than 1 day ', function () {
        let arr = [ {from: new Date('2019-08-23 10:34')}, {from: new Date('2019-08-24 22:00')} ];
        let cur = {from: new Date('2019-08-25 02:00')};
        assert.equal(isDateOneDayOld(cur, arr), false);
    });

    it('should return false if last date in array is not older than 1 day ', function () {
        let arr = [ {from: new Date('2019-08-23 10:34')}, {from: new Date('2019-08-24 22:00')} ];
        let cur = {from: new Date('2019-08-26 11:00')};
        assert.equal(isDateOneDayOld(cur, arr), true);
    });
});
