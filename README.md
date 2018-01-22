# team-snap-api

API for Team Snap senorcoders app 

## Getting Started
API development with sails


### Common Endpoints

All the models in the api have the following endpoints for create, destroy, update, find all, find one, search, populate


GET ALL => GET				http://server_address/api/:model_name
CREATE  => POST 			http://server_address/api/:model_name

GET ONE => GET				http://server_address/api/:model_name/:id
UPDATE  => PUT				http://server_address/api/:model_name/:id
DELETE  => DELETE 		http://server_address/api/:model_name/:id

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
	UxEvent
```

### Custom endpoints:

#### Users
```


```
##### User Params
```

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
