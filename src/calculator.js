import React from 'react'
import './calculator.scss'

class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formula: '',
      currInput: '',
      input: [],
      output: 0,
      display: true,
      operations: [],
      screenHeight: 548,
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress)
    window.addEventListener('load', this.getScreenHeight)
    window.addEventListener('resize', this.getScreenHeight)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress)
    window.removeEventListener('load', this.getScreenHeight)
    window.removeEventListener('resize', this.getScreenHeight)
  }

  handleKeyPress = (e) => {
    let keyCode = e.key !== undefined ? e.key : e.which
    switch (keyCode) {
      case '0':
      case '48':
        document.getElementById('zero').click()
        break
      case '1':
      case '49':
        document.getElementById('one').click()
        break
      case '2':
      case '50':
        document.getElementById('two').click()
        break
      case '3':
      case '51':
        document.getElementById('three').click()
        break
      case '4':
      case '52':
        document.getElementById('four').click()
        break
      case '5':
      case '53':
        document.getElementById('five').click()
        break
      case '6':
      case '54':
        document.getElementById('six').click()
        break
      case '7':
      case '55':
        document.getElementById('seven').click()
        break
      case '8':
      case '56':
        document.getElementById('eight').click()
        break
      case '9':
      case '57':
        document.getElementById('nine').click()
        break
      case '.':
      case '110':
      case '190':
        document.getElementById('decimal').click()
        break
      default:
        break
    }

    if ((e.shiftKey && e.key === '=') || e.key === '+' || e.which === '107') {
      document.getElementById('add').click()
    } else if (e.key === '=' || e.key === 'Enter' || e.which === '13') {
      document.getElementById('equals').click()
    } else if (e.key === '-' || e.which === '109' || e.which === '189') {
      document.getElementById('subtract').click()
    } else if (
      (e.shiftKey && e.key === '8') ||
      e.key === '*' ||
      e.which === '106'
    ) {
      document.getElementById('multiply').click()
    } else if (e.key === '/' || e.which === '111' || e.which === '191') {
      document.getElementById('divide').click()
    }
  }

  getScreenHeight = () => {
    this.setState((state) => ({
      screenHeight: window.innerHeight,
    }))
  }

  input = (e) => {
    if (this.state.operations[this.state.operations.length - 1] !== '=') {
      if (!(this.state.currInput === '0' && e.target.value === '0')) {
        this.setState((state) => ({
          formula: state.formula + e.target.value,
          currInput: state.currInput + e.target.value,
          display: false,
        }))
      } else {
        this.setState((state) => ({
          formula: state.formula,
          currInput: state.currInput,
        }))
      }
    } else {
      this.setState((state) => ({
        formula: e.target.value,
        currInput: e.target.value,
        operations: [],
        input: [],
        output: 0,
        display: false,
      }))
    }

    if (this.state.input.length > 0) {
      switch (this.state.operations[this.state.operations.length - 1]) {
        case '+':
          this.setState((state) => ({
            output:
              state.input[state.input.length - 1] + Number(state.currInput),
          }))
          break
        case '-':
          this.setState((state) => ({
            output:
              state.input[state.input.length - 1] - Number(state.currInput),
          }))
          break
        case 'x':
          this.setState((state) => ({
            output:
              state.input[state.input.length - 1] * Number(state.currInput),
          }))
          break
        case '/':
          this.setState((state) => ({
            output:
              state.input[state.input.length - 1] / Number(state.currInput),
          }))
          break
        default:
          break
      }
    }
  }

  decimalize = (e) => {
    if (this.state.currInput.indexOf('.') === -1) {
      this.setState((state) => ({
        formula: state.formula + e.target.value,
        currInput: state.currInput + e.target.value,
      }))
    }
  }

  delete = () => {
    if (this.state.currInput !== '') {
      this.setState((state) => ({
        formula: state.formula.substring(0, state.formula.length - 1),
        currInput: state.currInput.substring(0, state.currInput.length - 1),
      }))

      switch (this.state.operations[this.state.operations.length - 1]) {
        case '+':
          this.setState((state) => ({
            output:
              state.input[state.input.length - 1] + Number(state.currInput),
          }))
          break
        case '-':
          this.setState((state) => ({
            output:
              state.input[state.input.length - 1] - Number(state.currInput),
          }))
          break
        case 'x':
          this.setState((state) => ({
            output:
              state.input[state.input.length - 1] * Number(state.currInput),
          }))
          break
        case '/':
          this.setState((state) => ({
            output:
              state.input[state.input.length - 1] / Number(state.currInput),
          }))
          break
        default:
          break
      }
    }
  }

  operate = (e) => {
    if (this.state.currInput === '') {
      if (/\+|-/.test(e.target.value) && this.state.input.length === 0) {
        this.setState((state) => ({
          formula: state.formula + ' ' + e.target.value,
          input: state.input.concat(0),
          operations: state.operations.concat(e.target.value),
          display: false,
        }))
      } else if (/x|\//.test(e.target.value) && this.state.input.length === 0) {
        this.setState((state) => ({
          formula: '',
          currInput: '',
        }))
      } else if (
        this.state.operations[this.state.operations.length - 1].match(/x|\//) &&
        e.target.value === '-'
      ) {
        this.setState((state) => ({
          currInput: e.target.value,
          formula: state.formula + e.target.value,
        }))
      } else if (
        this.state.operations[this.state.operations.length - 1].match(/-/) &&
        e.target.value === '-'
      ) {
        this.setState((state) => ({
          operations: state.operations
            .slice(0, state.operations.length - 1)
            .concat('+'),
          formula: state.formula + e.target.value,
        }))
      } else if (/\+|x|\/|-/.test(e.target.value)) {
        this.setState((state) => ({
          formula: state.formula + e.target.value,
          operations: state.operations
            .slice(0, state.operations.length - 1)
            .concat(e.target.value),
        }))
      } else {
        this.setState((state) => ({
          formula: state.formula + e.target.value,
          currInput: state.currInput + e.target.value,
        }))
      }
    } else if (this.state.input.length === 1 && this.state.currInput === '-') {
      this.setState((state) => ({
        currInput: '',
        formula: state.formula + e.target.value,
        operations: [e.target.value],
      }))
    } else {
      this.setState((state) => ({
        formula: state.formula + ' ' + e.target.value,
        operations: state.operations.concat(e.target.value),
        input: state.input.concat(Number(state.currInput)),
        currInput: '',
      }))
    }

    if (this.state.input.length > 0) {
      if (this.state.output !== 0 && !Number.isNaN(this.state.output)) {
        this.setState((state) => ({
          input: state.input.concat(state.output),
        }))
      }

      if (this.state.operations[this.state.operations.length - 1] === '=') {
        this.setState((state) => ({
          formula: String(state.output) + e.target.value,
          input: state.input.slice(state.input.length - 1),
          operations: [e.target.value],
        }))
      }
    }
  }

  answer = (e) => {
    if (this.state.operations[this.state.operations.length - 1] !== '=') {
      if (!Number.isNaN(this.state.output)) {
        this.setState((state) => ({
          formula: state.formula + ' ' + e.target.value,
          currInput: '',
          operations: state.operations.concat(e.target.value),
          display: true,
        }))
      } else {
        document.getElementById('display').value = 'Error: invalid expression'
      }
    }
  }

  clearScreen = () => {
    this.setState({
      formula: '',
      input: [],
      currInput: '',
      operations: [],
      output: 0,
      display: true,
    })
  }

  render() {
    const numberIDs = [
      'zero',
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
    ]
    const operatorIDs = ['add', 'subtract', 'multiply', 'divide']
    const operators = ['+', '-', 'x', '/']

    const numberPads = numberIDs.map((id, index) => {
      return (
        <button
          key={`${id}${index}`}
          className="numbers"
          type="button"
          id={id}
          value={index}
          onClick={this.input}
        >
          {index}
        </button>
      )
    })

    const operatorPads = operatorIDs.map((id, index) => {
      return (
        <button
          key={`${id}${index}`}
          id={id}
          className="operators"
          value={operators[index]}
          onClick={this.operate}
        >
          {operators[index]}
        </button>
      )
    })

    const { currInput, output, formula, display, screenHeight } = this.state

    return (
      <div id="container">
        {screenHeight >= 548 && (
          <div>
            <h1>A JavaScript Calculator</h1>
            <h3>
              <em>Immediate Execution Logic</em>
            </h3>
          </div>
        )}

        <p>
          <em>by Adeniran</em>
        </p>
        <p>
          <em>icon sourced from flaticon</em>
        </p>
        <div id="calculator">
          <div id="screen">
            <input id="formula" type="text" value={formula} readOnly />
            <input
              id="display"
              type="text"
              value={display ? output : currInput}
              readOnly
            />
          </div>
          {numberPads}
          {operatorPads}
          <button id="equals" value="=" onClick={this.answer}>
            =
          </button>
          <button id="decimal" value="." onClick={this.decimalize}>
            .
          </button>
          <button id="delete" onClick={this.delete}>
            del
          </button>
          <button id="clear" title="clear memory" onClick={this.clearScreen}>
            AC
          </button>
        </div>
      </div>
    )
  }
}

export default Calculator
