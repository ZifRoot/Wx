function TEXT(text) {
	return new Buffer(text, 'ucs2').toString('binary');
}

var FFI = require('node-ffi');

// подключаемся к user32.dll
var user32 = new FFI.Library('user32', {
	'MessageBoxW': [
		'int32', ['int32', 'string', 'string', 'int32']
	]
});

// диалоговое окно
var OK_or_Cancel = user32.MessageBoxW(
	0, TEXT('Привет, Хабрахабр!'), TEXT('Заголовок окна'), 1
);
