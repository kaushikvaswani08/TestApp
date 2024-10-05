/* eslint-disable @typescript-eslint/no-explicit-any */
import { spfi, SPFI, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/files";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IListService } from "./IListServices";

export class ListService implements IListService {
  private static _instance: IListService;
  public _sp: SPFI;
  public _context: WebPartContext;

  constructor(context: WebPartContext) {
    this._context = context;
    this._sp = spfi().using(SPFx(context));
  }

  public static getInstance(): IListService {
    if (!ListService._instance) console.error("No instance for ListService");
    return ListService._instance;
  }

  public static setInstance(context: WebPartContext): IListService {
    if (!context) console.error("No context provided");
    ListService._instance = new ListService(context);
    return ListService._instance;
  }

  public async createListItem(listName: string, itemData: any): Promise<any> {
    const response = await this._sp.web.lists
      .getByTitle(listName)
      .items.add(itemData);
    return response.data;
  }

  public async updateListItem(
    listName: string,
    itemId: number,
    itemData: any
  ): Promise<any> {
    const response = await this._sp.web.lists
      .getByTitle(listName)
      .items.getById(itemId)
      .update(itemData);
    return response.data;
  }

  public async getListItems(
    listName: string,
    select: string,
    expand: string,
    filter: string
  ): Promise<any> {
    const items = await this._sp.web.lists
      .getByTitle(listName)
      .items.select(select)
      .expand(expand)
      .filter(filter)();
    return items;
  }

  public async getListItemById(
    listName: string,
    itemId: number,
    select: string,
    expand: string
  ): Promise<any> {
    const items = await this._sp.web.lists
      .getByTitle(listName)
      .items.getById(itemId)
      .select(select)
      .expand(expand)();
    return items;
  }
}
