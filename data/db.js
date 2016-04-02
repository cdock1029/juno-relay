import Seq from 'sequelize'
import times from 'lodash.times'
import faker from 'faker'

const conn = new Seq(
  'relay', // db
  'postgres', // username
  'falcon14', // pw
  { dialect: 'postgres', host: 'localhost' }
)

const Company = conn.define('company', {
  type: { type: Seq.STRING, allowNull: false },
  name: { type: Seq.STRING, allowNull: false },
})

const Property = conn.define('property', {
  type: { type: Seq.STRING, allowNull: false },
  name: { type: Seq.STRING, allowNull: false },
  city: { type: Seq.STRING, allowNull: false },
  street: { type: Seq.STRING, allowNull: false },
  state: { type: Seq.STRING, allowNull: false },
  zip: { type: Seq.STRING, allowNull: false },
})

const Building = conn.define('building', {
  type: { type: Seq.STRING, allowNull: false },
  address: { type: Seq.STRING, allowNull: false },
})

const Unit = conn.define('unit', {
  type: { type: Seq.STRING, allowNull: false },
  number: { type: Seq.INTEGER, allowNull: false },
})

Company.hasMany(Property)
Property.belongsTo(Company)
Property.hasMany(Building)
Building.belongsTo(Property)
Building.hasMany(Unit)
Unit.belongsTo(Building)

/* conn.sync({ force: true }).then(() => {
  Company.create({
    type: 'Company',
    name: 'Vandelay Industries',
  }).then(company => {
    times(4,
      () => company.createProperty({
        type: 'Property',
        name: faker.company.companyName(),
        city: faker.address.city(),
        state: faker.address.state(),
        street: faker.address.streetName(),
        zip: faker.address.zipCode(),
      }).then(property => {
        times(2,
          () => property.createBuilding({
            type: 'Building',
            address: faker.random.number({ min: 2000, max: 3500 }).toString(),
          }).then(building => {
            times(10,
              () => building.createUnit({
                type: 'Unit',
                number: faker.random.number({ min: 100, max: 200 }),
              })
            )
          })
        )
      })
    )
  })
}) */

export default conn
