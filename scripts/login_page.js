//function createCookie(){}
function CheckUser() {
  let email = document.getElementById("input100-login").value;
  let pass = document.getElementById("input100-pass").value;

  let json = { email: email, pass: pass };
  json = JSON.stringify(json);
  alert("ok");
  $.ajax({
    url: "getuser.php?",
    type: "post",
    data: { data: json },
    dataType: "json",
    success: function (data) {
      alert(data);
      let uid = data[0].uid;
      let name = data[0].name;
      let surname = data[0].surname;
      let json2 = { uid: data[0].uid };
      json2 = JSON.stringify(json2);
      $.ajax({
        url: "getgroupuser.php?",
        type: "post",
        data: { data: json2 },
        dataType: "json",
        success: function (data2) {
          let gid = "";
          for (let i = 0; i < data2.length; i++) {
            gid += data2[i].gid;
            gid += "_";
          }
          createCookie("uid", uid, 10);
          createCookie("gid", gid, 10);
          createCookie("imie", name, 10);
          createCookie("nazwisko", surname, 10);
          window.location.href = "dashboard.html";
        },
      });
    },
    error: function (xml, error) {
      alert(error);
    },
  });
}
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
function eraseCookie(name) {
  createCookie(name, "", -1);
}
function setup() {
  $("#input100-login").keyup(function () {
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
  $("#input100-pass").keyup(function () {
    let err = $("#wrap-label-pass");
    let wrap_input = $(".wrap-input");

    if (this.value == "") {
      err.css({
        "-webkit-transform":
          "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,0,40,0,1)",
      });
      wrap_input.eq(1).css({ margin: "10 0 10 0" });
    } else {
      err.css({
        "-webkit-transform":
          "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,0,0,0,1)",
      });
      wrap_input.eq(1).css({ margin: "30 0 0 0" });
    }
  });
}
