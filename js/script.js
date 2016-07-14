var rabbit, snake, area, length = 0;

function Snake (meal) {


	this.init = function() {
		element = document.getElementById('gameArea')
				.appendChild(document.createElement('div'));
		element.id = 'element-'+length;
		element.className = 'snake';

		this.html = document.getElementById('element-'+length); //создаем html под блок змейки
		this.width = 10;
		this.height = 10;
		this.html.style.width = this.width+'px';
		this.html.style.height = this.height+'px';


		if (length == 0) {
			this.left = 0;
			this.top = 0;
			this.directionRight = 0;
			this.directionTop = 1;
		} else {
			this.directionRight = prevRight;
			this.directionTop = prevTop;
		}
		
		prevRight = this.directionRight;
		prevTop = this.directionTop;

		this.html.style.left = this.left+'px';
		this.html.style.top = this.top+'px';
	}

	this.move = function() {
		this.html.style.left = this.left+'px';
		this.html.style.top = this.top+'px';

		if(this.left >= 0 && this.left <= 400 && this.top >= 0 && this.top <= 400) {
			this.left += 10 * this.directionRight;
			this.top += 10 * this.directionTop;
		} else {
			console.log('stop game');
			length = 0;
			this.init();
		}
		this.eat(meal);
	}

	this.turn = function(e) {
		e = e || window.event;
  		if (e.keyCode === 39) {
  			if (this.directionTop != 0) {
				this.directionRight = - this.directionTop;
				this.directionTop = 0;
			} else {
				this.directionTop = this.directionRight;
				this.directionRight = 0;
			}
		} else if (e.keyCode === 37) {
		    if (this.directionTop != 0) {
				this.directionRight = this.directionTop;
				this.directionTop = 0;
			} else {
				this.directionTop = - this.directionRight;
				this.directionRight = 0;
			}
	  	}
	  	
	  	prevRight = this.directionRight;
		prevTop = this.directionTop;

	  	return false;
	}

	this.eat = function(rabbit) {
		if(this.left == rabbit.left && this.top == rabbit.top) {
	    	alert("Eat!");
	    	length = length + 1;
	    	this.init();
	    	rabbit.show();
	    }
	}

	this.grow = function() {
		
	}

    this.init();
	that = this;
    document.addEventListener('keydown', function(){that.turn();});
    this.intervalId = window.setInterval(function(){that.move();}, 200);
}

function Rabbit (rabbitId) {
	this.width = 10;
	this.height = 10;

	this.html = document.getElementById(rabbitId);
	this.html.style.width = this.width + 'px';
	this.html.style.height = this.height + 'px';

	this.show = function () {
		this.left = Math.floor((Math.floor(Math.random() * (400 - 10 + 1)) + 10)/10)*10;
		this.top = Math.floor((Math.floor(Math.random() * (400 - 10 + 1)) + 10)/10)*10;
		this.html.style.left = this.left + 'px';
		this.html.style.top = this.top + 'px';
	}
	this.show();
}

window.onload = function() {
    area = document.getElementById('gameArea');
    area.style.width = '400px';
    area.style.height = '400px';

    
    rabbit = new Rabbit('rabbit');
    snake = new Snake(rabbit);
}