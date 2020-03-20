const {app, BrowserWindow, Tray, Menu} = require('electron')
const path = require('path')
let mainWindow

let tray = null

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1240,
    height: 800,
    frame: true,
    darkTheme: true,
    autoHideMenuBar: true,
    devTools: true,
    hide: true,
    icon: path.join(__dirname, '/images/draw.png'),
    title: "Create stunning vector graphic designs by YouiDraw.",
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: true
    }
  })

  mainWindow.loadURL('https://www.youidraw.com/apps/painter/#')

  mainWindow.on('close', (event) => {
    if (app.quitting) {
      win = null
    } else {
      event.preventDefault()
      mainWindow.hide()
    }
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})

app.on('before-quit', () => app.quitting = true)

app.on('ready', () => {
  tray = new Tray(path.join(__dirname, '/images/draw.png'))
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show YouiDraw', click:  function(){
      mainWindow.show();
    } },
    { label: 'Minimize', click:  function(){
      mainWindow.hide();
    } },
    { label: 'Quit', click: function(){
      app.quit()
    }}
  ])
  tray.setToolTip('YouiDraw.')
  tray.setContextMenu(contextMenu)
})
