export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
// mengubah angka x menjadi string
// metode pengganti 1000 menjadi 1,000 