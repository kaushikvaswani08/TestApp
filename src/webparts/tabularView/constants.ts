import { IColumn } from "@fluentui/react";

export const TableColumns: IColumn[] = [
  {
    key: "column1",
    name: "Title",
    fieldName: "Title",
    minWidth: 100,
    isPadded: true,
    isMultiline: true,
    isSorted: true,
    isSortedDescending: false,
    sortAscendingAriaLabel: "Sorted A to Z",
    sortDescendingAriaLabel: "Sorted Z to A",
  },
  {
    key: "column2",
    name: "Created",
    fieldName: "Created",
    minWidth: 120,
    maxWidth: 120,
    isPadded: false,
    isSorted: false,
    isSortedDescending: false,
  },
  {
    key: "column3",
    name: "Modified",
    fieldName: "Modified",
    minWidth: 120,
    maxWidth: 120,
    isPadded: true,
    isSorted: false,
    isSortedDescending: false,
  },
];
