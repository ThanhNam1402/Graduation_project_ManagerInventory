import PropTypes from "prop-types";

import { object, string } from "yup";
import { useTranslation } from "react-i18next";

import DynamicForm from "../../../components/DynamicForm";

function AddSupplier({ onAddSupplier, onCloseModalAdd }) {
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
    onAddSupplier(data);
  };

  // data form
  const fields = [
    {
      name: "name",
      label: "name",
      type: "text",
      labelName: "Tên nhà cung cấp",
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

AddSupplier.propTypes = {
  onCloseModalAdd: PropTypes.func,
  onAddSupplier: PropTypes.func,
};

export default AddSupplier;
