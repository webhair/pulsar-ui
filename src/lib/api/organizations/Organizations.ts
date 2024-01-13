import { Organization } from '@/abstractions/Organization';
import { Endpoint } from '@/lib/Endpoint';
import { OrganizationId } from './organization/OrganizationId';

export class Organizations extends Endpoint {
  get url() {
    return 'organizations';
  }

  id(id: Organization['id']) {
    return new OrganizationId(id, this.client);
  }

  load() {
    return this
      .client
      .get<{ organizations: Organization[] }>(this.at(''))
      .then(res => res.data)
  }

  create(req: Omit<Organization, 'id'>) {
    return this
      .client
      .post(this.at(''), req)
      .then(res => res.data)
  }
}