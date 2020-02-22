export const URLs = {
    signIn: '/',
    home: '/home',
    signUp: '/sign-up',
    profile: '/profile',
    user: (userId) => `/user/${userId}`,
    addCompany: '/company/add',
    editCompany: (companyId) => `company/${companyId}/edit`,
    company: (companyId) => `/company/${companyId}`,
    503: '/503',
    listProfile: '/list-profile',
    userHistory: (userId) => {
        if (userId) {
            return `/user/${userId}/history`;
        } else {
            return '/history';
        }
    },
    editArash: (companyId, arashId) => `${companyId}/edit-arash/${arashId}`,
    addArash: (companyId) => `/company/${companyId}/add-arash`
};

export const serverURLs = {
    login: '/accounts/login/',
    user: (userId) => {
        if (userId) {
            return `/user/${userId}/`;
        } else {
            return '/user/';
        }
    },
    companies: '/companies/',
    addCompany: '/add/company/',
    company: (companyId) => `/company/${companyId}/`,
    addArash: '/add/arash/',
    arash: (arashId) => `/arash/${arashId}/`,
    arashes: (companyId) => `/company/${companyId}/arashes/`,
    userImage: (userId) => `/user-img/${userId}/`,
    userLogs: (userId) => `/user/${userId}/logs/`,
    users: '/users/',
    signUp: '/signup/',
    logout: '/logout/',
    help: 'http://engold.ui.ac.ir/~zamani/internship/files/introduce.pdf'
};