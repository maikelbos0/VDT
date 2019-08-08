/// <reference path="paging.html" />

describe('datagridview paging', function () {
    function triggerMouseup(element) {
        var event = jQuery.Event("mouseup");
        event.which = 1;

        $(element).trigger(event);
    }

    /*
    function generateData(dataRow, length) {
        var data = new Array()
        Array(15).fill()
    }
    */

    //$.fn.datagridview.defaults.getFooterPlugins = function() { return []; }
    //$.fn.datagridview.footerPlugins.custom: function (footerElement, metaData, datagridview) {}

    it('elements get added', function () {
        fail();
    });

    it('elements have access to the meta data', function () {
        fail();
    });

    it('elements have access to the datagridview', function () {
        fail();
    });

    it('elements have access to the original element', function () {
        fail();
    });

    it('basic display contains the right information', function () {
        fail();
    });

    it('extended display contains the right information', function () {
        fail();
    });

    it('prev-next contains buttons for first and previous', function () {
        fail();
    });

    it('prev-next buttons for first and previous are disabled on first page', function () {
        fail();
    });

    it('prev-next buttons for first and previous are enabled on second page', function () {
        fail();
    });

    it('prev-next buttons for first triggers request for first page', function () {
        fail();
    });

    it('prev-next buttons for previous triggers request for previous page', function () {
        fail();
    });

    it('prev-next contains buttons for last and next', function () {
        fail();
    });

    it('prev-next buttons for last and next are disabled on last page', function () {
        fail();
    });

    it('prev-next buttons for last and next are enabled on second to page', function () {
        fail();
    });

    it('prev-next buttons for last triggers request for last page', function () {
        fail();
    });

    it('prev-next buttons for next triggers request for next page', function () {
        fail();
    });

    it('prev-next contains buttons for specific pages', function () {
        fail();
    });

    it('prev-next button for current page is disabled', function () {
        fail();
    });

    it('prev-next button for all pages except current page are enabled', function () {
        fail();
    });

    it('prev-next button for page 3 triggers request for page 3', function () {
        fail();
    });

    it('prev-next button for page 3 triggers request with same page size', function () {
        fail();
    });

    it('page input contains the right elements', function () {
        fail();
    });

    it('page input for page 3 triggers request for page 3', function () {
        fail();
    });

    it('page size input contains the right elements', function () {
        fail();
    });

    it('page size input for page size 50 triggers request for same page with page size 50', function () {
        fail();
    });
});