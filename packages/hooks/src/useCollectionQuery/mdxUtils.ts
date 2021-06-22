import { ApolloClient, InMemoryCache } from "@apollo/client";
import gql from "graphql-tag";

export interface ListQueryType {
  allPlanets: {
    __typename?: "PlanetsConnection";
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
    edges: Array<{
      __typename?: "PlanetsEdge";
      node: {
        __typename?: "Planet";
        name: "string";
        id: "string";
      };
      cursor: string;
    }>;
    totalCount: number;
  };
}

export const LIST_QUERY = gql`
  query ListQuery($cursor: String) {
    allPlanets(first: 4, after: $cursor) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          name
          id
        }
        cursor
      }
      totalCount
    }
  }
`;

export const apolloClient = new ApolloClient({
  uri: "https://swapi-graphql.netlify.app/.netlify/functions/index",
  cache: new InMemoryCache(),
});

interface ListItems {
  id?: string;
  icon?: string;
  content?: string;
}

export function mapDataToListItem(
  data: ListQueryType,
): Array<ListItems> | undefined {
  if (data !== undefined) {
    const items = data.allPlanets?.edges.map(edge => {
      return {
        id: edge.node.id,
        icon: "starFill",
        iconColor: "green",
        content: edge.node.name,
      };
    });
    return items;
  }
  return undefined;
}

export const styles = {
  spinners: {
    display: "flex",
  },
  loadingIndicator: {
    flex: 1,
    paddingBottom: 100,
  },
  actions: {
    paddingTop: 20,
  },
};

export const propsList = [
  {
    id: 0,
    title: "query",
    caption: "The graphQL query that fetches the collection",
    value: "DocumentNode",
  },
  {
    id: 1,
    title: "queryOptions",
    caption:
      "A list of options for us to pass into the apollo `useQuery` hook. \
       Click to see more query options!",
    url: "https://www.apollographql.com/docs/react/data/queries/#options",
    value: "QueryHookOptions",
  },
  {
    id: 2,
    title: "getCollectionByPath",
    caption:
      "A function that returns the location where the \
      {@link Collection} is located. The collection is the part of the \
      result that needs to be paginated.",
    value: "GetCollectionByPathFunction<TQuery>",
  },
  {
    id: 3,
    title: "subscription (optional)",
    caption:
      "A list of subscription options if \
      you want to create a GraphQL subscription to listen for more content.",
    value: "SubscriptionProps",
  },
];

export const subscriptionPropsList = [
  {
    id: 0,
    title: "document",
    caption:
      "The graphQL subscription that listens for more data. This query \
      should return a single Node that matches the data structure in \
      getCollectionByPath<TQuery>(...).edges.node and \
      getCollectionByPath<TQuery>(...).nodes",
    value: "DocumentNode",
  },
  {
    id: 1,
    title: "options",
    caption:
      " A list of variables to pass into the apollo `subscribeToMore` function.",
    value: "Pick<SubscribeToMoreOptions<TSubscription>",
  },
  {
    id: 2,
    title: "getNodeByPath",
    caption:
      " A function that returns the location where the `Node` is \
      located on the TSubscription object. It should return a single Node \
      that matches the data structure in \
      getCollectionByPath<TQuery>(...).edges.node and \
      getCollectionByPath<TQuery>(...).nodes",
    value: "GetNodeByPath<TSubscription>",
  },
];
