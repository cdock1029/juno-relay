import Seq from 'sequelize'
import times from 'lodash.times'
import faker from 'faker'
import moment from 'moment'
const config = require('./config.json')

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// TODO configure these according to environment
const conn = new Seq(
  'relay', // db
  config.username, // username
  config.password, // pw
  { dialect: 'postgres', host: 'localhost' }
)

export const CompanyModel = conn.define('company', {
  type: { type: Seq.STRING, allowNull: false, defaultValue: 'Company' },
  name: { type: Seq.STRING, allowNull: false },
})

export const PropertyModel = conn.define('property', {
  type: { type: Seq.STRING, allowNull: false, defaultValue: 'Property' },
  name: { type: Seq.STRING, allowNull: false },
  city: { type: Seq.STRING, allowNull: false },
  street: { type: Seq.STRING, allowNull: false },
  state: { type: Seq.STRING, allowNull: false },
  zip: { type: Seq.STRING, allowNull: false },
})

export const Building = conn.define('building', {
  type: { type: Seq.STRING, allowNull: false, defaultValue: 'Building' },
  address: { type: Seq.STRING, allowNull: false },
})

export const Unit = conn.define('unit', {
  type: { type: Seq.STRING, allowNull: false, defaultValue: 'Unit' },
  number: { type: Seq.INTEGER, allowNull: false },
})

// TODO can default dates be calculated?
// end leases, create new when renewing? or extend them?
export const Lease = conn.define('lease', {
  type: { type: Seq.STRING, allowNull: false, defaultValue: 'Lease' },
  rent: { type: Seq.INTEGER, allowNull: false },
  startDate: { type: Seq.DATE, allowNull: false, defaultValue: Seq.NOW },
  endDate: { type: Seq.DATE, allowNull: false, defaultValue: Seq.NOW },
  nextRentDate: { type: Seq.DATE, allowNull: false, defaultValue: Seq.NOW },
})

export const Tenant = conn.define('tenant', {
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
  email: { type: Seq.STRING, allowNull: false },
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

export const TransactionType = conn.define('transaction_type', {
  type: { type: Seq.STRING, allowNull: false, defaultValue: 'TransactionType' },
  name: {
    type: Seq.STRING,
    primaryKey: true,
    set: val => {
      this.setDataValue('name', val.toUpperCase())
    },
  },
  defaultAmount: { type: Seq.INTEGER, allowNull: true },
})

export const Transaction = conn.define('transaction', {
  type: { type: Seq.STRING, allowNull: false, defaultValue: 'Transaction' },
  amount: { type: Seq.INTEGER, allowNull: false },
}, {
  indexes: [
    {
      fields: ['leaseId', 'createdAt'],
    },
  ],
})

CompanyModel.hasMany(PropertyModel)
PropertyModel.belongsTo(CompanyModel)
PropertyModel.hasMany(Building)
Building.belongsTo(PropertyModel)
Building.hasMany(Unit)
Unit.belongsTo(Building)

Unit.hasMany(Lease)
Lease.belongsTo(Unit)

Lease.belongsToMany(Tenant, { through: 'LeaseTenants' })
Tenant.belongsToMany(Lease, { through: 'LeaseTenants' })

Lease.hasMany(Transaction)
Transaction.belongsTo(Lease)
Transaction.belongsTo(TransactionType)

const generate = false
if (generate) {
  conn.sync({ force: true }).then(() => {
    CompanyModel.create({
      type: 'Company',
      name: 'Vandelay Industries',
    }).then(company => {
      times(6,
        () => company.createProperty({
          name: faker.company.companyName(),
          city: faker.address.city(),
          state: faker.address.state(),
          street: faker.address.streetName(),
          zip: faker.address.zipCode(),
        }).then(property => {
          times(4,
            () => property.createBuilding({
              address: faker.random.number({ min: 2000, max: 3500 }).toString(),
            }).then(building => {
              times(15,
                () => building.createUnit({
                  number: faker.random.number({ min: 100, max: 200 }),
                }).then(unit => {
                  times(3, () => {
                    const rand = getRandomIntInclusive(3, 24)
                    const m1 = moment().subtract(rand, 'months')
                    const m2 = m1.clone().add(1, 'years')
                    unit.createLease({
                      rent: faker.random.number({ min: 50000, max: 75000, precision: 5000 }),
                      startDate: m1.toDate(),
                      endDate: m2.toDate(),
                    }).then(lease => {
                      const tenantCount = getRandomIntInclusive(1, 2)
                      times(tenantCount, () => {
                        const fn = faker.name.firstName()
                        const ln = faker.name.lastName()
                        lease.createTenant({
                          firstName: fn,
                          middleName: faker.name.firstName(),
                          lastName: ln,
                          phone: faker.phone.phoneNumber('###-###-####'),
                          email: faker.internet.email(fn, ln, 'gmail.com'),
                        })
                      })
                    })
                  })
                })
              )
            })
          )
        })
      )
    })
  })
}

export default conn
