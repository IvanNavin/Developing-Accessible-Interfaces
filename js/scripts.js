const blurs = document.querySelectorAll('.a11y-controls__blur');
const darks = document.querySelectorAll('.a11y-controls__dark');

blurs.forEach(el => {
	el.addEventListener('change', (e) => {
		const section = el.closest('section');

		if (e.target.checked) {
			section.classList.add('blur');
		} else {
			section.classList.remove('blur');
		}
	});
});

darks.forEach(el => {
	el.addEventListener('change', (e) => {
		const section = el.closest('section');

		if (e.target.checked) {
			section.classList.add('dark');
		} else {
			section.classList.remove('dark');
		}
	});
});



const btnKeyboardCounter = new Counter('.js-button-keyboard-counter');
const btnScreenReaderCounter = new Counter('.js-button-screen-reader-counter');



const weather = new Weather({
	selector: '.js-weather-demo',
	cities: cities,
	modal: new Modal({
		selector: '.js-weather-demo-modal',
		modalTrigger: '.js-weather-demo-modal-trigger'
	}),
	select: new Select({
		selector: '.js-weather-demo-select'
	}),
	delay: getDelay()
});



// #modal-markup
const modalNoA11y = new ModalNoA11y({
	selector: '.js-modal-markup-modal',
	modalTrigger: '.js-modal-markup-gear'
});



// #modal-focus-trigger
const modalFocusBtn = new ModalNoA11y({
	selector: '.js-modal-focus-trigger-modal',
	modalTrigger: '.js-modal-focus-trigger-btn'
});



// #modal-focus
const modalFocus = new ModalNoKeyboard({
	selector: '.js-modal-focus-modal',
	modalTrigger: '.js-modal-focus-btn'
});



// #modal-keyboard
const modalKeyboard = new ModalNoScreenReader({
	selector: '.js-modal-keyboard-modal',
	modalTrigger: '.js-modal-keyboard-btn'
});


// #modal-screen-reader
const modalScreenReader = new ModalOk({
	selector: '.js-modal-screen-reader-modal',
	modalTrigger: '.js-modal-screen-reader-btn'
});



// #select-markup
const selectMarkup = new SelectMarkup({
	selector: '.js-select-markup'
});



// #select-focus
const selectFocus = new SelectMarkup({
	selector: '.js-select-focus'
});



// #select-keyboard
const selectKeyboard = new SelectKeyboard({
	selector: '.js-select-keyboard'
});



// #select-screen-reader
const selectScreenReader = new Select({
	selector: '.js-select-screen-reader'
});
const selectScreenReaderIcon = document.querySelector('.js-select-screen-reader-icon');
selectScreenReader.onChange((value) => {
	selectScreenReaderIcon.setAttribute('xlink:href', `#${value}`);
});



const weatherAfter = new WeatherNoA11y({
	selector: '.js-weather-markup',
	cities: cities,
	modal: new Modal({
		selector: '.js-weather-markup-modal',
		modalTrigger: '.js-weather-markup-modal-trigger'
	}),
	select: new Select({
		selector: '.js-weather-markup-select'
	}),
	delay: getDelay()
});



const weatherFinal = new Weather({
	selector: '.js-weather-final',
	cities: cities,
	modal: new Modal({
		selector: '.js-weather-final-modal',
		modalTrigger: '.js-weather-final-modal-trigger'
	}),
	select: new Select({
		selector: '.js-weather-final-select'
	}),
	delay: getDelay()
});






function getDelay() {
	return Math.floor(Math.random() * (2000 - 1500 + 1) ) + 1500;
}