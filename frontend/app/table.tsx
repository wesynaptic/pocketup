import {
  ColumnDef,
} from "@tanstack/react-table"

export const columns: ColumnDef<any>[] = [
    {
      accessorKey: "text_field",
      header: "Text_field",
      cell: ({ row }) => {
        return <div>{row.getValue("text_field")}</div>;
      },
    },
    {
      accessorKey: "number_field",
      header: "Number_field",
      cell: ({ row }) => {
        const value = parseFloat(row.getValue("number_field"));
        return <div></div>;
      },
    },
    {
      accessorKey: "boolean_field",
      header: "Boolean_field",
      cell: ({ row }) => {
        return <div>{row.getValue("boolean_field") ? 'Yes' : 'No'}</div>;
      },
    },
    {
      accessorKey: "email_field",
      header: "Email_field",
      cell: ({ row }) => {
        return <div className="lowercase">{row.getValue("email_field")}</div>;
      },
    },
    {
      accessorKey: "url_field",
      header: "Url_field",
      cell: ({ row }) => {
        return <div>{row.getValue("url_field")}</div>;
      },
    },
    {
      accessorKey: "datetime_field",
      header: "Datetime_field",
      cell: ({ row }) => {
        return <div>{new Date(row.getValue("datetime_field")).toLocaleDateString()}</div>;
      },
    },
    {
      accessorKey: "select_field",
      header: "Select_field",
      cell: ({ row }) => {
        return <div>{row.getValue("select_field")}</div>;
      },
    },
    {
      accessorKey: "relation_field",
      header: "Relation_field",
      cell: ({ row }) => {
        return <div>{row.getValue("relation_field")}</div>;
      },
    },
  ];
  