let arrA = [{ name: "new-1" }, { name: "new-2" }];
let arrB = [
  { name: "red-12", price: 0 },
  { name: "red-24", price: 0 },
  { name: "blue-12", price: 0 },
  { name: "blue-24", price: 0 },
];
// Tạo một Map để lưu trữ các phần tử đã gặp, key là name
const nameMap = new Map();

// Duyệt qua cả hai mảng, thêm vào Map nếu chưa tồn tại
const combinedArray = [...arrA, ...arrB].filter((item) => {
  if (!nameMap.has(item.name)) {
    nameMap.set(item.name, item);
    return true;
  }
  return false;
});

console.log(combinedArray);

// Giả sử arrA và arrB có cùng độ dài
const result = arrB.map((item, index) => ({
  name: arrA[index]?.name,
  price: item.price,
}));

console.log(result);
