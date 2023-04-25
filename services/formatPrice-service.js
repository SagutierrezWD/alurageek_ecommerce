export const formatPrice = (value) => {
    let format = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    })
    return format.format(value);
}