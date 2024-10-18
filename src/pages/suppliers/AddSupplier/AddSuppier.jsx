import PropTypes from "prop-types";

import { object, string } from "yup";
import { useTranslation } from "react-i18next";

import DynamicForm from "../../../components/DynamicForm";

function AddSupplier({ onAddSupplier, onCloseModalAdd }) {
  const { t } = useTranslation("notification");

  let userSchema = object({
    name: string().required(t("form.required")).max(30, "Tối Đa 30 kí tự"),
    phone: string().max(220, "Tối Đa 220 kí tự"),
    facebook: string().max(220, "Tối Đa 220 kí tự"),
    email: string().required(t("form.required")).max(220, "Tối Đa 220 kí tự"),
    customer_type: string().max(220, "Tối Đa 220 kí tự"),
    tax_code: string().max(220, "Tối Đa 220 kí tự"),
    date_of_birth: string().max(220, "Tối Đa 220 kí tự"),
    notes: string().max(220, "Tối Đa 220 kí tự"),
    address: string().max(220, "Tối Đa 220 kí tự"),
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
        onCloseModal={onCloseModalAdd}
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
