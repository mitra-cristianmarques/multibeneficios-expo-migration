const path = require('path')
/**
 * Return Assets URLs for a given tenant
 * @param {string} profile expo release channel
 * @param {string} apiBaseUrl api base url
 * @param {string} tenant client tenant
 * @returns {{appLogoPath: string, splashScreenPath: string}}
 */
function getTenantFileUrls(profile, apiBaseUrl, tenant) {
  if (!profile) {
    throw new Error('ENV: EAS_BUILD_PROFILE is required')
  }

  if (profile === 'development' || profile === 'staging') {
    return {
      appLogoPath: path.resolve(path.join(__dirname, '../assets/images/icon.png')),
      splashScreenPath: path.resolve(
        path.join(__dirname, '../assets/images/splash-icon.png'),
      ),
    }
  }

  if (!apiBaseUrl) {
    throw new Error('ENV: API_BASE_URL is required')
  }

  //   throw new Error(`Unsupported channel: ${channel}`)
}

/**
 * Get application details based on the eas profile
 * @param {string} profile
 * @returns {{name: string, package: string, version: string, buildNumber: (number)}}
 */

function getAppDetails(profile) {
  if (!profile) {
    throw new Error('env: EAS_BUILD_PROFILE is required')
  }
  if (profile === 'development' || profile === 'staging') {
    return {
      name: `Ben+ ${profile.charAt(0).toUpperCase() + profile.slice(1)}`,
      package: `br.com.mitra.ben.${profile}`,
      version: process.env.APP_VERSION || '1.0.0',
      buildNumber: process.env.BUILD_NUMBER || 1,
    }
  }

  return {
    name: process.env.APP_NAME,
    package: process.env.APP_PACKAGE,
    version: process.env.APP_VERSION,
    buildNumber: parseInt(process.env.BUILD_NUMBER) || 1,
  }
}

module.exports = { getTenantFileUrls, getAppDetails }
