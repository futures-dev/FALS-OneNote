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
  constructor(private Api: Api, private Web: Web) {}

  getMaterialPage(
    course: string,
    module: string,
    step: string
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
        return await this.Api.getOrCreatePage(step, moduleSG, context);
      });
    });
  }

  putContent(content: string, page: OneNote.Page) {
    return OneNote.run(async context => {
      const id = Cast<IGetRestApiId>(page).restId;
      console.log("rest: " + id);
      return this.Web.replacePageBody("<p>Hello World</p>", id).subscribe(q =>
        console.log(q)
      );
    });
  }

  open(page: OneNote.Page) {
    return OneNote.run(async context => {
      return context.application.navigateToPageWithClientUrl(page.clientUrl);
    });
  }
}
