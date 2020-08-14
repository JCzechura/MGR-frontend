export const urlList: {[name: string]: string} = {
    authTokenPOST: 'auth/token',
    currentUserGET: 'ui/currentUser',
    updateUserPOST: 'ui/user/update',
    updatePasswordPOST: 'ui/user/password',
    metadataGET: 'ui/metadata',
    databaseGET: 'ui/database',
    databaseUpdatePOST: 'ui/database/update',
    databaseAddPOST: 'ui/database/new',
    routesGET: 'ui/routes/improved',
    routeDetailsGET: 'ui/routes/improved/details',
    plansGET: 'ui/route-plans',
    plansNewPOST: 'ui/route-plans/new',
    plansExceptionalPOST: 'ui/route-plans/exceptional',
    planGET: 'ui/route-plans/plan',
    checkIfNextWeekIsPlannedGET: 'ui/settings/is-next-week-planned',
};