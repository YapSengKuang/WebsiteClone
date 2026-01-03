"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import {
  TextEditor,
  NumberEditor,
  CheckboxEditor,
  DateEditor,
} from "./FieldEditors";
import {
  SingleSelectEditor,
  MultiSelectEditor,
} from "./SelectEditors";


interface EditableCellProps {
  cellId: string;
  initialValue: any;
  fieldType: string;
}
export default function EditableCell({
  cellId,
  initialValue,
  fieldType,
  fieldOptions,
}: EditableCellProps) {
  const [value, setValue] = useState(initialValue ?? "");

  const utils = api.useUtils();
  const updateCell = api.cell.update.useMutation({
    onSuccess: () => utils.table.getFullTable.invalidate(),
  });

  const handleBlur = () => {
    updateCell.mutate({ cellId, value });
  };

  const editorProps = {
    value,
    onChange: setValue,
    onBlur: handleBlur,
  };

  switch (fieldType) {
    case "single_select":
      return (
        <SingleSelectEditor
          {...editorProps}
          options={fieldOptions?.choices ?? []}
        />
      );

    case "multi_select":
      return (
        <MultiSelectEditor
          {...editorProps}
          options={fieldOptions?.choices ?? []}
        />
      );

    case "number":
      return <NumberEditor {...editorProps} />;

    case "checkbox":
      return <CheckboxEditor {...editorProps} />;

    case "date":
      return <DateEditor {...editorProps} />;

    default:
      return <TextEditor {...editorProps} />;
  }
}

