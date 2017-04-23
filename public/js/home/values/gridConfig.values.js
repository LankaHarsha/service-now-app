angular.module('snApp.home')
    .value('gridConfig', {
        usersDetails: [
            {
                key: 'name',
                label: 'Name'
            }, {
                key: 'user_name',
                label: 'User Name'
            }, {
                key: 'busyHours',
                label: 'Busy Hours'
            }, {
                key: 'freeHours',
                label: 'Free Hours'
            }
        ],
        busyHours: [
            {
                key: 'name',
                label: 'Name'
            }, {
                key: 'user_name',
                label: 'User Name'
            }, {
                key: 'busyHours',
                label: 'Busy Hours'
            }
        ],
        freeHours: [
            {
                key: 'name',
                label: 'Name'
            }, {
                key: 'user_name',
                label: 'User Name'
            }, {
                key: 'freeHours',
                label: 'Free Hours'
            }
        ],
        scheduling: [
            {
                key: 'name',
                label: 'Name'
            }, {
                key: 'user_name',
                label: 'User Name'
            }
        ],
        taskDetails: [
            {
                key: 'name',
                label: 'User'
            }, {
                key: 'totalHours',
                label: 'Hours',
                type: 'desc',
                sort: true,
            }
        ]
    });