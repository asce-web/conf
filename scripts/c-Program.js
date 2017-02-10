function styleSelectedProgramHn() {
  $('.c-ProgramHn').each(function () {
    if ($(this).find('input:checked').length) {
      $(this).addClass('c-ProgramHn--selected')
    } else if ($(this).find('input').length) {
      $(this).removeClass('c-ProgramHn--selected')
    }
  })
}
// $(document).ready(styleSelectedProgramHn)
// $('.c-ProgramHn input').change(styleSelectedProgramHn)
