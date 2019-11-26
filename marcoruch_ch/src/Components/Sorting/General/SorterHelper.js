const GetStateKeyByNumber = (number, CurrentNumberFrom, CurrentNumberTo) => {
    switch (number) {
        case CurrentNumberFrom:
            return 'activeFrom';
        case CurrentNumberTo:
            return 'activeTo';
        default:
            return '';
    }
}

export default GetStateKeyByNumber;