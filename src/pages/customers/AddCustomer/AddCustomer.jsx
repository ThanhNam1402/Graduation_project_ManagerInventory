import PropTypes from "prop-types";

import { object, string } from "yup";
import { useTranslation } from "react-i18next";

import DynamicForm from "../../../components/DynamicForm";

function AddCustomer({ onAddCustomer, onCloseModalAdd }) {
  const { t } = useTranslation("notification");

  let userSchema = object({
    name: string().required(t("form.required")).max(50, "Tối Đa 30 kí tự"),
    phone: string(),
    facebook: string(),
    email: string().required(t("form.required")),
    customer_type: string(),
    tax_code: string(),
    date_of_birth: string(),
    notes: string(),
    address: string(),
    description: string().max(220, "Tối Đa 220 kí tự"),
  });

  const _onSubmit = async (data) => {
    onAddCustomer(data);
  };

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

  return (
    <>
      <DynamicForm
        fields={fields}
        onCloseModalAdd={onCloseModalAdd}
        onSubmit={_onSubmit}
        FormSchema={userSchema}
      />
    </>
  );
}

AddCustomer.propTypes = {
  onCloseModalAdd: PropTypes.func,
  onAddCustomer: PropTypes.func,
};

export default AddCustomer;
