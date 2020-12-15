class Counter {
    constructor(selector) {
        this.counter = document.querySelector(selector);
        this.countBtn = this.counter.querySelector('.js-btn-count');
        this.resetBtn = this.counter.querySelector('.js-btn-reset');
        this.resultEl = this.counter.querySelector('.js-result');

        this.countBtn.addEventListener('click', () => {
            this.plus();
        });
    
        this.resetBtn.addEventListener('click', () => {
            this.reset();
        });
    }

    plus() {
        this.resultEl.textContent = Number(this.resultEl.textContent) + 1;
    }

    reset() {
        this.resultEl.textContent = 0;
    }
}