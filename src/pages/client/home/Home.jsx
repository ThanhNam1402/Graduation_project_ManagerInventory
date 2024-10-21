import TopSlice from "./topSlice/TopSlice";
import TopCategories from "./topCategory/TopCategories";

function Home() {
  return (
    <div className="">
      <TopSlice />
      <TopCategories />

      <div
        className=""
        style={{
          minWidth: "100%",
          minHeight: "100vh",
          backgroundColor: "aqua",
        }}
      ></div>
    </div>
  );
}

export default Home;
