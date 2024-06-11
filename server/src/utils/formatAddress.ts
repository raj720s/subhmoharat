const computeFormattedAddress = (address: any) => {
    return `${address.street} ${address.city} ${address.pin}`;
};

export default computeFormattedAddress