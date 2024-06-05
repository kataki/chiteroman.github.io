function parseBuildProp(content) {
    const lines = content.split('\n');
    const properties = {};

    lines.forEach(line => {
        if (line.startsWith('#') || line.trim() === '') {
            return;
        }
        const [key, value] = line.split('=');
        if (key && value) {
            properties[key.trim()] = value.trim();
        }
    });

    return properties;
}

function parseAndDownload() {
    const textarea = document.getElementById('buildPropInput');
    const content = textarea.value;
    const properties = parseBuildProp(content);

    const jsonResult = {
        MANUFACTURER:               properties['ro.product.manufacturer'],
        MODEL:                      properties['ro.product.model'],
        FINGERPRINT:                properties['ro.build.fingerprint'],
        BRAND:                      properties['ro.product.brand'],
        PRODUCT:                    properties['ro.product.name'],
        DEVICE:                     properties['ro.product.device'],
        RELEASE:                    properties['ro.build.version.release'],
        ID:                         properties['ro.build.id'],
        INCREMENTAL:                properties['ro.build.version.incremental'],
        SECURITY_PATCH:             properties['ro.build.version.security_patch'],
        DEVICE_INITIAL_SDK_INT:     properties['ro.product.first_api_level'] || '21',
        TYPE:                       "user",
        TAGS:                       "release-keys",
    };

    const blob = new Blob([JSON.stringify(jsonResult, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pif.json';
    a.click();
    URL.revokeObjectURL(url);

    textarea.value = '';
}
