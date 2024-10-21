import DynamicForm from "@/components/admin/DynamicForm";

import PropTypes from "prop-types";

import { object, string } from "yup";
import { useTranslation } from "react-i18next";

function AddOptionVariant({ onAddOptionVariant, onCloseModal }) {
  const { t } = useTranslation("notification");

  let userSchema = object({
    name: string().required(t("form.required")).max(50, "Tối Đa 30 kí tự"),
  });

  const _onSubmit = async (name) => {
    onAddOptionVariant(name);
  };

  // data form
  const fields = [
    {
      name: "name",
      label: "name",
      type: "text",
      labelName: "Tên Option",
    },
  ];

  return (
    <DynamicForm
      fields={fields}
      onCloseModal={onCloseModal}
      onSubmit={_onSubmit}
      FormSchema={userSchema}
    />
  );
}

AddOptionVariant.propTypes = {
  onAddOptionVariant: PropTypes.func,
  onCloseModal: PropTypes.func,
};
export default AddOptionVariant;
