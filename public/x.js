import { eventNames } from "cluster";

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

function listx() {
	$.getJSON("/listx", (data) => {
		var eventt1 = $("#eventt1");
		eventt1.text(JSON.stringify(data));
	});
}

var gs = ['|', '/', '-', '\\'];
gs.i = 0;
gs.N = function() { return this[(++this.i) % this.length]; };

function Ex() {
	$.getJSON("/ex", (data) => {
		var eventt = $("#eventt");
		eventt.removeClass("run-animation");
		eventt.text(gs.N() + JSON.stringify(data));
		eventt.addClass("run-animation");
		listx();
		UpdateList();
		setTimeout(Ex, 0);
	});
}

$(document).ready(() => {
	AVM = new AppViewModel();
	ko.applyBindings(AVM);

	UpdateList();
	Ex();
});
