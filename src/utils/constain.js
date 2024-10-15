export const path = {
    LOGIN: '/login',
    REGISTER: '/register',
    SYSTEM: '/system'
};

export const ListProductTypes = {
    title: "filter.product-type",
    data: [
        { value: '', name: 'Hàng Hóa' },
        { value: 1, name: 'Dịch Vụ' },
        { value: 2, name: 'Compo  Gói' },
    ]
}

export const ListDisplayOption = {
    title: "filter.display-option",
    data: [
        { value: 1, name: "Đang Kinh Doanh" },
        { value: 2, name: "Ngừng Kinh Doanh" }
    ]
}

export const ListOnHands = {
    title: "filter.on-hand",
    data: [
        { value: '', name: "All" },
        { value: 1, name: "Còn Hàng" },
        { value: 2, name: "Hết Hàng" }

    ]
}

export const ListGender = {
    title: "filter.gender",
    data: [
        { value: 0, name: "All" },
        { value: 1, name: "Nam" },
        { value: 2, name: "Nữ" }
    ]
}

export const ListCustomersType = {
    title: "filter.customer-type",
    data: [
        { value: "", name: "All" },
        { value: 0, name: "Cá Nhân" },
        { value: 1, name: "Công Ty" }
    ]
}
export const ListStatusCustomer = {
    title: "filter.status",
    data: [
        { value: 0, name: "Tất cả" },
        { value: 1, name: "Đang hoạt động" },
        { value: 2, name: "Ngừng hoạt Động" }
    ]
}

export const ListStatus = {
    title: "filter.status",
    data: [
        { value: "", name: "All" },
        { value: 1, name: "Đang Hoạt động" },
        { value: 2, name: "Ngừng Hoạt Động" }
    ]
}

export const ListStatusPurchaseOrder = {
    title: "filter.status",
    data: [
        { value: 0, name: "All" },
        { value: 1, name: "Phiếu tạm" },
        { value: 2, name: "Đã nhập hàng" }
    ]
}

export const ListStatusInvoice = {
    title: "filter.status",
    data: [
        { value: 1, name: "Đang Xử Lý" },
        { value: 2, name: "Đã Hoàng Thành" }
    ]
}

