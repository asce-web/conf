function resizeProgram() {
  function setProgramHeight(n) {
    n = n || 1 // number of headings stacked vertically
    $('.o-Tabs').height(function () {
      var current_panel = $(this).find('.o-Tabs__Panel--shown')
      var current_tab = current_panel.prev('.o-Tabs__Tab')
      function totalHeight($query) {
        return $query.height()
          + parseInt($query.css('padding-top'))
          + parseInt($query.css('margin-bottom'))
      }
      return totalHeight(current_panel) + (n * totalHeight(current_tab))
    })
  }
  $('.o-Tabs__Panel--js').css('bottom', function () {
    return parseInt($(this).parents('.o-Tabs').css('padding-bottom'))
  })
  if ($(window).width() < 480) { // @media screen and (min-width: 30em)
    setProgramHeight($('.o-Tabs__Tab').length)
  } else {
    setProgramHeight(1)
  }
}
function updateProgram() {
  $(this).parents('.o-Tabs').each(function () {
    $(this).find('.o-Tabs__Tab').removeClass('o-Tabs__Tab--selected')
    $(this).find('.o-Tabs__Panel').removeClass('o-Tabs__Panel--hiddenBefore o-Tabs__Panel--shown o-Tabs__Panel--hiddenAfter')
  })
  $(this).parents('.o-Tabs__Tab').each(function () {
    $(this).addClass('o-Tabs__Tab--selected')
      .next('.o-Tabs__Panel').addClass('o-Tabs__Panel--shown')
    $(this).prevAll('.o-Tabs__Tab').next('.o-Tabs__Panel').addClass('o-Tabs__Panel--hiddenBefore')
    $(this).nextAll('.o-Tabs__Tab').next('.o-Tabs__Panel').addClass('o-Tabs__Panel--hiddenAfter')
  })
  resizeProgram()
}
$(window).resize(resizeProgram)
$('.o-Tabs .o-Tabs__Panel').addClass('o-Tabs__Panel--js')
$('.o-Tabs .o-Tabs__Check:checked').each(updateProgram)
$('.o-Tabs .o-Tabs__Check').change(updateProgram)
