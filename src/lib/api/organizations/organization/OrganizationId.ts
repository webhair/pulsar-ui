import { Organization } from '@/abstractions/Organization';
import { Endpoint } from '@/lib/Endpoint';

export class OrganizationId extends Endpoint {

  constructor(
    private id: Organization['id'],
    protected client: Endpoint['client']
  ) {
    super(client);
  }

  get url() {
    return `organization/${this.id}`;
  }
}