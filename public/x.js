'use strict';
/*Полифилл */
if (!Array.prototype.findIndex) {
	Array.prototype.findIndex = function(predicate) {
		if (this == null) {
			throw new TypeError('Array.prototype.findIndex called on null or undefined');
		}
		if (typeof predicate !== 'function') {
			throw new TypeError('predicate must be a function');
		}
		var list = Object(this);
		var length = list.length >>> 0;
		var thisArg = arguments[1];
		var value;

		for (var i = 0; i < length; i++) {
			value = list[i];
			if (predicate.call(thisArg, value, i, list)) {
				return i;
			}
		}
		return -1;
	};
}


var gs = ['|', '/', '-', '\\'];
gs.N = function(a) {
	a = a || "i";
	this[a] = this[a] || 0;
	return this[(++this[a]) % this.length];
};

var RuText = ["Соединение", "Отключение"];

function AppViewModel() {
	this.records = ko.observableArray([]);
	this.logins = ko.observableArray([]);
}

AppViewModel.prototype.AddRecords = function(a) {
	if (this.records().every(elem => elem.id !== a.id))
		this.records.push(a);
};
AppViewModel.prototype.UpLogins = function(ds) {
	var ob = this.logins;
	ds.forEach(d => {
		var ind = ob().findIndex(m => m().Login === d.Login);
		if (ind < 0) ob.push(ko.observable(d));
		else ob()[ind](d);
	});
	ob.remove(elem => ds.every(d => d.Login !== elem().Login));
}

function Xjs() {
	this.AVM = new AppViewModel();
	ko.applyBindings(this.AVM);
	this.idEvent = -1;
	this.UpdateList();
	this.Ex();
}

Xjs.prototype.UpdateList = function() {
	return $.getJSON("/list", (data) => data.forEach(elem => this.AVM.AddRecords(elem)));
};

Xjs.prototype.post = function() {
	return $.post('/post', $('#theForm').serialize(), (e, p) => this.UpdateList());
};

Xjs.prototype.listx = function() {
	$.getJSON("/list_login", (data) => this.AVM.UpLogins(data));
};

Xjs.prototype.Waiter = function() {
	$.getJSON("/waiter", (data) => {

		if (data.some(a => a.Action === 2)) this.UpdateList(); //3: отправка сообщения
		if (data.some(a => a.Action === 0 || a.Action === 1)) this.listx();

		data.forEach(a => {
			if (a.Action >= 0 && a.Action < RuText.length)
				this.AVM.AddRecords({ id: --this.idEvent, createdAt: Date.now(), user: a.Login, text: RuText[a.Action] });
		});

		setTimeout(() => this.Waiter(), 0);
	}).fail(() => setTimeout(() => this.Waiter(), 5000));
}

$(document).ready(() => window.xjs = new Xjs());
