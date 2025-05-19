import { createTransform } from "redux-persist";

// Expiration time: 7 days in milliseconds
const EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000;

const expireTransform = createTransform(
  // Called before persisting state
  (inboundState) => ({
    ...inboundState,
    _persistedAt: Date.now(), // Save the current timestamp
  }),

  // Called when rehydrating state from storage
  (outboundState) => {
    const currentTime = Date.now();
    const persistedTime = outboundState?._persistedAt || 0;

    if (currentTime - persistedTime > EXPIRATION_TIME) {
      return undefined; // Return undefined to reset state
    }

    return outboundState;
  },

  // Apply this transform only to the "user" slice
  { whitelist: ["user"] }
);

export default expireTransform;
