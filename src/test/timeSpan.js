const expect = require('chai').expect;
const timeSpan = require('../src/client/dateUtils/timeSpan.js').timeSpan;


const todayDate = new Date();
const todayStamp = `${todayDate.getFullYear().toString()}_${(todayDate.getMonth()+1).toString().padStart(2,'0')}_${todayDate.getDate().toString().padStart(2,'0')}`;

describe('timeSpan.Span object', function() {
    describe('timeSpan.Span.constructor', function() {
        it('is created using two dates', function() {
            let April24_2010 = new Date(2010, 03, 24),
                April27_2010 = new Date(2010, 03, 27),
                ts = new timeSpan.Span(April24_2010, April27_2010, "day");

            expect(ts).to.have.property('beginDate');
            expect(ts).to.have.property('endDate');
            expect(ts).to.have.property('includes');
        })
        it('throws an exception if the first date is after the second date', function() {
            let May24_2010 = new Date(2010, 04, 24);
            let April27_2010 = new Date(2010, 03, 27);

            expect(function() {
                new timeSpan.Span(May24_2010, April27_2010, "day");
            }).to.throw(timeSpan.invalidDateSpan);
        })
    })

    describe('timeSpanUtils.TimeSpan.includes', function() {
        describe('indicates if a given date is included in a time span', function() {
            it('can be used with units set to years', function() {
                let April24_2010 = new Date(2010, 03, 24),
                    April27_2013 = new Date(2013, 03, 27),
                    ts = new timeSpan.Span(April24_2010, April27_2013, timeSpan.units.years);
                expect(ts.includes(new Date(2010, 03, 24))).to.equal(true);
                expect(ts.includes(new Date(2012, 03, 24))).to.equal(true);
                expect(ts.includes(new Date(2016, 03, 28))).to.equal(false);
            })

            it('can be used with units set to months', function() {
                let April24_2010 = new Date(2010, 03, 24),
                    April27_2013 = new Date(2013, 03, 27),
                    ts = new timeSpan.Span(April24_2010, April27_2013, timeSpan.units.months);
                expect(ts.includes(new Date(2010, 03, 28))).to.equal(true);
                expect(ts.includes(new Date(2010, 02, 28))).to.equal(false);
                expect(ts.includes(new Date(2010, 04, 28))).to.equal(true);
            })

            it('can be used with units set to days', function() {
                let April24_2010 = new Date(2010, 03, 24),
                    April27_2013 = new Date(2013, 03, 27),
                    ts = new timeSpan.Span(April24_2010, April27_2013, timeSpan.units.days);
                expect(ts.includes(new Date(2010, 03, 28))).to.equal(true);
                expect(ts.includes(new Date(2010, 02, 28))).to.equal(false);
                expect(ts.includes(new Date(2013, 04, 28))).to.equal(false);
            })
        })
    })
})

describe('timeSpanUtils.Day constructor', function() {
    it('is created using a single date', function() {
        let April24_2010 = new Date(2010, 03, 24),
            ts = new timeSpan.Day(April24_2010);
        expect(ts).to.have.property('weekDayIdx');
    })
    describe('timeSpanUtils.Day.weekDayIdx', function() {
        it('returns the weekday index (0-Sunday to 6-Saturday) of that day', function() {
            let Wednesday22May2019 = new Date(2019, 04, 22),
                d = new timeSpan.Day(Wednesday22May2019);
            expect(d.weekDayIdx).to.equal(3);
        })
    })
})