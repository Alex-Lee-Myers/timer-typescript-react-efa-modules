import React from 'react';

type ClockState = {
    time: Date
};

type AcceptedProps = {
    testProp: string,
    optionalProp?: string
};

class Clock extends React.Component<AcceptedProps, ClockState> {
    constructor(props: AcceptedProps) {
        super(props)
        this.state = {
            time: new Date()
        }
    }

    tick() {
        this.setState({
            time: new Date()
        })
    };

    // componentWillMount() {
    // this.tick();
    // };

    componentDidMount() {
        setInterval(() => this.tick(), 1000);
    };

    render() {
        return (
            <div>
                <h1>{this.state.time.toLocaleTimeString()}</h1>
                {/* <p>{this.props.testProp}</p>
 <p>{this.props.optionalProp}</p> */}
            </div>
        )
    }
}

export default Clock;

//! Clock.TSX
//? Before we dive into creating our new component, let's create both a 'components' folder, as well as an 'assets' folder in our 'src' folder. Once the following folders have been created, you can create a new file that will be housed in the 'components' folder called 'Clock.tsx'. Your folder structure should match the image below:

//! Structuring out Clock.tsx
//? Our Clock.tsx component is going to be a class component (or stateful component) that will eventually display the current time, and update every second. Let's start out with the basic structure before adding logic and implementing TypeScript.
//* Example:

// import React from 'react';

// class Clock extends React.Component {
//     constructor(props){
//         super(props)
//     }

//     render(){
//         return(
//             <div>
//
//             </div>
//         )
//     }
// }

// export default Clock;

//? Now that our Clock component has been structured out, let's make sure that we import it in App.tsx.

//! TypeScript - Type Aliases
//? I know I previously mentioned that I would cover TypeScript interfaces with you when I went over creating a React application that uses TypeScript. After doing a bit more research, it seems that Type Aliases are the more preferred (and useful) of the two (type aliases, interfaces) within a React application.

//? Simply put, Type Aliases create a new name for a type.

//? Here's a nice article explaining the differences between interfaces and Type Aliases, and why we would want to use the Type Alias over an interface. The article linked below is a 3-minute read, so read through it before moving on!

//? https://medium.com/@koss_lebedev/type-aliases-vs-interfaces-in-typescript-based-react-apps-e77c9a1d5fd0 (Links to an external site.)

//? The main takeaway from the above article is that Type Aliases allow us to use Intersection Types. An intersection type combines multiple types into one. This allows you to add together existing types to get a single type that has all the features you need.

//? It also allows us to use the Union type (which is closely related to intersection types) so we can assign multiple types to a variable, parameter, return value, etc.  They also allow us to use tuples and other primitive data types as well.

//? Now that we've had a short introduction to Type Aliases, let's add one to our Clock.tsx component! The Type Alias we add will be used to house the state of our Clock component.

//? Under the import of React (line 1), add the following code:
//* Example:
// type ClockState = {
//         time: Date
//     }

//? Here we are creating a new type called 'ClockState' that houses a single property of 'time', which has an assigned datatype of Date (Date is a type that is built into TypeScript, just like strings, numbers, booleans, unions, tuples, etc). Our Type Alias of ClockState now houses the state of our application, but we now need to pass it into our Clock component so it has access to it.

//? To pass our ClockState Type Alias into our Clock component, we need to do the following (we'll break down what's happening afterward!)
//* Example:
// import React from 'react';

// class Clock extends React.Component<{}, ClockState> { // <<<<------------------ CHANGE HERE
//     constructor(props){
//         super(props)
//     }

//     render(){
//         return(
//             <div>
//
//             </div>
//         )
//     }
// }

// export default Clock;

//! Type Aliases
//? TypeAliases allow us to use Intersecton Types. An Intersection Type combines multiple types into one. This allows you to add together existing types to get a single type that hasll the features you need.

//! ClockState React.Component Explanations:
//? Inside the carrots is where we pass in props to our component, as well as where we pass in the state. If we're not passing in any props, and we're not passing in any state, the default values passed into the component are empty objects, which would look like this:
//* Example: class Clock extends React.Component<{}, {}>
//? NOTE: props are always passed to the component first, followed by state.
//* Example: class Clock extends React.Component<props, state>
//? So since we aren't currently passing any props to our component, we have the default empty object in the place of props, denoting that we are currently not passing in any props to the Clock component. We then are passing in our ClockState. Because we passed our Type Alias of ClockState into our Clock component, we now have enforced typings:
//? - When accessing this.state
//? - When using this.setState()

//! Updating State
//? Let's add a method to our Clock component that will update our state, followed by a couple of lifecycle methods!
//? Under the constructor method, write the following code:
//* Example:
//* tick() {
//*     this.setState({
//*            time: new Date()
//*         })
//*    };

//! Lifecycle Methods
//? We now want to add a lifecycle method that will call our tick() method (in turn grabbing the current date) if the component will mount, as well as updating the date every second after the component successfully mounted. The lifecycle methods we'll use here are componentWillMount() and componentDidMount().
//? Under the tick() method, write the following code:
//* Example:
//* componentWillMount() {
//*         this.tick();
//*    };
//*
//*   componentDidMount() {
//*        setInterval(() => this.tick(), 1000);
//*   };
//? The componentWillMount() lifecycle method is initializing our state before the component mounts, and the componentDidMount() lifecycle method is calling a setInterval() method that will update our state every second.

//! Adding an <h1> tag in the return {} of our render() method
//? With all of our logic now in place, we want to add an <h1> tag in the return of our Clock component that will show the current time. Inside of the empty <div> tag, add the following code:
//* Example:
//* <h1>{this.state.time.toLocaleTimeString()}</h1>
//? Here we are simply grabbing our state property of time, and calling the toLocalTimeString() method on it. The toLocalTimeString() method returns a string representing the time portion of the given Date.

//! Finished Code:
//? Notice that I have this.state = { time: new Date() } commented out in the constructor method. Initializing your state in the constructor method will prevent you from having to initialize it in a lifecycle method as we did above. Since our Type Alias of ClockState just houses a property of time that has a data type of Date, our state actually hasn't been initialized until we call the setState() method like we did in the componentWillMount() lifecycle method.
//? If you include this.state = { time: Date } in your constructor method (so your component will be initialized with a state), you can comment out the componentWillMount() lifecycle method since we no longer need to set the state of our component during the mounting phases - and everything should work the same!