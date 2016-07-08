$('#drawer-check').change(function () {
  if ($(this).prop('checked')) {
    $(this).siblings('.o-Drawer').addClass('o-Drawer--open')
  } else {
    $(this).siblings('.o-Drawer').removeClass('o-Drawer--open')
  }
})
