// const BASE_URL = 'https://hgpadmin321.dotlogicstest.com/';
// const BASE_URL = 'http://hgp.local.com/';
const BASE_URL = "https://growxai.org/";

export const environment = {
  provider: "hgp",
  production: true,
  baseURL: BASE_URL,
  apiURL: BASE_URL + "api/",
  imageURL: BASE_URL + "storage/",
  algoliaApplicationId: "FSY7EU77JM",
  nodeServer: BASE_URL + "api/",
  searchOnlyKey: "c38ac6fdc98e2dbcd8b70ae96dd5d2b6",
  base64Paypal:
    "QWY1aFVndno4UWxLaVNfVkc0TWNzc1ZmR2ZybVpCRXNuQWtkV3Zid3FRMEZfUWQweTJmY3ZQN1E1RHNqOGZreXdNUzYxeEVoREJYcHBrYUM6RU43Q2M5eEhYMVJRN2tzN1hDY09XMURPaEhfRGNnRHlBR1BMVl9aTGFFS2NpM21Bclk5MnBlYklKM1otOUYtQURFdmRXUkY2THQydGZyNnM=",
  paypal: {
    // id: 'AWlXT4EbdsCYGQnbyTQNT4Lgj1qJVEhH3bN4yyLIN2TqMuDkpQUj6rU77WEjy0DWS-6HV6iqUyh2SDwG',
    id: "AdhvB-dd5QTdZSjk76_edTt6yxsmEucWp5AkhrffPVuNQPoHNl2YbfUvz_JVeLmo5vp8z_aawIl3FgNI",
    // secret: 'ELWZqn4EohOnc_o0Tg_SpqnhBoVdMbHVmxcX_9QL-u-01dTIUrkrzE1KktYIXVWdy1d5S3xHvBXf-D_Y',
    secret:
      "EIao-1Nz8Q-k63YhShr252OUxpujc-0bjlJvzop1OPYowp8-597xBVBtv1ZhBpOo1yAlfPGeS4UtXrqO",
    url: "https://api.sandbox.paypal.com/v2/",
  },
  chat: {
    appId: "2247424c29b6ce5",
    appRegion: "us",
    authKey: "290d6230cdecfe066b08d412d82806c1296e5ad1",
  },
  indexes: {
    default: `searchable_items`,
    low_to_high: `searchable_items_low_to_high`,
    high_to_low: `searchable_items_high_to_low`,
    newest: `searchable_items_newest`,
    sku: `searchable_items_sku`,
    alphabetically_a_z: `searchable_items_a_z`,
  },
};
