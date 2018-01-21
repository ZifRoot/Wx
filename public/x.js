'use strict';

var ttt = new ko.observableArray([
	// { name: 'Bert' },
	// { name: 'Charles' },
	// { name: 'Denise' }
]);
ttt.push({ d: "" });
var gg = ttt.length;

var AVM;

function AppViewModel() {
	var self = this;

	self.people = ko.observableArray([
		// { name: 'Bert' },
		// { name: 'Charles' },
		// { name: 'Denise' }
	]);

	self.addPerson = function() {
		self.people.push({ name: "New at " + new Date() });
	};

	self.AddX = function(a) {
		for (let index = 0; index < self.people().length; index++) {
			const element = self.people()[index];
			if (element.id === a.id) return;
		}

		self.people.push(a);
	};

	self.removePerson = function() {
		self.people.remove(this);
	}
}

function UpdateList() {
	$.getJSON("/list", (data) => {
		for (let index = 0; index < data.length; index++) {
			const element = data[index];
			AVM.AddX(element);
		}
	});
}

function post() {
	$.post('/post', $('#theForm').serialize(), (e, p) => {
		var d = 0;
	});
	//	alert("xdf");
}

$(document).ready(() => {
	AVM = new AppViewModel();
	ko.applyBindings(AVM);

	UpdateList();

	$.get();
	//	var listx = document.querySelector("#listx");

	//.innerText = "sdfdf";
	//$("#listx")
});




/*
function tick() {
  var element = React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      'Hello, world!'
    ),
    React.createElement(
      'h2',
      null,
      'It is',
      ' ',
      new Date().toLocaleTimeString(),
      '.'
    )
  );
  // highlight-range{1-4}
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
*/
