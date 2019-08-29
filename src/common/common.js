
export default {
    sliceType: [
        {
            "value": "EMBB",
            "label": "eMBB"
        },
        {
            "value": "URLLC",
            "label": "uRLLC"
        },
        {
            "value": "MIOT",
            "label": "mIoT"
        }
    ],
    serviceLevel: [
        {
            "value": "STANDARD",
            "label": "Standard"
        },
        {
            "value": "GOLDEN",
            "label": "Golden"
        },
        {
            "value": "DIAMOND",
            "label": "Diamond"
        }
    ],
    appOptions: [
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
    ],
    getValueByLabel(name, label) {
        console.log(name)
        if (label === undefined || label === null) {
            return ''
        }
        for (let i in name) {
            let e = name[i]
            if (e && e.label === label) {
                return e.value
            }
        }
        return ''
    }

}