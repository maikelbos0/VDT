describe('a numericinput option', function () {
    it('can be provided for getDecimalSeparator', function () {
        var decimalSeparator;

        $('#input-options-decimal-separator').numericinput({
            getDecimalSeparator: function (element) {
                return ';';
            }
        }, function () {
            decimalSeparator = this.decimalSeparator;
        });

        expect(decimalSeparator).toEqual(';');
    });

    it('can be provided for getDecimalDigits', function () {
        var decimalDigits;

        $('#input-options-decimal-digits').numericinput({
            getDecimalDigits: function (element) {
                return 4;
            }
        }, function () {
            decimalDigits = this.decimalDigits;
        });

        expect(decimalDigits).toEqual(4);
    });

    it('can be provided for getNegativeSymbol', function () {
        var negativeSymbol;

        $('#input-options-negative-symbol').numericinput({
            getNegativeSymbol: function (element) {
                return '_';
            }
        }, function () {
            negativeSymbol = this.negativeSymbol;
        });

        expect(negativeSymbol).toEqual('_');
    });

    it('can be provided for getGroupSeparator', function () {
        var groupSeparator;

        $('#input-options-group-separator').numericinput({
            getGroupSeparator: function (element) {
                return '#';
            }
        }, function () {
            groupSeparator = this.groupSeparator;
        });

        expect(groupSeparator).toEqual('#');
    });

    it('can be provided for getGroupSizes', function () {
        var groupSizes;

        $('#input-options-group-sizes').numericinput({
            getGroupSizes: function (element) {
                return [4, 2, 3];
            }
        }, function () {
            groupSizes = this.groupSizes;
        });

        expect(groupSizes).toEqual([4, 2, 3]);
    });
});