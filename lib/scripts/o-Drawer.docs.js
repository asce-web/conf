$('#drawer-check').change(function () {
  if ($(this).prop('checked')) {
    $(this).parents('.docs-c-Togglable').siblings('.o-Drawer').addClass('o-Drawer--open')
  } else {
    $(this).parents('.docs-c-Togglable').siblings('.o-Drawer').removeClass('o-Drawer--open')
  }
})
