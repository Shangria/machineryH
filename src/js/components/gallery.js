window.addEventListener('load', function () {
    const items = $(".gallery__container .gallery__col");
    const numItems = items.length;
    const perPage = 6;

    items.slice(perPage).hide();

    $('#pagination-container').pagination({
        items: numItems,
        itemsOnPage: perPage,
        prevText: "Previous page",
        nextText: "Next page",
        onPageClick: function (pageNumber) {
            const showFrom = perPage * (pageNumber - 1);
            const showTo = showFrom + perPage;
            items.hide().slice(showFrom, showTo).css({
                'opacity': '0',
                'display': 'flex',
            }).show('slow').animate({opacity: 1})
        }
    });
});

window.addEventListener('load', function () {
    let modalContainer = $('<div>');
    $(modalContainer).html('<div id="gallery-zoomer" class="modal fade " tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\n                       ' +
        ' <div class="modal-dialog" role="document">\n   ' +
        ' <div class="modal-content">\n                          ' +
        '  <div class="modal-header">\n                              ' +
        '      <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n       ' +
        '        <span aria-hidden="false">&times;</span>\n               ' +
        '         </button>\n                         ' +
        '       </div>\n                            ' +
        ' <div id="gallery-zoomer-body" class="modal-body">\n     ' +
        '    <img class="modal-img" data-gallery-zoomer-img>\n     ' +
        '   </div>\n                 ' +
        '    </div>\n                      ' +
        ' </div>\n      ' +
        '</div>');
    $(document.body).append(modalContainer);

    const modal = $('#gallery-zoomer');
    modal.find('.close').on('click', function () {
        $(modal).modal('hide');
    })
    $(document).on('click', function (event) {
        let target = event.target;
        let url = $(target).attr('data-gallery-image-zoom-src');
        let alt = $(target).attr('data-gallery-image-alt');

        if (url) {
            modal.find('[data-gallery-zoomer-img]')
                .attr('alt', alt)
                .attr('src', url);

            $(modal).modal('show');
        }
    });
});


