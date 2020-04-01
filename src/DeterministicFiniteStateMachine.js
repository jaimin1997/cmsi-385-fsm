export default class DeterministicFiniteStateMachine {

  /**
   */
  constructor({ transitions, startState, acceptStates }) {
    this._transitions = transitions;
    this._startState  = startState;
    this._acceptStates = acceptStates;
  }
  /**
   *
   * @returns a string state name
   */
  transition(state, symbol) {
    return this._transitions[state][symbol];
  }

  accepts(string, state = this._startState) {
  var j;
	var currentstate = state;
	var token = string.charAt(0);
	for (j = 0; j < (string.length); j++)
	{
		token = string.charAt(j);
		currentstate = this._transitions[currentstate][token];
	}
	return this._acceptStates.some((element) => element === currentstate)

	}

}
