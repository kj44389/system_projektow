import {
	createCookie,
	eraseCookie
} from './cookies.js';

(() => {

	document.querySelector("#input100-login").addEventListener('keyup', loginTransition);
	document.querySelector("#input100-pass").addEventListener('keyup', passTransition);
	document.querySelector('#form-submit').addEventListener('click', CheckUser);
})();

async function getUser(json) {
	let name, surname, uid;
	let url = './php/getuser.php?'
	await fetch(url, {
		method: 'POST',
		body: json,
	})
		.then((response) => { return response.json() })
		.then((data) => { return data[0] })
		.then((data) => {

			name = data?.name ?? null;
			surname = data?.surname ?? null;
			uid = data?.uid ?? null;

		})
		.catch(err => console.log(err));
	return [name, surname, uid];
}

async function getUserGroup(uid) {
	let gid;
	let url = './php/getgroupuser.php?'
	let json = {
		uid: uid,
	}
	await fetch(url, {
		method: 'POST',
		body: JSON.stringify(json),
	})
		.then((response) => { return response.json() })
		.then((data) => { return data[0] })
		.then((data) => { gid = data.gid ?? null })

		.catch(err => console.log(err));
	return [gid];
}

async function CheckUser() {
	
	let email = document.querySelector("#input100-login").value;
	let pass = document.querySelector("#input100-pass").value;
	
	let json = {
		email: email,
		pass: pass
	};
	json = JSON.stringify(json);

	let name, surname, uid, gid;

	[name, surname, uid] = await getUser(json);
	if(uid !== null) [gid] = await getUserGroup(uid);
	if (name !== null && surname !== null && uid !== null && gid !== null) {
		createCookie("uid", uid, 10);
		createCookie("gid", gid, 10);
		createCookie("imie", name, 10);
		createCookie("nazwisko", surname, 10);
		
		window.location.href = "dashboard.html";
	}
}

function loginTransition() {
	let label = document.querySelector("#wrap-label-login");
	let wrap_input = document.querySelectorAll(".wrap-input");

	if (document.querySelector("#input100-login").value === '') {
		label.style.webkitTransform = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,0,40,0,1)";
		wrap_input[0].style.margin = "10px 0 10px 0"
	} else {
		label.style.webkitTransform = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,0,0,0,1)";
		wrap_input[0].style.margin = "30px 0 0 0"
	}
}

function passTransition() {
	let label = document.querySelector("#wrap-label-pass");
	let wrap_input = document.querySelectorAll(".wrap-input");

	if (document.querySelector("#input100-pass").value === '') {
		label.style.webkitTransform = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,0,40,0,1)";
		wrap_input[1].style.margin = "10px 0 10px 0"

	} else {
		label.style.webkitTransform = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,0,0,0,1)";
		wrap_input[1].style.margin = "30px 0 0 0"
	}
}

