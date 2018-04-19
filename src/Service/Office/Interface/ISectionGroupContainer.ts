export interface ISectionGroupContainer {
  sectionGroups: OneNote.SectionGroupCollection;
  addSectionGroup(name: string): OneNote.SectionGroup;
}
