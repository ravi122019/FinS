export const ADDRESS_ATTR = ['address', 'city', 'district', 'state'];
export const NAME_ATTR = ['firstName', 'middleName', 'lastName'];
export class CommonUtils {
    public static formCompleteAddress(obj): void {
        obj.forEach(element => {
            ADDRESS_ATTR.forEach(attr => {
                if (element[attr]) {
                    element['fullAddress'] = `${element['fullAddress'] ? element['fullAddress'] + ', ' + element[attr] : element[attr]}`;
                }
            }); 
        });
    }

    public static formFullName(obj): void {
        obj.forEach(element => {
            NAME_ATTR.forEach(attr => {
                if (element[attr]) {
                    element['fullName'] = `${element['fullName'] ? element['fullName'] + ' ' + element[attr] : element[attr]}`;
                }
            }); 
        });
    }
}