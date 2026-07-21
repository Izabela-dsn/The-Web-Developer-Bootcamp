## Sessions

Sessions are a server-side data store that is used to make HTTP stateful.
Store the data on the server-side and send the browser a cookie that can be used to retrieve the data.

cookies and sessions work together
- cookies have a maximum size
- session don't replace the database
- data store (various data with and id associated) -> cookie tells that the session of the client is of ID 4
- client -> cookie -> server(with data store)

Used for production environment
Redis is not a database that is used to long-term information

### Flash 

A way in the session to display a message to the client
is a middleware
npm i connect-flash