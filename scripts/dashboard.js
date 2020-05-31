//////////////////////// functions
///////// OTHERS
//create cookie
function createCookie(name, value, days) {
  var expires;
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}
//get cookie value
function readCookie(name) {
  var keyValue = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return keyValue ? keyValue[2] : null;
}
//get parent node
function getParentNode(evnt) {
  let node = evnt.parent().parent().parent(); // go up im dom structure to project_list_item class so we can add structure after it
  return node; // return parent node
}
//animation to show task
function showtask(temp) {
  let counter = temp.next().find(".task");
  counter = counter.length;
  $(temp.next()).animate({
    // animate itemdrop to be visible
    height: 300 * counter + 50,
    opacity: 1,
  });
}
//animation to show error msg
function showError(temp) {
  let counter = temp.next().find(".zad_error_msg");
  counter = counter.length;
  $(temp.next()).animate({
    // animate itemdrop to be visible
    height: 100 * counter + 50,
    opacity: 1,
  });
}

///////// ADDING TASKS
//append add box
function add_task_box(header, pid) {
  let handler = $("#wrapper");
  handler.append('<div id="add_box"></div>');
  let box = handler.find("#add_box");
  box.append('<div class="add_box_top"></div>');
  box.append('<div class="add_box_content"></div>');
  box.append('<div class="add_box_submit"></div>');
  let box_top = box.find(".add_box_top");
  box_top.append('<div class="add_box_info">' + header + "</div>");
  box_top.append(
    '<div class="add_box_close">Zamknij <i class="fas fa-times"></i></div>'
  );
  let content = box.find(".add_box_content");
  create_field(content, "task_name_input", "Nazwa Zadania", "text");
  create_field(content, "task_date_input", "Data Rozpoczęcia", "date");
  create_field(content, "task_description_input", "Opis zadania", "text");
  let box_submit = box.find(".add_box_submit");
  box_submit.append(
    '<input type="button" onClick="add_task_to_base(' +
      pid +
      ')" id="form-submit" value="Dodaj"/>'
  );
}
//add task to database
function add_task_to_base(pid) {
  let givendate = $("#task_date_input").val();
  let name = $("#task_name_input").val();
  let description = $("#task_description_input").val();
  if (checkIfFutureDate(givendate) == true) {
    givendate = new Date(givendate);
    givendate = givendate.toJSON().slice(0, 10);
    let json = { name: name, dr: givendate, descr: description };
    json = JSON.stringify(json);
    $.ajax({
      url: "addtask.php?",
      type: "POST",
      data: { data: json },
      success: function (data) {
        let json2 = { name: name };
        json2 = JSON.stringify(json2);
        $.ajax({
          url: "taketaskid.php?",
          type: "POST",
          data: { data: json2 },
          dataType: "json",
          success: function (data2) {
            let tid = [];
            for (let i = 0; i < data2.length; i++) {
              tid[i] = parseInt(data2[i].tid);
            }

            let json3 = { pid: pid, tid: tid[0] };
            json3 = JSON.stringify(json3);
            $.ajax({
              url: "linktaskproject.php?",
              type: "POST",
              data: { data: json3 },
              success: function (data3) {},
              error: function (xml, error) {},
            });
          },
          error: function (xml, error) {},
        });
      },
      error: function (xml, error) {},
    });
  }
  remove_add_box();
}

///////// ADDING USER TO PROJECT
function checkIfUserExist(name, surname) {
  let json = { name: name, surname: surname };
  json = JSON.stringify(json);
  let wynik;
  $.ajax({
    url: "searchforname.php?",
    async: false,
    type: "POST",
    data: { data: json },
    dataType: "JSON",
    success: function (data) {
      if (data[0].name == "brak") {
        wynik = false;
      } else {
        wynik = true;
      }
    },
    error: function (xml, error) {},
  });
  return wynik;
}
function getUserId(name, surname) {
  let json = { name: name, surname: surname };
  json = JSON.stringify(json);
  let Array = [];
  $.ajax({
    url: "takeuserid.php?",
    async: false,
    type: "POST",
    data: { data: json },
    dataType: "JSON",
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        Array[i] = data[i].uid;
      }
    },
    error: function (xml, error) {},
  });
  return Array[0];
}
function getGroupId(pid) {
  let json = { pid: pid };
  json = JSON.stringify(json);
  let Array = [];
  $.ajax({
    url: "takegroupid.php?",
    async: false,
    type: "POST",
    data: { data: json },
    dataType: "JSON",
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        Array[i] = data[i].gid;
      }
    },
    error: function (xml, error) {},
  });
  return Array[0];
}
function add_user_to_project(pid) {
  let name = $("#user_name_input").val();
  let surname = $("#user_surname_input").val();
  if (checkIfUserExist(name, surname) == true) {
    var r = confirm("Znaleziono Pracownika, Dodać?");
    if (r == true) {
      let uid = getUserId(name, surname);
      let gid = getGroupId(pid);

      let json = { gid: gid, uid: uid };
      json = JSON.stringify(json);
      $.ajax({
        async: false,
        url: "linkuserproject.php?",
        type: "POST",
        data: { data: json },
        dataType: "JSON",
        success: function (data) {},
        error: function (xml, error) {},
      });
    }
  }
  remove_add_box();
}
function add_user_box(header, pid) {
  let handler = $("#wrapper");
  handler.append('<div id="add_box"></div>');
  let box = handler.find("#add_box");
  box.append('<div class="add_box_top"></div>');
  box.append('<div class="add_box_content"></div>');
  box.append('<div class="add_box_submit"></div>');
  let box_top = box.find(".add_box_top");
  box_top.append('<div class="add_box_info">' + header + "</div>");
  box_top.append(
    '<div class="add_box_close">Zamknij <i class="fas fa-times"></i></div>'
  );
  let content = box.find(".add_box_content");
  create_field(content, "user_name_input", "Imię", "text");
  create_field(content, "user_surname_input", "Nazwisko", "text");
  let box_submit = box.find(".add_box_submit");
  box_submit.append(
    '<input type="button" onClick="add_user_to_project(' +
      pid +
      ')" id="form-submit" value="Dodaj"/>'
  );
}

///////// ADDING USER TO PROJECT
function gettaskid(task_name) {
  let tid = [];
  let json2 = { name: task_name };
  json2 = JSON.stringify(json2);
  $.ajax({
    async: false,
    url: "taketaskid.php?",
    type: "POST",
    data: { data: json2 },
    dataType: "json",
    success: function (data2) {
      for (let i = 0; i < data2.length; i++) {
        tid[i] = parseInt(data2[i].tid);
      }
    },
  });
  return tid[0];
}
function add_user_to_task() {
  let name2 = $("#user_name_input").val();
  let surname2 = $("#user_surname_input").val();
  let task_name = readCookie("task_name");
  if (checkIfUserExist(name2, surname2) == true) {
    var r = confirm("Znaleziono Pracownika, Dodać?");
    if (r == true) {
      let uid = getUserId(name2, surname2);
      let tid = gettaskid(task_name);

      let json = { uid: uid, tid: tid };
      json = JSON.stringify(json);
      $.ajax({
        url: "linkusertask.php?",
        type: "POST",
        data: { data: json },
        dataType: "json",
        success: function (data2) {},
      });
    }
  }
}
function add_user_task_box(header) {
  let handler = $("#wrapper");
  handler.append('<div id="add_box"></div>');
  let box = handler.find("#add_box");
  box.append('<div class="add_box_top"></div>');
  box.append('<div class="add_box_content"></div>');
  box.append('<div class="add_box_submit"></div>');
  let box_top = box.find(".add_box_top");
  box_top.append('<div class="add_box_info">' + header + "</div>");
  box_top.append(
    '<div class="add_box_close">Zamknij <i class="fas fa-times"></i></div>'
  );
  let content = box.find(".add_box_content");
  create_field(content, "user_name_input", "Imię", "text");
  create_field(content, "user_surname_input", "Nazwisko", "text");
  let box_submit = box.find(".add_box_submit");
  box_submit.append(
    '<input type="button" onClick="add_user_to_task()" id="form-submit" value="Dodaj"/>'
  );
}

///////// ADDING PROJECT
//create text fields
function create_field(handler, id, nazwa, typ) {
  handler.append('<span class="wrap-input"></span>');
  let counter = handler.find(".wrap_input").length;
  let tmp = handler.find(".wrap-input").eq(counter - 1);
  tmp.append(
    '<input placeholder=" "class="input100" id="' +
      id +
      '" type="' +
      typ +
      '"/>'
  );
  tmp.append('<span class="focus-input100"></span>');
  tmp.append('<span class="label-border"></span>');
  tmp.append('<span class="wrap-label">' + nazwa + "</span>");
}
//remove add box
function remove_add_box() {
  $("#wrapper").find("#add_box").remove();
}
//append add box
function add_project_box(header) {
  let handler = $("#wrapper");
  handler.append('<div id="add_box"></div>');
  let box = handler.find("#add_box");
  box.append('<div class="add_box_top"></div>');
  box.append('<div class="add_box_content"></div>');
  box.append('<div class="add_box_submit"></div>');
  let box_top = box.find(".add_box_top");
  box_top.append('<div class="add_box_info">' + header + "</div>");
  box_top.append(
    '<div class="add_box_close">Zamknij <i class="fas fa-times"></i></div>'
  );
  let content = box.find(".add_box_content");
  create_field(content, "project_name_input", "Nazwa Projektu", "text");
  create_field(content, "project_date_input", "Data Rozpoczęcia", "date");
  create_field(content, "project_description_input", "Opis projektu", "text");
  create_field(content, "project_gid_input", "Id grupy projektowej", "text");
  let box_submit = box.find(".add_box_submit");
  box_submit.append(
    '<input type="button" onClick="add_project_to_base()" id="form-submit" value="Dodaj"/>'
  );
}
//check if name of project already exists
function checkIfNameExist(name) {
  let json = { name: name };
  json = JSON.stringify(json);
  let wynik;
  $.ajax({
    url: "searchforname.php?",
    async: false,
    type: "POST",
    data: { data: json },
    dataType: "JSON",
    success: function (data) {
      if (data[0].nazwa == "brak") {
        wynik = false;
      } else {
        wynik = true;
      }
    },
    error: function (xml, error) {},
  });
  return wynik;
}
//check if date is 2 days ahead
function checkIfFutureDate(xxx) {
  let curdate = new Date();
  curdate.setDate(curdate.getDate() + 2);
  let givendate2 = new Date(xxx);
  if (givendate2 >= curdate) {
    return true;
  } else {
    alert("Data projektu min 2 dni w przód");
    return false;
  }
}
//function which adding project to database
function add_project_to_base() {
  let givendate = $("#project_date_input").val();
  let name = $("#project_name_input").val();
  let gid = parseInt($("#project_gid_input").val());
  let description = $("#project_description_input").val();
  if (checkIfNameExist(name) == false && checkIfFutureDate(givendate) == true) {
    givendate = new Date(givendate);
    givendate = givendate.toJSON().slice(0, 10);

    let json = { name: name, dr: givendate, descr: description, gid: gid };
    json = JSON.stringify(json);
    $.ajax({
      url: "addproject.php?",
      type: "POST",
      data: { data: json },
      success: function (data) {},
      error: function (xml, error) {},
    });
  }
  remove_add_box();
}

///////// TASKS
//add error message when no tasks
function buildErrorMessage(evnt) {
  let x = evnt.next();
  x.append('<div class="zad_error_msg">BRAK ZADAŃ W PROJEKCIE</div>');
  showError(evnt);
}
//get tasks ids which belong to project
function gettasksids(pid, temp) {
  $.ajax({
    url: "gettask.php?pid=" + pid,
    type: "get",
    dataType: "json",
    success: function (data) {
      let Array = [];
      for (let i = 0; i < data.length; i++) {
        Array[i] = parseInt(data[i].tid);
      }
      $('<div class="project_list_itemdrop"></div>').insertAfter(temp); // this adds itemdrop main after project_list_item class where button was clicked
      $.ajax({
        url: "gettasktoproject.php?",
        type: "POST",
        data: { data: Array },
        dataType: "json",
        success: function (data) {
          for (let i = 0; i < data.length; i++) {
            buildItemDrop(
              temp,
              data[i].nazwa,
              data[i].status,
              data[i].data_rozpoczęcia,
              data[i].data_zakonczenia,
              data[i].opis
            );
          }
          showtask(temp);
        },
        error: function (xml, error) {
          buildErrorMessage(temp);
        },
      });
    },
    error: function (xml, error) {
      buildErrorMessage(temp);
    },
  });
}
//build task from data base
function buildItemDrop(evnt, nazwa, status, d_r, d_z, opis) {
  // THIS FUNCTION BUILD A HTML STRUCTURE FOR PROJECT INFORMATIONS
  let x = evnt.next();
  x.append('<span class="task_left_whitespace"></span>');
  let y = x.find(".task_left_whitespace");
  let counter = y.length;
  y.eq(counter - 1).append('<span class="task_number">' + counter + "</span>"); //fills itemdrop
  x.append('<div class="task"></div>');
  x = x.find(".task");
  x.eq(counter - 1).append('<div class="task_top_bar"></div>');
  x.eq(counter - 1).append('<div class="task_description"></div>');
  let top_bar = x.eq(counter - 1).find(".task_top_bar");
  let description = x.find(".task_description");
  top_bar.append(
    '<div class="task_full_name"><span>' + nazwa + "</span></div>"
  );
  top_bar.append('<div class="task_info"></div>');
  let task_info = x.eq(counter - 1).find(".task_info");

  task_info.append(
    '<div class="task_status"><span class="task_open">' +
      (status == 0 ? "Otwarte" : "Zamknięte") +
      "</span></div>"
  );
  task_info.append(
    '<div class="task_milestone"><span class="is_a_milestone">Kamien milowy!</span></div>'
  );
  task_info.append('<div class="task_space">0/1</div>');
  task_info.append(
    '<div class="task_join"><button class="btn_join">DODAJ <i class="fas fa-plus-square"></i></button></div>'
  );
  description.eq(counter - 1).append("<span>" + opis + "</span>");
}
//build cointeiner for tasks
function dropitem() {
  //build if itemdrop structure dosesnt exist
  let parent_node = getParentNode($(this)); // get parent node
  if (
    parent_node.next().attr("class") == "project_list_item" || // if project_list_itemdrop is not created yet
    parent_node.next().length == 0 // for last element in project_list
  ) {
    let temp = $(this);
    temp = getParentNode(temp);
    let pid = temp.find(".item_index").text();
    let tasksids = gettasksids(pid, temp);
  } else {
    let temp = $(this);
    temp = getParentNode(temp);
    $(temp.next()).animate(
      // animate itemdrop to be invisible
      {
        height: "0px",
        opacity: 0,
      },
      300, // animation time 300 ms
      "linear",
      function () {
        $(this).remove(); // after animation is done remove structure
      }
    );
  }
}

///////// PROJECTS
//add options to menu
function add_list_items() {
  let handler = $("#nav_list_projects");
  // if project_list_itemdrop is not created yet
  if ($(".podmenu").length < 1) {
    $(
      '<li class="podmenu" id="old_projects"><a href="#"> <i class="fas fa-history"></i> STARE PROJEKTY</a></li>'
    ).insertAfter(handler);
    $(
      '<li class="podmenu" id="actual_projects"><a href="#"> <i class="fas fa-tasks"></i> AKTUALNE PROJEKTY</a></li>'
    ).insertAfter(handler);
    $(
      '<li class="podmenu" id="add_project"><a href="#"> <i class="fas fa-tasks"></i> DODAJ PROJEKT</a></li>'
    ).insertAfter(handler);
  } else {
    $(".podmenu").remove();
  }
}
//add projects header
function add_project_header(handler) {
  handler.append('<div class="project_list_header"></div>');
  let box = handler.find(".project_list_header");
  box.append('<div class="project_index"><p>Lp.</p></div>');
  box.append('<div class="project_name"><p>Nazwa Projektu</p></div>');
  box.append('<div class="project_start_date"><p>Data Rozpoczęcia</p></div>');
  box.append('<div class="project_group"><p>Grupa Projektowa</p></div>');
  box.append('<div class="project_status"><p>Status Projektu</p></div>');
  box.append('<div class="project_expand"><p>Opcje</p></div>');
}
//add projects from data base
function add_project_item(handler, pid, name, start, gid, status) {
  handler.append('<div class="project_list_item"></div>');
  let counter = $(".project_list_item").length;
  let box;
  if (counter > 0) {
    box = handler.find(".project_list_item").eq(counter - 1);
  }
  box.append('<div class="item_index"><p>' + pid + "</p></div>");
  box.append('<div class="item_name"><p>' + name + "</p></div>");
  box.append('<div class="item_start_date"><p>' + start + "</p></div>");
  box.append('<div class="item_group"><p>' + gid + "</p></div>");
  box.append('<div class="item_status"><p>' + status + "</p></div>");
  box.append(
    '<div class="item_expand"><p><span class="expand_button">ROZWIŃ<i class="fas fa-angle-down"></i></span><span class="options_button">OPCJE<i class="fas fa-angle-down"></i><span class="options_menu"><span class="options_menu_item_task">Dodaj Zadanie</span><span class="options_menu_item_user">Dodaj Uzytkownika</span></span></span></p></div>'
  );
}
//add task to actual project
function add_actual_projects() {
  if ($(".project_list_item").length < 1) {
    $('<div class="content_body"></div>').insertAfter($(".content_header"));
    let handler = $(".content_body");
    add_project_header(handler);
    handler.append('<div class="projects_list"></div>');
    handler2 = handler.find(".projects_list");
    /// get all user projects
    let gid = readCookie("gid");
    gid = gid.split("_");

    let Array = [];
    for (let j = 0; j < gid.length - 1; j++) {
      Array[j] = parseInt(gid[j]);
    }
    $.ajax({
      url: "getactualprojects.php?",
      type: "post",
      dataType: "json",
      data: { data: Array },
      success: function (data) {
        alert(data);
        for (let i = 0; i < data.length; i++) {
          add_project_item(
            handler2,
            data[i].pid,
            data[i].nazwa_projektu,
            data[i].data_rozpoczęcia,
            data[i].gid,
            data[i].status
          );
        }
      },
      error: function (xml, error) {
        console.log(error);
      },
    });
    ///
  }
}

///////// AUTORUN
//after site is ready
(function () {
  //wait for click on expand button
  $(document).ready(function () {
    $(".top_header_user_name").text(
      //add personal info on topbar
      readCookie("imie") + " " + readCookie("nazwisko") //get info from cookies
    );
  }); // info to top bar
  $(document).on("click", ".expand_button", dropitem);
  $(document).on("click", "#nav_list_projects", add_list_items);
  $(document).on("click", "#old_projects", add_list_items);
  $(document).on("click", "#actual_projects", add_actual_projects);
  $(document).on("click", "#add_project", function () {
    add_project_box("Dodawanie Projektu");
  });
  $(document).on("click", ".btn_join", function () {
    let handler = $(this);
    let parent = handler.parent().parent().parent();
    let task_name = parent.find(".task_full_name").text();
    createCookie("task_name", task_name, 7);
    add_user_task_box("Dodawanie uzytkownika do zadania");
  });

  $(document).on("click", ".options_menu_item_task", function () {
    let handler = $(this);
    let parent = handler.parent().parent().parent().parent().parent();
    let pid = parent.find(".item_index").text();
    add_task_box("Dodawanie zadań", pid);
  });
  $(document).on("click", ".options_menu_item_user", function () {
    let handler = $(this);
    let parent = handler.parent().parent().parent().parent().parent();
    let pid = parent.find(".item_index").text();
    add_user_box("Dodawanie uzytkownika do projektu", pid);
  });
  $(document).on("click", ".add_box_close", function () {
    remove_add_box();
  });
  $(".input100").keyup(function () {
    let err = $("#wrap-label-login");
    let wrap_input = $(".wrap-input");

    if (this.value == "") {
      err.css({
        "-webkit-transform":
          "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,0,40,0,1)",
      });
      wrap_input.eq(0).css({ margin: "10 0 10 0" });
    } else {
      err.css({
        "-webkit-transform":
          "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,0,0,0,1)",
      });
      wrap_input.eq(0).css({ margin: "30 0 0 0" });
    }
  });
})();
