import * as React from "react";
import { IList, ITabularViewProps, ListItem } from "../types";
import { ListService } from "../../../services/ListServices";
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  SelectionMode,
  Stack,
  TextField,
} from "@fluentui/react";
import { TableColumns } from "../constants";

export function TabularView(props: ITabularViewProps): React.ReactElement {
  const ListServiceInstance = ListService.getInstance();
  const [filteredTableViewItems, setFilteredTableViewItems] = React.useState<
    IList[]
  >([]);
  const [tableViewItems, setTableViewItems] = React.useState<IList[]>([]);
  const [listTableColumns, setListTableColumns] =
    React.useState<IColumn[]>(TableColumns);

  const copyAndSort = (
    items: IList[],
    columnKey: string,
    isSortedDescending?: boolean
  ): IList[] => {
    const key = columnKey as keyof IList;
    return items
      .slice(0)
      .sort((a: IList, b: IList) =>
        (
          isSortedDescending
            ? a[key as keyof typeof a] < b[key as keyof typeof b]
            : a[key as keyof typeof a] > b[key as keyof typeof b]
        )
          ? 1
          : -1
      );
  };

  const onColumnClick = (
    ev: React.MouseEvent<HTMLElement>,
    column: IColumn
  ): void => {
    const newColumns: IColumn[] = listTableColumns.slice();
    const currColumn: IColumn = newColumns.filter(
      (currCol) => column.key === currCol.key
    )[0];
    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    const newItems = copyAndSort(
      filteredTableViewItems,
      currColumn.fieldName!,
      currColumn.isSortedDescending
    );
    setListTableColumns(newColumns);
    setFilteredTableViewItems(newItems);
  };

  React.useEffect(() => {
    const updatedColumns = listTableColumns.map((e) => {
      e.onColumnClick = onColumnClick;
      return e;
    });

    setListTableColumns(updatedColumns);
  }, [filteredTableViewItems]);

  const getListItems = async (): Promise<void> => {
    const response: ListItem[] = await ListServiceInstance.getListItems(
      "TestList",
      "Id, Title, Created, Modified",
      "",
      ""
    );
    if (response.length) {
      const list: IList[] = response.map((item) => ({
        key: `${item.Id}`,
        Title: item.Title,
        Created: new Date(item.Created).toLocaleDateString(),
        Modified: new Date(item.Modified).toLocaleDateString(),
      }));
      setTableViewItems(list);
      setFilteredTableViewItems(list);
    }
  };

  const filterList = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text: string
  ) => {
    setFilteredTableViewItems(
      text
        ? tableViewItems.filter(
            (i) => i.Title.toLowerCase().indexOf(text.toLowerCase()) > -1
          )
        : tableViewItems
    );
  };

  React.useEffect(() => {
    getListItems();
  }, []);

  return (
    <Stack tokens={{ childrenGap: 10 }}>
      <TextField
        styles={{ root: { width: "30%" } }}
        label="Filter by Title"
        onChange={filterList}
      />
      <DetailsList
        styles={{
          root: { width: "100%", border: " 1px solid rgb(216, 210, 210)" },
        }}
        items={filteredTableViewItems}
        columns={listTableColumns}
        compact={false}
        selectionMode={SelectionMode.none}
        setKey="none"
        layoutMode={DetailsListLayoutMode.justified}
        isHeaderVisible={true}
      />
    </Stack>
  );
}
