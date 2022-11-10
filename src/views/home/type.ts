export interface Folder {
  id: string;
  label: string;
  children?: Folder[];
}

export interface DeleteFolder {
  visible: boolean;
  title: string;
  tip: string;
  deleteItem: Folder;
}
export interface AddFolder {
  visible: boolean;
  addItem: Folder;
}
export interface fileItem {
  id: string;
  name: string;
  type: string;
  desc: string;
}
export interface iFile {
  search: {
    name: string;
    type: string;
  };
  tableData: fileItem[];
}
