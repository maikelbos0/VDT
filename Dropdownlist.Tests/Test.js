/// <reference path="Test.html" />

describe("This test", function () {
    it('should be able to create and read an element', function () {
        const input = document.createElement('input');
        input.value = "what";

        expect(input.value).toEqual("what");
        expect(input.tagName).toEqual("INPUT");
    });

    it('should read the paragraph', function () {
        const para = document.getElementById('myparagraph');

        expect(para.innerText).toEqual("Can I read this?");
    });

    it('should read the paragraph using jQuery', function () {
        const para = $('#myparagraph');

        expect(para.text()).toEqual("Can I read this?");
    });
});