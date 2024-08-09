  export const handleformat = {
    formatDate (Isdate){
        const date = new Date(Isdate);
        const day = String(date.getDate()).padStart(2, "0");
        const year = String(date.getFullYear()).slice();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        return `${day}/${month}/${year}`;
      },

      formatPrice (price) {
        if (isNaN(price)) return 'Invalid price';
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
      }
  }