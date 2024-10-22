import "./popularproduct.scss";
import ButtonClt from "@/components/client/Button/Button";

function ForyouProducts() {
  return (
    <div className="p_product">
      <div className="p_product-title">Sản phẩm phổ biến</div>

      <div className="p_product-content">
        <div className="grid wide">
          <div className="row list_product">
            {Array.from({ length: 8 }).map((_, index) => (
              <div className="col l-3 m-4 " key={index}>
                <a href="" className="list_item">
                  <img
                    src="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lyrm278oi1ql74@resize_w450_nl.webp"
                    alt=""
                  />
                  <div className="info">
                    <p>Category {index + 1}</p>
                    <p className="name">
                      Áo sơ mi nam nữ tay ngắn chất kaki cao cấp kiểu dáng form
                      rộng, unisex, dễ phối đồ mặc cực đẹp {index + 1}
                    </p>
                    <p className="price">120.000 đ</p>
                    <p className="sale_price">90.000 đ</p>
                    <p></p>
                  </div>
                </a>
              </div>
            ))}
          </div>

          <div className="btn-more">
            <ButtonClt
              type="button"
              className="see-more"
              icon="ri-arrow-right-line"
            >
              Xem thêm
            </ButtonClt>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForyouProducts;
