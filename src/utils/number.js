export const currency = num => {
  return 'Rp.' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
