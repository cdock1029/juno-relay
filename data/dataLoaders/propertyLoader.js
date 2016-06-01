import DataLoader from 'dataloader'

import { PropertyModel } from '../db'

// TODO: worry about this later.
// Check https://github.com/mickhansen/graphql-sequelize/issues/175
// for ideas integrating dataLoader with sequelize


const propertyLoader = new DataLoader(async (ids) => {
  const props = await PropertyModel.findAll({
    where: { id: ids },
  })
  return ids.map(id => props.find(p => p.id === id || new Error(`Row not found: ${id}`)))
})

export default propertyLoader
