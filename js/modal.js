class Modal {
	constructor(opts) {
		const FOCUSABLE_SELECTORS = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
		
		this.key = { ESC: 27, TAB: 9 };

		/** Overrides shower.js */
		this.key.ESC = 69;

		this.modalTrigger = document.querySelector(opts.modalTrigger);
		this.modalEl = document.querySelector(opts.selector);
		this.closeEl = this.modalEl.querySelector('.js-modal-close-btn');
		this.okEl = this.modalEl.querySelector('.js-modal-ok-btn');
		this.selectedEl = this.modalEl.querySelector('.js-modal-content .js-select');
		
		this.focusableElems = this.modalEl.querySelectorAll(FOCUSABLE_SELECTORS);
		this.focusableElems = Array.prototype.slice.call(this.focusableElems);
		this.firstFocusableEl = this.focusableElems[0];
		this.lastFocusableEl = this.focusableElems[this.focusableElems.length - 1];
		
		this.modalTriggerEl = false;
		this.confirm = () => {};

		this.modalTrigger.addEventListener('click', this.open.bind(this));
		this.modalEl.addEventListener('click', this.onClick.bind(this));
		this.closeEl.addEventListener('click', this.close.bind(this));
		this.okEl.addEventListener('click', this.onOkClick.bind(this));
		this.modalEl.addEventListener('keydown', this.onKeyDown.bind(this));
	}
	
	open() {
		this.modalTriggerEl = document.activeElement;
		this.modalEl.classList.add('modal--opened');
		this.modalEl.setAttribute('aria-modal', true);
		this.modalEl.setAttribute('aria-hidden', false);
		this.modalEl.setAttribute('tabindex', 0);
		this.modalEl.focus();
		
		if (this.container) {
			this.container.setAttribute('aria-hidden', true);
		}
	}
	
	close() {
		this.modalEl.classList.remove('modal--opened');
		this.modalEl.setAttribute('aria-modal', false);
		this.modalEl.setAttribute('aria-hidden', true);
		this.modalEl.setAttribute('tabindex', -1);
		this.modalTriggerEl.focus();
		
		if (this.container) {
			this.container.removeAttribute('aria-hidden');
		}
	}
	
	onKeyDown(event) {
		if (event.keyCode === this.key.ESC) {
			this.close();
		}
		
		if (event.keyCode === this.key.TAB && !event.shiftKey) {
			if (document.activeElement === this.lastFocusableEl) {
				event.preventDefault();
				this.firstFocusableEl.focus();
			}
		}
		
		if (event.keyCode === this.key.TAB && event.shiftKey) {
			if (document.activeElement === this.firstFocusableEl) {
				event.preventDefault();
				this.lastFocusableEl.focus();
			}
		}
	}
	
	onClick(event) {
		if (event.target === this.modalEl) {
			this.close();
		}
	}
	
	onOkClick() {
		this.confirm();
		this.close();
	}
	
	onConfirm(fn) {
		this.confirm = fn;
	}
}



class ModalNoA11y {
	constructor(opts) {
		this.modalTrigger = document.querySelector(opts.modalTrigger);
		this.modalEl = document.querySelector(opts.selector);
		this.closeEl = this.modalEl.querySelector('.js-modal-close-btn');
		this.okEl = this.modalEl.querySelector('.js-modal-ok-btn');
		this.confirm = () => {};
		
		this.modalTrigger.addEventListener('click', this.open.bind(this));
		this.closeEl.addEventListener('click', this.close.bind(this));
		this.okEl.addEventListener('click', this.onOkClick.bind(this));
	}
	
	open() {
		this.modalEl.classList.add('modal--opened');
	}
	
	close() {
		this.modalEl.classList.remove('modal--opened');
	}
	
	onOkClick() {
		this.confirm();
		this.close();
	}
	
	onConfirm(fn) {
		this.confirm = fn;
	}
}



class ModalNoKeyboard {
	constructor(opts) {
		const FOCUSABLE_SELECTORS = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
		
		this.key = { TAB: 9 };

		this.modalTrigger = document.querySelector(opts.modalTrigger);
		this.modalEl = document.querySelector(opts.selector);
		this.closeEl = this.modalEl.querySelector('.js-modal-close-btn');
		this.okEl = this.modalEl.querySelector('.js-modal-ok-btn');
		this.selectedEl = this.modalEl.querySelector('.js-modal-content .js-select');
		
		this.focusableElems = this.modalEl.querySelectorAll(FOCUSABLE_SELECTORS);
		this.focusableElems = Array.prototype.slice.call(this.focusableElems);
		this.firstFocusableEl = this.focusableElems[0];
		this.lastFocusableEl = this.focusableElems[this.focusableElems.length - 1];
		
		this.modalTriggerEl = false;
		this.confirm = () => {};

		this.modalTrigger.addEventListener('click', this.open.bind(this));
		this.closeEl.addEventListener('click', this.close.bind(this));
		this.okEl.addEventListener('click', this.onOkClick.bind(this));
		this.modalEl.addEventListener('keydown', this.onKeyDown.bind(this));
	}
	
	open() {
		this.modalTriggerEl = document.activeElement;
		this.modalEl.classList.add('modal--opened');
		this.modalEl.setAttribute('aria-modal', true);
		this.modalEl.setAttribute('aria-hidden', false);
		this.modalEl.setAttribute('tabindex', 0);
		this.modalEl.focus();
		
		if (this.container) {
			this.container.setAttribute('aria-hidden', true);
		}
	}
	
	close() {
		this.modalEl.classList.remove('modal--opened');
		this.modalEl.setAttribute('aria-modal', false);
		this.modalEl.setAttribute('aria-hidden', true);
		this.modalEl.setAttribute('tabindex', -1);
		this.modalTriggerEl.focus();
		
		if (this.container) {
			this.container.removeAttribute('aria-hidden');
		}
	}
	
	onKeyDown(event) {
		if (event.keyCode === this.key.TAB && !event.shiftKey) {
			if (document.activeElement === this.lastFocusableEl) {
				event.preventDefault();
				this.firstFocusableEl.focus();
			}
		}
		
		if (event.keyCode === this.key.TAB && event.shiftKey) {
			if (document.activeElement === this.firstFocusableEl) {
				event.preventDefault();
				this.lastFocusableEl.focus();
			}
		}
	}

	onOkClick() {
		this.confirm();
		this.close();
	}
	
	onConfirm(fn) {
		this.confirm = fn;
	}
}



class ModalNoScreenReader {
	constructor(opts) {
		const FOCUSABLE_SELECTORS = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
		
		this.key = { ESC: 27, TAB: 9 };

		/** Overrides shower.js */
		this.key.ESC = 69;

		this.modalTrigger = document.querySelector(opts.modalTrigger);
		this.modalEl = document.querySelector(opts.selector);
		this.closeEl = this.modalEl.querySelector('.js-modal-close-btn');
		this.okEl = this.modalEl.querySelector('.js-modal-ok-btn');
		this.selectedEl = this.modalEl.querySelector('.js-modal-content .js-select');
		
		this.focusableElems = this.modalEl.querySelectorAll(FOCUSABLE_SELECTORS);
		this.focusableElems = Array.prototype.slice.call(this.focusableElems);
		this.firstFocusableEl = this.focusableElems[0];
		this.lastFocusableEl = this.focusableElems[this.focusableElems.length - 1];
		
		this.modalTriggerEl = false;
		this.confirm = () => {};

		this.modalTrigger.addEventListener('click', this.open.bind(this));
		this.modalEl.addEventListener('click', this.onClick.bind(this));
		this.closeEl.addEventListener('click', this.close.bind(this));
		this.okEl.addEventListener('click', this.onOkClick.bind(this));
		this.modalEl.addEventListener('keydown', this.onKeyDown.bind(this));
	}
	
	open() {
		this.modalTriggerEl = document.activeElement;
		this.modalEl.classList.add('modal--opened');
		this.modalEl.setAttribute('aria-modal', true);
		this.modalEl.setAttribute('aria-hidden', false);
		this.modalEl.setAttribute('tabindex', 0);
		this.modalEl.focus();
		
		if (this.container) {
			this.container.setAttribute('aria-hidden', true);
		}
	}
	
	close() {
		this.modalEl.classList.remove('modal--opened');
		this.modalEl.setAttribute('aria-modal', false);
		this.modalEl.setAttribute('aria-hidden', true);
		this.modalEl.setAttribute('tabindex', -1);
		this.modalTriggerEl.focus();
		
		if (this.container) {
			this.container.removeAttribute('aria-hidden');
		}
	}
	
	onKeyDown(event) {
		if (event.keyCode === this.key.ESC) {
			this.close();
		}
		
		if (event.keyCode === this.key.TAB && !event.shiftKey) {
			if (document.activeElement === this.lastFocusableEl) {
				event.preventDefault();
				this.firstFocusableEl.focus();
			}
		}
		
		if (event.keyCode === this.key.TAB && event.shiftKey) {
			if (document.activeElement === this.firstFocusableEl) {
				event.preventDefault();
				this.lastFocusableEl.focus();
			}
		}
	}
	
	onClick(event) {
		if (event.target === this.modalEl) {
			this.close();
		}
	}
	
	onOkClick() {
		this.confirm();
		this.close();
	}
	
	onConfirm(fn) {
		this.confirm = fn;
	}
}



class ModalOk {
	constructor(opts) {
		const FOCUSABLE_SELECTORS = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
		
		this.key = { ESC: 27, TAB: 9 };

		/** Overrides shower.js */
		this.key.ESC = 69;

		this.modalTrigger = document.querySelector(opts.modalTrigger);
		this.modalEl = document.querySelector(opts.selector);
		this.closeEl = this.modalEl.querySelector('.js-modal-close-btn');
		this.okEl = this.modalEl.querySelector('.js-modal-ok-btn');
		this.selectedEl = this.modalEl.querySelector('.js-modal-content .js-select');
		
		this.focusableElems = this.modalEl.querySelectorAll(FOCUSABLE_SELECTORS);
		this.focusableElems = Array.prototype.slice.call(this.focusableElems);
		this.firstFocusableEl = this.focusableElems[0];
		this.lastFocusableEl = this.focusableElems[this.focusableElems.length - 1];
		
		this.modalTriggerEl = false;
		this.confirm = () => {};

		this.modalTrigger.addEventListener('click', this.open.bind(this));
		this.modalEl.addEventListener('click', this.onClick.bind(this));
		this.closeEl.addEventListener('click', this.close.bind(this));
		this.okEl.addEventListener('click', this.onOkClick.bind(this));
		this.modalEl.addEventListener('keydown', this.onKeyDown.bind(this));
	}
	
	open() {
		this.modalTriggerEl = document.activeElement;
		this.modalEl.classList.add('modal--opened');
		this.modalEl.setAttribute('aria-modal', true);
		this.modalEl.setAttribute('aria-hidden', false);
		this.modalEl.setAttribute('tabindex', 0);
		this.modalEl.focus();
		this.modalTrigger.setAttribute('aria-expanded', true);
		
		if (this.container) {
			this.container.setAttribute('aria-hidden', true);
		}
	}
	
	close() {
		this.modalEl.classList.remove('modal--opened');
		this.modalEl.setAttribute('aria-modal', false);
		this.modalEl.setAttribute('aria-hidden', true);
		this.modalEl.setAttribute('tabindex', -1);
		this.modalTriggerEl.focus();
		this.modalTrigger.setAttribute('aria-expanded', false);
		
		if (this.container) {
			this.container.removeAttribute('aria-hidden');
		}
	}
	
	onKeyDown(event) {
		if (event.keyCode === this.key.ESC) {
			this.close();
		}
		
		if (event.keyCode === this.key.TAB && !event.shiftKey) {
			if (document.activeElement === this.lastFocusableEl) {
				event.preventDefault();
				this.firstFocusableEl.focus();
			}
		}
		
		if (event.keyCode === this.key.TAB && event.shiftKey) {
			if (document.activeElement === this.firstFocusableEl) {
				event.preventDefault();
				this.lastFocusableEl.focus();
			}
		}
	}
	
	onClick(event) {
		if (event.target === this.modalEl) {
			this.close();
		}
	}
	
	onOkClick() {
		this.confirm();
		this.close();
	}
	
	onConfirm(fn) {
		this.confirm = fn;
	}
}