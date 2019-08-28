import { Pipe, PipeTransform } from '@angular/core'
import { iAddress } from '../interfaces/injoyApi.interface';

@Pipe({
  name: 'addressComplete'
})
export class AddressCompletePipe implements PipeTransform {
  transform(address: iAddress): string {
    return (address.street ? (address.street + ' ') : '') + 
           (address.number ? (address.number) : '') + 
             (address.number && address.complement ? ('/' + address.complement) : '') + ', ' +
               (address.suburb ? (address.suburb + ', ') : '') +
                 (address.city ? (address.city + ', ') : '') +
                   (address.state ? (address.state + ', ') : '') +
                     (address.country ? address.country : '' )
  }
}

@Pipe({
  name: 'addressShort'
})
export class AddressShortPipe implements PipeTransform {
  transform(address: iAddress): string {
    return  (address.suburb ? address.suburb :
              (address.city ? address.city : 
                (address.state ? address.state : 
                  (address.country ? address.country : ''))))
  }
}