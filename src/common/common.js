export const SLICE_TYPE = [
    {
        "value": "EMBB",
        "label": "eMBB",
        "money": 1.0
    },
    {
        "value": "URLLC",
        "label": "uRLLC",
        "money": 1.5
    },
    {
        "value": "MIOT",
        "label": "mIoT",
        "money": 2.5
    }
]

export const SERVICE_LEVEL =  [
    {
        "value": "STANDARD",
        "label": "Standard",
        "money": 10.0
    },
    {
        "value": "GOLDEN",
        "label": "Golden",
        "money": 20.0
    },
    {
        "value": "DIAMOND",
        "label": "Diamond",
        "money": 30.0
    }
]

export const APP_OPTIONS = [
    {
        "value": "app 1",
        "label": "App 1"
    },
    {
        "value": "app 2",
        "label": "App 2"
    },
    {
        "value": "app 3",
        "label": "App 3"
    },
    {
        "value": "app 4",
        "label": "App 4"
    },
    {
        "value": "app 5",
        "label": "App 5"
    }
]

export const AREA_OPTIONS = [
    {
        value: 'North China',
        label: 'North China',
        children:[{
            value: 'Beijing',
            label: 'Beijing',
            children: [
                { value: 'Haidian', label: 'Haidian' },
                { value: 'Chaoyang', label: 'Chaoyang' },
                { value: 'Changping', label: 'Changping' }
            ]
        }]
    }, {
        value: 'East China',
        label: 'East China',
        children: [{
            value: 'Shanghai',
            label: 'Shanghai',
            children: [
                { value: 'Putuo', label: 'Putuo' },
                { value: 'Huangpu', label: 'Huangpu' },
                { value: 'Xuhui', label: 'Xuhui' }
            ]
        }, {
            value: 'Jiangsu',
            label: 'Jiangsu',
            children: [
                { value: 'Nanjing', label: 'Nanjing' },
                { value: 'Suzhou', label: 'Suzhou' },
                { value: 'Wuxi', label: 'Wuxi' }
            ]
        }, {
            value: 'ZheJiang',
            label: 'ZheJiang',
            children: [
                { value: 'Hangzhou', label: 'Hangzhou' },
                { value: 'Ningbo', label: 'Ningbo' },
                { value: 'Jiaxing', label: 'Jiaxing' }
            ]
        }]
    }, {
        value: 'NorthWest China',
        label: 'NorthWest China',
        children: [{
            value: 'Shanxi',
            label: 'Shanxi',
            children: [
                { value: 'Xi`an', label: 'Xi`an' },
                { value: 'Baoji', label: 'Baoji' }
            ]
        }, {
            value: 'Xinjiang',
            label: 'Xinjiang',
            children: [
                { value: 'Urumqi', label: 'Urumqi' },
                { value: 'Karamay', label: 'Karamay' }
            ]
        }]
    }]