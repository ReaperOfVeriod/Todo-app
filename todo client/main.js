// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron');

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let CreateWindow
let win

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({backgroundColor: '#343a40',
            width: 900,
            height: 600,  
            show: false,
  })

  //once windows is fully loaded show the window
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  // and load the index.html of the app.
  mainWindow.loadFile('./view/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

function createChildWindow () {
  win = new BrowserWindow({
      backgroundColor: '#343a40',
      width: 800,
      height: 600,
      show: false
  })

  win.once('ready-to-show', () => {
      win.show();
  })

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  win.loadFile('./view/edit.html')

  win.on('closed', function () {
      win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function createCreateWindow () {
  CreateWindow = new BrowserWindow({
      backgroundColor: '#343a40',
      width: 900,
      height: 600,
      show: false
  })

  CreateWindow.once('ready-to-show', () => {
    CreateWindow.show();
  })

  // Open the DevTools.
  //createWindow.webContents.openDevTools()

  CreateWindow.loadFile('./view/create.html')

  CreateWindow.on('closed', function () {
    CreateWindow = null
  })
}

function closeCreateWindow() {
  CreateWindow.close()
  mainWindow.loadFile('./view/index.html')
}

function refreshIndex() {
  mainWindow.loadFile('./view/index.html')
}

ipcMain.on('open-Create', createCreateWindow)
ipcMain.on('open-child', createChildWindow)
ipcMain.on('close-create', closeCreateWindow)
ipcMain.on('refresh-index', refreshIndex)