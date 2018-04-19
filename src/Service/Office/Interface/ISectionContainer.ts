export interface ISectionContainer {
  sections: OneNote.SectionCollection;
  addSection(name: string): OneNote.Section;
}
