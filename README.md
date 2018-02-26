# team-snap-api

API for Team Snap senorcoders app 

## Getting Started
API development with sails


### Common Endpoints

All the models in the api have the following endpoints for create, destroy, update, find all, find one, search, populate

```
GET ALL => GET				http://server_address/api/:model_name
CREATE  => POST 			http://server_address/api/:model_name

GET ONE => GET				http://server_address/api/:model_name/:id
UPDATE  => PUT				http://server_address/api/:model_name/:id
DELETE  => DELETE 		http://server_address/api/:model_name/:id
```
####Search
SEARCH 	=> GET				http://server_address/api/:model_name?where={"name":{"contains":"theodore"}}

the api allow the followin criterias
```
    '<' / 'lessThan'
    '<=' / 'lessThanOrEqual'
    '>' / 'greaterThan'
    '>=' / 'greaterThanOrEqual'
    '!' / 'not'
    'like'
    'contains'
    'startsWith'
    'endsWith'
```
####Sort and Limit
In your GET petition you can ask the api for sort and/or limit the results
```
GET ALL => GET				http://server_address/api/:model_name?createdAt DESC&limit=30
```

### Current Models

```
	Roles
	User
	Devices
	Fields
	FieldType
	Leagues
	Managers
	Parents
	PlayerRegistration
	Players
	Registration
	RegistrationFields
	Teams
	Games
	LocationGame
	OpponentGame
	UxEvent
```

### Custom endpoints:


#### Users
```
POST /user/team  //create user using a team created or create a new
GET /verification/:id/:code for verification of email
POST /login //for login of user
GET /event/team/:date/:id //get all events for id team, date is now
GET /team/:rolename/:id  //get team for role and id user
GET /contacts/user/:id  //get all info contacts for id user
POST /user/family  //create user family parameters firsName, lastName, email not send password, password default is none in family
POST /user/player  //create user player after of send to endpoint for save player info
```
##### User Params
```
username
firstName
lastName
email
password
newTeam  //true or false
teamName  //if team is new
teamID //if not is team new
```

### Teams
GET http://server_address/api/team/:id get all info player of team and roster

### Games
POST http://server_address/api/game save a new game sending all params

### Param for new game
```
-team //is id of team
-dateTime //format MM/DD/YYYY hh:mm:ss a
-attendenceTraking //Boolean true or false
-notifyTeam //Boolean true or false
-optionalInfo //json with fields and values

//for location of game
-locationName
-address
-link
-detail

//for data of opponent
-opponentName
-person
-phone
-email
```

### Prerequisites

```
sails js global

```

### Installing
Just run

```
npm install sails -g
npm install
```

### Run

```
sails lift
```
