import api from "../config/axios";

export const pricebookService = {
    handleUpdateSale_Price(id, sale_price){
        return api.put(`/api/pricebook/${id}`,{
            sale_price: sale_price
        })
      }

}

