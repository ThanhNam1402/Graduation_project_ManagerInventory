import "./topCategories.scss";

function TopCategories() {
  return (
    <div className="topcate">
      <div className="topcate_content">
        {Array.from({ length: 5 }).map((_, index) => (
          <div className="" key={index}>
            <img
              src="https://cf.shopee.vn/file/vn-11134258-7ras8-m0vja5rfwyvj10_xhdpi"
              alt=""
            />
            <p>Category {index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopCategories;
