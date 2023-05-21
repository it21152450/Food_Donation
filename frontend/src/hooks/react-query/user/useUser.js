import { useQuery } from 'react-query';
import UserApi from '../../../api/UserApi';

export const UserQueryKey = 'User';

export function useUser(userId) {
    return useQuery(
        [UserQueryKey, userId],
        () => UserApi.getUserAsync(userId),
        {
            enabled:false
        }
    )
}