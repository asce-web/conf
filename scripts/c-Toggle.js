function updateToggle() {
  if ($(this).prop('checked')) {
    $(this).parents('.c-Toggle').addClass('c-Toggle--on')
  } else {
    $(this).parents('.c-Toggle').removeClass('c-Toggle--on')
  }
}
$('.c-Toggle__Check:checked').each(updateToggle)
$('.c-Toggle__Check').change(updateToggle)
