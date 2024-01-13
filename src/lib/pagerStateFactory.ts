import { PageModel, PageState, PagerRes } from "@/abstractions/TablePage";
import axios, { CancelToken } from "axios";
import { create } from "zustand";

interface ActionParams<T> {
  pageModel: PageModel;
  req: T;
  cancelToken?: CancelToken
}

export const pagerStateFactory = <T,G>(action: (params: ActionParams<G>) => Promise<PagerRes<T>>) => {
  return create<PageState<T, G>>((set, get) => ({
    res: {
      results: [],
      totalResults: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
      customColumns: []
    },
    pageModel: {
      page: 0,
      pageSize: 10,
    },
    loading: false,
    cancel: () => get().source?.cancel(),
    updatePageModel: (pageModel: PageModel) => set({ pageModel }),
    update: async (req) => {
      const isServer = typeof window === 'undefined';
      
      if (!isServer) {
        get().source?.cancel();
      }

      const source = axios.CancelToken.source();

      set({
        loading: true,
        source: source,
      });

      const res = await action({
        pageModel: get().pageModel,
        req: req,
        cancelToken: source.token
      });
      set({ res, loading: false });
      return res;
    },
  }))
}