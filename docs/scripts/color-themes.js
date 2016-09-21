$('#docs input.js-picker').change(function () {
  var primary = Color.fromString($('#docs input.js-picker-primary').val())
  var secondary = Color.fromString($('#docs input.js-picker-secondary').val())
  var styleobj = colorStyles(primary, secondary)
  for (var prop in styleobj) {
    document.querySelector('#docs .docs-o-ColorList').style.setProperty(prop, styleobj[prop])
  }
  $('#docs code').each(function () {
    $(this).text(Color.fromString(styleobj[
      $(this).parents('figure').find('svg').attr('data-prop')
    ]).toString('hex'))
  })
})
