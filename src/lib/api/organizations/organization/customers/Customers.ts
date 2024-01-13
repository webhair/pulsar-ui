import { Customer } from '@/abstractions/Customer';
import { Organization } from '@/abstractions/Organization';
import { Endpoint } from '@/lib/Endpoint';

export class Customers extends Endpoint {
  
  constructor(
    private organizationId: Organization['id'],
    protected client: Endpoint['client']
  ) {
    super(client);
  }

  get url() {
    return `organizations/${this.organizationId}/customers`;
  }

  load() {
    return this
      .client
      .get<{ organizations: Customer[] }>(this.at(''))
      .then(res => res.data)
  }

  create(req: Omit<Customer, 'id'>) {
    return this
      .client
      .post(this.at(''), req)
      .then(res => res.data)
  }
}