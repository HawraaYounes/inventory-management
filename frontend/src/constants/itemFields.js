export const itemFields = [
    {
      name: "count",
      label: "Total Items",
      type: "number",
      placeholder: "Enter total number of items",
      required: false,    // optional, but you can validate it matches lines below
    },
    {
      name: "serial_numbers",
      label: "Serial Numbers",
      type: "textarea",
      placeholder: "Enter one serial number per line",
      required: true,
    },
  ];
  