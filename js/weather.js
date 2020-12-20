const weatherKey = '9bb4f525c1121dfae98a1bcc9e046828';

const mockData = false;

const cities = [
	{
		id: "703448",
		name: "Kiev",
		picture: "./pictures/weather-bg-kiev.jpg"
	},
	{
		id: "2643743",
		name: "London",
		picture: "./pictures/weather-bg-london.jpg"
	},{
		id: "2950159",
		name: "Berlin",
		picture: "./pictures/weather-bg-berlin.jpg"
	}
];



class Weather {
	constructor(opts) {
		this.cities = opts.cities;
		this.delay = opts.delay;
		this.days = [
			{ abbr: 'Sun', fullName: 'Sunday' },
			{ abbr: 'Mon', fullName: 'Monday' },
			{ abbr: 'Tue', fullName: 'Tuesday' },
			{ abbr: 'Wed', fullName: 'Wednesday' },
			{ abbr: 'Thu', fullName: 'Thursday' },
			{ abbr: 'Fri', fullName: 'Friday' },
			{ abbr: 'Sat', fullName: 'Saturday'}
		];
		this.defaultCity = this.cities[0];
		
		this.el = document.querySelector(opts.selector);
		this.modal = opts.modal;
		this.select = opts.select;
		this.nowWeatherEl = this.el.querySelector('.js-weather-now');
		this.nowTempEl = this.nowWeatherEl.querySelector('.js-weather-now-temp');
		this.nowCityEl = this.nowWeatherEl.querySelector('.js-weather-city');
		this.nowIconEl = this.nowWeatherEl.querySelector('.js-weather-now-icon');
		this.loadingEl = this.el.querySelector('.js-weather-loading');
		this.dayList = Array.prototype.slice.call(this.el.querySelectorAll('.js-weather-forecast li'));
		this.liveError = this.el.querySelector('.js-weather-live-error');
		this.liveStatus = this.el.querySelector('.js-weather-live-status');
		
		// return;
		
		this.getWeather(this.defaultCity.id);
		
		this.modal.onConfirm(() => {
			this.getWeather(this.select.value());
		});
		console.trace('###:')
	}
	
	getWeather(id) {
		this.clearError();
		this.loadingEl.classList.add('weather-loading--active');
		this.liveStatus.textContent = 'Loading...';

		this.get({
			id: id,
			success: (json) => {
				console.log('🌤 ',  json.city.name,  this.formatForecast(json.list));
				
				this.updateWeather({
					city: json.city.name,
					picture: this.cities.find(city => id === city.id).picture || '',
					forecast: this.formatForecast(json.list)
				});
				
				this.loadingEl.classList.remove('weather-loading--active');
			},
			error: (txt) => {
				console.log('❌', txt);
				this.showError(txt);
			}
		});
	}
	
	showError(txt) {
		this.loadingEl.classList.remove('weather-loading--active');
		this.el.classList.add('weather-error');
		this.liveError.textContent = 'Whoops, error. ' + txt;
	}
	
	clearError() {
		this.el.classList.remove('weather-error');
		this.liveError.textContent = '';
	}
	
	updateWeather(opts) {
		this.nowTempEl.textContent = opts.forecast[0].temp;
		this.nowCityEl.textContent = opts.city;
		this.nowWeatherEl.style['background-image'] = `url(${opts.picture})`;
		this.nowIconEl.setAttribute('xlink:href', `#${opts.forecast[0].icon}`);
		this.nowIconEl.parentNode.setAttribute('aria-label', opts.forecast[0].description);
		this.liveStatus.textContent = `Loaded ${opts.city}`;
		
		this.dayList.map((dayEl, i) => {
			const day = opts.forecast[i + 1];
			
			dayEl.querySelector('.js-forecast-day').textContent = day.day.abbr;
			dayEl.querySelector('.js-forecast-day').setAttribute('aria-label', day.day.fullName);
			dayEl.querySelector('.js-forecast-temp').textContent = day.temp;
			dayEl.querySelector('.js-forecast-icon').setAttribute('xlink:href', `#${day.icon}`);
			dayEl.querySelector('.js-forecast-icon').parentNode.setAttribute('aria-label', day.description);
		});
	}
	
	get(opts) {
		if (mockData) {
			setTimeout(() => {
				opts.success(mocked.find(item => item.city.id === Number(opts.id)));
			}, this.delay);

			return;
		}

		const xhr = new XMLHttpRequest();

		xhr.open('GET', `//api.openweathermap.org/data/2.5/forecast?appid=${weatherKey}&id=${opts.id}`, true);

		xhr.send();

		xhr.onreadystatechange = function() {
  			if (this.readyState != 4) {
				return;
			}

			if (this.status != 200) {
				opts.error(this.statusText);
				return;
			}
			
			opts.success(JSON.parse(this.responseText));
		}
	}
	
	formatForecast(list) {
		const now = new Date();
		return list.reduce((arr, item, i) => {
			const date = new Date(item.dt_txt);

			if (
				i === 0 ||
				(date.getDate() !== now.getDate()) && date.getHours() === 12
			) {
				arr.push({
					temp: Math.round(item.main.temp - 273.15),
					day: {
						abbr: this.days[date.getDay()].abbr,
						fullName: this.days[date.getDay()].fullName
					},
					icon: item.weather[0].icon,
					description: item.weather[0].description
				});
			}

			return arr;
		}, []);
	}
}



class WeatherNoA11y {
	constructor(opts) {
		this.cities = opts.cities;
		this.delay = opts.delay;

		this.days = [
			{ abbr: 'Sun', fullName: 'Sunday' },
			{ abbr: 'Mon', fullName: 'Monday' },
			{ abbr: 'Tue', fullName: 'Tuesday' },
			{ abbr: 'Wed', fullName: 'Wednesday' },
			{ abbr: 'Thu', fullName: 'Thursday' },
			{ abbr: 'Fri', fullName: 'Friday' },
			{ abbr: 'Sat', fullName: 'Saturday'}
		];
		
		this.defaultCity = this.cities[0];
		this.el = document.querySelector(opts.selector);
		this.modal = opts.modal;
		this.select = opts.select;
		this.nowWeatherEl = this.el.querySelector('.js-weather-now');
		this.nowTempEl = this.nowWeatherEl.querySelector('.js-weather-now-temp');
		this.nowCityEl = this.nowWeatherEl.querySelector('.js-weather-city');
		this.nowIconEl = this.nowWeatherEl.querySelector('.js-weather-now-icon');
		this.loadingEl = this.el.querySelector('.js-weather-loading');
		this.dayList = Array.prototype.slice.call(this.el.querySelectorAll('.js-weather-forecast li'));
		this.liveError = this.el.querySelector('.js-weather-live-error');
		
		// return;
		console.trace('000:')
		this.getWeather(this.defaultCity.id);
		
		this.modal.onConfirm(() => {
			this.getWeather(this.select.value());
		});
	}
	
	getWeather(id) {
		this.clearError();
		this.loadingEl.classList.add('weather-loading--active');

		this.get({
			id: id,
			success: (json) => {
				setTimeout(() => {
					console.log('🌤 ',  json.city.name,  this.formatForecast(json.list));
					
					this.updateWeather({
						city: json.city.name,
						picture: this.cities.find(city => id === city.id).picture || '',
						forecast: this.formatForecast(json.list)
					});
					this.loadingEl.classList.remove('weather-loading--active');
				}, this.delay);
			},
			error: (txt) => {
				console.log('❌', txt);
				this.showError(txt);
			}
		});
	}
	
	showError(txt) {
		this.loadingEl.classList.remove('weather-loading--active');
		this.el.classList.add('weather-error');
		this.liveError.textContent = 'Whoops, error. ' + txt;
	}
	
	clearError() {
		this.el.classList.remove('weather-error');
		this.liveError.textContent = '';
	}
	
	updateWeather(opts) {
		this.nowTempEl.textContent = opts.forecast[0].temp;
		this.nowCityEl.textContent = opts.city;
		this.nowWeatherEl.style['background-image'] = `url(${opts.picture})`;
		this.nowIconEl.setAttribute('xlink:href', `#${opts.forecast[0].icon}`);
		
		this.dayList.map((dayEl, i) => {
			const day = opts.forecast[i + 1];
			
			dayEl.querySelector('.js-forecast-day').textContent = day.day.abbr;
			dayEl.querySelector('.js-forecast-temp').textContent = day.temp;
			dayEl.querySelector('.js-forecast-icon').setAttribute('xlink:href', `#${day.icon}`);
		});
	}
	
	get(opts) {
		if (mockData) {
			setTimeout(() => {
				opts.success(mocked.find(item => {
					return item.city.id === Number(opts.id);
				}));
			}, this.delay);

			return;
		}

		const xhr = new XMLHttpRequest();

		xhr.open('GET', `//api.openweathermap.org/data/2.5/forecast?appid=${weatherKey}&id=${opts.id}`, true);

		xhr.send();

		xhr.onreadystatechange = function() {
  			if (this.readyState != 4) {
				return;
			}

			if (this.status != 200) {
				opts.error(this.statusText);
				return;
			}
			
			opts.success(JSON.parse(this.responseText));
		}
	}
	
	formatForecast(list) {
		const now = new Date();
		return list.reduce((arr, item, i) => {
			const date = new Date(item.dt_txt);

			if (
				i === 0 ||
				(date.getDate() !== now.getDate()) && date.getHours() === 12
			) {
				arr.push({
					temp: Math.round(item.main.temp - 273.15),
					day: {
						abbr: this.days[date.getDay()].abbr,
						fullName: this.days[date.getDay()].fullName
					},
					icon: item.weather[0].icon,
					description: item.weather[0].description
				});
			}

			return arr;
		}, []);
	}
}