import { ISectionContainer } from "Service/Office/Interface/ISectionContainer";
import { ILoad } from "Service/Office/Interface/ILoad";
import { IPageContainer } from "Service/Office/Interface/IPageContainer";
import { ISectionGroupContainer } from "Service/Office/Interface/ISectionGroupContainer";
import { Injectable } from "@angular/core";
import { IGetRestApiId } from "Service/Office/Interface/IGetRestApiID";
import { Cast } from "Service/Common/Cast";

@Injectable()
export class Api {
  public readonly FalsSectionGroupName = "FALS";

  public getOrCreateSectionGroup(
    sgName: string,
    parent: ISectionGroupContainer,
    context: OneNote.RequestContext
  ): OfficeExtension.IPromise<OneNote.SectionGroup> {
    const sectionGroups = parent.sectionGroups;
    sectionGroups.load();

    return context
      .sync()
      .then(async () => {
        let falsSG = sectionGroups.items.find(q => q.name == sgName);
        if (falsSG) {
          return falsSG;
        } else {
          return await this.createSectionGroup(sgName, parent, context);
        }
      })
      .then(this.loadAsync(context));
  }

  public createSectionGroup(
    sgName: string,
    parent: ISectionGroupContainer,
    context: OneNote.RequestContext
  ): OfficeExtension.IPromise<OneNote.SectionGroup> {
    const newSG = parent.addSectionGroup(sgName);

    return context.sync().then(() => newSG);
  }

  public getOrCreateSection(
    sgName: string,
    parent: ISectionContainer,
    context: OneNote.RequestContext
  ): OfficeExtension.IPromise<OneNote.Section> {
    const sections = parent.sections;
    sections.load();

    return context
      .sync()
      .then(async () => {
        let falsSG = sections.items.find(q => q.name == sgName);
        if (falsSG) {
          return falsSG;
        } else {
          return await this.createSection(sgName, parent, context);
        }
      })
      .then(this.loadAsync(context));
  }

  public createSection(
    sgName: string,
    parent: ISectionContainer,
    context: OneNote.RequestContext
  ): OfficeExtension.IPromise<OneNote.Section> {
    const newSG = parent.addSection(sgName);

    return context.sync().then(() => newSG);
  }

  public getOrCreatePage(
    sgName: string,
    parent: IPageContainer,
    context: OneNote.RequestContext
  ): OfficeExtension.IPromise<OneNote.Page> {
    const Pages = parent.pages;
    Pages.load();

    return context
      .sync()
      .then(async () => {
        const titlePages = Pages.getByTitle(sgName);
        titlePages.load();

        return context.sync()
          .then(async () => {
            if (titlePages.count > 0) {
              const falsSG = titlePages.getItemAt(titlePages.count - 1);
              if (falsSG) {
                return falsSG;
              }
            }
            return await this.createPage(sgName, parent, context);
          })

      })
      .then(this.loadAsync(context));
  }

  public createPage(
    sgName: string,
    parent: IPageContainer,
    context: OneNote.RequestContext
  ): OfficeExtension.IPromise<OneNote.Page> {
    const newSG = parent.addPage(sgName);

    return context.sync().then(() => newSG);
  }

  public loadAsync<T extends ILoad<T>>(context: OneNote.RequestContext) {
    return async (entity: T) => {
      entity.load();
      return await context.sync().then(async () => {
        const restEntity = Cast<IGetRestApiId>(entity);
        if (restEntity.getRestApiId) {
          const restId = restEntity.getRestApiId();
          return await context.sync().then(() => {
            console.log("restId = " + restId.value);
            restEntity.restId = restId.value;
            return entity;
          });
        } else {
          return entity;
        }
      });
    };
  }
}
