import TopSlice from "./topSlice/TopSlice";
import TopCategories from "./topCategory/TopCategories";
import PopularProducts from "./popularProducts/PopularProducts";
import ForyouProducts from "./foryouProducts/PopularProducts";
import BannerBottom from "./bannerbottom/BannerBottom";

function Home() {
  return (
    <div className="">
      <TopSlice />
      <TopCategories />

      <ForyouProducts />

      <PopularProducts />

      <BannerBottom />
    </div>
  );
}

export default Home;
