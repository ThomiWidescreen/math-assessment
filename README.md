
# **Technical Assessment: Mathematical Expression Evaluator**

## Clarification

The Parser wasn't built using LLM, but the documentation and tests were.

## **Overview**
This technical assessment involves building an API that evaluates mathematical expressions using a **Recursive Descent Parser**. The API receives a mathematical expression in infix notation, parses it, and returns the result.

### **Features**
- Evaluates basic mathematical operations: addition, subtraction, multiplication, division.
- Handles operator precedence (multiplication and division are evaluated before addition and subtraction).
- Supports parentheses for grouping expressions.

## **Setup Instructions**

### **Prerequisites**
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

To verify that you have Node.js and npm installed:
```bash
node -v
npm -v
```

### **Steps to Run the Project**
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install Dependencies**:
   Run the following in your project directory:
   ```bash
   npm install
   ```

3. **Start the Server**:
   To run the backend, execute:
   ```bash
   npm start
   ```
   The server will be available at `http://localhost:4500`.

### **How to Use the API**
- The API exposes a single POST endpoint to evaluate mathematical expressions:
  ```
  POST /evaluate
  ```
  The body of the request should contain a JSON object with the key `expression`, for example:
  ```json
  {
    "expression": "2 + 3 * (4 - 2)"
  }
  ```

- The response will contain the result of the evaluation:
  ```json
  {
    "result": 8
  }
  ```

- Invalid expressions will return an error message:
  ```json
  {
    "error": "Invalid expression"
  }
  ```

## **Testing the API**

### **Backend Tests**
We use **Jest** and **Supertest** to test the backend.

1. **Run Tests**:
   To run the tests, execute:
   ```bash
   npm test
   ```
   This will run all the tests for the API, ensuring the correct evaluation of expressions and error handling.

## **Algorithm Solution**

### **Recursive Descent Parser**
A **Recursive Descent Parser** is a top-down parser that builds a parse tree by recursively applying parsing functions for each grammar rule. Each function handles a specific rule in the grammar, allowing the parser to process the expression step-by-step.

#### **Steps of the Algorithm**:
1. **Tokenization**: The expression is tokenized into meaningful components (numbers, operators, and parentheses).
   
2. **Parsing Grammar Rules**: The parser has specific functions to handle different grammar rules:
   - **Expression**: The main function to handle addition and subtraction.
   - **Term**: Handles multiplication and division.
   - **Factor**: Handles numbers and parentheses.

   These functions recursively break down the expression according to operator precedence and parentheses.

3. **Operator Precedence**: 
   - Addition and subtraction are handled at the `Expression` level.
   - Multiplication and division are handled at the `Term` level, ensuring that they are evaluated before addition and subtraction.

4. **Parentheses Handling**: Parentheses are handled by the `Factor` function, which allows expressions inside parentheses to be evaluated first, overriding normal precedence.

5. **Evaluation**: Once the expression is parsed, the final result is computed by recursively evaluating the parsed structure.

#### **Why This Algorithm?**
- **Recursive Descent Parsing** is simple to implement and ideal for arithmetic expressions due to its natural fit with the structure of mathematical grammar.
- It allows us to easily manage operator precedence and parentheses by creating separate functions for different levels of precedence.
- Unlike other parsing algorithms, Recursive Descent Parsing uses direct recursion to process each part of the expression, making it intuitive and efficient for this type of task.

### **Key Functions in the Parser**:
- `Expression()`: Handles addition and subtraction.
- `Term()`: Handles multiplication and division.
- `Factor()`: Handles numbers and parentheses.
- `eat(tokenType)`: Consumes the current token and moves to the next token.

## **Conclusion**
This project demonstrates how to build a simple **Express API** that evaluates mathematical expressions using a **Recursive Descent Parser**. By implementing a top-down parsing approach, we can easily handle operator precedence, parentheses, and different mathematical operations.

With this API, you can test various expressions, and the algorithm will process them accurately while maintaining the correct order of operations.
