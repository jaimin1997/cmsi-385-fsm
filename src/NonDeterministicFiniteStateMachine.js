import DeterministicFiniteStateMachine from './DeterministicFiniteStateMachine';

export const LAMBDA = '';

export default class NonDeterministicFiniteStateMachine extends DeterministicFiniteStateMachine {

  /**
   */
  constructor(description) {
    super(description);
  }


  /**
   *
   * @returns a string state name
   */
  transition(state, symbol) {
    if(!this.transitions[state]) return [];
    return this.transitions[state][symbol] || [];
  }

  accepts(string, state = this.startState) {
    let ns = [];
	ns.push(state);
	let token = string.charAt(0);

	for (let i = 0; i < (string.length) ; i++){

		token = string.charAt(i);

		let j = 0;
		while(j < (ns.length)){
			if(this.transition(ns[j],[[LAMBDA]])!= undefined){
				for (let k = 0; k < (this.transition(ns[j],[[LAMBDA]])).length ; k++ ){
					if (!ns.includes(this .transition(ns[j],[[LAMBDA]])[k])){
						ns.push(this.transition(ns[j],[[LAMBDA]])[k])
					}
				}
			}
			j = j + 1;
		}

		let newns = [];
		for (let j = 0; j < (ns.length); j++){
			if((this.transition(ns[j],token)) != undefined){
				for (let k = 0; k < (this.transition(ns[j],token)).length ; k++ ){
					newns.push(this.transition(ns[j],token)[k])
				}
			}
		}
		ns = newns;
	}

	for (let  i = 0; i < ns.length ;i++){

		let j = 0;
		while(j < (ns.length)){
			if(this.transition(ns[j],[[LAMBDA]])!= undefined){
				for (let k = 0; k < (this.transition(ns[j],[[LAMBDA]])).length ; k++ ){
					if (!ns.includes(this .transition(ns[j],[[LAMBDA]])[k])){
						ns.push(this.transition(ns[j],[[LAMBDA]])[k])
					}
				}
			}
			j = j + 1;
		}

		//checking whether any state is in accpt states
		if (this.acceptStates.includes(ns[i])){
			return "true"
		}
	}
	return "false";
  }
}
