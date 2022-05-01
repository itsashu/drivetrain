# Drivetrain Assignment By Kumar Ashutosh

## Instructions to SetUp this project on local system

### Make sure node version 14.17.0 or later is installed on the local system.

### Take the lastest of this repository or clone it.

### Navigate to drivetrain-app

### run `yarn install` to install dependencies

### run `yarn start` to start locally / serve it on localhost

### This project is build using React and it was setup using `npx create-react-app` script

### `@octokit/core` package was used to use and authorize the github's endpoint for getting list of users (public api)

## `Local state` was used to store the result as it is the fastest persistent storage / state compared to context or redux store. As redux store needs dispatcher, actions and reducers this may be an overhead in this scenario.

## Again `local state` was used to store user inputs to have controlled input fields.

## `Debounce` for 500ms was used so that a new api request is not made for every input change rather it stalls for 500ms and then makes api call.

## Also it checks, if the input remains same within those interval of 500 ms so that no new requests are made with similar query.

## The response requested is `paginated` with 12 results per page as of now which can be increased and is configurable.

## Only on user scrolling down demanding for more results further result pages of 12 results each are requested so that the does not over load with massive results on initial load but rather have `progressive` loading. It loads page by page as per demand.

## The corresponding results fetched are now stored and concatinated to existing result.

### This reduces the no api calls and network load.

### Saves expensive resource utilized for these requests.

### Makes the app more performant.

### Less error prone.

Api call/requests are made only when user types and the typing stalls for 500ms.
