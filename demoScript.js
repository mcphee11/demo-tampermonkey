// ==UserScript==
// @name         WebMessager CX DEFAULT
// @namespace    https://github.com/mcphee11
// @version      4.2
// @description  Genesys Cloud Demo Script
// @author       https://github.com/mcphee11/demo-tampermonkey
// @match        http*://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// @exclude      https://*.mypurecloud.*
// @noframes
// ==/UserScript==
;(function () {
  'use strict'
  if (window.location !== window.parent.location) {
    // skip for iFrames
    return
  }

  window.addEventListener('load', function () {
    //When document has loaded
    const deploymentId = GM_getValue('deploymentId')
    const region = GM_getValue('region')
    const environment = GM_getValue('environment')
    const supportPage = GM_getValue('supportPage')

    //Setup Support Center DIV
    if (document.location.href === supportPage) {
      var support = document.createElement('div')
      support.id = 'genesys-support-center'
      document.body.appendChild(support)
    }

    var headers = document.createElement('meta')
    headers.name = 'referrer'
    headers.content = 'no-referrer-when-downgrade'

    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.innerHTML = `
    (function (g, e, n, es, ys) {
      g['_genesysJs'] = e; g[e] = g[e] || function () { (g[e].q = g[e].q || []).push(arguments) };
      g[e].t = 1 * new Date(); g[e].c = es;
      ys = document.createElement('script'); ys.async = 1; ys.src = n; ys.charset = 'utf-8'; document.head.appendChild(ys);
    })(window, 'Genesys', 'https://apps.${region}/genesys-bootstrap/genesys.min.js', {
      environment: '${environment}',
      deploymentId: '${deploymentId}',
      debug: true
    });`
    document.head.appendChild(headers)
    document.head.appendChild(script)

    //-------------------------------------------------------BASIC SECTION------------------------------------------------------------------------------------------------

    /////////////////////
    // HOT KEY MONITOTING
    /////////////////////
    function doc_keyUp(e) {
      if (e.altKey && e.keyCode == 49) {
        console.log('alt+1')
        Genesys('command', 'Journey.record', { eventName: 'customData', customAttributes: { label: 'KVPs', customData: 'Demo54321' } })
      }
      if (e.altKey && e.keyCode == 50) {
        console.log('alt+2')
        Genesys('command', 'Journey.record', { eventName: 'product_added', customAttributes: { label: 'product added', data: 'hello' } })
      }
      if (e.altKey && e.keyCode == 51) {
        console.log('alt+3')
        Genesys('command', 'Journey.record', { eventName: 'product_removed', customAttributes: { label: 'product removed' } })
      }
      if (e.altKey && e.keyCode == 52) {
        console.log('alt+4')
        Genesys('command', 'Journey.pageview', { customAttributes: { email: 'jeff@test.com', givenName: 'Jeff' }, traitsMapper: [{ fieldName: 'email' }, { fieldName: 'givenName' }] })
      }
      if (e.altKey && e.keyCode == 53) {
        console.log('alt+5')
        Genesys('command', 'Journey.record', { eventName: 'GenericMessage', customAttributes: { label: 'Hello' } })
      }
      if (e.altKey && e.keyCode == 54) {
        console.log('alt+6')
        Genesys('command', 'Journey.record', { eventName: 'form_abandoned', customAttributes: { label: 'form abandoned' } })
      }
      if (e.altKey && e.keyCode == 55) {
        console.log('alt+7')
        Genesys('command', 'Journey.record', { eventName: 'form_submitted', customAttributes: { label: 'form submitted' } })
      }
      if (e.altKey && e.keyCode == 56) {
        console.log('alt+8')
        Genesys('command', 'Database.set', { messaging: { customAttributes: { varUser: 'Jeff' } } })
      }
      if (e.altKey && e.keyCode == 57) {
        console.log('alt+9 - PAGEVIEW')
        Genesys('command', 'Journey.pageview', {})
      }
    }
    document.addEventListener('keyup', doc_keyUp, false)

    //-----------------------------------------------------------SETTINGS & BUTTONS--------------------------------------------------------------------------------------------

    //Button to clear-Destroy GPE session cookies
    var buttons = document.createElement('div')
    buttons.innerHTML = `
    <button id="myButton1" type="button" style="margin: 8px">Clear Session</button>
    <button id="myButton2" type="button" style="margin: 8px">Identify Session</button>
    <button id="myButton3" type="button" style="margin: 8px">View Settings</button>
    `
    buttons.setAttribute('id', 'myContainer')
    document.body.appendChild(buttons)

    //--- Listen to the newly added buttons.
    document.getElementById('myButton1').addEventListener('click', sessionClear, false)
    document.getElementById('myButton2').addEventListener('click', sessionIdentify, false)
    document.getElementById('myButton3').addEventListener('click', showSettings, false)

    function sessionClear() {
      localStorage.removeItem(`_${deploymentId}:gcmcopn`)
      localStorage.removeItem(`_${deploymentId}:gcmcsessionActive`)
      Genesys('command', 'Identifiers.purgeAll')
      console.log('GPE & WebMessenger Session Destroyed')
      document.location.reload()
    }

    function sessionIdentify() {
      Identify()
      console.log('GPE Session Identified')
    }

    // Add config dialog to get and set data
    function saveSettings() {
      console.log('saving...')
      GM_setValue('deploymentId', document.getElementById('deploymentId').value)
      GM_setValue('region', document.getElementById('region').value)
      GM_setValue('environment', document.getElementById('environment').value)
      GM_setValue('supportPage', document.getElementById('supportPage').value)
      document.getElementById('dialogSettings').close()
      document.location.reload()
    }
    function showSettings() {
      console.log('showing settings')
      deploymentId ? (document.getElementById('deploymentId').value = GM_getValue('deploymentId')) : null
      region ? (document.getElementById('region').value = GM_getValue('region')) : null
      environment ? (document.getElementById('environment').value = GM_getValue('environment')) : null
      supportPage ? (document.getElementById('supportPage').value = GM_getValue('supportPage')) : null
      document.getElementById('dialogSettings').showModal()
    }
    function closeSettings() {
      console.log('close settings')
      document.getElementById('dialogSettings').close()
    }
    var dialog = document.createElement('dialog')
    var options = document.createElement('div')
    dialog.id = 'dialogSettings'
    options.innerHTML = `
    <div style="display: flex; padding: 8px">
      <label style="padding-right: 8px">DeploymentId: </label>
      <input id="deploymentId" />
    </div>
    <div style="display: flex; padding: 8px">
      <label style="padding-right: 55px">Region: </label>
      <input id="region" />
    </div>
    <div style="display: flex; padding: 8px">
      <label style="padding-right: 17px">Environment: </label>
      <input id="environment" />
    </div>
    <div style="display: flex; padding: 8px">
      <label style="padding-right: 15px">Support URL: </label>
      <input id="supportPage" />
    </div>
    <button id="saveSettings" style="margin: 8px; padding: 8px">Save</button>
    <button id="closeSettings" style="margin: 8px; padding: 8px">Close</button>
    `
    dialog.setAttribute('data-modal', '')
    dialog.appendChild(options)
    document.body.appendChild(dialog)

    document.getElementById('saveSettings').addEventListener('click', saveSettings, false)
    document.getElementById('closeSettings').addEventListener('click', closeSettings, false)
  }) //End of on ready
})()
