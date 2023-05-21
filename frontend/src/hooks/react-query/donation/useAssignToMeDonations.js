import { useQuery } from 'react-query';
import DonationApi from '../../../api/DonationApi';

export const AssignToMeDonationsQueryKey = 'AssignToMeDonations';

export function useAssignToMeDonations(params) {
    return useQuery(
        [AssignToMeDonationsQueryKey, params],
        () => DonationApi.getDonationsAsync({
            ...params,
            expandManageByUser:'true',
            assignedToMe:'true',
            expandDonationItems: "true"
        }),
        {
            enabled:false
        }
    )
}