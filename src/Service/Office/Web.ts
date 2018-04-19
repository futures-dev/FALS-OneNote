import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { OneNoteAuth } from "Service/Office/Auth/OneNoteAuth";
import { Assert } from "Service/Common/Assert";

@Injectable()
export class Web {
  private static readonly Endpoint = "https://www.onenote.com/api/beta/me/notes/";

  constructor(private onenote: OneNoteAuth) {}

  public replacePageBody(content: string, id: string) {
    Assert(
      this.onenote.isAuth.getValue(),
      "OneNoteAuth must be authenticated before using Web"
    );
    return this.onenote.Patch(Web.Endpoint + `pages/${id}/content`, [
      {
        target: "body",
        action: "replace",
        content: content,
      },
    ]);
  }
}
