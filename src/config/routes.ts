export const DEFAULT = {
  routes: (config) => {
    return {
      get: [
        { path: "/status", action: "status" },
        { path: "/swagger", action: "swagger" },
        { path: "/createChatRoom", action: "createChatRoom" },
        { path: "/blocks/hash/:hash", action: "GetBlockByHash" },
        { path: "/blocks/number/:blocknumber", action: "GetBlockByNumber" },
        { path: "/blocks/numbers/:blocknumber/:count", action: "GetXBlocksFromNthFromCChain" },
        { path: "/transactions/hash/:hash", action: "GetTransactionByHash" },
        { path: "/transactions/:address/:n/:x", action: "GetXTransactionsAfterNthFromAddress" },
        { path: "/transactions/:n/:x", action: "GetXPendingTransactionsAfterNth" },
        { path: "/transactions/recentxchain", action: "GetRecentTransactionsFromXChain" },
        { path: "/transactions/recentpchain", action: "GetRecentTransactionsFromPChain" },
        { path: "/address/hash/:hash", action: "GetAddressInfoByHash" },
        { path: "/network", action: "GetNetWorkActivity" }
      ],

      /* ---------------------
      For web clients (http and https) you can define an optional RESTful mapping to help route requests to actions.
      If the client doesn't specify and action in a param, and the base route isn't a named action, the action will attempt to be discerned from this routes.js file.

      Learn more here: https://www.actionherojs.com/tutorials/web-server#Routes

      examples:

      get: [
        { path: '/users', action: 'usersList' }, // (GET) /api/users
        { path: '/search/:term/limit/:limit/offset/:offset', action: 'search' }, // (GET) /api/search/car/limit/10/offset/100
      ],

      post: [
        { path: '/login/:userID(^\\d{3}$)', action: 'login' } // (POST) /api/login/123
      ],

      all: [
        { path: '/user/:userID', action: 'user', matchTrailingPathParts: true } // (*) /api/user/123, api/user/123/stuff
      ]

      ---------------------- */
    };
  },
};
