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
        MANUFACTURER:               properties['ro.product.manufacturer'] || properties['ro.product.system.manufacturer'],
        MODEL:                      properties['ro.product.model'] || properties['ro.product.system.model'],
        FINGERPRINT:                properties['ro.build.fingerprint'] || properties['ro.system.build.fingerprint'],
        BRAND:                      properties['ro.product.brand'] || properties['ro.product.system.brand'],
        PRODUCT:                    properties['ro.product.name'] || properties['ro.product.system.name'],
        DEVICE:                     properties['ro.product.device'] || properties['ro.product.system.device'],
        RELEASE:                    properties['ro.build.version.release'] || properties['ro.system.build.version.release'],
        ID:                         properties['ro.build.id'] || properties['ro.system.build.id'],
        INCREMENTAL:                properties['ro.build.version.incremental'] || properties['ro.system.build.version.incremental'],
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
