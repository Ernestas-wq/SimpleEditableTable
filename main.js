var newEntry = document.getElementById('new');
var modal = document.getElementById('modal');
var modal2 = document.getElementById('modal2');
var modal3 = document.getElementById('modal3');
var realEdit = document.getElementById('realEdit');
// Modal open
var close = document.getElementById('close');
var close2 = document.getElementById('close2');

//Darom Yes no delete mygtukui #

var buttonYes = document.getElementById('yes');
var buttonNo = document.getElementById('no');

newEntry.addEventListener('click', function(e) {
	modal.style.top = '3%';
});
close.addEventListener('click', function(e) {
	modal.style.top = '-100%';
});
close2.addEventListener('click', function(e) {
	modal2.style.top = '-100%';
});

function fillTable() {
	// Paimam data, talpinam data i kintamuosius
	var table = document.getElementById('tbody');
	var data = document.getElementById('data').value;
	var numeris = document.getElementById('numeris').value;
	var kelias = document.getElementById('kelias').value;
	var laikas = document.getElementById('laikas').value;
	var klaida = document.getElementById('error');
	klaida.innerHTML = '';

	// Tikrina ar yra kazkoks inputas
	if (data.length <= 0 || numeris <= 0 || kelias <= 0 || laikas <= 0) {
		klaida.innerHTML = 'Klaida. Įveskite visus reikiamus duomenis';
		console.log('error');
	} else {
		//   var inputArr = document.getElementsByClassName("tableInput");
		// Padaryti kad leistu submittint tik ivedus visus inputus
		var someArr = [data, numeris, kelias, laikas];
		// Sukuriam lentelej eile inputui talpinti ir du mygtukus
		// durnai uzvadinti bet pirmas mygtukas yra delete antras edit
		var row = document.createElement('tr');
		var mygt = document.createElement('button');
		var mygt2 = document.createElement('button');
		// appendinam eile i lentele ir mygtukai priskiriu klases ir texta
		table.appendChild(row);
		mygt.innerText = 'Ištrinti';
		mygt.className = 'delete';
		mygt2.innerText = 'Keisti';
		mygt2.className = 'edit';
		mygt.classList.add('glow-on-hover');
		mygt2.classList.add('glow-on-hover');
		var greitis = Math.round(parseInt(someArr[2]) / parseInt(someArr[3]) * 3.6);

		// Greitis pushinamas i array gala, tada pradedam cikla.
		someArr.push(greitis);

		// sukam cikla per inputa
		for (var i = 0; i < someArr.length; i++) {
			console.log(greitis);
			var cell = document.createElement('td');
			row.appendChild(cell);
			cell.innerHTML += someArr[i];
		}

		// Appendinu mygtukus i eile, cia veliau kadangi veliau sita uzduoti dave
		row.appendChild(mygt);
		row.appendChild(mygt2);
	}
	// Trynimo funkcija ir yes no
	var deleteLine;
	mygt.addEventListener('click', function(e) {
		modal3.style.top = '25%';
		deleteLine = e.target.parentNode;
	});

	buttonYes.addEventListener('click', function() {
		deleteLine.remove();
		modal3.style.top = '-50%';
	});
	buttonNo.addEventListener('click', function() {
		modal3.style.top = '-50%';
	});
	// Edit
	mygt2.addEventListener('click', function() {
		let row = this.parentNode;
		var ul = row.parentNode;
		// Padarom kad selectintu tos eiles inputa kuriame spaudziamas edit mygtukas
		var tdArr = ul.querySelectorAll('td');
		// pasidarau fake const array is kurio imsiu info edito funkcijai
		// foras suka cikla per konkretu inputa ir talpina info i finalArr
		const finalArr = [];
		for (i = 0; i < tdArr.length; i++) {
			finalArr.push(tdArr[i]);
		}

		// Keitimo funkcija, paselectinam visus inputus
		function keisti() {
			klaida.innerHTML = '';
			let inputs = this.parentNode;
			let list = inputs.parentNode;
			let inputArr = list.querySelectorAll('input');
			// foras suka cikla per inputus ir jei yra kazkoks inputas keicia inner htmla lenteles
			// console.log(finalArr);

			//inputSum variable naudoju kad suskaiciuot ar visi inputai = 0 for error message
			var inputSum = 0;
			for (let j = 0; j < inputArr.length; j++) {
				if (inputArr[j].value.length == 0) {
					inputSum++;
				} else if (inputArr[j].value.length > 0) {
					// console.log(inputSum);
					finalArr[j].innerHTML = inputArr[j].value;
					someArr[j] = inputArr[j].value;
				}
			}
			// kad mestu errora jei nesuvesti visi duomenys
			if (inputSum == inputArr.length) {
				klaida.innerHTML = 'Klaida. Įveskite bent vieną iš duomenų';
			}
			console.log(inputSum);
			console.log(inputArr.length);
			// Perskaiciuojam greiti, jei greitis keitesi talpinam ji i buvusio greicio vieta
			let newGreitis = Math.round(parseInt(someArr[2]) / parseInt(someArr[3]) * 3.6);

			if (newGreitis !== greitis) {
				finalArr[4].innerHTML = parseInt(newGreitis);
				// console.log("veikia");
			}

			// Isvalom inputa is modalo po clicko
			document.getElementById('data2').value = '';
			document.getElementById('numeris2').value = '';
			document.getElementById('kelias2').value = '';
			document.getElementById('laikas2').value = '';
		}
		// Priskiriu realEdit'ui (antro modalo Redaguoti mygtukas) keisti funkcija
		realEdit.onclick = keisti;
		// cia kad paspaudus lenteles redaguoti pasirodytu modalas
		modal2.style.top = '3%';
	});
	document.getElementById('data').value = '';
	document.getElementById('numeris').value = '';
	document.getElementById('kelias').value = '';
	document.getElementById('laikas').value = '';
}
// Hello World!!!!!