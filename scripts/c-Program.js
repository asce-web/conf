function resizeProgram() {
  function setProgramHeight(n) {
    n = n || 1
    $('.c-Program').height(function () {
      var program = $(this).find('.c-Program__Schedule--shown')
      var program_total_height = program.height() + parseInt(program.css('margin-bottom'))
      var heading = program.prev('.c-Program__Hn')
      var heading_total_height = heading.height() + parseInt(heading.css('padding-top')) + parseInt(heading.css('margin-bottom'))
      return program_total_height + (n * heading_total_height)
    })
  }
  $('.c-Program__Schedule').css('bottom', function () {
    return parseInt($(this).parents('.c-Program').css('padding-bottom'))
  })
  if ($(window).width() < 480) { // @media screen and (min-width: 30em)
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
$('.c-Program__Hn')
  .find('label').addClass('o-Block-sK')
  .find('time' ).addClass('o-Block-sK')
  .find('span' ).addClass('o-Block-sK')
$('.c-Program__Schedule').addClass('-xo-1') // fallback `order: 1;`
  .css('position','absolute').css('left', 0)
$('.c-Program__Check:checked').each(updateProgram)
$('.c-Program__Check').change(updateProgram)
