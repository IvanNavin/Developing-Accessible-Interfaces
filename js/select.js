class Select {
	constructor(opts) {
		this.key = { UP: 38, DOWN: 40, SPACE: 32, ESC: 27, TAB: 9, ENTER: 13 };
		
		this.select = document.querySelector(opts.selector);
		this.btn = this.select.querySelector('.select-btn');
		this.list = this.select.querySelector('.select-list');
		this.items = Array.prototype.slice.call(this.list.querySelectorAll('li'));
		this.live = this.select.querySelector('.select-live');
		this.change = () => {};
		this.active = this.list.querySelector('li.active');
		
		if (!this.active) {
			this.active = this.items[0];
			this.active.classList.add('active');
		} else {
			this.setSelected(this.active);
		}
		
		document.addEventListener('click', (e) => {
			if (e.target !== this.select && e.target !== this.btn) {
				this.close();
			}
		});
		
		this.btn.addEventListener('click', (e) => {
			this.handleBtnClick();
		});
		
		this.btn.addEventListener('keydown', (e) => {
			this.handleKeydown(e);
		});
		
		this.items.map((item) => {
			item.addEventListener('click', this.handleItemClick.bind(this));
		});
	}
	
	open() {
		this.select.classList.add('select--open');
		this.btn.setAttribute('aria-expanded', true);
		this.updateLive();
	}
	
	close() {
		this.select.classList.remove('select--open');
		this.btn.setAttribute('aria-expanded', false);
	}

	value() {
		return this.select.getAttribute('data-selected');
	}
	
	handleItemClick(e) {
		this.close();
		this.setSelected(e.target);
		this.btn.focus();
	}
	
	handleItems(keyCode) {
		const activeIndex = this.getActiveIndex();

		if (keyCode === this.key.UP) {
			if (activeIndex > 0) {
				this.setActive(this.items[activeIndex - 1]);
				this.updateLive();
			}
		}
		
		if (keyCode === this.key.DOWN) {
			if (activeIndex < this.items.length - 1) {
				this.setActive(this.items[activeIndex + 1]);
				this.updateLive();
			}
		}
	}
	
	setActive(el) {
		this.active.classList.remove('active');
		this.active = el;
		this.active.classList.add('active');
	}
	
	updateLive() {
		this.live.textContent = this.active.textContent;
	}
	
	getActiveIndex() {
		return this.items.indexOf(this.active);
	}
	
	setSelected(el) {
		this.btn.textContent = el.textContent;
		this.items.map(item => {
			if (item === el) {
				const value = el.getAttribute('data-value');
				this.select.setAttribute('data-selected', value);
				this.setActive(el);
				this.change(value);
				item.setAttribute('aria-selected', true);
			} else {
				item.removeAttribute('aria-selected');
			}
		});
	}
	
	handleBtnClick() {
		if (this.isOpened()) {
			this.close();
		} else {
			this.open();
		}
	}
	
	handleKeydown(e) {
		if (e.keyCode === this.key.UP || e.keyCode === this.key.DOWN) {
			if (!this.isOpened()) {
				this.open();
			} else {
				this.handleItems(e.keyCode);
			}
		}
		
		if (e.keyCode === this.key.ESC && this.isOpened()) {
			this.close();
		}
		
		if (e.keyCode === this.key.TAB) {
			if (this.isOpened()) {
				e.preventDefault();
			}
		}
		
		if (e.keyCode === this.key.ENTER || e.keyCode === this.key.SPACE) {
			this.setSelected(this.active);
		}
	}
	
	isOpened() {
		return this.select.classList.contains('select--open');
	}
	
	onChange(fn) {
		this.change = fn;
	}
}



class SelectMarkup {
	constructor(opts) {
		this.select = document.querySelector(opts.selector);
		this.btn = this.select.querySelector('.select-btn');
		this.list = this.select.querySelector('.select-list');
		this.items = Array.prototype.slice.call(this.list.querySelectorAll('li'));
		this.change = () => {};
		this.active = this.list.querySelector('li.active');
		
		if (!this.active) {
			this.active = this.items[0];
			this.active.classList.add('active');
		} else {
			this.setSelected(this.active);
		}
		
		document.addEventListener('click', (e) => {
			if (e.target !== this.select && e.target !== this.btn) {
				this.close();
			}
		});
		
		this.btn.addEventListener('click', (e) => {
			this.handleBtnClick();
		});
		
		this.items.map((item) => {
			item.addEventListener('click', this.handleItemClick.bind(this));
		});
	}
	
	open() {
		this.select.classList.add('select--open');
	}
	
	close() {
		this.select.classList.remove('select--open');
	}

	value() {
		return this.select.getAttribute('data-selected');
	}
	
	handleItemClick(e) {
		this.close();
		this.setSelected(e.target);
		this.btn.focus();
	}
	
	setActive(el) {
		this.active.classList.remove('active');
		this.active = el;
		this.active.classList.add('active');
	}
	
	getActiveIndex() {
		return this.items.indexOf(this.active);
	}
	
	setSelected(el) {
		this.btn.textContent = el.textContent;
		this.items.map(item => {
			if (item === el) {
				const value = el.getAttribute('data-value');
				this.select.setAttribute('data-selected', value);
				this.setActive(el);
				this.change(value);
			}
		});
	}
	
	handleBtnClick() {
		if (this.isOpened()) {
			this.close();
		} else {
			this.open();
		}
	}
	
	isOpened() {
		return this.select.classList.contains('select--open');
	}
	
	onChange(fn) {
		this.change = fn;
	}
}



class SelectKeyboard {
	constructor(opts) {
		this.key = { UP: 38, DOWN: 40, SPACE: 32, ESC: 27, TAB: 9, ENTER: 13 };
		
		this.select = document.querySelector(opts.selector);
		this.btn = this.select.querySelector('.select-btn');
		this.list = this.select.querySelector('.select-list');
		this.items = Array.prototype.slice.call(this.list.querySelectorAll('li'));
		this.change = () => {};
		this.active = this.list.querySelector('li.active');
		
		if (!this.active) {
			this.active = this.items[0];
			this.active.classList.add('active');
		} else {
			this.setSelected(this.active);
		}
		
		document.addEventListener('click', (e) => {
			if (e.target !== this.select && e.target !== this.btn) {
				this.close();
			}
		});
		
		this.btn.addEventListener('click', (e) => {
			this.handleBtnClick();
		});
		
		this.btn.addEventListener('keydown', (e) => {
			this.handleKeydown(e);
		});
		
		this.items.map((item) => {
			item.addEventListener('click', this.handleItemClick.bind(this));
		});
	}
	
	open() {
		this.select.classList.add('select--open');
	}
	
	close() {
		this.select.classList.remove('select--open');
	}

	value() {
		return this.select.getAttribute('data-selected');
	}
	
	handleItemClick(e) {
		this.close();
		this.setSelected(e.target);
		this.btn.focus();
	}
	
	handleItems(keyCode) {
		const activeIndex = this.getActiveIndex();

		if (keyCode === this.key.UP) {
			if (activeIndex > 0) {
				this.setActive(this.items[activeIndex - 1]);
			}
		}
		
		if (keyCode === this.key.DOWN) {
			if (activeIndex < this.items.length - 1) {
				this.setActive(this.items[activeIndex + 1]);
			}
		}
	}
	
	setActive(el) {
		this.active.classList.remove('active');
		this.active = el;
		this.active.classList.add('active');
	}
	
	getActiveIndex() {
		return this.items.indexOf(this.active);
	}
	
	setSelected(el) {
		this.btn.textContent = el.textContent;
		this.items.map(item => {
			if (item === el) {
				const value = el.getAttribute('data-value');
				this.select.setAttribute('data-selected', value);
				this.setActive(el);
				this.change(value);
			}
		});
	}
	
	handleBtnClick() {
		if (this.isOpened()) {
			this.close();
		} else {
			this.open();
		}
	}
	
	handleKeydown(e) {
		if (e.keyCode === this.key.UP || e.keyCode === this.key.DOWN) {
			if (!this.isOpened()) {
				this.open();
			} else {
				this.handleItems(e.keyCode);
			}
		}
		
		if (e.keyCode === this.key.ESC && this.isOpened()) {
			this.close();
		}
		
		if (e.keyCode === this.key.TAB) {
			if (this.isOpened()) {
				e.preventDefault();
			}
		}
		
		if (e.keyCode === this.key.ENTER || e.keyCode === this.key.SPACE) {
			this.setSelected(this.active);
		}
	}
	
	isOpened() {
		return this.select.classList.contains('select--open');
	}
	
	onChange(fn) {
		this.change = fn;
	}
}