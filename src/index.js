//JSX is a hybrid of javascript and HTML.  That is the language this file is written in.  Need to import a package to write it though.
//the first react is the name we are calling it and the second is the package we installed to get it.
import React from 'react';

import ReactDOM from 'react-dom';

//here we can write straight HTML into the javascript
ReactDOM.render(
    <h1>Hello, World!</h1>, 
    document.getElementById("app") //using "app" because this is the div we created in the html file where we want the application to begin
);

