const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require("graphql");

// Launch Type
const LaunchType = new GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    rocket: { type: RocketType }
  })
});

// Rocket Type
const RocketType = new GraphQLObjectType({
  name: "Rocket",
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString }
  })
});

// History
const HistorySpaceX = new GraphQLObjectType({
  name: "History",
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    flight_number: { type: GraphQLInt },
    details: { type: GraphQLString },
    event_date_utc: { type: GraphQLString },
    links: { type: Link_history }
  })
});

// Link_history
const Link_history = new GraphQLObjectType({
  name: "Links",
  fields: () => ({
    reddit: { type: GraphQLString },
    article: { type: GraphQLString },
    wikipedia: { type: GraphQLString }
  })
});

// Ships
const ShipSpaceX = new GraphQLObjectType({
  name: "Ship",
  fields: () => ({
    ship_id: { type: GraphQLString },
    ship_name: { type: GraphQLString },
    active: { type: GraphQLBoolean },
    year_built: { type: GraphQLInt },
    image: { type: GraphQLString }
  })
});

// Dragons
const DragonsX = new GraphQLObjectType({
  name: "Dragons",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    wikipedia: { type: GraphQLString },
    active: { type: GraphQLBoolean },
    first_flight: { type: GraphQLString }
  })
});

// Landing Pads
const LandingPads = new GraphQLObjectType({
  name: "landpad",
  fields: () => ({
    id: { type: GraphQLString },
    full_name: { type: GraphQLString },
    wikipedia: { type: GraphQLString }
  })
});

// Payload
const Payloads = new GraphQLObjectType({
  name: "PayloadX",
  fields: () => ({
    payload_id: { type: GraphQLString },
    reused: { type: GraphQLBoolean },
    nationality: { type: GraphQLString },
    manufacturer: { type: GraphQLString },
    payload_type: { type: GraphQLString }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      resolve(parent, args) {
        return axios
          .get("https://api.spacexdata.com/v3/launches")
          .then(res => res.data);
      }
    },
    launch: {
      type: LaunchType,
      args: {
        flight_number: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
          .then(res => res.data);
      }
    },
    rockets: {
      type: new GraphQLList(RocketType),
      resolve(parent, args) {
        return axios
          .get("https://api.spacexdata.com/v3/rockets")
          .then(res => res.data);
      }
    },
    rocket: {
      type: RocketType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/rockets/${args.flight_number}`)
          .then(res => res.data);
      }
    },
    histories: {
      type: new GraphQLList(HistorySpaceX),
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/history`)
          .then(res => res.data);
      }
    },
    history: {
      type: HistorySpaceX,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/history/${args.id}`)
          .then(res => res.data);
      }
    },
    ships: {
      type: new GraphQLList(ShipSpaceX),
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/ships`)
          .then(res => res.data);
      }
    },
    dragons: {
      type: new GraphQLList(DragonsX),
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/dragons`)
          .then(res => res.data);
      }
    },
    landpads: {
      type: new GraphQLList(LandingPads),
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/landpads`)
          .then(res => res.data);
      }
    },
    payloads: {
      type: new GraphQLList(Payloads),
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/payloads`)
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
