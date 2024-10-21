import { object, string, number } from "yup";
import { useTranslation } from "react-i18next";

import PropTypes from "prop-types";
import DynamicForm from "@/components/admin/DynamicForm";

function UpdateCustomer({ value, onCloseModal, onUpdateCustomer }) {
  const { t } = useTranslation("notification");

  let userSchema = object({
    name: string().required(t("form.required")).max(50, "Tối Đa 30 kí tự"),
    phone: string().nullable(),
    facebook: string().nullable(),
    email: string().required(t("form.required")).email(),
    customer_type: string(),
    tax_code: string().nullable(),
    status: string().nullable(),
    date_of_birth: string().nullable(),
    notes: string().nullable(),
    id: number().nullable(),
    address: string().nullable(),
    description: string().max(220, "Tối Đa 220 kí tự").nullable(),
  });

  // data form
  const fields = [
    {
      name: "name",
      label: "name",
      type: "text",
      labelName: "Tên Khách Hàng",
    },
    {
      name: "email",
      label: "email",
      type: "text",
      labelName: "Email",
    },
    {
      name: "phone",
      label: "phone",
      type: "text",
      labelName: "Điện thoại",
    },
    {
      name: "city_name",
      label: "city_name",
      type: "text",
      labelName: "Tên Thành Phố",
    },
    {
      name: "customer_type",
      label: "customer_type",
      type: "radio",
      labelName: "Loại Khách Hàng",
      options: [
        { value: 1, label: "Công ty" },
        { value: 2, label: "Cá Nhân" },
      ],
    },
    {
      name: "tax_code",
      label: "tax_code",
      type: "text",
      labelName: "Mã số thuế",
    },
    {
      name: "facebook",
      label: "facebook",
      type: "text",
      labelName: "Facebook",
    },
    {
      name: "date_of_birth",
      label: "date_of_birth",
      type: "date",
      labelName: "Ngày Sinh",
    },
    {
      name: "status",
      label: "status",
      type: "radio",
      labelName: "Trạng Thái",
      options: [
        { value: 1, label: "Đang hoạt động" },
        { value: 0, label: "Ngừng hoạt động" },
      ],
    },
    {
      name: "address",
      label: "address",
      type: "textarea",
      labelName: "Địa Chỉ",
    },
    {
      name: "notes",
      label: "notes",
      type: "textarea",
      labelName: "Ghi Chú",
    },
  ];

  const _onSubmit = async (data) => {
    console.log(data);

    onUpdateCustomer(data?.id, data);
  };

  return (
    <>
      <DynamicForm
        valueEdit={value}
        fields={fields}
        onSubmit={_onSubmit}
        FormSchema={userSchema}
        onCloseModal={onCloseModal}
      />
    </>
  );
}

UpdateCustomer.propTypes = {
  value: PropTypes.object,
  onCloseModal: PropTypes.func,
  onUpdateCustomer: PropTypes.func,
};

export default UpdateCustomer;
