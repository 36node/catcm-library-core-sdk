export = SDK;

declare class SDK {
  constructor(opts?: SDK.Options);

  base: string;
  token: string;
  auth: string;

  library: SDK.LibraryAPI;
}

declare namespace SDK {
  export interface Options {
    base?: string;
    token?: string;
  }

  export interface LibraryAPI {
    /**
     * List all library
     */
    listLibrary(req: ListLibraryRequest): Promise<ListLibraryResponse>;
    /**
     * Find library by id
     */
    showLibraryById(req: ShowLibraryByIdRequest): Promise<ShowLibraryByIdResponse>;
  }

  type ListLibraryRequest = {
    query: {
      limit?: number;
      offset?: number;
      sort?: string;
      select?: string;
      group?: string | [string];

      filter: {
        id?: string;
        type?: string;
        title: {
          $regex?: string;
        };
        author?: string;
        dynasty?: string;
      };
    };
  };

  type ListLibraryResponse = {
    body: [Library];
    headers: {
      xTotalCount: number;
    };
  };

  type ShowLibraryByIdRequest = {
    libraryId: string;
  };

  type ShowLibraryByIdResponse = {
    body: Library;
  };

  type Library = {
    title: string;
    type: string;
    author: string;
    dynasty: string;
    content: string;
  };
  type Err = {
    code: string;
    message: string;
  };
}
