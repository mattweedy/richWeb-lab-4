# Rich Web Lab 4 - Questions

## 1. Explain using code examples what is meant by props and state in React JS?
Props are properties, which are immutable components that are read-only and are passed down the application from parent to child. Props are extra pieces on information sent to a component that can be accessed by that component.

```js
// passing the prop
<NoteList notes="bacon, egg, cheese" />
```
Here `notes` is a prop being passed to the `<NoteList>` component

```js
function NoteList(props) {
    return <p>Buy : {props.notes}</p>;
}
```
This is how it looks when the `<NoteList>` component uses the props

State is managed by the component itself, but can still be passed as a prop from parent to child. When a change is made to a state, the component will be re-rendered
```js
class Counter extends React.Component {
    constructor(props) {
        super(props);
    this.state = { count: 0 };
  }

  increment = () => {
        this.setState({ count: this.state.count + 1 });
  };

  render() {
      return (
        <div>
            <p>Count: {this.state.count}</p>
            <button onClick={this.increment}>Increment</button>
        </div>
    );
  }
}
```
The state is an instance of React Component Class and is an object of a set of observable properties. Here the state object is initialised with a count property of 0. When the `<Button>` is pressed, the `increment()` method is called, which takes the state and increases it by 1.

Props get passed to components, states are managed within components like variables.

## 2. In functional programming, what does the term functor mean? Can you give an example in JavaScript?
A functor is a design pattern programmers can use to apply other functions to a value contained in an object or function, without changing the value inside of the functor itself.
```js
function StringFunctor(val) {
    this.val = val;
}

StringFunctor.prototype.map = function(f) {
    return new StringFunctor(f(this.val));
};

let helloString = new StringFunctor("Hello");
let toUpperCase = function(x) {
    return x.toUpperCase();
};
let newValue = value.map(toUpperCase);

// "HELLO"
console.log(newValue.val);
```
`StringFunctor` is a constructor function with a property called `val`. Then, `map` method is added to its prototype. It takes a function as an argument `f`. This returns a new `StringFunctor` that has had the function `f` applied to the original `val`, without altering the original `val`.

## 3. We have looked at three kinds of asynchronous programming mechanisms, namely callbacks, promises and streams. Mention one advantage and one disadvantage of each type.
| Mechanism | Advantage | Disadvantage |
| --- | --- | --- |
| Callbacks | Straightforward to implement and understand. | Can lead to "callback hell", making code hard to read and maintain. |
| Promises | Make it easier to handle asynchronous operations and avoid nested callbacks, leading to more readable code. Provide better error handling compared to callbacks. | Error handling can be tricky. If an error is not caught immediately, it might lead to an unhandled rejection which can be hard to debug. |
| Streams | Very good for handling large amounts of data. Allow data to be processed piece by piece as it arrives, leading to performance improvements. | Can be complex to understand and work with compared to callbacks and promises. Require a good understanding of buffers and flow control. |

## 4. With the aid of a diagram and example code, describe the Cascading Style Sheets (CSS) Box Model and show how it can be used to space DOM elements.
The CSS Box Model is broken down into 4 parts. These four parts are wrapped around every HTML element and allow developers to add things like a border around elements, define the margin of the element and add padding, to define the spacing of elements on a webpage. Here's how it's broken down:
- **Content**
    - element's content
- **Padding**
    - space added around content, inside border
- **Border**
    - border around content and padding
- **Margin**
    - space added around content, padding and border (invisible)

```css
div {
    width: 250px;
    padding: 12px;
    border: 2px solid black;
    margin: 10px;
}
```
Here we can see a `<div>` element with a defined width of `200px`. It has `12px` of padding around its content, but still in between the content and the border. The border is a solid black line `2px` thick. The margin property adds `10px` of space outside the element's border.

## 5. Detail how the browser loads and bootstraps a rich web applicaiton from an initial URL.
When a URL is entered into a browser, the IP address is resolved via DNS and sends a HTTP request to the server. A HTML file is sent in response by the server, which gets parsed by the browser. This parsing constructs the DOM (Document Object Model) tree. While the HTML is being parsed, the browser will request for any additional resources such as CSS or JavaScript files or images/videos. The browser then renders the page when all of these are loaded. For rich web apps, Javascript manipulates the DOM to make the site interactive.

The bootstrapping process for a rich web app is when it is initialising and preparing to run. The `<App>` component is rendered as a DOM element and is responsible for rendering the rest of the application. This involves fetching any data required, loading and rendering components and routing. Bootstrapping is the in-between for static resources from the server, and the interactive, dynamic frontend.