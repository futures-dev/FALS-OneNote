export interface IPageContainer {
  pages: OneNote.PageCollection;
  addPage(title: string): OneNote.Page;
}
