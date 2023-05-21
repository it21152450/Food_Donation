export const DonationStatus = {
    NEW:"new",
    ON_PROGRESS:"on-progress",
    COLLECTED:"collected",
    COMPLETED:"completed",
    CANCELLED:"cancelled"
}

export const DonationStatusClient = {
    [DonationStatus.NEW]:"Waiting for accept",
    [DonationStatus.ON_PROGRESS]:"Assigned for pickup",
    [DonationStatus.COLLECTED]:"Collected the food",
    [DonationStatus.COMPLETED]:"Donation completed",
    [DonationStatus.CANCELLED]:"Donation cancelled"
}