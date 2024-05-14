import { useMutationState } from '@tanstack/react-query';
import { SESSION_API_URLS, authorizeSession } from 'shared/api';
import { createMutationHook } from 'shared/utils';

const authorizeSessionMutationKey = [SESSION_API_URLS.authorizeSession];

export const useAuthorizeSessionMutation = createMutationHook(
  authorizeSession,
  {
    mutationKey: authorizeSessionMutationKey,
  }
);

export function useAuthorizeSessionMutationState() {
  return useMutationState({
    filters: { mutationKey: authorizeSessionMutationKey },
  });
}
