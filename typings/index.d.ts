export = SDK;

declare class SDK {
  constructor(opts?: SDK.Options);

  base: string;
  token: string;
  auth: string;

  library: SDK.LibraryAPI;
  permission: SDK.PermissionAPI;
  merge: SDK.MergeAPI;
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
     * Create a library
     */
    createLibrary(req: CreateLibraryRequest): Promise<CreateLibraryResponse>;
    /**
     * Find library by id
     */
    showLibraryById(req: ShowLibraryByIdRequest): Promise<ShowLibraryByIdResponse>;
  }
  export interface PermissionAPI {
    /**
     * List all permission
     */
    listPermission(req: ListPermissionRequest): Promise<ListPermissionResponse>;
    /**
     * Upsert permission
     */
    upsertPermission(req: UpsertPermissionRequest): Promise<UpsertPermissionResponse>;
  }
  export interface MergeAPI {
    /**
     * mergeTable
     */
    mergeTable(req: MergeTableRequest): Promise<MergeTableResponse>;
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
        category: {
          $regex?: string;
        };
        name: {
          $regex?: string;
        };
        author: {
          $regex?: string;
        };
        dynasty: {
          $regex?: string;
        };
        value: {
          $regex?: string;
        };
      };
    };
  };

  type ListLibraryResponse = {
    body: [Library];
    headers: {
      xTotalCount: number;
    };
  };

  type CreateLibraryRequest = {
    body: Library;
  };

  type CreateLibraryResponse = {
    body: Library;
  };

  type ShowLibraryByIdRequest = {
    libraryId: string;
  };

  type ShowLibraryByIdResponse = {
    body: Library;
  };

  type ListPermissionRequest = {
    query: {
      limit?: number;
      offset?: number;
      sort?: string;
      select?: string;
      group?: string | [string];

      filter: {
        user?: string;
        book?: string;
      };
    };
  };

  type ListPermissionResponse = {
    body: [Permission];
    headers: {
      xTotalCount: number;
    };
  };

  type UpsertPermissionRequest = {
    body: [PermissionDoc];
  };

  type UpsertPermissionResponse = {
    body: [Permission];
  };

  type MergeTableResponse = {
    body: [MongoDefault];
    headers: {
      xTotalCount: number;
    };
  };

  type Library = {
    title: string;
    type: string;
    author: string;
    dynasty: string;
    content: string;
  };
  type Permission = {
    id: string;
    updatedAt: string;
    createdAt: string;
    user: string;
    book: string;
    authName: string;
    authCategory: string;
    authContent: string;
  };
  type PermissionDoc = {
    id: string;
    user: string;
    book: string;
    authName: string;
    authCategory: string;
    authContent: string;
  };
  type MongoDefault = {
    id: string;
    updatedAt: string;
    createdAt: string;
  };
  type Err = {
    code: string;
    message: string;
  };
}
