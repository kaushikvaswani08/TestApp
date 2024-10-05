/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IListService {
  createListItem(listName: string, itemData: any): Promise<any>;
  updateListItem(listName: string, itemId: number, itemData: any): Promise<any>;
  getListItems(
    listName: string,
    select: string,
    expand: string,
    filter: string
  ): Promise<any>;
  getListItemById(
    listName: string,
    itemId: number,
    select: string,
    expand: string,
    filter: string
  ): Promise<any>;
}
