class Slider {
	sildesArray;
	maxNoOfDivs;
	shownDivs;
	constructor(maxNoOfDivs) {
		this.maxNoOfDivs = maxNoOfDivs;
		this.sildesArray = [...document.getElementsByClassName('mySlides')];
		this.changeArrayToCircularArray();
		this.TurnOffSlides();
		this.TurnFirstSlides(maxNoOfDivs);
	}

	changeArrayToCircularArray() {
		this.sildesArray.forEach((x, index) => {
			x.next = this.sildesArray[
				index + 1 === this.sildesArray.length ? 0 : index + 1
			];
			x.prev = this.sildesArray[
				index - 1 === -1 ? this.sildesArray.length - 1 : index - 1
			];
		});
	}

	makeArrayForShow(value, startIndexValue) {
		let ArrayForShow;
		if (value === 1) {
			ArrayForShow = [this.sildesArray[startIndexValue].next];
			for (let i = 1; i < this.maxNoOfDivs; i++) {
				ArrayForShow.push(ArrayForShow[ArrayForShow.length - 1].next);
			}
		} else if (value === -1) {
			ArrayForShow = [this.sildesArray[startIndexValue].prev];
			for (let i = 1; i < this.maxNoOfDivs; i++) {
				ArrayForShow.unshift(ArrayForShow[0].prev);
			}
		}

		return ArrayForShow;
	}

	TurnOnSildes(value) {
		let startIndexValue;
		if (value === 1) {
			startIndexValue = this.sildesArray.indexOf(
				this.shownDivs[this.shownDivs.length - 1]
			);
		} else if (value === -1) {
			startIndexValue = this.sildesArray.indexOf(this.shownDivs[0]);
		}

		this.shownDivs = this.makeArrayForShow(value, startIndexValue);
		this.shownDivs.forEach(
			(x, index) => (x.style = `order:${index + 1}; display:block;`)
		);
	}

	TurnFirstSlides(maxNoOfDivs) {
		this.shownDivs = this.sildesArray.slice(0, maxNoOfDivs);
		this.shownDivs.forEach((x) => (x.style.display = 'block'));
	}

	TurnOffSlides() {
		this.sildesArray.forEach(
			(x, index) => (x.style = `order:${index + 1}; display:none;`)
		);
	}
}
let slider = new Slider(4);

const plusSlides = (value) => {
	slider.TurnOffSlides();
	slider.TurnOnSildes(value);
};
