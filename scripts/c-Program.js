function resizeProgram() {
  function setProgramHeight(n) {
    n = n || 1
    $('.c-Program').height(function () {
      var heading = $(this).find('.c-Program__Schedule--shown').prev('.c-Program__Hn')
      return $(this).find('.c-Program__Schedule--shown').height()
             + n * (heading.height() + parseInt(heading.css('margin-bottom')))
    })
  }
  $('.c-Program__Schedule').css('bottom', function () {
    return parseInt($(this).parents('.c-Program').css('padding-bottom'))
  })
  if ($(window).width() < 480) {
    $('.c-Program__Hn').css('width','')
    setProgramHeight($('.c-Program__Hn').length)
  } else {
    $('.c-Program__Hn').width((100/$('.c-Program__Hn').length) + '%')
    setProgramHeight(1)
  }
}
function updateProgram() {
  $('.c-Program__Hn').removeClass('c-Program__Hn--selected')
  $('.c-Program__Schedule').removeClass('c-Program__Schedule--hiddenBefore c-Program__Schedule--shown c-Program__Schedule--hiddenAfter')
  $(this).parents('.c-Program__Hn')
    .addClass('c-Program__Hn--selected')
    .next('.c-Program__Schedule').addClass('c-Program__Schedule--shown')
  $(this).parents('.c-Program__Hn').prevAll('.c-Program__Hn').next('.c-Program__Schedule').addClass('c-Program__Schedule--hiddenBefore')
  $(this).parents('.c-Program__Hn').nextAll('.c-Program__Hn').next('.c-Program__Schedule').addClass('c-Program__Schedule--hiddenAfter')
  resizeProgram()
}
$(window).resize(resizeProgram)
$('.c-Program__Schedule').addClass('-xo-1') // fallback `order: 1;`
  .css('position','absolute').css('left', 0)
$('.c-Program__Check:checked').each(updateProgram)
$('.c-Program__Check').change(updateProgram)
