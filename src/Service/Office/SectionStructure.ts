import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { ISectionContainer } from "Service/Office/Interface/ISectionContainer";
import { Api } from "Service/Office/Api";
import { Web } from "Service/Office/Web";
import { IGetRestApiId } from "Service/Office/Interface/IGetRestApiID";
import { Cast } from "Service/Common/Cast";

@Injectable()
export class SectionStructure {
  constructor(private Api: Api, private Web: Web) { }

  getMaterialPage(
    course: string,
    module: string,
    step?: string
  ): OfficeExtension.IPromise<OneNote.Page> {
    return OneNote.run(async context => {
      const notebook = context.application.getActiveNotebook();
      notebook.load();

      return await context.sync().then(async () => {
        const falsSG = await this.Api.getOrCreateSectionGroup(
          this.Api.FalsSectionGroupName,
          notebook,
          context
        );
        const courseSG = await this.Api.getOrCreateSectionGroup(
          course,
          falsSG,
          context
        );
        const moduleSG = await this.Api.getOrCreateSection(
          module,
          courseSG,
          context
        );
        if (!step) {
          const pages = moduleSG.pages;
          pages.load();
          return await context.sync().then(async () => {
            if (pages.count > 0) {
              const page = pages.getItemAt(0);
              page.load();
              return await context
                .sync()
                .then(q => page)
                .then(this.Api.loadAsync(context));
            } else {
              return await this.Api.getOrCreatePage(
                step ? step : "Empty",
                moduleSG,
                context
              );
            }
          });
        }
        return await this.Api.getOrCreatePage(
          step ? step : "Empty",
          moduleSG,
          context
        );
      });
    });
  }

  putContent(content: string, page: OneNote.Page) {
    return OneNote.run(async context => {
      page = context.application.getActivePage();
      page.load();
      context.sync();
      return context.sync().then(async () => {
        page.contents.load();
        const id = Cast<IGetRestApiId>(page).getRestApiId();
        return context.sync().then(() => {
          console.log(page.contents);
          if (page.contents.count > 0) {
            console.log("rest: " + id.value);
            console.log(content);
            if (id.value) {
              return this.Web.replacePageBody(content, id.value).subscribe(q =>
                console.log(q)
              );
            }
          }
          else {
            let outline = page
              .addOutline(50, 75, content);
            console.log(JSON.stringify(outline));
            console.log(page.contents.items);
          }
        });
      });
    });
  }

  open(page: OneNote.Page) {
    return OneNote.run(async context => {
      return await context.application.navigateToPageWithClientUrl(
        page.clientUrl
      );
    });
  }
}
