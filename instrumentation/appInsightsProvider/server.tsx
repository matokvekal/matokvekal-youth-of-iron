import 'server-only';
import { PropsWithChildren } from 'react';
import { AppInsightsContextProvider } from './client';
import { env } from 'env.mjs';

const AppInsightsProvider = ({ children }: PropsWithChildren) => {
  const connectionString = env.APP_INSIGHT_CONNECTION_STRING;

  if (!connectionString) {
    return children;
  }

  return (
    <AppInsightsContextProvider connectionString={connectionString}>
      {children}
    </AppInsightsContextProvider>
  );
};

export { AppInsightsProvider };
