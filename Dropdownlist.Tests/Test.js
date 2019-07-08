/// <reference path="../Dropdownlist/Scripts/Code.js" />
test("will add 5 to number", function () {
    var res = AddFive(10);
    equal(res, 15, "should add 5");
});