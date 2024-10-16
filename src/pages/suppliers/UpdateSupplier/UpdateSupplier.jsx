import DynamicForm from "../../../components/DynamicForm";
import { object, string, number } from "yup";
import Proptypes from "prop-types";
import { useTranslation } from "react-i18next";

function UpdateSpllier({ value, onCloseModal, onUpdateSupplier }) {
  let { t } = useTranslation("notification");

  let userSchema = object({
    name: string().required(t("form.required")).max(50, "Tối Đa 30 kí tự"),
    phone: string(),
    facebook: string(),
    email: string().required(t("form.required")),
    customer_type: string(),
    tax_code: string().nullable(),
    address: string().nullable(),
    notes: string().nullable().max(220, "Tối Đa 220 kí tự"),
    id: number(),
  });

  const _onSubmit = async (data) => {
    onUpdateSupplier(data);
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
      name: "status",
      label: "status",
      type: "radio",
      labelName: "Trạng thái",
      options: [
        { value: 1, label: "Đang hoạt động" },
        { value: 2, label: "Ngừng hoạt động" },
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

  return (
    <>
      <DynamicForm
        fields={fields}
        onCloseModalAdd={onCloseModal}
        onSubmit={_onSubmit}
        FormSchema={userSchema}
        valueEdit={value}
      />
    </>
  );
}

UpdateSpllier.propTypes = {
  value: Proptypes.object,
  onCloseModal: Proptypes.func,
  onUpdateSupplier: Proptypes.func,
};

export default UpdateSpllier;
