function updateToggle() {
  if ($(this).prop('checked')) {
    $(this).siblings('.c-Toggle__Viz').addClass('c-Toggle__Viz--on')
  } else {
    $(this).siblings('.c-Toggle__Viz').removeClass('c-Toggle__Viz--on')
  }
}
$('.c-Toggle__Check:checked').each(updateToggle)
$('.c-Toggle__Check').change(updateToggle)
