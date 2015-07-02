"use strict"

class Character {

	/**
	@constructor
	@param { Number } [rate > 1] - 成長率に加算されるレート
	**/
	constructor(name, rate){
		this.name = name
		this.growthRate = Math.random() * rate || 1
	}

	get(props){

	}
}
