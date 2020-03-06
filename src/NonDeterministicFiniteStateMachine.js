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
    return super.transitions[state][symbol];
  }

  accepts(string, state = this.startState) {
    return true;
  }

}

