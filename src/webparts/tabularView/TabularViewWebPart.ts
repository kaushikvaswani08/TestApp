import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { TabularView } from "./components/TabularView";
import { ListService } from "../../services/ListServices";
import { ITabularViewProps } from "./types";

export interface ITabularViewWebPartProps {}

export default class TabularViewWebPart extends BaseClientSideWebPart<ITabularViewWebPartProps> {
  protected async onInit(): Promise<void> {
    ListService.setInstance(this.context);
    return super.onInit();
  }
  public render(): void {
    const element: React.ReactElement<ITabularViewProps> = React.createElement(
      TabularView,
      {}
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }
}
