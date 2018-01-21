'use strict';
var AVM;

function AppViewModel() {
	var self = this;

	self.people = ko.observableArray([]);

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
		UpdateList();
	});
}

$(document).ready(() => {
	AVM = new AppViewModel();
	ko.applyBindings(AVM);

	UpdateList();
	newFunction();
});

function newFunction() {
	$.getJSON("/ex", (data) => {
		UpdateList();
		setTimeout(newFunction, 0);
	});
}
