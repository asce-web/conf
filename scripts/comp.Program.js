function resizeProgram() {
  $('.c-Program').height(function () {
    return $(this).find('.c-Program__Schedule--shown').height()
           + $(this).find('.c-Program__Schedule--shown').prev('h1').height()
           + parseInt($(this).find('.c-Program__Schedule--shown').prev('h1').css('margin-bottom'))
  })
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
$('.c-Program').addClass('-xz-c') // fallback `box-sizing: content-box;`
$('.c-Program__Hn').width(100/$('.c-Program__Hn').length + '%')
$('.c-Program__Schedule').addClass('-xo-1') // fallback `order: 1;`
  .css('position','absolute').css('left', 0).css('top', function () {
    return $(this).prev('h1').height()
           + parseInt($(this).prev('h1').css('margin-bottom'))
           + parseInt($(this).parents('.c-Program').css('padding-top'))
  })
$('.c-Program__Check:checked').each(updateProgram)
$('.c-Program__Check').change(updateProgram)
