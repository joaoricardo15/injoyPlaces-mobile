import { Pipe, PipeTransform } from '@angular/core'
import { iAddress } from '../interfaces/injoyApi.interface';

@Pipe({
  name: 'addressComplete'
})
export class AddressPipe implements PipeTransform {
  transform(address: iAddress): string {
    return address.street + ' ' + 
      address.number + 
      (address.complement ? '/' + address.complement : '') + ', ' +
      address.suburb + ', ' +
      address.city + ', ' +
      address.state + ', ' +
      address.country
  }
}