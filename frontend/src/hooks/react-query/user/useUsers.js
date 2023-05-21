import { useQuery } from 'react-query';
import UserApi from '../../../api/UserApi';

export const UsersQueryKey = 'Users';

export function useUsers(params) {
    return useQuery(
        [UsersQueryKey, params],
        () => UserApi.getUsersAsync(params),
        {
            enabled:false
        }
    )
}