export class AddressData {
    id: string;
    addressJobId: string;
    userName: string;
    address1: string;
    address2: string;
    postalCode: string;
    isRefined: boolean;

    constructor(id: string, addressJobId: string, userName: string, address1: string, address2: string, postalCode: string, isRefined: boolean) {
        this.id = id;
        this.addressJobId = addressJobId;
        this.userName = userName;
        this.address1 = address1;
        this.address2 = address2;
        this.postalCode = postalCode;
        this.isRefined = isRefined;
    }
}