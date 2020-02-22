# Arash UI

This project was made with [React](https://reactjs.org) by [Mohamadhassan Ebrahimi](https://github.com/Mohamadhassan98), [Faezee Aghabozorgi](https://github.com/faezee77) and [Zahra Ghaedi](https://github.com/behnaz987) and actively maintained by [Shaina co](https://shainaco.com).

## requirements and dependencies

For the list of all requirement libraries see [package.json](./package.json).

## commands

In the project directory, you can run:

### `npm install`

Install all dependencies, written in `package.json` file.

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## urls

To see a full list of URLs, see [Constants.js](./src/Constants.js).

Note: Change `help` constant in `ServerURLs`, as it's not a valid address currently!

Note: Any changes in server's SOA urls should be reflected to `Constants.js -> ServerURLs`.

To change any of front-end URLs, simply change `Constants.js -> URLs`. 
Note that these changes should be consistent with the routing table provided in [index.js](./src/index.js).

## important settings

All these settings are availabe in [package.json](./package.json).

`proxy`: used to bypass CORS, should be changed to actual server's url