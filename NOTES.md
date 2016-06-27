### Lease
Through-table that associates `Tenant` to the `Unit` they are renting. Need to figure out how to add another parameter to the primary key, besides:
- Not using "through" table, but Lease entity basically is that. Difference is not limited to 1 tenantId (like primaryKey: unitId, tenantId)
Think about validations where for a given unitId, can't have overlapping Leases when creating.
(startDate, endDate)


- fix database config using environment specific configs
