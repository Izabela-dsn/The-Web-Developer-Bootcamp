Anotations along of the project:

How we structed data in mongo:

one to few - relationship
e.g: one user have different addresses
{
    username: "Leon",
    addresses: [
        {
            street: "my house",
            city: "my city",
            country: "my country"
        }
    ]
}

one to many - relationship - medium amount of data 
store data separetely, but then store references to document ID's
e.g: a produce of a farm

Farm
{
    farmName: "ex",
    local: "maaps",
    products: [
        ObjectID('1234'),
        ObjectID('5678'),
        ObjectID('9087')
        products: [{type: type_of_data (e.g Schema.Types.ObjectId), ref: model_to_use (e.g 'Product')}]
    ]
}
Product
{
    _id: '1234',
    name: "corn",
    price: 3.4,
    season: 'spring'
}

Method Populate
Mogoose is ganna bring the objects inside the products that refers to the objectId of each product inside the table Product
e.g: Farm.findOne({name of the farm}).populate('products')


one to bajillions (its a joke) -  much more information
store a reference to the parent on the child document
e.g: tweets, storing data about the user in a twitter
{
    txt: 'lol',
    taags: ['fun','funny', 'lol'],
    user: ObjectId('12345')
}

Some information is and can be duplicated - is for mongo only

