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
  type: { type: Seq.STRING, allowNull: false, defaultValue: 'Company' },
  name: { type: Seq.STRING, allowNull: false },
})

const Property = conn.define('property', {
  type: { type: Seq.STRING, allowNull: false, defaultValue: 'Property' },
  name: { type: Seq.STRING, allowNull: false },
  city: { type: Seq.STRING, allowNull: false },
  street: { type: Seq.STRING, allowNull: false },
  state: { type: Seq.STRING, allowNull: false },
  zip: { type: Seq.STRING, allowNull: false },
})

const Building = conn.define('building', {
  type: { type: Seq.STRING, allowNull: false, defaultValue: 'Building' },
  address: { type: Seq.STRING, allowNull: false },
})

const Unit = conn.define('unit', {
  type: { type: Seq.STRING, allowNull: false, defaultValue: 'Unit' },
  number: { type: Seq.INTEGER, allowNull: false },
})

const Lease = conn.define('unit', {
  type: { type: Seq.STRING, allowNull: false, defaultValue: 'Lease' },
  rent: { type: Seq.INTEGER, allowNull: false },
  startDate: { type: Seq.DATE, allowNull: false, defaultValue: Seq.NOW },
  endDate: { type: Seq.DATE, allowNull: true },
  nextRentDate: { type: Seq.DATE, allowNull: false, defaultValue: Seq.NOW },
})

const Tenant = conn.define('tenant', {
  type: { type: Seq.STRING, allowNull: false, defaultValue: 'Tenant' },
  firstName: {
    type: Seq.STRING, allowNull: false, unique: 'tenantNameComposite',
  },
  middleName: {
    type: Seq.STRING, allowNull: true, unique: 'tenantNameComposite',
  },
  lastName: {
    type: Seq.STRING, allowNull: false, unique: 'tenantNameComposite',
  },
  phone: { type: Seq.STRING, allowNull: false },
}, {
  getterMethods: {
    fullName: function _getFullName() {
      const first = this.getDataValue('firstName')
      const mid = this.getDataValue('middleName')
      const last = this.getDataValue('lastName')

      let full
      if (mid) {
        full = `${first} ${mid} ${last}`
      } else {
        full = `${first} ${last}`
      }
      return full
    },
  },
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
    times(6,
      () => company.createProperty({
        type: 'Property',
        name: faker.company.companyName(),
        city: faker.address.city(),
        state: faker.address.state(),
        street: faker.address.streetName(),
        zip: faker.address.zipCode(),
      }).then(property => {
        times(4,
          () => property.createBuilding({
            type: 'Building',
            address: faker.random.number({ min: 2000, max: 3500 }).toString(),
          }).then(building => {
            times(15,
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
