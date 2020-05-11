//functions
function buildItemDrop(evnt) {
  $('<div class="project_list_itemdrop"></div>').insertAfter(evnt);
  let x = $(".project_list_itemdrop");
  x.append('<div class="item_index"><p>x</p></div>');
  x.append('<div class="item_name"><p>x</p></div>');
  x.append('<div class="item_deadline"><p>22 - x - 2019</p></div>');
  x.append('<div class="item_programmers"><p>x Project</p></div>');
  x.append('<div class="item_role"><p>x</p></div>');
  x.append(
    '<div class="item_expand"><p><span class="expand_button"><i class="fas fa-angle-down"></i></span></p></div>'
  );
}
function dropitem() {
  if ($(".project_list_itemdrop").length == 0) {
    let temp = $(this);
    let x = temp.parent().parent().parent();
    buildItemDrop(x);
  }
  let temp2 = $(".project_list_itemdrop");
  if (temp2.outerHeight() == 1) {
    $(".project_list_itemdrop").animate({
      height: "400px",
      opacity: 1,
    });
  } else if (temp2.outerHeight() == 400) {
    $(".project_list_itemdrop").animate(
      {
        height: "0px",
        opacity: 0,
      },
      300,
      "linear",
      function () {
        $(this).remove();
      }
    );
  }
}
(function () {
  $(document).on("click", ".expand_button", dropitem);
})();
