This project is a work-in-progress, which I've started for the purpose of brushing up on my React.

Below you will find information on the application's design and current setup, as well as a brief explanation of the coding conventions used.

# Quickstart

With npm and Node installed, use the following to debug the project:

```sh
npm install -g webpack
npm install -g nodemon
npm install
npm run serve
```

# Design

This project is a simple to-do list application, which categorises items in the following way:

 * A user has a collection of Task Lists.
 * Each Task List has a title and a list of Tasks.
 * Each Task has a title, a description and a completion status.
 * Any number of Notes can be attached to a task.

The splash screen will consist of a login and register page. The main page will consist of the following columns, from left to right:

 * A menu for viewing, adding, removing, renaming and selecting Task Lists.
 * A menu for viewing, adding, removing and selecting Tasks from the current Task List.
 * A menu for displaying the contents of the selected Task, as well as any Notes that belong to it.

# Debugging

This project uses hot module reloading for React components, as well as Nodemon to monitor for back-end changes while running. The *serve* script will start the server with Nodemon.

Upon running, the back-end will generate a *cache.json* file, which will store the user logins and all other application data.

# Conventions used
## Components

An independent component with no styling is placed directly in it's own file. A component that has children is placed in a separate foler and stored in an index.js file, which the child components reside next to:

```sh
nested-todo-list/
    IndependentComponent.js
    componentWithChildren/
        index.js --houses ComponentWithChildren
        ChildComponentA.js
        ChildComponentB.js
```

In the above example, *componentWithChildren/index.js* will return a component named *ComponentWithChildren*, which uses *ChildComponentA* and *ChildComponentB*.

Other components that import 'componentWithChildren/' will only be able to access *ComponentWithChildren*, restricting the scope of both child components.

## CSS

This application has been styled using the [styled-components](https://www.styled-components.com/) library.

All styling information for a given component will be stored in a *styles.js* file, adjacent to the *index.js* file:

```sh
nested-todo-list/
    IndependentComponent.js
    componentWithChildren/
        index.js --houses ComponentWithChildren
        styles.js --contains styling for ComponentWithChildren
        ChildComponentA.js
        childComponentB/
            index.js --houses ChildComponentB
            styles.js --contains styling for ChildComponentB
```

# Unit tests

All unit tests written for the action creators and reducers thus far can be found under the *__tests__* directory. Tests can be executed with [jest](https://jestjs.io/), by running the tool from the root directory.