import DeterministicFiniteStateMachine from './DeterministicFiniteStateMachine';

const tests = {
  divBy3: {
    description: {
      transitions: {
        r0: {
          0: 'r0',
          1: 'r1',
        },
        r1: {
          0: 'r2',
          1: 'r0',
        },
        r2: {
          0: 'r1',
          1: 'r2',
        }
      },
      startState: 'r0',
      acceptStates: ['r0'],
    },

    tests: {
      accepts: [
        '00110',
        '11',
      ],
    }
  },

};

for (let i = 0; i < 20; i++) {
  if (i % 3 === 0) {
    tests.divBy3.tests.accepts.push(i.toString(2));
  } else {
    tests.divBy3.tests.accepts.push(i.toString(2));
  }
}


describe('examples', () => {
  for (const [key, desc] of Object.entries(tests)) {
    describe(key, () => {
      test('transition', () => {
        const { description } = desc;

        const fsm = new DeterministicFiniteStateMachine(description);
        for (const [state, stateTransitions] of Object.entries(description.transitions)) {
          for (const [symbol, nextState] of Object.entries(stateTransitions)) {
            expect(fsm.transition(state, symbol)).toEqual(nextState);
          }
        }
      });
      test('accepts / rejects', () => {
        const { description, tests: { accepts, rejects } } = desc;
        const fsm = new DeterministicFiniteStateMachine(description);

        for (const string of accepts) {
          expect(fsm.accepts(string)).toEqual(true);
        }

        for (const string of rejects) {
          expect(fsm.accepts(string)).toEqual(false);
        }
      });
    });
  }
});
