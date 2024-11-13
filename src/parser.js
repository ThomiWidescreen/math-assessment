const TokenTypes = {
    NUMBER: 'NUMBER',
    IDENTIFIER: 'IDENTIFIER',
    ADDITION: '+',
    SUBTRACTION: '-',
    MULTIPLICATION: '*',
    DIVISION: '/',
    PARENTHESIS_LEFT: '(',
    PARENTHESIS_RIGHT: ')'
  };
  
  const TokenSpec = [
    [/^\s+/, null],
    [/^(?:\d+(?:\.\d*)?|\.\d+)/, TokenTypes.NUMBER],
    [/^[a-z]+/, TokenTypes.IDENTIFIER],
    [/^\+/, TokenTypes.ADDITION],
    [/^\-/, TokenTypes.SUBTRACTION],
    [/^\*/, TokenTypes.MULTIPLICATION],
    [/^\//, TokenTypes.DIVISION],
    [/^\(/, TokenTypes.PARENTHESIS_LEFT],
    [/^\)/, TokenTypes.PARENTHESIS_RIGHT]
  ];
  
  class Tokenizer {
    constructor(input) {
      this.input = input;
      this.cursor = 0;
    }
  
    hasMoreTokens() {
      return this.cursor < this.input.length;
    }
  
    match(regex, inputSlice) {
      const matched = regex.exec(inputSlice);
      if (matched === null) {
        return null;
      }
  
      this.cursor += matched[0].length;
      return matched[0];
    }
  
    getNextToken() {
      if (!this.hasMoreTokens()) {
        return null;
      }
  
      const inputSlice = this.input.slice(this.cursor);
  
      for (let [regex, type] of TokenSpec) {
        const tokenValue = this.match(regex, inputSlice);
  
        if (tokenValue === null) {
          continue;
        }
  
        if (type === null) {
          return this.getNextToken();
        }
  
        return {
          type,
          value: tokenValue,
        };
      }
  
      throw new SyntaxError(`Unexpected token: "${inputSlice[0]}"`);
    }
  }

class Parser {
  parse(input) {
    this.input = input
    this.tokenizer = new Tokenizer(input)
    this.lookahead = this.tokenizer.getNextToken()

    return this.Expression()
  }

  // Expect a token, consume/eat it, and move to the next token
  eat(tokenType) {
    const token = this.lookahead

    if (token == null || token.type !== tokenType) {
      throw new SyntaxError(`Unexpected token`)
    }

    // Advance to the next token
    this.lookahead = this.tokenizer.getNextToken()

    return token
  }

  //This function handle addition and subtraction 
  Expression() {
    let left = this.Term()

    while (
      this.lookahead?.type === TokenTypes.ADDITION ||
      this.lookahead?.type === TokenTypes.SUBTRACTION
    ) {
      if (this.lookahead?.type === TokenTypes.ADDITION) {
        this.eat(TokenTypes.ADDITION)
        const right = this.Term()
        left = left + right
      } else {
        this.eat(TokenTypes.SUBTRACTION)
        const right = this.Term()
        left = left - right
      }
    }

    return left
  }

  //This function handle multiplications and divisions 
  Term() {
    let left = this.Primary()

    while (
      this.lookahead?.type === TokenTypes.MULTIPLICATION ||
      this.lookahead?.type === TokenTypes.DIVISION
    ) {
      if (this.lookahead?.type === TokenTypes.MULTIPLICATION) {
        this.eat(TokenTypes.MULTIPLICATION)
        const right = this.Primary()
        left = left * right
      } else {
        this.eat(TokenTypes.DIVISION)
        const right = this.Primary()
        left = left / right
      }
    }

    return left
  }

  //Primary type of token, number
  Primary() {
    if (this.lookahead.type === TokenTypes.PARENTHESIS_LEFT) {
        return this.ParenthesizedExpression()
      }
      
    const token = this.eat(TokenTypes.NUMBER)
    return Number(token.value)
  }

  ParenthesizedExpression() {
    this.eat(TokenTypes.PARENTHESIS_LEFT)
    const expression = this.Expression()
    this.eat(TokenTypes.PARENTHESIS_RIGHT)

    return expression
  }
}

module.exports = Parser
