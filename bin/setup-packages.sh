# Setup server package
PACKAGE=server
mkdir -p ${PACKAGE}
cp generated/server-package.js ${PACKAGE}

cp components/local-typings/server-package-typings.d.ts ${PACKAGE}
cp components/local-typings/config-service.d.ts ${PACKAGE}

SUBDIR=server/src/ts
mkdir -p ${PACKAGE}/${SUBDIR}
cp generated/server/src/components/server/src/ts/browser-config-service.js  ${PACKAGE}/${SUBDIR}

# Setup browser package
PACKAGE=browser
mkdir -p ${PACKAGE}
cp generated/browser-package.js ${PACKAGE}

cp components/local-typings/browser-package-typings.d.ts ${PACKAGE}
cp components/local-typings/config.service.d.ts ${PACKAGE}


SUBDIR=browser/config/ts
mkdir -p ${PACKAGE}/${SUBDIR}
cp generated/browser/config.service.js ${PACKAGE}/${SUBDIR}


