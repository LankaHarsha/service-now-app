describe('Test Suite for CommonUtils Service', function() {

    var commontUtilsServiceMock;
    var inputObj = [{
        'name': 'rahul',
        'score': 6
    }, {
        'name': 'sachin',
        'score': 60
    }, {
        'name': 'ganguly',
        'score': 5
    }];

    var compareObjects = function(source, dest) {
        return angular.equals(source, dest);
    };

    beforeEach(function() {

        angular.mock.module('snApp');
    });

    beforeEach(inject(function(_CommonUtilsService_) {

        commontUtilsServiceMock = _CommonUtilsService_;
    }));

    it('TC - CommonUtilsService to be defined', function() {

        expect(commontUtilsServiceMock).toBeDefined();
    });

    it('TC - Testing getFormatted Function with input in validFormat', function() {

        var _sysDate = '20170309T120000';
        var result = commontUtilsServiceMock.getFormattedDate(_sysDate);
        expect(compareObjects(result, new Date(2017, 02, 09, 12, 0, 0))).toBeTruthy();
    });

    it('TC - Testing getFormatted Function with input in invalidFormat', function() {

        var _sysDate = '2017-0309T120000';
        var result = commontUtilsServiceMock.getFormattedDate(_sysDate);
        expect(result).toBeFalsy();
    });

    it('TC - Testing getMaxium Function with valid input', function() {


        var result = commontUtilsServiceMock.getMaximum(inputObj, 'score');
        expect(result).toBe(60);
    });

    it('TC - Testing getMaxium Function with empty input', function() {

        var inputObj = [];
        var result = commontUtilsServiceMock.getMaximum(inputObj, 'score');
        expect(result).toBe(0);
    });

    it('TC - Testing filterList Function with valid input - Case 1', function() {

        var outputObj = [{
            'name': 'sachin',
            'score': 60
        }];

        var result = commontUtilsServiceMock.filterList(inputObj, 'score', 60);
        expect(compareObjects(result, outputObj)).toBeTruthy();
    });

    it('TC - Testing filterList Function with valid input - Case 2', function() {

        var outputObj = [];

        var result = commontUtilsServiceMock.filterList(inputObj, 'score', 70);
        expect(compareObjects(result, outputObj)).toBeTruthy();
    });

    it('TC - Testing filterList Function with empty input', function() {

        var inputObj = [];
        var outputObj = [];

        var result = commontUtilsServiceMock.filterList(inputObj, 'score', 60);
        expect(compareObjects(result, outputObj)).toBeTruthy();
    });

    it('TC - Testing sortList Function with valid input - Case 1 - Ascending', function() {

        var outputObj = [{
            'name': 'ganguly',
            'score': 5
        }, {
            'name': 'rahul',
            'score': 6
        }, {
            'name': 'sachin',
            'score': 60
        }];

        var result = commontUtilsServiceMock.sortList(inputObj, 'score', 'asc');
        expect(compareObjects(result, outputObj)).toBeTruthy();
    });

    it('TC - Testing sortList Function with valid input - Case 1 - Descending', function() {

        var outputObj = [{
            'name': 'ganguly',
            'score': 5
        }, {
            'name': 'rahul',
            'score': 6
        }, {
            'name': 'sachin',
            'score': 60
        }];

        var result = commontUtilsServiceMock.sortList(inputObj, 'score', 'desc');
        expect(compareObjects(result, outputObj.reverse())).toBeTruthy();
    });

    it('TC - Testing sortList Function with empty input', function() {

        var inputObj = [];
        var outputObj = [];

        var result = commontUtilsServiceMock.sortList(inputObj, 'score', 'desc');
        expect(compareObjects(result, outputObj)).toBeTruthy();
    });

    it('TC - Testing calculateDiffInDays Function with valid input - Case 1', function() {

        var startDate = new Date(2013, 05, 23);
        var endDate = new Date(2013, 05, 25);

        var result = commontUtilsServiceMock.calculateDiffInDays(endDate, startDate);
        expect(result).toBe(2);
    });

    it('TC - Testing calculateDiffInDays Function with valid input - Case 2', function() {

        var startDate = new Date(2013, 05, 23);
        var endDate = new Date(2013, 05, 23);

        var result = commontUtilsServiceMock.calculateDiffInDays(endDate, startDate);
        expect(result).toBe(0);
    });

    it('TC - Testing calculateDiffInHours Function with valid input - Case 1', function() {

        var startDate = new Date(2013, 05, 23, 8, 0, 0);
        var endDate = new Date(2013, 05, 23, 12, 0, 0);

        var result = commontUtilsServiceMock.calculateDiffInHours(startDate, endDate);
        expect(result).toBe(4);
    });

    it('TC - Testing calculateDiffInHours Function with valid input - Case 2', function() {

        var startDate = new Date(2013, 05, 23, 8, 0, 0);
        var endDate = new Date(2013, 05, 23, 8, 0, 0);

        var result = commontUtilsServiceMock.calculateDiffInHours(startDate, endDate);
        expect(result).toBe(0);
    });
});
